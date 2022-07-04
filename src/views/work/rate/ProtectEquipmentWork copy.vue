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
          해당정비작업의 보호구선택장비는 {{protectWorkEquipmentList.length}}장비를 착용해야 합니다.
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

const workerStore = 'workerStore'
const workEquipmentStore = 'workEquipmentStore'
const workerEquipmentStore = 'workerEquipmentStore'

//Commmon Activity
const activityStore = 'activityStore'
const workerActivityStore = 'workerActivityStore'
const workerActivityHistoryStore = 'workerActivityHistoryStore'


  export default {
    name: 'choice-equipment-work',
    mixins: [activityMixin],
    data: () => ({
      selectedWorkerEquipmentList: [],
      selectedProtectEquipment: [],
      snackbar: {
        isSnackbar: false,
        vertical: true,
        message: '',
      },
      gitUrl: 'https://goguy.github.io/mts-vv-kit',
    }),

    computed: {
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
      ...mapGetters(workerActivityStore, [
        'GE_WORKER_ACTIVITY_LIST'
      ]),    
      ...mapGetters(workerActivityHistoryStore, [
        'GE_WORKER_ACTIVITY_HISTORY_LIST'
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
              /*
              console.log('1')
              let val = arrNew.filter(f => !arrOld.includes(f))

              let query = this.GE_WORKER_EQUIPMENT_LIST.filter(f=>(f.worker_id === this.GE_WORKER.worker_id && f.equipment_id === val[0]))

              if(query.length < 1)
                //저장
                this.AC_WORKER_EQUIPMENT_PUSH({
                    worker_id: this.GE_WORKER.worker_id, 
                    equipment_id: val[0]
                })
              */  
            }
            else if( (arrOld.length - arrNew.length) === 1 ){
              console.log('2')
              let val = arrOld.filter(f => !arrNew.includes(f))
              
              this.delProtectWorkerEquipment(val)
              
              /*
              let query = this.GE_WORKER_EQUIPMENT_LIST.filter(f=>(f.worker_id === this.GE_WORKER.worker_id && f.equipment_id === val[0]))

              if(query.length > 0)
                this.AC_WORKER_EQUIPMENT_DEL({
                    worker_id: this.GE_WORKER.worker_id, 
                    equipment_id: val[0]
                })
              */  
            }

          }
        }else{
          if(arrOld.length === 1){
            console.log('3')

            this.delProtectWorkerEquipment(arrOld)

            /*
            let query = this.GE_WORKER_EQUIPMENT_LIST.filter(f=>(f.worker_id === this.GE_WORKER.worker_id && f.equipment_id === arrOld[0]))

            if(query.length > 0)
              this.AC_WORKER_EQUIPMENT_DEL({
                  worker_id: this.GE_WORKER.worker_id, 
                  equipment_id: arrOld[0]
              })
            */  
          }
        }

        this.setHistoryActivityWorker(newVal, oldVal)  
      }


    },
    mounted() {
      //this.AC_WORKER_EQUIPMENT_LIST(this.GE_WORKER_EQUIPMENT_LIST.filter(f=>f.worker_id !== this.GE_WORKER.worker_id))
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
        'AC_WORKER_EQUIPMENT_PUSH', 'AC_WORKER_EQUIPMENT_DEL', 'AC_WORKER_EQUIPMENT_LIST'
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


          /*
          let arrQuery = this.GE_WORKER_EQUIPMENT_LIST.filter(f=>f.worker_id === this.GE_WORKER.worker_id)
          for(const selectedItem of arrQuery){
            this.selectedProtectEquipment.push(selectedItem.equipment_id)
          }
          //console.log('arrQuery : ' + JSON.stringify(arrQuery,null,2))
          */
        }  
        
      },
      setSelectedWorkerEquipment(itemArr) {
        this.initWorkerEquipment(itemArr)
        if(itemArr.length > 0){          
          for( const selectedItem  of itemArr){
            this.AC_WORKER_EQUIPMENT_PUSH({
                worker_id: this.GE_WORKER.worker_id, 
                equipment_id: selectedItem
              })
          }
          
          /*
          for( const selectedItem  of itemArr){
            this.selectedWorkerEquipmentList.push({
              worker_id: this.GE_WORKER.worker_id, 
              equipment_id: selectedItem})
            //console.log('selectedItem : ' + selectedItem)
          }
          this.actionSelectedWorkerEquipment()
          this.selectedWorkerEquipmentList=[]
          */
        }  
      },
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
              this.historyActivityWorker(this.getActivityId('보호구선택'), this.GE_WORKER.worker_id, 'EQUIPMENT', 
                    parseInt(difference), this.protectEquipmentList.filter(f=>f.equipment_id === difference).type, 'checked')        

        }else if(newArr.length < oldArr.length){
          let difference = oldArr.filter(f => !newArr.includes(f));
          if(difference.length === 1)
               this.historyActivityWorker(this.getActivityId('보호구선택'), this.GE_WORKER.worker_id, 'EQUIPMENT', 
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
      nextStep() {
        this.activityWorker(this.GE_WORKER.worker_id, this.getActivityId('보호구선택'))
        //this.activityWorker(this.GE_WORKER.worker_id, this.getActivityId('안전장비선택'))

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
      setSnackbar(msg) {
          this.snackbar.isSnackbar=true
          this.snackbar.message=msg
          this.snackbar.vertical=true
      },
      
    },
  }  
</script>
