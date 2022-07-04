<template>
  <v-container
    id="WorkerInfo"
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
                <v-select
                  v-model="searchParam.selectData"
                  :items="codeItems"
                  item-text="codeNm"
                  item-value="code"
                  label="정비작업"
                  return-object
                ></v-select>
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
                  md="3"
                  class="text-right"
                >
                  <v-btn
                    color="success"
                    class="mt-5"
                    @click="getDataFromApi"
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
          caption="교육생정보"
          :headers="headers"
          :items="desserts"
          :options.sync="options"
          :server-items-length="totalDesserts"
          :loading="loading"
        >
        <template
          v-slot:item.work_id="{ item }"
        >
          <v-icon
            v-if="item.work_id === 1"
          >
            mdi-gender-female
          </v-icon>
          <v-icon
            v-else
          >
            mdi-gender-male
          </v-icon>
        </template>
        <template 
          v-slot:item.actions="{ item }"
        >  
          <v-icon
            small
            class="mr-2"
            @click="detailItem(item)"
          >
            mdi-pencil
          </v-icon>                      
        </template>
        <!--
          <template v-slot:body="{ items }">
            <tbody>
              <tr
                v-for="item in items"
                :key="item.worker_id"
              >              
                <td>
                  {{item.name}}
                </td>
                <td>
                  {{item.worker_id}}
                </td>
                <td>
                <v-icon
                  v-if="item.work_id === 1"
                >
                  mdi-gender-female
                </v-icon>
                <v-icon
                  v-else
                >
                  mdi-gender-male
                </v-icon>
                </td>
                <td>
                  {{item.reg_dt}}
                </td>
              </tr>
            </tbody>
          </template>        
        -->
        
        </v-data-table>

      </v-col>
    </v-row>

    <v-overlay
      :value="overlay"
    > 
      <v-dialog
        v-model="dialog"
        :fullscreen="isDiagfullscreen"
        transition="dialog-bottom-transition"        >
                
          <base-y-dialog 
            :param="dialogOptions"
            />        
        
      </v-dialog>
    </v-overlay>


  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
const workerStore = 'workerStore'

  export default {
    name: 'WorkerInfo',
    data () {
      return {
        totalDesserts: 0,
        desserts: [],
        loading: true,
        options: {},
        selectItems: ['1', '2', '3', '4', '5'],

        codeItem: '',
        codeItems:[
          {codeNm: '탱크 Cleaning', code: '1'},
          {codeNm: '탱크 샌딩 및 도장', code: '2'},
        ],
        activePicker: null,
        calrDate: null,
        calrMenu: false,

        searchParam: {
          keyword: '',
          selectData: null,
          startDate: '',
        },

        headers: [
          {
            text: '교육생명',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: '교육생ID', value: 'worker_id' },
          { text: '정비작업ID', value: 'work_id' },
          { text: '이메일', value: 'email' },
          { text: '소속', value: 'agency' },
          { text: '등록일', value: 'reg_dt' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],

        dialog: false,
        dialogOptions: {
          target: null,
          param: {},
          closeCallback: null,
        },
        isDiagfullscreen: false,

        overlay: false,
        zIndex: 0,
      }
    },
    mounted() {
    },
    computed: {
      ...mapGetters(workerStore, [
        'GE_WORKER', 'GE_WORKER_LIST'
      ]),    
    },
    watch: {
      options: {
        handler () {
          this.getDataFromApi()
        },
        deep: true,
      },      
      calrMenu (val) {
        val && setTimeout(() => (this.activePicker = 'DATE'))
      },
    },    
    methods: {
      ...mapActions(workerStore, [
        'AC_WORKER', 'AC_WORKER_PUSH', 'AC_WORKER_LIST' 
      ]),

      getDataFromApi () {
        this.loading = true
        this.fakeApiCall().then(data => {
          this.desserts = data.items
          this.totalDesserts = data.total
          this.loading = false
        })
      },
      getSearchData(data){        
        let searchData=data
        if(this.searchParam['keyword']){
          //console.log('getSearchData keyword : ' + this.searchParam['keyword'])
          searchData = searchData.filter(f=>f.name.includes(this.searchParam.keyword))
        }
        if(this.searchParam['selectData']){
          //console.log('getSearchData selectData : ' + JSON.stringify(this.searchParam['selectData'],null,2))
          searchData = searchData.filter(f=>f.work_id === parseInt(this.searchParam.selectData['code']))
        } 
        if(this.searchParam['startDate']){
          //console.log('getSearchData startDate : ' + this.searchParam['startDate'])
          searchData = searchData.filter(f=>f.reg_dt >= this.searchParam['startDate'])
        }
        return searchData
      },
      /**
       * In a real application this would be a call to fetch() or axios.get()
       */
      fakeApiCall () {
        // eslint-disable-line no-unused-vars
        return new Promise((resolve) => {
          const { sortBy, sortDesc, page, itemsPerPage } = this.options

          let items = this.getDesserts()
          const total = items.length

          if (sortBy.length === 1 && sortDesc.length === 1) {
            items = items.sort((a, b) => {
              const sortA = a[sortBy[0]]
              const sortB = b[sortBy[0]]

              if (sortDesc[0]) {
                if (sortA < sortB) return 1
                if (sortA > sortB) return -1
                return 0
              } else {
                if (sortA < sortB) return -1
                if (sortA > sortB) return 1
                return 0
              }
            })
          }

          if (itemsPerPage > 0) {
            items = items.slice((page - 1) * itemsPerPage, page * itemsPerPage)
          }

          setTimeout(() => {
            resolve({
              items,
              total,
            })
          }, 1000)
        })
      },
      
      calrSave (date) {
        this.$refs.calrMenu.save(date)
      },
      getDesserts() {
        // 검색영역
        return this.getSearchData(this.GE_WORKER_LIST)
        //return this.GE_WORKER_LIST
      },
      detailItem(item) {
        //console.log('item : ' + JSON.stringify(item, null, 2))
        this.dialog=true
        this.isDiagfullscreen=true
        this.overlay=true
        this.dialogOptions.target = () => import(`${'@/views/admin/edun/WorkerActyDiagR.vue'}`);
        this.dialogOptions.param = Object.assign({}, item)
        this.dialogOptions.closeCallback = this.closeDialog
        //console.log('this.dialogOptions.param : ' + JSON.stringify(this.dialogOptions.param, null, 2))
      },
      closeDialog() {
        this.dialogOptions.target = null;
        this.dialog=false
        this.isDiagfullscreen=false
        this.overlay=false
      },

    },
  }
</script>