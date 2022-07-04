<template>
  <v-container
    id="WorkEquipmentInfo"
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
                @click="applyWorkEquipment"
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
            v-model="selectedEquipment"
            :headers="headersEquipment"
            :items="GE_EQUIPMENT_LIST"
            show-select
            item-key="equipment_id"
            sort-by="equipment_id"
            hide-default-footer
            disable-pagination
            class="elevation-1"
          >
          </v-data-table>

        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import  Enumerable from 'linq'

  const workStore = 'workStore'
  const equipmentStore = 'equipmentStore'
  const workEquipmentStore = 'workEquipmentStore'  
  const disasterStore = 'disasterStore'


export default {
    name: 'WorkEquipmentInfo',
    data: () => ({
      apply: 'aa',
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

      selectedEquipment: [],  
      headersEquipment: [
        {
          text: '장비명',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: '장비ID', value: 'equipment_id' },
        { text: '유형', value: 'type' },
        { text: '필수여부', value: 'require' },
        { text: '분류', value: 'classify' },
        { text: '이미지경로', value: 'img_url' },
      ],
      payload: {
        index: 0,
        workEquipment:[]
      }, 

    }),    
    computed: {
        ...mapGetters(workStore, [
            'GE_WORK', 'GE_WORK_LIST'
        ]),    
        ...mapGetters(equipmentStore, [
            'GE_EQUIPMENT', 'GE_EQUIPMENT_LIST'
        ]),    
        ...mapGetters(workEquipmentStore, [
            'GE_WORK_EQUIPMENT', 'GE_WORK_EQUIPMENT_LIST'
        ]),    
        ...mapGetters(disasterStore, [
            'GE_DISASTER', 'GE_DISASTER_LIST'
        ]),
        /*        
        linqQuryWorkEqut() {
        },
        */  
    },
    watch: {
        selectedWork(val) {
            if(val.length > 0){
                console.log('val work: ' + JSON.stringify(val, null, 2))
                this.selectedEquipment=[]
                this.selectedWorkEquipment(val)

            }else{  
                this.selectedEquipment=[]
            }
        },        
        selectedEquipment(val){
            console.log('val equip: ' + JSON.stringify(val, null, 2))
        }
    },
    mounted() {
      //this.initQuery()
    },
    methods: {
        ...mapActions(workEquipmentStore, [
            'AC_WORK_EQUIPMENT', 'AC_WORK_EQUIPMENT_PUSH', 'AC_WORK_EQUIPMENT_EDIT', 'AC_WORK_EQUIPMENT_DEL', 'AC_WORK_EQUIPMENT_LIST' 
        ]),
        selectedWorkEquipment(val) {
            let query = Enumerable.from(this.GE_EQUIPMENT_LIST)                                
                                    .join(Enumerable.from(this.GE_WORK_EQUIPMENT_LIST)
                                    .where(w=>w.work_id === val['0'].work_id),
                                        p=>p.equipment_id,
                                        f=>f.equipment_id)
                                    .toArray()
            this.selectedEquipment = query  
            console.log('query : ' + JSON.stringify(query,null,2))
        },
      
        applyWorkEquipment () {
            if(this.selectedWork.length > 0){
                if(this.selectedEquipment.length > 0){                    
                   this.setSelectedWorkEquipment(this.selectedWork, this.selectedEquipment) 
                }else{
                    alert('정비를 선택하세요')
                }
            }else{
                alert('정비작업을 선택하세요')
            }
            console.log('applyWorkEquipment')

        },
        setSelectedWorkEquipment(sWork, sEquip) {
            this.clearSelectedWorkEquipment(sWork)
            let arrData = []
            for(const item of sEquip){
                arrData.push({
                  work_id: sWork[0].work_id,
                  equipment_id: item.equipment_id
                })
            }
            this.AC_WORK_EQUIPMENT_LIST(this.GE_WORK_EQUIPMENT_LIST.concat(arrData))
            console.log('this.GE_WORK_EQUIPMENT_LIST : ' + JSON.stringify(this.GE_WORK_EQUIPMENT_LIST,null,2))
        },
        clearSelectedWorkEquipment(sWork){
            let arrData = this.GE_WORK_EQUIPMENT_LIST.filter(f=>f.work_id!==sWork[0].work_id)
            if(arrData.length > 0)
                this.AC_WORK_EQUIPMENT_LIST(arrData)
        }
    },
}
</script>
