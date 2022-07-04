<template>
  <v-layout row justify-center>

    <v-card>
        <v-toolbar
        color="primary"
        >
        <v-toolbar-title>Settings</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
            <v-btn
                icon
                dark
                @click.native="close"
            >
            <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-toolbar-items>
        </v-toolbar>
    <v-row>
        <v-col
        cols="12"
        md="3"
        >
            <v-card>
                <v-card-title class="align-start">
                <span>정비작업선택</span>
                <v-spacer></v-spacer>
                <v-btn
                    icon
                    small
                    class="me-n3 mt-n2"
                    @click="openDialog('정비작업선택')"
                >
                    <v-icon>
                        mdi-dots-vertical
                    </v-icon>
                </v-btn>
                </v-card-title>

                <v-card-text>

                    <v-list class="pb-0">
                        <v-list-item
                        v-for="(data,index) in workInfo"
                        :key="data.name"
                        :class="`d-flex align-center px-0 ${index > 0 ? 'mt-4':''}`"
                        >

                        <div class="d-flex align-center flex-grow-1 flex-wrap">
                            <div class="me-2">
                            <div class="font-weight-semibold">
                                <span class="text--primary text-base me-1">{{ data.time }}</span>
                            </div>

                            <v-list-item-subtitle class="text-xs">
                            <h4 class="font-weight-semibold">
                                {{ data.name }}
                            </h4>
                            </v-list-item-subtitle>
                            </div>

                            <v-spacer></v-spacer>

                            <div>
                            <h4 class="font-weight-semibold">
                                {{ data.rmk }}
                            </h4>
                            </div>
                        </div>
                        </v-list-item>
                    </v-list>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col
        cols="12"
        md="3"
        >
            <v-card>
                <v-card-title class="align-start">
                <span>교육생정보</span>
                <v-spacer></v-spacer>
                <v-btn
                    icon
                    small
                    class="me-n3 mt-n2"
                    @click="openDialog('교육생정보입력')"
                >
                    <v-icon>
                        mdi-dots-vertical
                    </v-icon>
                </v-btn>
                </v-card-title>

                <v-list-item 
                three-line
                >
                <v-list-item-content>
                    <div class="text-overline mb-4">
                    ID : {{workerInfo.worker_id}}
                    </div>
                    <v-list-item-title class="text-h5 mb-1">
                    성명: {{workerInfo.name}}
                    </v-list-item-title>
                    <v-list-item-subtitle> 등록일 : {{workerInfo.reg_dt}}</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar
                    tile
                    size="60"
                    color="grey"
                ></v-list-item-avatar>
                </v-list-item>

            </v-card>
        </v-col>
        <v-col
        cols="12"
        md="3"
        >
            <v-card>
                <v-card-title class="align-start">
                <span>작업가이드</span>
                <v-spacer></v-spacer>
                <v-btn
                    icon
                    small
                    class="me-n3 mt-n2"
                    @click="openDialog('작업가이드')"
                >
                    <v-icon>
                        mdi-dots-vertical
                    </v-icon>
                </v-btn>
                </v-card-title>
                <v-card-text>
                    {{guideWorkInfo.length > 0 ? '동의했습니다.':'비동의했습니다.'}}
                </v-card-text>
            </v-card>
        </v-col>

        <v-col
        cols="12"
        md="3"
        >
            <v-card>
                <v-card-title class="align-start">
                <span>작업허가서</span>
                <v-spacer></v-spacer>
                <v-btn
                    icon
                    small
                    class="me-n3 mt-n2"
                    @click="openDialog('작업허가서')"
                >
                    <v-icon>
                        mdi-dots-vertical
                    </v-icon>
                </v-btn>
                </v-card-title>
                <v-card-text>
                    {{orderWorkInfo.length > 0 ? '동의했습니다.':'비동의했습니다.'}}
                </v-card-text>
            </v-card>
        </v-col>
        <v-col
        cols="12"
        >
            <v-card>
                <v-card-title class="align-start">
                <span>보호구선택</span>
                <v-spacer></v-spacer>
                <v-btn
                    icon
                    small
                    class="me-n3 mt-n2"
                    @click="openDialog('보호구선택')"
                >
                    <v-icon>
                        mdi-dots-vertical
                    </v-icon>
                </v-btn>

                </v-card-title>

                <v-row>
                    <v-col
                        cols="12"
                        md="4"
                    >
                        <v-card>
                            <v-card-title class="align-start">
                            <span> [{{workInfo[0].name}}] 보호구장비</span>
                            <v-spacer></v-spacer>
                            </v-card-title>
                            <v-list>
                                <template v-for="item in queryWorkEquipment('protect')">
                                <v-list-item
                                    :key="item.name"
                                >
                                    <v-list-item-avatar>
                                    <v-icon>mdi-bike</v-icon>
                                    </v-list-item-avatar>
                                    <v-list-item-title v-text="item.name"></v-list-item-title>
                                </v-list-item>
                                </template>
                            </v-list>
                        </v-card>
                    </v-col>
                    <v-col
                        cols="12"
                        md="4"
                    >
                        <v-card>
                            <v-card-title class="align-start">
                            <span> [{{workerInfo.name}}] 선택한 보호구장비</span>
                            <v-spacer></v-spacer>
                            </v-card-title>
                            <v-list>
                                <template v-for="item in queryWorkerEquipment('protect')">
                                <v-list-item
                                    :key="item.name"
                                >
                                    <v-list-item-avatar>
                                    <v-icon>mdi-bike</v-icon>
                                    </v-list-item-avatar>
                                    <v-list-item-title v-text="item.name"></v-list-item-title>
                                </v-list-item>
                                </template>
                            </v-list>

                        </v-card>
                    </v-col>
                    <v-col
                        cols="12"
                        md="4"
                    >
                        <v-card>
                            <v-card-title class="align-start">
                            <span> 결과확인</span>
                            <v-spacer></v-spacer>
                            </v-card-title>
                            <v-data-table
                            :headers="headersQWAWE"
                            :items="queryWorkAndWorkerEquipment('protect')"
                            :items-per-page="15"
                            class="elevation-1"
                            ></v-data-table>              
                        </v-card>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>

        <v-col
        cols="12"
        >
            <v-card>
                <v-card-title class="align-start">
                <span>안전장비선택</span>
                <v-spacer></v-spacer>
                <v-btn
                    icon
                    small
                    class="me-n3 mt-n2"
                    @click="openDialog('안전장비선택')"
                >
                    <v-icon>
                        mdi-dots-vertical
                    </v-icon>
                </v-btn>

                </v-card-title>

                <v-row>
                    <v-col
                        cols="12"
                        md="4"
                    >
                        <v-card>
                            <v-card-title class="align-start">
                            <span> [{{workInfo[0].name}}] 안전장비</span>
                            <v-spacer></v-spacer>
                            </v-card-title>
                            <v-list>
                                <template v-for="item in queryWorkEquipment('safety')">
                                <v-list-item
                                    :key="item.name"
                                >
                                    <v-list-item-avatar>
                                    <v-icon>mdi-bike</v-icon>
                                    </v-list-item-avatar>
                                    <v-list-item-title v-text="item.name"></v-list-item-title>
                                </v-list-item>
                                </template>
                            </v-list>
                        </v-card>
                    </v-col>
                    <v-col
                        cols="12"
                        md="4"
                    >
                        <v-card>
                            <v-card-title class="align-start">
                            <span> [{{workerInfo.name}}] 선택한 안전장비</span>
                            <v-spacer></v-spacer>
                            </v-card-title>
                            <v-list>
                                <template v-for="item in queryWorkerEquipment('safety')">
                                <v-list-item
                                    :key="item.name"
                                >
                                    <v-list-item-avatar>
                                    <v-icon>mdi-bike</v-icon>
                                    </v-list-item-avatar>
                                    <v-list-item-title v-text="item.name"></v-list-item-title>
                                </v-list-item>
                                </template>
                            </v-list>

                        </v-card>
                    </v-col>
                    <v-col
                        cols="12"
                        md="4"
                    >
                        <v-card>
                            <v-card-title class="align-start">
                            <span> 결과확인</span>
                            <v-spacer></v-spacer>
                            </v-card-title>

                            <v-data-table
                            :headers="headersQWAWE"
                            :items="queryWorkAndWorkerEquipment('safety')"
                            :items-per-page="10"
                            class="elevation-1"
                            ></v-data-table>              

                        </v-card>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
        <v-col
        cols="12"
        >
            <v-card>
                <v-card-title class="align-start">
                <span>작업하기</span>
                <v-spacer></v-spacer>
                <v-btn
                    icon
                    small
                    class="me-n3 mt-n2"
                    @click="openDialog('작업하기')"
                >
                    <v-icon>
                        mdi-dots-vertical
                    </v-icon>
                </v-btn>
                </v-card-title>
                <v-data-table
                :headers="headersWATI"
                :items="workAndworkerTdmotionInfo"
                :items-per-page="5"
                class="elevation-1"
                ></v-data-table>              

            </v-card>
        </v-col>
    </v-row> 


    </v-card>


    <v-row justify="center">
        <v-dialog
            v-model="dialog"
            persistent
            max-width="900"
        >
            <v-card>
            <v-card-title class="text-h5">
                {{workerActivityName}}
            </v-card-title>
            <v-card-text>

                <v-data-table
                :headers="headersWAHL"
                :items="queryWorkerActivityHistoryList"
                :items-per-page="5"
                class="elevation-1"
                ></v-data-table>              
                
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                color="green darken-1"
                text
                @click="dialog = false"
                >
                close
                </v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
  </v-layout>

