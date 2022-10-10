import {
  DataRepository,
  DateInterval,
  DoasConfig,
  DoasData,
  EdmConfig,
  EdmData,
  GpsBaselineConfig,
  GpsBaselineData,
  GpsCoordinateConfig,
  GpsCoordinateData,
  LavaDomesConfig,
  LavaDomesData,
  MagneticConfig,
  MagneticData,
  RfapDirectionConfig,
  RfapDirectionData,
  RfapDistanceConfig,
  RfapDistanceData,
  RfapEnergyConfig,
  RfapEnergyData,
  RfapTypeConfig,
  RfapTypeData,
  RsamSeismicConfig,
  RsamSeismicData,
  SeismicEnergyConfig,
  SeismicEnergyData,
  SeismicityConfig,
  SeismicityData,
  SeriesDataKey,
  SubplotConfig,
  ThermalConfig,
  ThermalData,
  TiltmeterConfig,
  TiltmeterData,
  VogamosEmissionConfig,
  VogamosEmissionData,
  VogamosTemperatureConfig,
  VogamosTemperatureData,
  WeatherBabadanConfig,
  WeatherBabadanData,
  WeatherPasarbubarConfig,
  WeatherPasarbubarData,
} from '@/model/types'
import { isDef } from '@/shared/util'
import { SeriesOption } from 'echarts'
import objectHash from 'object-hash'

import { createDoasSeries } from './doas'
import { createEdmSeries } from './edm'
import { createEmptySeries } from './empty'
import { createGpsBaselineSeries } from './gpsBaseline'
import { createGpsCoordinateSeries } from './gpsCoordinate'
import { createLavaDomesSeries } from './lavaDomes'
import { createMagneticSeries } from './magnetic'
import { createRfapDirectionSeries } from './rfapDirection'
import { createRfapDistanceSeries } from './rfapDistance'
import { createRfapEnergySeries } from './rfapEnergy'
import { createRfapTypeSeries } from './rfapType'
import { createRsamSeismicSeries } from './rsamSeismic'
import { createSeismicEnergySeries } from './seismicEnergy'
import { createSeismicitySeries } from './seismicity'
import { createThermalSeries } from './thermal'
import { createTiltmeterSeries } from './tiltmeter'
import { createVogamosEmissionSeries } from './vogamosEmission'
import { createVogamosTemperatureSeries } from './vogamosTemperature'
import { createWeatherBabadanSeries } from './weatherBabadan'
import { createWeatherPasarbubarSeries } from './weatherPasarbubar'
import { findYAxisIndex } from './util'

