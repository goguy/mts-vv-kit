<template>
  <v-container
    id="WorkerActivityInfo"
    fluid
    tag="section"
  >
    <!-- 검색영역 -->
    <v-row>
      <v-col
        cols="12"
      >
        <v-card>
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
                        clearable
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

    <!-- 리스트영역 -->
    <v-row>
      <v-col
        cols="12"
      >

        <v-data-table
            :headers="headers"
            :items="workerActivityList"
            sort-by="worker_id"
            class="elevation-1"
        >
            <template v-slot:item.actions="{ item }">
                <v-icon
                    small
                    class="mr-2"
                    @click="detailItem(item)"
                >
                    mdi-pencil
                </v-icon>
            </template>
        </v-data-table>

      </v-col>
    </v-row>
    <v-dialog
    v-model="dialog"
    min-width="700px"
    >
        <v-card>
            <v-card-title class="text-h5">
                {{this.detailItems.type}} 상세
            </v-card-title>

            <v-card-text>
            <v-row>
                <v-col
                    cols="12"
                    md="4"
                >
                    <v-data-table
                    caption="정비작업 활동"
                    :headers="headersQueyActy"
                    :items="queryActivity"
                    hide-default-footer
                    disable-pagination
                    class="elevation-1"
                    >
                        <template #item="{ item, index, headers }">
                            <tr>
                            <td v-for="(n, i) in headers" :key="i">
                                {{ n.value === 'index' ? index+1 : item[n.value] }}
                            </td>
                            </tr>
                        </template>                 
                    </v-data-table>              

                </v-col>
                <v-col
                    cols="12"
                    md="4"
                >
                    <v-data-table
                    caption="교육자 선택 활동"
                    :headers="headersQueyWorrActy"
                    :items="queryWorkerActivity"
                    hide-default-footer
                    disable-pagination
                    class="elevation-1"
                    >
                        <template v-slot:item.actions="{ item }">
                            <v-icon
                                small
                                class="mr-2"
                                @click="diagDetailItem(item)"
                            >
                                mdi-pencil
                            </v-icon>
                        </template>                    
                    </v-data-table>

                </v-col>

                <v-col
                    cols="12"
                    md="4"
                >
                    <v-data-table
                    caption="정비작업 활동과 교육자 선택 활동"
                    :headers="headersQueyWorkAndWorrActy"
                    :items="queryWorkAndWorkerActivity"
                    hide-default-footer
                    disable-pagination
                    class="elevation-1"
                    ></v-data-table>              

                </v-col>
            </v-row>
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

    <v-dialog
    v-model="dialogDetail"
    max-width="700px"
    >
        <v-card>
            <v-card-title class="text-h5">
                상세
            </v-card-title>

            <v-card-text>
            <v-row>
                <v-col
                    cols="12"
                    md="12"
                >
                    <v-data-table
                    caption="정비작업 활동 HISTORY"
                    :headers="headersQueyWorrActyHisy"
                    :items="queryWorkerActivityHistory"
                    class="elevation-1"
                    >
                        <template #item="{ item, index, headers }">
                            <tr>
                            <td v-for="(n, i) in headers" :key="i">
                                {{ n.value === 'index' ? index+1 : item[n.value] }}
                            </td>
                            </tr>
                        </template>                 
                    </v-data-table>              
                </v-col>
            </v-row>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                color="green darken-1"
                text
                @click="dialogDetail = false"
                >
                close
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>



  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import Enumerable  from 'linq'

const workStore = 'workStore'
const workerStore = 'workerStore'
const activityStore = 'activityStore'
const workerActivityStore = 'workerActivityStore'
const workerActivityHistoryStore = 'workerActivityHistoryStore'


