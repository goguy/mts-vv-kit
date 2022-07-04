<template>
  <v-container
    id="choice-equipment-work"
    tag="section"
  >
    <v-item-group 
      multiple>

      <v-card class="pa-5 grey lighten-5">
        <v-card-title class="text-h5 font-weight-medium pa-5">         
          <v-icon
            large
          >mdi-bookmark-check</v-icon> 
          &nbsp; 개인장비보호구선택
        </v-card-title>
        <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  v-for="item in protectEquipmentList"
                  :key="item.equipment_id"
                  md="2"
                  sm="3"
                  xs="6"
                  class="d-flex justify-center"
                >
                  <v-item>
                    <v-card
                      class="pa-2 indigo lighten-5"  
                    >
                      <v-checkbox
                        v-model="selectedEquipment"
                        :value="item.equipment_id"
                      />
                      <v-img 
                      :src="item.img_url"
                      min-height="150"
                      contain
                      >
                      </v-img>
                      <v-card-text
                        v-text="item.name"
                        class="title text-center font-weight-bold"
                      />
                    </v-card>
                  </v-item>
                </v-col>
              </v-row>
            </v-container>
        </v-card-text>  
      </v-card>  

      <v-card class="mt-1 pa-5 grey lighten-5">
        <v-card-title class="text-h5 font-weight-medium pa-5">
          <v-icon
            large
          >mdi-bookmark-check</v-icon> 
          &nbsp;안전장비선택
        </v-card-title>
        <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  v-for="item in safetyEquipmentList"
                  :key="item.equipment_id"
                  md="2"
                  sm="3"
                  xs="6"
                  class="d-flex justify-center"
                >
                  <v-item>
                    <v-card
                      class="pa-2 purple lighten-5"  
                    >
                      <v-checkbox
                        v-model="selectedEquipment"
                        :value="item.equipment_id"
                      ></v-checkbox>                                                                  
                      <v-img 
                      :src="item.img_url"
                      min-height="150"
                      contain
                      >
                      </v-img>
                      <v-card-text 
                        v-text="item.name"
                        class="text-h6 text-center font-weight-bold"
                      />
                    </v-card>
                  </v-item>
                </v-col>
              </v-row>
            </v-container>
        </v-card-text>  
      </v-card>  
    </v-item-group>

  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Enumerable  from 'linq'

import { activityMixin } from '@/mixins/activityMixin.js'


const equipmentStore = 'equipmentStore'

const workerStore = 'workerStore'
const workerEquipmentStore = 'workerEquipmentStore'

