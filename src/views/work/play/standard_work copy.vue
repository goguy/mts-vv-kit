<template>
  <v-container
    id="normal_work"
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
                        v-for="item in normalPlayList"
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
        <!-- button area -->
        <v-row>
          <v-col
            align="center"
            justify="space-around"
          >
            <!--buttonArea -->
            <template>
              <div class="d-inline float-left mt-2">
              </div>
              <div class="d-inline float-right mt-2">
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
        </v-sheet>

      </v-col>
    </v-row>

  </v-container>
  
</template>

<script>
import { mapGetters } from 'vuex'
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

const equipmentStore = 'equipmentStore'
const workEquipmentStore = 'workEquipmentStore'
const workerEquipmentStore = 'workerEquipmentStore'

  export default {
    name: 'normal_work',
    components: {
      VideoPlayerList,
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
      isNormalPlayer: null,
      normalVideoLength: 0, 

      //hidden: true,
      playerDrawer: null,
      //selectedItem: 0,

      //작업시각
      isTimerRunning: false,
      timeWork:0,
      timerInterval:null,

      playerBtnNextHidden: false,
      //sheet: false,
      playerOverlay: false,
      playerOverAbsolute: true,
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
    normalPlayList() {
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
      return minutes+":"+secondes      
    },
    workTotalTime(){
      let query = this.GE_WORK_LIST.filter(f=>f.work_id === this.GE_WORKER.work_id) 
      //console.log(query,null,2)
      return query[0].time
    },

  },
  watch: {}, 
  created() {
    this.normalVideoLength = this.videoListQuery('normal')
  }, 
  mounted() {

    if(this.response){ 
      this.onPlayer()
      //motion-list
      //this.selectedItem = this.player.playlist.currentItem()
    }

    //작업시각타이머
    this.startTimer()
    
    //test
    //this.initQuery()

  },
  beforeDestroy() {
      if (this.player) {
          this.player.dispose()
      }
      clearInterval(this.timerInterval)      
  },    
  methods: {
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
                this.isNormalPlayer = true
                break;    
            case 'pause':
                console.log('player : ' + event.type)
                this.isNormalPlayer = false
                break;    
            case 'ended':
                console.log('player : ' + event.type)
                if(this.videoList)
                  this.tdmotionWorker(this.GE_WORKER.worker_id, this.videoList[this.playerListCurrentIndex].sources[0].motion_id)                
                
                if(this.videoList.length - this.playerListCurrentIndex > 1)
                  this.playerBtnNextHidden = true 
                
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
      //this.selectedItem = this.player.playlist.currentItem()

      //this.hidden = !this.hidden 
    },
    
    nextPlayer() {
      this.player.playlist.next()      
      //this.selectedItem = this.player.playlist.currentItem()
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
            src : item.video_url,
            type: item.video_type 
          }]})
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

    //time : start
    startTimer() {
      this.isTimerRunning = true

      this.timerInterval = setInterval( () => {
        this.timeWork++;
      }, 1000 )
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
