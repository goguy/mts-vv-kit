<template>
  <section>
    <section v-if="isCheckLogin">

        <!-- 데이터영역 -->        
        <v-row justify="center">
        <v-col
            cols="12"
        >
            <v-sheet
                class="mx-auto"
                max-width="1100"                   
            >
                <v-data-table
                caption="수강생 보고서 정보"
                :headers="headers"
                :items="workerResultList"
                >
                <template
                    v-slot:item.items="{ item }"
                >
                    <span v-if = "item.items.length > 0">
                        제출
                    </span>
                    <span v-else>
                        미제출
                    </span>  
                </template>        
                <template
                    v-slot:item.actions="{ item }"
                >  
                    <v-icon v-if = "item.items.length > 0"
                        small
                        class="mr-2"
                        @click="dialogReport(item)"
                    >
                        mdi-pencil
                    </v-icon>                      
                </template>        
                </v-data-table>
            </v-sheet>
        </v-col>
        </v-row>
        <v-overlay
        :value="overlay"
        > 
        <v-dialog
            v-model="dialog"
            max-width="1100"
        >
            <base-y-dialog
            :param="dialogOptions"
            />
        </v-dialog>
        </v-overlay>

    </section>
    <section v-else>
        <v-container>
            <v-card
                class="mx-auto"
                max-width="350"        
            >
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
                            name="loginItem.name"
                            rules="required|max:20"
                        >
                            <v-text-field
                            v-model="loginItem.name"
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
                            name="loginItem.email"
                            rules="required|email|max:50"
                        >
                            <v-text-field
                            v-model="loginItem.email"
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
                        @click="login"
                    >
                        Individual
                    </v-btn>
                    <v-btn @click="clear">
                        Clear
                    </v-btn>
                    </v-card-actions>
                </form>
                </validation-observer>
            </v-card>
        </v-container>
    </section>

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
    
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import Enumerable  from 'linq'

import { required, digits, email, max, regex } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

import '@/js/common/Linq.js'


const workStore = 'workStore'
const workerStore = 'workerStore'

