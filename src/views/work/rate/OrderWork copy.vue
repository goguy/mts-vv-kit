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
              <!--
              <v-img
                :src="workPermitImgSrc"
                max-width="1000"
                min-height="1426"
                contain
                aspect-ratio="1"
              >
              -->
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
                    <p class="text-h6 font-weight-bold">{{this.GE_WORKER.reg_dt.substring(0,4)}}</p>
                  </div>
                  <div class="clsPermitWorkerMonth">
                    <p class="text-h6 font-weight-bold">{{this.GE_WORKER.reg_dt.substring(5,7)}}</p>
                  </div>
                  <div class="clsPermitWorkerDay">
                    <p class="text-h6 font-weight-bold">{{this.GE_WORKER.reg_dt.substring(8,10)}}</p>
                  </div>
                  <div class="clsPermitWorkerName1">
                    <p class="text-h6 font-weight-bold">{{this.GE_WORKER.name}}</p>
                  </div>
                </div>
              </v-img>        

            </v-col>
            <!--
            <v-col
              cols="12"
              lg="6"
              md="6"
              sm="12"
              class="d-flex justify-center"
            >
              <v-img
                contain
                :src="require('@/assets/img/fire_work_permit.png')"
                max-width="527"
                aspect-ratio="0.95"
                @click="orderModel('화기작업')"
              />
            </v-col>
            -->
          </v-row>

          <v-checkbox
            v-model="checkbox"
            label="확인하였습니다"
            class="font-weight-bold"
          ></v-checkbox>

        </v-container>
    </v-card>
    <!--
    <v-dialog
      v-model="dialog"
      max-width="600"
      persistent
    >
      <v-card>
        <v-card-title>
          {{checkOrder}} 허가서

          <v-spacer />

          <v-icon
            aria-label="Close"
            @click="dialog = false"
          >
            mdi-close
          </v-icon>
        </v-card-title>

        <v-card-text class="text-center">
              <v-img 
                v-if="checkOrder==='일반위험작업'"
                :src="require('@/assets/img/closedSpaceWorkPermit.png')"
                min-width="527"
                min-height="752"
              />

        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            class="mr-3"
            text
            @click="dialog = false"
          >
            close
          </v-btn>
        </v-card-actions>  
      </v-card>
    </v-dialog>
    -->
  </v-container>
</template>

<script>
// vuex 라이브러리에서 mapGetters 함수를 가져옵니다.
import { mapGetters, mapActions } from 'vuex'
//import Enumerable  from 'linq'

import { activityMixin } from '@/mixins/activityMixin.js'

const workStore = 'workStore'
const workerStore = 'workerStore'

//Commmon Activity
const activityStore = 'activityStore'
const workerActivityStore = 'workerActivityStore'
const workerActivityHistoryStore = 'workerActivityHistoryStore'

  export default {
    name: 'OrderWork',
    data: () => ({
      dialog: false,
      valid: true,
      checkbox: false,
      workerActivityList: [],
      checkOrder: '',
      workPermitImgSrc: require('@/assets/img/chkeckedClosedSpaceWorkPermit.png'),
      payloadWorker: {
        index: 0,
        worker:{
            worker_id: 0,
            name: '',
            guide_chk: false,
            order_chk: false,
            reg_dt: '',
            work_id: 0
        }
      }, 
    }),
    computed: {  
      ...mapGetters(workStore, [
        'GE_WORK_LIST'
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

      workName(){
        let query = this.GE_WORK_LIST.filter(f=>f.work_id === this.GE_WORKER.work_id) 
        //console.log(query,null,2)
        return query[0].name
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
      this.activityWorker(this.GE_WORKER.worker_id, this.getActivityId('작업허가서'))
    },  
    methods: {

      ...mapActions(workerStore, [
        'AC_WORKER', 'AC_WORKER_EDIT'  
      ]),

      ...mapActions(workerActivityHistoryStore, [
        'AC_WORKER_ACTIVITY_HISTORY_PUSH'
      ]),

      ...mapActions(workerActivityStore, [
        'AC_WORKER_ACTIVITY_LIST'
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
        /*
        let countAgree = this.GE_WORKER_ACTIVITY_LIST.filter(f=>( f.activity_id === this.getActivityId('작업허가서') && f.worker_id === this.GE_WORKER.worker_id ))
        if(countAgree.length > 0)
          this.checkbox = true

        console.log('countAgree : ' + countAgree.length ) 
        */       
      }, 
      validate () {
        if(this.$refs.form.validate()){
          this.activityWorker(this.GE_WORKER.worker_id, this.getActivityId('작업허가서'))  
        }
        
        //console.log(this.$refs.form.validate());
      },
      /*
      orderModel(val){
        console.log(val)
        this.checkOrder=val
        this.dialog=true
      },
      */
    },
    mixins: [activityMixin],    
    
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
