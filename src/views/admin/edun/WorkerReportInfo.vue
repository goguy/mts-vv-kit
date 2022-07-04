<template>
  <v-container
    id="worker_report_info"
    fluid
    tag="section"
  >
    <!-- 검색영역 -->
    <v-row justify="center">
      <v-col
        cols="12"
      >
        <v-card>
          <!--
          <v-card-text>
            <base-subheading subheading="Search Area" />          
          </v-card-text>
          -->
          <v-card-text>

            <v-form>
              <v-row>
                <v-col
                  cols="12"
                  md="3"
                >
                  <v-text-field
                    v-model="searchParam.keyword"
                    append-icon="mdi-magnify"
                    label="검색어"
                    class="purple-input"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="3"
                >
                  <v-menu
                    ref="calrMenu"
                    v-model="calrMenu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="searchParam.startDate"
                        label="등록일"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="searchParam.startDate"
                      :active-picker.sync="activePicker"
                      @change="calrSave"
                    ></v-date-picker>
                  </v-menu>
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                  class="text-right"
                >
                  <v-btn
                    color="success"
                    class="mt-5"
                    @click="getSearchData"
                  >
                    Search
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>

      </v-col>
    </v-row>

    <!-- 데이터영역 -->
    <v-row justify="center">
      <v-col
        cols="12"
      >
        <v-data-table
          caption="수강생 보고서 정보"
          :headers="headers"
          :items="workerReportList"
        >
        <template 
          v-slot:item.actions="{ item }"
        >  
          <v-icon
            small
            class="mr-2"
            @click="dialogReport(item)"
          >
            mdi-pencil
          </v-icon>                      
        </template>        
        </v-data-table>
      </v-col>
    </v-row>

    <v-overlay
      :value="overlay"
    > 
      <v-dialog
        v-model="dialog"
        max-width="1100px"
      >
        <v-card>
            <v-card-title class="text-h5">
                REPORT
            </v-card-title>

            <v-card-text>
            <v-row>
                <v-col cols="12">

                  <v-sheet
                      class="mt-5">      
                    <div class="text-right">문서번호[ {{ getWorkInfo.work_id }}-{{ getWorkerInfo.worker_id }} ]</div>
                    <v-simple-table>
                      <thead>
                        <tr>
                          <td class="text-left" style="width:20%">
                            수강명
                          </td>
                          <td class="text-left" colspan="3">
                            {{ getWorkInfo.name }}
                          </td>
                        </tr>
                        <tr>
                          <td class="text-left">
                            수강생
                          </td>
                          <td class="text-left">
                            {{ getWorkerInfo.name }}
                          </td>
                          <td class="text-left" style="width:20%">
                            수강일
                          </td>
                          <td class="text-left">
                            {{ getWorkerInfo.reg_dt }}  
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
                              <v-icon color="blue" v-if="getWorkerInfo.guide_chk">
                                mdi-check-bold
                              </v-icon>
                              <v-icon color="red" v-else>
                                mdi-alpha-x
                              </v-icon>
                          </p>
                          <p>
                            2. 작업허가서
                              <v-icon color="blue" v-if="getWorkerInfo.order_chk">
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
                                  v-for="item in workAndworkerTdmotionInfo()"
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

                </v-col>
            </v-row>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                color="green darken-1"
                text
                @click="closeDialog()"
                >
                close
                </v-btn>
            </v-card-actions>
        </v-card>
      </v-dialog>
    </v-overlay>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Enumerable  from 'linq'

const workStore = 'workStore'
const workerStore = 'workerStore'


const equipmentStore = 'equipmentStore'
const workEquipmentStore = 'workEquipmentStore'
const workerEquipmentStore = 'workerEquipmentStore'

