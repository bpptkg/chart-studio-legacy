import { AxiosResponse } from 'axios'
import moment from 'moment'
import { api } from './api'
import {
  DataItemTypeMap,
  DataType,
  EdmConfig,
  SeismicEnergyConfig,
  SeismicityConfig,
  SeriesConfig,
  DateInterval,
  RsamSeismicConfig,
  GpsBaselineConfig,
  GpsCoordinateConfig,
  TiltmeterConfig,
  DoasConfig,
  LavaDomesConfig,
  RfapTypeConfig,
  MagneticConfig,
  ThermalConfig,
} from './types'

export const controller = new AbortController()

function getSsamAdaptiveSampling(start: string, end: string): string {
  const startTime = moment(start)
  const endTime = moment(end)

  const maxDuration = 3 // Duration in days.
  const duration = moment.duration(endTime.diff(startTime)).asDays()
  return duration >= maxDuration ? 'ssam1' : 'ssam'
}

/**
 * RF & AP type identifier.
 *
 * Source: https://bma.cendana15.com/docs/apis/monitoring/rfap_type.html
 */
enum RfapType {
  Seen = 1,
  Heard = 2,
  SeenHeard = 3,
}

function getRfapTypeIndex(type: RfapTypeConfig['type']): string {
  const selected = []

  switch (type) {
    case 'seen':
      selected.push([RfapType.Seen, RfapType.SeenHeard])
      break
    case 'heard':
      selected.push([RfapType.Heard, RfapType.SeenHeard])
      break
    case 'seen-heard':
      selected.push([RfapType.SeenHeard])
      break
    default:
      selected.push([])
  }
  return selected.flat(1).join(',')
}

/**
 * List of Kaliurang thermal areas.
 *
 * Source: https://gitlab.com/bpptkg/watchd/-/blob/master/etc/watchd.json
 */
export const KALIURANG_THERMAL_AREAS = [
  {
    id: 'kal-kubah-bd',
    name: 'Kubah BD',
  },
  {
    id: 'kal-asap',
    name: 'Asap',
  },
  {
    id: 'kal-gendol',
    name: 'Gendol',
  },
  {
    id: 'kal-boyong',
    name: 'Boyong',
  },
  {
    id: 'kal-krasak',
    name: 'Krasak',
  },
  {
    id: 'kal-bebeng',
    name: 'Bebeng',
  },
]

/**
 * List of Babadan thermal areas.
 *
 * Source: https://gitlab.com/bpptkg/watchd/-/blob/master/etc/watchd.json
 */
export const BABADAN_THERMAL_AREAS = [
  {
    id: 'baba-kubah-bd',
    name: 'Kubah BD',
  },
  {
    id: 'baba-asap',
    name: 'Asap',
  },
  {
    id: 'baba-barat-laut',
    name: 'Barat Laut',
  },
]

/**
 * Create an Axios request for certain data type.
 *
 * It defines how data type get the data. The data then will be passed to the
 * series renderer function to transform the data format required by chart
 * framework.
 */