export function renderSeries(
  subplots: SubplotConfig[],
  interval: DateInterval,
  dataRepository: DataRepository
): SeriesOption[] {
  return subplots
    .map((subplot, subplotIndex) => {
      return subplot.series
        .filter(({ config }) => (isDef(config.visible) ? config.visible : true))
        .map((seriesConfig, seriesIndex) => {
          const { dataType, config } = seriesConfig
          const dataKey: SeriesDataKey = {
            interval,
            series: seriesConfig,
          }
          const key: string = objectHash.sha1(dataKey)
          const xAxisIndex: number = subplotIndex
          const yAxisIndex: number = findYAxisIndex(
            subplots,
            subplotIndex,
            seriesIndex
          )

          switch (dataType) {
            case 'Edm': {
              const data = (
                key in dataRepository ? dataRepository[key] : []
              ) as EdmData[]

              const cfg = config as EdmConfig
              return createEdmSeries(data, cfg, { xAxisIndex, yAxisIndex })
            }

            case 'RfapEnergy': {
              const data = (
                key in dataRepository ? dataRepository[key] : []
              ) as RfapEnergyData[]

              const cfg = config as RfapEnergyConfig
              return createRfapEnergySeries(data, cfg, {
                xAxisIndex,
                yAxisIndex,
              })
            }

            case 'SeismicEnergy': {
              const data = (
                key in dataRepository ? dataRepository[key] : []
              ) as SeismicEnergyData[]

              const cfg = config as SeismicEnergyConfig
              return createSeismicEnergySeries(data, cfg, {
                xAxisIndex,
                yAxisIndex,
              })
            }

            case 'Seismicity': {
              const data = (
                key in dataRepository ? dataRepository[key] : []
              ) as SeismicityData[]

              const cfg = config as SeismicityConfig
              return createSeismicitySeries(data, cfg, {
                xAxisIndex,
                yAxisIndex,
              })
            }

            case 'RsamSeismic': {
              const data = (
                key in dataRepository ? dataRepository[key] : []
              ) as RsamSeismicData[]

              const cfg = config as RsamSeismicConfig
              return createRsamSeismicSeries(data, cfg, {
                xAxisIndex,
                yAxisIndex,
              })
            }

            case 'GpsBaseline': {
              const data = (
                key in dataRepository ? dataRepository[key] : []
              ) as GpsBaselineData[]

              const cfg = config as GpsBaselineConfig
              return createGpsBaselineSeries(data, cfg, {
                xAxisIndex,
                yAxisIndex,
              })
            }

            case 'GpsCoordinate': {
              const data = (
                key in dataRepository ? dataRepository[key] : []
              ) as GpsCoordinateData[]

              const cfg = config as GpsCoordinateConfig
              return createGpsCoordinateSeries(data, cfg, {
                xAxisIndex,
                yAxisIndex,
              })
            }

            case 'Tiltmeter': {
              const data = (
                key in dataRepository ? dataRepository[key] : []
              ) as TiltmeterData[]

              const cfg = config as TiltmeterConfig
              return createTiltmeterSeries(data, cfg, {
                xAxisIndex,
                yAxisIndex,
              })
            }

            case 'VogamosEmission': {
              const data = (
                key in dataRepository ? dataRepository[key] : []
              ) as VogamosEmissionData[]

              const cfg = config as VogamosEmissionConfig
              return createVogamosEmissionSeries(data, cfg, {
                xAxisIndex,
                yAxisIndex,
              })
            }

            case 'VogamosTemperature': {
              const data = (
                key in dataRepository ? dataRepository[key] : []
              ) as VogamosTemperatureData[]

              const cfg = config as VogamosTemperatureConfig
              return createVogamosTemperatureSeries(data, cfg, {
                xAxisIndex,
                yAxisIndex,
              })
            }

            case 'Doas': {
              const data = (
                key in dataRepository ? dataRepository[key] : []
              ) as DoasData[]

              const cfg = config as DoasConfig
              return createDoasSeries(data, cfg, { xAxisIndex, yAxisIndex })
            }

            case 'LavaDomes': {
              const data = (
                key in dataRepository ? dataRepository[key] : []
              ) as LavaDomesData[]

              const cfg = config as LavaDomesConfig
              return createLavaDomesSeries(data, cfg, {
                xAxisIndex,
                yAxisIndex,
              })
            }

            case 'WeatherPasarbubar': {
              const data = (
                key in dataRepository ? dataRepository[key] : []
              ) as WeatherPasarbubarData[]

              const cfg = config as WeatherPasarbubarConfig
              return createWeatherPasarbubarSeries(data, cfg, {
                xAxisIndex,
                yAxisIndex,
              })
            }

            case 'WeatherBabadan': {
              const data = (
                key in dataRepository ? dataRepository[key] : []
              ) as WeatherBabadanData[]

              const cfg = config as WeatherBabadanConfig
              return createWeatherBabadanSeries(data, cfg, {
                xAxisIndex,
                yAxisIndex,
              })
            }

            case 'RfapDistance': {
              const data = (
                key in dataRepository ? dataRepository[key] : []
              ) as RfapDistanceData[]

              const cfg = config as RfapDistanceConfig
              return createRfapDistanceSeries(data, cfg, {
                xAxisIndex,
                yAxisIndex,
              })
            }

            case 'RfapDirection': {
              const data = (
                key in dataRepository ? dataRepository[key] : []
              ) as RfapDirectionData[]

              const cfg = config as RfapDirectionConfig
              return createRfapDirectionSeries(data, cfg, {
                xAxisIndex,
                yAxisIndex,
              })
            }

            case 'RfapType': {
              const data = (
                key in dataRepository ? dataRepository[key] : []
              ) as RfapTypeData[]

              const cfg = config as RfapTypeConfig
              return createRfapTypeSeries(data, cfg, {
                xAxisIndex,
                yAxisIndex,
              })
            }

            case 'Magnetic': {
              const data = (
                key in dataRepository ? dataRepository[key] : []
              ) as MagneticData[]

              const cfg = config as MagneticConfig
              return createMagneticSeries(data, cfg, { xAxisIndex, yAxisIndex })
            }

            case 'Thermal': {
              const data = (
                key in dataRepository ? dataRepository[key] : []
              ) as ThermalData[]

              const cfg = config as ThermalConfig
              return createThermalSeries(data, cfg, { xAxisIndex, yAxisIndex })
            }

            default:
              return createEmptySeries()
          }
        }) as (SeriesOption | SeriesOption[])[]
    })
    .flat(2)
}
