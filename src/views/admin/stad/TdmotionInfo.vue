<template>
  <v-container
    id="TdmotionInfo"
    fluid
    tag="section"
  >
      
    <v-data-table
        :headers="headers"
        :items="linqQueyData"
        sort-by="motion_id"
        class="elevation-1"
    >
        <template v-slot:top>
        <v-toolbar
            flat
        >
            <v-toolbar-title>My CRUD</v-toolbar-title>
            <v-divider
            class="mx-4"
            inset
            vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog
            v-model="dialog"
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
                <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <validation-observer
                  ref="observer"
                  v-slot="{ invalid }"
                >
                  <form @submit.prevent="submit">

                  <v-card-text>
                    <v-row>
                    <v-col
                        cols="12"
                        sm="12"
                        md="12"
                    >
                        <validation-provider
                          v-slot="{ errors }"
                          name="editedItem.name"
                          rules="required|max:20"
                        >
                        <v-text-field
                          v-model="editedItem.name"
                          :counter="20"
                          :error-messages="errors"
                          required
                          label="모션명"
                        ></v-text-field>
                        </validation-provider>

                    </v-col>
                    <v-col
                        cols="12"
                        sm="4"
                        md="4"
                    >

                        <validation-provider
                          v-slot="{ errors }"
                          name="editedItem.motion_id"
                          :rules="{
                            required: true,
                            regex:'|^[0-9]*$|'
                          }"
                        >
                        <v-text-field
                          v-model="editedItem.motion_id"
                          :counter="7"
                          :error-messages="errors"
                          type="number"
                          :disabled="true"
                          label="모션ID"
                          required
                        ></v-text-field>
                        </validation-provider>

                    </v-col>
                    <v-col
                        cols="12"
                        sm="4"
                        md="4"
                    >

                        <validation-provider
                          v-slot="{ errors }"
                          name="editedItem.type"
                          :rules="{
                            required: true
                          }"
                        >
                          <v-select
                            v-model="editedItem.type"
                            :items="motionGroupItems"
                            :error-messages="errors"
                            item-text="name"
                            item-value="code"
                            label="유형"
                            return-object
                            required
                          ></v-select>
                        </validation-provider>

                    </v-col>
                    <v-col
                        cols="12"
                        sm="4"
                        md="4"
                    >
                        <validation-provider
                          v-slot="{ errors }"
                          name="editedItem.is_outbreak"
                          :rules="{
                            required: true
                          }"
                        >
                          <v-select
                            v-model="editedItem.is_outbreak"
                            :items="ynGroupItems"
                            :error-messages="errors"
                            item-text="name"
                            item-value="code"
                            label="돌발관련"
                            return-object
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
                        name="editedItem.rmk"
                        rules="required|max:50"
                      >
                        <v-text-field
                          v-model="editedItem.rmk"
                          label="설명"
                          :counter="50"
                          :error-messages="errors"
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
                          name="editedItem.type"
                          :rules="{
                            required: true
                          }"
                        >
                        <v-text-field
                          v-model="editedItem.video_nm"
                          :error-messages="errors"
                          label="비디오명"
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
                          name="editedItem.video_type"
                          :rules="{
                            required: true
                          }"
                        >
                        <v-text-field
                          v-model="editedItem.video_type"
                          :error-messages="errors"
                          label="비디오타입"
                          required
                        ></v-text-field>
                        </validation-provider>

                    </v-col>

                    <v-col
                        cols="12"
                        sm="12"
                        md="12"
                    >
                      <v-file-input
                        accept="mp4/*"
                        label=" mp4 File input"
                      ></v-file-input>                        
                        <v-text-field
                          v-model="editedItem.video_url"
                          label="비디오경로"
                        ></v-text-field>
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
                    submit
                  </v-btn>
                  <v-btn @click="clear">
                    clear
                  </v-btn>
                  <v-btn
                      color="blue darken-1"
                      text
                      @click="close"
                  >
                      Cancel
                  </v-btn>

                </v-card-actions>

                  </form>
                </validation-observer>

              </v-card>                    
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="700px">
            <v-card>
                <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
            </v-dialog>
        </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <span 
            class="material-icons md-18 mr-2 " 
            @click="showVideo(item)"
            style="cursor: pointer"
            >videocam</span>            
          <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
          >
              mdi-pencil
          </v-icon>
          <v-icon
              small
              @click="deleteItem(item)"
          >
              mdi-delete
          </v-icon>
        </template>
        <template v-slot:no-data>
        <v-btn
            color="primary"
            @click="initialize"
        >
            Reset
        </v-btn>
        </template>
    </v-data-table>

    <v-dialog
      v-model="dialogVideo"
      max-width="1000"
    >
      <base-y-dialog 
        :param="dialogOptions"
        />
    </v-dialog>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import  Enumerable from 'linq'

import { required, digits, email, max, regex } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

