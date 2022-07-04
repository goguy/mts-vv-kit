<template>
  <v-container
    id="work-info"
    fluid
    tag="section"
  >    
    <v-data-table
        :headers="headers"
        :items="GE_WORK_LIST"
        sort-by="work_id"
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
                            label="정비작업명"
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
                            name="editedItem.work_id"
                            :rules="{
                              required: true,
                              regex:'|^[0-9]*$|'
                            }"
                          >
                          <v-text-field
                            v-model="editedItem.work_id"
                            :counter="7"
                            :error-messages="errors"
                            type="number"
                            :disabled="true"
                            label="정비작업ID"
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
                            name="editedItem.time"
                            :rules="{
                              required: true,
                              regex:'|^[0-9]*$|'
                            }"
                          >
                          <v-text-field
                            v-model="editedItem.time"
                            :counter="9"
                            :error-messages="errors"
                            label="작업시간"
                            type="number"
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

import { required, digits, email, max, regex } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

  const codeStore = 'codeStore'
  const workStore = 'workStore'

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
    name: 'WorkInfo',
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: '정비작업명',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: '정비작업ID', value: 'work_id' },
        { text: '작업시간', value: 'time' },
        { text: '타입', value: 'type' },
        { text: '설명', value: 'rmk' },
        { text: '이미지경로', value: 'img_url' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        name: '',
        work_id: 0,
        time: 0,
        type: '',
        rmk: '',
        img_url: '',
      },
      defaultItem: {
        name: '',
        work_id: 0,
        time: 0,
        type: '',
        rmk: '',
        img_url: '',
      },
      payload: {
        index: 0,
        work:[]
      },
    }),

    computed: {
      ...mapGetters(codeStore, [
        'GE_CODE', 'GE_CODE_LIST'
      ]),    
      ...mapGetters(workStore, [
        'GE_WORK', 'GE_WORK_LIST'
      ]),    

      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      outbreakGroupItems () {
        let code_id = this.GE_CODE_LIST.filter(f => f.code === 'outbreak_group')[0].code_id 
        return this.GE_CODE_LIST.filter(f => f.group_code_id === code_id)
      },

    },

    watch: {
      dialog (val) {
        console.log('val watch : ' + val)
        console.log('this.editedIndex watch : ' + this.editedIndex)
        if( this.editedIndex === -1 && val === true) 
          this.setWorkId()

        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initWorkList()
    },

    methods: {
      ...mapActions(workStore, [
        'AC_WORK', 'AC_WORK_PUSH', 'AC_WORK_EDIT', 'AC_WORK_DEL', 'AC_WORK_LIST' 
      ]),

      initWorkList () {
        this.GE_CODE_LIST
        this.GE_WORK_LIST
      },

      initialize(){
        this.GE_CODE_LIST
        this.GE_WORK_LIST
      },

      editItem (item) {
        
        console.log('item editItem : '+ JSON.stringify(item, null, 2))
        //this.editedIndex = this.desserts.indexOf(item)
        //this.editedIndex = this.GE_WORK_LIST.indexOf(item)
        
        //this.editedIndex = this.GE_WORK_LIST.indexOf(this.GE_WORK_LIST.filter(f=>f.work_id === item.work_id)[0])
        this.editedIndex = this.GE_WORK_LIST.indexOf(this.GE_WORK_LIST.find(f=>f.work_id===item.work_id))
        this.editedItem = Object.assign({}, item)
        this.dialog = true

        console.log('this.editedIndex : '+ JSON.stringify(this.editedIndex, null, 2))
        console.log('this.editedItem : '+ JSON.stringify(this.editedItem, null, 2))

      },

      deleteItem (item) {
        //this.editedIndex = this.desserts.indexOf(item)
        this.editedIndex = this.GE_WORK_LIST.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {

        this.AC_WORK_DEL(this.editedItem)
        //this.AC_WORK_DEL(this.editedIndex)
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

      save () {
        console.log('save')

        if (this.editedIndex > -1) {
          this.payload.index=this.editedIndex
          this.payload.work=this.editedItem
          this.AC_WORK_EDIT(this.payload)
          console.log('this.editedIndex : ' + this.editedIndex)
        }else{
          this.AC_WORK_PUSH(this.editedItem)
        }    
        this.close()
      },

      setWorkId(){
        this.editedItem.work_id =  Math.max(...(this.GE_WORK_LIST.map(m => m.work_id))) + 1
        //this.editedItem.work_id =  Math.max(...(this.desserts.map(m => m.work_id))) + 1
        console.log(' this.editedItem.work_id : ' + this.editedItem.work_id)
      },

      submit () {
        this.$refs.observer.validate()
      },
      clear () {
        this.defaultItem.work_id = this.editedItem.work_id
        this.editedItem = Object.assign({}, this.defaultItem)
        this.$refs.observer.reset()
      },
    },
  }
</script>
