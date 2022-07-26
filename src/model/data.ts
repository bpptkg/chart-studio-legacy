import { AxiosResponse } from 'axios';
import { api } from './api';
import {
  DataItemTypeMap,
  DataType,
  EdmConfig,
  SeismicEnergyConfig,
  SeismicityConfig,
  SeriesConfig,
  DateInterval,
} from './types';

export const controller = new AbortController();

export function createRequest<T extends DataType>(
  interval: DateInterval,
  seriesConfig: SeriesConfig<T>
): Promise<AxiosResponse<DataItemTypeMap[T][]>> {
  const { dataType } = seriesConfig;
  const { start, end } = interval;

  switch (dataType) {
    case 'Edm': {
      const config = seriesConfig.config as EdmConfig;

      return api.get('/edm/', {
        params: {
          start_at: start,
          end_at: end,
          ci: true,
          benchmark: config.benchmark,
          reflector: config.reflector,
          compact: true,
        },
        signal: controller.signal,
      });
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
      });

    case 'SeismicEnergy': {
      const config = seriesConfig.config as SeismicEnergyConfig;

      let eventType = '';
      switch (config.type) {
        case 'total':
          eventType = 'VTA,VTB,MP';
          break;
        case 'vta':
          eventType = 'VTA';
          break;
        case 'vtbmp':
          eventType = 'VTB,MP';
          break;
        default:
          eventType = 'VTA,VTB,MP';
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
      });
    }

    case 'Seismicity': {
      const config = seriesConfig.config as SeismicityConfig;

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
      });
    }

    default:
      throw new Error(`Unsupported data type: ${dataType}`);
  }
}

export interface SeriesDataRequest<T extends DataType = DataType> {
  key: string;
  interval: DateInterval;
  series: SeriesConfig<T>;
  request: ReturnType<typeof createRequest>;
}
