<template>
  <v-container
    id="WorkerTdmotionInfo"
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
            :items="workerTdmotionList"
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
                    caption="정비작업 모션"
                    :headers="headersQueyWorkMotn"
                    :items="queryWorkTdmotion"
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
                    caption="교육자 선택 모션"
                    :headers="headersQueyWorrMotn"
                    :items="queryWorkerTdmotion"
                    hide-default-footer
                    disable-pagination
                    class="elevation-1"
                    ></v-data-table>              

                </v-col>

                <v-col
                    cols="12"
                    md="4"
                >
                    <v-data-table
                    caption="정비작업 모션과 교육자 선택 모션"
                    :headers="headersQueyWorkAndWorrMotn"
                    :items="queryWorkAndworkerTdmotion"
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

  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import Enumerable  from 'linq'

const workStore = 'workStore'
const workerStore = 'workerStore'
const tdmotionStore = 'tdmotionStore'
const workerTdmotionStore = 'workerTdmotionStore'
const workTdmotionStore = 'workTdmotionStore'

export default {
    name: 'WorkerTdmotionInfo',
    data () {
      return {
        dialog: false,
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
            { text: '모션명', value: 'name' },
            { text: '모션ID', value: 'motion_id' },
            { text: '타입', value: 'type' },
            { text: '비디오명', value: 'video_name' },
            { text: '등록일', value: 'reg_dt' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        headersQueyWorkMotn: [
            { text: '번호', value: 'index' },
            { text: '정비작업명', value: 'work_name' },
            { text: '정비작업ID', value: 'work_id' },
            { text: '모션명', value: 'name' },
            { text: '모션ID', value: 'motion_id' },
            { text: '타입', value: 'type' },
        ],
        headersQueyWorrMotn: [
            { text: '정비작업명', value: 'work_name' },
            { text: '정비작업ID', value: 'work_id' },
            { text: '모션명', value: 'name' },
            { text: '모션ID', value: 'motion_id' },
            { text: '타입', value: 'type' },
        ],
        headersQueyWorkAndWorrMotn: [
            { text: '정비작업명', value: 'work_name' },
            { text: '정비작업ID', value: 'work_id' },
            { text: '모션명', value: 'name' },
            { text: '모션ID', value: 'motion_id' },
            { text: '타입', value: 'type' },
            { text: '교육자ID', value: 'worker_id' },
        ],

        activePicker: null,
        calrDate: null,
        calrMenu: false,

        searchParam: {
          keyword: '',
          startDate: '',
        },
        workerTdmotionList: [],
        detailItems: {},
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
        ...mapGetters(tdmotionStore, [
            'GE_TDMOTION', 'GE_TDMOTION_LIST'
        ]),    
        ...mapGetters(workerTdmotionStore, [
            'GE_WORKER_TDMOTION', 'GE_WORKER_TDMOTION_LIST'
        ]),    
        ...mapGetters(workTdmotionStore, [
            'GE_WORK_TDMOTION', 'GE_WORK_TDMOTION_LIST'
        ]),    
        
        queryWorkTdmotion() {
            let query =  Enumerable.from(this.GE_TDMOTION_LIST)
                                .where(w=>w.type === this.detailItems.type)
                                .join(Enumerable.from(this.GE_WORK_TDMOTION_LIST)
                                                .where(w=>w.work_id === this.detailItems.work_id && w.type === this.detailItems.type),
                                    pk=>pk.motion_id,
                                    fk=>fk.motion_id,
                                    (left, right)=>({...left, ...right}))
                                .join(Enumerable.from(this.GE_WORK_LIST)
                                                .where(w=>w.work_id === this.detailItems.work_id)
                                                .select(s=>({
                                                    work_id: s.work_id,
                                                    work_name: s.name})),
                                                pk=>pk.work_id,
                                                fk=>fk.work_id,
                                                (left, right) =>({...left, ...right}))
                                .orderBy(o=>o.disp_ord)
                                .toArray()                                 
            //console.log('queryWorkTdmotion : ' + JSON.stringify(query,null,2)) 
            return query
        },
        queryWorkerTdmotion() {
            let query = Enumerable.from(this.GE_TDMOTION_LIST)
                                .where(w=>w.type === this.detailItems.type)
                                .join(Enumerable.from(this.GE_WORKER_TDMOTION_LIST)
                                             .where(w=>w.worker_id === this.detailItems.worker_id),
                                    pk=>pk.motion_id,
                                    fk=>fk.motion_id,
                                    (left, right)=>({...left, ...right}))
                                .join(Enumerable.from(this.GE_WORKER_LIST)
                                                .where(w=>w.worker_id === this.detailItems.worker_id)
                                                .select(s=>({
                                                            worker_id: s.worker_id,
                                                            worker_name: s.name,
                                                            work_id: s.work_id})),
                                                pk=>pk.worker_id,
                                                fk=>fk.worker_id,
                                                (left, right) =>({...left, ...right}))
                                .join(Enumerable.from(this.GE_WORK_LIST)
                                                .where(w=>w.work_id === this.detailItems.work_id)
                                                .select(s=>({
                                                    work_id: s.work_id,
                                                    work_name: s.name})),
                                                pk=>pk.work_id,
                                                fk=>fk.work_id,
                                                (left, right) =>({...left, ...right}))
                                .orderBy(o=>o.disp_ord)
                                .toArray()
                                    
            //console.log('queryWorkerTdmotion : ' + JSON.stringify(queryWorkerTdmotion,null,2))
            return query   
        },
        queryWorkAndworkerTdmotion() {
            let query = Enumerable.from(this.queryWorkTdmotion)
                                    .groupJoin(Enumerable.from(this.queryWorkerTdmotion),
                                        pk => pk.motion_id,
                                        fk => fk.motion_id,
                                        (left, right) => ({...left, right}))
                                    .selectMany(m => m.right.defaultIfEmpty(),
                                        (left, right) => ({...left, ...right}))
                                    .toArray();   

            console.log('queryWorkAndworkerTdmotion : ' + JSON.stringify(query,null,2))
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
                                .join(Enumerable.from(this.GE_WORKER_TDMOTION_LIST),
                                    pk=>pk.worker_id,
                                    fk=>fk.worker_id,
                                    (left, right) =>({...left, ...right}))
                                .join(Enumerable.from(this.GE_TDMOTION_LIST),
                                    pk=>pk.motion_id,
                                    fk=>fk.motion_id,
                                    (left, right) =>({...left, ...right}))
                                .toArray()

            //query=this.GE_WORKER_TDMOTION_LIST.filter(f=>f.worker_id===1640160266301)
            
            //query=this.GE_WORKER_LIST.filter(f=>f.worker_id===1640160266301)
                                    
            console.log('query' + JSON.stringify(query,null,2))
        },

      calrSave (date) {
        this.$refs.calrMenu.save(date)
      },
      getSearchData() {
        this.getList()  
        if(this.searchParam['keyword']){        
            this.workerTdmotionList = this.workerTdmotionList.filter(f=>f.worker_name.includes(this.searchParam['keyword']) )
        }    
        if(this.searchParam['startDate']){
          //console.log('getSearchData startDate : ' + this.searchParam['startDate'])
          this.workerTdmotionList = this.workerTdmotionList.filter(f=>f.reg_dt >= this.searchParam['startDate'])
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
                                .join(Enumerable.from(this.GE_WORKER_TDMOTION_LIST),
                                    pk=>pk.worker_id,
                                    fk=>fk.worker_id,
                                    (left, right) =>({...left, ...right}))
                                .join(Enumerable.from(this.GE_TDMOTION_LIST),
                                    pk=>pk.motion_id,
                                    fk=>fk.motion_id,
                                    (left, right) =>({...left, ...right}))
                                .toArray()
          
            this.workerTdmotionList = query
        },
        detailItem(item) {
            this.detailItems = item
            this.dialog = true
        },
    },
}
</script>
