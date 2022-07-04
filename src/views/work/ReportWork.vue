<template>
  <v-container
    id="report-work"
    tag="section"
  >

    <v-row>
      <v-col
        cols="12"
      >
        <v-card>
          <v-tabs
            v-model="tab"
            class="tab-index"
          >
            <v-tab
              v-for="item in items"
              :key="item.name"
              :to="item.src"
            >
              {{ item.name }}
            </v-tab>
          </v-tabs>            
            <router-view />
        </v-card>
      </v-col>
    </v-row>
                  

  </v-container>
</template>

<script>

export default {
  name: 'report-work',
  data () {
    return {
      tab: null,
      items: [
        {name: 'Reporting', src:'/work/report/reporting'},
        {name: 'Report', src:'/work/report/report'},
        {name: 'Cards', src:'/work/report/cards'},
        {name: 'Expansion-Panels', src:'/work/report/expansionPanels'}, 
        {name: 'Steppers-Vertical', src:'/work/report/steppersVertical'}
      ],
    }
  },  
}

</script>
<style scoped>

.tab-index {
  position: relative;
  z-index: 1;
}
</style>