//Commmon Activity
const activityStore = 'activityStore'
const workerActivityStore = 'workerActivityStore'
const workerActivityHistoryStore = 'workerActivityHistoryStore'


  export default {
    name: 'choice-equipment-work',
    mixins: [activityMixin],
    data: () => ({
      protectSelectedList: [],
      safetySelectedList: [],
      selectedWorkerEquipmentList: [],
      selectedEquipment: [],

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
        /*
        let query = Enumerable.from(this.GE_EQUIPMENT_LIST).select(s=>({
                icon: 'mdi-bike',
                text: s.name,
                img_src: s.img_src,
                equipment_id: s.equipment_id,
                type: s.type
              })).where(w=>w.type === 'protect').toArray();
        return query
        */
        let query = Enumerable.from(this.GE_EQUIPMENT_LIST)
                              .where(w=>w.type === 'protect')
                              .toArray()

        return query
      },

      safetyEquipmentList() {
        /*
        let query = Enumerable.from(this.GE_EQUIPMENT_LIST).select(s=>({
                icon: 'mdi-bike',
                text: s.name,
                img_src: s.img_src,
                equipment_id: s.equipment_id,
                type: s.type
              })).where(w=>w.type === 'safety').toArray();
        return query
        */
        let query = Enumerable.from(this.GE_EQUIPMENT_LIST)
                              .where(w=>w.type === 'safety')
                              .toArray()
        return query
      },

    },

    watch: {
      /*
      workerEquipmentSelected(newWorkerEquipmentSelected, oldWorkerEquipmentSelected) {
        console.log('oldWorkerEquipmentSelected : ' + oldWorkerEquipmentSelected)
        console.log('newWorkerEquipmentSelected : ' + newWorkerEquipmentSelected)

        this.setHistoryActivityWorker(newWorkerEquipmentSelected, oldWorkerEquipmentSelected)
        this.setSelectedWorkerEquipment(newWorkerEquipmentSelected)
      },
      */

      selectedEquipment(newVal, oldVal){
        console.log('selectedEquipment oldVal : ' + oldVal)
        console.log('selectedEquipment newVal : ' + newVal)
        this.setSelectedWorkerEquipment(newVal)

        this.setHistoryActivityWorker01(newVal, oldVal)  
        //this.setHistoryActivityWorker(newVal, oldVal)

      }


    },
    mounted() {
      //console.log('this.GE_EQUIPMENT_LIST : ' + JSON.stringify(this.GE_EQUIPMENT_LIST,null,2));
      //console.log('this.GE_WORKER : ' + JSON.stringify(this.GE_WORKER,null,2));
      //console.log('this.GE_WORKER_EQUIPMENT_LIST1 : ' + JSON.stringify(this.GE_WORKER_EQUIPMENT_LIST,null,2));
      //console.log('this.GE_WORKER_ACTIVITY_LIST1 : ' + JSON.stringify(this.GE_WORKER_ACTIVITY_LIST,null,2));

      //this.initWorkerEquipment()
      this.initSelectedWorkerEquipment()

    },
    beforeDestroy() {
      this.nextStep()
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
      
      initSelectedWorkerEquipment(){
        this.selectedEquipment=[]
        if(this.GE_WORKER_EQUIPMENT_LIST.length > 0){
          let arrQuery = this.GE_WORKER_EQUIPMENT_LIST.filter(f=>f.worker_id === this.GE_WORKER.worker_id)
          for(const selectedItem of arrQuery){
            this.selectedEquipment.push(selectedItem.equipment_id)
          }
          //console.log('arrQuery : ' + JSON.stringify(arrQuery,null,2));
        }  
        
        /*
        this.workerEquipmentSelected=[]
        if(this.GE_WORKER_EQUIPMENT_LIST.length > 0){
          let arrQuery = this.GE_WORKER_EQUIPMENT_LIST.filter(f=>f.worker_id === this.GE_WORKER.worker_id)
          for(const selectedItem of arrQuery){
            this.workerEquipmentSelected.push(selectedItem.equipment_id-1)
          }
          console.log('arrQuery : ' + JSON.stringify(arrQuery,null,2));
        }
        */
      },
      /*
      setSelectedWorkerEquipment(newWorkerEquipmentSelected) {        
        this.initWorkerEquipment()
        if(newWorkerEquipmentSelected.length > 0){
          for( const selectedItem  of newWorkerEquipmentSelected){
            this.selectedWorkerEquipmentList.push({worker_id: this.GE_WORKER.worker_id, equipment_id: (selectedItem+1)})
            //console.log('selectedItem : ' + selectedItem)
          }
          this.actionSelectedWorkerEquipment()
          this.selectedWorkerEquipmentList=[]
        }
        //console.log('newWorkerEquipmentSelected length: ' + newWorkerEquipmentSelected.length)      
      },
      */
      setSelectedWorkerEquipment(itemArr) {
        this.initWorkerEquipment()
        if(itemArr.length > 0){
          for( const selectedItem  of itemArr){
            this.selectedWorkerEquipmentList.push({
              worker_id: this.GE_WORKER.worker_id, 
              equipment_id: selectedItem})
            //console.log('selectedItem : ' + selectedItem)
          }
          this.actionSelectedWorkerEquipment()
          this.selectedWorkerEquipmentList=[]
        }  
      },
      //장비선택으로 전환
      setHistoryActivityWorker01(newArr, oldArr){
        if(newArr.length > oldArr.length){
          let difference = newArr.filter(f => !oldArr.includes(f));
          if(difference.length === 1)            
              this.historyActivityWorker(this.getActivityId('보호구선택'), this.GE_WORKER.worker_id, 'EQUIPMENT', 
                    parseInt(difference), this.safetyEquipmentList.filter(f=>f.equipment_id === difference).type, 'checked')        

        }else if(newArr.length < oldArr.length){
          let difference = oldArr.filter(f => !newArr.includes(f));
          if(difference.length === 1)
               this.historyActivityWorker(this.getActivityId('안전장비선택'), this.GE_WORKER.worker_id, 'EQUIPMENT', 
                    parseInt(difference), this.safetyEquipmentList.filter(f=>f.equipment_id === difference).type, 'unChecked')        
        }

      },

      setHistoryActivityWorker(newArr, oldArr) {
        if(newArr.length > oldArr.length){
          let difference = newArr.filter(f => !oldArr.includes(f));
          if(difference.length === 1)
            if(difference > 10){
               console.log('newArr.length difference > 10 : ' + difference);
               
               this.historyActivityWorker(this.getActivityId('안전장비선택'), this.GE_WORKER.worker_id, 'EQUIPMENT', 
                                    parseInt(difference)+1, this.safetyEquipmentList.filter(f=>f.equipment_id === difference+1).type, 'checked')        
            }else{
               console.log('newArr.length difference <= 10 : ' + difference);
              this.historyActivityWorker(this.getActivityId('보호구선택'), this.GE_WORKER.worker_id, 'EQUIPMENT', 
                                          parseInt(difference)+1, this.protectEquipmentList.filter(f=>f.equipment_id === difference+1).type, 'checked')        
            }  

        }else if(newArr.length < oldArr.length){
          let difference = oldArr.filter(f => !newArr.includes(f));
          if(difference.length === 1)
            if(difference > 10){
               console.log('oldArr.length difference > 10 : ' + difference);
               this.historyActivityWorker(this.getActivityId('안전장비선택'), this.GE_WORKER.worker_id, 'EQUIPMENT', 
                                    parseInt(difference)+1, this.safetyEquipmentList.filter(f=>f.equipment_id === difference+1).type, 'unChecked')        
            }else{
               console.log('oldArr.length difference <= 10 : ' + difference);
              this.historyActivityWorker(this.getActivityId('보호구선택'), this.GE_WORKER.worker_id, 'EQUIPMENT', 
                                          parseInt(difference)+1, this.protectEquipmentList.filter(f=>f.equipment_id === difference+1).type, 'unChecked')        
            }  
        }
      },
      pushProtectSelected(item) {
        //console.log('item : ' + JSON.stringify(item))
        this.historyActivityWorker(this.getActivityId('보호구선택'), this.GE_WORKER.worker_id, 'EQUIPMENT', 
                                    item.equipment_id, item.type, 'checked')        
        this.protectSelectedList.push(item)

      },
      closeProtectSelected(i) {
         console.log('this.protectSelectedList : ' + JSON.stringify(this.protectSelectedList[i]))        
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

      nextStep() {
        this.activityWorker(this.GE_WORKER.worker_id, this.getActivityId('보호구선택'))
        this.activityWorker(this.GE_WORKER.worker_id, this.getActivityId('안전장비선택'))

        //this.activityWorker(this.GE_WORKER.worker_id, this.getActivityId('장비선택'))

        //this.$router.replace('/work/choiceWork');
        //this.dialog = false;
        //this.$router.push('/work/rate/doWork');
      },
      initWorkerEquipment() {
        this.AC_WORKER_EQUIPMENT_LIST(this.GE_WORKER_EQUIPMENT_LIST.filter(f=>f.worker_id !== this.GE_WORKER.worker_id))
      },
      actionSelectedWorkerEquipment() {
        this.AC_WORKER_EQUIPMENT_LIST(this.GE_WORKER_EQUIPMENT_LIST.concat(this.selectedWorkerEquipmentList))          
        //console.log('this.GE_WORKER_EQUIPMENT_LIST : ' + JSON.stringify(this.GE_WORKER_EQUIPMENT_LIST,null,2));        
      },      
    },
  }  
</script>
