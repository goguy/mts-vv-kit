<template>
  <v-container 
    id="choke_work"
    class="pa-0"
    fluid
  >      
    <v-row no-gutters>
      <v-col cols="2">
      </v-col>
      <v-col>
        <!--작업명 & 수강생 -->
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
        <!--videoPlayer-->
        <v-card v-show="!isShowOxygenVideoPlay" 
          class="pa-5 grey lighten-5">
          <v-sheet v-if="!isOutbreak"
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
                        @click.stop="playerDrawer = !playerDrawer"
                        class="blue-grey darken-4"
                    >
                      <v-icon v-if="!playerDrawer">
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
              v-model="playerDrawer"
              absolute
              temporary
              class="blue-grey lighten-5"
            >
                <v-list
                    nav
                    dense
                    shaped
                >
                  <v-list-item-group
                      v-model="playerListCurrentIndex"
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
                  v-show="playerBtnNextHidden"                  
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
              :absolute="playerOverAbsolute"
              :value="playerOverlay"
            >
            </v-overlay>
          </v-fab-transition>

        </v-card>

        <!--anotherVideoPlayer -->
        <v-card v-show="isShowOxygenVideoPlay" class="pa-5 grey lighten-5" >        
          <v-sheet
            class="vjs-wrap">        
            <video-playering ref="pVideoPlayering"/>
          </v-sheet>        
        </v-card>

        <!-- button area -->
        <v-row>
          <v-col
            align="center"
            justify="space-around"
          >
            <!--buttonArea -->            
            <template v-if="(workStep.type==='normal'&& workStep.step==='0')">
              <div class="d-inline float-left mt-2">
              </div>
              <div class="d-inline float-right mt-2">

                <!--
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
                -->
                <v-btn v-if="(playerListCurrentIndex+1) === videoList.length"
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
              <div clsaa="d-inline text-center mt-2">
                <v-btn v-if="isNormalPlayer === false"
                  depressed
                  dark
                  large
                  color="primary"
                  elevation="1"
                  @click="btnPlayWork"
                  class="ma-2"
                >
                  작업재개
                </v-btn>
                <v-btn v-else-if="isNormalPlayer === true"
                  depressed
                  dark
                  large
                  color="primary"
                  elevation="1"
                  @click="btnStopWork"
                  class="ma-2"
                >
                  작업중지
                </v-btn>
              </div>            
            </template>
            <template v-else-if="(workStep.type==='normal' && workStep.step==='1')">
              <div class="d-inline float-left mt-2">
                <v-btn v-if="playerVideoState==='ended'"
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
              <div clsaa="d-inline text-center mt-2">
                <v-btn v-if="isNormalPlayer === false"
                  depressed
                  dark
                  large
                  color="primary"
                  elevation="1"
                  @click="btnPlayWork"
                  class="ma-2"
                >
                  작업재개
                </v-btn>
                <v-btn v-else-if="isNormalPlayer === true"
                  depressed
                  dark
                  large
                  color="primary"
                  elevation="1"
                  @click="btnStopWork"
                  class="ma-2"
                >
                  작업중지
                </v-btn>
              </div>            
            </template>
            <template v-else-if="(workStep.type==='normal' && workStep.step==='last')">
              <div class="d-inline float-left mt-2">
                <v-btn 
                  depressed
                  dark
                  large
                  color="blue-grey"
                  elevation="1"
                  @click="validate('Y')"
                  class="ma-3"
                >
                  작업결과보고서
                </v-btn>
              </div>
              <div clsaa="d-inline text-center mt-2">
                <v-btn v-if="isNormalPlayer === false"
                  depressed
                  dark
                  large
                  color="primary"
                  elevation="1"
                  @click="btnPlayWork"
                  class="ma-2"
                >
                  작업재개
                </v-btn>
                <v-btn v-else-if="isNormalPlayer === true"
                  depressed
                  dark
                  large
                  color="primary"
                  elevation="1"
                  @click="btnStopWork"
                  class="ma-2"
                >
                  작업중지
                </v-btn>
 
              </div>            
            </template>
            <template v-else-if="(workStep.type==='outbreak' && workStep.step==='1')">
              <div class="d-inline float-left mt-2">
                <v-btn v-if="oxygenDensity.state.color!=='black' && workerHealth.state.color!=='black'"
                  depressed
                  dark
                  large
                  color="pink"
                  elevation="1"
                  @click="btnCopeOutbreak"
                  class="ma-3"
                >
                  자력탈출
                </v-btn>
                <v-btn
                  depressed
                  dark
                  large
                  color="pink"
                  elevation="1"
                  @click="validate('N')"
                >
                  작업장탈출
                </v-btn>
              </div>
              <div clsaa="d-inline text-center mt-2">
                <v-btn v-if="isNormalPlayer === false"
                  depressed
                  dark
                  large
                  color="primary"
                  elevation="1"
                  @click="btnPlayWork"
                  class="ma-2"
                >
                  작업재개
                </v-btn>
                <v-btn v-else-if="isNormalPlayer === true"
                  depressed
                  dark
                  large
                  color="primary"
                  elevation="1"
                  @click="btnStopWork"
                  class="ma-2"
                >
                  작업중지
                </v-btn>
              </div>            
            </template>
            <template v-else-if="(workStep.type==='outbreak' && workStep.step==='last')">
              <div class="d-inline float-left mt-2">
                <v-btn
                  depressed
                  dark
                  large
                  color="pink"
                  elevation="1"
                  @click="validate('N')"
                >
                  작업장탈출
                </v-btn>
              </div>
              <div class="d-inline float-right mt-2">
              </div>
              <div clsaa="d-inline text-center mt-2">
              </div>            
            </template>
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
                  <v-list-item-title>{{oxygenDensityGauge}}</v-list-item-title>
                </v-list-item-content>

                <v-list-item-content>
                    <v-slider
                      :max="oxygenDensity.range.max"
                      :min="oxygenDensity.range.min"
                      :value="oxygenDensityGauge*10"
                      color="black"
                      track-color="grey"
                      vertical
                    ></v-slider>
                </v-list-item-content>

                <v-fade-transition>              
                  <v-overlay 
                    :value="isPrepareOutbreak"
                    absolute
                  >
                    <v-progress-circular
                      indeterminate
                      size="64"
                    ></v-progress-circular>
                  </v-overlay>
                </v-fade-transition>

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

    <!-- 산소농도별 & 돌발대처 -->
    <v-fab-transition>
      <v-overlay
        :absolute="oxygenOverAbsolute"
        :value="oxygenOverlay"
      >
        <v-img v-if="oxygenImgIsShow"
          :src="oxygenImgSrc"
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
          v-model="copeCarousel" 
          hide-delimiters
          :height="cope_height"
          >
          <v-carousel-item
            v-for="(item,i) in copeItems"
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