const tdmotionStore = 'tdmotionStore'
const workTdmotionStore = 'workTdmotionStore'
const workerTdmotionStore = 'workerTdmotionStore'
const workerReportStore = 'workerReportStore'


  export default {
    name: 'worker_report_info',
    data () {
      return {
        dialog: false,
        headers: [
            {
            text: '수강생명',
            align: 'start',
            sortable: false,
            value: 'worker_name',
            },
            { text: '수강생ID', value: 'worker_id' },
            { text: '정비작업명', value: 'work_name' },
            { text: '정비작업ID', value: 'work_id' },
            { text: '등록일', value: 'reg_dt' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        overlay: false,
        activePicker: null,
        calrDate: null,
        calrMenu: false,

        searchParam: {
          keyword: '',
          startDate: '',
        },
        workerReportList: [],
        selectItem: {},
        getWorkInfo: {},
        getWorkerInfo: {},
      }
    },
    computed: {
      ...mapGetters(workStore, [
        'GE_WORK_LIST'
      ]),    
      ...mapGetters(workerStore, [
        'GE_WORKER', 'GE_WORKER_LIST'
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
        'GE_WORKER_REPORT_LIST'
      ]),
      
      guideScore(){
        if(this.getWorkerInfo.guide_chk)
          return 5
        else
          return 0
      },
      orderScore(){
        if(this.getWorkerInfo.order_chk)
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
        let differ = this.workEqualworkerTdmotionInfo().length
        if(differ > 0){
          return Math.round( (differ/this.queryWorkTdmotion().length)*50 )
        }
        else
          return 50
      },
      
    },
    watch: {
      calrMenu (val) {
        val && setTimeout(() => (this.activePicker = 'DATE'))
      },
    },    
    mounted() {
        this.getList()
        //this.init()  
    },
    methods: {
      ...mapActions(workerReportStore, [
        'AC_WORKER_REPORT', 'AC_WORKER_REPORT_PUSH', 'AC_WORKER_REPORT_LIST' 
      ]),

      getSearchData() {
        this.getList()  
        if(this.searchParam['keyword']){        
            this.workerReportList = this.workerReportList.filter(f=>f.worker_name.includes(this.searchParam['keyword']) )
        }    
        if(this.searchParam['startDate']){
          //console.log('getSearchData startDate : ' + this.searchParam['startDate'])
          this.workerReportList = this.workerReportList.filter(f=>f.reg_dt >= this.searchParam['startDate'])
        }
        //console.log('getSearchData')  
      },

      getList() {
            let query = Enumerable.from(this.GE_WORK_LIST)
                                .select(s=>({
                                    work_id: s.work_id,
                                    work_name: s.name
                                    }))
                                .join(Enumerable.from(this.GE_WORKER_LIST),
                                    pk=>pk.work_id,
                                    fk=>fk.work_id,
                                    (left, right) =>({...left, ...right}))
                                .select(s=>({
                                    worker_id: s.worker_id,
                                    worker_name: s.name,
                                    work_name: s.work_name,
                                    work_id: s.work_id }))    
                                .join(Enumerable.from(this.GE_WORKER_REPORT_LIST),
                                    pk=>pk.worker_id,
                                    fk=>fk.worker_id,
                                    (left, right) =>({...left, ...right}))
                                .toArray()
          
            this.workerReportList = query
      },

      
      calrSave (date) {
        this.$refs.calrMenu.save(date)
      },
      dialogReport(item){
        console.log('item : ' + JSON.stringify(item,null,2))
        
        this.setWorkInfo(item.work_id)
        this.setWorkerInfo(item.worker_id)
        

        this.dialog=true
        this.overlay=true
        this.selectItem = Object.assign({}, item)


      },
      
      setWorkInfo(id){
        this.getWorkInfo = this.GE_WORK_LIST.filter(f=> f.work_id === id)[0]
      },
      setWorkerInfo(id){
        this.getWorkerInfo = this.GE_WORKER_LIST.filter(f=>f.worker_id === id)[0]  
      },

      closeDialog() {
        this.dialog=false
        this.overlay=false
      },


      queryWorkEquipment(type) {
        let query = Enumerable.from(this.GE_EQUIPMENT_LIST).join(
                  Enumerable.from(this.GE_WORK_EQUIPMENT_LIST).where(w=>w.work_id === this.getWorkerInfo.work_id),
                  pk=>pk.equipment_id,
                  fk=>fk.equipment_id,
                  (left, right) =>({...left, ...right})
                ).where(w=>w.type === type).orderBy(o=>o.disp_ord).toArray()
        return query
      },
      queryWorkerEquipment(type) {
        let query = Enumerable.from(this.GE_EQUIPMENT_LIST).join(
                  Enumerable.from(this.GE_WORKER_EQUIPMENT_LIST).where(w=>w.worker_id === this.getWorkerInfo.worker_id),
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
                              .toArray();   

          //console.log('query : ' + JSON.stringify(query,null,2));
          return query
      },
      queryWorkEqualWorkerEquipment(type){
        let query = Enumerable.from(this.queryWorkEquipment(type))
                              .join(Enumerable.from(this.queryWorkerEquipment(type)),
                                    pk => pk.equipment_id,
                                    fk => fk.equipment_id,
                                    (left, right) => ({...left, right}))
                              .toArray();   

          //console.log('query : ' + JSON.stringify(query,null,2));
          return query
      },

      workAndworkerTdmotionInfo() {
        let queryWorkTdmotion =  Enumerable.from(this.GE_TDMOTION_LIST).where(w=>w.type === 'normal')
                                    .select(s=>({
                                      work_motion_id: s.motion_id,
                                      work_montion_name: s.name,
                                      type: s.type}))
                                  .join(Enumerable.from(this.GE_WORK_TDMOTION_LIST)
                                              .where(w=>w.work_id === this.getWorkerInfo.work_id && w.type === 'normal'),
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
                                              .where(w=>w.worker_id === this.getWorkerInfo.worker_id),
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
                                              .where(w=>w.work_id === this.getWorkerInfo.work_id && w.type === 'normal'),
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
                                              .where(w=>w.worker_id === this.getWorkerInfo.worker_id),
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
        let queryWorkTdmotion =  Enumerable.from(this.GE_TDMOTION_LIST).where(w=>w.type === 'normal')
                                    .select(s=>({
                                      work_motion_id: s.motion_id,
                                      work_montion_name: s.name,
                                      type: s.type}))
                                  .join(Enumerable.from(this.GE_WORK_TDMOTION_LIST)
                                              .where(w=>w.work_id === this.getWorkerInfo.work_id && w.type === 'normal'),
                                      pk=>pk.work_motion_id,
                                      fk=>fk.motion_id,
                                      (left, right)=>({...left, ...right}))
                                    .toArray()                                 
        return queryWorkTdmotion
      },
      queryWorkerTdmotion(){
        let queryWorkerTdmotion = Enumerable.from(this.GE_TDMOTION_LIST)
                                    .select(s=>({
                                      worker_motion_id: s.motion_id,
                                      worker_montion_name: s.name,
                                      type: s.type}))                                 
                                  .join(Enumerable.from(this.GE_WORKER_TDMOTION_LIST)
                                              .where(w=>w.worker_id === this.getWorkerInfo.worker_id),
                                      pk=>pk.worker_motion_id,
                                      fk=>fk.motion_id,
                                      (left, right)=>({...left, ...right}))
                                  .toArray()
        return queryWorkerTdmotion
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