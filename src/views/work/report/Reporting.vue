<template>
  <v-container
    id="reporting"
    tag="section"
  >
    <v-row class="mt-5">
      <v-col
        cols="12"
        class="d-flex justify-center"
      >
        <v-sheet
          width="640"
        >
          <p class="text-center my-1 font-weight-black">교육결과 보고서</p>         
          <v-sheet>
            <v-simple-table>
              <thead>
                <tr>
                  <td width="20%" class="text-left font-weight-bold gl3">소속 </td>
                  <td width="44%" class="text-left"> 설비관리팀</td>
                  <td width="18%" class="text-center font-weight-bold gl3">교육자 </td>
                  <td width="18%" class="text-left"> {{ workerInfo.name }}</td>
                </tr>
                <tr>
                  <td class="text-left font-weight-bold gl3">교육일시 </td>
                  <td class="text-left" colspan="3"> {{ workerInfo.reg_dt }}</td>                
                </tr>
                <tr>
                  <td class="text-left font-weight-bold gl3">교육과정명 </td>
                  <td class="text-left" colspan="3"> {{ workInfo[0].name }}</td>                
                </tr>
              </thead>
            </v-simple-table>
          </v-sheet>


          <v-sheet class="mt-5">
            <v-simple-table>
              <thead>
                <tr>
                  <td width="64%" class="text-center font-weight-bold gl3" colspan="2">평가항목 </td>
                  <td width="18%" class="text-center font-weight-bold gl3">기준점수 </td>
                  <td width="18%" class="text-center font-weight-bold gl3">교육자 점수</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td width="20%" class="text-center font-weight-bold gl3" rowspan="4">1. 작업시작 전<br> 준비단계<br>(30점) </td>
                  <td width="44%" class="text-left text-caption"> 작업가이드 숙지</td>                
                  <td width="18%" class="text-center"> 5점</td>                
                  <td width="18%" class="text-center"> {{guideScore}}</td>                
                </tr>
                <tr>
                  <td class="text-left text-caption"> 작업허가서 발행</td>                
                  <td class="text-center"> 5점</td>                
                  <td class="text-center"> {{permitScore}}</td>                
                </tr>
                <tr>
                  <td class="text-left text-caption"> 적합한 보호구 및 안전장치 선택여부</td>                
                  <td class="text-center"> 10점</td>                
                  <td class="text-center"> {{equipScore}}</td>                
                </tr>
                <tr>
                  <td class="text-left text-caption"> 산소농도측정기 작동상태 확인 및 농도측정</td>                
                  <td class="text-center"> 10점</td>                
                  <td class="text-center"> {{oxygenInitScore}}</td>                
                </tr>
                <tr>
                  <td width="20%" class="text-center font-weight-bold gl3" rowspan="2">2. 작업 중 점검<br> 및 조치사항<br>(20점) </td>
                  <td width="44%" class="text-left text-caption"> 작업 중 산소농도 측정여부</td>                
                  <td width="18%" class="text-center"> 15점</td>                
                  <td width="18%" class="text-center"> {{oxygenWorkScore}}</td>                
                </tr>
                <tr>
                  <td class="text-left text-caption"> 작업시간 준수여부</td>
                  <td class="text-center"> 5점</td>                
                  <td class="text-center"> {{workTimeScore}}</td>
                </tr>
                <tr>
                  <td width="20%" class="text-center font-weight-bold gl3" rowspan="2">3. 돌발상황에<br> 대한 대응<br>(50점) </td>
                  <td width="44%" class="text-left text-caption"> 돌발상황 발생 인지여부</td>                
                  <td width="18%" class="text-center"> 20점</td>                
                  <td width="18%" class="text-center"> {{outbreakRecognizeScore}}</td>                
                </tr>
                <tr>
                  <td class="text-left text-caption"> 돌발상황 발생 대처여부</td>                
                  <td class="text-center"> 30점</td>                
                  <td class="text-center"> {{outbreakCopeScore}}</td>                
                </tr>
              </tbody>
              <thead>
                <tr>
                  <td width="64%" class="text-center font-weight-bold gl3" colspan="2"> 총 점</td>
                  <td width="18%" class="text-center font-weight-bold gl3"> 100점</td>
                  <td width="18%" class="text-center font-weight-bold gl3"> {{totalScore}}</td>
                </tr>
              </thead>
            </v-simple-table>
          </v-sheet>
          <v-sheet class="mt-5">
            <v-simple-table>
              <thead>
                <tr>
                  <td class="text-center font-weight-bold gl3">교육강평</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="height:150px;"></td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-sheet>
        </v-sheet>
      </v-col>
    </v-row>
    <div class="text-center">
      <v-btn
        color="primary"
        depressed
        @click="submitReport"
        class="ma-5"
      >
        제출하기
      </v-btn>
      <v-btn
        color="success"
        depressed
        @click="generatePDF"
      >
        Generate PDF
      </v-btn>
    </div>
    <div>
      <vue-html2pdf 
        :show-layout="false" 
        :float-layout="true" 
        :enable-download="true" 
        :preview-modal="true" 
        :paginate-elements-by-height="1400" 
        filename="교육결과보고서" 
        :pdf-quality="2" 
        :manual-pagination="false" 
        pdf-format="a4" 
        pdf-orientation="landscape" 
        pdf-content-width="800px"
        :html-to-pdf-options="htmlToPdfOptions"  
        @progress="onProgress($event)" 
        @hasStartedGeneration="hasStartedGeneration()" 
        @hasGenerated="hasGenerated($event)" 
        ref="html2Pdf" 
      > 
        <section slot="pdf-content"> 
            <!-- PDF Content Here --> 
            <section class="pdf-item"> 

              <section class="mt-10 mlr-5">
                <p class="text-center mb-1 font-weight-black fs-20">교육결과 보고서</p>
              </section>  
              <section class="mlr-5">
                <table>
                  <thead>
                    <tr>
                      <th width="20%" class="text-left font-weight-bold gl3">소속 </th>
                      <td width="44%" class="text-left"> 설비관리팀</td>
                      <th width="18%" class="text-center font-weight-bold gl3">교육자 </th>
                      <td width="18%" class="text-left"> {{ workerInfo.name }}</td>
                    </tr>
                    <tr>
                      <th class="text-left font-weight-bold gl3">교육일시 </th>
                      <td class="text-left" colspan="3"> {{ workerInfo.reg_dt }}</td>                
                    </tr>
                    <tr>
                      <th class="text-left font-weight-bold gl3">교육과정명 </th>
                      <td class="text-left" colspan="3"> {{ workInfo[0].name }}</td>                
                    </tr>
                  </thead>
                </table>
              </section>  
              <section class="mt-3 mlr-5">
                <table>
                  <thead>
                    <tr>
                      <th width="64%" class="text-center font-weight-bold gl3" colspan="2">평가항목 </th>
                      <th width="18%" class="text-center font-weight-bold gl3">기준점수 </th>
                      <th width="18%" class="text-center font-weight-bold gl3">교육자 점수</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th width="20%" class="text-center font-weight-bold gl3" rowspan="4">1. 작업시작 전<br> 준비단계<br>(30점) </th>
                      <td width="44%" class="text-left text-caption"> 작업가이드 숙지</td>                
                      <td width="18%" class="text-center"> 5점</td>                
                      <td width="18%" class="text-center">{{guideScore}}</td>                
                    </tr>
                    <tr>
                      <td class="text-left text-caption"> 작업허가서 발행</td>                
                      <td class="text-center"> 5점</td>                
                      <td class="text-center">{{permitScore}}</td>                
                    </tr>
                    <tr>
                      <td class="text-left text-caption"> 적합한 보호구 및 안전장치 선택여부</td>                
                      <td class="text-center"> 10점</td>                
                      <td class="text-center">{{equipScore}}</td>                
                    </tr>
                    <tr>
                      <td class="text-left text-caption"> 산소농도측정기 작동상태 확인 및 농도측정</td>                
                      <td class="text-center"> 10점</td>                
                      <td class="text-center">{{oxygenInitScore}}</td>                
                    </tr>
                    <tr>
                      <th width="20%" class="text-center font-weight-bold gl3" rowspan="2">2. 작업 중 점검<br> 및 조치사항<br>(20점) </th>
                      <td width="44%" class="text-left text-caption"> 작업 중 산소농도 측정여부</td>                
                      <td width="18%" class="text-center"> 15점</td>                
                      <td width="18%" class="text-center">{{oxygenWorkScore}}</td>                
                    </tr>
                    <tr>
                      <td class="text-left text-caption"> 작업시간 준수여부</td>
                      <td class="text-center"> 5점</td>                
                      <td class="text-center">{{workTimeScore}}</td>
                    </tr>
                    <tr>
                      <th width="20%" class="text-center font-weight-bold gl3" rowspan="3">3. 돌발상황에<br> 대한 대응<br>(50점) </th>
                      <td width="44%" class="text-left text-caption"> 돌발상황 발생 인지여부</td>                
                      <td width="18%" class="text-center"> 20점</td>                
                      <td width="18%" class="text-center">{{outbreakRecognizeScore}}</td>                
                    </tr>
                    <tr>
                      <td class="text-left text-caption"> 돌발상황 발생 대처여부</td>                
                      <td class="text-center"> 30점</td>                
                      <td class="text-center">{{outbreakCopeScore}}</td>                
                    </tr>
                  </tbody>
                  <thead>
                    <tr>
                      <th width="64%" class="text-center font-weight-bold gl3" colspan="2"> 총 점</th>
                      <th width="18%" class="text-center font-weight-bold gl3"> 100점</th>
                      <th width="18%" class="text-center font-weight-bold gl3">{{totalScore}}</th>
                    </tr>
                  </thead>
                </table>
              </section>
              <section class="mt-3 mlr-5">
                <table>
                  <thead>
                    <tr>
                      <th class="text-center font-weight-bold gl3">교육강평</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style="height:150px;"></td>
                    </tr>
                  </tbody>
                </table>
              </section>


            </section> 

        </section> 
     </vue-html2pdf>
    </div>

    <v-snackbar
      v-model="snackbar.isSnackbar"
      :vertical="snackbar.vertical"
    >
      {{ snackbar.message }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="indigo"
          text
          v-bind="attrs"
          @click="snackbar.isSnackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Enumerable  from 'linq'
import VueHtml2pdf from 'vue-html2pdf'


import { activityMixin } from '@/mixins/activityMixin.js'


const workStore='workStore'
const workerStore = 'workerStore'

const equipmentStore = 'equipmentStore'
const workEquipmentStore = 'workEquipmentStore'
const workerEquipmentStore = 'workerEquipmentStore'

const tdmotionStore = 'tdmotionStore'
const workTdmotionStore = 'workTdmotionStore'
const workerTdmotionStore = 'workerTdmotionStore'

const workerResultStore = 'workerResultStore'
const workerResultItemStore = 'workerResultItemStore'
const resultStore = 'resultStore'
const resultItemStore = 'resultItemStore'



export default {
  components: { 
      VueHtml2pdf
  },   
  name: 'Reporting',
  mixins: [activityMixin],
  data () {
    return {
      htmlToPdfOptions: { 
        margin: 0, 
        filename: `교육결과보고서.pdf`, 
        image: { 
            type: 'jpeg',  
            quality: 0.98 
        }, 

        enableLinks: false, 
        html2canvas: { 
            scale: 1, 
            useCORS: true 
        }, 

        jsPDF: { 
            unit: 'in', 
            format: 'a4', 
            orientation: 'portrait' 
        } 
      },      
      snackbar: {
        isSnackbar: false,
        vertical: true,
        message: '',
      },
      workerResult: {
        result_id: 0,
        worker_id: 0,
        work_id: 0,
        score: 0,
        reg_dt: null,
      },
      //작업자선택결과
      resultItemPayload: {
        index: 0,
        resultItem:[]
      },
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
        
    ...mapGetters(workerResultItemStore, [
      'GE_WORKER_RESULT_ITEM', 'GE_WORKER_RESULT_ITEM_LIST'
    ]), 
    ...mapGetters(workerResultStore, [
      'GE_WORKER_RESULT', 'GE_WORKER_RESULT_LIST'
    ]), 
    ...mapGetters(resultItemStore, [
      'GE_RESULT_ITEM', 'GE_RESULT_ITEM_LIST'
    ]),
    ...mapGetters(resultStore, [
      'GE_RESULT', 'GE_RESULT_LIST'
    ]),


    workInfo() {
      let query = Enumerable.from(this.GE_WORK_LIST).where(w=>w.work_id ===this.GE_WORKER.work_id).toArray();
      return query
    },
    workerInfo() {
      return this.GE_WORKER
    },
    guideScore(){
      //작업가이드 숙지 5점
      let query = this.getResultTypeList('guide')
      //this.recordWorkerResultItem('guide', 'Y')

      if(this.GE_WORKER.guide_chk){
        return query.score
      }else{
        return 0
      }
    },
    permitScore(){
      //작업허가서 발행 5점
      let query = this.getResultTypeList('permit')
      //this.recordWorkerResultItem('permit', 'Y')

      if(this.GE_WORKER.order_chk){
        return query.score
      }else{
        return 0
      }
    },
    equipScore(){

      //적합한 보호구 및 안전장치 선택여부 10점
      let query = this.getResultTypeList('equip_choice')

      let totalEquip = this.queryWorkEquipment('protect').length + this.queryWorkEquipment('safety').length
      let checkEquip = this.queryWorkAndWorkerEquipment('protect').length + this.queryWorkAndWorkerEquipment('safety').length

      //this.recordWorkerResultItem('equip_choice', 'Y')
      if(checkEquip === 0){
        return 0
      }else if(checkEquip === totalEquip){
        return query.score
      }else{
        return Math.floor((checkEquip/totalEquip)*query.score)
      }  
      /*
      if(query.worker_id==='undefined')
        return 0
      else{
        if(query.worker_id === this.GE_WORKER.worker_id){
          if(checkEquip === 0){
            return 0
          }else if(checkEquip === totalEquip){
            return query.score
          }else{
            return Math.floor((checkEquip/totalEquip)*query.score)
          }  
        }
        else
          return 0
      }
      */
    },
    oxygenInitScore(){
      //산소농도측정기 작동상태 확인 및 농도측정 10점      
      let query = this.getResultTypeList('equip_check')

      //console.log('query', JSON.stringify(query, null, 2))
      //console.log('query', query.worker_id)

      if(query.worker_id==='undefined')
        return 0
      else{
        if(query.worker_id === this.GE_WORKER.worker_id){
          if(query.is_yn==='Y')
            return query.score
          else
            return 0
        }
        else
          return 0
      }
    },
    oxygenWorkScore(){
      //작업 중 산소농도 측정여부 15점
      let query = this.getResultTypeList('work_check')

      //console.log('query', JSON.stringify(query, null, 2))
      //console.log('query', query.worker_id)

      if(query.worker_id==='undefined')
        return 0
      else{
        if(query.worker_id === this.GE_WORKER.worker_id){
          if(query.is_yn==='Y')
            return query.score
          else
            return 0
        }
        else
          return 0
      }
    },
    workTimeScore(){
      //작업시간 준수여부 5점
      let query = this.getResultTypeList('work_time')

      //console.log('query', JSON.stringify(query, null, 2))
      //console.log('query', query.worker_id)

      if(query.worker_id==='undefined')
        return 0
      else{
        if(query.worker_id === this.GE_WORKER.worker_id){
          if(query.is_yn==='Y')
            return query.score
          else
            return 0
        }
        else
          return 0
      }

    },
    outbreakRecognizeScore(){
      //돌발상황 발생 인지여부 20점
      let query = this.getResultTypeList('outbreak_recognize')

      //console.log('outbreak_recognize query', JSON.stringify(query, null, 2))
      //console.log('outbreak_recognize', query.worker_id)

      if(query.worker_id==='undefined')
        return 0
      else{
        if(query.worker_id === this.GE_WORKER.worker_id){
          if(query.is_yn==='Y')
            return query.score
          else
            return 0
        }
        else
          return 0
      }
    },
    outbreakCopeScore(){
      //돌발상황 발생 대처여부 30점
      let query = this.getResultTypeList('outbreak_cope')

      //console.log('query', JSON.stringify(query, null, 2))
      //console.log('query', query.worker_id)

      if(query.worker_id==='undefined')
        return 0
      else{
        if(query.worker_id === this.GE_WORKER.worker_id){
          if(query.is_yn==='Y')
            return query.score
          else
            return 0
        }
        else
          return 0
      }
    },
    totalScore(){
      //총점 100점
      let score = this.guideScore + this.permitScore + this.equipScore + this.oxygenInitScore +
             this.oxygenWorkScore + this.workTimeScore + this.outbreakRecognizeScore + this.outbreakCopeScore
      return score
    },
  },
  watch: { 
  },
  mounted() {
    this.initgQuery()
    this.updateResult()
    
  },
  beforeDestroy() {
  },
  methods: {
    ...mapActions(workerResultItemStore, [
      'AC_WORKER_RESULT_ITEM', 'AC_WORKER_RESULT_ITEM_PUSH', 'AC_WORKER_RESULT_ITEM_LIST'
    ]),
    ...mapActions(workerResultStore, [
      'AC_WORKER_RESULT', 'AC_WORKER_RESULT_PUSH', 'AC_WORKER_RESULT_LIST'
    ]),
    ...mapActions(resultItemStore, [
      'AC_RESULT_ITEM_EDIT'
    ]),
    ...mapActions(resultStore, [
      'AC_RESULT_EDIT'
    ]),

    initgQuery() {
      let query=this.GE_WORKER_RESULT
      //this.AC_WORKER_RESULT_LIST([])
      //this.AC_WORKER_RESULT_ITEM_LIST([])
      console.log('query',JSON.stringify(query,null,2))
    },
    updateResult(){
      if(this.GE_WORKER.guide_chk)
        this.recordWorkerResultItem('guide', 'Y')

      if(this.GE_WORKER.order_chk)  
        this.recordWorkerResultItem('permit', 'Y')
      
      let checkEquip = this.queryWorkAndWorkerEquipment('protect').length + this.queryWorkAndWorkerEquipment('safety').length
      if(checkEquip > 0)
        this.recordWorkerResultItem('equip_choice', 'Y')
      //console.log('updateResult')
    },
    // result type
    getResultTypeList(item){
      let workType = this.GE_WORK_LIST.filter(f=>f.work_id === this.GE_WORKER.work_id)[0].type
      //let query = this.GE_RESULT_LIST.filter(f=>(f.name === item && f.type === workType))[0]
      let query = this.GE_RESULT_LIST.filter(f=>f.type === workType)[0]      
      query = this.GE_RESULT_ITEM_LIST.filter(f=>(f.result_id===query.result_id &&f.name===item))[0]      
      return query
    },
    // 정비작업 장비선택
    queryWorkEquipment(type) {
      let query = Enumerable.from(this.GE_EQUIPMENT_LIST)
                            .join(Enumerable.from(this.GE_WORK_EQUIPMENT_LIST)
                                            .where(w=>w.work_id === this.GE_WORKER.work_id),
                              pk=>pk.equipment_id,
                              fk=>fk.equipment_id,
                              (left, right) =>({...left, ...right}))
                            .where(w=>w.type === type)
                            .orderBy(o=>o.disp_ord)
                            .toArray()
      return query
    },

    queryWorkerEquipment(type) {
      let query = Enumerable.from(this.GE_EQUIPMENT_LIST)
                            .join(Enumerable.from(this.GE_WORKER_EQUIPMENT_LIST)
                                            .where(w=>w.worker_id === this.GE_WORKER.worker_id),
                              pk=>pk.equipment_id,
                              fk=>fk.equipment_id,
                              (left, right) =>({...left, ...right}))
                            .where(w=>w.type === type)
                            .orderBy(o=>o.disp_ord)
                            .toArray()
      return query
    },

    //작업자 장비선택
    queryWorkAndWorkerEquipment(type){
      let query = Enumerable.from(this.queryWorkEquipment(type))
                            .join(Enumerable.from(this.queryWorkerEquipment(type)),
                                  pk => pk.equipment_id,
                                  fk => fk.equipment_id,
                                  (left, right) => ({...left, right}))
                            .toArray()   

        //console.log('query : ' + JSON.stringify(query,null,2));
        return query
    },

    saveData(){
      console.log('saveData')
      let workType = this.GE_WORK_LIST.filter(f=>f.work_id === this.GE_WORKER.work_id)[0].type
      let query = this.GE_RESULT_LIST.filter(f=>(f.type === workType))[0]
      query = this.GE_RESULT_ITEM_LIST.filter(f=>(f.result_id===query.result_id))
      
      console.log('query', JSON.stringify(query, null, 2))
      
      for(const obj of query){

        this.GE_WORKER_RESULT_ITEM.result_item_id = obj.result_item_id
        this.GE_WORKER_RESULT_ITEM.worker_id = this.GE_WORKER.worker_id
        this.GE_WORKER_RESULT_ITEM.work_id = this.GE_WORKER.work_id
        
        switch(obj.name){
          case 'guide':
           console.log('obj.name', obj.name) 
           this.GE_WORKER_RESULT_ITEM.score = this.guideScore
           break;   

          case 'permit':
           console.log('obj.name', obj.name) 
           this.GE_WORKER_RESULT_ITEM.score = this.permitScore
           break;   

          case 'equip_choice':
           console.log('obj.name', obj.name) 
           this.GE_WORKER_RESULT_ITEM.score = this.equipScore 
           break;   

          case 'equip_check':
           console.log('obj.name', obj.name) 
           this.GE_WORKER_RESULT_ITEM.score = this.oxygenInitScore
           break;   

          case 'work_check':
           console.log('obj.name', obj.name) 
           this.GE_WORKER_RESULT.score = this.oxygenWorkScore
           break;   

          case 'work_time':
           console.log('obj.name', obj.name) 
           this.GE_WORKER_RESULT_ITEM.score = this.workTimeScore
           break;   

          case 'outbreak_recognize':
           console.log('obj.name', obj.name) 
           this.GE_WORKER_RESULT_ITEM.score = this.outbreakRecognizeScore
           break;   

          case 'outbreak_cope':
           console.log('obj.name', obj.name) 
           this.GE_WORKER_RESULT_ITEM.score = this.outbreakCopeScore           
           break;   

          default:
            console.log('default');
        }
        console.log('this.GE_WORKER_RESULT_ITEM', JSON.stringify(this.GE_WORKER_RESULT_ITEM, null, 2))
        //this.AC_WORKER_RESULT_PUSH(Object.assign({}, this.GE_WORKER_RESULT))
        //깊은복사
        this.AC_WORKER_RESULT_ITEM_PUSH(JSON.parse(JSON.stringify(this.GE_WORKER_RESULT_ITEM)))
        
      }
    },  

    submitReport(){
      console.log('submitReport')
      let workType = this.GE_WORK_LIST.filter(f=>f.work_id === this.GE_WORKER.work_id)[0].type
      let query = this.GE_RESULT_LIST.filter(f=>(f.type === workType))[0]
      let chkData = this.GE_WORKER_RESULT_ITEM_LIST.filter(f=>(f.worker_id ===this.GE_WORKER.worker_id && f.result_id===query.result_id))
      
      console.log('chkData',JSON.stringify(chkData, null, 2))
      console.log('chkData.length', chkData.length)
      if(chkData.length===0){
        //this.GE_WORKER_RESULT.reg_dt = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10) 
        //this.AC_WORKER_RESULT_PUSH(this.GE_WORKER_RESULT)
        this.saveData()
        this.setSnackbar('제출했습니다.')
        //alert('제출했습니다.')
        return
      }else{

        //this.saveData()
        this.setSnackbar('이미 제출했습니다.')
        //alert('이미 제출했습니다.')
        return
      }
    },


    recordWorkerResultItem(item, yn){
      let workType = this.GE_WORK_LIST.filter(f=>f.work_id === this.GE_WORKER.work_id)[0].type      
      //console.log('workType',workType)
      //let query = this.GE_RESULT_LIST.filter(f=>(f.name === item && f.type === workType))[0]      
      let query = this.GE_RESULT_LIST.filter(f=>f.type === workType)[0]      
      query = this.GE_RESULT_ITEM_LIST.filter(f=>(f.result_id===query.result_id &&f.name===item))[0]      
      //console.log('query',JSON.stringify(query, null, 2))
      query.worker_id = this.GE_WORKER.worker_id
      query.is_yn = yn
      
      this.resultItemPayload.index = query.result_item_id
      this.resultItemPayload.resultItem = query
      //console.log('this.resultPayload',JSON.stringify(this.resultPayload, null, 2))
      this.AC_RESULT_ITEM_EDIT(this.resultItemPayload)
    },
    setSnackbar(msg) {
        this.snackbar.isSnackbar=true
        this.snackbar.message=msg
        this.snackbar.vertical=true
    },
    generatePDF(){
      this.$refs.html2Pdf.generatePdf()     
    },
    onProgress(event){
      console.log('onProgress-event',event)
    },
    hasStartedGeneration(){
      console.log('hasStartedGeneration')
    },
    hasGenerated(event){
      console.log('hasGenerated-event',event)
    }
  
  },  

}
</script>

<style scoped>

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td, .v-data-table > .v-data-table__wrapper > table > thead > tr > td, .v-data-table > .v-data-table__wrapper > table > tfoot > tr > td{
  height: 40px;
  padding: 0 10px;
}

table {
  border: 1px solid #000;
  border-collapse: collapse;
  width: 100%;
}

table tr th {
  border: 1px solid #000;
  height: 40px;
  padding: 0 10px;
}

table tr td {
  border: 1px solid #000;
  height: 40px;
  padding: 0 10px;
}

.text-left{
  text-align: left;
}

.text-center{
  text-align: center;
}

.font-weight-black{
  font-weight: bold;
}

.fs-20{
  font-size: 20px;
}

.mt-3{
  margin-top: 30px;
}

.mt-10{
  margin-top: 100px;
}

.mb-1{
  margin-bottom: 10px;
}

.mlr-5{
  margin-left: 50px;
  margin-right: 50px;
}

.gl3{
  background-color: #EEEEEE;  
}


</style>