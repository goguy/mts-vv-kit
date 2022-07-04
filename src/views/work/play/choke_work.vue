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
                        v-for="item in subjectPlayerList"
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
        <v-card v-show="isShowOxygenVideoPlay" 
          class="pa-5 grey lighten-5" >        
          <v-sheet
            class="vjs-wrap">        
            <video-playering ref="measureVideoPlayering"/>
          </v-sheet>        
        </v-card>

        <!-- button area -->
        <v-row>
          <v-col
            align="center"
            justify="space-around"
          >
            <!--buttonTemplate -->
            <template v-if="(workStep.type==='normal'&& workStep.step==='0')">
              <div class="d-inline float-left mt-2">
              </div>
              <div class="d-inline float-right mt-2">
                <v-btn v-if="(playerListCurrentIndex+1) === outbreakPlayerIndex"
                  depressed
                  dark
                  large
                  color="green"                  
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
              <div v-show="!isShowOxygenVideoPlay"
                clsaa="d-inline text-center mt-2">
                <v-btn v-if="isBtnPlayer === false"
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
                <v-btn v-else-if="isBtnPlayer === true"
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
                <v-btn v-if=" (oxygenDensity.state.color==='green' && workerHealth.state.color==='green')"
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
              </div>
              <div clsaa="d-inline text-center mt-2">
                <v-btn v-if="isBtnPlayer === false"
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
                <v-btn v-else-if="isBtnPlayer === true"
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
                <v-btn v-if="isBtnPlayer === false"
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
                <v-btn v-else-if="isBtnPlayer === true"
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
                <v-btn v-if="isBtnPlayer === false"
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
                <v-btn v-else-if="isBtnPlayer === true"
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
                      :value="oxygenDensityGauge"
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
                 
          <!--돌발상황 영역 -->
          <v-sheet v-if="isOutbreak"
           dark
           @click="btnCopeImageOutbreak"
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

const equipmentStore = 'equipmentStore'
const workEquipmentStore = 'workEquipmentStore'
const workerEquipmentStore = 'workerEquipmentStore'

