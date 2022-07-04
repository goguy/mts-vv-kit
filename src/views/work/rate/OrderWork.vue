<template>
  <v-container
    id="order-work"
    tag="section"
  >
    <v-card class="pa-5 grey lighten-5">
      <v-card-title class="text-h5 font-weight-medium pa-5">
          <v-icon
            large
          >mdi-directions-fork</v-icon> 
          &nbsp;작업허가서
      </v-card-title>
        <v-container
          class="pa-0"
          fluid
        >
          <v-row
             justify="center"
          >
            <v-col
              cols="12"
              class="d-flex justify-center"
            >
              <v-img
                :src="workPermitImgSrc"
                contain
                aspect-ratio="1"
              >
                <div v-show="checkbox">
                  <div class="clsPermitWorkerName">
                    <p class="text-h6 font-weight-bold">{{this.GE_WORKER.name}}</p>
                  </div>                
                  <div class="clsPermitWorkName">
                    <p class="text-h6 font-weight-bold">{{workName}}</p>
                  </div>
                  <div class="clsPermitWorkerYear">
                    <p class="text-h6 font-weight-bold">{{this.regDt.substring(0,4)}}</p>
                  </div>
                  <div class="clsPermitWorkerMonth">
                    <p class="text-h6 font-weight-bold">{{this.regDt.substring(5,7)}}</p>
                  </div>
                  <div class="clsPermitWorkerDay">
                    <p class="text-h6 font-weight-bold">{{this.regDt.substring(8,10)}}</p>
                  </div>
                  <div class="clsPermitWorkerName1">
                    <p class="text-h6 font-weight-bold">{{this.GE_WORKER.name}}</p>
                  </div>
                </div>
              </v-img>        

            </v-col>
          </v-row>

          <v-checkbox
            v-model="checkbox"
            label="확인하였습니다"
            class="font-weight-bold"
          ></v-checkbox>

        </v-container>
    </v-card>
    <v-row v-if="checkbox"
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
            보호구장비선택
          </v-btn>
        </v-card-actions>  
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
// vuex 라이브러리에서 mapGetters 함수를 가져옵니다.
import { mapGetters, mapActions } from 'vuex'
//import Enumerable  from 'linq'

import { activityMixin } from '@/mixins/activityMixin.js'

const workStore = 'workStore'
const workerStore = 'workerStore'
const resultStore = 'resultStore'

//Commmon Activity
//const activityStore = 'activityStore'

  export default {
    name: 'OrderWork',
    mixins: [activityMixin],
    data: () => ({
      dialog: false,
      valid: true,
      checkbox: false,
      checkOrder: '',
      workPermitImgSrc: require('@/assets/img/chkeckedClosedSpaceWorkPermit.png'),
      payloadWorker: {
        index: 0,
        worker:{
            worker_id: 0,
            name: '',
            email: '',
            agency: '',
            guide_chk: false,
            order_chk: false,
            reg_dt: '',
            work_id: 0
        }
      },
      //작업자선택결과
      resultPayload: {
        index: 0,
        result:[]
      },

    }),
    computed: {  
      ...mapGetters(workStore, [
        'GE_WORK_LIST'
      ]),    

      ...mapGetters(workerStore, [
        'GE_WORKER'
      ]),    
      /*
      ...mapGetters(activityStore, [
        'GE_ACTIVITY_LIST'
      ]),    
      */
      ...mapGetters(resultStore, [
        'GE_RESULT', 'GE_RESULT_LIST'
      ]),

      workName(){
        let query = this.GE_WORK_LIST.filter(f=>f.work_id === this.GE_WORKER.work_id) 
        //console.log(query,null,2)
        return query[0].name
      },
      regDt(){
        let regDt = new Date(+this.GE_WORKER.reg_dt + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, '')
        //console.log('regDt',regDt)
        return regDt
      },
    },
    watch: {
      checkbox(newCheckbox){
        this.setCheckbox(newCheckbox)        
        this.historyActivityWorker(this.getActivityId('작업허가서'), this.GE_WORKER.worker_id, 'WORK', 
                                    this.GE_WORKER.work_id, 'checkbox', newCheckbox)                        
      }

    },  
    mounted() {
      this.agreeOrderWork()
    },
    beforeDestroy() {
      //this.activityWorker(this.GE_WORKER.worker_id, this.getActivityId('작업허가서'))
    },  
    methods: {

      ...mapActions(workerStore, [
        'AC_WORKER', 'AC_WORKER_EDIT'  
      ]),
      ...mapActions(resultStore, [
        'AC_RESULT_EDIT'
      ]),
  
      setCheckbox(item) {
        console.log('item : ' + item)       
        this.GE_WORKER.order_chk=item        
        this.payloadWorker.worker=this.GE_WORKER
        this.AC_WORKER_EDIT(this.payloadWorker)

      },      
      agreeOrderWork() {
        if(this.GE_WORKER.order_chk)
          this.checkbox = true
      }, 
      validate () {
        this.dialog = true
      },
      nextStep() {
        this.saveLog()
        //this.$router.replace('/work/choiceWork');
        this.dialog = false;
        this.$router.push('/work/rate/protectEquipmentWork');
      },
      saveLog(){
        this.activityWorker(this.GE_WORKER.worker_id, this.getActivityId('작업허가서'))
      },      

    },
    
  }
</script>
<style scoped>
  .clsPermitWorkerName{
    position: absolute;
    left: 52%;
    top: 4.8%;
  }
  .clsPermitWorkerName1{
    position: absolute;
    left: 35%;
    top: 96%;
  }
  .clsPermitWorkName{
    position: absolute;
    left: 32%;
    top: 9.8%;
  }
  .clsPermitWorkerYear{
    position: absolute;
    left: 69.5%;
    top: 4.8%;
  }
  .clsPermitWorkerMonth{
    position: absolute;
    left: 76%;
    top: 4.8%;
  }
  .clsPermitWorkerDay{
    position: absolute;
    left: 80%;
    top: 4.8%;
  }

@media screen and (max-width: 1000px) {
  .clsPermitWorkerName{
    display: none;
  }
  .clsPermitWorkerName1{
    display: none;
  }
  .clsPermitWorkName{
    display: none
  }
  .clsPermitWorkerYear{
    display: none
  }
  .clsPermitWorkerMonth{
    display: none
  }
  .clsPermitWorkerDay{
    display: none
  }
}  

</style>