export function createRequest<T extends DataType>(
  interval: DateInterval,
  seriesConfig: SeriesConfig<T>
): Promise<AxiosResponse<DataItemTypeMap[T][]>> {
  const { dataType } = seriesConfig
  const { start, end } = interval

  switch (dataType) {
    case 'Edm': {
      const config = seriesConfig.config as EdmConfig

      return api.get('/edm/csdr/', {
        params: {
          start_at: start,
          end_at: end,
          ci: true,
          benchmark: config.benchmark,
          reflector: config.reflector,
          compact: true,
        },
        signal: controller.signal,
      })
    }

    case 'RfapEnergy':
      return api.get('/equivalent-energy/', {
        params: {
          eventdate__gte: start,
          eventdate__lt: end,
          eventtype__in: 'ROCKFALL,AWANPANAS',
          nolimit: true,
          sep: true,
        },
        signal: controller.signal,
      })

    case 'SeismicEnergy': {
      const config = seriesConfig.config as SeismicEnergyConfig

      let eventType = ''
      switch (config.type) {
        case 'total':
          eventType = 'VTA,VTB,MP'
          break
        case 'vta':
          eventType = 'VTA'
          break
        case 'vtbmp':
          eventType = 'VTB,MP'
          break
        default:
          eventType = 'VTA,VTB,MP'
      }

      return api.get('/energy/', {
        params: {
          eventdate__gte: start,
          eventdate__lt: end,
          eventtype__in: eventType,
          accumulate: true,
          nolimit: true,
        },
        signal: controller.signal,
      })
    }

    case 'Seismicity': {
      const config = seriesConfig.config as SeismicityConfig

      return api.get('/seismicity/', {
        params: {
          eventdate__gte: start,
          eventdate__lt: end,
          eventtype: config.eventType,
          nolimit: true,
          reindex: true,
          start: start,
          end: end,
        },
        signal: controller.signal,
      })
    }

    case 'RsamSeismic': {
      const config = seriesConfig.config as RsamSeismicConfig

      return api.get(`/rsam/seismic/${config.station}/`, {
        params: {
          timestamp__gte: start,
          timestamp__lt: end,
          nolimit: true,
          sampling: getSsamAdaptiveSampling(start, end),
        },
        signal: controller.signal,
      })
    }

    case 'GpsBaseline': {
      const config = seriesConfig.config as GpsBaselineConfig

      return api.get('/gps/baseline/', {
        params: {
          station1: config.station1,
          station2: config.station2,
          timestamp__gte: start,
          timestamp__lt: end,
          nolimit: true,
        },
        signal: controller.signal,
      })
    }

    case 'GpsCoordinate': {
      const config = seriesConfig.config as GpsCoordinateConfig

      return api.get(`/gps/position/${config.station}/`, {
        params: {
          timestamp__gte: start,
          timestamp__lt: end,
          nolimit: true,
        },
        signal: controller.signal,
      })
    }

    case 'Tiltmeter': {
      const config = seriesConfig.config as TiltmeterConfig

      let url = ''
      let params = {}
      switch (config.type) {
        case 'platform':
          url = `/tiltmeter/${config.station}/`
          break
        case 'borehole':
          url = `/tiltborehole/${config.station}/`
          // Use mid data aggregation for tiltmeter borehole.
          params = { mid: true }
          break
        case 'tlr':
          url = `/tiltmeter/tlr/${config.station}/`
          params = {
            filter: 'median',
            median_window: 5,
            median_aggregation: 'mean',
          }
          break
        default:
          url = `/tiltmeter/${config.station}/`
      }

      // Only use aggregation for tiltmeter other than tlr type.
      const aggregation = config.type !== 'tlr' ? 'mean' : ''

      return api.get(url, {
        params: {
          timestamp__gte: start,
          timestamp__lt: end,
          nolimit: true,
          aggregation,
          ...params,
        },
        signal: controller.signal,
      })
    }

    case 'VogamosEmission': {
      return api.get('/gas/emission/', {
        params: {
          timestamp__gte: start,
          timestamp__lt: end,
          nolimit: true,
        },
        signal: controller.signal,
      })
    }

    case 'VogamosTemperature': {
      return api.get('/gas/temperature/', {
        params: {
          timestamp__gte: start,
          timestamp__lt: end,
          nolimit: true,
        },
        signal: controller.signal,
      })
    }

    case 'Doas': {
      const config = seriesConfig.config as DoasConfig

      return api.get(`/doas2/${config.station}/`, {
        params: {
          starttime__gte: start,
          starttime__lt: end,
          nolimit: true,
        },
        signal: controller.signal,
      })
    }

    case 'LavaDomes': {
      const config = seriesConfig.config as LavaDomesConfig

      return api.get('/lava-domes/', {
        params: {
          start: start,
          end: end,
          location: config.location,
        },
        signal: controller.signal,
      })
    }

    case 'WeatherPasarbubar': {
      return api.get('/meteorology/', {
        params: {
          timestamp__gte: start,
          timestamp__lt: end,
          nolimit: true,
        },
        signal: controller.signal,
      })
    }

    case 'WeatherBabadan': {
      return api.get('/meteorology/babadan/', {
        params: {
          timestamp__gte: start,
          timestamp__lt: end,
          nolimit: true,
        },
        signal: controller.signal,
      })
    }

    case 'RfapDistance': {
      return api.get('/rfap-distance/', {
        params: {
          start: start,
          end: end,
        },
        signal: controller.signal,
      })
    }

    case 'RfapDirection': {
      return api.get('/rfap-distdir/', {
        params: {
          start: start,
          end: end,
        },
        signal: controller.signal,
      })
    }

    case 'RfapType': {
      const config = seriesConfig.config as RfapTypeConfig

      return api.get('/rfap-type/', {
        params: {
          start: start,
          end: end,
          type: getRfapTypeIndex(config.type),
        },
        signal: controller.signal,
      })
    }

    case 'Magnetic': {
      const config = seriesConfig.config as MagneticConfig

      return api.get(`/magnetic/${config.station}/`, {
        params: {
          timestamp__gte: start,
          timestamp__lt: end,
          nolimit: true,
        },
        signal: controller.signal,
      })
    }

    case 'Thermal': {
      const config = seriesConfig.config as ThermalConfig

      return api.get('/thermal2/', {
        params: {
          timestamp__gte: start,
          timestamp__lt: end,
          area: config.area,
          nolimit: true,
          fields: 'timestamp,temperature,density',
        },
        signal: controller.signal,
      })
    }

    default:
      throw new Error(`Unsupported data type: ${dataType}`)
  }
}

export interface SeriesDataRequest<T extends DataType = DataType> {
  key: string
  interval: DateInterval
  series: SeriesConfig<T>
  request: ReturnType<typeof createRequest>
}
