<template>
    <v-app-bar
      app
      color="#1E293B"
      dark
      flat
      :style="`background-image: url('${registerBg2}');`"
    >
      <v-container class="py-0 fill-height">
        <v-toolbar-title class="text-h5 font-weight-medium">
          <router-link to="/"
          class="text-decoration-none white--text">
          MTS</router-link>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <index-dropdown />

      </v-container>
    </v-app-bar>
</template>

<script>
import IndexDropdown from '@/components/dropdowns/IndexDropdown.vue'

import registerBg2 from '@/assets/img/register_bg_2.png'

export default {
  data() {
    return {
      registerBg2,      
    };
  },
  components: {
    IndexDropdown
  },

};
</script>