import '@/js/common/Linq.js'

  const codeStore = 'codeStore'
  const tdmotionStore = 'tdmotionStore'

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
    name: 'TdmotionInfo',
    data: () => ({
      dialog: false,
      dialogDelete: false,
      dialogVideo:false,

      dialogOptions: {
        target: null,
        param: {},
        closeCallback: null,
      },

      headers: [
        {
          text: '모션명',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: '모션ID', value: 'motion_id' },
        { text: '타입', value: 'code_name' },
        { text: '돌발관련', value: 'is_outbreak'},
        { text: '설명', value: 'rmk' },
        { text: '비디오명', value: 'video_nm' },
        { text: '비디오타입', value: 'video_type' },
        //{ text: '비디오경로', value: 'video_url' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],

      editedIndex: -1,
      editedItem: {
        motion_id: 0,                           	
        name: '',	
        type: '',
        is_outbreak:'N',	
        rmk: '',
        video_nm: '',	
        video_type: '',
        video_url: ''
      },
      defaultItem: {
        motion_id: 0,                           	
        name: '',	
        type: '',
        is_outbreak:'N',	
        rmk: '',
        video_nm: '',	
        video_type: '',
        video_url: ''
      },

      payload: {
        index: 0,
        tdmotion:[]
      },
    }),

    computed: {
      ...mapGetters(codeStore, [
        'GE_CODE', 'GE_CODE_LIST'
      ]),    
      ...mapGetters(tdmotionStore, [
        'GE_TDMOTION', 'GE_TDMOTION_LIST'
      ]),    

      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      linqQueyData() {
        let query = Enumerable.from(this.GE_TDMOTION_LIST)
                          .leftJoin(this.GE_CODE_LIST,
                            pk => pk.type,
                            fk => fk.code,
                            (left, right) => ({...left, code_name: right === null ? '': right.name}))
                          .toArray()
        return query
      },
      motionGroupItems () {
        let code_id = this.GE_CODE_LIST.filter(f => f.code === 'motion_group')[0].code_id 
        return this.GE_CODE_LIST.filter(f => f.group_code_id === code_id)
      },
      ynGroupItems () {
        let code_id = this.GE_CODE_LIST.filter(f => f.code === 'yn_group')[0].code_id 
        return this.GE_CODE_LIST.filter(f => f.group_code_id === code_id)
      }

    },

    watch: {
      dialog (val) {
        console.log('val watch : ' + val)
        if( this.editedIndex === -1 && val === true) 
          this.setMotionId()

        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created() {
      this.initList()
    },
    mounted() {
        //console.log('query', JSON.stringify(query,null, 2) )

      //this.initQuery()
    },
    methods: {
      ...mapActions(tdmotionStore, [
        'AC_TDMOTION', 'AC_TDMOTION_PUSH', 'AC_TDMOTION_EDIT', 'AC_TDMOTION_DEL', 'AC_TDMOTION_LIST' 
      ]),

      initList () {
        this.GE_CODE_LIST
        this.GE_TDMOTION_LIST
      },

      initialize(){
        this.GE_CODE_LIST
        this.GE_TDMOTION_LIST
      },

      initQuery() {
        let query = Enumerable.from(this.GE_TDMOTION_LIST).toArray()
        console.log('query initQuery : ' + JSON.stringify(query,null,2))
      },
      showVideo(item){
        if(item.video_url.indexOf('.mp4') > -1){

          this.dialogOptions.target = () => import(`${'@/views/admin/stad/TdmotionInfoDiagVideo.vue'}`);
          this.dialogOptions.param = item
          this.dialogOptions.closeCallback = this.closeDialog;
          this.dialogVideo=true 
          
        }else{
          alert('비디오 형식에 맞지 않습니다.')  
          return 
        }
                
        //console.log('item : ' + JSON.stringify(item,null,2))
      },
      closeDialog() {
        this.dialogOptions.target = null;
        this.dialogVideo = false;
      },

      editItem (item) {
        this.editedIndex = this.linqQueyData.indexOf(item)        
        this.setItem(item)
        //this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      setItem(item) {
        this.editedItem.motion_id=item.motion_id                           	
        this.editedItem.name=item.name	
        this.editedItem.type=item.type
        this.editedItem.is_outbreak=item.is_outbreak
        this.editedItem.rmk=item.rmk
        this.editedItem.video_nm=item.video_nm
        this.editedItem.video_type=item.video_type
        this.editedItem.video_url=item.video_url
      },
      deleteItem (item) {
        this.editedIndex = this.linqQueyData.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.AC_TDMOTION_DEL(this.editedItem)
        //this.AC_TDMOTION_DEL(this.editedIndex)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        setTimeout(() => (
            this.$nextTick(() => {
              this.editedItem = Object.assign({}, this.defaultItem)
              this.editedIndex = -1
            })
          ), 1000)
      },

      closeDelete () {
        this.dialogDelete = false

        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      save () {
        console.log('save')
        console.log('this.editedItem save: ' + JSON.stringify(this.editedItem, null, 2))  

        if (this.editedIndex > -1) {
          this.payload.index=this.editedIndex
          this.payload.tdmotion=this.editedItem
          this.AC_TDMOTION_EDIT(this.payload)
          console.log('this.editedIndex : ' + this.editedIndex)
        }else{
          this.AC_TDMOTION_PUSH(this.editedItem)
        }    
        this.close()
      },

      setMotionId(){
        this.editedItem.motion_id =  Math.max(...(this.linqQueyData.map(m => m.motion_id))) + 1
        console.log(' this.editedItem.motion_id : ' + this.editedItem.motion_id)
      },

      submit () {
        this.$refs.observer.validate()
      },
      clear () {
        this.defaultItem.motion_id = this.editedItem.motion_id
        this.editedItem = Object.assign({}, this.defaultItem)
        this.$refs.observer.reset()
      },

    },
  }
</script>
