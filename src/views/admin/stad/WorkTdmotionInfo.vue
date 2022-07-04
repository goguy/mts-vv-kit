<template>
  <v-container
    id="WorkTdmotionInfo"
    fluid
    tag="section"
  >
    <v-row
        no-gutters
    >
        <v-col
          cols="auto"
          class="ml-auto"
        >
            <div>
            <v-btn 
                elevation="1" 
                @click="applyWorkTdmotion"
            >
               적용하기
            </v-btn>         
            </div>
        </v-col>
        
    </v-row>

    <v-row
    >
        <v-col
            cols="12"
            sm="4"
            md="4"
        >
          <v-data-table
            caption="정비작업"
            v-model="selectedWork"
            :headers="headersWork"
            :items="GE_WORK_LIST"
            show-select
            single-select
            item-key="work_id"
            sort-by="work_id"
            hide-default-footer
            disable-pagination
            class="elevation-1"
          >
          </v-data-table>
        </v-col>        
        <v-col
            cols="12"
            sm="8"
            md="8"        
        >
          <v-data-table
            caption="장비"
            v-model="selectedTdmotion"
            :headers="headersTdmotion"
            :items="GE_TDMOTION_LIST"
            show-select
            item-key="motion_id"
            sort-by="motion_id"
            hide-default-footer
            disable-pagination
            class="elevation-1"
          >
            <template v-slot:item.disp_ord="{ item }">
              <v-text-field
                v-model="item.disp_ord"
                label="표시순서"
                type="number"
                @change="changeDispOrd(item)"
              ></v-text-field>
            </template>  
          </v-data-table>

        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import  Enumerable from 'linq'

  const workStore = 'workStore'
  const tdmotionStore = 'tdmotionStore'
  const workTdmotionStore = 'workTdmotionStore'  


