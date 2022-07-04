<template>
  <v-container
    id="do-work"
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
                      v-for="item in watchedPlay"
                      :key="item.name"
                      link
                      @click="vjsPlayerListLink(item.disp_ord)"
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

    <v-dialog :param="popupOptions"></v-dialog>

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
    name: 'DoWork',
    components: {
      VideoPlayerList
    },
    data: () => ({
      player: null,
      canPlayer: false,
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
      dialog: false,
      hidden: true,
      menu: false,
      workerActivityList: [],
      workerTdmotionList: [],
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
  mounted() {
    //console.log('this.playerListCurrentIndex : ' + this.playerListCurrentIndex)
    //console.log('this.player.playlist.lastIndex() : ' + this.player.playlist.lastIndex())

    if(this.response) 
      this.onPlayer()

    //this.initQuery()
    //this.initButton()
  },
  created() {
    //this.nomalWorkVideo();
    //this.outbreakWorkVideo();
    // normal, outbreak
    this.videoListQuery('normal')
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

    initQuery(){
      //workEquipment

      
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


/*
      let queryWorkEquipment = Enumerable.from(this.GE_WORK_LIST).where(w=>w.work_id === this.GE_WORKER.work_id)
                                          .join(Enumerable.from(this.GE_WORK_EQUIPMENT_LIST).where(w=>w.work_id === this.GE_WORKER.work_id),
                                            pk=>pk.work_id,
                                            fk=>fk.work_id,
                                            (left, right) =>({...left, ...right}))
                                          .join(Enumerable.from(this.GE_EQUIPMENT_LIST).where(w=>(w.require === 'Y' && w.classify === 'A')),
                                            pk=>pk.equipment_id,
                                            fk=>fk.equipment_id,
                                            (left, right) =>({...left, ...right})).where(w=>w.disaster_id === 1)
                                          .toArray()
      
      let queryWorkAndWorkerEquipment = Enumerable.from(queryWorkEquipment)
                                                  .join(Enumerable.from(this.GE_WORKER_EQUIPMENT_LIST)
                                                                  .where(w=>w.worker_id === this.GE_WORKER.worker_id),
                                                    pk=>pk.equipment_id,
                                                    fk=>fk.equipment_id,
                                                    (left, right) =>({...left, ...right})).where(w=>w.disaster_id === 1)
                                                  .toArray()        
                                                 
      //let query = Enumerable.from(this.GE_WORKER_EQUIPMENT_LIST).toArray()  
      //console.log('queryWorkEquipment init: ' + JSON.stringify(queryWorkEquipment,null,2))
      console.log('queryWorkAndWorkerEquipment init' + JSON.stringify(queryWorkAndWorkerEquipment,null,2))
      //console.log('query init' + JSON.stringify(query,null,2))
      //workerEquipment
      
      
      //workTdmotion
      let queryWorkTdmotion = this.GE_WORK_TDMOTION_LIST.filter(f=>(f.work_id === this.GE_WORKER.work_id && f.type === 'equipment'))

      //workerTdmotion
      let queryWorkerTdmotion = this.GE_WORKER_TDMOTION_LIST.filter(f=>(f.work_id === this.GE_WORKER.work_id && f.type === 'equipment'))


      console.log('queryWorkTdmotion init: ' + JSON.stringify(queryWorkTdmotion,null,2))
      console.log('queryWorkerTdmotion init: ' + JSON.stringify(queryWorkerTdmotion,null,2))

      let query= this.GE_WORKER_TDMOTION_LIST.filter(f=>f.worker_id === this.GE_WORKER.worker_id)   
      query= Enumerable.from(this.GE_TDMOTION_LIST).join(
        Enumerable.from(this.GE_WORK_TDMOTION_LIST).where(
        w => w.work_id === this.GE_WORKER.work_id && w.type === 'normal'),
          pk=>pk.motion_id,
          fk=>fk.motion_id,
          (left, right) =>({...left, ...right})
        ).orderBy(o=>o.disp_ord).take(query.length+1).toArray()
        console.log('query init: ' + JSON.stringify(query,null,2))
      */
    },

    async onPlayer(player){
        this.player = player
        this.response = await this.player.playlist(this.videoList)
        //this.response = await this.player.playlist.autoadvance(0)
        //this.playerListStated(this.player)

        this.playerListLastIndex = this.player.playlist.lastIndex()

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
                if(!this.isCheckTdmotionWork()){
                  this.checkMoveRouterPush('play')
                }
                console.log('player : ' + event.type)
                break;    
            case 'pause':
                console.log('player : ' + event.type)
                break;    
            case 'ended':
                console.log('this.videoList : ' + this.videoList)
                if(this.videoList)
                  this.tdmotionWorker(this.GE_WORKER.worker_id, this.videoList[this.playerListCurrentIndex].sources[0].motion_id)                
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
      //this.hidden = !this.hidden 
    },
    
    nextPlayer() {
      if(this.isCheckTdmotionWork()){
        console.log('nextPlayer');
        this.player.playlist.next()
      }
            
      /*
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
            src : item.video_src,
            type: item.video_type 
          }]})
        }
                
        this.videoList = this.workVideoList
        this.workVideoList = []

      }catch(e){
        console.log('e : ' + e)  
      }

    },
    isCheckTdmotionWork() {
      console.log('checkTdmotionWork')
      if(this.checkWorkAndWorkerTdmotion()>0)
        if(this.checkWorkAndWorkerCommonTdmotion()>0 || this.checkWorkAndWorkerDisasterTdmotion()>0)
          return this.canPlayer = false
        else
          return this.canPlayer = true        
      else
        return this.canPlayer = true
      
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
      this.activityWorker(this.GE_WORKER.worker_id, this.getActivityId('표준작업'))
      //this.$router.replace('/work/choiceWork');
      this.dialog = false;
      this.$router.push('/work/reportWork');
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
    activityWorker(workerId, activityId) {
      this.workerActivityList = this.GE_WORKER_ACTIVITY_LIST
      this.initActivityWoker(workerId, activityId)
      this.workerActivityList.push({worker_id: workerId, activity_id: activityId});
      this.AC_WORKER_ACTIVITY_LIST(this.workerActivityList);  
      this.workerActivityList = [];  
      //console.log('this.GE_WORKER_ACTIVITY_LIST : ' + JSON.stringify(this.GE_WORKER_ACTIVITY_LIST,null,2))

    },
    initActivityWoker(workerId, activityId) {
      this.workerActivityList = this.workerActivityList.filter(f=> {
                          if((f.activity_id !== activityId && f.worker_id !== workerId) 
                          || (f.activity_id !== activityId && f.worker_id === workerId)
                          || (f.activity_id === activityId && f.worker_id !== workerId)){  
                            return true
                          }
                          return false
                        }) 

      //console.log('this.workerActivityList a: ' + JSON.stringify(this.workerActivityList,null,2))

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
