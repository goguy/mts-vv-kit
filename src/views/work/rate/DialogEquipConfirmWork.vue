<template>
  <v-container
    id="dialog-equip-confirm-work"
    tag="section"
  >
    <v-dialog 
        v-model="dialog" 
        persistent
        hide-overlay 
        >

      <v-card>
        <v-card-title class="headline">보호구장비 및 안전장비 영상</v-card-title>
        <v-card-text>

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
                                    :playerList="diagVideoList"
                                    @player="onPlayer"
                                    @playerState="onPlayerState" />


                    <v-menu
                        v-model="diagMenu"
                        :close-on-content-click="false"
                        :nudge-width="200"
                        offset-x
                    >
                        <template v-slot:activator="{ on, attrs }">
                        <v-fab-transition>

                        <v-btn
                            v-show="!diagHidden"
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
                            v-for="(item, index) in diagVideoTitleList"
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
                            @click="diagMenu = false"
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

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn 
            color="green darken-1" 
            @click.native="close">Close</v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>
  </v-container>  
</template>

<script>
import VideoPlayerList from '@/components/videojs/VideoPlayerList.vue'
import 'video.js/dist/video-js.css'
import { mapGetters } from 'vuex'
import Enumerable  from 'linq'

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

//Commmon Activity
const activityStore = 'activityStore'
const workerActivityStore = 'workerActivityStore'
const workerActivityHistoryStore = 'workerActivityHistoryStore'


