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
        <v-alert
          dismissible
          type="info">
          해당정비작업의 보호구선택장비는 {{protectWorkEquipmentList.length}}장비를 착용해야 합니다. [{{protectWorkerEquipmentList.length}}/{{protectWorkEquipmentList.length}}]
        </v-alert>
        <v-alert
          dismissible
          type="info">
          보호구선택장비는 작업허가서에서 확인할 수 있습니다.
        </v-alert>
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
                        v-model="selectedProtectEquipment"
                        :value="item.equipment_id"
                      />
                      <v-img 
                      :src="getImgUrl(item.img_url)"
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
    </v-item-group>

    <v-row v-if="isCheckEquip"
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
            안전장비선택
          </v-btn>
        </v-card-actions>  
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="snackbar.isSnackbar"
      :vertical="snackbar.vertical"
    >
      {{ snackbar.message }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="red"
          text
          v-bind="attrs"
          @click="snackbar.isSnackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Enumerable  from 'linq'

import { activityMixin } from '@/mixins/activityMixin.js'


const equipmentStore = 'equipmentStore'

const workStore = 'workStore'
const workerStore = 'workerStore'
const workEquipmentStore = 'workEquipmentStore'
const workerEquipmentStore = 'workerEquipmentStore'
const resultStore = 'resultStore'


//Commmon Activity
const activityStore = 'activityStore'
//const workerActivityStore = 'workerActivityStore'
//const workerActivityHistoryStore = 'workerActivityHistoryStore'


  export default {
    name: 'choice-equipment-work',
    mixins: [activityMixin],
    data: () => ({
      dialog: false,
      selectedWorkerEquipmentList: [],
      selectedProtectEquipment: [],
      snackbar: {
        isSnackbar: false,
        vertical: true,
        message: '',
      },
      //작업자선택결과
      resultPayload: {
        index: 0,
        result:[]
      },
      gitUrl: 'https://goguy.github.io/mts-vv-kit',
    }),

    computed: {
      ...mapGetters(workStore, [
        'GE_WORK_LIST'
      ]),    
      ...mapGetters(workEquipmentStore, [
        'GE_WORK_EQUIPMENT_LIST'
      ]),    
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
      /*    
      ...mapGetters(workerActivityStore, [
        'GE_WORKER_ACTIVITY_LIST'
      ]),    
      ...mapGetters(workerActivityHistoryStore, [
        'GE_WORKER_ACTIVITY_HISTORY_LIST'
      ]),
      */    
      ...mapGetters(resultStore, [
        'GE_RESULT', 'GE_RESULT_LIST'
      ]),

      protectEquipmentList() {
        let query = Enumerable.from(this.GE_EQUIPMENT_LIST)
                              .where(w=>w.type === 'protect')
                              .toArray()

        return query
      },
      protectWorkEquipmentList() {
        let query = Enumerable.from(this.GE_WORK_EQUIPMENT_LIST)
                              .where(w=>w.work_id === this.GE_WORKER.work_id)
                              .join(Enumerable.from(this.GE_EQUIPMENT_LIST)
                                              .where(w=>w.type === 'protect'),
                                pk=>pk.equipment_id,
                                fk=>fk.equipment_id)
                              .toArray()
        return query
      },
      protectWorkerEquipmentList(){
        let query = Enumerable.from(this.GE_WORK_EQUIPMENT_LIST)
                              .where(w=>w.work_id === this.GE_WORKER.work_id)
                              .join(Enumerable.from(this.GE_EQUIPMENT_LIST)
                                              .where(w=>w.type === 'protect'),
                                pk=>pk.equipment_id,
                                fk=>fk.equipment_id)
                              .join(Enumerable.from(this.GE_WORKER_EQUIPMENT_LIST)
                                              .where(w=>(w.worker_id===this.GE_WORKER.worker_id)),
                                pk=>pk.equipment_id,
                                fk=>fk.equipment_id)
                              .toArray()
        return query
      },
      isCheckEquip(){
        if((this.protectWorkEquipmentList.length - this.protectWorkerEquipmentList.length)===0)
          return true
        else
          return false
      },
    },

    watch: {
      selectedProtectEquipment(newVal, oldVal){
        console.log('selectedProtectEquipment oldVal : ' + oldVal)
        console.log('selectedProtectEquipment newVal : ' + newVal)
        
        let arrNew = JSON.parse("[" + newVal + "]")
        let arrOld = JSON.parse("[" + oldVal + "]")

        if(arrNew.length > 0){

          if(arrNew.length > this.protectWorkEquipmentList.length ){
            this.setSnackbar(this.protectWorkEquipmentList.length + '이상을 선택할 수 없습니다.')
            //alert( this.protectWorkEquipmentList.length + '이상을 선택할 수 없습니다.' )
            this.selectedProtectEquipment = JSON.parse("[" + oldVal + "]")
          }else{
       
            if( (arrNew.length - arrOld.length) === 1){
              
              this.pushProtectWorkerEquipment(arrNew, arrOld)
            }
            else if( (arrOld.length - arrNew.length) === 1 ){
              console.log('2')
              let val = arrOld.filter(f => !arrNew.includes(f))              
              this.delProtectWorkerEquipment(val)              
            }

          }
        }else{
          if(arrOld.length === 1){
            console.log('3')
            this.delProtectWorkerEquipment(arrOld)
          }
        }
        this.setHistoryActivityWorker(newVal, oldVal) 
        //this.recordWorkerResult('equip_choice', '') 
      }
    },
    mounted() {
      this.initSelectedWorkerEquipment()
    },
    beforeDestroy() {
      //this.nextStep()
    },  
    methods: {
      /*
      ...mapActions(workerActivityHistoryStore, [
        'AC_WORKER_ACTIVITY_HISTORY_PUSH'
      ]),

      ...mapActions(workerActivityStore, [
        'AC_WORKER_ACTIVITY_LIST'
      ]),
      */
      ...mapActions(workerEquipmentStore, [
        'AC_WORKER_EQUIPMENT_PUSH', 'AC_WORKER_EQUIPMENT_DEL', 'AC_WORKER_EQUIPMENT_LIST'
      ]),

      ...mapActions(resultStore, [
        'AC_RESULT_EDIT'
      ]),

      initSelectedWorkerEquipment(){
        this.selectedProtectEquipment=[]
        if(this.GE_WORKER_EQUIPMENT_LIST.length > 0){

          let query = Enumerable.from(this.GE_WORKER_EQUIPMENT_LIST)
                                .where(w=>w.worker_id === this.GE_WORKER.worker_id)
                                .join(Enumerable.from(this.GE_EQUIPMENT_LIST)
                                                .where(w=>w.type === 'protect'),
                                  pk=>pk.equipment_id,
                                  fk=>fk.equipment_id)
                                .toArray()
          if(query.length > 0){
            for(const selectedItem of query){
              this.selectedProtectEquipment.push(selectedItem.equipment_id)
            }
          }
        }  
        
      },
      /*
      setSelectedWorkerEquipment(itemArr) {
        this.initWorkerEquipment(itemArr)
        if(itemArr.length > 0){          
          for( const selectedItem  of itemArr){
            this.AC_WORKER_EQUIPMENT_PUSH({
                worker_id: this.GE_WORKER.worker_id, 
                equipment_id: selectedItem
              })
          }
          
        }  
      },
      */
      queryProtectWorkerEquipment(val){
        let query = this.GE_WORKER_EQUIPMENT_LIST.filter(f=>(f.worker_id === this.GE_WORKER.worker_id && f.equipment_id === val[0]))
        return query
      },
      delProtectWorkerEquipment(val){
        let query = this.queryProtectWorkerEquipment(val)
        if(query.length > 0)
          this.AC_WORKER_EQUIPMENT_DEL({
              worker_id: this.GE_WORKER.worker_id, 
              equipment_id: val[0]
          })      
      },      
      pushProtectWorkerEquipment(arrNew, arrOld){
        console.log('1')
        let val = arrNew.filter(f => !arrOld.includes(f))

        let query = this.GE_WORKER_EQUIPMENT_LIST.filter(f=>(f.worker_id === this.GE_WORKER.worker_id && f.equipment_id === val[0]))

        if(query.length < 1)
          //저장
          this.AC_WORKER_EQUIPMENT_PUSH({
              worker_id: this.GE_WORKER.worker_id, 
              equipment_id: val[0]
          })
      },      
      checkSelectedWorkerEquipment(newArr, oldArr){
        let arrNew = JSON.parse("[" + newArr + "]")
        let arrOld = JSON.parse("[" + oldArr + "]")
        //console.log('arrNew : ' + arrNew)  
        //console.log('arrOld : ' + arrOld)  

        let val = arrNew.filter(f => !arrOld.includes(f)) 
        //console.log('val : ' + val)
        
        let query = this.GE_WORK_EQUIPMENT_LIST.filter(f => f.work_id === this.GE_WORKER.work_id)
        query = query.filter(f => f.equipment_id === parseInt(val))

        //console.log('query : ' + JSON.stringify(query, null, 2))

        if(query.length < 1)
          this.setSnackbar('잘못된 선택입니다.')
          //alert('잘못된 선택입니다.')
      },

      //장비선택으로 전환
      setHistoryActivityWorker(newArr, oldArr){
        if(newArr.length > oldArr.length){
          let difference = newArr.filter(f => !oldArr.includes(f));
          if(difference.length === 1)            
              this.historyActivityWorker(this.getActivityId('보호구장비선택'), this.GE_WORKER.worker_id, 'EQUIPMENT', 
                    parseInt(difference), this.protectEquipmentList.filter(f=>f.equipment_id === difference).type, 'checked')        

        }else if(newArr.length < oldArr.length){
          let difference = oldArr.filter(f => !newArr.includes(f));
          if(difference.length === 1)
               this.historyActivityWorker(this.getActivityId('보호구장비선택'), this.GE_WORKER.worker_id, 'EQUIPMENT', 
                    parseInt(difference), this.protectEquipmentList.filter(f=>f.equipment_id === difference).type, 'unChecked')        
        }

      },
      getImgUrl(val) {
        let imgUrl=val.substring(val.lastIndexOf('/'), val.length)
        imgUrl = this.gitUrl + '/images' + imgUrl
        //imgUrl = '/images' + imgUrl
        //console.log('imgUrl', imgUrl)
        return imgUrl
      },
      initWorkerEquipment(itemArr) {

        console.log('itemArr initWorkerEquipment : ' + JSON.stringify(itemArr,null,2) )
        if(itemArr.length > 0){
          for( const selectedItem  of itemArr){
            this.AC_WORKER_EQUIPMENT_DEL({
                worker_id: this.GE_WORKER.worker_id, 
                equipment_id: selectedItem
              })
          }
        }
        //this.AC_WORKER_EQUIPMENT_LIST(this.GE_WORKER_EQUIPMENT_LIST.filter(f=>f.worker_id !== this.GE_WORKER.worker_id))
      },
      actionSelectedWorkerEquipment() {
        this.AC_WORKER_EQUIPMENT_LIST(this.GE_WORKER_EQUIPMENT_LIST.concat(this.selectedWorkerEquipmentList))          
        //console.log('this.GE_WORKER_EQUIPMENT_LIST : ' + JSON.stringify(this.GE_WORKER_EQUIPMENT_LIST,null,2));        
      },

      validate () {
        this.dialog = true
      },

      nextStep() {
        this.saveLog()
        //this.$router.replace('/work/choiceWork');
        this.dialog = false;
        this.$router.push('/work/rate/SafetyEquipmentWork');
      },
      saveLog(){
        this.activityWorker(this.GE_WORKER.worker_id, this.getActivityId('보호구장비선택'))
      },      

      setSnackbar(msg) {
          this.snackbar.isSnackbar=true
          this.snackbar.message=msg
          this.snackbar.vertical=true
      },
    },
  }  
</script>
