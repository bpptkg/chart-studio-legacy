import { defineStore } from 'pinia'
import moment from 'moment'
import axios, { AxiosInstance } from 'axios'
import { DATE_FORMAT } from '@/constants/datetime'
import type { DateInterval } from '@/model/types'
import type { GraphRequestResponse } from '@/types/chartRequest'

export const api: AxiosInstance = axios.create({
  baseURL: `${process.env.VUE_APP_PLOTREQUEST_URL}`,
  headers: {
    Authorization: `Api-Key ${process.env.VUE_APP_PLOTREQUEST_API_KEY}`,
  },
})

interface ChartItem {
  name: string
  title: string
  isChecked: boolean
}

interface State {
  options: ChartItem[]
  data: GraphRequestResponse | null
  interval: DateInterval
  isBusy: boolean
  snackbar: boolean
  errorMessage: string
}

export const useRequestStore = defineStore('request', {
  state: (): State => {
    return {
      interval: {
        end: moment().format(DATE_FORMAT),
        start: moment().subtract(3, 'days').format(DATE_FORMAT),
      },
      data: null,
      isBusy: false,
      snackbar: false,
      errorMessage: '',
      options: [
        {
          name: 'weekly_report',
          title: 'Grafik Laporan Mingguan',
          isChecked: false,
        },
        {
          name: 'doas',
          title: 'DOAS',
          isChecked: false,
        },
        {
          name: 'awanpanas',
          title: 'Jarak Luncur AP',
          isChecked: false,
        },
        {
          name: 'edm',
          title: 'EDM',
          isChecked: false,
        },
        {
          name: 'energy',
          title: 'Energi Seismik',
          isChecked: false,
        },
        {
          name: 'gps_bpptkg',
          title: 'GPS BPPTKG',
          isChecked: false,
        },
        {
          name: 'gps_dels',
          title: 'GPS Deles',
          isChecked: false,
        },
        {
          name: 'gps_klat',
          title: 'GPS Klatakan',
          isChecked: false,
        },
        {
          name: 'gps_pasb',
          title: 'GPS Pasarbubar',
          isChecked: false,
        },
        {
          name: 'seismicity',
          title: 'Seismisitas',
          isChecked: false,
        },
        {
          name: 'rsam_infrasound_kendit',
          title: 'RSAM Infrasound Kendit',
          isChecked: false,
        },
        {
          name: 'rsam_seismic_kendit',
          title: 'RSAM Seismik Kendit',
          isChecked: false,
        },
        {
          name: 'rsam_seismic_pasarbubar',
          title: 'RSAM Seismik Pasarbubar',
          isChecked: false,
        },
        {
          name: 'thermal',
          title: 'Thermal',
          isChecked: false,
        },
        {
          name: 'joinplot',
          title: 'Multi-Parameter',
          isChecked: false,
        },
        {
          name: 'joinplot_phases',
          title: 'Multi-Parameter dengan Fase',
          isChecked: false,
        },
        {
          name: 'tiltborehole_bawahkendit',
          title: 'Tiltmeter Borehole Bawah Kendit',
          isChecked: false,
        },
        {
          name: 'tiltborehole_kendit',
          title: 'Tiltmeter Borehole Kendit',
          isChecked: false,
        },
        {
          name: 'tiltborehole_klatakan',
          title: 'Tiltmeter Borehole Klatakan',
          isChecked: false,
        },
        {
          name: 'tiltborehole_lavaflow1902',
          title: 'Tiltmeter Borehole Lava Flow 1902',
          isChecked: false,
        },
        {
          name: 'tiltborehole_lavaflow1953',
          title: 'Tiltmeter Borehole Lava Flow 1953',
          isChecked: false,
        },
        {
          name: 'tiltmeter_babadan',
          title: 'Tiltmeter Babadan',
          isChecked: false,
        },
        {
          name: 'tiltmeter_grawah',
          title: 'Tiltmeter Grawah',
          isChecked: false,
        },
        {
          name: 'tiltmeter_gunungijo',
          title: 'Tiltmeter Gunungijo',
          isChecked: false,
        },
        {
          name: 'tiltmeter_klatakan',
          title: 'Tiltmeter Klatakan',
          isChecked: false,
        },
        {
          name: 'tiltmeter_labuhan',
          title: 'Tiltmeter Labuhan',
          isChecked: false,
        },
        {
          name: 'tiltmeter_patuk',
          title: 'Tiltmeter Patuk',
          isChecked: false,
        },
        {
          name: 'tiltmeter_selokopo',
          title: 'Tiltmeter Selokopo',
          isChecked: false,
        },

        {
          name: 'vogamos',
          title: 'Vogamos',
          isChecked: false,
        },
      ],
    }
  },
  actions: {
    setInterval(interval: DateInterval): void {
      this.$patch((state) => {
        state.interval = interval
      })
    },

    async request() {
      this.$patch((state) => {
        state.isBusy = true
      })

      await api
        .post<GraphRequestResponse>('/api/request/', {
          start_date: this.interval.start,
          end_date: this.interval.end,
          graph_choices: this.options
            .filter((option) => option.isChecked)
            .map((option) => option.name),
        })
        .then((response) => {
          this.$patch((state) => {
            state.data = response.data
          })
        })
        .catch(() => {
          this.$patch((state) => {
            state.errorMessage = 'Unable to fetch data.'
            this.snackbar = true
          })
        })
        .finally(() => {
          this.$patch((state) => {
            state.isBusy = false
          })
        })
    },
  },
})
