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

        <v-btn
          v-for="(link, i) in links"
          :key="i"
          v-bind="link"
          class="hidden-sm-and-down"
          text
          @click="onClick($event, link)"
        >
          {{ link.text }}
        </v-btn>

        <index-dropdown />

      </v-container>
    </v-app-bar>
</template>

<script>
import IndexDropdown from '@/components/dropdowns/IndexDropdown.vue'

export default {
  data() {
    return {
      links: [
        {
          text: 'Home',
          href: '#!',
        },
        {
          text: 'About',
          href: '#about',
        },
      ],

    }
  },
  components: {
    IndexDropdown
  },

  methods: {
    onClick (e, item) {
      e.stopPropagation()

      if (item.to || !item.href) return

      this.$vuetify.goTo(item.href.endsWith('!') ? 0 : item.href)
    },
  },
};
</script>
