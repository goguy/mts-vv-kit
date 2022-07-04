<template>
  <v-container id="working"
    class="pa-0"
    fluid
  >      

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
        <v-card v-show="!isShowOxygenVideoPlay" class="pa-5 grey lighten-5">
          <v-sheet v-show="!isOutbreak"
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
                  <!--
                  <v-subheader class="text-subtitle-1">Motion Lists</v-subheader>
                  -->
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
        </v-card>

        <v-card v-show="isShowOxygenVideoPlay" class="pa-5 grey lighten-5" >        
          <v-sheet
            class="vjs-wrap">        
            <video-playering ref="pVideoPlayering"/>
          </v-sheet>        
        </v-card>

        <v-row>
          <v-col
            align="center"
            justify="space-around"
          >

            <div>
              <div v-if="!isShowOxygenVideoPlay && isOutbreak" 
                class="d-inline float-left font-weight-thin">
                <v-btn
                  depressed
                  dark
                  large
                  color="pink"
                  elevation="1"
                  @click="btnCopeOutbreak"
                  class="ma-3"
                >
                  돌발대처
                </v-btn>
                <v-btn
                  depressed
                  dark
                  large
                  color="pink"
                  elevation="1"
                  @click="btnCopeImageOutbreak"
                  class="ma-3"
                >
                  돌발이미지대처
                </v-btn>
             
             
             
                <v-btn
                  depressed
                  dark
                  large
                  color="pink"
                  elevation="1"
                  @click="validate"
                >
                  작업장탈출
                </v-btn>
              </div>
              <div v-else-if="!isShowOxygenVideoPlay && isCopeOutbreak && playerVideoState==='ended'"
                class="d-inline float-left font-weight-thin">
                <v-btn
                  depressed
                  dark
                  large
                  color="blue-grey"
                  elevation="1"
                  @click="btnNomalVideoPlayer"
                  class="ma-3"
                >
                  작업진행
                </v-btn>
              </div>
              <div v-if="queryWorkTdmotion.length === workAndworkerTdmotion.length"
                class="d-inline float-left font-weight-thin">
                <v-btn 
                  depressed
                  dark
                  large
                  color="blue-grey"
                  elevation="1"
                  @click="validate"
                  class="ma-3"
                >
                  작업결과보고서
                </v-btn>
              </div>

              <div class="d-inline float-right font-weight-thin">


                <v-btn
                  depressed
                  dark
                  large
                  color="pink"
                  elevation="1"
                  @click="btnCopeImageOutbreak"
                  class="mt-3"
                >
                  돌발이미지대처
                </v-btn>


                <v-btn
                  depressed
                  dark
                  large
                  :color="oxygenDensity.state.color"
                  elevation="1"
                  @click="btnOxygenDensity"
                  class="mt-3"
                >
                  
                  <v-progress-circular v-if="isPrepareOutbreak"
                    indeterminate
                    color="white"
                    size="20"
                    class="mr-2"
                  ></v-progress-circular>
                  
                  산소농도측정
                </v-btn>            
              </div>

              <div v-show="!isShowOxygenVideoPlay">  
                <p v-if="isNormalPlayer === false" 
                  class="text-h5 text-center font-weight-light">
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
                </p>
                <p v-else-if="isNormalPlayer === true" 
                  class="text-h5 text-center font-weight-light">
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
                </p>
              </div>
            </div>
            
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
              <span class="ml-5">[ {{makeWorkingTime(workTotalTime)}} ]</span>
            </P>
          </v-sheet>      

          <v-divider/>
          <!--장비표시 영역 -->  
          <v-sheet class="mt-4 text-center">
            <p>{{setWorkerEquipment()}}</p>
          </v-sheet>

          <v-divider/>
          <!--작업자건강 영역 -->  
          <v-sheet>            
            <v-subheader class="text-subtitle-1">작업자건강(100점 만점)</v-subheader>

            <v-list-item
            >
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
                  <v-slider
                    :max="workerHealth.range.max"
                    :min="workerHealth.range.min"
                    :value="workerHealthValue"
                    color="black"
                    track-color="grey"
                    vertical
                  ></v-slider>
              </v-list-item-content>

            </v-list-item>            
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{workerHealth.state.msg}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>            

          </v-sheet>      

          <v-divider/>
          <!--산소농도 영역 -->  
          <v-sheet>              
            <v-subheader >
              <v-btn
                plain
                @click="btnOxygenDensityHealthObstacle"
                class="text-subtitle-1"
              >
              산소농도(%)
              </v-btn>
            </v-subheader>

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
                  <v-slider
                    :max="oxygenDensity.range.max"
                    :min="oxygenDensity.range.min"
                    :value="oxygenDensityGuage*10"
                    color="black"
                    track-color="grey"
                    vertical
                  ></v-slider>
              </v-list-item-content>

            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{oxygenDensity.state.msg}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>            

          </v-sheet>

          <v-divider v-if="isOutbreak"/>
          <!--돌발상황 영역 -->
          <v-sheet v-if="isOutbreak"
           dark
           color="red">
           <p class="pa-2">
             <v-icon>mdi-led-on</v-icon>
             돌발상황 발생 ...!
           </p> 
          </v-sheet> 

        </v-sheet>
      </v-col>    
    </v-row>


    <v-snackbar
      v-model="snackbar.isSnackbar"
      :vertical="snackbar.vertical"
    >
      {{ snackbar.message }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="red"
          text
          v-bind="attrs"
          @click="snackbar.isSnackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <v-fab-transition>
      <v-overlay
        :absolute="overAbsolute"
        :value="overlay"
      >
        <v-img v-if="oxygen_img_isShow"
          :src="oxygen_img_src"
          :max-width="oxygen_maxWidth"
        >
          <v-btn
            color="success"
            bottom
            right
            absolute              
            @click="btnCloseOxygenDensityHealthObstacle"         
          >
            Close
          </v-btn>
        </v-img>

        <v-carousel v-else-if="isCopeOutbreak" 
          v-model="carousel" 
          hide-delimiters
          :height="cope_height"
          >
          <v-carousel-item
            v-for="(item,i) in items"
            :key="i"
          >
            <v-img 
              :src="item.src"
              cotain
              :max-width="cope_max_width"         
            >
              <v-btn
                color="success"
                bottom
                right
                absolute              
                @click="btnCloseCopeImageOutbreak"         
              >
                Close
              </v-btn>
            </v-img>
          </v-carousel-item>
        </v-carousel>
  
      </v-overlay>
    </v-fab-transition>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

import Enumerable  from 'linq'
import VideoPlayerList from '@/components/videojs/VideoPlayerList.vue'
import VideoPlayering from '@/components/videojs/VideoPlayering.vue'

import 'video.js/dist/video-js.css'

import { activityMixin } from '@/mixins/activityMixin.js'
import { tdMotionMixin } from '@/mixins/tdMotionMixin.js'

import utilityService from '@/js/common/utility.service.js'


const workStore = 'workStore'
const workerStore = 'workerStore'
const tdmotionStore = 'tdmotionStore'
const workTdmotionStore = 'workTdmotionStore'
const workerTdmotionStore = 'workerTdmotionStore'
const workerWorkingStore = 'workerWorkingStore'
const workerResultStore = 'workerResultStore'

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
      //autoplay: false,
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
    isNormalPlayer: null,
    playerVideoState: '',
    isOutbreakBeforePlay: false, 

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
    selectedItem: 0,

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
    oxygen_img_src: '',
    oxygen_img_isShow: false,
    //oxygenDensityValue: 20,
    
    //돌발상황
    outbreakTime: 0,
    prepareOutbreakTime: 30,
    isOutbreak: false,
    isPrepareOutbreak: false,

    //돌발대처
    isCopeOutbreak: false,  
    carousel: 0,
    items: [
      {
        src: require('@/assets/img/copeOutbreak_0.png'),
      },
      {
        src: require('@/assets/img/copeOutbreak_1.png'),
      },
      {
        src: require('@/assets/img/copeOutbreak_2.png'),
      },
      {
        src: require('@/assets/img/copeOutbreak_3.png'),
      },
      {
        src: require('@/assets/img/copeOutbreak_4.png'),
      },
    ],


    //작업자선택결과
    workerResult: {
      worker_id: 0,
      work_id: 0,
      guide_isGuide: false,
      permit_isPermit: false,
      equip_totProtect: 0,
      equip_chkProtect: 0,
      equip_totSafety: 0,
      equip_chkSafety: 0,
      oxygen_isInit: false,
      oxygen_cntInit: 0,
      oxygen_isWork: false,
      oxygen_cntWork: 0,
      work_workTime: 0,
      work_checkTime: 0,
      work_isTime: false,
      outbreak_isRecognize: false, 
      outbreak_cntRecognize: 0,
      outbreak_isResponse: false,
      outbreak_isEvacuate: false,
      reg_dt: null,
    },  

    //작업상태값 저장
    workerWorking: {
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

    playeringOptions: {
      autoplay: true,
      controls: true,
      fluid: true,// 화면의 따라
      sources: [{
                  src: require('@/assets/video/o2.mp4'),
                  type: 'video/mp4'
              }],
    },
    isShowOxygenVideoPlay: false,
    isOxygenPlayer: false,

    snackbar: {
      isSnackbar: false,
      vertical: true,
      message: '',
    },
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
    ...mapGetters(workerResultStore, [
      'GE_WORKER_RESULT'
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
    workTotalTime(){
      let query = this.GE_WORK_LIST.filter(f=>f.work_id === this.GE_WORKER.work_id) 
      //console.log(query,null,2)
      return query[0].time
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
    oxygen_maxWidth(){
      const width = this.$vuetify.breakpoint.xsOnly ? '400':'615'  
      return width
    },
    cope_height() {
      const height = this.$vuetify.breakpoint.xsOnly ? '545':'818'  
      return height
    },
    cope_max_width() {
      const width = this.$vuetify.breakpoint.xsOnly ? '400':'600'  
      return width
    },
    queryWorkTdmotion(){
      let query =  Enumerable.from(this.GE_TDMOTION_LIST).where(w=>w.type === 'normal')
                                 .join(Enumerable.from(this.GE_WORK_TDMOTION_LIST)
                                             .where(w=>w.work_id === this.GE_WORKER.work_id),
                                    pk=>pk.motion_id,
                                    fk=>fk.motion_id,
                                    (left, right)=>({...left, ...right}))
                                  .toArray()
      //console.log('query : ' + JSON.stringify(query,null,2))
      
      return query
    },


    queryWorkerTdmotion(){
      let queryWorkerTdmotion = Enumerable.from(this.GE_TDMOTION_LIST)              
                                 .join(Enumerable.from(this.GE_WORKER_TDMOTION_LIST)
                                             .where(w=>w.worker_id === this.GE_WORKER.worker_id),
                                    pk=>pk.motion_id,
                                    fk=>fk.motion_id,
                                    (left, right)=>({...left, ...right}))
                                .toArray()
      return queryWorkerTdmotion
    },


    workAndworkerTdmotion() {      
      let query = Enumerable.from(this.queryWorkTdmotion)
                            .join(Enumerable.from(this.queryWorkerTdmotion),
                                  pk => pk.motion_id,
                                  fk => fk.motion_id,
                                  (left, right) => ({...left, right}))
                            .toArray()

      //console.log('query : ' + JSON.stringify(query,null,2))
      return query
    },



  },
  watch: {   
    timeWork(val){
      //console.log('workingTime : ' + val)
      //돌발상황플레이
      if(this.timeWork === (this.outbreakTime - this.prepareOutbreakTime)){ 
        this.isPrepareOutbreak=true
      }      
      if(val === this.outbreakTime){
        this.isOutbreakBeforePlay = this.isNormalPlayer

        console.log('timeWork - isNormalPlayer', this.isNormalPlayer)


        this.isPrepareOutbreak=false
        this.isOutbreak=true
        this.playVideoPlayer('outbreak')
      }      
      //교육보고서 작업시각 초과여부
      if(val > this.workTotalTime){
        this.workerResult.work_isTime=true
        this.workerResult.work_checkTime=val
      }

    },    
    isShowOxygenVideoPlay(val){
      console.log('isShowOxygenVideoPlay', val)
      if(val){        
        // 산소농도측정기 작동상태 확인 및 농도측정
        if(this.isNormalPlayer === null){
          if(!this.workerResult.oxygen_isInit)
            this.workerResult.oxygen_isInit=true
          this.workerResult.oxygen_cntInit+=1
          console.log('this.isNormalPlayer',this.isNormalPlayer)
          console.log('this.workerResult.oxygen_isInit',this.workerResult.oxygen_isInit)
          console.log('this.workerResult.oxygen_cntInit',this.workerResult.oxygen_cntInit)
        }
        //작업 중 산소농도 측정여부
        else if(this.isNormalPlayer)
        {
          if(!this.workerResult.oxygen_isWork)
            this.workerResult.oxygen_isWork=true
          this.workerResult.oxygen_cntWork+=1
          console.log('this.isNormalPlayer',this.isNormalPlayer)
          console.log('this.workerResult.oxygen_isWork',this.workerResult.oxygen_isWork)
          console.log('this.workerResult.oxygen_cntWork',this.workerResult.oxygen_cntWork)
        }
        
        //돌발상황 발생 인지여부
        if(this.isPrepareOutbreak){
          this.workerResult.outbreak_isRecognize=true
          this.workerResult.outbreak_cntRecognize+=1
          console.log('this.workerResult.outbreak_isRecognize',this.workerResult.outbreak_isRecognize)
          console.log('this.workerResult.outbreak_cntRecognize',this.workerResult.outbreak_cntRecognize)
        }
      }
    },
    carousel(val){
      console.log('carousel',val)
    }
  },
  created() {
    // normal, outbreak
    this.videoListQuery('normal')
  }, 
  mounted() {

    //작업변수
    this.getAndSetWorkerWorking()

    //작업자결과
    this.getWorkerResult()

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
      this.setWorkerResult()
  },    

  methods: {
    ...mapActions(workerWorkingStore, [
      'AC_WORKER_WORKING'
    ]),
    ...mapActions(workerResultStore, [
      'AC_WORKER_RESULT'
    ]),

    initQuery(){
      
      console.log('queryWorkTdmotion.length', this.queryWorkTdmotion.length)
      console.log('workAndworkerTdmotion.length', this.workAndworkerTdmotion.length)
      //this.checkOxygenEquip()
      //console.log('this.GE_WORKER_WORKING : ' + JSON.stringify(this.GE_WORKER_WORKING, null, 2))  
    },
    async onPlayer(player){
      this.player = player
      this.response = await this.player.playlist(this.videoList)


      //this.response = await this.player.playlist.autoadvance(0)
      //this.playerListStated(this.player)

      this.playerListLastIndex = this.player.playlist.lastIndex()

      //dialog setting 02-09
      //this.popupOptions.motionId = this.videoList[this.playerListCurrentIndex].sources[0].motion_id
      
      //console.log('this.response : ' + JSON.stringify(this.response,null,2) )

    },
    
    onPlayerState(event){
        switch(event.type){
            case 'play':
                console.log('player : ' + event.type)
                this.playerVideoState=event.type 

                this.btnNextHidden = false
                this.isNormalPlayer = true
                break;    
            case 'pause':
                console.log('player : ' + event.type)
                this.playerVideoState=event.type 
                this.isNormalPlayer = false
                break;    
            case 'ended':
                console.log('this.videoList : ' + this.videoList)
                this.playerVideoState=event.type 

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
                this.playerVideoState=event.type 
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
        
        if(!this.isOutbreak)
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

      //돌발상황세팅
      this.setOutbreak(this.workTime)

      //runWorking
      this.runWorkingInterval(this.cycleTick, this.equipPenalty)
     
    },
    getWorkerResult(){
      if(this.GE_WORKER_RESULT.worker_id === this.GE_WORKER.worker_id){
        this.workerResult = this.GE_WORKER_RESULT
        this.workerResult.work_checkTime=0
        this.workerResult.work_isTime=false
      }
    },
    setWorkerResult(){
      this.workerResult.worker_id=this.GE_WORKER.worker_id
      this.workerResult.work_id=this.GE_WORKER.work_id
      this.workerResult.guide_isGuide=this.GE_WORKER.guide_chk
      this.workerResult.permit_isPermit=this.GE_WORKER.order_chk
      this.workerResult.equip_totProtect=this.queryWorkEquipment('protect').length
      this.workerResult.equip_chkProtect=this.queryWorkAndWorkerEquipment('protect').length
      this.workerResult.equip_totSafety=this.queryWorkEquipment('safety').length
      this.workerResult.equip_chkSafety=this.queryWorkAndWorkerEquipment('safety').length
      this.workerResult.work_workTime=this.workTotalTime

      this.AC_WORKER_RESULT(this.workerResult)
    },
    //outbreak - start
    setOutbreak(total){
      
      let mean = total * 0.6
      let stddev = total * 0.1

      if(this.checkVideoListQuery('outbreak').length > 0){
        //this.outbreakTime = this.NormalDistribution(mean, stddev)
        
        this.outbreakTime = utilityService.NormalDistribution(mean, stddev)
        this.outbreakTime = Math.round(this.outbreakTime,0)
        //this.outbreakTime = 60
      }else{
        this.outbreakTime = this.timeWork + 60*60*60
      }
      console.log('this.outbreakTime : ' + this.outbreakTime)
    },

    /*

    generateRandom(min,max){
        return (Math.random() * (max - min)) +min
    },


    NormalDistribution(mean,std_dev){
			//return mean + (this.gaussianRandom()*std_dev)
			return mean + (utilityService.gaussianRandom()*std_dev)      
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
    */
    //outbreak - end

    runWorkingInterval(tick, penalty){
      //this.workerHealthGuage -= penalty
      this.workerHealthValue -= penalty
      
      this.workingInterval = setInterval(() => {
        this.tickCount++

        if(this.timeWork <= this.outbreakTime - this.prepareOutbreakTime){
          this.normalO2Random()          
        }else{
          this.emergencyO2()
        }

        /*
				if (this.timeWork <= this.outbreakTime){
					this.isOutbreak=false
          this.normalO2Random()
				} else {
          this.isOutbreak=true
					this.emergencyO2()
				}
        */
        //산소농도 메시지처리
        this.oxygenDensity.state = utilityService.oxygenDensityState(this.oxygenDensityGuage)
        
        //작업자 건강계산
        this.calcWorkerHealth()

        //작업자 건강 메시지처리
        this.workerHealth.state = utilityService.workerHealthState(this.workerHealthValue)

      }, tick*1000)    

    },
		normalO2Random() {
			// 19.0 에서 23.5에서 뿌려주자
			//let t = this.NormalDistribution(20.9, 2)
      //let t = this.generateRandom(19.0, 23.5)
      let t = utilityService.generateRandom(19.0, 23.5)
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
    /*
    oxygenDensityState(val){

      let color = 'green'
			let msg = ''

			if (val > 18)
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
				color = 'orange'
				msg = '어지럼증, 토할 것 같음, 체중지지 불능으로 추락'
			}
			else if (val >= 10)
			{
				color = 'red'
				msg = '안면창백, 의식불명, 구토'
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

			if (val < 80 ) 	{
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
    */

		calcWorkerHealth() {
      //this.workerHealthGuage -= 1
      if( this.workerHealthValue <= 0 ){
        this.workerHealthValue = 0
      }else{
        this.workerHealthValue -= 1
      }
		},
    async playVideoPlayer(type){
      this.videoListQuery(type)
      console.log('this.videoList', JSON.stringify(this.videoList,null,2))
      if(this.videoList.length > 0){
        this.response = await this.player.playlist(this.videoList)            
        
        if(type === 'normal'){
          this.player.playlist.currentItem(this.selectedItem)
          
          if(this.isOutbreakBeforePlay){
            console.log('playVideoPlayer - isOutbreakBeforePlay', this.isOutbreakBeforePlay)
            setTimeout(() => (
              this.player.play()
            ), 1)    
          }else{
            console.log('playVideoPlayer - isOutbreakBeforePlay', this.isOutbreakBeforePlay)
            setTimeout(() => (
              this.player.pause()
            ), 1)              
          }
          this.isOutbreakBeforePlay=false
                      
        }else  
          this.player.playlist.first()          
      }
    },

    checkOxygenEquip(){
      let query = this.queryWorkAndWorkerEquipment('safety').filter(f=>f.name === '산소농도측정기')
      console.log('query.length', query.length)
      return query.length
    },  
    btnOxygenDensity() {
      if(this.checkOxygenEquip() === 0 ){

        this.setSnackbar('산소농도를 측정하는 장비가 없습니다.')
        //alert('산소농도를 측정하는 장비가 없습니다.')  
        return 
      }else{
        if(!this.isShowOxygenVideoPlay){
          this.isShowOxygenVideoPlay=true
          
          //단위업무작업play여부
          this.checkIsNormalPlayer()

          //산소농도측정play
          this.playOxygenVideoPlayer()

          //작업자건강
          this.setWorkerHealthValue()

        }else if(this.isShowOxygenVideoPlay){
          this.isShowOxygenVideoPlay=false

          if(this.isNormalPlayer){
            this.player.play()
          }
        }
      }
    },
    checkIsNormalPlayer() {
      if(this.isNormalPlayer){
        this.player.pause()
        
        setTimeout(() => (
          this.isNormalPlayer=true
        ), 500)          
      }
    },
    async playOxygenVideoPlayer() {
      if(this.$refs.pVideoPlayering.playering === null){        
        await this.$refs.pVideoPlayering.playingVideo(this.playeringOptions)
      }else{
        this.$refs.pVideoPlayering.playering.play()
      }
    },
    setWorkerHealthValue() {
      if( this.workerHealthValue+10 > 100 ){
        this.workerHealthValue = 100
      }else{
        this.workerHealthValue += 10
      }
    },
    btnPlayWork(){
      this.player.play()
      //this.player.currentTime(4.466394)
      //this.isNormalPlayer = false
    },
    btnStopWork(){
      this.player.pause()
      //this.isNormalPlayer = true
    },
    //돌발대처
    btnCopeOutbreak() {
      console.log('btnCopeOutbreak')
      this.isOutbreak=false
      this.isCopeOutbreak=true
      this.playVideoPlayer('equipment')
    },
    btnCopeImageOutbreak() {
      this.isOutbreak=false
      this.isCopeOutbreak=true
      this.overlay=true

    },
    btnCloseCopeImageOutbreak() {
      this.isCopeOutbreak=false
      this.overlay=false
    },
    //작업진행
    btnNomalVideoPlayer() {
      this.isCopeOutbreak=false
      this.playVideoPlayer('normal')
      this.workerResult.outbreak_isResponse=true 
      console.log('this.selectedItem', this.selectedItem)
    },
    //산소농도건강장애
    btnOxygenDensityHealthObstacle() {
      this.overlay=true
      this.oxygen_img_isShow=true
      this.oxygen_img_src=require('@/assets/img/oxygenDensityHealthObstacle.png')
    },
    btnCloseOxygenDensityHealthObstacle() {
      this.overlay=false
      this.oxygen_img_isShow=false    
    },  
    validate () {
      this.nextStep(); 
      //console.log('this.GE_WORKER_EQUIPMENT_LIST : ' + JSON.stringify(this.GE_WORKER_EQUIPMENT_LIST,null,2));

    },
    nextStep() {
      //돌발상황 발생장소로부터 대피여부
      if(this.isOutbreak)
        this.workerResult.outbreak_isEvacuate=true

      this.activityWorker(this.GE_WORKER.worker_id, this.getActivityId('작업하기'))
      //this.$router.replace('/work/choiceWork');
      //this.dialog = false
      this.$router.push('/work/reporting')
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
                            .toArray()   

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
    setSnackbar(msg) {
        this.snackbar.isSnackbar=true
        this.snackbar.message=msg
        this.snackbar.vertical=true
    },

  },

  mixins: [activityMixin, tdMotionMixin],
}  
</script>
<style scope>

.video-js{background-color: white;}

.video-js .vjs-big-play-button{
  top: 45%;
  left: 45%;
}

.vjs-wrap{
  position: relative;
  width:100%;  
}

.v-slider--vertical{
  min-height: 100px !important;
}
.v-slider--vertical .v-slider__track-background, .v-slider--vertical .v-slider__track-fill{
   width: 150% !important;
}
.v-slider__thumb{
  left: -5.5px !important;
}
</style>
