<template>
  <v-container
    id="do-check-tdmotion-work"
    tag="section"
  >
  
    <v-row
      align="center"
      justify="space-around"    
    >
      <v-col cols="12">
        <v-card-text class="px-0 pb-0">
          <v-sheet
            class="vjs-wrap"
            @mouseenter="onDivPlayerMouseEnter($event)"
            @mouseleave="onDivPlayerMouseLeave($event)"
            @click="onDivPlayerClick($event)">

            <video-player-list :options="videoOptions"
                               :playerList="videoList"
                               @player="onPlayer"
                               @playerState="onPlayerState" />

          <!--
            <v-fab-transition>
                <v-btn
                    v-model="previousHidden"
                    v-show="!hidden && !previousHidden"              
                    depressed
                    fab
                    color="pink"
                    dark
                    small
                    absolute
                    left
                    @click="previousPlayer"
                    class="vjs-previous-button"
                >
                    <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
            </v-fab-transition>

            <v-fab-transition>
                <v-btn
                  v-model="nextHidden"
                  v-show="!hidden && !nextHidden"
                  depressed  
                  fab
                  color="pink"
                  dark
                  small
                  absolute
                  right
                  @click="nextPlayer"
                  class="vjs-next-button"
                >
                <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
            </v-fab-transition>

            <v-sheet
              v-show="!hidden"
              color="teal"
              elevation="1"
              height="50"
              dark
              class="vjs-v-sheet"
            >
              <div>
                <p class="display-1 text-center">
                  {{playerTitle}}
                </p>  
              </div>
            </v-sheet>        
          -->

            <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-width="200"
                offset-x
            >
                <template v-slot:activator="{ on, attrs }">
                <v-fab-transition>

                <v-btn
                    v-show="!hidden"
                    depressed
                    fab
                    small
                    tile
                    color="indigo"
                    dark
                    absolute
                    left
                    v-bind="attrs"
                    v-on="on"
                    class="vjs-menu-button"
                >
                    <v-icon>mdi-menu-right</v-icon>
                </v-btn>
                </v-fab-transition>
                </template>

                <v-card>
                <v-list
                    nav
                    dense
                    rounded
                    hoverable
                    activatable                      
                >
                    <v-list-item
                      v-for="(item, index) in videoTitleList"
                      :key="item.name"
                      link
                      @click="vjsPlayerListLink(index)"
                    >
                    <v-list-item-content>
                        <v-list-item-title>{{item.name}}</v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-action>
                        <v-btn icon>
                        <v-icon color="grey lighten-1">mdi-information</v-icon>
                        </v-btn>
                    </v-list-item-action>
                    </v-list-item>

                </v-list>

                <v-divider></v-divider>


                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                    color="primary"
                    text
                    @click="menu = false"
                    >
                    close
                    </v-btn>
                </v-card-actions>
                </v-card>
            </v-menu>
          </v-sheet>
        </v-card-text>
      </v-col>
    </v-row>
    

  </v-container>
</template>

