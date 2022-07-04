<template>
  <section id="work-rating">    
    <span class="bg"></span>
    <v-container class="mt-5">
      <v-row>
        <v-col
          cols="auto"
          class="mr-auto"
        >
          <p class="text-h5 font-weight-bold position-zindex">{{workName}}</p>
        </v-col>
        <v-col cols="auto">
          <span class="title position-zindex">
            <v-icon>mdi-account</v-icon>{{worker}}
          </span>
        </v-col>
      </v-row>
    </v-container>

    <router-view/>
  
    <div class="work-sub-menu-wrap" v-if="workerAndActivityList.length>0">
      <template >
        <v-fab-transition>
          <v-btn
            color="blue-grey darken-4"
            fab
            dark
            small
            absolute
            bottom
            right
            @click="subMenuHidden= !subMenuHidden"
          >
            <v-icon v-if="subMenuHidden">
              mdi-view-list
            </v-icon>
            <v-icon v-else>
              mdi-close
            </v-icon>            
          </v-btn>
        </v-fab-transition>
      </template>

      <div v-show="!subMenuHidden" class="work-sub-menu">
          <router-link v-for="item in workerAndActivityList"
            :key="item.activity_id"
            :to="{name: item.source}"
          >
            <v-btn
              block
              dark
              rounded
              large
              color="teal darken-3"
              class="text-subtitle-1 mt-1"
            >          
              {{item.name}}
            </v-btn>
          </router-link>
          <v-btn v-if="isCheckWorkerAndActivity"
            block
            dark
            rounded
            large
            color="teal darken-3"
            @click="checkIsOutbreakEquip"
            class="text-subtitle-1 mt-1"
          >
            작업하기
          </v-btn>
        
        <!--
        <router-link 
           :to="{ name: 'PrepareWork'}"
        >          
          <v-btn
            block
            dark
            rounded
            large
            color="teal darken-3"
            class="text-subtitle-1"
          >          
            작업준비
          </v-btn>
        </router-link>

          <v-btn
            block
            dark
            rounded
            large
            color="teal darken-3"
            to="/work/rate/guideWork"
            class="text-subtitle-1 mt-2"
          >

            작업가이드
          </v-btn>
          <v-btn
            block
            dark
            rounded
            large
            color="teal darken-3"
            to="/work/rate/orderWork"
            class="text-subtitle-1 mt-2"
          >
            작업허가서
          </v-btn>
          <v-btn
            block
            dark
            rounded
            large
            color="teal darken-3"
            to="/work/rate/protectEquipmentWork"
            class="text-subtitle-1 mt-2"
          >
            보호구장비선택
          </v-btn>
          <v-btn
            block
            dark
            rounded
            large
            color="teal darken-3"
            to="/work/rate/safetyEquipmentWork"
            class="text-subtitle-1 mt-2"
          >
            안전장비선택
          </v-btn>
          <v-btn v-if="isCheckWorkerAndActivity"
            block
            dark
            rounded
            large
            color="teal darken-3"
            @click="checkIsOutbreakEquip"
            class="text-subtitle-1 mt-2 mb-8"
          >
            작업하기
          </v-btn>
          -->
      </div>
    </div>

    <v-dialog
      v-model="dialog"
      max-width="350"
    >
      <v-card>
        <v-card-title>
          {{ equip_name }}

          <v-spacer />

          <v-icon
            aria-label="Close"
            @click="dialog = false"
          >
            mdi-close
          </v-icon>
        </v-card-title>

        <v-card-text class="pb-6 pt-12 text-center">
          해당장비의 작동상태 확인 및 농도측정을 진행하시겠습니까
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            class="mr-3"
            text
            @click="nextStep(), dialog = false"
          >
            다음단계로
          </v-btn>

          <v-btn
            color="success"
            text
            @click="playMotion"
          >
            진행
          </v-btn>
        </v-card-actions>  
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialogVideo"
      max-width="1000"
    >
      <base-y-dialog 
        :param="dialogOptions"
        />
    </v-dialog>
  </section>
  
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Enumerable  from 'linq'

const workStore = 'workStore'
const equipmentStore = 'equipmentStore'
const workerStore = 'workerStore'
const workEquipmentStore = 'workEquipmentStore'
const workerEquipmentStore = 'workerEquipmentStore'

const tdmotionStore = 'tdmotionStore'
const workTdmotionStore = 'workTdmotionStore'