const resultStore = 'resultStore'
const workerResultStore = 'workerResultStore'
const workerResultItemStore = 'workerResultItemStore'
const workerResultEvalStore = 'workerResultEvalStore'

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
    name: 'Evaling',
    components: {
        ValidationProvider,
        ValidationObserver,
    },
    data() {
        return {
            dialog: false,
            overlay: false,
            isCheckLogin: false,
            headers: [
                {
                text: '수강생명',
                align: 'start',
                sortable: false,
                value: 'worker_name',
                },
                { text: '수강생ID', value: 'worker_id' },
                { text: '정비작업명', value: 'work_name' },
                { text: '정비작업ID', value: 'work_id' },
                { text: '타입', value: 'type' },
                { text: '평가여부', value: 'admin_email'},
                { text: '제출여부', value: 'items'},
                { text: '등록일', value: 'reg_dt' },
                { text: 'Actions', value: 'actions', sortable: false },
            ],


            loginItemIndex: -1,
            loginItem: {
                name: '',
                email: '',
            },
            defaultItem: {
                name: '',
                email: '',
            },
            snackbar: {
                isSnackbar: false,
                vertical: true,
                message: '',
            },
            workerResultList: [],
            dialogOptions: {
            target: null,
            param: {},
            closeCallback: null,
            },
        }
    },
    computed: {
        ...mapGetters(workStore, [
            'GE_WORK_LIST'
        ]),    
        ...mapGetters(workerStore, [
            'GE_WORKER', 'GE_WORKER_LIST'
        ]),
        ...mapGetters(workerResultStore, [
            'GE_WORKER_RESULT_LIST'
        ]),
        ...mapGetters(workerResultItemStore, [
            'GE_WORKER_RESULT_ITEM_LIST'
        ]),
        ...mapGetters(workerResultEvalStore, [
            'GE_WORKER_RESULT_EVAL_LIST'
        ]),
        ...mapGetters(resultStore, [
            'GE_RESULT_LIST'
        ]),    
    },
    watch: {},
    mounted() {
        //this.getList()
    },
    methods: {

        getList() {          
            let query = Enumerable.from(this.GE_WORKER_LIST)
                                .select(s=>({
                                    worker_id: s.worker_id }))
                                .leftJoin(this.GE_WORKER_RESULT_EVAL_LIST,
                                    pk=>pk.worker_id,
                                    fk=>fk.worker_id,
                                    (left, right) => ({...left, admin_email: right === null ? '': right.user_email}))
                                .groupJoin(Enumerable.from(this.GE_WORKER_RESULT_ITEM_LIST),
                                    pk=>pk.worker_id,
                                    fk=>fk.worker_id,
                                    (group, items) =>({...group, items: items.toArray()}))    
                                .toArray()
            
            /*                
            query = Enumerable.from(query)
                            .groupBy(
                                g => g.worker_id,
                                element => element,
                                (worker_id, items) =>({worker_id, items: items.toArray()})
                            ).toArray()
            */



            query = Enumerable.from(this.GE_WORK_LIST)
                                .select(s=>({
                                    work_id: s.work_id,
                                    work_name: s.name,
                                    type: s.type,
                                    reg_dt: s.reg_dt
                                    }))
                                .join(Enumerable.from(this.GE_WORKER_LIST),
                                    pk=>pk.work_id,
                                    fk=>fk.work_id,
                                    (left, right) =>({...left, ...right}))
                                .select(s=>({
                                    worker_id: s.worker_id,
                                    worker_name: s.name,
                                    work_name: s.work_name,
                                    work_id: s.work_id,
                                    type: s.type,
                                    reg_dt: s.reg_dt }))
                                .join(Enumerable.from(this.GE_RESULT_LIST),
                                    pk=>pk.type,
                                    fk=>fk.type,
                                    (left, right) =>({...left, ...right}))
                                .select(s=>({
                                    worker_id: s.worker_id,
                                    worker_name: s.worker_name,
                                    work_name: s.work_name,
                                    work_id: s.work_id,
                                    type: s.type,
                                    result_id: s.result_id,
                                    reg_dt: s.reg_dt }))
                                .join(Enumerable.from(query),
                                    pk=>pk.worker_id,
                                    fk=>fk.worker_id,
                                    (left, right) =>({...left, ...right}))
                                .toArray()
            this.workerResultList=query
            console.log('workerResultList - query',JSON.stringify(query,null,2))
        },      

        getIndividualList(items) {          
            let query = Enumerable.from(this.GE_WORKER_LIST).where(w=>(w.name===items.name && w.email===items.email))
                                .select(s=>({
                                    worker_id: s.worker_id }))
                                .leftJoin(this.GE_WORKER_RESULT_EVAL_LIST,
                                    pk=>pk.worker_id,
                                    fk=>fk.worker_id,
                                    (left, right) => ({...left, admin_email: right === null ? 'N': 'Y'}))
                                .groupJoin(Enumerable.from(this.GE_WORKER_RESULT_ITEM_LIST),
                                    pk=>pk.worker_id,
                                    fk=>fk.worker_id,
                                    (group, items) =>({...group, items: items.toArray()}))    
                                .toArray()
            /*
            query = Enumerable.from(query)
                            .groupBy(
                                g => g.worker_id,
                                element => element,
                                (worker_id, items) =>({worker_id, items: items.toArray()})
                            ).toArray()
            */
            query = Enumerable.from(this.GE_WORK_LIST)
                                .select(s=>({
                                    work_id: s.work_id,
                                    work_name: s.name,
                                    type: s.type,
                                    reg_dt: s.reg_dt
                                    }))
                                .join(Enumerable.from(this.GE_WORKER_LIST),
                                    pk=>pk.work_id,
                                    fk=>fk.work_id,
                                    (left, right) =>({...left, ...right}))
                                .select(s=>({
                                    worker_id: s.worker_id,
                                    worker_name: s.name,
                                    work_name: s.work_name,
                                    work_id: s.work_id,
                                    type: s.type,
                                    agency: s.agency,
                                    worker_reg_dt: s.reg_dt }))
                                .join(Enumerable.from(this.GE_RESULT_LIST),
                                    pk=>pk.type,
                                    fk=>fk.type,
                                    (left, right) =>({...left, ...right}))
                                .select(s=>({
                                    worker_id: s.worker_id,
                                    worker_name: s.worker_name,
                                    work_name: s.work_name,
                                    work_id: s.work_id,
                                    type: s.type,
                                    agency: s.agency,
                                    result_id: s.result_id,
                                    reg_dt: s.worker_reg_dt }))
                                .join(Enumerable.from(query),
                                    pk=>pk.worker_id,
                                    fk=>fk.worker_id,
                                    (left, right) =>({...left, ...right}))
                                .toArray()
            this.workerResultList=query
            console.log('workerResultList - query',JSON.stringify(query,null,2))
        },      

        isCheckData(items){
            let query = Enumerable.from(this.GE_WORKER_LIST)
                                .where(w=>(w.name===items.name&&w.email===items.email))
                                .join(Enumerable.from(this.GE_WORKER_RESULT_ITEM_LIST),
                                    pk=>pk.worker_id,
                                    fk=>fk.worker_id)
                                .toArray()
            if(query.length>0)
                return true
            else 
                return false
        },
        login() {
            if(this.isCheckData(this.loginItem)){
                this.setSnackbar('데이터가 있습니다.')
                this.isCheckLogin=true
                this.getIndividualList(this.loginItem)
            }else            
                this.setSnackbar('데이터가 없습니다.')
            
            console.log('login')
        },
        submit () {
            this.$refs.observer.validate()
        },
        clear () {
            this.loginItem = Object.assign({}, this.defaultItem)
            this.$refs.observer.reset()
        },
        setSnackbar(msg) {
            this.snackbar.isSnackbar=true
            this.snackbar.message=msg
            this.snackbar.vertical=true
        },

        dialogReport(item){
            let type = item.type
            this.dialogOptions.target = () => import('@/views/work/eval/EvalReportDiag'+type+'.vue')
            this.dialogOptions.param = item
            this.dialogOptions.closeCallback = this.closeDialog
            this.dialog=true
            this.overlay=true
        },
        
        closeDialog() {
            this.dialogOptions.target=null
            this.dialog=false
            this.overlay=false
        },
    },
}
</script>

<style>

</style>