<template>
  <v-container
    id="do-work"
    tag="section"
  >
    <v-row
      align="center"
      justify="space-around"    
    >
      <v-col 
        cols="12"
        xl="10"
      >
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

                <!--
                <v-divider/>

                <v-subheader class="text-subtitle-1">현재산소농도</v-subheader>
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

                <v-divider/>

                <v-subheader class="text-subtitle-1">작업시간</v-subheader>
                <div class="pa-2">

                  <v-progress-linear
                    v-model="plValue"                    
                    dark
                    height="25"
                    color="green"
                    striped
                  >
                    <strong>{{ Math.ceil(plValue) }}%</strong>
                  </v-progress-linear>
                </div>
                <v-divider/>

                <v-subheader class="text-subtitle-1">작업복 착용상태</v-subheader>
                <div class="pa-2">

                  <v-progress-linear
                    v-model="plSmock"                    
                    dark
                    height="25"
                    color="green"
                    striped
                  >
                    <strong>{{ Math.ceil(plSmock) }}%</strong>
                  </v-progress-linear>
                </div>
                -->


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
            </v-overlay>
          </v-fab-transition>

        </v-card>

      </v-col>
    </v-row>


    <v-row
      align="center"
      justify="space-around"
    >
        <v-btn 
          depressed
          dark
          large
          color="primary"
          elevation="1"
          @click="validate"
        >
          작업보고서
        </v-btn>
    </v-row>

    <dialog-equip-confirm-work 
     ref="DECW"
      :dialog.sync="dialog"
      :optionsDialog="popupOptions"
      @dialogInfo="userInfo" 
    />


  </v-container>
  

</template>

<script>
import { mapGetters } from 'vuex'
import Enumerable  from 'linq'
import VideoPlayerList from '@/components/videojs/VideoPlayerList.vue'
import 'video.js/dist/video-js.css'

import { activityMixin } from '@/mixins/activityMixin.js'
import { tdMotionMixin } from '@/mixins/tdMotionMixin.js'


import DialogEquipConfirmWork from '@/views/work/rate/DialogEquipConfirmWork.vue'

const workStore = 'workStore'
const workerStore = 'workerStore'
const tdmotionStore = 'tdmotionStore'
const workTdmotionStore = 'workTdmotionStore'
const workerTdmotionStore = 'workerTdmotionStore'

const equipmentStore = 'equipmentStore'
const workEquipmentStore = 'workEquipmentStore'
const workerEquipmentStore = 'workerEquipmentStore'

