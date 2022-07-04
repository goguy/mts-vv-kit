<template>
    <v-app-bar
      app
      color="white"
      dense
      elevation="1"
      flat
    >
      <v-container class="py-0 fill-height">
        <v-toolbar-title class="text-h5 font-weight-medium">
          <router-link to="/"
            class="text-decoration-none black--text">
            MTS</router-link>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <index-dropdown />

      </v-container>
    </v-app-bar>
</template>

<script>
import IndexDropdown from '@/components/dropdowns/IndexDropdown.vue'

export default {
  data() {
    return {
    }
  },
  components: {
    IndexDropdown
  },

  methods: {
  },
};
</script>
