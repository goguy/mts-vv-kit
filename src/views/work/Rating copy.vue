<template>
  <v-container>
    <v-img
      :src="require('@/assets/img/saveTank.png')"
      :min-height="minHeight"
    >
      <section id="work-rating">
        <v-container
          tag="section">
          <v-row>
            <v-col
              cols="auto"
              class="mr-auto"
            >
              <v-card
                class="pa-2"
                outlined
                tile
              >
                {{workName}}
              </v-card>

            </v-col>
            <v-col cols="auto">

              <v-card
                  :loading="loading"
                  class="mx-auto"
                  max-width="500"
                >
                <v-list dense>
                  <v-list-item-group
                    color="primary"
                  >
                    <v-list-item
                    >
                      <v-list-item-icon>
                        <v-icon>mdi-account</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ worker }}
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item
                    >
                      <v-list-item-icon>
                        <v-icon>mdi-clock</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>
                        <timer :time="workingTime"></timer>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
    <!--
                <v-divider class="mx-4"></v-divider>
                <v-card-actions>
                  <v-btn
                    color="deep-purple lighten-2"
                    rounded
                    dark
                    elevation="1"
                    @click="startTimer"          
                  >
                    Start
                  </v-btn>
                  <v-btn
                    color="deep-purple lighten-2"
                    rounded
                    dark
                    elevation="1"
                    @click="stopTimer"          
                  >
                    Stop
                  </v-btn>
                  <v-btn
                    color="deep-purple lighten-2"
                    rounded
                    dark
                    elevation="1"
                    @click="resetTimer"          
                  >
                    Reset
                  </v-btn>
                  <v-btn
                    color="deep-purple lighten-2"
                    rounded
                    dark
                    elevation="1"
                    @click="limitTimer"          
                  >
                    Limit
                  </v-btn>
                </v-card-actions>
    -->
              </v-card>

            </v-col>
          </v-row>
        </v-container>
        <router-view />
        <v-snackbar
              v-model="snackbar"
              :vertical="vertical"
            >
              {{ text }}

              <template v-slot:action="{ attrs }">
                <v-btn
                  color="indigo"
                  text
                  v-bind="attrs"
                  @click="nextStep()"
                >
                  Work Report
                </v-btn>
              </template>
        </v-snackbar>    

        <div v-show="!menuHidden" class="work-sub-menu-wrap">
          <div>
          <template >
            <v-fab-transition>
              <v-btn
                color="pink"
                fab
                dark
                small
                absolute
                bottom
                right
                @click="subMenuHidden= !subMenuHidden"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-fab-transition>
          </template>
          </div>

          <div v-show="!subMenuHidden" class="work-sub-menu">
            <div class="my-2">
              <v-btn
                block
                dark
                rounded
                large
                color="primary"
                to="/work/rate/prepareWork"
              >

                작업준비
              </v-btn>
            </div>
            <div class="my-2">
              <v-btn
                block
                dark
                rounded
                large
                color="primary"
                to="/work/rate/guideWork"
              >

                작업가이드
              </v-btn>
            </div>
            <div class="my-2">
              <v-btn
                block
                dark
                rounded
                large
                color="primary"
                to="/work/rate/orderWork"
              >
                작업허가서
              </v-btn>
            </div>
            <div class="my-2">
              <v-btn
                block
                dark
                rounded
                large
                color="primary"
                to="/work/rate/choiceEquipmentWork"
              >
                보호구/장비선택
              </v-btn>
            </div>
            <div class="my-2">
              <v-btn
                block
                dark
                rounded
                large
                color="primary"
                to="/work/rate/doWork"
              >
                작업하기
              </v-btn>
            </div>
          </div>

        </div>

      <!-- work time 초과시 -->
        <v-overlay
          :z-index="zIndex"
          :value="overlay"
        >
          <v-btn
            class="white--text"
            color="teal"
            @click="messageSnackbar"
          >
            Message Confirm
          </v-btn>
        </v-overlay>
      </section>
    </v-img>  
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'

const workStore = 'workStore'
const workerStore = 'workerStore'


