import { DataType, ParameterConfigType } from './types'

/**
 * Create default series configuration entry for certain data type.
 *
 * If dataType is undefined, it will throw an error.
 */
export function createSeriesConfig<T extends DataType = DataType>(
  dataType: T | undefined
): ParameterConfigType {
  switch (dataType) {
    case 'Seismicity':
      return {
        eventType: 'VTA',
      }

    case 'Edm':
      return {
        visible: true,
        benchmark: 'BAB0',
        reflector: 'RB1',
        type: 'slope',
      }

    case 'SeismicEnergy':
      return {
        visible: true,
        type: 'total',
        aggregate: 'daily',
      }

    case 'RfapEnergy':
      return {
        visible: true,
        field: 'count',
      }

    case 'RsamSeismic':
      return {
        visible: true,
        station: 'pasarbubar',
        band: 'band0',
        field: 'value',
      }

    case 'GpsBaseline':
      return {
        visible: true,
        station1: 'pasarbubar',
        station2: 'plawangan',
      }

    case 'GpsCoordinate':
      return {
        visible: true,
        station: 'pasarbubar',
        field: 'east',
      }

    case 'Tiltmeter':
      return {
        visible: true,
        type: 'platform',
        station: 'babadan',
        field: 'x',
      }

    default:
      throw new Error(`Unsupported data type: ${dataType}`)
  }
}
