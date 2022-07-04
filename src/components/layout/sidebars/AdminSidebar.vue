<template>
  <v-navigation-drawer
    id="admin-sidebar"
    v-model="drawer"
    :dark="barColor !== 'rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)'"
    :expand-on-hover="expandOnHover"
    :right="$vuetify.rtl"
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

    <v-divider class="mb-3" />

    <v-list
      dense
      nav
    >
      <v-list-item             
        to="/">

        <!--
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
        -->

        <v-list-item-content>
          <v-list-item-title
            class="text-h5 font-weight-medium"
            v-text="profile.title"
          />
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider class="mb-2" />
    <v-treeview
      rounded
      hoverable
      activatable
      :items="treeItems"
      color="warning"
      :active.sync="active"
      :open.sync="open"
    >
      <template slot="label" slot-scope="props">
        <!--
          <router-link :to="props.item.to" v-if="props.item.to">{{ props.item.name }}</router-link>
        -->  
          <span v-if="props.item.to" @click="vTreeLink(props.item)">{{ props.item.name }}</span>
          <span v-else>{{ props.item.name }}</span>
      </template>

    </v-treeview>

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
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  const layoutStore = 'layoutStore'

  export default {
    name:'AdminSidebar',
    data: () => ({
      barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
      expandOnHover: false,
      open: [],
      active: [],
      payload:{
        open: [],
        active: []
      },
      treeItems: [
        {
          id: 1,
          name: 'dashboard',
          to: '/admin/dashboard' ,
        },
        {
          id: 2,
          name: '기준정보',
          to: '',
          children: [
            {
              id: 3,
              name: '정비작업',
              to:'/admin/stad/workInfo',
            },
            {
              id: 4,
              name: '장비',
              to:'/admin/stad/equipInfo',
            },
            {
              id: 5,
              name: '영상',
              to:'/admin/stad/tdmotionInfo',
            },
            {
              id: 6,
              name: '활동',
              to:'/admin/stad/activityInfo',
            },
            {
              id: 7,
              name: '정비작업별 장비선택',
              to:'/admin/stad/workEquipmentInfo',
            },
            {
              id: 8,
              name: '정비작업별 모션선택',
              to:'/admin/stad/workTdmotionInfo',
            },
            {
              id: 9,
              name: '기초코드',
              to:'/admin/stad/codeInfo',
            },
            {
              id: 10,
              name: '유형별 보고서',
              to:'/admin/stad/resultItemInfo',
            },
          ]
        },        
        {
          id: 11,
          name: '교육정보',
          to: '',
          children: [
            {
              id: 12,
              name: '수강생정보',
              to:'/admin/edun/workerInfo',
            },
            {
              id: 13,
              name: '수강생활동정보',
              to:'/admin/edun/workerActivityInfo',
            },
            {
              id: 14,
              name: '수강생선택장비정보',
              to:'/admin/edun/workerEquipmentInfo',
            },
            {
              id: 15,
              name: '수강생선택모션정보',
              to:'/admin/edun/workerTdmotionInfo',
            },
            {
              id: 16,
              name: '수강생보고서정보',
              to:'/admin/edun/WorkerResultItemInfo',
            },
          ]  
        },
        {
          id: 17,
          name: '시스템정보',
          to: '',
          children: [
            {
              id: 18,
              name: '관리자정보',
              to:'/admin/sysm/userInfo',
            },
          ]  
        },
        {
          id: 19,
          name: '테스트',
          to: '',
          children: [
            {
              id: 20,
              name: 'user',
              to:'/admin/user',
            },
            {
              id: 21,
              name: 'rtables',
              to:'/admin/regular-tables',
            },
            {
              id: 22,
              name: 'typography',
              to:'/admin/typography',
            },
            {
              id: 23,
              name: 'icons',
              to:'/admin/icons',
            },
            {
              id: 24,
              name: 'google',
              to:'/admin/google-maps',
            },
            {
              id: 25,
              name: 'notifications',
              to:'/admin/notifications',
            },
          ]
        },
      ],

    }),
    computed: {
      ...mapGetters(layoutStore, [
        'GE_DRAWER', 'GE_TREE'
      ]),        
      
      drawer: {
        get () {
          return this.GE_DRAWER
        },
        set (val) {
          this.AC_DRAWER(val)
        },
      },

      profile () {
        return {
          avatar: true,
          title: 'MTS',
        }
      },
    },
    watch: {
      active() {
        this.setPayload()
        //console.log('arr active : ' + arr)
      },
      open() {
        this.setPayload()
        //console.log('arr open : ' + arr)
      },
    },
    mounted() {
      //console.log('mounted')
      if(this.$route.path.indexOf('/admin/dashboard') > -1)
        this.active = [1]
      else
        this.setTree()
    },
    beforeDestroy() {
      //console.log('beforeDestroy')
      this.clearPayload()
    },     
    methods: {
      ...mapActions(layoutStore, [
          'AC_DRAWER', 'AC_TREE' 
      ]),

      setTree() {
        if(this.GE_TREE.active.length !== undefined)
          this.active = this.GE_TREE.active
        if(this.GE_TREE.open.length !== undefined)
          this.open = this.GE_TREE.open
      },
      setPayload() {
        this.payload.active = this.active
        this.payload.open = this.open

        this.AC_TREE(this.payload)
      },
      clearPayload() {
        this.payload.active = []
        this.payload.open = []

        this.AC_TREE(this.payload)
      },
      vTreeLink(items) {
        if(this.$route.path!==items.to) 
          this.$router.push(items.to)
        console.log('items : ' + JSON.stringify(items, null, 2))  
      },
    },
  }
</script>
