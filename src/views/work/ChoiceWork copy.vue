<template>
  <section
    id="choiceWork"
    class="grey lighten-3"
  >
    <v-row no-gutters>
      <v-img
        :min-height="'calc(100vh - ' + $vuetify.application.top + 'px)'"
        :src="require('@/assets/img/oil_tanks.png')"
        class="white--text"
        gradient="to bottom, rgba(11, 28, 61, .9), rgba(0,0,0,.4)"
      >
  
        <div class="py-12"></div>

        <v-container class="text-center">
          <h2 class="display-2 font-weight-bold mb-3">정비작업선택</h2>

          <v-responsive
            class="mx-auto mb-12"
            width="56"
          >
            <v-divider class="mb-1"></v-divider>

            <v-divider></v-divider>
          </v-responsive>

          <v-item-group
            v-model="checkedWork" 
            active-class="primary"
          >
            <v-row>
              <v-col
                v-for="(w, i) in workList"
                :key="i"
                cols="12"
                md="6"
              >
                <v-item v-slot="{toggle }">
                  <v-card
                    class="py-6 px-4"
                    color="grey lighten-5"
                    flat
                    @click="toggle"
                  >
                    <div class="d-flex flex-no-wrap justify-space-between">
                      <div>  
                        <v-theme-provider dark>
                          <div>
                            <v-avatar
                              color="primary"
                              size="88"
                            >
                            <span  
                              class="white--text text-h5"
                              v-text="w.time" />
                            </v-avatar>
                          </div>
                        </v-theme-provider>

                        <v-card-title
                          class="justify-center font-weight-black text-uppercase"
                          v-text="w.name"
                        ></v-card-title>

                        <v-card-text
                          class="subtitle-1"
                          v-text="w.rmk"
                        >
                        </v-card-text>
                      </div>

                      <v-avatar
                        class="ma-3"
                        size="200"
                        tile
                      >
                        <v-img 
                        :src="require('@/assets/img/workerTool.png')"
                        :max-width="300"
                        contain
                        />
                      </v-avatar>
                    </div>                     

                  </v-card>
                </v-item>

              </v-col>
            </v-row>
          </v-item-group>

        </v-container>

        <div class="py-12">
          <v-container
            id="user-profile-view"
            tag="section"
            v-if="showWorker"
          >

            <v-row justify="center">
              <v-col
                cols="12"
                md="6"
              >
                <base-material-card
                  color="primary"
                  icon="mdi-account-outline"
                  title="교육생정보"
                >
                  <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation                  
                  >
                    <v-container class="py-0">
                      <v-row>

                        <v-col cols="12">
                          <v-text-field
                            v-model="name"
                            :counter="10"
                            :rules="nameRules"
                            label="Name"
                            required                          
                            color="purple"
                          ></v-text-field>
                        </v-col>

                        <v-col
                          cols="12"
                          class="text-right"
                        >
                          <v-btn
                            :disabled="!valid"
                            color="primary"
                            min-width="150"
                            @click="validate"
                          >
                            Update Profile
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-form>
                </base-material-card>
              </v-col>
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
                    작업준비
                  </v-btn>
                </v-card-actions>  
              </v-card>
            </v-dialog>

          </v-container>

        </div>
      </v-img>
    </v-row>

  </section>

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
    name: 'ChoiceWork',
    data() {
      return {
        dialog: false,
        checkedWork: undefined,
        showWorker: false,
        valid: true,
        name: '',
        nameRules: [
          v => !!v || 'Name is required',
          v => (v && 3 <= v.length && v.length<= 10) || 'Name must be more than 3 characters and less than 10 characters',
        ],
        workerActivityList: [],
        isWorkerId: false,
      };
    },
    computed: {  
      ...mapGetters(workStore, [
        'GE_WORK_LIST'
      ]),    

      ...mapGetters(workerStore, [
        'GE_WORKER', 'GE_WORKER_LIST'
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


      workList() {
        let query = Enumerable.from(this.GE_WORK_LIST).orderBy(o=>o.work_id).toArray();
        return query
      }
    },
    watch: {
      checkedWork(newCheckedWork){

        if(this.checkedWork !== undefined){
          this.showWorker=true;
          if(newCheckedWork === 0)
            this.GE_WORKER.work_id = 1
          else    
            this.GE_WORKER.work_id = this.checkedWork + newCheckedWork; 
        }else{
          this.showWorker=false;
          this.GE_WORKER.work_id ='';
        }

        let state = this.checkedWork === undefined ? 'undefined' : this.checkedWork
        if(this.isWorkerId)
          this.historyActivityWorker(this.getActivityId('정비작업선택'), this.GE_WORKER.worker_id, 'WORK', this.GE_WORKER.work_id, 'choice', state)
        
        //console.log('this.checkedWork : ' + this.checkedWork);

      }

    },  
    created() {},
    mounted() {
      //console.log('this.GE_WORK_LIST : ' + JSON.stringify(this.GE_WORK_LIST,null,2));
      //console.log('this.GE_WORKER : ' + JSON.stringify(this.GE_WORKER,null,2));
      //console.log('this.workList : ' + JSON.stringify(this.workList,null,2));
    },
    methods: {

      ...mapActions(workerStore, [
        'AC_WORKER','AC_WORKER_PUSH' 
      ]),

      ...mapActions(workerActivityHistoryStore, [
        'AC_WORKER_ACTIVITY_HISTORY_PUSH'
      ]),

      ...mapActions(workerActivityStore, [
        'AC_WORKER_ACTIVITY_LIST'
      ]),

      validate () {
        //this.$refs.form.validate();
        if(this.$refs.form.validate())
          this.saveAndDialog();
  
        //console.log('this.$refs.form.validate() : ' + this.$refs.form.validate());
      },

      saveAndDialog(){
        this.GE_WORKER.worker_id = new Date().getTime()
        this.GE_WORKER.reg_dt =  (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
        this.GE_WORKER.name = this.name
        //console.log('this.GE_WORKER : ' + JSON.stringify(this.GE_WORKER,null,2));
        this.pushWorker(this.GE_WORKER.worker_id, this.GE_WORKER.work_id, this.GE_WORKER.name, this.GE_WORKER.reg_dt)
        this.isWorkerId = true
        //console.log('this.GE_WORKER_LIST : ' + JSON.stringify(this.GE_WORKER_LIST,null,2));
        
        //this.workerActivityList = this.GE_WORKER_ACTIVITY_LIST
        this.historyActivityWorker(this.getActivityId('교육생정보입력'), this.GE_WORKER.worker_id, 'WORKER', 
                                    this.GE_WORKER.worker_id, 'input', 'Join');
        //console.log('this.GE_WORKER_LIST : ' + JSON.stringify(this.GE_WORKER_ACTIVITY_LIST,null,2));
        this.historyActivityWorker(this.getActivityId('정비작업선택'), this.GE_WORKER.worker_id, 'WORK', this.GE_WORKER.work_id, 'choice', this.checkedWork)

        this.dialog = true
      },
      pushWorker(workerId, workId, name, regDt) {
        this.GE_WORKER.worker_id = workerId
        this.GE_WORKER.work_id = workId
        this.GE_WORKER.name = name
        this.GE_WORKER.reg_dt = regDt

        this.AC_WORKER(this.GE_WORKER)
        this.AC_WORKER_PUSH(this.GE_WORKER)
      
      },
      nextStep() {
        //this.$router.replace('/work/choiceWork');
        this.activityWorker(this.GE_WORKER.worker_id, this.getActivityId('정비작업선택'))
        this.activityWorker(this.GE_WORKER.worker_id, this.getActivityId('교육생정보입력'))
        this.dialog = false;
        this.$router.push('/work/rate/prepareWork');
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
            worker_id: workerId,
            activity_id: activityId,
            domain: domain,
            domain_id: domainId,
            type: type,
            state: state,
            reg_dt: new Date(+new Date() + 3240 * 10000).toISOString().replace('T', ' ').replace(/\..*/, ''),
        })
        console.log('this.GE_WORKER_ACTIVITY_HISTORY_LIST : ' + JSON.stringify(this.GE_WORKER_ACTIVITY_HISTORY_LIST,null,2))

      }
    }
  }
</script>