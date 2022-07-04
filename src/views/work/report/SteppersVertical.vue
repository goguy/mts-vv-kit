<template>
  <v-container
    id="SteppersVertical"
    tag="section"
  >

      <v-stepper
      v-model="e6"
      vertical
      multiple
    >
      <v-stepper-step
        :complete="e6 > 3"
        step="3"
        editable
      >
        정비작업선택 정보
        <!--<small>Summarize if needed</small>-->
      </v-stepper-step>

      <v-stepper-content step="3">
        <v-row
          class="justify-center"
        >
          <v-col
            cols="12"
            md="6"
          >
            <v-card
              class="py-12 px-6"
              color="grey lighten-5"
              flat
            >
              <v-theme-provider 
              dark
              >
                <div class="text-center">
                  <v-avatar
                    color="primary"
                    size="88"
                  >
                  <span  
                    class="white--text text-h5"
                    v-text="workInfo[0].time" />
                  </v-avatar>
                </div>
              </v-theme-provider>

              <v-card-title
                class="justify-center font-weight-black text-uppercase"
                v-text="workInfo[0].name"
              ></v-card-title>

              <v-card-text
                class="text-center subtitle-1"
                v-text="workInfo[0].rmk"
              >
              </v-card-text>
              
            </v-card>
          </v-col>
        </v-row>

        <div class="divRight">
          <v-btn
            color="primary"
            dark
            @click="dialog = true"
          >
            상세보기
          </v-btn>
        </div>

      </v-stepper-content>

      <v-stepper-step
        :complete="e6 > 4"
        step="4"
        editable
      >
        교육생 정보
      </v-stepper-step>

      <v-stepper-content step="4">
        <v-row
          class="justify-center"
        >
          <v-col
            cols="12"
            md="4"
          >

            <v-card
              class="mx-auto"
              outlined
            >
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="text-overline mb-4">
                    ID : {{workerInfo.worker_id}}
                  </div>
                  <v-list-item-title class="text-h5 mb-1">
                    {{workerInfo.name}}
                  </v-list-item-title>
                  <v-list-item-subtitle> 등록일 : {{workerInfo.reg_dt}}</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar
                  tile
                  size="80"
                  color="grey"
                ></v-list-item-avatar>
              </v-list-item>
            </v-card>

          </v-col>
        </v-row>

        <div class="divRight">
          <v-btn
            color="primary"
            dark
            @click="dialog = true"
          >
            상세보기
          </v-btn>
        </div>

      </v-stepper-content>

      <v-stepper-step
        :complete="e6 > 6"
        step="6"
        editable
      >
        작업가이드 정보
      </v-stepper-step>

      <v-stepper-content step="6">
        <v-card
          v-if="workerActivityName"
        >
          <v-card-title>
            {{workerActivityName}}
          </v-card-title>

          <v-card-subtitle>
            {{workerActivityRmk}}
          </v-card-subtitle>        
          <v-card-text
            v-if="workerActivityType === 'agree'"
          >
            작업가이드의 동의했습니다.
          </v-card-text>
        </v-card>
        <div class="divRight">
          <v-btn
            color="primary"
            dark
            @click="dialog = true"
          >
            상세보기
          </v-btn>
        </div>

      </v-stepper-content>

      <v-stepper-step 
        :complete="e6 > 7"      
        step="7"
        editable
        >
        작업허가서 정보
      </v-stepper-step>
      <v-stepper-content step="7">
        <v-card
        >
          <v-card-title>
            {{workerActivityName}}
          </v-card-title>

          <v-card-subtitle>
            {{workerActivityRmk}}
          </v-card-subtitle>        
          <v-card-text
            v-if="workerActivityType === 'agree'"
          >
            작업허가서의 동의했습니다.
          </v-card-text>
        
        </v-card>
        <div class="divRight">
          <v-btn
            color="primary"
            dark
            @click="dialog = true"
          >
            상세보기
          </v-btn>
        </div>
      </v-stepper-content>
    
      <v-stepper-step 
        :complete="e6 > 8"      
        step="8"
        editable
        >
        개인장비보호구 정보
      </v-stepper-step>
      <v-stepper-content step="8">
      
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-card>
            <v-card-text>
              <base-subheading subheading="보호구 개인장비 표준" />

              <v-list>
                <template v-for="item in workEquipmentList('protect')">
                  <v-list-item
                    :key="item.name"
                  >
                    <v-list-item-avatar>
                      <v-icon>mdi-bike</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-title v-text="item.name"></v-list-item-title>
                  </v-list-item>
                </template>
              </v-list>
          
            </v-card-text>
          </v-card>
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
          <v-card>
            <v-card-text>
              <base-subheading subheading="보호구 개인장비 선택" />
              <div v-if="workerEquipmentList('protect').length > 0">
                <v-list>
                  <template v-for="item in workerEquipmentList('protect')">
                    <v-list-item                  
                      :key="item.name"
                    >
                      <v-list-item-avatar>
                        <v-icon>mdi-bike</v-icon>                  
                      </v-list-item-avatar>
                      <v-list-item-title v-text="item.name"></v-list-item-title>
                    </v-list-item>
                  </template>
                </v-list>
              </div>
              <div v-else>
                해당자료없음
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

        <div class="divRight">
          <v-btn
            color="primary"
            dark
            @click="dialog = true"
          >
            상세보기
          </v-btn>
        </div>
      
      </v-stepper-content>

      <v-stepper-step 
        :complete="e6 > 9"      
        step="9"
        editable
        >
        안전장비 정보
      </v-stepper-step>
      <v-stepper-content step="9">

      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-card>
            <v-card-text>
              <base-subheading subheading="정비작업 안전장비 표준" />

              <v-list>
                <template v-for="item in workEquipmentList('safety')">
                  <v-list-item
                    :key="item.name"
                  >
                    <v-list-item-avatar>
                      <v-icon>mdi-bike</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-title v-text="item.name"></v-list-item-title>
                  </v-list-item>
                </template>
              </v-list>
          
            </v-card-text>
          </v-card>
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
          <v-card>
            <v-card-text>
              <base-subheading subheading="정비작업 안전장비 선택" />
              <div v-if="workerEquipmentList('safety').length > 0">
                <v-list>
                  <template v-for="item in workerEquipmentList('safety')">
                    <v-list-item                  
                      :key="item.name"
                    >
                      <v-list-item-avatar>
                        <v-icon>mdi-bike</v-icon>                  
                      </v-list-item-avatar>
                      <v-list-item-title v-text="item.name"></v-list-item-title>
                    </v-list-item>
                  </template>
                </v-list>
              </div>
              <div v-else>
                해당자료없음
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

        <div class="divRight">
          <v-btn
            color="primary"
            dark
            @click="dialog = true"
          >
            상세보기
          </v-btn>
        </div>

      </v-stepper-content>

      <v-stepper-step 
        :complete="e6 > 10"      
        step="10"
        editable
        >
        정비작업 정보
      </v-stepper-step>
      <v-stepper-content step="10">

        <v-data-table
          :headers="headersWATI"
          :items="workAndworkerTdmotionInfo"
          :items-per-page="5"
          class="elevation-1"
        ></v-data-table>              

        <div class="divRight">
          <v-btn
            color="primary"
            dark
            @click="dialog = true"
          >
            상세보기
          </v-btn>
        </div>

      </v-stepper-content>

    </v-stepper>
    <v-row justify="center">
        <v-dialog
          v-model="dialog"
          persistent
          max-width="900"
        >
          <v-card>
            <v-card-title class="text-h5">
              {{workerActivityName}}
            </v-card-title>
            <v-card-text>

              <v-data-table
                :headers="headersWAHL"
                :items="filterWorkerActivityHistoryList"
                :items-per-page="5"
                class="elevation-1"
              ></v-data-table>              
              
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="green darken-1"
                text
                @click="dialog = false"
              >
                close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
    </v-row>
  </v-container>

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

