<template>
  <div id="working">
    <v-row no-gutters>
      <v-col cols="2">
      </v-col>
      <v-col>
        <v-container class="mt-5" >
          <v-row no-gutters>
            <v-col
              cols="auto"
              class="mr-auto"
            >
              <p class="text-h5 font-weight-regular"> {{workName}} </p>
            </v-col>
            <v-col cols="auto">
                <p class="text-h6 font-weight-regular"><v-icon> mdi-account</v-icon> &nbsp;&nbsp;{{ this.GE_WORKER.name }} </p>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <v-col cols="2">
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" sm="12" md="1" lg="2">        
      </v-col>

      <v-col> 
        <v-card class="pa-5 grey lighten-5">
          <v-sheet
            height="50"
            dark
            class="blue-grey darken-4"
          >
            <v-row>
              <v-col cols="12">
                <div>
                  <div class="d-inline float-left">
                    <v-btn
                        small
                        dark
                        @click.stop="drawer = !drawer"
                        class="blue-grey darken-4"
                    >
                      <v-icon v-if="!drawer">
                        mdi-view-list
                      </v-icon>
                      <v-icon v-else>
                        mdi-close
                      </v-icon>            
                    </v-btn>
                  </div>
              
                  <div class="d-inline float-right font-weight-thin">
                    <v-btn
                      x-small
                      @click="previousPlayer"
                      class="blue-grey darken-4"
                    >
                        <v-icon>
                          mdi-chevron-left
                        </v-icon>
                    </v-btn>
                    {{playerListCurrentIndex +1}} / {{videoList.length}}
                    <v-btn
                      x-small
                      @click="nextPlayer"
                      class="blue-grey darken-4"
                    >
                      <v-icon>
                        mdi-chevron-right
                      </v-icon>
                    </v-btn>
                  </div>
              
                  <p class="text-h5 text-center font-weight-light">
                    {{playerTitle}}
                  </p>
                </div>
              </v-col>
            </v-row>
          </v-sheet>

          <v-sheet
            class="vjs-wrap overflow-hidden"
            style="position: relative;">

            <v-navigation-drawer
              v-model="drawer"
              absolute
              temporary
              class="blue-grey lighten-5"
            >
                <v-list
                    nav
                    dense
                    shaped
                >
                  <v-subheader class="text-subtitle-1">Motion Lists</v-subheader>
                  <v-list-item-group
                      v-model="selectedItem"
                      color="primary"
                    >
                      <v-list-item
                        v-for="item in watchedPlay"
                        :key="item.name"
                        link
                        @click="vjsPlayerListLink(item.disp_ord)"
                      >
                      <v-list-item-content>
                          <v-list-item-title
                            v-text="item.name"
                            class="text-subtitle-1"
                          />
                      </v-list-item-content>

                      <!--
                      <v-list-item-action>
                          <v-btn icon>
                          <v-icon color="grey lighten-1">mdi-information</v-icon>
                          </v-btn>
                      </v-list-item-action>
                      -->
                      </v-list-item>
                  </v-list-item-group>    
                </v-list>
            </v-navigation-drawer>

            <video-player-list :options="videoOptions"
                              :playerList="videoList"
                              @player="onPlayer"
                              @playerState="onPlayerState" />

            <v-fab-transition>
                <v-btn
                  v-show="btnNextHidden"                  
                  depressed  
                  color="pink"
                  dark
                  small
                  absolute
                  bottom
                  right                  
                  @click="nextPlayer"
                  class="mb-7 text-subtitle-1"
                >
                next
                <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
            </v-fab-transition>
          </v-sheet>

          <v-fab-transition>
            <v-overlay
              :absolute="overAbsolute"
              :value="overlay"
            >
            </v-overlay>
          </v-fab-transition>

        </v-card>

        <v-row>
          <v-col v-if="!isPlayer"
            align="center"
            justify="space-around"
          >          
            <v-btn 
              depressed
              dark
              large
              color="primary"
              elevation="1"
              @click="btnPlayWork"
              class="ma-3"
            >
              작업재개
            </v-btn>
            <v-btn 
              depressed
              dark
              large
              color="primary"
              elevation="1"
              @click="validate"
            >
              작업장탈출
            </v-btn>
          </v-col>
          <v-col v-else
            align="center"
            justify="space-around"          
          >
            <v-btn
              depressed
              dark
              large
              color="primary"
              elevation="1"
              @click="btnStopWork"
              class="ma-3"
            >
              작업중지
            </v-btn>            
          </v-col>
          <v-col>
            <v-btn
              depressed
              dark
              large
              color="primary"
              elevation="1"
              @click="btnOutbreakWork"
              class="ma-3"
            >
              돌발상황
            </v-btn>            
            <v-btn
              depressed
              dark
              large
              color="primary"
              elevation="1"
              @click="btnOxygenDensity"
              class="ma-3"
            >
              산소농도측정
            </v-btn>            
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" sm="12" md="3" lg="2">

        <v-sheet class="ml-3 mr-5">
          <!--작업시각 영역 -->  
          <v-sheet>            
            <v-subheader class="text-subtitle-1">작업시각</v-subheader>
            <p> 
              <v-icon class="ml-5">mdi-clock</v-icon> 
              <span class="ml-3">{{workingTime}}</span>
            </P>
          </v-sheet>      

          <v-divider/>
          <!--장비표시 영역 -->  
          <v-sheet class="mt-4 text-center">
            <p>{{setWorkerEquipment()}}</p>
          </v-sheet>

          <v-divider/>
          <!--보호구 영역 -->  
          <v-sheet>            
            <v-subheader class="text-subtitle-1">작업자건강</v-subheader>

            <v-list-item>
              <v-list-item-avatar>
                <v-avatar
                  :color="workerHealth.state.color"
                  size="25"
                ></v-avatar>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{workerHealthValue}}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-content>
                <input 
                  :type="workerHealth.range.type" 
                  :min="workerHealth.range.min" 
                  :max="workerHealth.range.max" 
                  :value="workerHealthValue" 
                  :step="workerHealth.range.step" 
                  :orient="workerHealth.range.orient"
                >
              </v-list-item-content>
            </v-list-item>            
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{workerHealth.state.msg}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>            

          </v-sheet>      

          <v-divider/>
          <!--안전장비 영역 -->  
          <v-sheet>              
            <v-subheader class="text-subtitle-1">산소농도</v-subheader>

            <v-list-item>
              <v-list-item-avatar>
                <v-avatar
                  :color="oxygenDensity.state.color"
                  size="25"
                ></v-avatar>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{oxygenDensityGuage}}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-content>
                <input 
                  :type="oxygenDensity.range.type" 
                  :min="oxygenDensity.range.min" 
                  :max="oxygenDensity.range.max" 
                  :value="oxygenDensityGuage*10" 
                  :step="oxygenDensity.range.step" 
                  :orient="oxygenDensity.range.orient"                  
                >
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{oxygenDensity.state.msg}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>            

          </v-sheet>      
        </v-sheet>
      </v-col>    
    </v-row>
  </div>    
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

