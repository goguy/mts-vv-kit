<template>
  <v-container
    id="worker_result_item_info"
    fluid
    tag="section"
  >
    <!-- 검색영역 -->
    <v-row justify="center">
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
          :items="workerResultList"
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
        max-width="1100"
      >
        <base-y-dialog
          :param="dialogOptions"
          />
      </v-dialog>
    </v-overlay>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import Enumerable  from 'linq'

const workStore = 'workStore'
const workerStore = 'workerStore'

const resultStore = 'resultStore'
const workerResultStore = 'workerResultStore'
const workerResultItemStore = 'workerResultItemStore'

  export default {
    name: 'worker_result_item_info',
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
            { text: '타입', value: 'type' },
            { text: '등록일', value: 'reg_dt' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        overlay: false,
        activePicker: null,
        calrMenu: false,

        searchParam: {
          keyword: '',
          startDate: '',
        },
        workerResultList: [],
        selectItem: {},
        dialogOptions: {
          target: null,
          param: {},
          closeCallback: null,
        },
      }
    },
    computed: {
      ...mapGetters(workStore, [
        'GE_WORK_LIST'
      ]),    
      ...mapGetters(workerStore, [
        'GE_WORKER', 'GE_WORKER_LIST'
      ]),
      ...mapGetters(workerResultStore, [
        'GE_WORKER_RESULT_LIST'
      ]),
      ...mapGetters(workerResultItemStore, [
        'GE_WORKER_RESULT_ITEM_LIST'
      ]),
      ...mapGetters(resultStore, [
        'GE_RESULT_LIST'
      ]),    
            
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
      /*
      ...mapActions(workerResultStore, [
        'AC_WORKER_RESULT', 'AC_WORKER_RESULT_PUSH', 'AC_WORKER_RESULT_LIST' 
      ]),
      */
      getSearchData() {
        this.getList()  
        if(this.searchParam['keyword']){        
            this.workerResultList = this.workerResultList.filter(f=>f.worker_name.includes(this.searchParam['keyword']) )
        }    
        if(this.searchParam['startDate']){
          //console.log('getSearchData startDate : ' + this.searchParam['startDate'])
          this.workerResultList = this.workerResultList.filter(f=>f.reg_dt >= this.searchParam['startDate'])
        }
        //console.log('getSearchData')  
      },

      getList() {          
        let query = Enumerable.from(this.GE_WORKER_LIST)
                            .select(s=>({
                                worker_id: s.worker_id }))    
                            .join(Enumerable.from(this.GE_WORKER_RESULT_ITEM_LIST),
                                pk=>pk.worker_id,
                                fk=>fk.worker_id,
                                (left, right) =>({...left, ...right}))    
                            .toArray()

        query = Enumerable.from(query)
                          .groupBy(
                            g => g.worker_id,
                            element => element,
                            (worker_id, items) =>({worker_id, items: items.toArray()})
                          ).toArray()
        
        query = Enumerable.from(this.GE_WORK_LIST)
                            .select(s=>({
                                work_id: s.work_id,
                                work_name: s.name,
                                type: s.type,
                                reg_dt: s.reg_dt
                                }))
                            .join(Enumerable.from(this.GE_WORKER_LIST),
                                pk=>pk.work_id,
                                fk=>fk.work_id,
                                (left, right) =>({...left, ...right}))
                            .select(s=>({
                                worker_id: s.worker_id,
                                worker_name: s.name,
                                work_name: s.work_name,
                                work_id: s.work_id,
                                type: s.type,
                                reg_dt: s.reg_dt }))
                            .join(Enumerable.from(this.GE_RESULT_LIST),
                                pk=>pk.type,
                                fk=>fk.type,
                                (left, right) =>({...left, ...right}))
                            .select(s=>({
                                worker_id: s.worker_id,
                                worker_name: s.worker_name,
                                work_name: s.work_name,
                                work_id: s.work_id,
                                type: s.type,
                                result_id: s.result_id,
                                reg_dt: s.reg_dt }))
                            .join(Enumerable.from(query),
                                pk=>pk.worker_id,
                                fk=>fk.worker_id,
                                (left, right) =>({...left, ...right}))
                            .toArray()
       /*
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
                            .groupJoin(Enumerable.from(this.GE_WORKER_RESULT_LIST),
                                pk=>pk.worker_id,
                                fk=>fk.worker_id,
                                (group, items) =>({...group, items:items.toArray()}))
                            .toArray()
        */                    
        this.workerResultList=query
        //console.log('workerResultList - query',JSON.stringify(query,null,2))
      },      
      calrSave (date) {
        this.$refs.calrMenu.save(date)
      },
      dialogReport(item){
        let type = item.type
        this.dialogOptions.target = () => import('@/views/admin/edun/WorkerResultItemInfoDiag'+type+'.vue')
        this.dialogOptions.param = item
        this.dialogOptions.closeCallback = this.closeDialog
        this.dialog=true
        this.overlay=true
      },
      
      closeDialog() {
        this.dialogOptions.target=null
        this.dialog=false
        this.overlay=false
      },

    },
  }
</script>
<style scoped>

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td, .v-data-table > .v-data-table__wrapper > table > thead > tr > td, .v-data-table > .v-data-table__wrapper > table > tfoot > tr > td{
  height: 40px;
  padding: 0 10px;
}

table {
  border: 1px solid #000;
  border-collapse: collapse;
  width: 100%;
}

table tr th {
  border: 1px solid #000;
  height: 40px;
  padding: 0 10px;
}

table tr td {
  border: 1px solid #000;
  height: 40px;
  padding: 0 10px;
}

.text-left{
  text-align: left;
}

.text-center{
  text-align: center;
}

.font-weight-black{
  font-weight: bold;
}

.fs-20{
  font-size: 20px;
}

.mt-3{
  margin-top: 30px;
}

.mt-10{
  margin-top: 100px;
}

.mb-1{
  margin-bottom: 10px;
}

.mlr-5{
  margin-left: 50px;
  margin-right: 50px;
}

.gl3{
  background-color: #EEEEEE;  
}

</style>