<template>
  <section
    id="choiceWork"
    class="grey lighten-3"
  >
    <span class="bg"></span>
    <v-container>
      <p class="text-h4 my-12 text-center position-zindex">정비작업선택</p>
      <v-item-group
        v-model="checkedWork" 
        active-class="primary"
      >
        <v-row justify="center">
          <v-col
            v-for="(w, i) in workList"
            :key="i"
            md="4"
            sm="12"
          >
            <v-item v-slot="{toggle }"
            @change="changeSelectedWork(w.work_id)"
            >
                <v-card
                  class="mx-auto"
                  max-width="350"
                  @click="toggle"
                >
                    <v-img
                    :src="getImgUrl(w.img_url)"
                    height="200px" 
                    contain
                    aspect-ratio="1"
                    class="grey lighten-2"                        
                    />

                  <v-card-title
                    v-text="w.name"
                    class="justify-center font-weight-black"
                  />                      
                </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-item-group>
    </v-container>    
    <v-dialog
      v-model="dialogWorker"
      max-width="600px"
    >
      <v-card>
        <validation-observer
          ref="observer"
          v-slot="{ invalid }"
        >
          <form @submit.prevent="submit">
            <v-card-title>
              <span class="text-h5">수강생정보</span>          
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col
                  cols="12"
                  sm="12"
                  md="12"
                >
                  <validation-provider
                    v-slot="{ errors }"
                    name="workerItem.name"
                    rules="required|max:20"
                  >
                    <v-text-field
                      v-model="workerItem.name"
                      :counter="20"
                      :error-messages="errors"
                      required
                      label="수강생명"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
                <v-col
                  cols="12"
                  sm="12"
                  md="12"
                >
                  <validation-provider
                    v-slot="{ errors }"
                    name="workerItem.agency"
                    rules="required|max:20"
                  >
                    <v-text-field
                      v-model="workerItem.agency"
                      :counter="20"
                      :error-messages="errors"
                      required
                      label="소속"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
                <v-col
                  cols="12"
                  sm="12"
                  md="12"
                >
                  <validation-provider
                    v-slot="{ errors }"
                    name="workerItem.email"
                    rules="required|email|max:50"
                  >
                    <v-text-field
                      v-model="workerItem.email"
                      :counter="50"
                      :error-messages="errors"
                      required
                      label="email"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                class="mr-4"
                type="submit"
                :disabled="invalid"
                @click="save"
              >
                Update Profile
              </v-btn>
              <v-btn @click="clear">
                Clear
              </v-btn>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
              >
                Close
              </v-btn>

            </v-card-actions>
          </form>
        </validation-observer>

      </v-card>
    </v-dialog>  
    
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
  </section>
</template>
<script>
// vuex 라이브러리에서 mapGetters 함수를 가져옵니다.
import { mapGetters, mapActions } from 'vuex'
import Enumerable  from 'linq'

import { required, digits, email, max, regex } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

import { activityMixin } from '@/mixins/activityMixin.js'

