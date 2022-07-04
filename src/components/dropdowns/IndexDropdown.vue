<template>
  <v-menu
    bottom
    left
    min-width="200"
    offset-y
    origin="top right"
    transition="scale-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        icon
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>

    <v-list
      :tile="false"
      flat
      nav      
    >
      <template v-for="(p, i) in items">
        <v-divider 
          v-if="p.divider"
          :key="`divider-${i}`"
          class="mb-2 mt-2"
        />
        <v-list-item
          v-else-if="p.router==='Logout'" 
          :key="`item-${i}`"
           @click="Logout"
        >  
          <v-list-item-title v-text="p.title" />
        </v-list-item>

        <v-list-item
          v-else
          :key="`item-${i}`"
          :to="p.router" 
        >  
          <v-list-item-title v-text="p.title" />
        </v-list-item>
      </template>
    </v-list>
  </v-menu>       
</template>

<script>
import { mapGetters } from 'vuex'
import VueCookies from 'vue-cookies'

const tokenStore = 'tokenStore'


export default {
  name: 'IndexDropdown',

  data() {
    return {
      itemsBackup: [
        { title: 'Work', router: '/work/choiceWork' },
        { title: 'Report', router: '/work/evaling' },
        { divider: true, router: '' },
        { title: 'Login', router: '/auth/login' },
        { title: 'Register', router: '/auth/register' },
        { divider: true, router: '' },
        { title: 'Admin', router: '/admin' },
        { title: 'Logout', router: 'Logout' },
      ],
      snackbar: {
        isSnackbar: false,
        vertical: true,
        message: '',
      }
    };
  },
  computed: {
    ...mapGetters(tokenStore, [
      'GE_TOKEN'
    ]),    

    items() {
      let itemsArr
      if(VueCookies.get('accessToken') !== null){
        if(this.$route.path.indexOf('/admin') > -1){
          itemsArr = [
            { title: 'Work', router: '/work/choiceWork' },
            { title: 'Report', router: '/work/evaling' },
            { divider: true, router: '' },
            { title: 'Logout', router: 'Logout' },
          ]
        }else{
          itemsArr = [
            { title: 'Work', router: '/work/choiceWork' },
            { title: 'Report', router: '/work/evaling' },
            { divider: true, router: '' },
            { title: 'Admin', router: '/admin' },
            { title: 'Logout', router: 'Logout' },
          ]
        }
      }else{
        itemsArr = [
          { title: 'Work', router: '/work/choiceWork' },
          { title: 'Report', router: '/work/evaling' },
          { divider: true, router: '' },
          { title: 'Login', router: '/auth/login' },
          { title: 'Register', router: '/auth/register' },
        ]
      }
        return itemsArr
    },

  },
  watch: {


  },
  methods: {
    Logout() {
      VueCookies.remove('accessToken')
      VueCookies.remove('refreshToken')      
      alert('로그아웃되었습니다.')
      //현재페이지 재호출
      this.$router.go(this.$router.currentRoute)
    },
  },
};
</script>
