import { Series } from './series';
import { SeriesDataItemTypeMap } from './seriesData';
import { SeriesType } from './seriesOptions';

export interface DataController<T extends SeriesType> {
  fetchData(series: Series<T>): SeriesDataItemTypeMap[T][];
  updateData(series: Series<T>, data: SeriesDataItemTypeMap[T][]): void;
}
