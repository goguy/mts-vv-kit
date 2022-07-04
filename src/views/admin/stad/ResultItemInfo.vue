<template>
  <v-container
    id="ResultItemInfo"
    fluid
    tag="section"
  >
    <v-row
        no-gutters
    >
    <v-col
        cols="12"
    >
        <v-data-table
            caption="마스터"
            v-model="selectedResult"
            :headers="headersResult"
            :items="GE_RESULT_LIST"
            show-select
            single-select
            item-key="result_id"
            sort-by="result_id"
            hide-default-footer
            disable-pagination
            class="elevation-1"
        >
            <template v-slot:top>
            <v-toolbar
                flat
            >
                <v-toolbar-title>Master CRUD</v-toolbar-title>
                <v-divider
                class="mx-4"
                inset
                vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-dialog
                v-model="dialogResult"
                max-width="700px"
                >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                    >
                    New Item
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title>
                    <span class="text-h5">{{ formResultTitle }}</span>
                    </v-card-title>

                    <validation-observer
                    ref="observerResult"
                    v-slot="{ invalid }"
                    >
                    <form @submit.prevent="submitResult">

                    <v-card-text>
                        <v-row>
                        <v-col
                            cols="12"
                            sm="12"
                            md="12"
                        >
                            <validation-provider
                            v-slot="{ errors }"
                            name="editedResult.name"
                            rules="required|max:20"
                            >
                            <v-text-field
                            v-model="editedResult.name"
                            :counter="20"
                            :error-messages="errors"
                            required
                            label="마스터명"
                            ></v-text-field>
                            </validation-provider>

                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="6"
                        >

                            <validation-provider
                            v-slot="{ errors }"
                            name="editedResult.result_id"
                            :rules="{
                                required: true,
                                regex:'|^[0-9]*$|'
                            }"
                            >
                            <v-text-field
                            v-model="editedResult.result_id"
                            :counter="7"
                            :error-messages="errors"
                            type="number"
                            :disabled="true"
                            label="마스터ID"
                            required
                            ></v-text-field>
                            </validation-provider>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="6"
                        >
                            <validation-provider
                            v-slot="{ errors }"
                            name="editedResult.type"
                            :rules="{
                                required: true
                            }"
                            >
                            <v-select
                                v-model="editedResult.type"
                                :items="outbreakGroupItems"
                                :error-messages="errors"
                                item-text="name"
                                item-value="code"
                                label="유형"
                                required
                            ></v-select>
                            </validation-provider>

                        </v-col>
                        <v-col
                            cols="12"
                            sm="12"
                            md="12"
                        >
                            <validation-provider
                            v-slot="{ errors }"
                            name="editedResult.rmk"
                            rules="required|max:50"
                            >
                            <v-text-field
                            v-model="editedResult.rmk"
                            label="설명"
                            :counter="50"
                            :error-messages="errors"
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
                        @click="saveResult"
                    >
                        submit
                    </v-btn>
                    <v-btn @click="clearResult">
                        clear
                    </v-btn>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="closeResult"
                    >
                        Cancel
                    </v-btn>

                    </v-card-actions>

                    </form>
                    </validation-observer>

                </v-card>                    
                </v-dialog>
                <v-dialog v-model="dialogResultDelete" max-width="700px">
                <v-card>
                    <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeResultDelete">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteResultConfirm">OK</v-btn>
                    <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
                </v-dialog>
            </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
            <v-icon
                small
                class="mr-2"
                @click="editResult(item)"
            >
                mdi-pencil
            </v-icon>
            <v-icon
                small
                @click="deleteResult(item)"
            >
                mdi-delete
            </v-icon>
            </template>
            <template v-slot:no-data>
                no-data
            </template>

        </v-data-table>
    </v-col>
    </v-row>

    <v-row
        no-gutters
    >
    <v-col
        cols="12"
    >
        <v-data-table
            caption="아이템"
            :headers="headersResultItem"
            :items="resultItemList"
            class="elevation-1"
        >
            <template v-slot:top>
            <v-toolbar
                flat
            >
                <v-toolbar-title>Item CRUD</v-toolbar-title>
                <v-divider
                class="mx-4"
                inset
                vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-dialog
                v-model="dialogResultItem"
                max-width="700px"
                >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                    >
                    New Item
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title>
                    <span class="text-h5">{{ formResultItemTitle }}</span>
                    </v-card-title>

                    <validation-observer
                    ref="observerResultItem"
                    v-slot="{ invalid }"
                    >
                    <form @submit.prevent="submitResultItem">

                    <v-card-text>
                        <v-row>
                        <v-col
                            cols="12"
                            sm="12"
                            md="12"
                        >
                            <validation-provider
                            v-slot="{ errors }"
                            name="editedResultItem.name"
                            rules="required|max:20"
                            >
                            <v-text-field
                            v-model="editedResultItem.name"
                            :counter="20"
                            :error-messages="errors"
                            required
                            label="아이템명"
                            ></v-text-field>
                            </validation-provider>

                        </v-col>
                        <v-col
                            cols="12"
                            sm="3"
                            md="3"
                        >

                            <validation-provider
                            v-slot="{ errors }"
                            name="editedResultItem.result_item_id"
                            :rules="{
                                required: true,
                                regex:'|^[0-9]*$|'
                            }"
                            >
                            <v-text-field
                            v-model="editedResultItem.result_item_id"
                            :counter="7"
                            :error-messages="errors"
                            type="number"
                            :disabled="true"
                            label="아이템ID"
                            required
                            ></v-text-field>
                            </validation-provider>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="3"
                            md="3"
                        >
                            <validation-provider
                            v-slot="{ errors }"
                            name="editedResultItem.result_id"
                            :rules="{
                                required: true
                            }"
                            >
                            <v-select
                                v-model="editedResultItem.result_id"
                                :items="GE_RESULT_LIST"
                                :error-messages="errors"
                                item-text="name"
                                item-value="result_id"
                                label="마스터ID"
                                required
                            ></v-select>
                            </validation-provider>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="3"
                            md="3"
                        >
                            <validation-provider
                            v-slot="{ errors }"
                            name="editedResultItem.score"
                            :rules="{
                                required: true,
                                regex:'|^[0-9]*$|'
                            }"
                            >
                            <v-text-field
                            v-model="editedResultItem.score"
                            :counter="3"
                            :error-messages="errors"
                            type="number"
                            label="점수"
                            required
                            ></v-text-field>
                            </validation-provider>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="3"
                            md="3"
                        >
                            <validation-provider
                            v-slot="{ errors }"
                            name="editedResultItem.disp_ord"
                            :rules="{
                                required: true,
                                regex:'|^[0-9]*$|'
                            }"
                            >
                            <v-text-field
                            v-model="editedResultItem.disp_ord"
                            :counter="3"
                            :error-messages="errors"
                            type="number"
                            label="순서"
                            required
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
                            name="editedResultItem.rmk"
                            rules="required|max:50"
                            >
                            <v-text-field
                            v-model="editedResultItem.rmk"
                            label="설명"
                            :counter="50"
                            :error-messages="errors"
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
                        @click="saveResultItem"
                    >
                        submit
                    </v-btn>
                    <v-btn @click="clearResultItem">
                        clear
                    </v-btn>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="closeResultItem"
                    >
                        Cancel
                    </v-btn>

                    </v-card-actions>

                    </form>
                    </validation-observer>

                </v-card>                    
                </v-dialog>
                <v-dialog v-model="dialogResultItemDelete" max-width="700px">
                <v-card>
                    <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeResultItemDelete">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteResultItemConfirm">OK</v-btn>
                    <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
                </v-dialog>
            </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
            <v-icon
                small
                class="mr-2"
                @click="editResultItem(item)"
            >
                mdi-pencil
            </v-icon>
            <v-icon
                small
                @click="deleteResultItem(item)"
            >
                mdi-delete
            </v-icon>
            </template>
            <template v-slot:no-data>
                no-data
            </template>


        </v-data-table>
    </v-col>
    </v-row>


  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import { required, digits, email, max, regex } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
  const codeStore = 'codeStore'

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
    components: {
      ValidationProvider,
      ValidationObserver,
    },
    name: 'ResultItemInfo',
    data: () => ({
      dialogResult: false,
      dialogResultDelete: false,
      selectedResult: [],
      headersResult: [
        {
          text: '마스터명',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: '마스터ID', value: 'result_id' },
        { text: '타입', value: 'type' },
        { text: '설명', value: 'rmk' },
        { text: '등록일', value: 'reg_dt' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      editedResultIndex: -1,
      editedResult: {
        result_id: 0,
        name: '',
        type: '',
        rmk: '',
        reg_dt: '',
      },
      defaultResult: {
        result_id: 0,
        name: '',
        type: '',
        rmk: '',
        reg_dt: '',
      },
      payloadResult: {
        index: 0,
        result:[]
      },

      resultItemList: [],
      dialogResultItem: false,
      dialogResultItemDelete: false,
      headersResultItem: [
        {
          text: '아이템명',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: '아이템ID', value: 'result_item_id' },
        { text: '마스터ID', value: 'result_id' },
        { text: '순서', value: 'disp_ord' },
        { text: '점수', value: 'score' },
        { text: '설명', value: 'rmk' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      editedResultItemIndex: -1,
      editedResultItem: {
        result_item_id: 0,
        name: '',
        score: 0,
        disp_ord: 0,
        rmk: '',
        result_id: 0,
      },
      defaultResultItem: {
        result_item_id: 0,
        name: '',
        score: 0,
        disp_ord: 0,
        rmk: '',
        result_id: 0,
      },
      payloadResultItem: {
        index: 0,
        resultItem:[]
      },
    }),

    computed: {
      ...mapGetters(codeStore, [
        'GE_CODE', 'GE_CODE_LIST'
      ]),    
      ...mapGetters(resultStore, [
        'GE_RESULT', 'GE_RESULT_LIST'
      ]),    
      ...mapGetters(resultItemStore, [
        'GE_RESULT_ITEM', 'GE_RESULT_ITEM_LIST'
      ]),    

      formResultTitle () {
        return this.editedResultIndex === -1 ? 'New Item' : 'Edit Item'
      },
      formResultItemTitle () {
        return this.editedResultItemIndex === -1 ? 'New Item' : 'Edit Item'
      },
      outbreakGroupItems () {
        let code_id = this.GE_CODE_LIST.filter(f => f.code === 'outbreak_group')[0].code_id 
        return this.GE_CODE_LIST.filter(f => f.group_code_id === code_id)
      },

    },

    watch: {
      dialogResult (val) {
        console.log('val watch : ' + val)
        console.log('this.editedResultIndex watch : ' + this.editedResultIndex)
        if( this.editedResultIndex === -1 && val === true) 
          this.setResultId()

        val || this.closeResult()
      },
      dialogResultDelete (val) {
        val || this.closeResultDelete()
      },

      selectedResult(val) {          
          if(val.length > 0){
            this.resultItemList = this.GE_RESULT_ITEM_LIST.filter(f=>(f.result_id===val[0].result_id))  
          }else{
            this.resultItemList = this.GE_RESULT_ITEM_LIST
          }
          //console.log('selectedResult(resultItemList)', JSON.stringify(this.resultItemList, null, 2))
          //console.log('selectedResult(val)', JSON.stringify(val, null, 2))
      },  

      dialogResultItem (val) {
        console.log('val watch : ' + val)
        console.log('this.editedResultIndex watch : ' + this.editedResultIndex)
        if( this.editedResultItemIndex === -1 && val === true) 
          this.setResultItemId()

        val || this.closeResultItem()
      },
      dialogResultItemDelete (val) {
        val || this.closeResultItemDelete()
      },

    },

    created () {
      this.initWorkList()
    },

    methods: {
        
      ...mapActions(resultStore, [
        'AC_RESULT', 'AC_RESULT_PUSH', 'AC_RESULT_EDIT', 'AC_RESULT_DEL', 'AC_RESULT_LIST' 
      ]),
      ...mapActions(resultItemStore, [
        'AC_RESULT_ITEM_PUSH', 'AC_RESULT_ITEM_EDIT', 'AC_RESULT_ITEM_DEL','AC_RESULT_ITEM_LIST' 
      ]),
        
      initWorkList () {
        this.GE_CODE_LIST
        this.GE_RESULT_LIST
        this.resultItemList = this.GE_RESULT_ITEM_LIST
      },

      initialize(){
        this.GE_CODE_LIST
        this.GE_RESULT_LIST
        this.GE_RESULT_ITEM_LIST
      },

      editResult (item) {
        
        console.log('item editResult : '+ JSON.stringify(item, null, 2))
        this.editedResultIndex = this.GE_RESULT_LIST.indexOf(this.GE_RESULT_LIST.find(f=>f.result_id===item.result_id))
        this.editedResult = Object.assign({}, item)
        this.dialogResult = true

        console.log('this.editedResultIndex : '+ JSON.stringify(this.editedResultIndex, null, 2))
        console.log('this.editedResult : '+ JSON.stringify(this.editedResult, null, 2))

      },

      deleteResult (item) {
        this.editedResultIndex = this.GE_RESULT_LIST.indexOf(item)
        this.editedResult = Object.assign({}, item)
        this.dialogResultDelete = true
      },

      deleteResultConfirm () {

        this.AC_RESULT_DEL(this.editedResult)
        this.closeResultDelete()
      },

      closeResult() {
        this.dialogResult = false
        setTimeout(() => (
            this.$nextTick(() => {
              this.editedResult = Object.assign({}, this.defaultResult)
              this.editedResultIndex = -1
            })
          ), 1000)
      },

      closeResultDelete () {
        this.dialogResultDelete = false
        this.$nextTick(() => {
          this.editedResult = Object.assign({}, this.defaultResult)
          this.editedResultIndex = -1
        })
      },

      saveResult () {
        console.log('saveResult')

        if (this.editedResultIndex > -1) {
          this.payloadResult.index=this.editedResultIndex
          this.payloadResult.result=this.editedResult
          this.AC_RESULT_EDIT(this.payloadResult)
          console.log('this.editedResultIndex : ' + this.editedResultIndex)
        }else{
          this.AC_RESULT_PUSH(this.editedResult)
        }    
        this.closeResult()
      },

      setResultId(){
        this.editedResult.result_id =  Math.max(...(this.GE_RESULT_LIST.map(m => m.result_id))) + 1
        console.log(' this.editedResult.result_id : ' + this.editedResult.result_id)
      },

      submitResult () {
        this.$refs.observerResult.validate()
      },
      clearResult () {
        this.defaultResult.result_id = this.editedResult.result_id
        this.editedResult = Object.assign({}, this.defaultResult)
        this.$refs.observerResult.reset()
      },

      editResultItem (item) {
        
        console.log('item editResultItem : '+ JSON.stringify(item, null, 2))
        this.editedResultItemIndex = this.GE_RESULT_ITEM_LIST.indexOf(this.GE_RESULT_ITEM_LIST.find(f=>f.result_item_id===item.result_item_id))
        this.editedResultItem = Object.assign({}, item)
        this.dialogResultItem = true

        console.log('this.editedResultItemIndex : '+ JSON.stringify(this.editedResultItemItemIndex, null, 2))
        console.log('this.editedResultItem : '+ JSON.stringify(this.editedResultItem, null, 2))

      },

      deleteResultItem (item) {
        this.editedResultItemIndex = this.GE_RESULT_ITEM_LIST.indexOf(item)
        this.editedResultItem = Object.assign({}, item)
        this.dialogResultItemDelete = true
      },

      deleteResultItemConfirm () {

        this.AC_RESULT_ITEM_DEL(this.editedResultItem)
        this.closeResultItemDelete()
      },

      closeResultItem() {
        this.dialogResultItem = false
        setTimeout(() => (
            this.$nextTick(() => {
              this.editedResultItem = Object.assign({}, this.defaultResultItem)
              this.editedResultItemIndex = -1
            })
          ), 1000)
      },

      closeResultItemDelete () {
        this.dialogResultItemDelete = false
        this.$nextTick(() => {
          this.editedResultItem = Object.assign({}, this.defaultResultItem)
          this.editedResultItemIndex = -1
        })
      },

      saveResultItem () {
        console.log('saveResultItem')

        if (this.editedResultItemIndex > -1) {
          this.payloadResultItem.index=this.editedResultItemIndex
          this.payloadResultItem.resultItem=this.editedResultItem
          this.AC_RESULT_ITEM_EDIT(this.payloadResultItem)
          console.log('this.editedResultItemIndex : ' + this.editedResultItemIndex)
        }else{
          this.AC_RESULT_ITEM_PUSH(this.editedResultItem)
        }    
        this.closeResultItem()
      },

      setResultItemId(){
        this.editedResultItem.result_item_id =  Math.max(...(this.GE_RESULT_ITEM_LIST.map(m => m.result_item_id))) + 1
        console.log(' this.editedResultItem.result_item_id : ' + this.editedResultItem.result_item_id)
      },

      submitResultItem () {
        this.$refs.observerResultItem.validate()
      },
      clearResultItem () {
        this.defaultResultItem.result_item_id = this.editedResultItem.result_item_id
        this.editedResultItem = Object.assign({}, this.defaultResultItem)
        this.$refs.observerResultItem.reset()
      },

    },
}
</script>

<style>

</style>