import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
export default createVuetify({
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
