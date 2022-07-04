<template>
  <v-container
    id="choiceEquipmentWork"
    tag="section"
  >
  <!--  
    <base-v-component
      heading="ChoiceEquipmentWork"
      link="components/choiceEquipmentWork"
    />
  -->
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <v-card>
          <v-card-text>
            <base-subheading subheading="보호구 개인장비 선택" />

            <v-container class="py-0">
              <v-row
                align="center"
                justify="start"
              >
                <v-col
                  v-for="(protectSelection, i) in protectSelections"
                  :key="protectSelection.text"
                  class="shrink"
                >
                  <v-chip
                    :disabled="protectLoading"
                    close
                    @click:close="closeProtectSelected(i)"
                  >
                    <v-icon
                      left
                      v-text="protectSelection.icon"
                    ></v-icon>
                    {{ protectSelection.text }}
                  </v-chip>
                </v-col>

              </v-row>
            </v-container>

            <v-divider v-if="!allProtectSelectedList"></v-divider>

            <v-list>
              <template v-for="item in protectEquipmentList">
                <v-list-item
                  v-if="!protectSelectedList.includes(item)"
                  :key="item.text"
                  :disabled="protectLoading"
                  @click="pushProtectSelected(item)"
                >
                  <v-list-item-avatar>
                    <v-icon
                      :disabled="protectLoading"
                      v-text="item.icon"
                    ></v-icon>
                  </v-list-item-avatar>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item>
              </template>
            </v-list>
            
            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                :disabled="!protectSelectedList.length"
                :loading="protectLoading"
                color="purple"
                text
                @click="protectNext"
              >
                ProtectNext
              </v-btn>
            </v-card-actions>

          </v-card-text>
        </v-card>
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <v-card>
          <v-card-text>
            <base-subheading subheading="안전장비 선택" />

            <v-container class="py-0">
              <v-row
                align="center"
                justify="start"
              >
                <v-col
                  v-for="(safetySelection, i) in safetySelections"
                  :key="safetySelection.text"
                  class="shrink"
                >
                  <v-chip
                    :disabled="saftyLoading"
                    close
                    @click:close="closeSafetySelected(i)"
                  >
                    <v-icon
                      left
                      v-text="safetySelection.icon"
                    ></v-icon>
                    {{ safetySelection.text }}
                  </v-chip>
                </v-col>

              </v-row>
            </v-container>

            <v-divider v-if="!allSafetySelectedList"></v-divider>

            <v-list>
              <template v-for="item in safetyEquipmentList">
                <v-list-item
                  v-if="!safetySelectedList.includes(item)"
                  :key="item.text"
                  :disabled="saftyLoading"
                  @click="pushSafetySelected(item)"
                >
                  <v-list-item-avatar>
                    <v-icon
                      :disabled="saftyLoading"
                      v-text="item.icon"
                    ></v-icon>
                  </v-list-item-avatar>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item>
              </template>
            </v-list>
            
            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                :disabled="!safetySelectedList.length"
                :loading="saftyLoading"
                color="purple"
                text
                @click="safetyNext"
              >
                SafetyNext
              </v-btn>
            </v-card-actions>

          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row
      align="center"
      justify="space-around"
    >
        <v-btn 
          depressed
          dark
          large
          color="primary"
          elevation="1"
          @click="validate"
        >
          다음단계
        </v-btn>
    </v-row>

    <v-dialog
      v-model="dialog"
      max-width="350"
    >
      <v-card>
        <v-card-title>
          Are you sure?

          <v-spacer />

          <v-icon
            aria-label="Close"
            @click="dialog = false"
          >
            mdi-close
          </v-icon>
        </v-card-title>

        <v-card-text class="pb-6 pt-12 text-center">
          다음단계로 이동하시겠습니까?
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            class="mr-3"
            text
            @click="dialog = false"
          >
            No
          </v-btn>

          <v-btn
            color="success"
            text
            @click="nextStep"
          >
            정비작업
          </v-btn>
        </v-card-actions>  
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Enumerable  from 'linq'

const equipmentStore = 'equipmentStore'

const workerStore = 'workerStore'
const workerEquipmentStore = 'workerEquipmentStore'

