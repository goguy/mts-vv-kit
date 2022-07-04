<template>
  <v-app>
  <v-app-bar
    id="app-bar"
    absolute
    app
    color="transparent"
    flat
    height="75"
  >
    <v-btn
      class="mr-3"
      elevation="1"
      fab
      small
      @click="drawer = !drawer"
    >    
      <!--
      <v-icon v-if="value">
        mdi-view-quilt
      </v-icon>

      <v-icon v-else>
        mdi-dots-vertical
      </v-icon>
      -->
      <v-icon>
        mdi-dots-vertical
      </v-icon>

    </v-btn>

    <v-toolbar-title
      class="hidden-sm-and-down font-weight-light"
      v-text="$route.name"
    />

    <v-spacer />


    <div class="mx-3" />

    <v-btn
      class="ml-2"
      min-width="0"
      text
      to="/"
    >
      <v-icon>mdi-view-dashboard</v-icon>
    </v-btn>

    <v-menu
      bottom
      left
      offset-y
      origin="top right"
      transition="scale-transition"
    >
      <template v-slot:activator="{ attrs, on }">
        <v-btn
          class="ml-2"
          min-width="0"
          text
          v-bind="attrs"
          v-on="on"
        >
          <v-badge
            color="red"
            overlap
            bordered
          >
            <template v-slot:badge>
              <span>5</span>
            </template>

            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </v-btn>
      </template>

      <v-list
        :tile="false"
        nav
      >
        <div>
          <app-bar-item
            v-for="(n, i) in notifications"
            :key="`item-${i}`"
          >
            <v-list-item-title v-text="n" />
          </app-bar-item>
        </div>
      </v-list>
    </v-menu>

    <v-btn
      class="ml-2"
      min-width="0"
      text
      to="/pages/user"
    >
      <v-icon>mdi-account</v-icon>
    </v-btn>
  </v-app-bar>
  <v-navigation-drawer
    id="core-navigation-drawer"
    v-model="drawer"
    :dark="barColor !== 'rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)'"
    :expand-on-hover="expandOnHover"
    :right="$vuetify.rtl"
    :src="barImage"
    mobile-breakpoint="960"
    app
    width="260"
    v-bind="$attrs"
  >
    <template v-slot:img="props">
      <v-img
        :gradient="`to bottom, ${barColor}`"
        v-bind="props"
      />
    </template>

    <v-divider class="mb-1" />

    <v-list
      dense
      nav
    >
      <v-list-item>
        <v-list-item-avatar
          class="align-self-center"
          color="white"
          contain
        >
          <v-img
            src="https://demos.creative-tim.com/vuetify-material-dashboard/favicon.ico"
            max-height="30"
          />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title
            class="text-h4"
            v-text="profile.title"
          />
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider class="mb-2" />

    <v-list
      expand
      nav
    >
      <!-- Style cascading bug  -->
      <!-- https://github.com/vuetifyjs/vuetify/pull/8574 -->
      <div />

      <template v-for="(item, i) in computedItems">
        <base-item-group
          v-if="item.children"
          :key="`group-${i}`"
          :item="item"
        >
          <!--  -->
        </base-item-group>

        <base-item
          v-else
          :key="`item-${i}`"
          :item="item"
        />
      </template>

      <!-- Style cascading bug  -->
      <!-- https://github.com/vuetifyjs/vuetify/pull/8574 -->
      <div />
    </v-list>

    <template v-slot:append>
      <base-item
        :item="{
          title: 'upgrade',
          icon: 'mdi-package-up',
          to: '/admin/upgrade',
        }"
      />
    </template>
  </v-navigation-drawer>
  <v-main>
    <router-view />

    <v-footer
      id="dashboard-core-footer"
    >
      <v-container>
        <v-row
          align="center"
          no-gutters
        >
          <v-col
            v-for="(link, i) in links"
            :key="i"
            class="text-center mb-sm-0 mb-5"
            cols="auto"
          >
            <a
              :href="link.href"
              class="mr-0 grey--text text--darken-3"
              rel="noopener"
              target="_blank"
              v-text="link.text"
            />
          </v-col>

          <v-spacer class="hidden-sm-and-down" />

          <v-col
            cols="12"
            md="auto"
          >
            <div class="text-body-1 font-weight-light pt-6 pt-md-0 text-center">
              &copy; 2019, made with
              <v-icon size="18">
                mdi-heart
              </v-icon>
              by <a href="https://www.creative-tim.com">Creative Tim</a> for a better web.
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-main>

  </v-app>
</template>

<script>
  // Components
  //import { VHover, VListItem } from 'vuetify/lib'


  export default {
    name:'Admin',
/*    
    components: {
      AppBarItem: {
        render (h) {
          return h(VHover, {
            scopedSlots: {
              default: ({ hover }) => {
                return h(VListItem, {
                  attrs: this.$attrs,
                  class: {
                    'black--text': !hover,
                    'white--text secondary elevation-12': hover,
                  },
                  props: {
                    activeClass: '',
                    dark: hover,
                    link: true,
                    ...this.$attrs,
                  },
                }, this.$slots.default)
              },
            },
          })
        },
      },
    },
    props: {
      value: {
        type: Boolean,
        default: false,
      },
    },
    */

    data: () => ({
      barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
      barImage: 'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg',
      drawer: null,
      expandOnHover: false,
      notifications: [
        'Mike John Responded to your email',
        'You have 5 new tasks',
        'You\'re now friends with Andrew',
        'Another Notification',
        'Another one',
      ],
      items: [
        {
          icon: 'mdi-view-dashboard',
          title: 'dashboard',
          to: '/admin',
        },
        {
          icon: 'mdi-account',
          title: 'user',
          to: '/admin/user',
        },
        {
          title: 'rtables',
          icon: 'mdi-clipboard-outline',
          to: '/admin/regular-tables',
        },
        {
          title: 'typography',
          icon: 'mdi-format-font',
          to: '/admin/typography',
        },
        {
          title: 'icons',
          icon: 'mdi-chart-bubble',
          to: '/admin/icons',
        },
        {
          title: 'google',
          icon: 'mdi-map-marker',
          to: '/admin/google-maps',
        },
        {
          title: 'notifications',
          icon: 'mdi-bell',
          to: '/admin/notifications',
        },
      ],
      links: [
        {
          href: '#',
          text: 'Creative Tim',
        },
        {
          href: '#',
          text: 'About Us',
        },
        {
          href: '#',
          text: 'Blog',
        },
        {
          href: '#',
          text: 'Licenses',
        },
      ],

    }),
    computed: {
      computedItems () {
        return this.items.map(this.mapItem)
      },
      profile () {
        return {
          avatar: true,
          title: 'MTS',
        }
      },
    },
    methods: {
      mapItem (item) {
        return {
          ...item,
          children: item.children ? item.children.map(this.mapItem) : undefined,
          title: item.title,
        }
      },
    },



  }
</script>