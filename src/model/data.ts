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
} from './types'

export const controller = new AbortController()

export function getSsamAdaptiveSampling(start: string, end: string): string {
  const startTime = moment(start)
  const endTime = moment(end)

  const maxDuration = 3 // Duration in days.
  const duration = moment.duration(endTime.diff(startTime)).asDays()
  return duration >= maxDuration ? 'ssam1' : 'ssam'
}

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
