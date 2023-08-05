import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify, type ThemeDefinition } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

const customLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: '#4F7DFF',
    success: '#56CA00',
    info: '#16B1FF',
    warning: '#FFB400',
    error: '#FF4C51',
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
    VOverlay: {
      persistent: true,
      noClickAnimation: true,
    },
    VDialog: {
      persistent: true,
      noClickAnimation: true,
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
      density: 'compact',
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
    },
    VSelect: {
      variant: 'outlined',
      color: 'primary',
      density: 'compact',
      itemTitle: 'label',
    },
    VBtn: {
      color: 'primary',
      size: 'small',
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
      VChip: {
        density: 'default',
      },
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
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})