const activityStore = 'activityStore'
const workerActivityStore = 'workerActivityStore'


const resultStore = 'resultStore'
const resultItemStore = 'resultItemStore'


export default {
  name: 'Rating',
  data: () => ({
    equip_name: '',
    subMenuHidden: false,
    dialog: false,
    dialogVideo:false,

    dialogOptions: {
      target: null,
      param: {},
      closeCallback: null,
      playMotionEnd: null,
    },
    //작업자선택결과
    resultItemPayload: {
      index: 0,
      resultItem:[]
    },
    gitUrl: 'https://goguy.github.io/mts-vv-kit',

  }),
  computed: {
    ...mapGetters(workStore, [
      'GE_WORK_LIST'
    ]),
    ...mapGetters(equipmentStore, [
      'GE_EQUIPMENT_LIST'
    ]),    
    ...mapGetters(workerStore, [
      'GE_WORKER'
    ]),
    ...mapGetters(workEquipmentStore, [
      'GE_WORK_EQUIPMENT_LIST'
    ]),
    ...mapGetters(workerEquipmentStore, [
      'GE_WORKER_EQUIPMENT_LIST'
    ]),    
    ...mapGetters(tdmotionStore, [
      'GE_TDMOTION_LIST'
    ]),    
    ...mapGetters(workTdmotionStore, [
      'GE_WORK_TDMOTION_LIST'
    ]),
    ...mapGetters(activityStore, [
      'GE_ACTIVITY_LIST'
    ]),
    ...mapGetters(workerActivityStore, [
      'GE_WORKER_ACTIVITY_LIST'
    ]),
    ...mapGetters(resultStore, [
      'GE_RESULT', 'GE_RESULT_LIST'
    ]),
    ...mapGetters(resultItemStore, [
      'GE_RESULT_ITEM', 'GE_RESULT_ITEM_LIST'
    ]),

    worker() {
      return this.GE_WORKER.name
    },
    workName(){
      let query = this.GE_WORK_LIST.filter(f=>f.work_id === this.GE_WORKER.work_id) 
      //console.log(query,null,2)
      return query[0].name
    },
    workerAndActivityList() {
      let query = Enumerable.from(this.GE_ACTIVITY_LIST)
                            .where(w=>(w.parent_id===(this.GE_ACTIVITY_LIST.filter(f=>(f.name==='작업준비하기'))[0].activity_id)))
                            .join(Enumerable.from(this.GE_WORKER_ACTIVITY_LIST)
                                            .where(w=>(w.worker_id===this.GE_WORKER.worker_id)),
                              pk=>pk.activity_id,
                              fk=>fk.activity_id,
                              (left, right)=>({...left, ...right}))
                            .orderBy(o=>o.activity_id)                              
                            .toArray()

      console.log('query', JSON.stringify(query, null, 2))
      return query
    },
    isCheckWorkerAndActivity() {
      let activityQuery = this.GE_ACTIVITY_LIST.filter(f=>(f.parent_id===(this.GE_ACTIVITY_LIST.filter(f=>(f.name==='작업준비하기'))[0].activity_id)))
            
      if( (activityQuery.length - this.workerAndActivityList.length) === 0)
        return true
      else 
        return false  
    }  
  },
  watch: {

  },
  mounted() {
    this.workerAndActivityList
    this.GE_ACTIVITY_LIST
    //this.checkIsOutbreakEquip()
  },  
  methods: {
    ...mapActions(resultStore, [
      'AC_RESULT_EDIT'
    ]),
    ...mapActions(resultItemStore, [
      'AC_RESULT_ITEM_EDIT'
    ]),

    nextStep() {
      this.$router.replace('/work/workplay')
    },
    checkIsOutbreakEquip() {
      //0. 정비작업 type 확인
      let workType = this.checkWorkType()

      if(workType === 'standard'){
        this.nextStep()
      }else {
        //1. 정비작업에 해당하는 장비테이블에 is_outbreak 구하기
        //this.getEquipmentId()
        let equipmentId = this.getEquipmentId()
        console.log('equipmentId',equipmentId)                      
        
        //2. is_outbreak장비 선택여부 확인
        let isOutbreak = false
        if(equipmentId !== 0)
          isOutbreak = this.isWorkerEquip(equipmentId)
        else
          this.nextStep()
        
        //3. 정비작업에 해당하는 모션 중 'measure'플레이 
        if(isOutbreak){
          //3.1. 모션플레이 여부
          this.dialog = true
        }else
          this.nextStep()
      }

      //console.log('checkIsOutbreakEquip')
    },
    checkWorkType() {
      let query = this.GE_WORK_LIST.filter(f=>f.work_id===this.GE_WORKER.work_id)
      return query[0].type
    },
    getEquipmentId() {
      let query = Enumerable.from(this.GE_WORK_LIST).where(w=>w.work_id === this.GE_WORKER.work_id)
                            .join(Enumerable.from(this.GE_WORK_EQUIPMENT_LIST),
                              pk=>pk.work_id,
                              fk=>fk.work_id,
                              (left, right)=>({...left, ...right}))  
                            .join(Enumerable.from(this.GE_EQUIPMENT_LIST),
                              pk=>pk.equipment_id,
                              fk=>fk.equipment_id,
                              (left, right)=>({...left, ...right}))
                            .where(w=>w.is_outbreak==='Y')
                            .toArray()
      
      let equipmentId = 0
      if(query.length === 1){
        equipmentId = query[0].equipment_id
        this.equip_name = query[0].name      
      }
      
      return equipmentId
    },
    isWorkerEquip(val){
      let query = this.GE_WORKER_EQUIPMENT_LIST.filter(f=>(f.worker_id === this.GE_WORKER.worker_id && f.equipment_id === val))            
      //console.log('query',JSON.stringify(query, null, 2))
      if(query.length > 0)
        return true
      else
        return false      
    },
    playMotion() {
      this.dialog = false
      let query = Enumerable.from(this.GE_WORK_LIST).where(w=>w.work_id === this.GE_WORKER.work_id)
                            .join(Enumerable.from(this.GE_WORK_TDMOTION_LIST),
                              pk=>pk.work_id,
                              fk=>fk.work_id,
                              (left, right)=>({...left, ...right}))  
                            .join(Enumerable.from(this.GE_TDMOTION_LIST),
                              pk=>pk.motion_id,
                              fk=>fk.motion_id,
                              (left, right)=>({...left, ...right}))
                            .where(w=>w.type==='measure')
                            .toArray()
      if(query.length > 0)
        this.showVideo(query[0])
      else
        alert('시스템 에러입니다. 관리자에게 문의바랍니다.')


      console.log('query',JSON.stringify(query, null, 2))
      //console.log('playMotion')
    },
    showVideo(item){
      if(item.video_url.indexOf('.mp4') > -1){

        //console.log('item',JSON.stringify(item, null, 2))
        item.video_url = this.getVideoUrl(item.video_url)
        item.img_url = this.getImageUrl(item.img_url)

        this.dialogOptions.target = () => import(`${'@/views/work/RatingDiagVideo.vue'}`);
        this.dialogOptions.param = item
        this.dialogOptions.closeCallback = this.closeDialog;
        this.dialogVideo=true 
        
      }else{
        alert('비디오 형식에 맞지 않습니다.')  
        return 
      }
              
      //console.log('item : ' + JSON.stringify(item,null,2))
    },
    closeDialog(val1, val2) {
      console.log('val2', val2)
      this.dialogOptions.target = null
      this.dialogVideo = val1
      this.checkEndPlayVideo(val2)
    },
    checkEndPlayVideo(val){
      if(val){        
        let isCheck = this.checkTypeResult()        
        if(isCheck){
          //산소농도측정기 작동상태 확인 및 농도측정
          this.recordWorkerResultItem('equip_check', 'Y')
          this.nextStep()
        }else{
          alert('산소농도측정기 작동상태 확인 및 농도측정 업데이트 실패')      
        }
      }
      else
        alert('해당모션을 완주하시기 바랍니다.')
    },
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
      console.log('this.resultItemPayload',JSON.stringify(this.resultItemPayload, null, 2))
      this.AC_RESULT_ITEM_EDIT(this.resultItemPayload)
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

  },
}
</script>
<style scoped>
.bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: url('https://goguy.github.io/mts-vv-kit/images/tank_cleaning_bg_final.png') no-repeat center center;
    background-size: cover;
    opacity: 0.7;
  }

  .position-zindex{
    position:relative;
    z-index:1;
  }  

  .work-sub-menu-wrap{
    position: absolute;
    top:300px;
    right:5px;
  }
  .work-sub-menu{
    position: relative;
    top: -25px;
  }

</style>
