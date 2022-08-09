import { DataType, ParameterConfigType } from './types'

/**
 * Create default series configuration entry for certain data type.
 *
 * If dataType is undefined, it will return default config for Seismicity.
 */
export function createSeriesConfig<T extends DataType = DataType>(
  dataType: T | undefined
): ParameterConfigType {
  switch (dataType) {
    case 'Edm':
      return {
        visible: true,
        benchmark: 'BAB0',
        reflector: 'RB1',
        type: 'slope',
      }

    case 'RfapEnergy':
      return {
        visible: true,
      }

    case 'SeismicEnergy':
      return {
        visible: true,
        type: 'total',
      }

    case 'Seismicity':
      return {
        visible: true,
        eventType: 'VTA',
      }

    default:
      return {
        visible: true,
        eventType: 'VTA',
      }
  }
}
