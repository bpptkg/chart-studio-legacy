import { computed, getCurrentInstance } from 'vue'

export const THEME_KEY = 'cs:dark-theme'

export function useTheme() {
  const app = getCurrentInstance()
  const isDarkTheme = computed(() => {
    return app?.proxy.$vuetify.theme.dark
  })

  const isLightTheme = computed(() => {
    return !isDarkTheme.value
  })
  return { isDarkTheme, isLightTheme }
}
