<template>
  <section id="work-rating">    
    <span class="bg"></span>
    <v-container class="mt-5">
      <v-row>
        <v-col
          cols="auto"
          class="mr-auto"
        >
          <p class="text-h5 font-weight-bold position-zindex">{{workName}}</p>
        </v-col>
        <v-col cols="auto">
          <span class="title position-zindex">
            <v-icon>mdi-account</v-icon>{{worker}}
          </span>
        </v-col>
      </v-row>
    </v-container>

    <router-view/>
  
    <div v-show="!menuHidden" class="work-sub-menu-wrap">
      <template >
        <v-fab-transition>
          <v-btn
            color="blue-grey darken-4"
            fab
            dark
            small
            absolute
            bottom
            right
            @click="subMenuHidden= !subMenuHidden"
          >
            <v-icon v-if="subMenuHidden">
              mdi-view-list
            </v-icon>
            <v-icon v-else>
              mdi-close
            </v-icon>            
          </v-btn>
        </v-fab-transition>
      </template>

      <div v-show="!subMenuHidden" class="work-sub-menu" >
          <v-btn
            block
            dark
            rounded
            large
            color="teal darken-3"
            to="/work/rate/prepareWork"
            class="text-subtitle-1"
          >

            작업준비
          </v-btn>
          <v-btn
            block
            dark
            rounded
            large
            color="teal darken-3"
            to="/work/rate/guideWork"
            class="text-subtitle-1 mt-2"
          >

            작업가이드
          </v-btn>
          <v-btn
            block
            dark
            rounded
            large
            color="teal darken-3"
            to="/work/rate/orderWork"
            class="text-subtitle-1 mt-2"
          >
            작업허가서
          </v-btn>
          <!--
          <v-btn
            block
            dark
            rounded
            large
            color="teal darken-3"
            to="/work/rate/choiceEquipmentWork"
            class="text-subtitle-1 mt-2"
          >
            보호구/장비선택
          </v-btn>
          -->
          <v-btn
            block
            dark
            rounded
            large
            color="teal darken-3"
            to="/work/rate/protectEquipmentWork"
            class="text-subtitle-1 mt-2"
          >
            보호구장비선택
          </v-btn>
          <v-btn
            block
            dark
            rounded
            large
            color="teal darken-3"
            to="/work/rate/safetyEquipmentWork"
            class="text-subtitle-1 mt-2"
          >
            안전장비선택
          </v-btn>
          <v-btn
            block
            dark
            rounded
            large
            color="teal darken-3"
            to="/work/workplay"
            class="text-subtitle-1 mt-2 mb-8"
          >
            작업하기
          </v-btn>
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

  </section>
  
</template>
<script>
import { mapGetters } from 'vuex'

const workStore = 'workStore'
const workerStore = 'workerStore'

/*
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
*/

export default {
  name: 'Rating',
  /*
  components: {
    'timer':Timer
  },
  */    
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
      //console.log(query,null,2)
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
    //let query = this.GE_WORK_LIST.filter(f=>f.work_id === this.GE_WORKER.work_id) 
    //console.log('query : ' + JSON.stringify(query,null,2))

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
    },
  },
}
</script>
<style scoped>
.bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: url('https://goguy.github.io/mts-vv-kit/images/tank_cleaning_bg_final.png') no-repeat center center;
    background-size: cover;
    opacity: 0.7;
  }

  .position-zindex{
    position:relative;
    z-index:1;
  }  

  .work-sub-menu-wrap{
    position: absolute;
    top:300px;
    right:5px;
  }
  .work-sub-menu{
    position: relative;
  }

</style>
