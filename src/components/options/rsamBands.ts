import { RsamSeismicConfig } from '@/model/types'

export default [
  { value: 'band0', text: 'RSAM' },
  { value: 'band1', text: 'Band 1 (0.5 - 2.5 Hz)' },
  { value: 'band2', text: 'Band 2 (2.5 - 4.5 Hz)' },
  { value: 'band3', text: 'Band 3 (4.5 - 6.5 Hz)' },
  { value: 'band4', text: 'Band 4 (6.5 - 8.5 Hz)' },
  { value: 'band5', text: 'Band 5 (8.5 - 10.5 Hz)' },
  { value: 'band6', text: 'Band 6 (10.5 - 12.5 Hz)' },
  { value: 'band7', text: 'Band 7 (12.5 - 14.5 Hz)' },
  { value: 'band8', text: 'Band 8 (14.5 - 16.5 Hz)' },
  { value: 'band9', text: 'Band 9 (16.5 - 18.5 Hz)' },
  { value: 'band10', text: 'Band 10 (18.5 - 20.5 Hz)' },
  { value: 'band11', text: 'Band 11 (20.5 - 22.5 Hz)' },
  { value: 'band12', text: 'Band 12 (22.5 - 24.5 Hz)' },
  { value: 'band13', text: 'Band 13 (24.5 - 26.5 Hz)' },
] as {
  value: RsamSeismicConfig['band']
  text: string
}[]
