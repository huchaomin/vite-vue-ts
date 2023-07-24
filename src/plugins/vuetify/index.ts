import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import { createVuetify, type ThemeDefinition } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

const customLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: '#9155FD',
    secondary: '#8A8D93',
    'on-secondary': '#fff',
    success: '#56CA00',
    info: '#16B1FF',
    warning: '#FFB400',
    error: '#FF4C51',
    'on-primary': '#FFFFFF',
    'on-success': '#FFFFFF',
    'on-warning': '#FFFFFF',
    background: '#F4F5FA',
    'on-background': '#3A3541',
    'on-surface': '#3A3541',
    'grey-50': '#FAFAFA',
    'grey-100': '#F0F2F8',
    'grey-200': '#EEEEEE',
    'grey-300': '#E0E0E0',
    'grey-400': '#BDBDBD',
    'grey-500': '#9E9E9E',
    'grey-600': '#757575',
    'grey-700': '#616161',
    'grey-800': '#424242',
    'grey-900': '#212121',
    'perfect-scrollbar-thumb': '#DBDADE',
    'skin-bordered-background': '#fff',
    'skin-bordered-surface': '#fff',
  },
};
export default createVuetify({
  theme: {
    defaultTheme: 'customLightTheme',
    themes: {
      customLightTheme,
    },
  },
  defaults: {
    VTooltip: {
      // set v-tooltip default location to top
      location: 'top',
    },
    VCheckboxBtn: {
      color: 'primary',
    },
    VCheckbox: {
      // set v-checkbox default color to primary
      color: 'primary',
      density: 'compact',
      hideDetails: 'auto',
    },
    VRadioGroup: {
      color: 'primary',
      density: 'compact',
      hideDetails: 'auto',
    },
    VRadio: {
      density: 'compact',
      hideDetails: 'auto',
    },
    VSelect: {
      variant: 'outlined',
      color: 'primary',
      hideDetails: 'auto',
      density: 'compact',
      itemTitle: 'label',
    },
    VBtn: {
      color: 'primary',
      // style: 'text-transform: none;',
      class: 'text-none',
    },
    VTextField: {
      variant: 'outlined',
      color: 'primary',
      hideDetails: 'auto',
      density: 'compact',
    },
    VAutocomplete: {
      variant: 'outlined',
      color: 'primary',
      hideDetails: 'auto',
      VChip: {
        density: 'default',
      },
    },
    VCombobox: {
      variant: 'outlined',
      color: 'primary',
      hideDetails: 'auto',
    },
    VFileInput: {
      variant: 'outlined',
      color: 'primary',
      hideDetails: 'auto',
    },
    VTextarea: {
      variant: 'outlined',
      density: 'compact',
      color: 'primary',
      hideDetails: 'auto',
    },
    VSwitch: {
      // set v-switch default color to primary
      color: 'primary',
      hideDetails: 'auto',
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },

});
