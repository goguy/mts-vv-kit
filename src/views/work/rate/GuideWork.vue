<template>
  <v-container
    id="guide-work"
    tag="section"
  >
    <v-card class="pa-5 grey lighten-5 bg">
      <!--
      <v-img
      contain
      :src="require('@/assets/img/character_face_final.png')"
      aspect-ratio="1"
      class="ml-auto"
      >
      </v-img>          
      -->
        <v-card-title class="text-h5 font-weight-medium pa-5">
          <v-icon
            large
          >mdi-facebook-workplace</v-icon> 
          &nbsp;작업가이드
        </v-card-title>
          <v-card-text>
            <v-container
              class="pa-0"
              fluid
            >
              <v-row
                v-for="({num, text}, i) in guide"
                :key="i"
                align="center"
              >
                <v-col
                  cols="1"      
                >
                  <p class="text-right text-subtitle-1"
                    v-text="num"
                  />
                </v-col>
                <v-col
                  cols="11"      
                >
                    <p class="text-left body-1"
                      v-text="text"
                    />
                </v-col>
              </v-row>

              <v-checkbox
                v-model="checkbox"
                label="확인하였습니다."
                class="font-weight-bold"
              ></v-checkbox>
            </v-container>
          </v-card-text>
        
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
            작업허가서
          </v-btn>
        </v-card-actions>  
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
// vuex 라이브러리에서 mapGetters 함수를 가져옵니다.
import { mapGetters, mapActions} from 'vuex'
import { activityMixin } from '@/mixins/activityMixin.js'


const workStore = 'workStore'
const workerStore = 'workerStore'
const resultStore = 'resultStore'


//Commmon Activity
//const activityStore = 'activityStore'

  export default {
    name: 'guide-work',
    mixins: [activityMixin],
    data: () => ({
      dialog: false,
      guide: [
        {
          num: '1.',
          text: '작업 전에 작업허가서를 확인하여 작업을 숙지 합니다.',
        },
        {
          num: '2.',
          text: '[보호구 선택] 메뉴에서 작업에 맞는 보호구를 착용(선택)합니다. 알맞은 보호구를 착용(선택)하지 않으면 안전에 문제가 있을 수 있습니다.',
        },
        {
          num: '3.',
          text: '밀폐작업 전에 공기상태를 체크하시고 감시인원을 배치 하도록 합니다.',
        },
        {
          num: '4.',
          text: '밀폐작업 장의 작업 중에는 가스농도를 자주 체크하여 위험에 처하지 않도록합니다.',
        },
        {
          num: '5.',
          text: '가스농도가 위험 수위인 경우 작업을 중지하고 작업장을 빠져 나오시기바랍니다.',
        },
        {
          num: '6.',
          text: '작업이 완료되면 [작업완료] 버튼을 누르시면 시뮬레이션이 종료됩니다.',
        },
      ],
      valid: true,
      checkbox: false,
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

    },
    
    watch: {
      checkbox(newCheckbox){
        this.setCheckbox(newCheckbox)
        this.historyActivityWorker(this.getActivityId('작업가이드'), this.GE_WORKER.worker_id, 'WORK', 
                                    this.GE_WORKER.work_id, 'checkbox', newCheckbox)
      }
    },
    created() {
      //임시
      this.GE_RESULT_LIST    
    }, 

    mounted() {
      this.agreeGuideWork()
    },
    beforeDestroy() {
      //this.activityWorker(this.GE_WORKER.worker_id, this.getActivityId('작업가이드'))
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
        this.GE_WORKER.guide_chk=item        
        this.payloadWorker.worker=this.GE_WORKER
        this.AC_WORKER_EDIT(this.payloadWorker)
        
      },

      agreeGuideWork() {
        if(this.GE_WORKER.guide_chk)
          this.checkbox = true
      },

      validate() {
        this.dialog = true
        /*
        if(this.$refs.form.validate()){
          this.activityWorker(this.GE_WORKER.worker_id, this.getActivityId('작업가이드'))  
        }
        */        
      },
      nextStep() {
        this.saveLog()
        //this.$router.replace('/work/choiceWork');
        this.dialog = false;
        this.$router.push('/work/rate/orderWork');
      },
      saveLog(){
        this.activityWorker(this.GE_WORKER.worker_id, this.getActivityId('작업가이드'))      
      },      
    },
  }
</script>
<style scoped>
.bg {
    background: url('https://goguy.github.io/mts-vv-kit/images/character_face_final.png') no-repeat center right;
  }
</style>
