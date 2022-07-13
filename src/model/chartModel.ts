import { assert } from '@/utils/assertions';
import { Series } from './series';
import { SeriesOptionsMap, SeriesType } from './seriesOptions';

export interface ChartOptions {
  width?: number;
  height?: number;
  title?: string;
}

export type SubplotIndex = number;

export interface ContextData {
  startTime: string;
  endTime: string;
}

export class ChartModel {
  private readonly _options: ChartOptions;
  private _subplots: Axes[] = [];

  constructor(options: ChartOptions) {
    this._options = options;
    this._subplots.push(new Axes(this));
  }

  public options(): Readonly<ChartOptions> {
    return this._options;
  }

  public subplots(): Axes[] {
    return this._subplots;
  }

  public series(): Series[] {
    const series: Series[] = [];
    this._subplots.forEach((axes) => {
      axes.series().forEach((item) => {
        series.push(item);
      });
    });
    return series;
  }

  public createSubplot(): Axes {
    const axes = new Axes(this);
    this._subplots.push(axes);
    return axes;
  }

  public createSubplotAt(index: number): Axes {
    const axes = new Axes(this);
    this._subplots.splice(index, 0, axes);
    return axes;
  }

  public removeSubplot(index: SubplotIndex): void {
    const subplotsSize = this._subplots.length;
    assert(index >= 0 && index < subplotsSize, 'Subplot index out of range');
    this._subplots.splice(index, 1);
  }

  public moveSubplot(from: SubplotIndex, to: SubplotIndex): void {
    while (from < 0) {
      from += this._subplots.length;
    }
    while (to < 0) {
      to += this._subplots.length;
    }
    if (to >= from) {
      let k = to - this._subplots.length + 1;
      while (k--) {
        this._subplots.push(new Axes(this));
      }
    }
    this._subplots.splice(to, 0, this._subplots.splice(from, 1)[0]);
  }

  public clear(): void {
    this._subplots.splice(0, this._subplots.length);
    this._subplots.push(new Axes(this));
  }
}

export class Axes {
  private readonly _model: ChartModel;
  private _series: Series[] = [];

  constructor(model: ChartModel) {
    this._model = model;
  }

  public model(): ChartModel {
    return this._model;
  }

  public series(): Series[] {
    return this._series;
  }

  public createSeries<T extends SeriesType>(
    seriesType: T,
    options: SeriesOptionsMap[T]
  ): Series<T> {
    const series = new Series(this, seriesType, options);
    this._series.push(series);
    return series;
  }

  public removeSeries(series: Series): void {
    const seriesIndex = this._series.indexOf(series);
    assert(seriesIndex !== -1, 'Series not found');
    this._series.splice(seriesIndex, 1);
  }

  public removeSeriesAt(index: number): void {
    this._series.splice(index, 1);
  }

  public removeAllSeries(): void {
    this._series.splice(0, this._series.length);
  }
}
