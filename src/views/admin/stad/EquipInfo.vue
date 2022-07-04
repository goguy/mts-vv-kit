<template>
  <v-container
    id="EquipInfo"
    fluid
    tag="section"
  >
      
    <v-data-table
        :headers="headers"
        :items="linqQueyData"
        sort-by="equipment_id"
        item-key="equipment_id"
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
                        sm="9"
                        md="9"
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
                          label="장비명"
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
                          name="editedItem.equipment_id"
                          :rules="{
                            required: true,
                            regex:'|^[0-9]*$|'
                          }"
                        >
                        <v-text-field
                          v-model="editedItem.equipment_id"
                          :counter="7"
                          :error-messages="errors"
                          type="number"
                          :disabled="true"
                          label="장비ID"
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
                          name="editedItem.type"
                          :rules="{
                            required: true
                          }"
                        >
                          <v-select
                            v-model="editedItem.type"
                            :items="equipGroupItems"
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
                        sm="3"
                        md="3"
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
                        sm="3"
                        md="3"
                    >
                        <validation-provider
                          v-slot="{ errors }"
                          name="editedItem.require"
                          rules="required"
                        >
                          <v-select
                            v-model="editedItem.require"
                            :items="ynGroupItems"
                            :error-messages="errors"
                            item-text="name"
                            item-value="code"
                            label="필수여부"
                            return-object
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
                          name="editedItem.classify"
                          rules="required"
                        >
                          <v-select
                            v-model="editedItem.classify"
                            :items="classifyItems"
                            :error-messages="errors"
                            item-text="codeNm"
                            item-value="code"
                            label="분류"
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
                      <v-file-input
                        accept="image/*"
                        label=" Image File input"
                      ></v-file-input>                        
                        <v-text-field
                          v-model="editedItem.img_src"
                          label="이미지경로"
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
        <template v-slot:item.classify="{ item }">
          <span v-if="item.classify==='M'">
            공통
          </span>
          <span v-else-if="item.classify==='A'">
            A등급
          </span>
          <span v-else-if="item.classify==='B'">
            B등급
          </span>
          <span v-else-if="item.classify==='C'">
            C등급
          </span>
        </template>

        <template v-slot:item.actions="{ item }">
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
       
        
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import  Enumerable from 'linq'

import { required, digits, email, max, regex } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

