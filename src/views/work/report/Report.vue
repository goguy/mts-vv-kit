<template>
  <v-sheet
    id="Report"
    class="pa-5"
  >
    <p class="text-h4 text-center pa-5">
      REPORT
    </p>

    <v-sheet
        class="mt-5">      
      <div class="text-right">문서번호[ {{ workInfo[0].work_id }}-{{ workerInfo.worker_id }} ]</div>
      <v-simple-table>
        <thead>
          <tr>
            <td class="text-left" style="width:20%">
              수강명
            </td>
            <td class="text-left" colspan="3">
              {{ workInfo[0].name }}
            </td>
          </tr>
          <tr>
            <td class="text-left">
              수강생
            </td>
            <td class="text-left">
              {{ workerInfo.name }}
            </td>
            <td class="text-left" style="width:20%">
              수강일
            </td>
            <td class="text-left">
              {{ workerInfo.reg_dt }}  
            </td>
          </tr>
        </thead>
      </v-simple-table>

      <v-sheet class="mt-5">
        <p class="font-weight-bold">
          수강내역
        </p>  
        <v-sheet class="ml-5">
          <p class="font-weight-medium">
            사전작업
          </p>
          <v-sheet class="ml-5">
            <p>
              1. 작업가이드
                <v-icon color="blue" v-if="workerInfo.guide_chk">
                  mdi-check-bold
                </v-icon>
                <v-icon color="red" v-else>
                  mdi-alpha-x
                </v-icon>
            </p>
            <p>
              2. 작업허가서
                <v-icon color="blue" v-if="workerInfo.order_chk">
                  mdi-check-bold
                </v-icon>
                <v-icon color="red" v-else>
                  mdi-alpha-x
                </v-icon>
            </p>
            <p>
              3. 개인보호구
            </p>
            <v-sheet class="ml-5">
              <v-row>
                <v-col 
                    v-for="item in queryWorkAndWorkerEquipment('protect')"
                    :key="item.name"
                    md="2"
                    sm="4"
                    xs="6"
                    cols="6"
                >
                  <v-card dark>
                    <v-img
                      :src="item.img_url"
                      contain
                      gradient="to bottom, rgba(11, 28, 61, .9), rgba(0,0,0,.4)"
                      
                    >
                      <v-card-text class="text-center">
                        {{item.name}}
                      </v-card-text>
                      <v-card-text class="text-center">
                        <v-icon color="blue" v-if="item.worker_id != null">
                          mdi-check-bold
                        </v-icon>
                        <v-icon color="red" v-else>
                          mdi-alpha-x
                        </v-icon>
                      </v-card-text>
                    </v-img> 
                  </v-card>
                </v-col>
              </v-row>              
            </v-sheet>

            <p class="mt-5">
              4. 안전장비
            </p>
            <v-sheet class="ml-5">
              <v-row>
                <v-col 
                    v-for="item in queryWorkAndWorkerEquipment('safety')"
                    :key="item.name"
                    md="2"
                    sm="4"
                    xs="6"
                    cols="6"
                >
                  <v-card dark>
                    <v-img
                      :src="item.img_url"
                      contain
                      gradient="to bottom, rgba(11, 28, 61, .9), rgba(0,0,0,.4)"
                      
                    >
                     <v-card-text class="text-center">
                       {{item.name}}
                     </v-card-text>
                    <v-card-text class="text-center">
                      <v-icon color="blue" v-if="item.worker_id != null">
                        mdi-check-bold
                      </v-icon>
                      <v-icon color="red" v-else>
                        mdi-alpha-x
                      </v-icon>

                     </v-card-text>
                    </v-img> 
                  </v-card>
                </v-col>
              </v-row>                        
            </v-sheet>
          </v-sheet>

          <p class="mt-5 font-weight-medium">
            작업
          </p>
          <v-sheet class="ml-5">
              <v-row>
                <v-col 
                    v-for="item in workAndworkerTdmotionInfo"
                    :key="item.name"
                    md="2"
                    sm="4"
                    xs="6"
                    cols="6"
                >
                  <v-card>
                     <v-card-text class="text-center">
                      {{item.work_montion_name}}
                     </v-card-text>
                    <v-card-text class="text-center">
                      <v-icon color="blue" v-if="item.worker_id != null">
                        mdi-check-bold
                      </v-icon>
                      <v-icon v-else>
                        mdi-alpha-x
                      </v-icon>

                     </v-card-text>
                  </v-card>
                </v-col>
              </v-row>            
          </v-sheet>

        </v-sheet>
      </v-sheet>
    
      <v-sheet class="mt-5">
        <p class="font-weight-bold">
          수강평가
        </p>  

        <v-simple-table>
          <thead>
            <tr>
              <td class="text-left" style="width:16%;">
                작업가이드(5)
              </td>
              <td class="text-left" style="width:16%;">
                작업허가서(5)
              </td>
              <td class="text-left" style="width:16%;">
                개인보호구(20)
              </td>
              <td class="text-left" style="width:16%;">
                안전장비(20)
              </td>
              <td class="text-left" style="width:16%;">
                작업(50)
              </td>
              <td class="text-left">
                총점
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text-right">
                {{guideScore}}
              </td>
              <td class="text-right">
                {{orderScore}}
              </td>
              <td class="text-right">
                {{protectScore}}
              </td>
              <td class="text-right">
                {{safetyScore}}
              </td>
              <td class="text-right">
                {{workScore}}
              </td>
              <td class="text-right">
                {{totalScore()}}
              </td>
            </tr>
          </tbody>
        </v-simple-table>

      </v-sheet>    
    </v-sheet>
    <div class="mt-10 text-center">
      <v-btn
        color="primary"
        depressed
        @click="submitReport"
      >
        제출하기
      </v-btn>
    </div>
  </v-sheet>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Enumerable  from 'linq'