const codeStore = 'codeStore'
const workStore = 'workStore'
const workerStore = 'workerStore'
const resultStore = 'resultStore'
const resultItemStore = 'resultItemStore'

  setInteractionMode('eager')

  extend('digits', {
    ...digits,
    message: '{_field_} needs to be {length} digits. ({_value_})',
  })

  extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  })

  extend('max', {
    ...max,
    message: '{_field_} may not be greater than {length} characters',
  })

  extend('regex', {
    ...regex,
    message: '{_field_} {_value_} does not match {regex}',
  })

  extend('email', {
    ...email,
    message: 'Email must be valid',
  })

  export default {
    name: 'choice-work',
    components: {
      ValidationProvider,
      ValidationObserver,
    },
    mixins: [activityMixin],
    data() {
      return {
        dialog: false,
        dialogWorker: false,
        checkedWork: undefined,

        workerItemIndex: -1,
        workerItem: {
          worker_id: 0,
          name: '',
          email: '',
          agency: '',
          guide_chk: false,
          order_chk: false,
          reg_dt: '',
          work_id: 0
        },
        defaultItem:{
          worker_id: 0,
          name: '',
          email: '',
          agency: '',
          guide_chk: false,
          order_chk: false,
          reg_dt: '',
          work_id: 0
        },
        payload: {
          index: 0,
          worker:[]
        },
        selectedWorkId:'',
        gitUrl: 'https://goguy.github.io/mts-vv-kit',
      };
    },
    computed: {  
      ...mapGetters(workStore, [
        'GE_WORK_LIST'
      ]),    
      ...mapGetters(codeStore, [
        'GE_CODE_LIST'
      ]),    
      ...mapGetters(workerStore, [
        'GE_WORKER', 'GE_WORKER_LIST'
      ]),    
      ...mapGetters(resultStore, [
        'GE_RESULT_LIST'
      ]),
      ...mapGetters(resultItemStore, [
        'GE_RESULT_ITEM_LIST'
      ]),
      workList() {
        let query = Enumerable.from(this.GE_WORK_LIST).orderBy(o=>o.work_id).toArray();
        return query
      }
    },
    watch: {
      checkedWork(val){
        console.log('val', JSON.stringify(val, null, 2))
        if(this.checkedWork !== undefined){
          this.dialogWorker=true
        }else{
          this.dialogWorker=false
        }
      }
    },  
    created() {
      this.initList()
    },
    mounted() {

      console.log('$vuetify.application.top : ' + this.$vuetify.application.top)
      console.log('$vuetify.application.bottom : ' + this.$vuetify.application.bottom)
      console.log('$vuetify.application.footer : ' + this.$vuetify.application.footer)

    },
    methods: {

      ...mapActions(workerStore, [
        'AC_WORKER','AC_WORKER_PUSH' 
      ]),

      initList() {
        this.GE_WORK_LIST
        this.GE_CODE_LIST
        this.GE_RESULT_LIST
      },

      close () {
        this.dialogWorker = false
        this.checkedWork = undefined
        setTimeout(() => (
            this.$nextTick(() => {
              this.workerItem = Object.assign({}, this.defaultItem)
              this.workerItemIndex = -1
              this.$refs.observer.reset()
            })
          ), 1000)
      },
      save() {
        console.log('save')

        if (this.workerItemIndex > -1) {
          this.payload.index=this.workerItemIndex
          this.payload.worker=this.workerItem
          //this.AC_WORKER_EDIT(this.payload)
          console.log('this.workerItemIndex : ' + this.workerItemIndex)
        }else{
          this.workerItem.worker_id = new Date().getTime()
          this.workerItem.reg_dt = new Date()
          this.workerItem.work_id = this.selectedWorkId
          this.AC_WORKER(this.workerItem)
          this.AC_WORKER_PUSH(this.workerItem)
        }
        console.log('this.workerItem', JSON.stringify(this.workerItem, null, 2))    
        this.close()
        this.dialog=true
      },

      submit () {
        this.$refs.observer.validate()
      },
      clear () {
        this.defaultItem.worker_id = this.workerItem.worker_id
        this.workerItem = Object.assign({}, this.defaultItem)
        this.$refs.observer.reset()
      },

      changeSelectedWork(key){
        this.selectedWorkId = key
        //this.$emit('change', this.selected);
        console.log('key : ' + key)

      },
      getImgUrl(val) {
        let imgUrl=val.substring(val.lastIndexOf('/'), val.length)
        imgUrl = this.gitUrl + '/images' + imgUrl
        //console.log('imgUrl', imgUrl)
        return imgUrl
      },
      nextStep() {
        this.saveLog(this.GE_WORKER)
        this.dialog = false;
        this.$router.push('/work/rate/prepareWork');
      },
      saveLog(val) {
        this.historyActivityWorker(this.getActivityId('정비작업선택'), val.worker_id, 'WORK', val.work_id, 'choice', 'checked')    
        this.historyActivityWorker(this.getActivityId('교육생정보입력'), val.worker_id, 'WORKER', val.worker_id, 'input', 'Join');

        this.activityWorker(val.worker_id, this.getActivityId('정비작업선택'))
        this.activityWorker(val.worker_id, this.getActivityId('교육생정보입력'))
        //this.activityWorker(this.GE_WORKER.worker_id, this.getActivityId('정비작업선택'))
        //this.activityWorker(this.GE_WORKER.worker_id, this.getActivityId('교육생정보입력'))
      }

    }
  }
</script>
<style scoped>
.bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: url('https://goguy.github.io/mts-vv-kit/images/tank_work_bg_final.png') no-repeat center center;
    background-size: cover;
    opacity: 0.7;
  }
.position-zindex{
  position:relative;
  z-index:1;
}  
</style>