import Enumerable  from 'linq'
import VideoPlayerList from '@/components/videojs/VideoPlayerList.vue'
import 'video.js/dist/video-js.css'

import { activityMixin } from '@/mixins/activityMixin.js'
import { tdMotionMixin } from '@/mixins/tdMotionMixin.js'

const workStore = 'workStore'
const workerStore = 'workerStore'
const tdmotionStore = 'tdmotionStore'
const workTdmotionStore = 'workTdmotionStore'
const workerTdmotionStore = 'workerTdmotionStore'
const workerWorkingStore = 'workerWorkingStore'

const equipmentStore = 'equipmentStore'
const workEquipmentStore = 'workEquipmentStore'
const workerEquipmentStore = 'workerEquipmentStore'

//Commmon Activity
const activityStore = 'activityStore'
const workerActivityStore = 'workerActivityStore'
const workerActivityHistoryStore = 'workerActivityHistoryStore'

export default {
  name: 'working',
  components: {
    VideoPlayerList,
  },

  data: () => ({
    player: null,
    response: null,
    playerTitle: '',
    playerListPrevousIndex: -1,
    playerListCurrentIndex: 0,
    playerListNextIndex: 1,
    playerListLastIndex: -1,
    videoOptions: {
      //autoplay: true,
      //muted: true,
      controls: true,
      fluid: true,// 화면의 따라
      techOrder: ['html5'],
        plugins: {
            playlist: {
              autoadvance: true
            }
        },                
    },
    videoList:[],
    workVideoList:[],
    isPlayer: false,

    hidden: true,
    menu: false,
    workerActivityList: [],
    workerTdmotionList: [],
    dialog: false,
    popupOptions: {
      dialog: false,
      param: {},
      motionId: '',
    },
    drawer: null,
    selectedItem:'',

    btnNextHidden: false,
    //sheet: false,
    overlay: false,
    overAbsolute: true,

    //총작업시각
    workTime: 0,
    //타이머주기
    cycleTick: 0,
    //장비패널티수
    equipPenalty: 0,

    //
    tickCount: 0,

    //타이머
    workingInterval: null,

    //작업자건강
    workerHealth: {
      state: {
        color: 'green',
        msg:'',
      },
      range: {
        type: 'range',
        min: 0,
        max: 100,
        value: 100,
        step:1,
        orient:'vertical' 
      },
      interval: null,
    },
    workerHealthGuage: 100,
    workerHealthValue: 100,  
    //산소농도
    oxygenDensity: {
      state: {
        color: 'green',
        msg:'',
      },
      range: {
        type: 'range',
        min: 0,
        max: 235,
        value: 235,
        step:1,
        orient:'vertical' 
      },
      interval: null,
    },
    oxygenDensityGuage: 21,
    //oxygenDensityValue: 20,
    
    //돌발상황
    outbreakTime: 0,
    
    //작업상태값 저장
    workerWorking:{
      worker_health_guage: 100,
      oxygen_density_guage: 100,
      oxygen_density_value: 20,
      player_list_current_index: 0,
      outbreak_situation_play_Index: 0,
      worker_id: 0,
      overlay: false,
    },
    //작업시각
    isTimerRunning: false,
    minutes:0,
    secondes:0,
    timeWork:0,
    limitTime:1,    
    timer:null,    

  }),
  computed: {
    ...mapGetters(workStore, [
      'GE_WORK_LIST'
    ]),    
    ...mapGetters(workerStore, [
      'GE_WORKER'
    ]),    
    ...mapGetters(tdmotionStore, [
      'GE_TDMOTION_LIST'
    ]),    
    ...mapGetters(workTdmotionStore, [
      'GE_WORK_TDMOTION_LIST'
    ]),
    ...mapGetters(workerTdmotionStore, [
      'GE_WORKER_TDMOTION_LIST'
    ]),
    ...mapGetters(equipmentStore, [
      'GE_EQUIPMENT_LIST'
    ]),
    ...mapGetters(workEquipmentStore, [
      'GE_WORK_EQUIPMENT_LIST'
    ]),
    ...mapGetters(workerEquipmentStore, [
      'GE_WORKER_EQUIPMENT_LIST'
    ]),
    ...mapGetters(activityStore, [
      'GE_ACTIVITY_LIST'
    ]),    
    ...mapGetters(workerActivityStore, [
      'GE_WORKER_ACTIVITY_LIST'
    ]),    
    ...mapGetters(workerActivityHistoryStore, [
      'GE_WORKER_ACTIVITY_HISTORY_LIST'
    ]),
    ...mapGetters(workerWorkingStore, [
      'GE_WORKER_WORKING'
    ]),
    
    watchedPlay() {
      let query= Enumerable.from(this.GE_TDMOTION_LIST).join(
        Enumerable.from(this.GE_WORK_TDMOTION_LIST).where(
        w => (w.work_id === this.GE_WORKER.work_id && w.type === 'normal')),
          pk=>pk.motion_id,
          fk=>fk.motion_id,
          (left, right) =>({...left, ...right})
        ).orderBy(o=>o.disp_ord).toArray()

      //console.log('query : ' + JSON.stringify(query,null,2))
      return query
    },
    workName(){
      let query = this.GE_WORK_LIST.filter(f=>f.work_id === this.GE_WORKER.work_id) 
      //console.log(query,null,2)
      return query[0].name
    },

    workingTime() {        
      let timeWork = this.timeWork / 60
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
      */
      return minutes+":"+secondes      
    },

  },
  watch: {   
    
    timeWork(val){
      //console.log('workingTime : ' + val)
      if(val === this.outbreakTime){
        this.playOutbreak()
      }
    },

    /*
    workingTime(val){
      //console.log('workingTime : ' + val)
      //console.log('textTime : ' + textTime)
      
      let textTime = this.makeWorkingTime(this.outbreakTime)
      //let textTime = this.makeWorkingTime(10)
      if(val === textTime){        
        this.playOutbreak()
      }
    }
    */
  },
  created() {
    // normal, outbreak
    this.videoListQuery('normal')
  }, 
  mounted() {

    //작업변수
    this.getAndSetWorkerWorking()

    if(this.response){ 
      this.onPlayer()
      
      //motion-list
      this.selectedItem = this.player.playlist.currentItem()      
    }
    
    //작업시각타이머
    this.startTimer()
    this.initQuery()
  },
  beforeDestroy() {
      if (this.player) {
          this.player.dispose()
      }
      clearInterval(this.workingInterval)
      clearInterval(this.timer)      
      this.setWorkerWorking()
  },    

  methods: {
    ...mapActions(workerWorkingStore, [
      'AC_WORKER_WORKING'
    ]),

    initQuery(){
      console.log('this.GE_WORKER_WORKING : ' + JSON.stringify(this.GE_WORKER_WORKING, null, 2))  
    },
    async onPlayer(player){
      this.player = player
      this.response = await this.player.playlist(this.videoList)
      //this.response = await this.player.playlist.autoadvance(0)
      //this.playerListStated(this.player)

      this.playerListLastIndex = this.player.playlist.lastIndex()

      //dialog setting 02-09
      this.popupOptions.motionId = this.videoList[this.playerListCurrentIndex].sources[0].motion_id
      
      //console.log('this.response : ' + JSON.stringify(this.response,null,2) )

    },
    
    onPlayerState(event){
        switch(event.type){
            case 'play':
                console.log('player : ' + event.type)
                this.btnNextHidden = false
                this.isPlayer = true
                break;    
            case 'pause':
                console.log('player : ' + event.type)
                this.isPlayer = false
                break;    
            case 'ended':
                console.log('this.videoList : ' + this.videoList)
                if(this.videoList)
                  this.tdmotionWorker(this.GE_WORKER.worker_id, this.videoList[this.playerListCurrentIndex].sources[0].motion_id)                
                
                if(this.videoList.length - this.playerListCurrentIndex > 1)
                  this.btnNextHidden = true 
                
                console.log('player : ' + event.type)
                break;    
            case 'loadeddata':
                console.log('player : ' + event.type)
                this.playerListPrevousIndex = this.player.playlist.previousIndex()
                this.playerListCurrentIndex = this.player.playlist.currentItem()
                this.playerListNextIndex = this.player.playlist.nextIndex() 
                this.changePlayerTitle()
                break;    
            case 'waiting':
                console.log('player : ' + event.type)
                break;    
            case 'playing':
                console.log('player : ' + event.type)
                break;
            case 'timeupdate':
                console.log('player : ' + event.type)
                break;
            case 'canplay':
                console.log('player : ' + event.type)
                break;    
            case 'canplaythrough':
                console.log('player : ' + event.type)
                break;    
            default:
                console.log('default')
        }
          this.historyActivityWorker(this.getActivityId('작업하기'), this.GE_WORKER.worker_id, 'TDMOTION', 
                                  this.videoList[this.playerListCurrentIndex].sources[0].motion_id, event.type, this.playerListCurrentIndex)          

    },
    changePlayerTitle() {
      this.playerTitle = this.videoList[this.playerListCurrentIndex].sources.length > 0 
              ? this.videoList[this.playerListCurrentIndex].sources[0].name : 'noTitle'
    },    
    vjsPlayerListLink(n) {
      console.log('n : ' + n)
      this.player.playlist.currentItem(n-1)
    },
    
    previousPlayer() {
      this.player.playlist.previous()
      this.selectedItem = this.player.playlist.currentItem()

      //this.hidden = !this.hidden 
    },
    
    nextPlayer() {
      this.player.playlist.next()      
      this.selectedItem = this.player.playlist.currentItem()
    },
    checkVideoListQuery(type){            
      let query = Enumerable.from(this.GE_TDMOTION_LIST).join(
      Enumerable.from(this.GE_WORK_TDMOTION_LIST).where(
      w => w.work_id === this.GE_WORKER.work_id && w.type === type),
        pk=>pk.motion_id,
        fk=>fk.motion_id,
        (left, right) =>({...left, ...right})
      ).orderBy(o=>o.disp_ord).toArray()
      return query
    },
    videoListQuery(type){            
      try{
        const query = Enumerable.from(this.GE_TDMOTION_LIST).join(
        Enumerable.from(this.GE_WORK_TDMOTION_LIST).where(
        w => w.work_id === this.GE_WORKER.work_id && w.type === type),
          pk=>pk.motion_id,
          fk=>fk.motion_id,
          (left, right) =>({...left, ...right})
        ).orderBy(o=>o.disp_ord).toArray()

        for(const item of query){
          this.workVideoList.push( {sources: [{
            motion_id: item.motion_id,
            disaster_id: item.disaster_id,
            name: item.name,
            order: item.disp_ord - 1,     
            src : item.video_url,
            type: item.video_type 
          }]})
        }
                
        this.videoList = this.workVideoList
        this.workVideoList = []

        //console.log('videoListQuery query: ' + JSON.stringify(query, null, 2))
        //console.log('videoListQuery videoList: ' + JSON.stringify(this.videoList, null, 2))

      }catch(e){
        console.log('e : ' + e)  
      }

    },
    getWorkTime() {
      let setTimeArr = this.GE_WORK_LIST.filter(f=>f.work_id === this.GE_WORKER.work_id)
      if(setTimeArr.length > 0)
        return setTimeArr[0].time
      else 
        return 100
    },
    setWorkerEquipment() {

      let message = '보호구장비 ' + this.queryWorkAndWorkerEquipment('protect').length +'/'
                    + this.queryWorkEquipment('protect').length +', '
                    + '안전장비' + this.queryWorkAndWorkerEquipment('safety').length +'/'
                    + this.queryWorkEquipment('safety').length

      return message
    },

    getAndSetWorkerWorking(){
      
      //타이머주기
      this.cycleTick = 3

      //장비패널티수
      this.equipPenalty = ( this.queryWorkEquipment('protect').length - this.queryWorkAndWorkerEquipment('protect').length ) + 
                          ( this.queryWorkEquipment('safety').length - this.queryWorkAndWorkerEquipment('safety').length )
      
      //총작업시각
      this.workTime = this.getWorkTime()
      //this.workTime = 100

      //console.log('cycleTick : ' + this.cycleTick)
      //console.log('equipPenalty : ' + this.equipPenalty)
      //console.log('workTime : ' + this.workTime)


      //돌발상황세팅
      this.setOutbreak(this.workTime)

      //runWorking
      this.runWorkingInterval(this.cycleTick, this.equipPenalty)
      /*
      if(this.GE_WORKER.worker_id === this.GE_WORKER_WORKING.worker_id){

        this.workerHealthGuage = this.GE_WORKER_WORKING.worker_health_guage
        this.playerListCurrentIndex = this.GE_WORKER_WORKING.player_list_current_index
        this.outbreakSituationPlayIndex = this.GE_WORKER_WORKING.outbreak_situation_play_Index        
        this.selectedItem = this.player.playlist.currentItem(this.playerListCurrentIndex)
      }else{
        this.AC_WORKER_WORKING(this.workerWorking)
      }
      */      
    },
    //outbreak - start
    setOutbreak(total){
      
      let mean = total * 0.6
      let stddev = total * 0.1

      if(this.checkVideoListQuery('outbreak').length > 0){
        this.outbreakTime = this.NormalDistribution(mean, stddev)
        this.outbreakTime = Math.round(this.outbreakTime,0)
      }else{
        this.outbreakTime = this.timeWork + 60*60*60
      }
      console.log('this.outbreakTime : ' + this.outbreakTime)
    },

    generateRandom(min,max){
        return (Math.random() * (max - min)) +min
    },

    NormalDistribution(mean,std_dev){
			return mean + (this.gaussianRandom()*std_dev)
		},
		gaussianRandom() {
		  let v1, v2, s

		  do {
				v1 = 2 * Math.random() - 1   // -1.0 ~ 1.0 까지의 값
				v2 = 2 * Math.random() - 1  // -1.0 ~ 1.0 까지의 값
				s = v1 * v1 + v2 * v2
		  } while (s >= 1 || s == 0)

		  s = Math.sqrt( (-2 * Math.log(s)) / s )

		  return v1 * s
		},
    //outbreak - end

    runWorkingInterval(tick, penalty){
      //this.workerHealthGuage -= penalty
      this.workerHealthValue -= penalty
      
      this.workingInterval = setInterval(() => {
        this.tickCount++

				if (this.timeWork < this.outbreakTime)
					this.normalO2Random()
				else {
					this.emergencyO2()
				}
        //산소농도 메시지처리
        this.oxygenDensity.state = this.oxygenDensityState(this.oxygenDensityGuage)
        
        //작업자 건강계산
        this.calcWorkerHealth()

        //작업자 건강 메시지처리
        //this.calcWorkerGage()
        this.workerHealth.state = this.workerHealthState(this.workerHealthValue)

      }, tick*1000)    

    },
		normalO2Random() {
			// 19.0 에서 23.5에서 뿌려주자
			//let t = this.NormalDistribution(20.9, 2)
      let t = this.generateRandom(19.0, 23.5)
			this.oxygenDensityGuage = t.toFixed(1)
			//console.log('normalO2Random', this.oxygenDensityGuage)
		},
    emergencyO2()
    {
			// 3% 씩 감소
			let t = this.oxygenDensityGuage * 0.97
			this.oxygenDensityGuage = t.toFixed(1)
			//console.log('emergencyO2', this.oxygenDensityGuage)      
    },
    oxygenDensityState(val){

      let color = 'green'
			let msg = ''

			if (val >= 18)
			{
				color = 'green'
				msg = '안전한 상태이나 지속적 환기 필요'
			}
			else if (val >= 16)
			{
				color = 'yellow'
				msg = '호흡, 맥박의 증가, 두통, 메스꺼움, 토할 것 같음'
			}
			else if (val >= 12)
			{
				color = 'red'
				msg = '어지럼증, 토할 것 같음, 체중지지 불능으로 추락'
			}
			else if (val >= 10)
			{
				color = 'black'
				msg = '실신혼절, 수분 내 사망'
			}
      else if(val < 10)
      {
				color = 'black'
				msg = '실신혼절, 수분 내 사망'
      }      
			let foo = { 
				'color': color,
				'msg': msg,
			}
			//console.log ('oxygenDensityState', foo)
			return foo
    },
    workerHealthState(val) {
      let color = 'green'
			let msg = ''

			if (this.workerHealthValue < 80 ) 	{
				if (val >= 70)
				{
					color = 'yellow'
					msg = '호흡, 맥박의 증가, 두통, 메스꺼움, 토할 것 같음'
				}
				else if (val >= 50)
				{
					color = 'orange'
					msg = '어지럼증, 토할 것 같음, 체중지지 불능으로 추락'
				}
				else if (val >= 30)
				{
					color = 'red'
					msg = '안면창백, 의식불명, 구토'
				}
				else if (val < 30)
				{
					color = 'black'
					msg = '실신혼절, 수분 내 사망'
				}
				else {
					color = 'white'
					msg = 'xxx'
				}
      }  

			let foo = { 
				'color': color,
				'msg': msg,
			}
			//console.log ('workerHealthState', foo)
			return foo

    },
		calcWorkerHealth() {
      //this.workerHealthGuage -= 1
      if( this.workerHealthValue <= 0 ){
        this.workerHealthValue = 0
      }else{
        this.workerHealthValue -= 1
      }
                  
      /*
      //this.workerHealthGuage = 100 - this.equipPenalty * (this.tickCount + 1) + this.o2_test_count * 10
      this.workerHealthGuage = 100 - this.equipPenalty * (this.tickCount + 1)
			if (this.workerHealthGuage > 100)
			{
				this.workerHealthGuage = 100
			}
      */
      //console.log('workerHealthGuage', this.workerHealthGuage)

		},
    calcWorkerGage() {
			let color = 'green'
			let msg = ''
			if (this.workerHealthGuage >= 80 ) 	{
				this.workerHealthValue = this.workerHealthGuage
			}
			else {
				let val1 = 	this.oxygenDensityGuage * 5 - 10
				let val2 = 	this.oxygenDensityGuage * 10 - 70
				let val3 = 	this.oxygenDensityGuage * 3
				if (val1 >= 70)
				{
					this.workerHealthValue = val1
					color = 'yellow'
					msg = '호흡, 맥박의 증가, 두통, 메스꺼움, 토할 것 같음'
				}
				else if (val1 >= 50)
				{
					this.workerHealthValue = val1
					color = 'orange'
					msg = '어지럼증, 토할 것 같음, 체중지지 불능으로 추락'
				}
				else if (val2 >= 30)
				{
					this.workerHealthValue = val2
					color = 'red'
					msg = '안면창백, 의식불명, 구토'
				}
				else if (val3 < 30)
				{
					this.workerHealthValue = val2
					color = 'black'
					msg = '실신혼절, 수분 내 사망'
				}
				else {
					this.workerHealthValue = -1
					color = 'white'
					msg = 'xxx'
				}
        let foo = { 
          'color': color,
          'msg': msg,
        }
        //console.log ('calcWorkerGage', foo)
				this.workerHealth.state = foo
								
			} 
    },
    setWorkerWorking(){
      
      /*
      this.GE_WORKER_WORKING.worker_health_guage = this.workerHealthGuage
      this.GE_WORKER_WORKING.oxygen_density_guage = this.oxygenDensityGuage
      this.GE_WORKER_WORKING.oxygen_density_value = this.oxygenDensityValue
      this.GE_WORKER_WORKING.player_list_current_index = this.playerListCurrentIndex
      this.GE_WORKER_WORKING.outbreak_situation_play_Index = this.outbreakSituationPlayIndex
      this.GE_WORKER_WORKING.worker_id = this.GE_WORKER.worker_id
      this.GE_WORKER_WORKING.overlay = this.overlay
      */
      
      this.GE_WORKER_WORKING.worker_health_guage = 100
      this.GE_WORKER_WORKING.oxygen_density_guage = 100
      this.GE_WORKER_WORKING.oxygen_density_value = 20
      this.GE_WORKER_WORKING.player_list_current_index = 0
      this.GE_WORKER_WORKING.outbreak_situation_play_Index = 0
      this.GE_WORKER_WORKING.worker_id = 0
      this.GE_WORKER_WORKING.overlay = false

      this.AC_WORKER_WORKING(this.GE_WORKER_WORKING)    
    },
    async playOutbreak(){
      //this.videoListQuery('equipment')
      this.videoListQuery('outbreak')

      if(this.videoList.length > 0){
        this.response = await this.player.playlist(this.videoList)            
        this.player.playlist.first()
      }
    },
    async btnOutbreakWork(){

      //this.videoListQuery('equipment')
      this.videoListQuery('outbreak')

      if(this.videoList.length > 0){
        this.response = await this.player.playlist(this.videoList)            
        this.player.playlist.first()
      }
      //console.log('this.videoList : ' + JSON.stringify(this.videoList,null,2)) 
    },

    btnOxygenDensity() {
      //console.log('aa')
      if( this.workerHealthValue+10 > 100 ){
        this.workerHealthValue = 100
      }else{
        this.workerHealthValue += 10
      }
    },
    btnPlayWork(){
      this.player.play()
      //this.player.currentTime(4.466394)
      this.isPlayer = false
    },
    btnStopWork(){
      this.player.pause()
      this.isPlayer = true
    },
    validate () {
      this.nextStep(); 
      //console.log('this.GE_WORKER_EQUIPMENT_LIST : ' + JSON.stringify(this.GE_WORKER_EQUIPMENT_LIST,null,2));

    },
    nextStep() {
      this.activityWorker(this.GE_WORKER.worker_id, this.getActivityId('작업하기'))
      //this.$router.replace('/work/choiceWork');
      this.dialog = false
      this.$router.push('/work/reportWork')
    },
    queryWorkEquipment(type) {
      let query = Enumerable.from(this.GE_EQUIPMENT_LIST)
                            .join(Enumerable.from(this.GE_WORK_EQUIPMENT_LIST)
                                            .where(w=>w.work_id === this.GE_WORKER.work_id),
                              pk=>pk.equipment_id,
                              fk=>fk.equipment_id,
                              (left, right) =>({...left, ...right}))
                            .where(w=>w.type === type)
                            .orderBy(o=>o.disp_ord)
                            .toArray()
      return query
    },
    queryWorkerEquipment(type) {
      let query = Enumerable.from(this.GE_EQUIPMENT_LIST)
                            .join(Enumerable.from(this.GE_WORKER_EQUIPMENT_LIST)
                                            .where(w=>w.worker_id === this.GE_WORKER.worker_id),
                              pk=>pk.equipment_id,
                              fk=>fk.equipment_id,
                              (left, right) =>({...left, ...right}))
                            .where(w=>w.type === type)
                            .orderBy(o=>o.disp_ord)
                            .toArray()
      return query
    },
    queryWorkAndWorkerEquipment(type){
      let query = Enumerable.from(this.queryWorkEquipment(type))
                            .join(Enumerable.from(this.queryWorkerEquipment(type)),
                                  pk => pk.equipment_id,
                                  fk => fk.equipment_id,
                                  (left, right) => ({...left, right}))
                            .toArray();   

        //console.log('query : ' + JSON.stringify(query,null,2));
        return query
    },


    makeWorkingTime(val) {        
      let timeWork = val / 60
      let minutes = parseInt(timeWork)
      let secondes = Math.round((timeWork - minutes) * 60)			  
      if (minutes < 10) {
        minutes = '0'+minutes
      }
      if (secondes < 10) {
        secondes = '0'+secondes
      }
      return minutes+":"+secondes      
    },

    //time : start
    startTimer() {
      this.isTimerRunning = true

      this.timer = setInterval( () => {
        this.timeWork++;
      }, 1000 )
    },    
    //time : end
  },
  mixins: [activityMixin, tdMotionMixin],
}  
</script>
<style scoped>

.video-js{background-color: white;}

.video-js .vjs-big-play-button{
  top: 45%;
  left: 45%;
}

.vjs-wrap{
  position: relative;
  width:100%;  
}

input[type=range] {
  -webkit-appearance: slider-vertical;
}

</style>
