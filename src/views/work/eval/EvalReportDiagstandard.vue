<template>
  <v-container
    id="EvalReportDiagstandard"
    fluid
    tag="section"
  >
      <v-card>
        <v-card-title>
          Report          
        </v-card-title> 
        
        <v-card-text>
            <v-row class="mt-5">
            <v-col
                cols="12"
                class="d-flex justify-center"
            >
                <v-sheet
                width="700"
                >
                    <p class="text-center my-1 font-weight-black">교육결과 보고서</p>         
                    <v-sheet>
                        <v-simple-table>
                        <thead>
                            <tr>
                            <td width="20%" class="text-left font-weight-bold gl3">소속 </td>
                            <td width="44%" class="text-left"> {{ dialogParam.agency }}</td>
                            <td width="18%" class="text-center font-weight-bold gl3">교육자 </td>
                            <td width="18%" class="text-left"> {{ dialogParam.worker_name }}</td>
                            </tr>
                            <tr>
                            <td class="text-left font-weight-bold gl3">교육일시 </td>
                            <td class="text-left" colspan="3"> {{ dialogParam.reg_dt }}</td>                
                            </tr>
                            <tr>
                            <td class="text-left font-weight-bold gl3">교육과정명 </td>
                            <td class="text-left" colspan="3"> {{ dialogParam.work_name }}</td>                
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
                            <td width="20%" class="text-center font-weight-bold gl3" rowspan="3">1. 작업시작 전<br> 준비단계<br>(30점) </td>
                            <td width="44%" class="text-left text-caption"> 작업가이드 숙지</td>                
                            <td width="18%" class="text-center"> 10점</td>                
                            <td width="18%" class="text-center"> {{guideScore}}</td>                
                            </tr>
                            <tr>
                            <td class="text-left text-caption"> 작업허가서 발행</td>                
                            <td class="text-center"> 10점</td>                
                            <td class="text-center"> {{permitScore}}</td>                
                            </tr>
                            <tr>
                            <td class="text-left text-caption"> 적합한 보호구 및 안전장치 선택여부</td>                
                            <td class="text-center"> 30점</td>                
                            <td class="text-center"> {{equipScore}}</td>                
                            </tr>
                            <tr>
                            <td width="20%" class="text-center font-weight-bold gl3" rowspan="2">2. 작업 처리 사항<br>(50점) </td>
                            <td width="40%" class="text-left text-caption"> 작업시간 준수여부</td>                
                            <td width="20%" class="text-center"> 10점</td>                
                            <td width="20%" class="text-center"> {{workTimeScore}}</td>                
                            </tr>
                            <tr>
                            <td class="text-left text-caption"> 작업 확인 여부</td>
                            <td class="text-center"> 40점</td>                
                            <td class="text-center"> {{workConfirmScore}}</td>
                            </tr>
                        </tbody>
                        <thead>
                            <tr>
                            <td width="60%" class="text-center font-weight-bold gl3" colspan="2"> 총 점</td>
                            <td width="20%" class="text-center font-weight-bold gl3"> 100점</td>
                            <td width="20%" class="text-center font-weight-bold gl3"> {{totalScore}}</td>
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
                            <td style="height:150px;">{{evalItem.rmk}}</td>
                            </tr>
                        </tbody>
                        </v-simple-table>
                        <div>
                            <v-checkbox
                                v-model="evalItem.is_pass"
                                label="합격여부"
                                class="font-weight-bold"
                            ></v-checkbox>
                        </div>                
                    </v-sheet>
                </v-sheet>
            </v-col>
            </v-row>
        </v-card-text>
        
        <v-card-actions>
        <v-spacer></v-spacer>
            <v-btn
                color="success"
                depressed
                @click="generatePDF"
            >
                Generate PDF
            </v-btn>

            <v-btn 
                color="green darken-1" 
                @click.native="close"
                >Close
            </v-btn>
        </v-card-actions>
      </v-card>

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
                      <td width="18%" class="text-left"> {{ dialogParam.worker_name }}</td>
                    </tr>
                    <tr>
                      <th class="text-left font-weight-bold gl3">교육일시 </th>
                      <td class="text-left" colspan="3"> {{ dialogParam.reg_dt }}</td>                
                    </tr>
                    <tr>
                      <th class="text-left font-weight-bold gl3">교육과정명 </th>
                      <td class="text-left" colspan="3"> {{ dialogParam.work_name }}</td>                
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
                      <th width="20%" class="text-center font-weight-bold gl3" rowspan="3">1. 작업시작 전<br> 준비단계<br>(50점) </th>
                      <td width="44%" class="text-left text-caption"> 작업가이드 숙지</td>                
                      <td width="18%" class="text-center"> 10점</td>                
                      <td width="18%" class="text-center">{{guideScore}}</td>                
                    </tr>
                    <tr>
                      <td class="text-left text-caption"> 작업허가서 발행</td>                
                      <td class="text-center"> 10점</td>                
                      <td class="text-center">{{permitScore}}</td>                
                    </tr>
                    <tr>
                      <td class="text-left text-caption"> 적합한 보호구 및 안전장치 선택여부</td>                
                      <td class="text-center"> 10점</td>                
                      <td class="text-center">{{equipScore}}</td>                
                    </tr>
                    <tr>
                      <th width="20%" class="text-center font-weight-bold gl3" rowspan="2">2. 작업 처리 사항<br>(50점) </th>
                      <td width="44%" class="text-left text-caption"> 작업 중 산소농도 측정여부</td>                
                      <td width="18%" class="text-center"> 10점</td>                
                      <td width="18%" class="text-center">{{workTimeScore}}</td>                
                    </tr>
                    <tr>
                      <td class="text-left text-caption"> 작업 확인 여부</td>
                      <td class="text-center"> 40점</td>                
                      <td class="text-center">{{workConfirmScore}}</td>
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
                      <td style="height:150px;">{{evalItem.rmk}}</td>
                    </tr>
                  </tbody>
                </table>
                <div>
                    <label>
                        합격여부 : {{evalItem.is_pass===null ? ' ': evalItem.is_pass ? '합격':'불합격'}}
                    </label>                    
                </div>
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
import { mapGetters } from 'vuex'
import Enumerable  from 'linq'
import VueHtml2pdf from 'vue-html2pdf'

