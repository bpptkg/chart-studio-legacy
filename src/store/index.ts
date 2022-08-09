import { createPinia, PiniaVuePlugin } from 'pinia'
import Vue from 'vue'

Vue.use(PiniaVuePlugin)

const pinia = createPinia()

export default pinia