//Commmon Activity
const activityStore = 'activityStore'
const workerActivityStore = 'workerActivityStore'
const workerActivityHistoryStore = 'workerActivityHistoryStore'

export default {
  name: 'ReportWork',
  data () {
    return {
      e6: 0,
      queryWorkerActivityList: Array,
      filterWorkerActivityList: Array,
      queryWorkerActivityHistoryList: Array,
      filterWorkerActivityHistoryList: Array,
      workerActivityName: String,
      workerActivityRmk: String,
      workerActivityType: String,
      dialog: false,      
      headersWATI: [
        {
          text: '2D모션ID',
          align: 'start',
          sortable: false,
          value: 'work_motion_id',
        },
        { text: '2D모션명', value: 'work_montion_name' },
        { text: '순서', value: 'disp_ord' },
        { text: '교육생2D모션ID', value: 'worker_motion_id' },
        { text: '2D모션명', value: 'worker_montion_name' },
      ],
      headersWAHL: [
        {
          text: '활동ID',
          align: 'start',
          sortable: false,
          value: 'activity_id',
        },
        { text: '작업자ID', value: 'worker_id' },
        { text: '도메인', value: 'domain' },
        { text: '도메인ID', value: 'domain_id' },
        { text: '타입', value: 'type' },
        { text: '상태', value: 'state' },
        { text: '등록일', value: 'reg_dt' },
      ],
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
                            .toArray();   

      //console.log('query : ' + JSON.stringify(query,null,2))


      return query
    },    
  },
  watch: {
    e6(newE6,oldE6) {
      console.log('newE6 : ' + newE6) 
      console.log('oldE6 : ' + oldE6) 
      this.switchSetFilterData(newE6)
    },
  
  },
  mounted() {
    this.e6 = 3
    this.initSetData()      
  },
  beforeDestroy() {
    this.activityWorker(this.GE_WORKER.worker_id, this.getActivityId('작업보고서'))
  },

  methods: {
    ...mapActions(workerActivityHistoryStore, [
      'AC_WORKER_ACTIVITY_HISTORY_PUSH'
    ]),
    ...mapActions(workerActivityStore, [
      'AC_WORKER_ACTIVITY_LIST'
    ]),
    initSetData() {
      let query
      
      query = Enumerable.from(this.GE_ACTIVITY_LIST).join( 
                    Enumerable.from(this.GE_WORKER_ACTIVITY_LIST).where(w=>w.worker_id === this.GE_WORKER.worker_id),
                      pk=>pk.activity_id,
                      fk=>fk.activity_id,
                      (left, right)=>({...left, ...right})
                    ).orderBy(o=>o.disp_ord).toArray()
      
      this.queryWorkerActivityList = query
      //console.log('query1 : ' + JSON.stringify(query,null,2))
      //console.log('this.queryWorkerActivityList : ' + JSON.stringify(this.queryWorkerActivityList,null,2))
    
      query = Enumerable.from(this.GE_WORKER_ACTIVITY_LIST).where(w=>w.worker_id === this.GE_WORKER.worker_id).join(
                Enumerable.from(this.GE_WORKER_ACTIVITY_HISTORY_LIST).where(w=>w.worker_id === this.GE_WORKER.worker_id),
                pk=>pk.activity_id,
                fk=>fk.activity_id, 
                (left, right)=>({...left, ...right})
              ).orderBy(o=>o.activity_id).toArray()
      
      this.queryWorkerActivityHistoryList = query
      //console.log(' query2 : ' + JSON.stringify(query,null,2))
      //console.log('this.queryWorkerActivityHistoryList : ' + JSON.stringify(this.queryWorkerActivityHistoryList,null,2))
    },
    filterWorkerActivity(name) {
      try {
        this.filterWorkerActivityList = this.queryWorkerActivityList.filter(f=>f.name === name)
        this.workerActivityName = this.filterWorkerActivityList[0].name
        this.workerActivityRmk = this.filterWorkerActivityList[0].rmk
        this.workerActivityType = this.filterWorkerActivityList[0].type
        //console.log('this.filterWorkerActivityList : ' + JSON.stringify(this.filterWorkerActivityList,null,2))      
        
      } catch (error) {
        console.log('filterWorkerActivity - error : ' + error)
      }                  
    },
    filterWorkerActivityHistory(workerId, activityId) {
      try {
        this.filterWorkerActivityHistoryList = this.queryWorkerActivityHistoryList.filter(f=>(f.worker_id === workerId && f.activity_id === activityId))
        console.log('this.filterWorkerActivityHistoryList : ' + JSON.stringify(this.filterWorkerActivityHistoryList,null,2))        
      } catch (error) {
        console.log('filterWorkerActivityHistory - error : ' + error)        
      }
    },
    switchSetFilterData(step) {
      try {
        let name
        switch(step) {
          case '3': 
            name = '정비작업선택'
            break
          case '4':
            name = '교육생정보입력'
            break
          case '6':
            name = '작업가이드'
            break
          case '7':
            name = '작업허가서'
            break
          case '8':
            name = '보호구선택'
            break
          case '9': 
            name = '안전장비선택'
            break
          case '10': 
            name = '작업하기'
            break
          default:
            name = '정비작업선택'
        }
        console.log('switchSetFilterData : ' +name);
        this.filterWorkerActivity(name)
        this.filterWorkerActivityHistory(this.filterWorkerActivityList[0].worker_id, this.filterWorkerActivityList[0].activity_id)  
        
      } catch (error) {
        console.log('switchSetFilterData - error : ' + error)        
      }
    },  
    workEquipmentList(type) {
      let query = Enumerable.from(this.GE_EQUIPMENT_LIST).join(
                Enumerable.from(this.GE_WORK_EQUIPMENT_LIST).where(w=>w.work_id === this.GE_WORKER.work_id),
                pk=>pk.equipment_id,
                fk=>fk.equipment_id,
                (left, right) =>({...left, ...right})
              ).where(w=>w.type === type).orderBy(o=>o.disp_ord).toArray()
      return query
    },
    workerEquipmentList(type) {
      let query = Enumerable.from(this.GE_EQUIPMENT_LIST).join(
                Enumerable.from(this.GE_WORKER_EQUIPMENT_LIST).where(w=>w.worker_id === this.GE_WORKER.worker_id),
                pk=>pk.equipment_id,
                fk=>fk.equipment_id,
                (left, right) =>({...left, ...right})
              ).where(w=>w.type === type).orderBy(o=>o.disp_ord).toArray()
      return query
    },
    activityWorker(workerId, activityId) {
      try {
        this.workerActivityList = this.GE_WORKER_ACTIVITY_LIST
        this.initActivityWoker(workerId, activityId)
        this.workerActivityList.push({worker_id: workerId, activity_id: activityId});
        this.AC_WORKER_ACTIVITY_LIST(this.workerActivityList);  
        this.workerActivityList = [];  
        console.log('this.GE_WORKER_ACTIVITY_LIST : ' + JSON.stringify(this.GE_WORKER_ACTIVITY_LIST,null,2))      
      } catch (error) {      
        console.log('activityWorker - error : ' + error)
      }

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
      try {
        this.AC_WORKER_ACTIVITY_HISTORY_PUSH({
            activity_id: activityId,
            worker_id: workerId,
            domain: domain,
            domain_id: domainId,
            type: type,
            state: state,
            reg_dt: new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, ''),
        })
        console.log('this.GE_WORKER_ACTIVITY_HISTORY_LIST : ' + JSON.stringify(this.GE_WORKER_ACTIVITY_HISTORY_LIST,null,2))
        
      } catch (error) {
        console.log('historyActivityWorker - error : ' + error)
      }
    },      
  },
  
}
</script>
<style scoped>
.divRight{
  width:100%;
  text-align: right;
}
</style>