//Commmon Activity
const activityStore = 'activityStore'
const workerActivityStore = 'workerActivityStore'
const workerActivityHistoryStore = 'workerActivityHistoryStore'


  export default {
    name: 'ChoiceEquipmentWork',
    data: () => ({
      dialog: false,
      saftyLoading: false,
      protectLoading: false,
      protectSelectedList: [],
      safetySelectedList: [],
      protectWorkerEquipmentList: [],
      safetyWorkerEquipmentList: [],
    }),

    computed: {

      ...mapGetters(workerEquipmentStore, [
        'GE_WORKER_EQUIPMENT_LIST'
      ]),    
      ...mapGetters(equipmentStore, [
        'GE_EQUIPMENT_LIST'
      ]),    
      ...mapGetters(workerStore, [
        'GE_WORKER'
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

      protectEquipmentList() {
        let query = Enumerable.from(this.GE_EQUIPMENT_LIST).select(s=>({
                icon: 'mdi-bike',
                text: s.name,
                equipment_id: s.equipment_id,
                type: s.type
              })).where(w=>w.type === 'protect').toArray();
        return query
      },

      safetyEquipmentList() {
        let query = Enumerable.from(this.GE_EQUIPMENT_LIST).select(s=>({
                icon: 'mdi-bike',
                text: s.name,
                equipment_id: s.equipment_id,
                type: s.type
              })).where(w=>w.type === 'safety').toArray();
        return query
      },

      allProtectSelectedList () {
        return this.protectSelectedList.length === this.protectEquipmentList.length
      },

      allSafetySelectedList () {
        return this.safetySelectedList.length === this.safetyEquipmentList.length
      },

      protectSelections () {
        const protectSelections = []

        for (const protectSelection of this.protectSelectedList) {
          protectSelections.push(protectSelection)
        }
        
        this.actionWorkerEquipmentList('protect', this.protectSelectedList);
        
        //console.log('this.protectSelectedList : ' + JSON.stringify(this.protectSelectedList,null,2));
        //console.log('this.protectWorkerEquipmentList : ' + JSON.stringify(this.protectWorkerEquipmentList,null,2));

        return protectSelections
      },
      safetySelections () {
        const safetySelections = []

        for (const safetySelection of this.safetySelectedList) {
          safetySelections.push(safetySelection)
        }
        
        this.actionWorkerEquipmentList('safety', this.safetySelectedList);
        
        //console.log('this.safetySelectedList : ' + JSON.stringify(this.safetySelectedList,null,2));
        //console.log('this.safetyWorkerEquipmentList : ' + JSON.stringify(this.safetyWorkerEquipmentList,null,2));
        return safetySelections
      },  
    },

    watch: {},
    mounted() {
      //console.log('this.GE_EQUIPMENT_LIST : ' + JSON.stringify(this.GE_EQUIPMENT_LIST,null,2));
      //console.log('this.GE_WORKER : ' + JSON.stringify(this.GE_WORKER,null,2));
      console.log('this.GE_WORKER_EQUIPMENT_LIST1 : ' + JSON.stringify(this.GE_WORKER_EQUIPMENT_LIST,null,2));
      //console.log('this.GE_WORKER_ACTIVITY_LIST1 : ' + JSON.stringify(this.GE_WORKER_ACTIVITY_LIST,null,2));

    },

    methods: {

      ...mapActions(workerActivityHistoryStore, [
        'AC_WORKER_ACTIVITY_HISTORY_PUSH'
      ]),

      ...mapActions(workerActivityStore, [
        'AC_WORKER_ACTIVITY_LIST'
      ]),

      ...mapActions(workerEquipmentStore, [
        'AC_WORKER_EQUIPMENT_LIST'
      ]),

      pushProtectSelected(item) {
        //console.log('item : ' + JSON.stringify(item))
        this.historyActivityWorker(this.getActivityId('보호구선택'), this.GE_WORKER.worker_id, 'EQUIPMENT', 
                                    item.equipment_id, item.type, 'checked')        
        this.protectSelectedList.push(item)

      },
      closeProtectSelected(i) {
         //console.log('this.protectSelectedList : ' + JSON.stringify(this.protectSelectedList[i]))        
         this.historyActivityWorker(this.getActivityId('보호구선택'), this.GE_WORKER.worker_id, 'EQUIPMENT', 
                                    this.protectSelectedList[i].equipment_id, this.protectSelectedList[i].type, 'unChecked')          
         this.protectSelectedList.splice(i, 1)
      },
      pushSafetySelected(item) {
        //console.log('item : ' + JSON.stringify(item))
        this.historyActivityWorker(this.getActivityId('안전장비선택'), this.GE_WORKER.worker_id, 'EQUIPMENT', 
                                    item.equipment_id, item.type, 'checked')        
        this.safetySelectedList.push(item)
      },
      closeSafetySelected(i) {
         //console.log('this.safetySelectedList : ' + JSON.stringify(this.safetySelectedList[i]))
         this.historyActivityWorker(this.getActivityId('안전장비선택'), this.GE_WORKER.worker_id, 'EQUIPMENT', 
                                    this.safetySelectedList[i].equipment_id, this.safetySelectedList[i].type, 'unChecked')          

         this.safetySelectedList.splice(i, 1) 
      },
      actionWorkerEquipmentList(type, list) {        
        this.clearWorkerEquipmentList(type);
        
        if(type === 'protect'){
          for(const item of list){
            this.protectWorkerEquipmentList.push({worker_id: this.GE_WORKER.worker_id, equipment_id: item.equipment_id});
          }

        }else if(type === 'safety'){
          for(const item of list){
            this.safetyWorkerEquipmentList.push({worker_id: this.GE_WORKER.worker_id, equipment_id: item.equipment_id});
          }
        }        
      },

      clearWorkerEquipmentList(type){          
        
        if(type === 'protect'){
          for(const item of this.protectEquipmentList){
                this.protectWorkerEquipmentList = this.protectWorkerEquipmentList.filter(l => l.equipment_id !== item.equipment_id);  
          }

        }else if(type === 'safety'){
          for(const item of this.safetyEquipmentList){
              this.safetyWorkerEquipmentList = this.safetyWorkerEquipmentList.filter(l => l.equipment_id !== item.equipment_id);  
          }          
        }                
      },

      protectNext () {
        this.protectLoading = true

        setTimeout(() => {
          this.clearWorkerEquipmentList('protect')
          this.protectSelectedList = []
          this.protectLoading = false
        }, 2000)
      },
      safetyNext () {
        this.saftyLoading = true

        setTimeout(() => {
          this.clearWorkerEquipmentList('safety')
          this.safetySelectedList = []
          this.saftyLoading = false
        }, 2000)
      },
      validate () {
        this.nextAndDialog() 
        this.initWorkerEquipment()
        this.setWorkerEquipment()

      },
      nextAndDialog() {
        this.dialog = true        
      },
      nextStep() {
        this.activityWorker(this.GE_WORKER.worker_id, this.getActivityId('보호구선택'))
        this.activityWorker(this.GE_WORKER.worker_id, this.getActivityId('안전장비선택'))
        //this.$router.replace('/work/choiceWork');
        this.dialog = false;
        this.$router.push('/work/rate/doWork');
      },
      initWorkerEquipment() {
        this.AC_WORKER_EQUIPMENT_LIST(this.GE_WORKER_EQUIPMENT_LIST.filter(f=>f.worker_id !== this.GE_WORKER.worker_id))
      },
      setWorkerEquipment() {        
        this.AC_WORKER_EQUIPMENT_LIST(this.GE_WORKER_EQUIPMENT_LIST.concat(this.protectWorkerEquipmentList, this.safetyWorkerEquipmentList))          
        //console.log('this.GE_WORKER_EQUIPMENT_LIST : ' + JSON.stringify(this.GE_WORKER_EQUIPMENT_LIST,null,2));        
      },
      activityWorker(workerId, activityId) {
        this.workerActivityList = this.GE_WORKER_ACTIVITY_LIST
        this.initActivityWoker(workerId, activityId)
        this.workerActivityList.push({worker_id: workerId, activity_id: activityId});
        this.AC_WORKER_ACTIVITY_LIST(this.workerActivityList);  
        this.workerActivityList = [];  
        console.log('this.GE_WORKER_ACTIVITY_LIST : ' + JSON.stringify(this.GE_WORKER_ACTIVITY_LIST,null,2))

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

        this.AC_WORKER_ACTIVITY_HISTORY_PUSH({
            activity_id: activityId,
            worker_id: workerId,
            domain: domain,
            domain_id: domainId,
            type: type,
            state: state,
            reg_dt: new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, ''),
        })
        //console.log('this.GE_WORKER_ACTIVITY_HISTORY_LIST : ' + JSON.stringify(this.GE_WORKER_ACTIVITY_HISTORY_LIST,null,2))
      },

    },
  }  
</script>