export default {
    name: 'WorkerActivityInfo',
    data () {
      return {
        dialog: false,
        dialogDetail: false,
        headers: [
            {
            text: '교육자명',
            align: 'start',
            sortable: false,
            value: 'worker_name',
            },
            { text: '교육자ID', value: 'worker_id' },
            { text: '정비작업명', value: 'work_name' },
            { text: '정비작업ID', value: 'work_id' },
            { text: '활동명', value: 'name' },
            { text: '활동ID', value: 'activity_id' },
            { text: '타입', value: 'type' },
            { text: '등록일', value: 'reg_dt' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        headersQueyActy: [
            { text: '번호', value: 'index' },
            { text: '활동명', value: 'name' },
            { text: '활동ID', value: 'activity_id' },
            { text: '상위ID', value: 'parent_id' },
            { text: '타입', value: 'type' },
        ],
        headersQueyWorrActy: [
            { text: '정비작업명', value: 'work_name' },
            { text: '정비작업ID', value: 'work_id' },
            { text: '활동명', value: 'name' },
            { text: '활동ID', value: 'activity_id' },
            { text: '타입', value: 'type' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        headersQueyWorkAndWorrActy: [
            { text: '활동명', value: 'name' },
            { text: '활동ID', value: 'activity_id' },
            { text: '타입', value: 'type' },
            { text: '정비작업명', value: 'work_name' },
            { text: '정비작업ID', value: 'work_id' },
            { text: '교육자ID', value: 'worker_id' },
        ],
        headersQueyWorrActyHisy: [
            { text: '정비작업명', value: 'work_name' },
            { text: '정비작업ID', value: 'work_id' },
            { text: '활동명', value: 'name' },
            { text: '활동ID', value: 'activity_id' },
            { text: '교육자ID', value: 'worker_id' },
            { text: '교육자', value: 'worker_name' },
            { text: '타입', value: 'type' },
        ],
        activePicker: null,
        calrDate: null,
        calrMenu: false,

        searchParam: {
          keyword: '',
          startDate: '',
        },
        workerActivityList: [],
        detailItems: {},
        diagDetailItems: {},

      }
    },    
    mounted() {
        this.getList()
        //this.init()  
    },
    computed: {
        ...mapGetters(workStore, [
            'GE_WORK', 'GE_WORK_LIST'
        ]),    
        ...mapGetters(workerStore, [
            'GE_WORKER', 'GE_WORKER_LIST'
        ]),    
        ...mapGetters(activityStore, [
            'GE_ACTIVITY', 'GE_ACTIVITY_LIST'
        ]),    
        ...mapGetters(workerActivityStore, [
            'GE_WORKER_ACTIVITY', 'GE_WORKER_ACTIVITY_LIST'
        ]),    
        ...mapGetters(workerActivityHistoryStore, [
            'GE_WORKER_ACTIVITY_HISTORY_LIST'
        ]),    

        queryActivity() {
            let query =  Enumerable.from(this.GE_ACTIVITY_LIST)
                                   .toArray()                                 
            //console.log('queryActivity : ' + JSON.stringify(query,null,2)) 
            return query
        },
        queryWorkerActivity() {
             let query = Enumerable.from(this.GE_WORK_LIST)
                                .where(w=>w.work_id===this.detailItems.work_id )
                                .select(s=>({
                                    work_id: s.work_id,
                                    work_name: s.name
                                    }))
                                .join(Enumerable.from(this.GE_WORKER_LIST)
                                                .where(w=>w.worker_id===this.detailItems.worker_id),
                                    pk=>pk.work_id,
                                    fk=>fk.work_id,
                                    (left, right) =>({...left, ...right}))
                                .select(s=>({
                                    worker_id: s.worker_id,
                                    worker_name: s.name,
                                    reg_dt: s.reg_dt,
                                    work_name: s.work_name,
                                    work_id: s.work_id }))    
                                .join(Enumerable.from(this.GE_WORKER_ACTIVITY_LIST),
                                    pk=>pk.worker_id,
                                    fk=>fk.worker_id,
                                    (left, right) =>({...left, ...right}))
                                .join(Enumerable.from(this.GE_ACTIVITY_LIST),
                                    pk=>pk.activity_id,
                                    fk=>fk.activity_id,
                                    (left, right) =>({...left, ...right}))
                                .toArray()
                                    
            //console.log('queryWorkerActivity : ' + JSON.stringify(query,null,2))
            return query   
        },
        queryWorkAndWorkerActivity() {
            let query = Enumerable.from(this.queryActivity)
                                    .groupJoin(Enumerable.from(this.queryWorkerActivity),
                                        pk => pk.activity_id,
                                        fk => fk.activity_id,
                                        (left, right) => ({...left, right}))
                                    .selectMany(m => m.right.defaultIfEmpty(),
                                        (left, right) => ({...left, ...right}))
                                    .toArray() 

            //console.log('queryWorkAndWorkerActivity : ' + JSON.stringify(query,null,2))
            return query
        },       
        queryWorkerActivityHistory() {
            let query = Enumerable.from(this.GE_WORK_LIST)
                                .where(w=>w.work_id===this.diagDetailItems.work_id )
                                .select(s=>({
                                    work_id: s.work_id,
                                    work_name: s.name
                                    }))
                                .join(Enumerable.from(this.GE_WORKER_LIST)
                                                .where(w=>w.worker_id===this.diagDetailItems.worker_id),
                                    pk=>pk.work_id,
                                    fk=>fk.work_id,
                                    (left, right) =>({...left, ...right}))
                                .select(s=>({
                                    worker_id: s.worker_id,
                                    worker_name: s.name,
                                    reg_dt: s.reg_dt,
                                    work_name: s.work_name,
                                    work_id: s.work_id }))    
                                .join(Enumerable.from(this.GE_WORKER_ACTIVITY_LIST)
                                                .where(w=>w.activity_id===this.diagDetailItems.activity_id),
                                    pk=>pk.worker_id,
                                    fk=>fk.worker_id,
                                    (left, right) =>({...left, ...right}))                                
                                .join(Enumerable.from(this.GE_ACTIVITY_LIST)
                                                .where(w=>w.activity_id===this.diagDetailItems.activity_id),
                                    pk=>pk.activity_id,
                                    fk=>fk.activity_id,
                                    (left, right) =>({...left, ...right}))                                   
                                .join(Enumerable.from(this.GE_WORKER_ACTIVITY_HISTORY_LIST)
                                                .where(w=>w.activity_id===this.diagDetailItems.activity_id && w.worker_id===this.diagDetailItems.worker_id),
                                    pk=>pk.activity_id && pk.worker_id,
                                    fk=>fk.activity_id && fk.worker_id,
                                    (left, right) =>({...left, ...right}))
                                .toArray()
            /*
            query = Enumerable.from(this.GE_WORKER_ACTIVITY_HISTORY_LIST)
                              .where(w=>w.activity_id===3 && w.worker_id===1639374230447)      
                              .toArray()  
            */
            console.log('queryWorkAndWorkerActivity : ' + JSON.stringify(query,null,2))
            console.log('this.diagDetailItems.activity_id : ' + this.diagDetailItems.activity_id)
            console.log('this.diagDetailItems.worker_id : ' + this.diagDetailItems.worker_id)


            return query
        },
    },
    watch: {
      calrMenu (val) {
        val && setTimeout(() => (this.activePicker = 'DATE'))
      },
    },    

    methods: {
        init(){
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
                                    reg_dt: s.reg_dt,
                                    work_name: s.work_name,
                                    work_id: s.work_id }))    
                                .join(Enumerable.from(this.GE_WORKER_ACTIVITY_LIST),
                                    pk=>pk.worker_id,
                                    fk=>fk.worker_id,
                                    (left, right) =>({...left, ...right}))
                                .join(Enumerable.from(this.GE_ACTIVITY_LIST),
                                    pk=>pk.activity_id,
                                    fk=>fk.activity_id,
                                    (left, right) =>({...left, ...right}))
                                .toArray()

            query=this.GE_WORKER_ACTIVITY_LIST.filter(f=>f.worker_id===1640160266301)
            
            query=this.GE_WORKER_LIST.filter(f=>f.worker_id===1640160266301)

            query=this.GE_WORKER_ACTIVITY_HISTORY_LIST.filter(f=>f.worker_id===1639374230447 && f.activity_id===3)
                                    
            console.log('query' + JSON.stringify(query,null,2))
        },

      calrSave (date) {
        this.$refs.calrMenu.save(date)
      },
      getSearchData() {
        this.getList()  
        if(this.searchParam['keyword']){        
            this.workerActivityList = this.workerActivityList.filter(f=>f.worker_name.includes(this.searchParam['keyword']) )
        }    
        if(this.searchParam['startDate']){
          //console.log('getSearchData startDate : ' + this.searchParam['startDate'])
          this.workerActivityList = this.workerActivityList.filter(f=>f.reg_dt >= this.searchParam['startDate'])
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
                                    reg_dt: s.reg_dt,
                                    work_name: s.work_name,
                                    work_id: s.work_id }))    
                                .join(Enumerable.from(this.GE_WORKER_ACTIVITY_LIST),
                                    pk=>pk.worker_id,
                                    fk=>fk.worker_id,
                                    (left, right) =>({...left, ...right}))
                                .join(Enumerable.from(this.GE_ACTIVITY_LIST),
                                    pk=>pk.activity_id,
                                    fk=>fk.activity_id,
                                    (left, right) =>({...left, ...right}))
                                .toArray()
          
            this.workerActivityList = query
        },
        detailItem(item) {
            this.detailItems = item
            this.dialog = true
        },
        diagDetailItem(item){
            this.diagDetailItems = item
            this.dialogDetail = true
        }
    },
}
</script>