import '@/js/common/Linq.js'

  const codeStore = 'codeStore'
  const equipmentStore = 'equipmentStore'

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
    name: 'EquipInfo',
    data: () => ({
      dialog: false,
      dialogDelete: false,
      
      headers: [
        {
          text: '장비명',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: '장비ID', value: 'equipment_id' },
        { text: '유형', value: 'code_name' },
        { text: '돌발관련', value: 'is_outbreak'},
        { text: '필수여부', value: 'require' },
        { text: '분류', value: 'classify' },
        { text: '이미지경로', value: 'img_url' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],

      editedIndex: -1,
      editedItem: {
        name: '',
        equipment_id: 0,
        type: '',
        is_outbreak: 'N',
        require: '',
        classify: '',
        img_url: '',
      },
      defaultItem: {
        name: '',
        equipment_id: 0,
        type: '',
        is_outbreak: 'N',
        require: '',
        classify: '',
        img_url: '',
      },
      payload: {
        index: 0,
        equipment:[]
      },
      classifyItems: [
        {codeNm: '공통', code: 'M'},
        {codeNm: 'A등급', code: 'A'},
        {codeNm: 'B등급', code: 'B'},
        {codeNm: 'C등급', code: 'C'},
      ], 
    }),

    computed: {
      ...mapGetters(codeStore, [
        'GE_CODE', 'GE_CODE_LIST'
      ]),    
      ...mapGetters(equipmentStore, [
        'GE_EQUIPMENT', 'GE_EQUIPMENT_LIST'
      ]),    

      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      linqQueyData () {
        let query = Enumerable.from(this.GE_EQUIPMENT_LIST)
                          .leftJoin(this.GE_CODE_LIST,
                            pk => pk.type,
                            fk => fk.code,
                            (left, right) => ({...left, code_name: right === null ? '': right.name}))
                          .toArray()
        return query
      },      
      equipGroupItems () {
        let code_id = this.GE_CODE_LIST.filter(f => f.code === 'equip_group')[0].code_id 
        return this.GE_CODE_LIST.filter(f => f.group_code_id === code_id)
      },
      ynGroupItems () {
        let code_id = this.GE_CODE_LIST.filter(f => f.code === 'yn_group')[0].code_id 
        return this.GE_CODE_LIST.filter(f => f.group_code_id === code_id)
      }
    },

    watch: {
      dialog (val) {
        console.log('this.editedIndex watch : ' + this.editedIndex)
        if( this.editedIndex === -1 && val === true) 
          this.setEquipmentId()

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
      //this.initList()
      //console.log('query', JSON.stringify(query,null, 2) )
    },

    methods: {
      ...mapActions(equipmentStore, [
        'AC_EQUIPMENT', 'AC_EQUIPMENT_PUSH', 'AC_EQUIPMENT_EDIT', 'AC_EQUIPMENT_DEL', 'AC_EQUIPMENT_LIST' 
      ]),

      initList () {
        this.GE_CODE_LIST
        this.GE_EQUIPMENT_LIST
      },

      initialize(){
        this.GE_CODE_LIST
        this.GE_EQUIPMENT_LIST
      },

      initQuery() {
        //this.AC_EQUIPMENT_LIST(this.equipmentList)
        let query = Enumerable.from(this.GE_EQUIPMENT_LIST)
                              .toArray()
        console.log('query initQuery : ' + JSON.stringify(query,null,2))
      },

      editItem (item) {
        //this.editedIndex = this.desserts.indexOf(item)
        this.editedIndex = this.linqQueyData.indexOf(item)
        this.setItem(item)
        //this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      setItem(item) {
        this.editedItem.name=item.name
        this.editedItem.equipment_id=item.equipment_id
        this.editedItem.type=item.type
        this.editedItem.is_outbreak=item.is_outbreak
        this.editedItem.require=item.require
        this.editedItem.classify=item.classify
        this.editedItem.img_src=item.img_src
      },
      deleteItem (item) {
        //this.editedIndex = this.desserts.indexOf(item)
        this.editedIndex = this.linqQueyData.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.AC_EQUIPMENT_DEL(this.editedItem)
        //this.desserts.splice(this.editedIndex, 1)
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
      setSelectValue() {
        if(this.editedItem.type['code'] !== undefined){
          let typeCode = this.editedItem.type['code']
          this.editedItem.type = typeCode
        }
        if(this.editedItem.require['code'] !== undefined){
          let requireCode = this.editedItem.require['code']
          this.editedItem.require = requireCode
        }
        if(this.editedItem.classify['code'] !== undefined){
          let classifyCode = this.editedItem.classify['code'] 
          this.editedItem.classify = classifyCode
        }
      },
      save () {
        console.log('save')
        this.setSelectValue()
        console.log('this.editedItem save: ' + JSON.stringify(this.editedItem, null, 2))  

        if (this.editedIndex > -1) {
          this.payload.index=this.editedIndex
          this.payload.equipment=this.editedItem
          this.AC_EQUIPMENT_EDIT(this.payload)
          console.log('this.editedIndex : ' + this.editedIndex)
        }else{
          this.AC_EQUIPMENT_PUSH(this.editedItem)
        }    
        this.close()
      },

      setEquipmentId(){
        //this.editedItem.equipment_id =  Math.max(...(this.desserts.map(m => m.equipment_id))) + 1
        if(this.linqQueyData.length > 0)
          this.editedItem.equipment_id =  Math.max(...(this.linqQueyData.map(m => m.equipment_id))) + 1        
        console.log(' this.editedItem.equipment_id : ' + this.editedItem.equipment_id)
      },
      submit() {
        this.$refs.observer.validate()
      },
      clear() {
        this.defaultItem.equipment_id = this.editedItem.equipment_id
        this.editedItem = Object.assign({}, this.defaultItem)
        this.$refs.observer.reset()
      },

    },
  }
</script>