export default {
    name: 'WorkTdmotionInfo',
    data: () => ({
      selectedWork: [],
      headersWork: [
        {
          text: '정비작업명',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: '정비작업ID', value: 'work_id' },
        { text: '작업시간', value: 'time' },
      ],

      selectedTdmotion: [],  
      headersTdmotion: [
        {
          text: '모션명',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: '모션ID', value: 'motion_id' },
        { text: '타입', value: 'type' },
        { text: '표시순서', value: 'disp_ord' },
        { text: '비디오명', value: 'video_nm' },
        { text: '비디오타입', value: 'video_type' },
        //{ text: '비디오경로', value: 'video_url' },
      ],
      payload: {
        index: 0,
        workTdmotion:[]
      }, 

    }),    
    computed: {
        ...mapGetters(workStore, [
            'GE_WORK', 'GE_WORK_LIST'
        ]),    
        ...mapGetters(tdmotionStore, [
            'GE_TDMOTION', 'GE_TDMOTION_LIST'
        ]),    
        ...mapGetters(workTdmotionStore, [
            'GE_WORK_TDMOTION', 'GE_WORK_TDMOTION_LIST'
        ]),    
        /*        
        linqQuryWorkEqut() {
        },
        */  
    },
    watch: {
        selectedWork(val) {
            this.selectedTdmotion=[]
            this.clearDisdOrdTdmotion()
            if(val.length > 0){
                //console.log('val work: ' + JSON.stringify(val, null, 2))
                this.selectedWorkTdmotion(val)
            }
        },
        
        /*
        selectedWork(val) {
            if(val.length > 0){
                console.log('val work: ' + JSON.stringify(val, null, 2))
                this.selectedTdmotion=[]
                this.selectedWorkTdmotion(val)

            }else{  
                this.selectedTdmotion=[]
            }
        },        
        selectedTdmotion(val){
            console.log('val motion: ' + JSON.stringify(val, null, 2))
        }
        */
    },
    mounted() {
      //this.initQuery()
    },
    beforeDestroy() {
      this.clearDisdOrdTdmotion()
    },
    methods: {
        ...mapActions(tdmotionStore, [
          'AC_TDMOTION_LIST'
        ]),

        ...mapActions(workTdmotionStore, [
            'AC_WORK_TDMOTION', 'AC_WORK_TDMOTION_PUSH', 'AC_WORK_TDMOTION_EDIT', 'AC_WORK_TDMOTION_DEL', 'AC_WORK_TDMOTION_LIST' 
        ]),
        selectedWorkTdmotion(val) {

            let query = Enumerable.from(this.GE_TDMOTION_LIST)                                
                                    .join(Enumerable.from(this.GE_WORK_TDMOTION_LIST)
                                    .where(w=>w.work_id === val['0'].work_id),
                                        p=>p.motion_id,
                                        f=>f.motion_id,
                                        (left, right) =>({...left, right}))
                                    .toArray()

            query = Enumerable.from(query)
                                .select(s=>({
                                    work_id: s.right.work_id,
                                    motion_id: s.motion_id,
                                    name: s.name,
                                    type: s.type,
                                    disp_ord: s.right.disp_ord,
                                    rmk: s.rmk,
                                    disaster_id: s.disaster_id,
                                    video_nm: s.video_nm,
                                    video_type: s.video_type,
                                    video_url: s.video_url,
                                    img_nm: s.img_nm,
                                    img_url: s.img_url,
                                    reg_dt: s.reg_dt,
                                })).toArray()

            this.selectedTdmotion = query
            //console.log('query', JSON.stringify(query,null,2))
            this.setDisdOrdTdmotion(query)

            /*
            let query = Enumerable.from(this.GE_TDMOTION_LIST)                                
                                    .join(Enumerable.from(this.GE_WORK_TDMOTION_LIST)
                                    .where(w=>w.work_id === val['0'].work_id),
                                        p=>p.motion_id,
                                        f=>f.motion_id)
                                    .toArray()
            this.selectedTdmotion = query  
            console.log('query : ' + JSON.stringify(query,null,2))
            */
        
        },

        setDisdOrdTdmotion(query) {
            let arrData = Enumerable.from(this.GE_TDMOTION_LIST)
                                    .groupJoin(Enumerable.from(query),
                                      pk=> pk.motion_id,
                                      fk=> fk.motion_id,
                                      (left, right) => ({...left, right}))
                                    .selectMany(m => m.right.defaultIfEmpty(),
                                        (left, right) => ({...left, ...right}))
                                    .toArray()   
            
            
            //this.selectedTdmotion=arrData  
            this.AC_TDMOTION_LIST(arrData)
            //console.log('arrData', JSON.stringify(arrData,null,2))
        },

        clearDisdOrdTdmotion() {
            let query = Enumerable.from(this.GE_TDMOTION_LIST)
                                    .select(s=>({
                                        motion_id: s.motion_id,
                                        name: s.name,
                                        type: s.type,
                                        rmk: s.rmk,
                                        disaster_id: s.disaster_id,
                                        video_nm: s.video_nm,
                                        video_type: s.video_type,
                                        video_url: s.video_url,
                                        img_nm: s.img_nm,
                                        img_url: s.img_url,
                                        reg_dt: s.reg_dt,
                                        disp_ord: null }))
                                    .toArray()    
            this.AC_TDMOTION_LIST(query)
        },
      
        applyWorkTdmotion () {

          if(this.selectedWork.length > 0)
              if(this.selectedTdmotion.length > 0)
                if(this.checkDispOrd())
                  this.setSelectedWorkTdmotion(this.selectedWork, this.selectedTdmotion) 
                else
                  return
              else
                alert('정비를 선택하세요')                
          else
            alert('정비작업을 선택하세요')
          
          console.log('applyWorkTdmotion')

            /*
            if(this.selectedWork.length > 0){
                if(this.selectedTdmotion.length > 0){                    
                   this.setSelectedWorkTdmotion(this.selectedWork, this.selectedTdmotion) 
                }else{
                    alert('정비를 선택하세요')
                }
            }else{
                alert('정비작업을 선택하세요')
            }
            console.log('applyWorkTdmotion')
            */
        },
        setSelectedWorkTdmotion(sWork, sEquip) {
            this.clearSelectedWorkTdmotion(sWork)
            let arrData = []
            for(const item of sEquip){
                arrData.push({
                  work_id: sWork[0].work_id,
                  motion_id: item.motion_id,
                  type: item.type
                })
            }
            this.AC_WORK_TDMOTION_LIST(this.GE_WORK_TDMOTION_LIST.concat(arrData))
            console.log('this.GE_WORK_TDMOTION_LIST : ' + JSON.stringify(this.GE_WORK_TDMOTION_LIST,null,2))
        },
        clearSelectedWorkTdmotion(sWork){
            let arrData = this.GE_WORK_TDMOTION_LIST.filter(f=>f.work_id!==sWork[0].work_id)
            if(arrData.length > 0)
                this.AC_WORK_TDMOTION_LIST(arrData)
        }
    },
}
</script>
