import { SeriesOptionsMap, SeriesType } from './seriesOptions';
import { Axes, ChartModel } from './chartModel';
import { SeriesDataItemTypeMap } from './seriesData';

export type SeriesOptionsInternal<T extends SeriesType = SeriesType> =
  SeriesOptionsMap[T];

export class Series<T extends SeriesType = SeriesType> {
  private readonly _axes: Axes;
  private readonly _seriesType: T;
  private readonly _options: SeriesOptionsInternal<T>;
  private _data: readonly SeriesDataItemTypeMap[T][] = [];
  private _visible = true;
  private _zorder = 0;
  public name = '';

  public constructor(
    axes: Axes,
    seriesType: T,
    options: SeriesOptionsInternal<T>
  ) {
    this._axes = axes;
    this._options = options;
    this._seriesType = seriesType;
  }

  public model(): ChartModel {
    return this._axes.model();
  }

  public axes(): Axes {
    return this._axes;
  }

  public options(): Readonly<SeriesOptionsMap[T]> {
    return this._options as SeriesOptionsMap[T];
  }

  public seriesType(): T {
    return this._seriesType;
  }

  public visible(): boolean {
    return this._visible;
  }

  public setVisible(value: boolean): void {
    this._visible = value;
  }

  public zorder(): number {
    return this._zorder;
  }

  public setZorder(zorder: number): void {
    this._zorder = zorder;
  }

  public data(): readonly SeriesDataItemTypeMap[T][] {
    return this._data;
  }

  public setData(data: readonly SeriesDataItemTypeMap[T][]): void {
    this._data = data;
  }
}
