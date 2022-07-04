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
        <v-card v-show="!isShowVideoPlay" class="pa-5 grey lighten-5">
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

                <template v-slot:append>
                  <div class="pa-2">
                    <v-btn 
                      block
                      @click="sheet = !sheet"
                    >
                      작업관련정보
                    </v-btn>

                    <v-bottom-sheet 
                      inset
                      v-model="sheet">
                      <v-sheet  
                        class="text-center pa-5"
                      >
                        <v-btn
                          text
                          color="red"
                          @click="sheet = !sheet"
                        >
                          close
                        </v-btn>
                        <div>
                          <v-row>
                            <v-col
                              sm="12" 
                              md="4"
                            >
                              <v-card class="text-center">
                                <v-card-title class="text-subtitle-1">현재산소농도</v-card-title>
                                <div class="text-center pa-2">

                                  <v-progress-circular
                                    v-model="pcValue"
                                    :rotate="-90"
                                    :size="100"
                                    :width="15"
                                    color="primary"
                                  >
                                    <strong>{{ Math.ceil(pcValue) }}%</strong>
                                  </v-progress-circular>

                                </div>
                              </v-card>
                            </v-col>
                            <v-col
                              sm="12" 
                              md="4"
                            >
                              <v-card>
                                <v-card-title class="text-subtitle-1">작업복 착용현황</v-card-title>
                                <div class="pa-2">

                                  <v-progress-linear
                                    v-model="plSmock"                    
                                    dark
                                    height="25"
                                    color="green"
                                  >
                                    <strong>{{ Math.ceil(plSmock) }}%</strong>
                                  </v-progress-linear>
                                </div>
                              </v-card>
                            </v-col>
                            <v-col
                              sm="12" 
                              md="4"
                            >
                              <v-card>
                                <v-card-title class="text-subtitle-1">작업시간</v-card-title>
                                <div class="pa-2">

                                  <v-progress-linear
                                    v-model="plValue"                    
                                    dark
                                    height="25"
                                    color="pink"
                                    striped
                                  >
                                    <strong>{{ plNumber }} </strong>
                                  </v-progress-linear>
                                </div>
                              </v-card>
                            </v-col>
                          </v-row>
                        </div>
                      </v-sheet>
                    </v-bottom-sheet>

                  </div>
                </template>
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
              <v-img 
                :src="require('@/assets/img/saveTank.png')" 
              />
            </v-overlay>
          </v-fab-transition>



        </v-card>

        <v-card v-show="isShowVideoPlay" class="pa-5 grey lighten-5" >
        
          <v-sheet
            class="vjs-wrap">        
            <video-playering ref="pVideoPlayering"/>
          </v-sheet>
        
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
              @click="btnImageCtrl"
              class="ma-3"
            >
              돌발상황이미지처리
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
            <v-alert
              v-model="commonAlert.alert.alert"
              dense
              border="left"
              :type="commonAlert.alert.type"
            >
              <v-row no-gutters>
                <v-col cols="12" class="grow">
                  {{commonAlert.alert.message}}
                </v-col>
                <v-col cols="12" class="shrink mt-2">
                  <v-btn
                    :to="commonAlert.alert.btn_to">
                    {{commonAlert.alert.btn_name}}</v-btn>
                </v-col>
              </v-row>
            </v-alert>

            <v-subheader class="text-subtitle-1">작업시각</v-subheader>
            <p> 
              <v-icon class="ml-5">mdi-clock</v-icon> 
              <span class="ml-3">{{workingTime}}</span>
            </P>
          </v-sheet>      

          <v-divider/>
          <!--보호구 영역 -->  
          <v-sheet>
            
            <v-subheader class="text-subtitle-1">작업장비패널티</v-subheader>
            <div class="text-center pa-2">
              <v-progress-circular
                v-model="workerPenaltyGuage"
                :rotate="workerPenalty.vpc.rotate"
                :size="workerPenalty.vpc.size"
                :width="workerPenalty.vpc.width"
                :color="workerPenalty.vpc.color"
              >
                <strong>{{ Math.ceil(workerPenaltyGuage) }}%</strong>
              </v-progress-circular>
            </div>
            <v-alert
              v-model="workerPenalty.alert.alert"
              dense
              border="left"
              :type="workerPenalty.alert.type"
            >
              <v-row no-gutters>
                <v-col cols="12" class="grow">
                  {{workerPenalty.alert.message}}
                </v-col>
                <v-col cols="12" class="shrink mt-2">
                  <v-btn
                    :to="workerPenalty.alert.btn_to">
                    {{workerPenalty.alert.btn_name}}</v-btn>
                </v-col>
              </v-row>

            </v-alert>
            <v-alert
              v-model="alertProtectEquipment.alert"
              dense
              border="left"
              dismissible
              type="info"
            >              
              <v-row no-gutters>
                <v-col cols="12" class="grow">
                  {{alertProtectEquipment.message}}
                </v-col>
                <v-col cols="12" class="shrink mt-2">
                  <v-btn
                    :to="alertProtectEquipment.btn_to">
                    {{alertProtectEquipment.btn_name}}</v-btn>
                </v-col>
              </v-row>              
                
            </v-alert>

            <v-alert
              v-model="oxygenDensity.alert.alert"
              dense
              border="left"
              :type="oxygenDensity.alert.type"
            >
              <v-row no-gutters>
                <v-col cols="12" class="grow">
                  {{oxygenDensity.alert.message}}
                </v-col>
                <v-col cols="12" class="shrink mt-2">
                  <v-btn
                    :to="oxygenDensity.alert.btn_to">
                    {{oxygenDensity.alert.btn_name}}</v-btn>
                </v-col>
              </v-row>

            </v-alert>
            <v-alert
              v-model="alertSafetyEquipment.alert"
              dense
              border="left"
              dismissible
              type="info"
            >
              <v-row no-gutters>
                <v-col cols="12" class="grow">
                  {{alertSafetyEquipment.message}}

                </v-col>
                <v-col cols="12" class="shrink mt-2">
                  <v-btn
                    :to="alertSafetyEquipment.btn_to">
                  {{alertSafetyEquipment.btn_name}}</v-btn>
                </v-col>
              </v-row>  
            </v-alert>

          </v-sheet>      

          <v-divider/>
          <!--안전장비 영역 -->  
          <v-sheet>
              
            <v-subheader class="text-subtitle-1">산소농도</v-subheader>
            <div class="text-center pa-2">

              <v-progress-circular
                v-model="oxygenDensityGuage"
                :rotate="oxygenDensity.vpc.rotate"
                :size="oxygenDensity.vpc.size"
                :width="oxygenDensity.vpc.width"
                :color="oxygenDensity.vpc.color"
              >
                <strong>{{ oxygenDensityValue }}%</strong>
              </v-progress-circular>

            </div>
          </v-sheet>      

        </v-sheet>
      </v-col>    
    </v-row>

    <dialog-outbreak-work 
     ref="outbreakWork"
      :dialog.sync="dialog"
      :optionsDialog="popupOptions"
      @dialogInfo="userInfo" 
    />

  </div>    
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