//Commmon Activity
const activityStore = 'activityStore'
const workerActivityStore = 'workerActivityStore'
const workerActivityHistoryStore = 'workerActivityHistoryStore'

  export default {
    name: 'do-work',
    components: {
      VideoPlayerList,
      DialogEquipConfirmWork
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
      overlay: true,
      overAbsolute: true,
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
    
    watchedPlay() {
      /*
      let query=  Enumerable.from(this.GE_TDMOTION_LIST)
                            .where(w=>w.type === 'normal')
                            .join(this.GE_WORKER_TDMOTION_LIST.filter(f=>f.worker_id === this.GE_WORKER.worker_id),
                              pk=>pk.motion_id,
                              fk=>fk.motion_id,
                              (left, right) =>({...left, ...right})
                            ).toArray() 
              
      query= Enumerable.from(this.GE_TDMOTION_LIST).join(
        Enumerable.from(this.GE_WORK_TDMOTION_LIST).where(
        w => (w.work_id === this.GE_WORKER.work_id && w.type === 'normal')),
          pk=>pk.motion_id,
          fk=>fk.motion_id,
          (left, right) =>({...left, ...right})
        ).orderBy(o=>o.disp_ord).take(query.length+1).toArray()
      */      
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
    nextHidden() {
      if(this.playerListCurrentIndex === this.playerListLastIndex)
        return true
      return false
    },
    previousHidden() {
      if(this.playerListCurrentIndex === 0)
        return true
      return false
    },    
  },
  watch: {}, 
  created() {
    //this.nomalWorkVideo();
    //this.outbreakWorkVideo();
    // normal, outbreak
    this.videoListQuery('normal')
  }, 
  mounted() {
    //console.log('this.playerListCurrentIndex : ' + this.playerListCurrentIndex)
    //console.log('this.player.playlist.lastIndex() : ' + this.player.playlist.lastIndex())

    if(this.response){ 
      this.onPlayer()
      //motion-list
      this.selectedItem = this.player.playlist.currentItem()
    }

    //this.initQuery()
    //this.initButton()

    this.progressCircular()
    this.progressLinear( (100/this.getWorkTime()).toFixed(2) )
  },
  beforeDestroy() {
      if (this.player) {
          this.player.dispose()
      }
      clearInterval(this.pcInterval)
      clearInterval(this.plInterval)
  },    
  methods: {
    /*
    ...mapActions(workerActivityHistoryStore, [
      'AC_WORKER_ACTIVITY_HISTORY_PUSH'
    ]),
    ...mapActions(workerActivityStore, [
      'AC_WORKER_ACTIVITY_LIST'
    ]),
    ...mapActions(workerTdmotionStore, [
      'AC_WORKER_TDMOTION_LIST'
    ]),
    */
    initQuery(){
      //workEquipment

      /*
      let queryWorkTdmotion = Enumerable.from(this.GE_WORK_LIST).where(w=>w.work_id === this.GE_WORKER.work_id)
                                          .join(Enumerable.from(this.GE_WORK_TDMOTION_LIST).where(w=>w.work_id === this.GE_WORKER.work_id),
                                            pk=>pk.work_id,
                                            fk=>fk.work_id,
                                            (left, right) =>({...left, ...right}))
                                          .join(Enumerable.from(this.GE_TDMOTION_LIST).where(w=>w.disaster_id === 90),
                                            pk=>pk.motion_id,
                                            fk=>fk.motion_id,
                                            (left, right) =>({...left, ...right}))
                                          .toArray()
      
      let queryWorkAndWorkerTdmotion = Enumerable.from(queryWorkTdmotion)
                                                  .join(Enumerable.from(this.GE_WORKER_TDMOTION_LIST)
                                                                  .where(w=>w.worker_id === this.GE_WORKER.worker_id),
                                                    pk=>pk.motion_id,
                                                    fk=>fk.motion_id,
                                                    (left, right) =>({...left, ...right}))
                                                  .toArray()

      console.log('queryWorkTdmotion init: ' + JSON.stringify(queryWorkTdmotion,null,2))
      console.log('queryWorkAndWorkerTdmotion init' + JSON.stringify(queryWorkAndWorkerTdmotion,null,2))
      */

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
                /*
                if(!this.isCheckTdmotionWork()){
                  //this.checkMoveRouterPush('play')
                  this.checkEquipOpenDialog('play')
                }
                */
                this.btnNextHidden = false
                console.log('player : ' + event.type)
                break;    
            case 'pause':
                console.log('player : ' + event.type)
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
      /*
      if(this.isCheckTdmotionWork()){
        console.log('nextPlayer');
        this.player.playlist.next()
      }
            
      if(this.checkWorkPlayer()){

        this.player.playlist.next()
        //this.hidden = !this.hidden
      }else{
        console.log('개발중')  
      }
      */
    },

    initButton() {
      if(this.playerListCurrentIndex === 0)
        this.previousHidden = true
      else
        this.previousHidden = false
    },
    /*
    onDivPlayerMouseEnter(evt){
      //console.log('divPlayer MouseEnter!', evt)
      this.hidden = !this.hidden
      evt
    },
    onDivPlayerMouseLeave(evt){
      //console.log('divPlayer MouseLeave!', evt)
      this.hidden = !this.hidden
      evt
    },
    onDivPlayerClick(evt){
      //console.log('divPlayer click!', evt)
      //this.hidden = !this.hidden
      evt
    },
    */

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
    progressCircular(){
      this.pcInterval = setInterval(() => {
        if (this.pcValue === 0) {
          return (this.pcValue = 100)
        }
        this.pcValue -= 1
      }, 1000) 
    },
    progressLinear(val){
      this.plInterval = setInterval(() => {
        if (this.plValue === 100) {
          return (this.plValue = 0)
        }
        this.plValue += (val)
        this.plNumber += 1
      }, 1000) 
    },

    isCheckTdmotionWork() {
      console.log('checkTdmotionWork')
      if(this.checkWorkAndWorkerTdmotion()>0)
        if(this.checkWorkAndWorkerCommonTdmotion()>0 || this.checkWorkAndWorkerDisasterTdmotion()>0)
          return false
        else
          return true        
      else
        return true
      
    },
    checkEquipOpenDialog(type){
      if(type === 'play')
        this.player.pause()
      
      let motionId = this.videoList[this.playerListCurrentIndex].sources[0].motion_id
      this.popupOptions.motionId = motionId
      console.log('motionId checkEquipOpenDialog: ' + motionId)
      console.log('this.popupOptions.motionId: ' + this.popupOptions.motionId)
      
      this.$refs.DECW.makeVideoList()
      this.dialog = true
    },
    getMotionId() {
      return this.videoList[this.playerListCurrentIndex].sources[0].motion_id 
    },
    checkMoveRouterPush(type) {
      if(type === 'play')
        this.player.pause()

      console.log('this.playerListCurrentIndex : ' + this.playerListCurrentIndex)
      let motionId = this.videoList[this.playerListCurrentIndex].sources[0].motion_id
      console.log('motionId : ' + motionId)
      alert('장비도우미 영상으로 이동합니다.')
      this.$router.push('/work/rate/doCheckTdmotionWork?motionId='+motionId)
    },
    currentMotionid(num) {
      return this.videoList[num].sources[0].motion_id
    },
    checkWorkAndWorkerDisasterTdmotion() {
      let queryWorkTdmotion = Enumerable.from(this.GE_WORK_LIST).where(w=>w.work_id === this.GE_WORKER.work_id)
                                          .join(Enumerable.from(this.GE_WORK_TDMOTION_LIST).where(w=>(w.work_id === this.GE_WORKER.work_id && w.type==='equipment')),
                                            pk=>pk.work_id,
                                            fk=>fk.work_id,
                                            (left, right) =>({...left, ...right}))
                                          .join(Enumerable.from(this.GE_TDMOTION_LIST).where(w=>w.disaster_id === (this.GE_TDMOTION_LIST.filter(f=>f.motion_id === this.currentMotionid(this.playerListCurrentIndex)))[0].disaster_id),
                                            pk=>pk.motion_id,
                                            fk=>fk.motion_id,
                                            (left, right) =>({...left, ...right}))
                                          .toArray()
      
      let queryWorkAndWorkerTdmotion = Enumerable.from(queryWorkTdmotion)
                                                  .join(Enumerable.from(this.GE_WORKER_TDMOTION_LIST)
                                                                  .where(w=>w.worker_id === this.GE_WORKER.worker_id),
                                                    pk=>pk.motion_id,
                                                    fk=>fk.motion_id,
                                                    (left, right) =>({...left, ...right}))
                                                  .toArray()

      //console.log('queryWorkAndWorkerTdmotion 2 ' + JSON.stringify(queryWorkAndWorkerTdmotion,null,2))                                            
      console.log('queryWorkDisasterTdmotion.length ' + queryWorkTdmotion.length)                                            
      console.log('queryWorkAndWorkerDisasterTdmotion.length ' + queryWorkAndWorkerTdmotion.length)                                            
      return (queryWorkTdmotion.length - queryWorkAndWorkerTdmotion.length)                                                 
    },
    checkWorkAndWorkerCommonTdmotion() {
      let queryWorkTdmotion = Enumerable.from(this.GE_WORK_LIST).where(w=>w.work_id === this.GE_WORKER.work_id)
                                          .join(Enumerable.from(this.GE_WORK_TDMOTION_LIST).where(w=>w.work_id === this.GE_WORKER.work_id),
                                            pk=>pk.work_id,
                                            fk=>fk.work_id,
                                            (left, right) =>({...left, ...right}))
                                          .join(Enumerable.from(this.GE_TDMOTION_LIST).where(w=>(w.disaster_id === 90 && w.type==='equipment')),
                                            pk=>pk.motion_id,
                                            fk=>fk.motion_id,
                                            (left, right) =>({...left, ...right}))
                                          .toArray()
      
      let queryWorkAndWorkerTdmotion = Enumerable.from(queryWorkTdmotion)
                                                  .join(Enumerable.from(this.GE_WORKER_TDMOTION_LIST)
                                                                  .where(w=>w.worker_id === this.GE_WORKER.worker_id),
                                                    pk=>pk.motion_id,
                                                    fk=>fk.motion_id,
                                                    (left, right) =>({...left, ...right}))
                                                  .toArray()
      console.log('queryWorkCommonTdmotion.length ' + queryWorkTdmotion.length) 
      console.log('queryWorkAndWorkerCommonTdmotion.length ' + queryWorkAndWorkerTdmotion.length) 
      //console.log('queryWorkAndWorkerEquipment 1 ' + JSON.stringify(queryWorkAndWorkerEquipment,null,2)) 
      return (queryWorkTdmotion.length - queryWorkAndWorkerTdmotion.length)                                          
    },
    checkWorkAndWorkerTdmotion() {
      //workTdmotion
      let queryWorkTdmotion = this.GE_WORK_TDMOTION_LIST.filter(f=>(f.work_id === this.GE_WORKER.work_id && f.type === 'equipment'))

      //workerTdmotion
      let queryWorkerTdmotion = Enumerable.from(queryWorkTdmotion)
                                          .join(this.GE_WORKER_TDMOTION_LIST.filter(f=>(f.worker_id === this.GE_WORKER.worker_id)),
                                            pk=>pk.motion_id,
                                            fk=>fk.motion_id,
                                            (left, right)=>({...left, ...right}))
                                          .toArray()  

      console.log('queryWorkTdmotion.length ' + queryWorkTdmotion.length) 
      console.log('queryWorkerTdmotion.length ' + queryWorkerTdmotion.length) 
      return (queryWorkTdmotion.length - queryWorkerTdmotion.length)
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
