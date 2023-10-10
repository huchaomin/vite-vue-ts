/*
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-07-24 09:32:25
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-10-10 14:23:16
 * @Description  :
 */
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify, type ThemeDefinition } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

const customLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: '#4F7DFF',
    // success: '#56CA00',
    // info: '#16B1FF',
    // warning: '#FFB400',
    // error: '#FF4C51',
    background: '#F4F5FA',
    'on-background': '#3A3541', // .v-application 的 color
    'on-surface': '#3A3541', // 普通组件的color
  },
  variables: {
    // Shadows
    'shadow-key-umbra-opacity': 'rgba(var(--v-theme-on-surface), 0.08)',
    'shadow-key-penumbra-opacity': 'rgba(var(--v-theme-on-surface), 0.12)',
    'shadow-key-ambient-opacity': 'rgba(var(--v-theme-on-surface), 0.04)',
  },
}
export default createVuetify({
  theme: {
    defaultTheme: 'customLightTheme',
    themes: {
      customLightTheme,
    },
  },
  defaults: {
    global: {
      // density: 'compact',
      noDataText: '暂无数据',
    },
    VOverlay: {
      persistent: true,
      noClickAnimation: true,
    },
    VDialog: {
      persistent: true,
      retainFocus: false,
    },
    VSnackbar: {
      location: 'top right',
      timeout: 3000,
    },
    VTooltip: {
      location: 'top',
    },
    VList: {
      lines: false,
      density: 'comfortable',
    },
    VMenu: {
      openDelay: 100,
      transition: 'slide-y-transition',
    },
    VAlert: {
      density: 'compact',
      elevation: 6,
      minWidth: 300,
      border: 'start',
      variant: 'tonal',
      class: 'bg-white',
    },
    VCard: {
      variant: 'elevated',
    },
    VForm: {
      validateOn: 'input lazy',
    },
    VCheckboxBtn: {
      color: 'primary',
    },
    VCheckbox: {
      color: 'primary',
      density: 'compact',
    },
    VRadioGroup: {
      color: 'primary',
      density: 'compact',
    },
    VRadio: {
      density: 'compact',
      color: 'primary',
    },
    VSelect: {
      variant: 'outlined',
      color: 'primary',
      density: 'compact',
      itemTitle: 'label',
      closableChips: true,
    },
    VBtn: {
      color: 'primary',
      // style: 'text-transform: none;',
      class: 'text-none elevation-0',
    },
    VTextField: {
      variant: 'outlined',
      color: 'primary',
      density: 'compact',
    },
    VAutocomplete: {
      variant: 'outlined',
      color: 'primary',
    },
    VCombobox: {
      variant: 'outlined',
      color: 'primary',
    },
    VFileInput: {
      variant: 'outlined',
      color: 'primary',
    },
    VTextarea: {
      variant: 'outlined',
      density: 'compact',
      color: 'primary',
    },
    VSwitch: {
      // set v-switch default color to primary
      color: 'primary',
    },
    VNavigationDrawer: {
      class: 'bg-filter',
      elevation: 6,
    },
    VAppBar: {
      class: 'bg-filter',
      elevation: 6,
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})
