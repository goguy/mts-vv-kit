<template>
  <v-container
    id="WorkerEquipmentInfo"
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
            :items="workerEquipmentList"
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
                    caption="정비작업 장비"
                    :headers="headersQueyWorkEqup"
                    :items="queryWorkEquipment"
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
                    caption="교육자 선택 장비"
                    :headers="headersQueyWorrEqup"
                    :items="queryWorkerEquipment"
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
                    caption="정비작업 장비와 교육자 선택 장비"
                    :headers="headersQueyWorkAndWorrEqup"
                    :items="queryWorkAndWorkerEquipment"
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
const equipmentStore = 'equipmentStore'
const workEquipmentStore = 'workEquipmentStore'
const workerEquipmentStore = 'workerEquipmentStore'

export default {
    name: 'WorkerEquipmentInfo',
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
            { text: '장비명', value: 'name' },
            { text: '장비ID', value: 'equipment_id' },
            { text: '타입', value: 'type' },
            { text: '필요여부', value: 'require' },
            { text: '등급', value: 'classify' },
            { text: '등록일', value: 'reg_dt' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        headersQueyWorkEqup: [
            { text: '번호', value: 'index' },
            { text: '정비작업명', value: 'work_name' },
            { text: '정비작업ID', value: 'work_id' },
            { text: '장비명', value: 'name' },
            { text: '장비ID', value: 'equipment_id' },
            { text: '타입', value: 'type' },
        ],
        headersQueyWorrEqup: [
            { text: '정비작업명', value: 'work_name' },
            { text: '정비작업ID', value: 'work_id' },
            { text: '장비명', value: 'name' },
            { text: '장비ID', value: 'equipment_id' },
            { text: '타입', value: 'type' },
        ],
        headersQueyWorkAndWorrEqup: [
            { text: '정비작업명', value: 'work_name' },
            { text: '정비작업ID', value: 'work_id' },
            { text: '장비명', value: 'name' },
            { text: '장비ID', value: 'equipment_id' },
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
        workerEquipmentList: [],
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
        ...mapGetters(equipmentStore, [
            'GE_EQUIPMENT', 'GE_EQUIPMENT_LIST'
        ]),    
        ...mapGetters(workerEquipmentStore, [
            'GE_WORKER_EQUIPMENT', 'GE_WORKER_EQUIPMENT_LIST'
        ]),
        ...mapGetters(workEquipmentStore, [
            'GE_WORK_EQUIPMENT_LIST'
        ]),    

        queryWorkEquipment() {
            let query = Enumerable.from(this.GE_EQUIPMENT_LIST)                            
                            .where(w=>w.type === this.detailItems.type)
                            .join(Enumerable.from(this.GE_WORK_EQUIPMENT_LIST)
                            .where(w=>w.work_id === this.detailItems.work_id),
                                pk=>pk.equipment_id,
                                fk=>fk.equipment_id,
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

            //console.log('queryWorkEquipment : ' + JSON.stringify(query, null, 2) )                    
            return query
        },
        queryWorkerEquipment() {
            let query = Enumerable.from(this.GE_EQUIPMENT_LIST)
                            .where(w=>w.type === this.detailItems.type)
                            .join(Enumerable.from(this.GE_WORKER_EQUIPMENT_LIST)
                                            .where(w=>w.worker_id === this.detailItems.worker_id),
                                pk=>pk.equipment_id,
                                fk=>fk.equipment_id,
                                (left, right) =>({...left, ...right}))
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

            //console.log('queryWorkerEquipment : ' + JSON.stringify(query, null, 2) )                                        
            return query
        },
        queryWorkAndWorkerEquipment(){
            let query = Enumerable.from(this.queryWorkEquipment)
                                .groupJoin(Enumerable.from(this.queryWorkerEquipment),
                                    pk => pk.equipment_id,
                                    fk => fk.equipment_id,
                                    (left, right) => ({...left, right}))
                                .selectMany(m => m.right.defaultIfEmpty(),
                                    (left, right) => ({...left, ...right}))
                                .toArray();   

            //console.log('queryWorkAndWorkerEquipment : ' + JSON.stringify(query,null,2));
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
                                .join(Enumerable.from(this.GE_WORKER_EQUIPMENT_LIST),
                                    pk=>pk.worker_id,
                                    fk=>fk.worker_id,
                                    (left, right) =>({...left, ...right}))
                                .join(Enumerable.from(this.GE_EQUIPMENT_LIST),
                                    pk=>pk.equipment_id,
                                    fk=>fk.equipment_id,
                                    (left, right) =>({...left, ...right}))
                                .toArray()

            //query=this.GE_WORKER_EQUIPMENT_LIST.filter(f=>f.worker_id===1640160266301)
            
            //query=this.GE_WORKER_LIST.filter(f=>f.worker_id===1640160266301)
                                    
            console.log('query' + JSON.stringify(query,null,2))
        },

      calrSave (date) {
        this.$refs.calrMenu.save(date)
      },
      getSearchData() {
        this.getList()  
        if(this.searchParam['keyword']){        
            this.workerEquipmentList = this.workerEquipmentList.filter(f=>f.worker_name.includes(this.searchParam['keyword']) )
        }    
        if(this.searchParam['startDate']){
          //console.log('getSearchData startDate : ' + this.searchParam['startDate'])
          this.workerEquipmentList = this.workerEquipmentList.filter(f=>f.reg_dt >= this.searchParam['startDate'])
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
                                .join(Enumerable.from(this.GE_WORKER_EQUIPMENT_LIST),
                                    pk=>pk.worker_id,
                                    fk=>fk.worker_id,
                                    (left, right) =>({...left, ...right}))
                                .join(Enumerable.from(this.GE_EQUIPMENT_LIST),
                                    pk=>pk.equipment_id,
                                    fk=>fk.equipment_id,
                                    (left, right) =>({...left, ...right}))
                                .toArray()
          
            this.workerEquipmentList = query
        },
        detailItem(item) {
            this.detailItems = item
            this.dialog = true

        },
    },
}
</script>
