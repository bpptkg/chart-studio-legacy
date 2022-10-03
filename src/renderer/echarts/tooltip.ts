import { DataType } from '@/model/types'
import { objectParse } from '@/shared/util'
import { TooltipComponentOption } from 'echarts'
import {
  CallbackDataParams,
  TopLevelFormatterParams,
} from 'echarts/types/dist/shared'

import { createEdmSeriesTooltip } from './edm'
import { createGpsBaselineSeriesTooltip } from './gpsBaseline'
import { createGpsCoordinateSeriesTooltip } from './gpsCoordinate'
import { createMagneticSeriesTooltip } from './magnetic'
import { createRfapDirectionSeriesTooltip } from './rfapDirection'
import { createRfapEnergySeriesTooltip } from './rfapEnergy'
import { createRfapTypeSeriesTooltip } from './rfapType'
import { createRsamSeismicSeriesTooltip } from './rsamSeismic'
import { createSeismicEnergySeriesTooltip } from './seismicEnergy'
import { createSeismicitySeriesTooltip } from './seismicity'
import { createThermalSeriesTooltip } from './thermal'
import { createTiltmeterSeriesTooltip } from './tiltmeter'

export function tooltipFormatter(formatterParams: TopLevelFormatterParams) {
  const tooltip: string[] = []
  const seriesParams = formatterParams as CallbackDataParams[]

  seriesParams.forEach((params, index) => {
    const { seriesName } = params as { seriesName: string }

    try {
      const { dataType } = objectParse(seriesName) as { dataType: DataType }
      switch (dataType) {
        case 'Edm':
          tooltip.push(createEdmSeriesTooltip(params, index))
          break
        case 'GpsBaseline':
          tooltip.push(createGpsBaselineSeriesTooltip(params, index))
          break
        case 'GpsCoordinate':
          tooltip.push(createGpsCoordinateSeriesTooltip(params, index))
          break
        case 'Magnetic':
          tooltip.push(createMagneticSeriesTooltip(params, index))
          break
        case 'RfapDirection':
          tooltip.push(createRfapDirectionSeriesTooltip(params, index))
          break
        case 'RfapEnergy':
          tooltip.push(createRfapEnergySeriesTooltip(params, index))
          break
        case 'RfapType':
          tooltip.push(createRfapTypeSeriesTooltip(params, index))
          break
        case 'RsamSeismic':
          tooltip.push(createRsamSeismicSeriesTooltip(params, index))
          break
        case 'SeismicEnergy':
          tooltip.push(createSeismicEnergySeriesTooltip(params, index))
          break
        case 'Seismicity':
          tooltip.push(createSeismicitySeriesTooltip(params, index))
          break
        case 'Thermal':
          tooltip.push(createThermalSeriesTooltip(params, index))
          break
        case 'Tiltmeter':
          tooltip.push(createTiltmeterSeriesTooltip(params, index))
          break
      }
    } catch (error) {
      // Ignore the error because we didn't explicitly stringify series config
      // in the ECharts series name property.
    }
  })

  return tooltip.join('')
}

/**
 * Render Chart Studio chart model to ECharts tooltip.
 */
export function renderTooltip(): TooltipComponentOption {
  return {
    trigger: 'axis',
    formatter: tooltipFormatter,
  }
}