import Enumerable  from 'linq'
import VideoPlayerList from '@/components/videojs/VideoPlayerList.vue'
import VideoPlayering from '@/components/videojs/VideoPlayering.vue'

import 'video.js/dist/video-js.css'

import { activityMixin } from '@/mixins/activityMixin.js'
import { tdMotionMixin } from '@/mixins/tdMotionMixin.js'

import DialogOutbreakWork from '@/views/work/rate/DialogOutbreakWork.vue'


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
    DialogOutbreakWork,
    VideoPlayering,
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

    pcInterval: {},
    pcValue: 100,   
    plInterval:{},
    plValue: 0,
    plNumber: 0,
    plSmock:30,
    btnNextHidden: false,
    sheet: false,
    overlay: false,
    overAbsolute: true,

    //alert
    alertProtectEquipment: {
      alert: false,
      message: '',
      btn_name:'',
      btn_to:'',
    },
    alertSafetyEquipment: {
      alert: false,
      message: '',
      btn_name:'',
      btn_to:'',
    },

    //작업장비패널티
    workerPenalty: {
      vpc: {
        value: 100,
        size: 100,
        width: 15,
        rotate: -90,
        color: 'primary',
      },
      alert: {
        alert: false,
        type: 'warning',
        message: '',
        btn_name:'',
        btn_to:'',
      },
      interval: null,
    },  
    workerPenaltyGuage: 100,
    //산소농도
    oxygenDensity: {
      vpc: {
        value: 100,
        size: 100,
        width: 15,
        rotate: -90,
        color: 'primary',
      },
      alert: {
        alert: false,
        type: 'warning',
        message: '',
        btn_name:'',
        btn_to:'',
      },
      interval: null,
    },
    oxygenDensityGuage: 100,
    oxygenDensityValue: 20, 

    //공통메시지
    commonAlert: {
      alert: {
        alert: false,
        type: 'error',
        message: '',
        btn_name:'',
        btn_to:'',
      },
    },
    isAllStopFlag:false,

    //작업상태값 저장
    workerWorking:{
      worker_penalty_guage: 100,
      oxygen_density_guage: 100,
      oxygen_density_value: 20,
      player_list_current_index: 0,
      outbreak_situation_play_Index: 0,
      worker_id: 0,
      overlay: false,
      isAllStopFlag: false,
    },
    //작업시각
    isTimerRunning: false,
    minutes:0,
    secondes:0,
    timeWork:0,
    limitTime:1,    
    timer:null,
    //돌발상황
    outbreakSituation: { 
      alert: {
        alert: false,
        type: '',
        message: '',
        btn_name:'',
        btn_to:'',
      },
    },
    outbreakSituationPlayIndex: 0,
    playeringOptions: {
      autoplay: true,
      controls: true,
      fluid: true,// 화면의 따라
      sources: [{
                  src: require('@/assets/video/o2.mp4'),
                  type: 'video/mp4'
              }],
    },
    isShowVideoPlay: false,

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
      if(minutes === '00' && parseInt(secondes) < this.limitTime)
        secondes ='00'

      return minutes+":"+secondes      
    },

  },
  watch: {

    workerPenaltyGuage(val){
      if(val < 70 && val >=40){
        this.workerPenalty.vpc.color='orange'
        if( this.differWorkerEquipment('protect') > 0 )
          this.setWorkerHealthAlert(this.workerPenalty.vpc.color)

      }else if(val < 40){
        this.workerPenalty.vpc.color='red'
        this.setCommonAlert(this.workerPenalty.vpc.color)
        this.stopAllWorking()
      
      }else{
        this.workerPenalty.alert.alert=false
        this.workerPenalty.vpc.color='primary'

      }
    },

    oxygenDensityGuage(val){
      if(val < 85 && val >=70){
        this.oxygenDensityValue = 19
      }else if(val < 70 && val >=40){
        if( val >=65){
          this.oxygenDensityValue = 18  
        }else{
          this.oxygenDensityValue = 17
      }
        this.oxygenDensity.vpc.color='orange'
        if( this.differWorkerEquipment('safety') > 0 )
          this.setOxygenDensityAlert(this.oxygenDensity.vpc.color)

      }else if(val < 40){
        this.oxygenDensityValue = 16

        this.oxygenDensity.vpc.color='red'
        this.setCommonAlert(this.oxygenDensity.vpc.color)
        this.stopAllWorking()
      
      }else{
        this.oxygenDensityValue = 20
        this.oxygenDensity.alert.alert=false
        this.oxygenDensity.vpc.color='primary'

      }
    },
    oxygenDensityValue(newVal, oldVal){
      console.log('newVal : ' + newVal)
      console.log('oldVal : ' + oldVal)

      let differ = oldVal - newVal
      if(oldVal - newVal === differ)
        this.workerPenaltyGuage -= (differ * 10)
      
    },
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
    
    //this.progressCircularWorkerHealth(1)
    //this.progressCircularOxygenDensity(1)

    //보호구 안전 장비 체크
    this.checkWorkerEquipment('protect')
    this.checkWorkerEquipment('safety')

    //작업시각타이머
    this.startTimer()

    //돌발상황play변수설정
    this.setOutbreakSituationPlayIndex()


    this.initQuery()
  },
  beforeDestroy() {
      if (this.player) {
          this.player.dispose()
      }
      clearInterval(this.workerPenalty.interval)
      clearInterval(this.oxygenDensity.interval)
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

      //dialog setting
      this.popupOptions.motionId = this.videoList[this.playerListCurrentIndex].sources[0].motion_id


    }, 
    playerListStated(player){            
        player.on([
            'duringplaylistchange',
            'playlistitem',
            'playlistsorted',
            'playlistchange',
            'beforeplaylistitem',
            ],function(e) {
                player.log('player-list saw "' + e.type + '"');
                //console.log('playlist.previousIndex() : ' + player.playlist.previousIndex());
                //console.log('playlist.currentItem() : ' + player.playlist.currentItem());
                //console.log('playlist.nextIndex() : ' + player.playlist.nextIndex());
        });
    },
    onPlayerState(event){
        switch(event.type){
            case 'play':
                console.log('player : ' + event.type)
                this.btnNextHidden = false
                this.playWorking()
                this.isPlayer = true
                break;    
            case 'pause':
                console.log('player : ' + event.type)
                this.pauseWorking()
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
                this.playerListPrevousIndex = this.player.playlist.previousIndex()
                this.playerListCurrentIndex = this.player.playlist.currentItem()
                this.playerListNextIndex = this.player.playlist.nextIndex() 
                this.changePlayerTitle()

                console.log('player : ' + event.type)
                break;    
            case 'waiting':
                console.log('player : ' + event.type)
                break;    
            case 'playing':
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
    progressCircularWorkerHealth(val){      
      this.workerPenalty.interval = setInterval(() => {
        if (this.workerPenaltyGuage === 0) {
          return (this.workerPenaltyGuage = 100)
        }
        this.workerPenaltyGuage -= Number(val)
      }, 1000) 
    },

    progressCircularOxygenDensity(val){      
      this.oxygenDensity.interval = setInterval(() => {
        if (this.oxygenDensityGuage === 0) {
          return (this.oxygenDensityGuage = 100)
        }
        this.oxygenDensityGuage -= Number(val)
      }, 1000) 
    },

    /*alert : start*/
    checkWorkerEquipment(type){
      let workEquipment = this.queryWorkEquipment(type).length
      let workAndWorkerEquipment = this.queryWorkAndWorkerEquipment(type).length
      
      let differ = this.differWorkerEquipment(type)      
      //console.log('differ : ' + differ)
      if(differ === 0){
        if(type === 'protect')
          this.alertProtectEquipment.alert = false
        else if(type === 'safety')
          this.alertSafetyEquipment.alert = false
      }else{
        if(type === 'protect'){
          this.alertProtectEquipment.alert = true
          this.alertProtectEquipment.btn_name = '보호구선택'
          this.alertProtectEquipment.btn_to = '/work/rate/protectEquipmentWork'
          this.alertProtectEquipment.message = '보호구착용('+workAndWorkerEquipment+'/'+workEquipment+'), 미착용 '+ differ

        }else if(type === 'safety'){
          this.alertSafetyEquipment.alert = true
          this.alertSafetyEquipment.btn_name = '안전장비선택'
          this.alertSafetyEquipment.btn_to = '/work/rate/safetyEquipmentWork'
          this.alertSafetyEquipment.message = '안전장비선택('+workAndWorkerEquipment+'/'+workEquipment+'), 미선택 '+ differ
        }
      }    
    },
    differWorkerEquipment(type){
      return this.queryWorkEquipment(type).length - this.queryWorkAndWorkerEquipment(type).length
    },
    setCommonAlert(val){
      if(val ===  'red'){
        this.commonAlert.alert.alert=true
        this.commonAlert.alert.type='error'
        this.commonAlert.alert.message='해당작업 진행불가'
        this.commonAlert.alert.btn_name='작업보고서'
        this.commonAlert.alert.btn_to='/work/reportWork'      
      }    
    },    
    setWorkerHealthAlert(val){
      if(val === 'orange' && !this.isAllStopFlag){
        this.workerPenalty.alert.alert=true
        this.workerPenalty.alert.type='warning'
        this.workerPenalty.alert.message='해당작업에 맞는 보호구선택'
        this.workerPenalty.alert.btn_name='보호구선택'
        this.workerPenalty.alert.btn_to='/work/rate/protectEquipmentWork' 
      }else if(val ===  'red'){
        this.workerPenalty.alert.alert=true
        this.workerPenalty.alert.type='error'
        this.workerPenalty.alert.message='해당작업 진행불가'
        this.workerPenalty.alert.btn_name='작업보고서'
        this.workerPenalty.alert.btn_to='/work/reportWork'
      }    
    },
    setOxygenDensityAlert(val){
      if(val === 'orange' && !this.isAllStopFlag){
        this.oxygenDensity.alert.alert=true
        this.oxygenDensity.alert.type='warning'
        this.oxygenDensity.alert.message='해당작업에 맞는 안전장비선택'
        this.oxygenDensity.alert.btn_name='안전장비선택'
        this.oxygenDensity.alert.btn_to='/work/rate/safetyEquipmentWork' 
      }else if(val ===  'red'){
        this.oxygenDensity.alert.alert=true
        this.oxygenDensity.alert.type='error'
        this.oxygenDensity.alert.message='해당작업 진행불가'
        this.oxygenDensity.alert.btn_name='작업보고서'
        this.oxygenDensity.alert.btn_to='/work/reportWork'
      }    
    },
    /*alert : end*/

    stopAllWorking() {
      this.overlay=true
      this.isAllStopFlag=true
      this.player.pause()

      this.alertProtectEquipment.alert=false
      this.alertSafetyEquipment.alert=false
      this.workerPenalty.alert.alert=false
      this.oxygenDensity.alert.alert=false      
      clearInterval(this.workerPenalty.interval)
      clearInterval(this.oxygenDensity.interval)
    },
    playWorking(){

      //작업장비패널티
      let workerPenaltyUnit = this.differWorkerEquipment('protect')
      if( workerPenaltyUnit > 0 )
        this.progressCircularWorkerHealth(workerPenaltyUnit)

      //산소농도
      let oxygenDensityUnit = this.differWorkerEquipment('safety')
      if(oxygenDensityUnit > 0)
        this.progressCircularOxygenDensity(oxygenDensityUnit)

      
      //돌발상황
      //if( this.playerListCurrentIndex === this.outbreakSituationPlayIndex ){
      
      if( this.playerListCurrentIndex === 0 ){
          this.setOutbreak()
      }
    
    },
    pauseWorking(){
      clearInterval(this.workerPenalty.interval)
      clearInterval(this.oxygenDensity.interval)
    },

    setOutbreak() {
      this.player.currentTime()
      
      //alert('돌발상황')

    },
    //랜덤 구하기
    setOutbreakSituationPlayIndex(){
      let min=0
      let max=this.videoList.length-1
      this.outbreakSituationPlayIndex = this.getRandomNum(min, max)

      console.log('outbreakSituationPlayIndex : ' + this.outbreakSituationPlayIndex)
    },
    getRandomNum(min, max){
      let randNum = Math.floor(Math.random()*(max-min+1)) + min 
      return randNum
    },
    getAndSetWorkerWorking(){
      
      if(this.GE_WORKER.worker_id === this.GE_WORKER_WORKING.worker_id){

        this.workerPenaltyGuage = this.GE_WORKER_WORKING.worker_penalty_guage
        this.playerListCurrentIndex = this.GE_WORKER_WORKING.player_list_current_index
        this.outbreakSituationPlayIndex = this.GE_WORKER_WORKING.outbreak_situation_play_Index        
        this.selectedItem = this.player.playlist.currentItem(this.playerListCurrentIndex)
      }else{
        this.AC_WORKER_WORKING(this.workerWorking)
      }
      
    },
    setWorkerWorking(){
      
      /*
      this.GE_WORKER_WORKING.worker_penalty_guage = this.workerPenaltyGuage
      this.GE_WORKER_WORKING.oxygen_density_guage = this.oxygenDensityGuage
      this.GE_WORKER_WORKING.oxygen_density_value = this.oxygenDensityValue
      this.GE_WORKER_WORKING.player_list_current_index = this.playerListCurrentIndex
      this.GE_WORKER_WORKING.outbreak_situation_play_Index = this.outbreakSituationPlayIndex
      this.GE_WORKER_WORKING.worker_id = this.GE_WORKER.worker_id
      this.GE_WORKER_WORKING.overlay = this.overlay
      this.GE_WORKER_WORKING.isAllStopFlag = this.isAllStopFlag
      */
      
      this.GE_WORKER_WORKING.worker_penalty_guage = 100
      this.GE_WORKER_WORKING.oxygen_density_guage = 100
      this.GE_WORKER_WORKING.oxygen_density_value = 20
      this.GE_WORKER_WORKING.player_list_current_index = 0
      this.GE_WORKER_WORKING.outbreak_situation_play_Index = 0
      this.GE_WORKER_WORKING.worker_id = 0
      this.GE_WORKER_WORKING.overlay = false
      this.GE_WORKER_WORKING.isAllStopFlag = false

      this.AC_WORKER_WORKING(this.GE_WORKER_WORKING)    
    },

    btnPlayWork(){
      this.player.play()
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
    btnOutbreakWork(){
      console.log('btnOutbreakWork')
      this.overlay = true
      this.dialog = true

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

    btnImageCtrl(){
      if(this.overlay)
        this.overlay = false
      else
        this.overlay = true 
      
    },
    async btnOxygenDensity() {
      //this.overlay = true
      //console.log('aa')
      if(!this.isShowVideoPlay){
        this.isShowVideoPlay=true
        console.log('1111111111')
        await this.$refs.pVideoPlayering.playingVideo(this.playeringOptions)
      }else{
        this.isShowVideoPlay=false  
        console.log('2222222222')
      }
    },  
    //time : start
    startTimer() {
      this.isTimerRunning = true

      this.timer = setInterval( () => {
        this.timeWork++;
      }, 1000 )
    },    
    //time : end

    //dialog
    userInfo(obj) {
      console.log('obj : ' + JSON.stringify(obj,null,2))
    },

  },
  mixins: [activityMixin, tdMotionMixin],
}  
</script>
<style>
.video-js{background-color: white;}

.video-js .vjs-big-play-button{
  top: 45%;
  left: 45%;
}

.vjs-wrap{
  position: relative;
  width:100%;  
}
</style>
