// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function warn(msg: string, ...args: any[]): void {
  console.warn(`[ChartStudio warn] ${msg}`, ...args)
}