</template>

<script>
import { mapGetters } from 'vuex'
import Enumerable  from 'linq'

const workStore='workStore'
const workerStore = 'workerStore'

const equipmentStore = 'equipmentStore'
const workEquipmentStore = 'workEquipmentStore'
const workerEquipmentStore = 'workerEquipmentStore'

const tdmotionStore = 'tdmotionStore'
const workTdmotionStore = 'workTdmotionStore'
const workerTdmotionStore = 'workerTdmotionStore'

//Commmon Activity
const activityStore = 'activityStore'
const workerActivityStore = 'workerActivityStore'
const workerActivityHistoryStore = 'workerActivityHistoryStore'



export default {
    name: 'WorkerActyDiagR',
    props: {
        dialogParam: Object,
    },
    data() {
      return {          
        dialog: false,
        queryWorkerActivityHistoryList: Array,
        workerActivityName: String,
        headersQWAWE: [
            {
            text: '장비명',
            align: 'start',
            value: 'name',
            },
            { text: '작업자아이디', value: 'worker_id' },
        ],
        headersWATI: [
            {
            text: '2D모션ID',
            align: 'start',
            sortable: false,
            value: 'work_motion_id',
            },
            { text: '2D모션명', value: 'work_montion_name' },
            { text: '순서', value: 'disp_ord' },
            { text: '교육생2D모션ID', value: 'worker_motion_id' },
            { text: '2D모션명', value: 'worker_montion_name' },
        ],
        headersWAHL: [
            {
            text: '활동ID',
            align: 'start',
            sortable: false,
            value: 'activity_id',
            },
            { text: '작업자ID', value: 'worker_id' },
            { text: '도메인', value: 'domain' },
            { text: '도메인ID', value: 'domain_id' },
            { text: '타입', value: 'type' },
            { text: '상태', value: 'state' },
            { text: '등록일', value: 'reg_dt' },
        ],

        }
    },
    computed: {
        ...mapGetters(workStore, [
        'GE_WORK_LIST'
        ]),    
        ...mapGetters(workerStore, [
        'GE_WORKER'
        ]),    
        ...mapGetters(equipmentStore, [
        'GE_EQUIPMENT_LIST'
        ]),    
        ...mapGetters(workEquipmentStore, [
        'GE_WORK_EQUIPMENT_LIST'
        ]),    
        ...mapGetters(workerEquipmentStore, [
        'GE_WORKER_EQUIPMENT_LIST'
        ]), 
        ...mapGetters(tdmotionStore, [
        'GE_TDMOTION_LIST'
        ]),    
        ...mapGetters(workTdmotionStore, [
        'GE_WORK_TDMOTION_LIST'
        ]), 
        ...mapGetters(workerTdmotionStore, [
        'GE_WORKER_TDMOTION_LIST'
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
        workInfo() {
        let query = Enumerable.from(this.GE_WORK_LIST).where(w=>w.work_id ===this.dialogParam.work_id).toArray();
        return query
        },
        workerInfo() {
        return this.GE_WORKER
        },
        guideWorkInfo() {        
        return this.queryWorkerActivity.filter(f=>f.name === '작업가이드')
        },
        orderWorkInfo() {
        return this.queryWorkerActivity.filter(f=>f.name === '작업허가서')  
        },

        queryWorkerActivity() {
        let query = Enumerable.from(this.GE_ACTIVITY_LIST).join( 
                        Enumerable.from(this.GE_WORKER_ACTIVITY_LIST).where(w=>w.worker_id === this.dialogParam.worker_id),
                        pk=>pk.activity_id,
                        fk=>fk.activity_id,
                        (left, right)=>({...left, ...right})
                        ).orderBy(o=>o.disp_ord).toArray()
        return query  
        },
        workAndworkerTdmotionInfo() {
        let queryWorkTdmotion =  Enumerable.from(this.GE_TDMOTION_LIST).where(w=>w.type === 'normal')
                                    .select(s=>({
                                        work_motion_id: s.motion_id,
                                        work_montion_name: s.name,
                                        type: s.type}))
                                    .join(Enumerable.from(this.GE_WORK_TDMOTION_LIST)
                                                .where(w=>w.work_id === this.dialogParam.work_id && w.type === 'normal'),
                                        pk=>pk.work_motion_id,
                                        fk=>fk.motion_id,
                                        (left, right)=>({...left, ...right}))
                                    .toArray()                                 
        //console.log('queryWorkTdmotion : ' + JSON.stringify(queryWorkTdmotion,null,2)) 

        let queryWorkerTdmotion = Enumerable.from(this.GE_TDMOTION_LIST)
                                    .select(s=>({
                                        worker_motion_id: s.motion_id,
                                        worker_montion_name: s.name,
                                        type: s.type}))                                 
                                    .join(Enumerable.from(this.GE_WORKER_TDMOTION_LIST)
                                                .where(w=>w.worker_id === this.GE_WORKER.worker_id),
                                        pk=>pk.worker_motion_id,
                                        fk=>fk.motion_id,
                                        (left, right)=>({...left, ...right}))
                                    .toArray()
                                        
        //console.log('queryWorkerTdmotion : ' + JSON.stringify(queryWorkerTdmotion,null,2))
        
        let query = Enumerable.from(queryWorkTdmotion)
                                .groupJoin(Enumerable.from(queryWorkerTdmotion),
                                    pk => pk.work_motion_id,
                                    fk => fk.worker_motion_id,
                                    (left, right) => ({...left, right}))
                                .selectMany(m => m.right.defaultIfEmpty(),
                                    (left, right) => ({...left, ...right}))
                                .toArray();   

        //console.log('query : ' + JSON.stringify(query,null,2))
        return query
        },    

    },
    watch: {      
    },
    beforeDestroy() {
    },

    mounted() {
        console.log('dialogParam : ' + JSON.stringify(this.dialogParam,null,2))
    },
    methods: {
        close() {
            this.$emit('closeDialog', false)
        },
        initgQuery() {
            let query=Enumerable.from(this.GE_WORKER).toArray()
            console.log('query1 : ' + JSON.stringify(query,null,2))
        },

        queryWorkEquipment(type) {
        let query = Enumerable.from(this.GE_EQUIPMENT_LIST).join(
                    Enumerable.from(this.GE_WORK_EQUIPMENT_LIST).where(w=>w.work_id === this.dialogParam.work_id),
                    pk=>pk.equipment_id,
                    fk=>fk.equipment_id,
                    (left, right) =>({...left, ...right})
                ).where(w=>w.type === type).orderBy(o=>o.disp_ord).toArray()
        return query
        },
        queryWorkerEquipment(type) {
        let query = Enumerable.from(this.GE_EQUIPMENT_LIST).join(
                    Enumerable.from(this.GE_WORKER_EQUIPMENT_LIST).where(w=>w.worker_id === this.dialogParam.worker_id),
                    pk=>pk.equipment_id,
                    fk=>fk.equipment_id,
                    (left, right) =>({...left, ...right})
                ).where(w=>w.type === type).orderBy(o=>o.disp_ord).toArray()
        return query
        },
        queryWorkAndWorkerEquipment(type){
        let query = Enumerable.from(this.queryWorkEquipment(type))
                                .groupJoin(Enumerable.from(this.queryWorkerEquipment(type)),
                                    pk => pk.equipment_id,
                                    fk => fk.equipment_id,
                                    (left, right) => ({...left, right}))
                                .selectMany(m => m.right.defaultIfEmpty(),
                                    (left, right) => ({...left, ...right}))
                                .toArray();   

            //console.log('query : ' + JSON.stringify(query,null,2));
            return query
        },
        queryWorkerActivityHistory(type) {
            let query = Enumerable.from(this.GE_ACTIVITY_LIST).where(w=>w.name===type)
                                    .join(Enumerable.from(this.GE_WORKER_ACTIVITY_LIST).where(w=>w.worker_id === this.dialogParam.worker_id),
                                        pk=>pk.activity_id,
                                        fk=>fk.activity_id,
                                        (left, right)=>({...left, ...right})                
                                    ).join(Enumerable.from(this.GE_WORKER_ACTIVITY_HISTORY_LIST).where(w=>w.worker_id === this.dialogParam.worker_id),
                                        pk=>pk.activity_id,
                                        fk=>fk.activity_id,
                                        (left, right)=>({...left, ...right})              
                                    ).orderBy(o=>o.activity_id).toArray() 
            console.log('query : ' + JSON.stringify(query,null,2));
            
            this.queryWorkerActivityHistoryList = query
        },
        openDialog(type){
        this.dialog = true
        this.workerActivityName = type 
        this.queryWorkerActivityHistory(type) 
        },
    },
}
</script>