<script>
import VideoPlayerList from '@/components/videojs/VideoPlayerList.vue'
import 'video.js/dist/video-js.css'
import { mapGetters, mapActions } from 'vuex'
import Enumerable  from 'linq'

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
    name: 'DoCheckTdmotionWork',
    components: {
      VideoPlayerList
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
      videoList: [],
      workVideoList: [],
      videoTitleList: [],
      dialog: false,
      hidden: true,
      menu: false,
      workerActivityList: [],
      workerTdmotionList: [],
      queryWorkCommonTdmotion: [],
      queryWorkDisasterTdmotion: [],
      paramMotionId: '',

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
      let query= Enumerable.from(this.GE_TDMOTION_LIST).join(
        Enumerable.from(this.GE_WORKER_TDMOTION_LIST).where(
        w => w.worker_id === this.GE_WORKER.worker_id),
          pk=>pk.motion_id,
          fk=>fk.motion_id,
          (left, right) =>({...left, ...right})
        ).orderBy(o=>o.disp_ord).toArray()

      console.log('query watchedPlay: ' + JSON.stringify(query,null,2))
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
  mounted() {
    //console.log('this.playerListCurrentIndex : ' + this.playerListCurrentIndex)
    //console.log('this.player.playlist.lastIndex() : ' + this.player.playlist.lastIndex())
    
    if(this.response) 
      this.onPlayer()

    //this.initQuery()
    //this.initButton()
  },
  created() {
    this.makeVideoList()
  }, 
  beforeDestroy() {
      if (this.player) {
          this.player.dispose()
      }
  },    
  methods: {
      ...mapActions(workerActivityHistoryStore, [
        'AC_WORKER_ACTIVITY_HISTORY_PUSH'
      ]),
      ...mapActions(workerActivityStore, [
        'AC_WORKER_ACTIVITY_LIST'
      ]),
      ...mapActions(workerTdmotionStore, [
        'AC_WORKER_TDMOTION_LIST'
      ]),
      initQuery() {
        //parameter value check
        this.$route.query.motionId
        console.log('this.$route.query.motionId : ' + this.$route.query.motionId) 
        //query check
        let query = this.GE_TDMOTION_LIST.filter(f=>f.motion_id === parseInt(this.$route.query.motionId))

        console.log('query GE_TDMOTION_LIST ' + JSON.stringify(query,null,2))

        query = (this.GE_TDMOTION_LIST.filter(f=>f.motion_id === parseInt(this.$route.query.motionId)))[0].disaster_id

        console.log('query GE_TDMOTION_LIST disaster_id' + JSON.stringify(query,null,2))

      },
      makeVideoList() {
        //공통장비체크
        if(this.checkWorkAndWorkerCommonTdmotion() > 0)
          this.queryVideoList(this.queryWorkCommonTdmotion)
        
        //재해장비체크    
        if(this.checkWorkAndWorkerDisasterTdmotion() > 0)  
          this.queryVideoList(this.queryWorkDisasterTdmotion) 

        /*
        }else{
          console.log('this.videoList makeVideoList: ' + JSON.stringify(this.videoList,null,2))
          this.isCheckPlayVideo()
        }
        */
      },
      //공통장비체크
      checkWorkAndWorkerCommonTdmotion() {
        this.queryWorkCommonTdmotion = Enumerable.from(this.GE_WORK_LIST).where(w=>w.work_id === this.GE_WORKER.work_id)
                                            .join(Enumerable.from(this.GE_WORK_TDMOTION_LIST).where(w=>w.work_id === this.GE_WORKER.work_id),
                                              pk=>pk.work_id,
                                              fk=>fk.work_id,
                                              (left, right) =>({...left, ...right}))
                                            .join(Enumerable.from(this.GE_TDMOTION_LIST).where(w=>(w.disaster_id === 90 && w.type==='equipment')),
                                              pk=>pk.motion_id,
                                              fk=>fk.motion_id,
                                              (left, right) =>({...left, ...right}))
                                            .toArray()
        
        let queryWorkAndWorkerTdmotion = Enumerable.from(this.queryWorkCommonTdmotion)
                                                    .join(Enumerable.from(this.GE_WORKER_TDMOTION_LIST)
                                                                    .where(w=>w.worker_id === this.GE_WORKER.worker_id),
                                                      pk=>pk.motion_id,
                                                      fk=>fk.motion_id,
                                                      (left, right) =>({...left, ...right}))
                                                    .toArray()
        console.log('this.queryWorkCommonTdmotion.length ' + this.queryWorkCommonTdmotion.length) 
        console.log('queryWorkAndWorkerCommonTdmotion.length ' + queryWorkAndWorkerTdmotion.length) 
        //console.log('queryWorkCommonTdmotion ' + JSON.stringify(queryWorkCommonTdmotion,null,2)) 
        return (this.queryWorkCommonTdmotion.length - queryWorkAndWorkerTdmotion.length)                                          
      },
      //재해장비체크
      checkWorkAndWorkerDisasterTdmotion() {
        this.queryWorkDisasterTdmotion = Enumerable.from(this.GE_WORK_LIST).where(w=>w.work_id === this.GE_WORKER.work_id)
                                            .join(Enumerable.from(this.GE_WORK_TDMOTION_LIST).where(w=>(w.work_id === this.GE_WORKER.work_id && w.type==='equipment')),
                                              pk=>pk.work_id,
                                              fk=>fk.work_id,
                                              (left, right) =>({...left, ...right}))                                            
                                            .join(Enumerable.from(this.GE_TDMOTION_LIST).where(w=>w.disaster_id === (this.GE_TDMOTION_LIST.filter(f=>f.motion_id === parseInt(this.$route.query.motionId)))[0].disaster_id),
                                              pk=>pk.motion_id,
                                              fk=>fk.motion_id,
                                              (left, right) =>({...left, ...right}))                                          
                                            .toArray()
        
        let queryWorkAndWorkerTdmotion = Enumerable.from(this.queryWorkDisasterTdmotion)
                                                    .join(Enumerable.from(this.GE_WORKER_TDMOTION_LIST)
                                                                    .where(w=>w.worker_id === this.GE_WORKER.worker_id),
                                                      pk=>pk.motion_id,
                                                      fk=>fk.motion_id,
                                                      (left, right) =>({...left, ...right}))
                                                    .toArray()

        console.log('this.queryWorkDisasterTdmotion.length ' + this.queryWorkDisasterTdmotion.length)
        console.log('queryWorkAndWorkerDisasterTdmotion.length ' + queryWorkAndWorkerTdmotion.length)
        //console.log('queryWorkAndWorkerTdmotion 2 ' + JSON.stringify(queryWorkAndWorkerTdmotion,null,2))                                            
        return (this.queryWorkDisasterTdmotion.length - queryWorkAndWorkerTdmotion.length)                                                 
      },
      //make-video-list
      queryVideoList(list) {
        console.log('list' + JSON.stringify(list,null,2)) 
        
        for(const item of list){
          this.workVideoList.push( {sources: [{
            motion_id: item.motion_id,
            disaster_id: item.disaster_id,
            name: item.name,
            order: item.disp_ord - 1,     
            src : item.video_src,
            type: item.video_type 
          }]})
        }
        this.videoList = [...this.videoList, ...this.workVideoList]  
        this.videoTitleList = [...this.videoTitleList, ...list]      
        console.log('this.videoList : ' + JSON.stringify(this.videoList,null,2))
        console.log('this.videoTitleList : ' + JSON.stringify(this.videoTitleList,null,2))

        this.workVideoList = []
      },

    isCheckPlayVideo() {
        if(this.checkWorkAndWorkerCommonTdmotion() <= 0 && this.checkWorkAndWorkerDisasterTdmotion() <= 0)
          return true
        else return false
    },
    checkMoveRouterPush() {
      alert('표준작업으로 이동합니다.')
      this.$router.push('/work/rate/doWork?motionId='+parseInt(this.$route.query.motionId))
    },
    async onPlayer(player){
        this.player = player
        this.response = await this.player.playlist(this.videoList)
        //this.response = await this.player.playlist.autoadvance(0)
        //this.playerListLastIndex = this.player.playlist.lastIndex()
    }, 
    onPlayerState(event){
        switch(event.type){
            case 'play':
                console.log('player : ' + event.type)
                break;    
            case 'pause':
                console.log('player : ' + event.type)
                break;    
            case 'ended':
                console.log('this.videoList ended: ' + JSON.stringify(this.videoList,null,2))
                if(this.videoList)
                  this.tdmotionWorker(this.GE_WORKER.worker_id, this.videoList[this.playerListCurrentIndex].sources[0].motion_id)                
                console.log('player : ' + event.type)
                break;    
            case 'loadeddata':
                this.playerListPrevousIndex = this.player.playlist.previousIndex()
                this.playerListCurrentIndex = this.player.playlist.currentItem()
                this.playerListNextIndex = this.player.playlist.nextIndex() 

                console.log('player : ' + event.type)
                break;    
            case 'waiting':
                console.log('player : ' + event.type)
                break;    
            case 'playing':
                console.log('player : ' + event.type)
                break;    
            case 'canplay':
                if(this.isCheckPlayVideo())
                  this.checkMoveRouterPush()
                console.log('player : ' + event.type)
                break;    
            case 'canplaythrough':
                console.log('player : ' + event.type)
                break;    
            default:
                console.log('default')
        }

        this.historyActivityWorker(this.getActivityId('장비확인작업'), this.GE_WORKER.worker_id, 'TDMOTION', 
                                  this.videoList[this.playerListCurrentIndex].sources[0].motion_id, event.type, this.playerListCurrentIndex)          

    },
    vjsPlayerListLink(n) {
      console.log('n : ' + n)
      this.player.playlist.currentItem(n)
      this.player.play()
    },

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
      console.log('divPlayer click!', evt)
      //this.hidden = !this.hidden
    },

    tdmotionWorker(workerId, motionId) {
      this.workerTdmotionList = this.GE_WORKER_TDMOTION_LIST
      this.initTdmotionWoker(workerId, motionId)
      this.workerTdmotionList.push({worker_id: workerId, motion_id: motionId})
      this.AC_WORKER_TDMOTION_LIST(this.workerTdmotionList)  
      this.workerTdmotionList = []
      //console.log('this.GE_WORKER_TDMOTION_LIST : ' + JSON.stringify(this.GE_WORKER_TDMOTION_LIST,null,2))

    },

    initTdmotionWoker(workerId, motionId) {
      this.workerTdmotionList = this.workerTdmotionList.filter(f=> {
                          if((f.motion_id !== motionId && f.worker_id !== workerId) 
                          || (f.motion_id !== motionId && f.worker_id === workerId)
                          || (f.motion_id === motionId && f.worker_id !== workerId)){  
                            return true
                          }
                          return false
                        }) 

      //console.log('this.workerTdmotionList a: ' + JSON.stringify(this.workerTdmotionList,null,2))

    },
    getActivityId(activity){
      let query = Enumerable.from(this.GE_ACTIVITY_LIST).where(w=>w.name === activity).toArray()
      //console.log('query : ' + JSON.stringify(query,null,2));
      return query[0].activity_id
    },      
    historyActivityWorker(activityId, workerId, domain, domainId, type, state) {

      this.AC_WORKER_ACTIVITY_HISTORY_PUSH({
          activity_id: activityId,
          worker_id: workerId,
          domain: domain,
          domain_id: domainId,
          type: type,
          state: state,
          reg_dt: new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, ''),
      })
      //console.log('this.GE_WORKER_ACTIVITY_HISTORY_LIST : ' + JSON.stringify(this.GE_WORKER_ACTIVITY_HISTORY_LIST,null,2))
    },
  
  },

}
</script>

<style scoped>
.video-js{background-color: white;}

/*
.video-js .vjs-big-play-button{
  top: 45%;
  left: 45%;
}
*/

.vjs-wrap{
  position: relative;
  width:100%;  
}

.vjs-wrap .vjs-previous-button{
  top: 80%;
}

.vjs-wrap .vjs-next-button{
  top: 80%;
}

.vjs-wrap .vjs-menu-button{
  top: 10%;
}

.vjs-wrap .vjs-v-sheet{
  position: absolute;
  top: 0;
  opacity: 0.5;
  width: 100%;
}
</style>