const resultStore = 'resultStore'

export default {
  name: 'choke_work',
  components: {
    VideoPlayerList,
    VideoPlayering,
  },
  mixins: [activityMixin, tdMotionMixin],
  data: () => ({
    player: null,
    response: null,
    playerTitle: '',
    playerListPrevousIndex: -1,
    playerListCurrentIndex: 0,
    playerListNextIndex: 1,
    playerListLastIndex: -1,
    videoOptions: {
      autoplay: true,
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
    isNormalPlayer: null,
    playerVideoState: '',
    playerVideoType: '',
    playerNormalListCurrentIndex: 0,
    playerNormalCurrentTime: 0,
    //checkOutbreakBeforePlay: false, 
    normalVideoLength: 0, 

    playerDrawer: null,
  
    playerBtnNextHidden: false,
    //sheet: false,

    playerOverlay: false,
    playerOverAbsolute: true,

    //총작업시각
    workTime: 0,
    //타이머주기
    cycleTick: 0,
    //장비패널티수
    //equipPenalty: 0,

    //타이머
    workingDisplayInterval: null,

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
    oxygenDensityGauge: 21,
    
    oxygenImgSrc: '',
    oxygenImgIsShow: false,
    
    oxygenOverlay: false,
    oxygenOverAbsolute: true,
 
    isEmergencyO2: false,
  
    isShowOxygenVideoPlay: false,
    //isOxygenPlayer: false,
 
    playeringOptions: {
      autoplay: true,
      controls: true,
      fluid: true,// 화면의 따라
      sources: [{
                  src: require('@/assets/video/o2_measure.mp4'),
                  type: 'video/mp4'
              }],
    },
    
    //돌발상황
    outbreakTime: 0,
    prepareOutbreakTime: 15,
    isOutbreak: false,
    isPrepareOutbreak: false,

    //돌발대처
    isCopeOutbreak: false,  
    copeCarousel: 0,
    copeItems: [
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
      guide_isguide: false,
      permit_ispermit: false,
      equip_totprotect: 0,
      equip_chkprotect: 0,
      equip_totsafety: 0,
      equip_chksafety: 0,
      oxygen_isinit: false,
      oxygen_cntinit: 0,
      oxygen_iswork: false,
      oxygen_cntwork: 0,
      work_worktime: 0,
      work_checktime: 0,
      work_istime: false,
      outbreak_isrecognize: false, 
      outbreak_cntrecognize: 0,
      outbreak_isresponse: false,
      outbreak_isevacuate: false,
      reg_dt: null,
    },  

    resultPayload: {
      index: 0,
      result:[]
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
    timeWork:0,
    timerInterval:null,
    //작업단계
    workStep: {
      type: 'normal',
      step:'0',
    },
    snackbar: {
      isSnackbar: false,
      vertical: true,
      message: '',
    },
    gitUrl: 'https://goguy.github.io/mts-vv-kit',
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
    ...mapGetters(resultStore, [
      'GE_RESULT', 'GE_RESULT_LIST'
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
    isWorkerTdmotion(){
      if(this.queryWorkTdmotion.length === this.workAndworkerTdmotion.length){
        //console.log('isWorkerTdmotion true')
        return true
      }else{ 
        //console.log('isWorkerTdmotion false')
        return false
      }  
    },
    equipPenalty(){
      let amount = ( this.queryWorkEquipment('protect').length - this.queryWorkAndWorkerEquipment('protect').length ) + 
                          ( this.queryWorkEquipment('safety').length - this.queryWorkAndWorkerEquipment('safety').length )
      return amount
    },
    queryWorkTdmotion(){
      let query =  Enumerable.from(this.GE_TDMOTION_LIST).where(w=>w.type === 'normal')
                                 .join(Enumerable.from(this.GE_WORK_TDMOTION_LIST)
                                             .where(w=>w.work_id === this.GE_WORKER.work_id),
                                    pk=>pk.motion_id,
                                    fk=>fk.motion_id,
                                    (left, right)=>({...left, ...right}))
                                  .toArray()
      //console.log('queryWorkTdmotion - query : ' + JSON.stringify(query,null,2))
      
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

      //console.log('workAndworkerTdmotion - query : ' + JSON.stringify(query,null,2))
      return query
    },
  },
  watch: { 
    playerListCurrentIndex(val){
      console.log('playerListCurrentIndex', val)

      if(this.playerVideoType === 'normal'){
        this.playerNormalListCurrentIndex = val

        if( (val+1) === this.normalVideoLength && !this.workerResult.outbreak_isresponse){
          let outbreakTime = this.timeWork + 174
          //let outbreakTime = this.timeWork + 60
          console.log('outbreakTime',outbreakTime)
          console.log('timeWork',this.timeWork)
          this.setOutbreak(outbreakTime)
        }
      }
    },
    timeWork(val){
      //console.log('workingTime : ' + val)
      //돌발상황플레이
      if(val === (this.outbreakTime - this.prepareOutbreakTime)){ 
        this.isPrepareOutbreak=true
        this.isEmergencyO2=true
      }else if(val === this.outbreakTime && !this.workerResult.outbreak_isresponse){
        //this.checkOutbreakBeforePlay = this.isNormalPlayer

        console.log('timeWork - isNormalPlayer', this.isNormalPlayer)

        this.isPrepareOutbreak=false
        
        this.isOutbreak=true
        this.workStep.type='outbreak'
        this.workStep.step='1'

        //플레이시간 가져오기
        this.playerNormalCurrentTime = this.player.currentTime()
        console.log('playerNormalCurrentTime', this.playerNormalCurrentTime)
        //산소농도측정시 조치
        this.isShowOxygenVideoPlay=false

        this.playVideoPlayer('outbreak')
      }      
      //교육보고서 작업시각 초과여부
      if(val === this.workTotalTime+1){
        this.recordWorkerResult('work_time', 'N')

        //this.workerResult.work_istime=false        
        //this.workerResult.work_checktime=val
      }else{
        if(this.isWorkerTdmotion){
          this.workerResult.work_istime=true
          this.setAllPlayerStop('normal')
        }
      }

    },    
    isShowOxygenVideoPlay(val){
      console.log('isShowOxygenVideoPlay', val)
      if(val){        
        // 산소농도측정기 작동상태 확인 및 농도측정
        if(this.isNormalPlayer === null){
          if(!this.workerResult.oxygen_isinit)
            this.workerResult.oxygen_isinit=true
          this.workerResult.oxygen_cntinit+=1
          //console.log('this.isNormalPlayer',this.isNormalPlayer)
          //console.log('this.workerResult.oxygen_isInit',this.workerResult.oxygen_isInit)
          //console.log('this.workerResult.oxygen_cntInit',this.workerResult.oxygen_cntInit)
        }
        //작업 중 산소농도 측정여부
        else if(this.isNormalPlayer)
        {
          if(!this.workerResult.oxygen_iswork)
            this.workerResult.oxygen_iswork=true
          this.workerResult.oxygen_cntwork+=1
          //console.log('this.isNormalPlayer',this.isNormalPlayer)
          //console.log('this.workerResult.oxygen_isWork',this.workerResult.oxygen_isWork)
          //console.log('this.workerResult.oxygen_cntWork',this.workerResult.oxygen_cntWork)
        }
        
        //돌발상황 발생 인지여부
        if(this.isPrepareOutbreak){
          this.workerResult.outbreak_isrecognize=true
          this.workerResult.outbreak_cntrecognize+=1
          //console.log('this.workerResult.outbreak_isRecognize',this.workerResult.outbreak_isRecognize)
          //console.log('this.workerResult.outbreak_cntRecognize',this.workerResult.outbreak_cntRecognize)
        }
      }
    },
    workerHealthValue(val){
      if(val === 0){
        this.setAllPlayerStop('outbreak')
      }
    },
    oxygenDensityGauge(val){
      if(val === 1.6){
        this.setAllPlayerStop('outbreak')
      }
    },
  },
  created() {
    // normal, outbreak
    this.normalVideoLength = this.videoListQuery('normal')
    //임시
    this.GE_RESULT_LIST    
  }, 
  mounted() {

    //작업변수
    this.getAndSetWorkerWorking()

    //작업자결과
    this.getWorkerResult()

    if(this.response){ 
      this.onPlayer()      
    }
    
    //작업시각타이머
    this.startTimer()

    //테스트
    //this.recordWorkerResult('outbreak_recognize')
    //console.log('workStep', JSON.stringify(this.workStep, null, 2))
    //console.log('timeWork', this.timeWork)

    

  },
  beforeDestroy() {
      if (this.player) {
          this.player.dispose()
      }
      clearInterval(this.workingDisplayInterval)
      clearInterval(this.timerInterval)      
      this.setWorkerResult()
  },    

  methods: {
    ...mapActions(workerWorkingStore, [
      'AC_WORKER_WORKING'
    ]),
    ...mapActions(workerResultStore, [
      'AC_WORKER_RESULT'
    ]),
    ...mapActions(resultStore, [
      'AC_RESULT_EDIT'
    ]),

    setData(){
      this.workStep.type='normal'
      this.workStep.step='0'    
    },

    async onPlayer(player){
      this.player = player
      this.response = await this.player.playlist(this.videoList)
      this.response = await this.player.playlist.autoadvance(2)
      this.playerListLastIndex = this.player.playlist.lastIndex()
    },
    
    onPlayerState(event){
        switch(event.type){
            case 'play':
                console.log('player : ' + event.type)
                this.playerVideoState=event.type 

                this.playerBtnNextHidden = false
                this.isNormalPlayer = true
                break;    
            case 'pause':
                console.log('player : ' + event.type)
                this.playerVideoState=event.type 
                this.isNormalPlayer = false
                break;    
            case 'ended':
                console.log('player : ' + event.type)
                //console.log('this.videoList : ' + this.videoList)
                this.playerVideoState=event.type 
                
                if(this.videoList)
                  this.tdmotionWorker(this.GE_WORKER.worker_id, this.videoList[this.playerListCurrentIndex].sources[0].motion_id)                                

                if(this.videoList.length - this.playerListCurrentIndex > 1)
                  this.playerBtnNextHidden = true 
                
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
    },
    
    nextPlayer() {
      this.player.playlist.next()      
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
    async playVideoPlayer(type){
      this.videoListQuery(type)
      //console.log('this.videoList-playVideoPlayer', JSON.stringify(this.videoList,null,2))
      if(this.videoList.length > 0){
        this.response = await this.player.playlist(this.videoList)
        
        //console.log('response', this.response)        
        this.player.playlist.first()
        if(type === 'normal'){
          this.player.playlist.currentItem(this.playerNormalListCurrentIndex)
          //this.player.play(30)
          this.player.currentTime(this.playerNormalCurrentTime)
          this.player.play()
        }
      }
    },

    videoListQuery(type){    
      this.playerVideoType = type      
      try{
        const query = Enumerable.from(this.GE_TDMOTION_LIST).join(
        Enumerable.from(this.GE_WORK_TDMOTION_LIST).where(
        w => w.work_id === this.GE_WORKER.work_id && w.type === type),
          pk=>pk.motion_id,
          fk=>fk.motion_id,
          (left, right) =>({...left, ...right})
        ).orderBy(o=>o.disp_ord).toArray()

        this.videoList = []

        for(const item of query){
          this.videoList.push( {sources: [{
              motion_id: item.motion_id,
              disaster_id: item.disaster_id,
              name: item.name,
              order: item.disp_ord - 1,     
              src : this.getVideoUrl(item.video_url),
              type: item.video_type 
            }],
            poster: this.getImageUrl(item.img_url)
          })
        }
        return this.videoList.length

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
      /*
      this.equipPenalty = ( this.queryWorkEquipment('protect').length - this.queryWorkAndWorkerEquipment('protect').length ) + 
                          ( this.queryWorkEquipment('safety').length - this.queryWorkAndWorkerEquipment('safety').length )
      */
      //총작업시각
      this.workTime = this.getWorkTime()
      //this.workTime = 100

      //돌발상황세팅
      //this.setOutbreak(this.workTime)

      //runWorking
      this.runWorkingInterval(this.cycleTick, this.equipPenalty)
     
    },
    getWorkerResult(){
      if(this.GE_WORKER_RESULT.worker_id === this.GE_WORKER.worker_id){
        this.workerResult = this.GE_WORKER_RESULT
        this.workerResult.work_checktime=0
        this.workerResult.work_istime=false
      }
      this.workerResult.outbreak_isresponse=false
    },
    setWorkerResult(){
      this.workerResult.worker_id=this.GE_WORKER.worker_id
      this.workerResult.work_id=this.GE_WORKER.work_id
      this.workerResult.guide_isguide=this.GE_WORKER.guide_chk
      this.workerResult.permit_ispermit=this.GE_WORKER.order_chk
      this.workerResult.equip_totprotect=this.queryWorkEquipment('protect').length
      this.workerResult.equip_chkprotect=this.queryWorkAndWorkerEquipment('protect').length
      this.workerResult.equip_totsafety=this.queryWorkEquipment('safety').length
      this.workerResult.equip_chksafety=this.queryWorkAndWorkerEquipment('safety').length
      this.workerResult.work_worktime=this.workTotalTime

      this.AC_WORKER_RESULT(this.workerResult)
    },
    //outbreak - start
    setOutbreak(total){
      
      let mean = total * 0.6
      let stddev = total * 0.1

      if(this.checkVideoListQuery('outbreak').length > 0){
        //this.outbreakTime = this.NormalDistribution(mean, stddev)
        
        this.outbreakTime = utilityService.NormalDistribution(mean, stddev)
        this.outbreakTime = Math.round(this.outbreakTime, 0)
        //this.outbreakTime = 60
      }else{
        //this.outbreakTime = this.timeWork + 60*60*60
        this.outbreakTime = -1
      }
      console.log('this.outbreakTime : ' + this.outbreakTime)
    },

    //outbreak - end

    runWorkingInterval(tick, penalty){
      if( this.equipPenalty !== 0 ){
        this.workerHealthValue -= penalty
      }
      
      this.workingDisplayInterval = setInterval(() => {
        //this.tickCount++
        let gap = 1

        //산소농도처리
        //if( this.timeWork <= (this.outbreakTime - this.prepareOutbreakTime) ){
        if(!this.isEmergencyO2){
          this.normalO2Random()

          //작업자 건강계산
          if( this.equipPenalty !== 0 ){
            this.calcWorkerHealth(gap)
          }
        }else{
          this.emergencyO2()
          if( this.equipPenalty !== 0 ){
            gap=2.5
            this.calcWorkerHealth(gap)
          }else{
            gap=3
            this.calcWorkerHealth(gap)
          }
        }

        //산소농도 메시지처리
        this.oxygenDensity.state = utilityService.oxygenDensityState(this.oxygenDensityGauge)
        
        //작업자 건강 메시지처리
        this.workerHealth.state = utilityService.workerHealthState(this.workerHealthValue)

      }, tick*1000)    

    },
		normalO2Random() {
			// 19.0 에서 23.5에서 뿌려주자
			//let t = this.NormalDistribution(20.9, 2)
      //let t = this.generateRandom(19.0, 23.5)
      let t = utilityService.generateRandom(19.0, 23.5)
			this.oxygenDensityGauge = t.toFixed(1)
			//console.log('normalO2Random', this.oxygenDensityGauge)
		},
    emergencyO2()
    {
			// 3% 씩 감소
			let t = this.oxygenDensityGauge * 0.97
			this.oxygenDensityGauge = t.toFixed(1)
			//console.log('emergencyO2', this.oxygenDensityGauge)      
    },
		calcWorkerHealth(val) {
      if( (this.workerHealthValue - val) <= 0 ){
        this.workerHealthValue = 0
      }else{
        this.workerHealthValue = Math.floor(this.workerHealthValue - val)
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

          if(this.isPrepareOutbreak)          
            //돌발상황 발생 인지여부
            this.recordWorkerResult('outbreak_recognize', 'Y')
          else
            //작업 중 산소농도 측정여부
            this.recordWorkerResult('work_check', 'Y')

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
        
        //options
        let options = this.setPlayeringOptions('measure')

        if(options != null)
          await this.$refs.pVideoPlayering.playingVideo(options)
        else 
          alert('문제가 발생했습니다. 관리자에게 문의바랍니다.')

        //await this.$refs.pVideoPlayering.playingVideo(this.playeringOptions)

      }else{
        this.$refs.pVideoPlayering.playering.play()
      }
    },
    setPlayeringOptions(type){
        let options = null
        const query = Enumerable.from(this.GE_TDMOTION_LIST).join(
        Enumerable.from(this.GE_WORK_TDMOTION_LIST).where(
        w => w.work_id === this.GE_WORKER.work_id && w.type === type),
          pk=>pk.motion_id,
          fk=>fk.motion_id,
          (left, right) =>({...left, ...right})
        ).orderBy(o=>o.disp_ord).toArray()

        if(query.length === 1){
          options = {
            autoplay: true,
            controls: true,
            fluid: true,// 화면의 따라
            sources: [{
                src: this.getVideoUrl(query[0].video_url),
                type: query[0].video_type
            }],
            poster: this.getImageUrl(query[0].img_url)
          }
        }
        return options
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
    },
    btnStopWork(){
      this.player.pause()
    },
    //돌발대처
    btnCopeOutbreak() {
      console.log('btnCopeOutbreak')
      this.isOutbreak=false
      this.isCopeOutbreak=true
      this.workStep.type='normal'
      this.workStep.step='1'
      this.playVideoPlayer('escape')
    },
    btnCopeImageOutbreak() {
      //this.isOutbreak=false
      this.isCopeOutbreak=true
      this.oxygenOverlay=true

    },
    btnCloseCopeImageOutbreak() {
      this.isCopeOutbreak=false
      this.oxygenOverlay=false
    },
    //작업진행
    btnNomalVideoPlayer() {
      this.workerResult.outbreak_isresponse=true 
      this.isEmergencyO2=false
      this.workerHealthValue=90
      this.outbreakTime = -1
      this.isOutbreak=false
      this.isCopeOutbreak=false
      this.workStep.type='normal'
      this.workStep.step='0'
      this.playVideoPlayer('normal')
    },
    //산소농도건강장애
    btnOxygenDensityHealthObstacle() {
      this.oxygenOverlay=true
      this.oxygenImgIsShow=true
      this.oxygenImgSrc=require('@/assets/img/oxygenDensityHealthObstacle.png')
    },
    btnCloseOxygenDensityHealthObstacle() {
      this.oxygenOverlay=false
      this.oxygenImgIsShow=false    
    },  
    getVideoUrl(val) {
      let videoUrl=val.substring(val.lastIndexOf('/'), val.length)
      videoUrl = this.gitUrl + '/videos' + videoUrl
      //videoUrl = '/videos' + videoUrl
      //console.log('imgUrl', imgUrl)
      return videoUrl
    },

    getImageUrl(val) {
      let imageUrl=val.substring(val.lastIndexOf('/'), val.length)
      imageUrl = this.gitUrl + '/images' + imageUrl
      //imageUrl = '/images' + imageUrl
      //console.log('imgUrl', imgUrl)
      return imageUrl
    },

    validate(val) {
      this.recordWorkerResult('outbreak_cope', val)
      this.nextStep(); 
      //console.log('this.GE_WORKER_EQUIPMENT_LIST : ' + JSON.stringify(this.GE_WORKER_EQUIPMENT_LIST,null,2));

    },

    nextStep() {
      //돌발상황 발생장소로부터 대피여부
      if(this.isOutbreak)
        this.workerResult.outbreak_isEvacuate=true

      //작업시간 준수여부
      this.checkWorkTime()
      
      this.activityWorker(this.GE_WORKER.worker_id, this.getActivityId('작업하기'))
      //this.$router.replace('/work/choiceWork');
      //this.dialog = false
      this.$router.push('/work/reporting')
    },
    checkWorkTime() {
      if(this.timeWork > this.workTotalTime)
        this.recordWorkerResult('work_time', 'N')
      else
        this.recordWorkerResult('work_time', 'Y')
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

      this.timerInterval = setInterval( () => {
        this.timeWork++;
      }, 1000 )
    },    
    //time : end

    setAllPlayerStop(type){
      this.workStep.type=type
      this.workStep.step='last'

      if(type==='outbreak'){
        this.playerOverlay=true
      }else if(type==='normal'){
        this.playerOverlay=false
        this.isOutbreak=false
      }  

      //this.isOutbreak=false
      this.isCopeOutbreak=false      
      //돌발상황 차단
      this.outbreakTime = -1
      this.prepareOutbreakTime = -1      
    },
    setSnackbar(msg) {
        this.snackbar.isSnackbar=true
        this.snackbar.message=msg
        this.snackbar.vertical=true
    },
    recordWorkerResult(item, yn){
      let workType = this.GE_WORK_LIST.filter(f=>f.work_id === this.GE_WORKER.work_id)[0].type      
      //console.log('workType',workType)
      let query = this.GE_RESULT_LIST.filter(f=>(f.name === item && f.type === workType))[0]      
      //console.log('query',JSON.stringify(query, null, 2))
      query.worker_id = this.GE_WORKER.worker_id
      query.is_yn = yn
      
      this.resultPayload.index = query.result_id
      this.resultPayload.result = query
      //console.log('this.resultPayload',JSON.stringify(this.resultPayload, null, 2))
      this.AC_RESULT_EDIT(this.resultPayload)
    },
  },

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