const workStore='workStore'
const workerStore = 'workerStore'

const equipmentStore = 'equipmentStore'
const workEquipmentStore = 'workEquipmentStore'
const workerEquipmentStore = 'workerEquipmentStore'

const tdmotionStore = 'tdmotionStore'
const workTdmotionStore = 'workTdmotionStore'
const workerTdmotionStore = 'workerTdmotionStore'
const workerReportStore = 'workerReportStore'

//Commmon Activity
const activityStore = 'activityStore'
const workerActivityStore = 'workerActivityStore'
const workerActivityHistoryStore = 'workerActivityHistoryStore'



export default {
  name: 'Report',
  data () {
    return {
      dialog: false,
      queryWorkerActivityHistoryList: Array,
      workerActivityName: String,
      reportData: {
        report_id: 0,
        worker_id: 0,
        work_id: 0,
        total_score: 0,
        reg_dt: '',
      }
    }    
  },
  computed: {
    ...mapGetters(workStore, [
      'GE_WORK_LIST'
    ]),    
    ...mapGetters(workerStore, [
      'GE_WORKER'
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
    ...mapGetters(tdmotionStore, [
      'GE_TDMOTION_LIST'
    ]),    
    ...mapGetters(workTdmotionStore, [
      'GE_WORK_TDMOTION_LIST'
    ]), 
    ...mapGetters(workerTdmotionStore, [
      'GE_WORKER_TDMOTION_LIST'
    ]), 
    ...mapGetters(workerReportStore, [
      'GE_WORKER_REPORT', 'GE_WORKER_REPORT_LIST'
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
    workInfo() {
      let query = Enumerable.from(this.GE_WORK_LIST).where(w=>w.work_id ===this.GE_WORKER.work_id).toArray();
      return query
    },
    workerInfo() {
      return this.GE_WORKER
    },
    guideWorkInfo() {        
      return this.queryWorkerActivity.filter(f=>f.name === '작업가이드')
    },
    orderWorkInfo() {
      return this.queryWorkerActivity.filter(f=>f.name === '작업허가서')  
    },

    queryWorkerActivity() {
      let query = Enumerable.from(this.GE_ACTIVITY_LIST).join( 
                    Enumerable.from(this.GE_WORKER_ACTIVITY_LIST).where(w=>w.worker_id === this.GE_WORKER.worker_id),
                      pk=>pk.activity_id,
                      fk=>fk.activity_id,
                      (left, right)=>({...left, ...right})
                    ).orderBy(o=>o.disp_ord).toArray()
      return query  
    },
    workAndworkerTdmotionInfo() {
      let queryWorkTdmotion =  Enumerable.from(this.GE_TDMOTION_LIST).where(w=>w.type === 'normal')
                                  .select(s=>({
                                    work_motion_id: s.motion_id,
                                    work_montion_name: s.name,
                                    type: s.type}))
                                 .join(Enumerable.from(this.GE_WORK_TDMOTION_LIST)
                                             .where(w=>w.work_id === this.GE_WORKER.work_id && w.type === 'normal'),
                                    pk=>pk.work_motion_id,
                                    fk=>fk.motion_id,
                                    (left, right)=>({...left, ...right}))
                                  .toArray()                                 
      //console.log('queryWorkTdmotion : ' + JSON.stringify(queryWorkTdmotion,null,2)) 

      let queryWorkerTdmotion = Enumerable.from(this.GE_TDMOTION_LIST)
                                  .select(s=>({
                                    worker_motion_id: s.motion_id,
                                    worker_montion_name: s.name,
                                    type: s.type}))                                 
                                 .join(Enumerable.from(this.GE_WORKER_TDMOTION_LIST)
                                             .where(w=>w.worker_id === this.GE_WORKER.worker_id),
                                    pk=>pk.worker_motion_id,
                                    fk=>fk.motion_id,
                                    (left, right)=>({...left, ...right}))
                                .toArray()
      
      //console.log('queryWorkerTdmotion : ' + JSON.stringify(queryWorkerTdmotion,null,2))
      
      let query = Enumerable.from(queryWorkTdmotion)
                            .groupJoin(Enumerable.from(queryWorkerTdmotion),
                                  pk => pk.work_motion_id,
                                  fk => fk.worker_motion_id,
                                  (left, right) => ({...left, right}))
                            .selectMany(m => m.right.defaultIfEmpty(),
                                  (left, right) => ({...left, ...right}))
                            .orderBy(o => o.disp_ord)      
                            .toArray()

      //console.log('query : ' + JSON.stringify(query,null,2))
      return query
    },

    workEqualworkerTdmotionInfo() {
      let queryWorkTdmotion =  Enumerable.from(this.GE_TDMOTION_LIST).where(w=>w.type === 'normal')
                                  .select(s=>({
                                    work_motion_id: s.motion_id,
                                    work_montion_name: s.name,
                                    type: s.type}))
                                 .join(Enumerable.from(this.GE_WORK_TDMOTION_LIST)
                                             .where(w=>w.work_id === this.GE_WORKER.work_id && w.type === 'normal'),
                                    pk=>pk.work_motion_id,
                                    fk=>fk.motion_id,
                                    (left, right)=>({...left, ...right}))
                                  .toArray()                                 
      //console.log('queryWorkTdmotion : ' + JSON.stringify(queryWorkTdmotion,null,2)) 

      let queryWorkerTdmotion = Enumerable.from(this.GE_TDMOTION_LIST)
                                  .select(s=>({
                                    worker_motion_id: s.motion_id,
                                    worker_montion_name: s.name,
                                    type: s.type}))                                 
                                 .join(Enumerable.from(this.GE_WORKER_TDMOTION_LIST)
                                             .where(w=>w.worker_id === this.GE_WORKER.worker_id),
                                    pk=>pk.worker_motion_id,
                                    fk=>fk.motion_id,
                                    (left, right)=>({...left, ...right}))
                                .toArray()
      
      //console.log('queryWorkerTdmotion : ' + JSON.stringify(queryWorkerTdmotion,null,2))
      
      let query = Enumerable.from(queryWorkTdmotion)
                            .join(Enumerable.from(queryWorkerTdmotion),
                                  pk => pk.work_motion_id,
                                  fk => fk.worker_motion_id,
                                  (left, right) => ({...left, right}))
                            .toArray()

      //console.log('query : ' + JSON.stringify(query,null,2))
      return query
    },
    queryWorkTdmotion(){
      let query =  Enumerable.from(this.GE_TDMOTION_LIST).where(w=>w.type === 'normal')
                                  .select(s=>({
                                    work_motion_id: s.motion_id,
                                    work_montion_name: s.name,
                                    type: s.type}))
                                 .join(Enumerable.from(this.GE_WORK_TDMOTION_LIST)
                                             .where(w=>(w.work_id === this.GE_WORKER.work_id && w.type === 'normal')),
                                    pk=>pk.work_motion_id,
                                    fk=>fk.motion_id,
                                    (left, right)=>({...left, ...right}))
                                  .toArray()
      //console.log('query : ' + JSON.stringify(query,null,2))
      
      return query
    },
    queryWorkerTdmotion(){
      let queryWorkerTdmotion = Enumerable.from(this.GE_TDMOTION_LIST)
                                  .select(s=>({
                                    worker_motion_id: s.motion_id,
                                    worker_montion_name: s.name,
                                    type: s.type}))                                 
                                 .join(Enumerable.from(this.GE_WORKER_TDMOTION_LIST)
                                             .where(w=>w.worker_id === this.GE_WORKER.worker_id),
                                    pk=>pk.worker_motion_id,
                                    fk=>fk.motion_id,
                                    (left, right)=>({...left, ...right}))
                                .toArray()
      return queryWorkerTdmotion
    },

    guideScore(){
      if(this.workerInfo.guide_chk)
        return 5
      else
        return 0
    },
    orderScore(){
      if(this.workerInfo.order_chk)
        return 5
      else
        return 0
    },
    protectScore(){
      let differ = this.queryWorkEquipment('protect').length - this.queryWorkEqualWorkerEquipment('protect').length
            
      if(differ > 1)
        return 0
      else if(differ > 0)
        return 5
      else  
        return 20
    },
    safetyScore(){
      let differ = this.queryWorkEquipment('safety').length - this.queryWorkEqualWorkerEquipment('safety').length
      if(differ > 1)
        return 0
      else if(differ > 0)
        return 5
      else  
        return 20
    },
    workScore(){
      let differ = this.workEqualworkerTdmotionInfo.length
      if(differ > 0){
        return Math.round( (differ/this.queryWorkTdmotion.length)*50)
      }
      else
        return 50
    },
  },
  watch: { 
  },
  mounted() {
    //this.initgQuery()
    //this.queryWorkerActivityHistory('정비작업선택')
  },
  beforeDestroy() {
  },
  methods: {
    ...mapActions(workerActivityHistoryStore, [
      'AC_WORKER_ACTIVITY_HISTORY_PUSH'
    ]),
    ...mapActions(workerReportStore, [
      'AC_WORKER_REPORT_PUSH'
    ]),

    initgQuery() {
      let query=Enumerable.from(this.GE_WORKER).toArray()
      console.log('query1 : ' + JSON.stringify(query,null,2))
    },

    queryWorkEquipment(type) {
      let query = Enumerable.from(this.GE_EQUIPMENT_LIST).join(
                Enumerable.from(this.GE_WORK_EQUIPMENT_LIST).where(w=>w.work_id === this.GE_WORKER.work_id),
                pk=>pk.equipment_id,
                fk=>fk.equipment_id,
                (left, right) =>({...left, ...right})
              ).where(w=>w.type === type).orderBy(o=>o.disp_ord).toArray()
      return query
    },
    queryWorkerEquipment(type) {
      let query = Enumerable.from(this.GE_EQUIPMENT_LIST).join(
                Enumerable.from(this.GE_WORKER_EQUIPMENT_LIST).where(w=>w.worker_id === this.GE_WORKER.worker_id),
                pk=>pk.equipment_id,
                fk=>fk.equipment_id,
                (left, right) =>({...left, ...right})
              ).where(w=>w.type === type).orderBy(o=>o.disp_ord).toArray()
      return query
    },
    queryWorkAndWorkerEquipment(type){
      let query = Enumerable.from(this.queryWorkEquipment(type))
                            .groupJoin(Enumerable.from(this.queryWorkerEquipment(type)),
                                  pk => pk.equipment_id,
                                  fk => fk.equipment_id,
                                  (left, right) => ({...left, right}))
                            .selectMany(m => m.right.defaultIfEmpty(),
                                  (left, right) => ({...left, ...right}))
                            .toArray()   

        //console.log('query : ' + JSON.stringify(query,null,2));
        return query
    },
    queryWorkEqualWorkerEquipment(type){
      let query = Enumerable.from(this.queryWorkEquipment(type))
                            .join(Enumerable.from(this.queryWorkerEquipment(type)),
                                  pk => pk.equipment_id,
                                  fk => fk.equipment_id,
                                  (left, right) => ({...left, right}))
                            .toArray() 

        //console.log('query : ' + JSON.stringify(query,null,2));
        return query
    },
    queryWorkerActivityHistory(type) {
        let query = Enumerable.from(this.GE_ACTIVITY_LIST).where(w=>w.name===type)
                                .join(Enumerable.from(this.GE_WORKER_ACTIVITY_LIST).where(w=>w.worker_id === this.GE_WORKER.worker_id),
                                    pk=>pk.activity_id,
                                    fk=>fk.activity_id,
                                    (left, right)=>({...left, ...right})                
                                ).join(Enumerable.from(this.GE_WORKER_ACTIVITY_HISTORY_LIST).where(w=>w.worker_id === this.GE_WORKER.worker_id),
                                    pk=>pk.activity_id,
                                    fk=>fk.activity_id,
                                    (left, right)=>({...left, ...right})              
                                ).orderBy(o=>o.activity_id).toArray() 
        console.log('query : ' + JSON.stringify(query,null,2));
        
        this.queryWorkerActivityHistoryList = query
    },
    openDialog(type){
       this.dialog = true
       this.workerActivityName = type 
       this.queryWorkerActivityHistory(type) 
    },
    submitReport(){
      console.log('submitReport')
      if(this.GE_WORKER_REPORT_LIST.filter(f=>( f.work_id === this.workInfo[0].work_id && f.worker_id === this.workerInfo.worker_id)).length === 0){
        this.reportData.report_id = Math.max(...(this.GE_WORKER_REPORT_LIST.map(m => m.report_id))) + 1
        this.reportData.worker_id = this.workerInfo.worker_id
        this.reportData.work_id = this.workInfo[0].work_id
        this.reportData.total_score = this.totalScore()
        this.reportData.reg_dt = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
        this.AC_WORKER_REPORT_PUSH(this.reportData)
        alert('제출했습니다.')
        return
      }else{
        alert('이미 제출했습니다.')
        return
      }
    },

    totalScore() {
      return this.guideScore + this.orderScore + this.protectScore + this.safetyScore + this.workScore
    }     
  },  

}
</script>

<style scoped>

table {
    border: 1px solid #dddddd;
}

table td {
    border: 1px solid #dddddd;
}
</style>