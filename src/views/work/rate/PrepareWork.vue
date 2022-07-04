<template>
  <v-container
    id="prepare-work"
    tag="section"
  >
    <v-row
      justify="center"
    >
      <v-col
        cols="auto"
        class="mr-auto"
      >
      </v-col>
      <v-col cols="auto">
        <v-img
          contain
          :src="require('@/assets/img/work_character_final.png')"
          max-width="507"
        />
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
            작업가이드
          </v-btn>
        </v-card-actions>  
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
// vuex 라이브러리에서 mapGetters 함수를 가져옵니다.
import { mapGetters, mapActions } from 'vuex'
import Enumerable  from 'linq'

const workStore = 'workStore'
const workerStore = 'workerStore'

//Commmon Activity
const activityStore = 'activityStore'
const workerActivityStore = 'workerActivityStore'
const workerActivityHistoryStore = 'workerActivityHistoryStore'

  export default {
    name: 'prepare-work',
    data: () => ({
      dialog: false,
      workerActivityList: [],
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
    },
    
    watch: {},
    mounted() {},
    beforeDestroy() {
      /*
      this.activityWorker(this.GE_WORKER.worker_id, this.getActivityId('작업준비'))
      this.historyActivityWorker(this.getActivityId('작업준비'), this.GE_WORKER.worker_id, 'ACTIVITY', 
                                    this.getActivityId('작업준비'), 'hook', 'beforeDestroy')        
      */
    },  

    methods: {
      ...mapActions(workerStore, [
        'AC_WORKER' 
      ]),

      ...mapActions(workerActivityHistoryStore, [
        'AC_WORKER_ACTIVITY_HISTORY_PUSH'
      ]),

      ...mapActions(workerActivityStore, [
        'AC_WORKER_ACTIVITY_LIST'
      ]),

      validate () {
        this.dialog = true
      },
      nextStep() {
        this.saveLog()
        //this.$router.replace('/work/choiceWork');
        this.dialog = false;
        this.$router.push('/work/rate/guideWork');
      },
      saveLog(){
        this.activityWorker(this.GE_WORKER.worker_id, this.getActivityId('작업준비'))
        this.historyActivityWorker(this.getActivityId('작업준비'), this.GE_WORKER.worker_id, 'ACTIVITY', 
                                      this.getActivityId('작업준비'), 'hook', 'nextStep')        
      },
      activityWorker(workerId, activityId) {
        this.workerActivityList = this.GE_WORKER_ACTIVITY_LIST
        this.initActivityWoker(workerId, activityId)
        this.workerActivityList.push({worker_id: workerId, activity_id: activityId});
        this.AC_WORKER_ACTIVITY_LIST(this.workerActivityList);  
        this.workerActivityList = []
        //console.log('this.GE_WORKER_ACTIVITY_LIST : ' + JSON.stringify(this.GE_WORKER_ACTIVITY_LIST,null,2))
  
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
            worker_id: workerId,
            activity_id: activityId,
            domain: domain,
            domain_id: domainId,
            type: type,
            state: state,
            reg_dt: new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, ''),
        })
        //console.log('this.GE_WORKER_ACTIVITY_HISTORY_LIST : ' + JSON.stringify(this.GE_WORKER_ACTIVITY_HISTORY_LIST,null,2))
      }
    },    
  }
</script>