const resultStore = 'resultStore'
const resultItemStore = 'resultItemStore'

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
      isBtnPlayer: false,
      //player상태  
      playerVideoState: '',

      playerNormalCurrentTime: 0,

      normalVideoLength: 0, 

      //hidden: true,
      playerDrawer: null,
      playerVideoMotionType: 'normal',
      //selectedItem: 0,

      //또 다른 영상관련
      isShowOxygenVideoPlay: false,


      //작업시각
      isTimerRunning: false,
      timeWork: 0,
      timerInterval:null,

      //타이머주기
      healthTick: 5,
      oxygenTick: 3,
      //건강타이머
      workerHealthInterval: null,
      //산소타이머 	
      workOxygenInterval: null,


      playerBtnNextHidden: false,
      playerOverlay: false,
      playerOverAbsolute: true,

      //motiion display time
      hasOutbreakPlayTime : 0,
      outbreakPlayTime : 0,
      escapePlayTime : 0,
      measurePlayTime : 0,

      //돌발
      isOutbreak: false,
      isPrepareOutbreak: false,
      outbreakPlayerIndex: 0,
      outbreakTime: 0,
      prepareOutbreakTime: 15,
      
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
          max: 23.5,
          value: 23.5,
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
  
      //작업단계
      workStep: {
        type: 'normal',
        step:'0',
      },
      //작업자선택결과
      resultItemPayload: {
        index: 0,
        resultItem:[]
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
    ...mapGetters(resultStore, [
      'GE_RESULT', 'GE_RESULT_LIST'
    ]),
    ...mapGetters(resultItemStore, [
      'GE_RESULT_ITEM', 'GE_RESULT_ITEM_LIST'
    ]),

    subjectPlayerList() {
      let query= Enumerable.from(this.GE_TDMOTION_LIST).join(
      Enumerable.from(this.GE_WORK_TDMOTION_LIST).where(
      w => (w.work_id === this.GE_WORKER.work_id && w.type === this.playerVideoMotionType)),
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
      return minutes+":"+secondes      
    },
    workTotalTime(){
      let query = this.GE_WORK_LIST.filter(f=>f.work_id === this.GE_WORKER.work_id) 
      //console.log(query,null,2)
      return query[0].time
    },
    //장비패널티수
    equipPenalty(){
      let amount = ( this.queryWorkEquipment('protect').length - this.queryWorkAndWorkerEquipment('protect').length ) + 
                          ( this.queryWorkEquipment('safety').length - this.queryWorkAndWorkerEquipment('safety').length )
      return amount
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
    //-----------------------------------------see all motion player : start 
    checkWatchAllVideo() {
      if(this.queryWorkTdmotion.length === this.workAndworkerTdmotion.length){
        
        return true
      }else{ 
        return false
      }  
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
      let queryWorkerTdmotion = Enumerable.from(this.GE_TDMOTION_LIST).where(w=>w.type === 'normal')              
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
    //-----------------------------------------see all motion player : end 

  },
  watch: {
    timeWork(val) {
      //console.log('workingTime : ' + val)

      if(val ===(this.outbreakTime - this.prepareOutbreakTime)){
        this.isPrepareOutbreak=true
      }
      //돌발상황플레이
      if(val === this.outbreakTime){
        this.setOutbreakVideoPlayer()
      }   
      if(this.checkWatchAllVideo){
        this.setWorkStep('normal', 'last')
      }
    },
    isBtnPlayer(val){
      console.log('isBtnPlayer', val)
      if(this.isOutbreak){
        if(val){
          //this.healthTick = (40/this.workerHealthValue).toFixed(3)
          this.healthTick = ( (this.outbreakPlayTime-this.player.currentTime())/this.workerHealthValue ).toFixed(3)  
          this.startHealthTimer(this.healthTick, 0, 1)
          this.oxygenTick = ( (this.outbreakPlayTime-this.player.currentTime())/this.oxygenDensityGauge ).toFixed(3)  
          this.startOxygenTimer(this.oxygenTick, val, 1)
        }  
        if(!val){
          this.stopHealthTimer()
          this.stopOxygenTimer()
        }
      }
    },
    
    //초기화
    isOutbreak(val) {
      if(val){
        this.isShowOxygenVideoPlay=false
        if(this.isBtnPlayer){
          this.healthTick = (this.outbreakPlayTime/this.workerHealthValue).toFixed(3) 
          this.startHealthTimer(this.healthTick, 0, 1)
          this.oxygenTick = (this.outbreakPlayTime/this.oxygenDensityGauge).toFixed(3) 
          this.startOxygenTimer(this.oxygenTick, val, 1)          
        }
      }
    },
    isPrepareOutbreak(val) {
      if(val){
        this.getPrepareOutbreakAudio()
      }
    },
    /*
    isCopeOutbreak(val) {
      if(val){
        //건강타이머
        this.startHealthTimer(5, 0, 1)
        //산소타이머
        this.startOxygenTimer(3, true, 1)
      }
    },
    */
    workerHealthValue(val)  {
      if(val === 0)
        this.setWorkStep('outbreak','last')
    },
    oxygenDensityGauge(val) {
      if(val === 0)
        this.setWorkStep('outbreak','last')
    },        
  }, 
  created() {
    this.normalVideoLength = this.videoListQuery('normal')
  }, 
  mounted() {

    if(this.response){ 
      this.onPlayer()
    }

    //작업시각타이머
    this.startTimer()

    //건강타이머
    this.startHealthTimer(this.healthTick, this.equipPenalty, 1)
    //산소타이머
    this.startOxygenTimer(this.oxygenTick, this.isOutbreak, 1)

    // 돌발관련 모션 번호  
    this.outbreakPlayerIndex = this.getOutbreakTimeMotionIndex()
    console.log('this.outbreakPlayerIndex', this.outbreakPlayerIndex)
    
    //playtime
    this.outbreakPlayTime = this.getMotionPlayTime('outbreak')
    this.escapePlayTime = this.getMotionPlayTime('escape')  
    this.measurePlayTime = this.getMotionPlayTime('measure')  

    console.log('outbreakPlayTime', this.outbreakPlayTime)
    console.log('hasOutbreakPlayTime', this.hasOutbreakPlayTime)
    //test
    //this.initQuery()      
  },
  beforeDestroy() {
      if (this.player) {
          this.player.dispose()
      }
      
      clearInterval(this.workOxygenInterval)
      clearInterval(this.workerHealthInterval)
      clearInterval(this.timerInterval)      
  },    
  methods: {
    ...mapActions(resultStore, [
      'AC_RESULT_EDIT'
    ]),
    ...mapActions(resultItemStore, [
      'AC_RESULT_ITEM_EDIT'
    ]),

    /*
    */
    initQuery(){
    },

    async onPlayer(player){
      this.player = player
      this.response = await this.player.playlist(this.videoList)
      //this.response = await this.player.playlist.autoadvance(0)

      this.playerListLastIndex = this.player.playlist.lastIndex()
    }, 
    onPlayerState(event){
        switch(event.type){
            case 'play':
                console.log('player : ' + event.type)
                this.playerBtnNextHidden = false
                this.isBtnPlayer = true
                this.playerVideoState=event.type
                break;    
            case 'pause':
                console.log('player : ' + event.type)
                this.isBtnPlayer = false
                this.playerVideoState=event.type
                break;    
            case 'ended':
                console.log('player : ' + event.type)
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
                this.setOutbreakTimeIndex(this.player.playlist.currentItem())

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
        
        this.setHistoryActivityWorker(event.type)
    },

    setHistoryActivityWorker(val)
    {
        setTimeout(() => (
          this.historyActivityWorker(this.getActivityId('작업하기'), this.GE_WORKER.worker_id, 'TDMOTION', 
                                  this.videoList[this.playerListCurrentIndex].sources[0].motion_id, val, this.playerListCurrentIndex)          
        ), 500)          
    },

    btnPlayWork(){
      this.player.play()
    },
    btnStopWork(){
      this.player.pause()
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

    videoListQuery(type){            
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
        //console.log('videoListQuery query: ' + JSON.stringify(query, null, 2))

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


    validate(val) {
      let isCheck = this.checkTypeResult()        
      if(isCheck){
        this.recordWorkerResultItem('outbreak_cope', val)
        this.nextStep()
      }else{
        alert('돌발상황 발생 대처여부 업데이트 실패')      
      }

      //console.log('this.GE_WORKER_EQUIPMENT_LIST : ' + JSON.stringify(this.GE_WORKER_EQUIPMENT_LIST,null,2));
      console.log('val', val)
    },
    nextStep() {
      //작업시간 준수여부
      this.checkWorkTime()

      this.activityWorker(this.GE_WORKER.worker_id, this.getActivityId('작업하기'))
      //this.$router.replace('/work/choiceWork');
      this.dialog = false
      this.$router.push('/work/reporting')
    },

    checkWorkTime() {
      let isCheck = this.checkTypeResult()        
      if(this.timeWork > this.workTotalTime){
        if(isCheck){
          this.recordWorkerResultItem('work_time', 'N')
        }else{
          alert('작업시간 준수여부 업데이트 실패')      
        }
      }else{
        if(isCheck){
          this.recordWorkerResultItem('work_time', 'Y')
        }else{
          alert('작업시간 준수여부 업데이트 실패')      
        }
      }        
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
    //-------------------------------- 돌발: start
    getOutbreakTimeMotionIndex() {
      let query = Enumerable.from(this.GE_WORK_LIST).where(w=>w.work_id === this.GE_WORKER.work_id)
                            .join(Enumerable.from(this.GE_WORK_TDMOTION_LIST),
                              pk=>pk.work_id,
                              fk=>fk.work_id,
                              (left, right)=>({...left, ...right}))  
                            .join(Enumerable.from(this.GE_TDMOTION_LIST)
                                            .where(w=>( w.is_outbreak === 'Y' && w.type === 'normal' )),
                              pk=>pk.motion_id,
                              fk=>fk.motion_id,
                              (left, right)=>({...left, ...right}))
                            .toArray()
      
      //console.log('query', JSON.stringify(query, null, 2))
      //console.log('getOutbreakTimeMotionIndex')

      if(query.length > 0){
        this.hasOutbreakPlayTime = query[0].play_time        
        return query[0].disp_ord
      }
      else
        return 0     
    },
        
    setOutbreakTimeIndex(val) {
      if(!this.isOutbreak){
        console.log('val', val)
        console.log('this.outbreakPlayerIndex', this.outbreakPlayerIndex)
        if(this.outbreakPlayerIndex === (val+1)){
          //174는 해당 플레이시간 모션테이블에 play_time 컬럼
          //let outbreakTime = this.hasOutbreakPlayTime
          let outbreakTime = 60
          console.log('timeWork',this.timeWork)
          console.log('outbreakTime',outbreakTime)
          if(this.outbreakTime !== -1){
             this.setOutbreakTime(outbreakTime)
             this.outbreakTime += this.timeWork
          }          
          console.log('this.outbreakTime',this.outbreakTime)
        }
      }  
    },

    setOutbreakTime(val){      
      let mean = val * 0.6
      let stddev = val * 0.1
        
      this.outbreakTime = utilityService.NormalDistribution(mean, stddev)
      this.outbreakTime = Math.round(this.outbreakTime, 0)
      console.log('this.outbreakTime : ' + this.outbreakTime)
    },
    setOutbreakVideoPlayer(){

        this.isPrepareOutbreak=false        
        //플레이시간 가져오기
        this.playerNormalCurrentTime = this.player.currentTime()
        console.log('playerNormalCurrentTime', this.playerNormalCurrentTime)

        this.isOutbreak=true
        this.setWorkStep('outbreak', '1')
        this.playVideoPlayer('outbreak')
        
        //기존 timer제거
        this.stopHealthTimer()
        this.stopOxygenTimer()

        //this.healthTick = (40/this.workerHealthValue).toFixed(3) 
        //this.startHealthTimer(this.healthTick, 0, 1)

    },
    getPrepareOutbreakAudio() {
        //let audio = new Audio('http://soundbible.com/mp3/Air Plane Ding-SoundBible.com-496729130.mp3')
        //https://mjmjmj98.tistory.com/31
        let audio = new Audio('/audios/beep1.mp3')
        audio.loop = true
        audio.volume = 0.2
        audio.play()
        setTimeout(() => (
          audio.pause()
        ), 3000)          
    },
    btnCopeImageOutbreak() {
      //this.isOutbreak=false
      //this.isCopeOutbreak=true
      this.oxygenOverlay=true

    },
    btnCloseCopeImageOutbreak() {
      //this.isCopeOutbreak=false
      this.oxygenOverlay=false
    },
    //-------------------------------- 돌발: end
    //-------------------------------- 작업단계별 버튼: start
    setWorkStep(type, step){
        this.workStep.type=type
        this.workStep.step=step
    },
    btnOxygenDensity() {
      if(this.checkOxygenEquip() === 0 ){

        this.setSnackbar('산소농도를 측정하는 장비가 없습니다.')
        //alert('산소농도를 측정하는 장비가 없습니다.')  
        return 
      }else{
        if(!this.isShowOxygenVideoPlay){
          this.isShowOxygenVideoPlay=true
          
          if(this.isBtnPlayer){
            this.player.pause()
            setTimeout(() => (
              this.isBtnPlayer=true
            ), 500)          
          }
          
          //산소농도측정play
          this.playOxygenVideoPlayer()
          //plus 10점
          this.plusWorkerHealthValue(10)

          let isCheck = this.checkTypeResult()        
          if(this.isPrepareOutbreak)          
            if(isCheck){
              //돌발상황 발생 인지여부
              this.recordWorkerResultItem('outbreak_recognize', 'Y')            
            }else{
              alert('돌발상황 발생 인지여부 업데이트 실패')      
            }
          else
            if(isCheck){
              //작업 중 산소농도 측정여부
              this.recordWorkerResultItem('work_check', 'Y')
            }else{
              alert('작업 중 산소농도 측정여부 업데이트 실패')      
            }

        }else if(this.isShowOxygenVideoPlay){
          this.isShowOxygenVideoPlay=false
          
          if(this.isBtnPlayer){
            this.player.play()
          }          
        }
      }
    },
    plusWorkerHealthValue(val) {      
      if( this.workerHealthValue+val > 100 ){
        this.workerHealthValue = 100
      }else{
        this.workerHealthValue += val
      }      
    },

    //자력탈출
    btnCopeOutbreak() {
      console.log('btnCopeOutbreak')
      //타이머제거
      this.stopHealthTimer()
      this.stopOxygenTimer()  
      //건강타이머
      this.startHealthTimer(5, 0, 1)
      //산소타이머
      this.startOxygenTimer(3, true, 1)


      this.isOutbreak=false
      this.outbreakTime = -1
      this.isCopeOutbreak=true
      this.setWorkStep('normal', '1')
      //수정예정 cope로
      this.playVideoPlayer('escape')
    },
    //작업진행
    btnNomalVideoPlayer() {

      //타이머제거
      this.stopHealthTimer()
      this.stopOxygenTimer()  

      //건강타이머
      this.startHealthTimer(5, 0, 1)
      //산소타이머
      this.startOxygenTimer(3, this.isOutbreak, 1)


      //this.isOutbreak=false
      this.isCopeOutbreak=false
      this.setWorkStep('normal', '0')
      this.playVideoPlayer('normal')
    },
    
    //-------------------------------- 작업단계별 버튼: end
    //-------------------------------- 또 다른 모션 플레이: start
    async playOxygenVideoPlayer() {
      if(this.$refs.measureVideoPlayering.playering === null){
        
        //options
        let options = this.setMeasurePlayeringOptions('measure')

        if(options != null)
          await this.$refs.measureVideoPlayering.playingVideo(options)
        else 
          alert('문제가 발생했습니다. 관리자에게 문의바랍니다.')

      }else{
        this.$refs.measureVideoPlayering.playering.play()
      }
    },
    checkOxygenEquip(){
      let query = this.queryWorkAndWorkerEquipment('safety').filter(f=>f.name === '산소농도측정기')
      console.log('query.length', query.length)
      return query.length
    },  
    setMeasurePlayeringOptions(type){
        let options = null
        const query = Enumerable.from(this.GE_TDMOTION_LIST)
                                .where(w=>w.type === type)
                      .join(Enumerable.from(this.GE_WORK_TDMOTION_LIST)
                                      .where(w => w.work_id === this.GE_WORKER.work_id),
                      pk=>pk.motion_id,
                      fk=>fk.motion_id,
                      (left, right) =>({...left, ...right}))
                      .orderBy(o=>o.disp_ord)
                      .toArray()
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

    async playVideoPlayer(type){
      //제목리스트
      this.playerVideoMotionType = type
      this.videoListQuery(type)
      //console.log('this.videoList-playVideoPlayer', JSON.stringify(this.videoList,null,2))
      if(this.videoList.length > 0){
        this.response = await this.player.playlist(this.videoList)
        
        //console.log('response', this.response)        
        //this.player.playlist.first()
        if(type === 'normal'){
          this.player.playlist.currentItem(this.outbreakPlayerIndex-1)
          //this.player.play(30)
          this.player.currentTime(this.playerNormalCurrentTime)
          this.player.play()
        
        }else{
          this.player.playlist.first()
        }
      }
    },

    //-------------------------------- 또 다른 모션 플레이: end
    //-------------------------------- Interval : start    
    //time : start
    startTimer() {
      this.isTimerRunning = true

      this.timerInterval = setInterval( () => {
        this.timeWork++;
      }, 1000 )
    },    

    startHealthTimer(tick, penalty, gap){
      if( this.equipPenalty !== 0 ){
        this.workerHealthValue -= penalty
      }
      
      this.workerHealthInterval = setInterval(() => {
        //this.tickCount++
        //let gap = 1
        this.calcWorkerHealth(gap)        
        //작업자 건강 메시지처리
        this.workerHealth.state = utilityService.workerHealthState(this.workerHealthValue)
      }, tick*1000)
    },
		calcWorkerHealth(val) {
      if( (this.workerHealthValue - val) <= 0 ){
        this.workerHealthValue = 0
      }else if(this.workerHealthValue > 100){
        this.workerHealthValue = 100
      }else{        
        //this.workerHealthValue = Math.floor(this.workerHealthValue - val)
        this.workerHealthValue = this.workerHealthValue - val
      }
		},
    stopHealthTimer() {
      clearInterval(this.workerHealthInterval)
      this.workerHealthInterval = null
    },
    startOxygenTimer(tick, judge, gap) {
      this.workOxygenInterval = setInterval(() => {
        this.calcWorkOxygen(judge, gap)

        //산소농도 메시지처리
        this.oxygenDensity.state = utilityService.oxygenDensityState(this.oxygenDensityGauge)
      }, tick*1000)
    },
    
    calcWorkOxygen(judge, gap) {
      if(judge)
        this.outbreakWorkOxygen(gap)
      else
        this.normalWorkOxygen()
    },
    normalWorkOxygen() {
      let val = utilityService.generateRandom(19.0, 23.5)
			this.oxygenDensityGauge = val.toFixed(1)
    },
    outbreakWorkOxygen(gap) {
      // 3% 씩 감소 - 0.97
			//let val = this.oxygenDensityGauge * gap
			//this.oxygenDensityGauge = val.toFixed(1)
      if( (this.oxygenDensityGauge - gap) < 1 ){
        this.oxygenDensityGauge = 0
      }else{        
        //this.oxygenDensityGauge = Math.floor(this.oxygenDensityGauge - val)
        let val = this.oxygenDensityGauge - gap
        this.oxygenDensityGauge = val.toFixed(1)
      }
      
    },
    stopOxygenTimer() {
      clearInterval(this.workOxygenInterval )
      this.workOxygenInterval = null
    },
    //-------------------------------- Interval : end
    //-------------------------------- motion_play_time : start
    getMotionPlayTime(val) {
        let query = Enumerable.from(this.GE_TDMOTION_LIST)
                                .where(w=>w.type === val)
                      .join(Enumerable.from(this.GE_WORK_TDMOTION_LIST)
                                      .where(w => w.work_id === this.GE_WORKER.work_id),
                      pk=>pk.motion_id,
                      fk=>fk.motion_id,
                      (left, right) =>({...left, ...right}))
                      .orderBy(o=>o.disp_ord)
                      .first()
        //console.log('query',JSON.stringify(query, null, 2))
        if(query.play_time !== undefined)
          return query.play_time
        else
          return 0                     
    },
    //-------------------------------- motion_play_time : end
    //-------------------------------- 산소농도 : start
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
    //-------------------------------- 산소농도 : end
    //-------------------------------- 결과등록 : start
    checkTypeResult() {
      let workType = this.GE_WORK_LIST.filter(f=>f.work_id === this.GE_WORKER.work_id)[0].type 
      let query = this.GE_RESULT_LIST.filter(f=>f.type === workType)

      if(query.length > 0)
        return true
      else
        return false
    },    
    recordWorkerResultItem(item, yn){
      let workType = this.GE_WORK_LIST.filter(f=>f.work_id === this.GE_WORKER.work_id)[0].type      
      //console.log('workType',workType)
      //let query = this.GE_RESULT_LIST.filter(f=>(f.name === item && f.type === workType))[0]      
      let query = this.GE_RESULT_LIST.filter(f=>f.type === workType)[0]      
      query = this.GE_RESULT_ITEM_LIST.filter(f=>(f.result_id===query.result_id &&f.name===item))[0]
      //console.log('query',JSON.stringify(query, null, 2))
      query.worker_id = this.GE_WORKER.worker_id
      query.is_yn = yn
      
      this.resultItemPayload.index = query.result_item_id
      this.resultItemPayload.resultItem = query
      //console.log('this.resultPayload',JSON.stringify(this.resultPayload, null, 2))
      this.AC_RESULT_ITEM_EDIT(this.resultItemPayload)
    //-------------------------------- 결과등록 : end
    },



    setSnackbar(msg) {
        this.snackbar.isSnackbar=true
        this.snackbar.message=msg
        this.snackbar.vertical=true
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