export default {
    components: {
      VideoPlayerList
    },
    name: 'dialogEquipConfirmWork',
    props: {
        dialog: {
            default: false
        },
        optionsDialog: {
            type:Object,
            default() {
                return {};
            }
        },
    },
    data() {
      return {
        diagPlayer: null,
        response: null,
        diagPlayerTitle: '',
        diagPlayerListLastIndex: -1,
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
        diagVideoList: [],
        diagWorkVideoList: [],
        diagVideoTitleList: [],
        diagHidden: true,
        diagMenu: false,
        diagWorkerTdmotionList: [],
        diagQueryWorkCommonTdmotion: [],
        diagQueryWorkDisasterTdmotion: [],
        isPlaying: false,
      };
    },
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
        
        nextHidden() {
        if(this.diagPlayer.playlist.currentItem() === this.diagPlayerListLastIndex)
            return true
        return false
        },
        previousHidden() {
        if(this.diagPlayer.playlist.currentItem() === 0)
            return true
        return false
        },
    },
    watch: {}, 
    mounted() {
        /*
        console.log('optionsDialog : ' + JSON.stringify(this.optionsDialog,null,2))
        console.log('this.optionsDialog : ' + this.optionsDialog)
        console.log('this.optionsDialog.length : ' + this.optionsDialog.length)
        */

        if(this.response) 
            this.onPlayer()

    },
    created() {}, 
    beforeDestroy() {
        console.log('beforeDestroy')
        if (this.diagPlayer) {
            this.diagPlayer.dispose()
        }
        this.nextStep()
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
        initQuery() {
            //parameter value check
            console.log('initQuery')
        },
        makeVideoList() {

            //공통장비체크
            if(this.checkWorkAndWorkerCommonTdmotion() > 0)
            this.queryVideoList(this.diagQueryWorkCommonTdmotion)
            
            //재해장비체크
            if(this.checkWorkAndWorkerDisasterTdmotion() > 0)  
            this.queryVideoList(this.diagQueryWorkDisasterTdmotion) 
            /*
            }else{
            console.log('this.diagVideoList makeVideoList: ' + JSON.stringify(this.diagVideoList,null,2))
            this.isCheckPlayVideo()
            }
            */
        },
        //공통장비체크
        checkWorkAndWorkerCommonTdmotion() {
            this.diagQueryWorkCommonTdmotion = Enumerable.from(this.GE_WORK_LIST).where(w=>w.work_id === this.GE_WORKER.work_id)
                                                .join(Enumerable.from(this.GE_WORK_TDMOTION_LIST).where(w=>w.work_id === this.GE_WORKER.work_id),
                                                pk=>pk.work_id,
                                                fk=>fk.work_id,
                                                (left, right) =>({...left, ...right}))
                                                .join(Enumerable.from(this.GE_TDMOTION_LIST).where(w=>(w.disaster_id === 90 && w.type==='equipment')),
                                                pk=>pk.motion_id,
                                                fk=>fk.motion_id,
                                                (left, right) =>({...left, ...right}))
                                                .toArray()
            
            let queryWorkAndWorkerTdmotion = Enumerable.from(this.diagQueryWorkCommonTdmotion)
                                                        .join(Enumerable.from(this.GE_WORKER_TDMOTION_LIST)
                                                                        .where(w=>w.worker_id === this.GE_WORKER.worker_id),
                                                        pk=>pk.motion_id,
                                                        fk=>fk.motion_id,
                                                        (left, right) =>({...left, ...right}))
                                                        .toArray()
            console.log('this.diagQueryWorkCommonTdmotion.length ' + this.diagQueryWorkCommonTdmotion.length) 
            console.log('queryWorkAndWorkerCommonTdmotion.length ' + queryWorkAndWorkerTdmotion.length) 
            //console.log('diagQueryWorkCommonTdmotion ' + JSON.stringify(diagQueryWorkCommonTdmotion,null,2)) 
            return (this.diagQueryWorkCommonTdmotion.length - queryWorkAndWorkerTdmotion.length)                                          
        },
        //재해장비체크
        checkWorkAndWorkerDisasterTdmotion() {
            this.diagQueryWorkDisasterTdmotion = Enumerable.from(this.GE_WORK_LIST).where(w=>w.work_id === this.GE_WORKER.work_id)
                                                .join(Enumerable.from(this.GE_WORK_TDMOTION_LIST).where(w=>(w.work_id === this.GE_WORKER.work_id && w.type==='equipment')),
                                                pk=>pk.work_id,
                                                fk=>fk.work_id,
                                                (left, right) =>({...left, ...right}))                                            
                                                .join(Enumerable.from(this.GE_TDMOTION_LIST).where(w=>w.disaster_id === (this.GE_TDMOTION_LIST.filter(f=>f.motion_id === parseInt(this.optionsDialog.motionId)))[0].disaster_id),
                                                pk=>pk.motion_id,
                                                fk=>fk.motion_id,
                                                (left, right) =>({...left, ...right}))                                          
                                                .toArray()
            
            let queryWorkAndWorkerTdmotion = Enumerable.from(this.diagQueryWorkDisasterTdmotion)
                                                        .join(Enumerable.from(this.GE_WORKER_TDMOTION_LIST)
                                                                        .where(w=>w.worker_id === this.GE_WORKER.worker_id),
                                                        pk=>pk.motion_id,
                                                        fk=>fk.motion_id,
                                                        (left, right) =>({...left, ...right}))
                                                        .toArray()

            console.log('this.diagQueryWorkDisasterTdmotion.length ' + this.diagQueryWorkDisasterTdmotion.length)
            console.log('queryWorkAndWorkerDisasterTdmotion.length ' + queryWorkAndWorkerTdmotion.length)
            //console.log('queryWorkAndWorkerTdmotion 2 ' + JSON.stringify(queryWorkAndWorkerTdmotion,null,2))                                            
            return (this.diagQueryWorkDisasterTdmotion.length - queryWorkAndWorkerTdmotion.length)                                                 
        },
        //make-video-list
        queryVideoList(list) {
            console.log('list' + JSON.stringify(list,null,2)) 
            
            for(const item of list){
            this.diagWorkVideoList.push( {sources: [{
                motion_id: item.motion_id,
                disaster_id: item.disaster_id,
                name: item.name,
                order: item.disp_ord - 1,     
                src : item.video_src,
                type: item.video_type 
            }]})
            }
            this.diagVideoList = [...this.diagVideoList, ...this.diagWorkVideoList]  
            this.diagVideoTitleList = [...this.diagVideoTitleList, ...list]      
            console.log('this.diagVideoList : ' + JSON.stringify(this.diagVideoList,null,2))
            console.log('this.diagVideoTitleList : ' + JSON.stringify(this.diagVideoTitleList,null,2))

            this.diagWorkVideoList = []
        },

        isCheckPlayVideo() {
            if(this.checkWorkAndWorkerCommonTdmotion() <= 0 && this.checkWorkAndWorkerDisasterTdmotion() <= 0)
                return true
            else return false
        },
        checkClose(type) {
            if(type === 'canplay')
                this.diagPlayer.pause()
            alert('시청을 완료했습니다.')
            this.close()
        },
        checkMoveRouterPush() {
            alert('표준작업으로 이동합니다.')
            this.$router.push('/work/rate/doWork?motionId='+parseInt(this.$route.query.motionId))
        },
        async onPlayer(player){
            this.diagPlayer = player
            this.response = await this.diagPlayer.playlist(this.diagVideoList)
            //this.response = await this.diagPlayer.playlist.autoadvance(0)
            //this.diagPlayerListLastIndex = this.diagPlayer.playlist.lastIndex()
        }, 
        onPlayerState(event){
            let differLength  

            if(this.diagPlayer.playlist.currentItem() >= this.diagVideoList.length)
                differLength=this.diagVideoList.length-1
            else     
                differLength=this.diagPlayer.playlist.currentItem()

            console.log('this.diagPlayer.playlist.currentItem() start: ' + this.diagPlayer.playlist.currentItem())
            console.log('this.diagVideoList.length start: ' + this.diagVideoList.length)

            switch(event.type){
                case 'play':
                    this.isPlaying=true
                    console.log('player : ' + event.type)
                    break;    
                case 'pause':
                    this.isPlaying=false
                    console.log('player : ' + event.type)
                    break;    
                case 'ended':
                    console.log('this.diagVideoList ended: ' + JSON.stringify(this.diagVideoList,null,2))
                    if(this.diagVideoList){
                        this.tdmotionWorker(this.GE_WORKER.worker_id, this.diagVideoList[differLength].sources[0].motion_id)
                        this.diagPlayer.playlist.autoadvance(this.diagPlayer.playlist.nextIndex())
                    }                
                    console.log('player : ' + event.type)
                    break;    
                case 'loadeddata':
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
                        this.checkClose('canplay')                        
                    console.log('player : ' + event.type)
                    break;    
                case 'canplaythrough':
                    console.log('player : ' + event.type)
                    break;    
                default:
                    console.log('default')
            }
            this.historyActivityWorker(this.getActivityId('장비확인작업'), this.GE_WORKER.worker_id, 'TDMOTION', 
                                    this.diagVideoList[differLength].sources[0].motion_id, event.type, this.diagPlayer.playlist.currentItem())                                      
        },
        vjsPlayerListLink(n) {
            console.log('n : ' + n)
            this.diagPlayer.playlist.currentItem(n)
            this.diagPlayer.play()
        },

        onDivPlayerMouseEnter(evt){
            //console.log('divPlayer MouseEnter!', evt)
            this.diagHidden = !this.diagHidden
            evt
        },
        onDivPlayerMouseLeave(evt){
            //console.log('divPlayer MouseLeave!', evt)
            this.diagHidden = !this.diagHidden
            evt
        },
        onDivPlayerClick(evt){
            console.log('divPlayer click!', evt)
            //this.diagHidden = !this.diagHidden
        },

        close() {
            if(this.isPlaying)
              this.diagPlayer.pause()  
            
            setTimeout(() => {
                this.initData()
                this.$emit('update:dialog', false)
                this.$emit('dialogInfo',{userId:'admin'})
            }, 1000);

        },
        initData() {
            this.diagVideoList=[]
            this.diagVideoTitleList=[]
            this.diagQueryWorkCommonTdmotion=[]
            this.diagQueryWorkDisasterTdmotion=[]
        },
        nextStep() {
            this.activityWorker(this.GE_WORKER.worker_id, this.getActivityId('장비확인작업'))
            //this.$router.replace('/work/choiceWork');
        },

        /*
        tdmotionWorker(workerId, motionId) {
            this.diagWorkerTdmotionList = this.GE_WORKER_TDMOTION_LIST
            this.initTdmotionWoker(workerId, motionId)
            this.diagWorkerTdmotionList.push({worker_id: workerId, motion_id: motionId})
            this.AC_WORKER_TDMOTION_LIST(this.diagWorkerTdmotionList)  
            this.diagWorkerTdmotionList = []
            //console.log('this.GE_WORKER_TDMOTION_LIST : ' + JSON.stringify(this.GE_WORKER_TDMOTION_LIST,null,2))

        },

        initTdmotionWoker(workerId, motionId) {
            this.diagWorkerTdmotionList = this.diagWorkerTdmotionList.filter(f=> {
                                if((f.motion_id !== motionId && f.worker_id !== workerId) 
                                || (f.motion_id !== motionId && f.worker_id === workerId)
                                || (f.motion_id === motionId && f.worker_id !== workerId)){  
                                    return true
                                }
                                return false
                                }) 

            //console.log('this.diagWorkerTdmotionList a: ' + JSON.stringify(this.diagWorkerTdmotionList,null,2))
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
                reg_dt: new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*!--/, ''),
            })
        //console.log('this.GE_WORKER_ACTIVITY_HISTORY_LIST : ' + JSON.stringify(this.GE_WORKER_ACTIVITY_HISTORY_LIST,null,2))
        },
        */
    },
    mixins: [activityMixin, tdMotionMixin],
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