const userStore='userStore'

const workStore='workStore'
const workerStore = 'workerStore'

const workerResultStore = 'workerResultStore'
const workerResultItemStore = 'workerResultItemStore'
const resultStore = 'resultStore'
const resultItemStore = 'resultItemStore'

const workerResultEvalStore = 'workerResultEvalStore'


export default {
    components: { 
        VueHtml2pdf,
    },   
    name: 'EvalReportDiagstandard',
    props: {
        dialogParam: Object,
    },
    data: () => ({
      
      workerResultItemList: [],

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
      evalItem: {
        is_pass: null,
        rmk: '',
      },     
      snackbar: {
        isSnackbar: false,
        vertical: true,
        message: '',
      },
    }),
    computed: {
        ...mapGetters(userStore, [
            'GE_USER'
        ]),    

        ...mapGetters(workStore, [
            'GE_WORK_LIST'
        ]),    
        ...mapGetters(workerStore, [
            'GE_WORKER'
        ]), 
        ...mapGetters(workerResultStore, [
            'GE_WORKER_RESULT', 'GE_WORKER_RESULT_LIST'
        ]), 
        ...mapGetters(workerResultItemStore, [
            'GE_WORKER_RESULT_ITEM', 'GE_WORKER_RESULT_ITEM_LIST'
        ]), 
        ...mapGetters(resultStore, [
            'GE_RESULT', 'GE_RESULT_LIST'
        ]),
        ...mapGetters(resultItemStore, [
            'GE_RESULT_ITEM', 'GE_RESULT_ITEM_LIST'
        ]),
        ...mapGetters(workerResultEvalStore, [
            'GE_WORKER_RESULT_EVAL', 'GE_WORKER_RESULT_EVAL_LIST'
        ]), 



        guideScore() {
            return this.getResultItemScore('guide')
        },
        permitScore() {
            return this.getResultItemScore('permit')
        },
        equipScore() {
            return this.getResultItemScore('equip_choice')
        },
        workTimeScore() {
            return this.getResultItemScore('work_time')
        },
        workConfirmScore() {
            return this.getResultItemScore('work_confirm')
        },
        totalScore(){
        //총점 100점
        let score = this.guideScore + this.permitScore + this.equipScore + 
                this.workTimeScore + this.workConfirmScore 
        return score
        },

    },

    mounted() {
        console.log('dialogParam', JSON.stringify(this.dialogParam,null,2))
        //this.setVideoOptions()
        this.setWorkerResultEvalList()
    },

    methods: {

        setWorkerResultEvalList() {
            let query = Enumerable.from(this.GE_WORKER_RESULT_EVAL_LIST)
                                    .where(w=>(w.worker_id===this.dialogParam.worker_id 
                                                && w.work_id===this.dialogParam.work_id
                                                && w.result_id===this.dialogParam.result_id)
                                    ).toArray()
            console.log('query', JSON.stringify(query, null, 2))
            if(query.length >0){
                this.evalItem.rmk=query[0].rmk
                this.evalItem.is_pass=query[0].is_pass
            }
        },
        getResultItemScore(val) {
            let score = Enumerable.from(this.GE_RESULT_LIST)
                                    .where(w=> ( w.type===this.dialogParam.type ))
                    .join(Enumerable.from(this.GE_RESULT_ITEM_LIST)
                                    .where(w=> ( w.name===val )),
                        pk=>pk.result_id,
                        fk=>fk.result_id,
                        (left, right)=>({...left, ...right}))
                    .join(Enumerable.from(this.dialogParam.items),
                        pk=>pk.result_item_id,
                        fk=>fk.result_item_id,
                        (left, right)=>({...left, ...right}))
                    .first().score   
            return score
        },


        close() {
            //this.$emit('update:diaglog', false)
            this.$emit('closeDialog', false)
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
        },
    }
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