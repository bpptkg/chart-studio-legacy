import { DateInterval } from '@/model/types'
import { assert } from '@/shared/assertions'
import { defineStore } from 'pinia'

interface State {
  /**
   * Array of date intervals.
   */
  intervals: DateInterval[]
}

export const useCompareStore = defineStore('compare', {
  state: (): State => {
    return {
      intervals: [],
    }
  },
  actions: {
    addInterval(interval: DateInterval): void {
      this.intervals.push(interval)
    },

    removeInterval(index: number): void {
      const length = this.intervals.length
      assert(index >= 0 && index < length, 'Interval index out of range')
      this.intervals.splice(index, 1)
    },

    replaceInterval(interval: DateInterval, index: number): void {
      const length = this.intervals.length
      assert(index >= 0 && index < length, 'Interval index out of range')

      this.$patch((state) => {
        state.intervals[index].start = interval.start
        state.intervals[index].end = interval.end
      })
    },
  },
})
