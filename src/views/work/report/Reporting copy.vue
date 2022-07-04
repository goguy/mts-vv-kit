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
                <tr v-if="GE_WORKER_RESULT.outbreak_isresponse">
                  <td class="text-left text-caption"> 돌발상황 발생 대처여부</td>                
                  <td class="text-center"> 30점</td>                
                  <td class="text-center"> {{outbreakResponseScore}}</td>                
                </tr>
                <tr v-else>
                  <td class="text-left text-caption"> 돌발상황 발생장소로부터 대피여부</td>                
                  <td class="text-center"> 30점</td>                
                  <td class="text-center"> {{outbreakEvacuateScore}}</td>                
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
                    <tr v-if="GE_WORKER_RESULT.outbreak_isresponse">
                      <td class="text-left text-caption"> 돌발상황 발생 대처여부</td>                
                      <td class="text-center"> 30점</td>                
                      <td class="text-center">{{outbreakResponseScore}}</td>                
                    </tr>
                    <tr v-else>
                      <td class="text-left text-caption"> 돌발상황 발생장소로부터 대피여부</td>                
                      <td class="text-center"> 30점</td>                
                      <td class="text-center">{{outbreakEvacuateScore}}</td>                
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
//import { jsPDF } from 'jspdf'
import VueHtml2pdf from 'vue-html2pdf'


const workStore='workStore'
const workerStore = 'workerStore'
const workerResultStore = 'workerResultStore'

export default {
  components: { 
      VueHtml2pdf
  },   
  name: 'Reporting',
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
    }    
  },
  computed: {
    ...mapGetters(workStore, [
      'GE_WORK_LIST'
    ]),    
    ...mapGetters(workerStore, [
      'GE_WORKER'
    ]),    
    ...mapGetters(workerResultStore, [
      'GE_WORKER_RESULT', 'GE_WORKER_RESULT_LIST'
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
      if(this.GE_WORKER_RESULT.guide_isguide)
        return 5
      else
        return 0   
    },
    permitScore(){
      //작업허가서 발행 5점
      if(this.GE_WORKER_RESULT.permit_ispermit)
        return 5
      else
        return 0   
    },
    equipScore(){
      //적합한 보호구 및 안전장치 선택여부 10점
      let totalEquip = this.GE_WORKER_RESULT.equip_totprotect + this.GE_WORKER_RESULT.equip_totsafety
      let checkEquip = this.GE_WORKER_RESULT.equip_chkprotect + this.GE_WORKER_RESULT.equip_chksafety

      if(checkEquip === 0){
        return 0
      }else if(checkEquip === totalEquip){
        return 10
      }else{
        return Math.floor((checkEquip/totalEquip)*10)
      }  
    },
    oxygenInitScore(){
      //산소농도측정기 작동상태 확인 및 농도측정 10점
      if(this.GE_WORKER_RESULT.oxygen_isinit)
        return 10
      else 
        return 0
    },
    oxygenWorkScore(){
      //작업 중 산소농도 측정여부 15점
      if(this.GE_WORKER_RESULT.oxygen_iswork)
        return 15
      else
        return 0  
    },
    workTimeScore(){
      //작업시간 준수여부 5점
      if(this.GE_WORKER_RESULT.work_istime)
        return 5
      else  
        return 0  
    },
    outbreakRecognizeScore(){
      //돌발상황 발생 인지여부 20점
      if(this.GE_WORKER_RESULT.outbreak_isrecognize)
        return 20
      else  
        return 0  
    },
    outbreakResponseScore(){
      //돌발상황 발생 대처여부 30점
      if(this.GE_WORKER_RESULT.outbreak_isResponse)
        return 30
      else  
        return 0  
    },
    outbreakEvacuateScore(){
      //돌발상황 발생장소로부터 대피여부 30점
      if(this.GE_WORKER_RESULT.outbreak_isevacuate)
        return 30
      else  
        return 0  
    },
    totalScore(){
      //총점 100점
      let score = this.guideScore + this.permitScore + this.equipScore + this.oxygenInitScore +
             this.oxygenWorkScore + this.workTimeScore + this.outbreakRecognizeScore 

      if(this.GE_WORKER_RESULT.outbreak_isresponse)
        return  score + this.outbreakResponseScore  
      else
        return score + this.outbreakEvacuateScore  
    },
  },
  watch: { 
  },
  mounted() {
    this.initgQuery()
    
  },
  beforeDestroy() {
  },
  methods: {
    ...mapActions(workerResultStore, [
      'AC_WORKER_RESULT', 'AC_WORKER_RESULT_PUSH', 'AC_WORKER_RESULT_LIST'
    ]),

    initgQuery() {
      let query=this.GE_WORKER_RESULT
      //this.AC_WORKER_RESULT_LIST([])
      console.log('query',JSON.stringify(query,null,2))
    },

    submitReport(){
      console.log('submitReport')
      let chkData = this.GE_WORKER_RESULT_LIST.filter(f=>(f.worker_id ===this.GE_WORKER.worker_id && f.work_id ===  this.workInfo[0].work_id))
      if(chkData.length === 0){
        this.GE_WORKER_RESULT.reg_dt = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10) 
        this.AC_WORKER_RESULT_PUSH(this.GE_WORKER_RESULT)
        
        this.setSnackbar('제출했습니다.')
        //alert('제출했습니다.')
        return
      }else{

        this.setSnackbar('이미 제출했습니다.')
        //alert('이미 제출했습니다.')
        return
      }
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