let Timer = {
	template: `
		 <span>{{ time | workTime }}</span> 
	`,
	props:['time'],
	filters: {
		 workTime : function(value) {
			  let data = value.split(':')
			  let hours = data[0]
        let minutes = data[1]
			  let secondes = data[2]
			  return hours+":"+minutes+":"+secondes
		 }
	}
}

export default {
  name: 'Rating',
  components: {
    'timer':Timer
  },    
  data: () => ({
    isTimerRunning: false,
    minutes:0,
    secondes:0,
    timeWork:0,
    limitTime:1,
    timer:null,
    loading: false,
    overlay: false,
    zIndex: 0,

    snackbar: false,
    text: '작업시간 초과로 더이상 진행불가합니다',
    vertical: true,
    subMenuHidden: false,
    //menuHidden: false,          
  }),
  computed: {
    ...mapGetters(workStore, [
      'GE_WORK_LIST'
    ]),    
    ...mapGetters(workerStore, [
      'GE_WORKER'
    ]),    

    worker() {
      return this.GE_WORKER.name
    },
    workName(){
      let query = this.GE_WORK_LIST.filter(f=>f.work_id === this.GE_WORKER.work_id) 
      return query[0].name
    },
    workingTime() {        
      let timeWork = this.timeWork / (60*60)
      let hours = parseInt(timeWork)
      
      timeWork = this.timeWork / 60
      let minutes = parseInt(timeWork)
      let secondes = Math.round((timeWork - minutes) * 60)			  
      if (minutes < 10) {
        minutes = '0'+minutes
      }
      if (secondes < 10) {
        secondes = '0'+secondes
      }
      /*
      if(minutes === '00' && parseInt(secondes) < this.limitTime)
        secondes ='00'      
      return minutes+":"+secondes
      */
      return hours+":"+minutes+":"+secondes
    },
    minHeight() {
      const height = this.$vuetify.breakpoint.mdAndUp ? '100vh' : '50vh'
      //console.log('footer : ' + this.$vuetify.application.footer)
      //console.log('top : ' + this.$vuetify.application.top)
      //return `calc(${height} - (${this.$vuetify.application.top}+${this.$vuetify.application.bottom})px)`
      return `calc(${height} - (${this.$vuetify.application.top}px + ${this.$vuetify.application.footer}px + 25px))`
    },
    menuHidden() {
      if(this.$route.path.indexOf('/work/rate/doWork') > -1 
          || this.$route.path.indexOf('/work/rate/doCheckTdmotionWork') > -1)
        return true
      else 
        return false
    },
  },
  watch: {
    workingTime (newWorkingTime) {
      //console.log('newWorkingTime : ' + newWorkingTime)
      if(newWorkingTime === '00:00'){
        this.stopRatingWork()
      }
    },
  },
  mounted() {
    this.startTimer()
    //console.log('this.$route.path : ' + this.$route.path)
  },  
  methods: {
    startTimer() {
      this.loading = true
      this.isTimerRunning = true

      this.timer = setInterval( () => {
        this.timeWork++;
        /*
        if (this.timeWork - this.limitTime >= 0) {
          this.timeWork = this.timeWork - this.limitTime
          //this.timeWork--
        } else {
          clearInterval(this.timer)
          this.resetTimer()
        }
        */
      }, 1000 )

      setTimeout(() => (this.loading = false), 1000)
    },
    stopTimer() {
      this.loading = true

      this.isTimerRunning = false
      clearInterval(this.timer)
      this.timer = null

      setTimeout(() => (this.loading = false), 1000)
    },
    resetTimer() {
      this.loading = true

      this.stopTimer()
      this.timeWork = 0
      this.limitTime = 1
      this.secondes = 0
      this.minutes = 0

      setTimeout(() => (this.loading = false), 500)
    },
    limitTimer() {
      this.loading = true

      this.limitTime = 10

      setTimeout(() => (this.loading = false), 500)
    },
    stopRatingWork() {
      //console.log('stopRatingWork')
      this.overlay = true
    },
    messageSnackbar() {
      this.snackbar = true
    },
    nextStep() {
      this.$router.replace('/work/reportWork')
    }
  },
}
</script>
<style scoped>
.work-sub-menu-wrap{
  position: absolute;
  right: 1%;
  top: 30%;
}
.work-sub-menu{
  opacity: 0.7;
}

</style>
