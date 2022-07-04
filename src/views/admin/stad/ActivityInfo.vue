<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >      
        <v-data-table
            :headers="headers"
            :items="GE_ACTIVITY_LIST"
            sort-by="activity_id"
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
                            sm="6"
                            md="6"
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
                              label="활동명"
                            ></v-text-field>
                            </validation-provider>

                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="3"
                        >
                            <validation-provider
                              v-slot="{ errors }"
                              name="editedItem.activity_id"
                              :rules="{
                                required: true,
                                regex:'|^[0-9]*$|'
                              }"
                            >
                            <v-text-field
                              v-model="editedItem.activity_id"
                              :counter="7"
                              :error-messages="errors"
                              type="number"
                              :disabled="true"
                              label="활동ID"
                              required
                            ></v-text-field>
                            </validation-provider>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="3"
                        >                            
                          <v-select
                            v-model="editedItem.parent_id"
                            :items="parentItems"
                            item-text="name"
                            item-value="activity_id"
                            label="부모활동ID"
                            @change="changeLevel"
                            return-object
                          ></v-select>

                        </v-col>
                        <v-col
                            cols="12"
                            sm="4"
                            md="4"
                        >
                            <validation-provider
                              v-slot="{ errors }"
                              name="editedItem.level"
                              :rules="{
                                required: true,
                                regex:'|^[0-9]*$|'
                              }"
                            >
                            <v-text-field
                              v-model="editedItem.level"
                              :counter="9"
                              :error-messages="errors"
                              label="레벨"
                              :disabled="true"
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
                              name="editedItem.source"
                              rules="required|max:20"
                              >

                              <v-text-field
                                v-model="editedItem.source"
                                :counter="20"
                                :error-messages="errors"
                                label="source"
                                required
                              ></v-text-field>

                            </validation-provider>

                        </v-col>
                        <v-col
                            cols="12"
                            sm="4"
                            md="4"
                        >
                            <v-text-field
                              v-model="editedItem.type"
                              label="타입"
                            ></v-text-field>

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
import  Enumerable from 'linq'

import { required, digits, email, max, regex } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

  const activityStore = 'activityStore'

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
    name: 'ActivityInfo',
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: '활동명',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: '활동ID', value: 'activity_id' },
        { text: '부모활동ID', value: 'parent_id' },
        { text: '레벨', value: 'level' },
        { text: 'source', value: 'source' },
        { text: '타입', value: 'type' },
        { text: '설명', value: 'rmk' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        activity_id: 0,	
        parent_id: 0,	
        name: '',	
        level: 0,	
        source: '',	
        type: '',	
        rmk: ''
      },
      defaultItem: {
        activity_id: 0,	
        parent_id: 0,	
        name: '',	
        level: 0,	
        source: '',	
        type: '',	
        rmk: ''
      },
      payload: {
        index: 0,
        activity:[]
      },
      leafItems: [
        {codeNm: 'Y', code: 'Y'},
        {codeNm: 'N', code: 'N'},
      ],

    }),

    computed: {
      ...mapGetters(activityStore, [
        'GE_ACTIVITY', 'GE_ACTIVITY_LIST'
      ]),    

      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      parentItems () {
        let query = Enumerable.from(this.GE_ACTIVITY_LIST)
                              .orderBy(o => o.level)                              
                              .toArray()
        return query                      
      },

    },

    watch: {
      dialog (val) {
        console.log('val watch : ' + val)
        console.log('this.editedIndex watch : ' + this.editedIndex)
        if( this.editedIndex === -1 && val === true) 
          this.setActivityId()

        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      ...mapActions(activityStore, [
        'AC_ACTIVITY', 'AC_ACTIVITY_PUSH', 'AC_ACTIVITY_EDIT', 'AC_ACTIVITY_DEL', 'AC_ACTIVITY_LIST' 
      ]),


      initialize () {
        this.desserts = this.GE_ACTIVITY_LIST
      },

      changeLevel(e){
        this.editedItem.level = e.level === null ? 0 : e.level + 1
        this.editedItem.parent_id = e.activity_id
        console.log('changeLevel',JSON.stringify(e, null, 2))
      },


      editItem (item) {
        this.editedIndex = this.GE_ACTIVITY_LIST.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.GE_ACTIVITY_LIST.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.AC_ACTIVITY_DEL(this.editedItem)
        //this.AC_ACTIVITY_DEL(this.editedIndex)
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
        if(this.editedItem.leaf_yn['code'] !== undefined){
          let leafCode = this.editedItem.leaf_yn['code']
          this.editedItem.leaf_yn = leafCode
        }
      },

      save () {
        console.log('save')
        //this.setSelectValue()
        console.log('this.editedItem save: ' + JSON.stringify(this.editedItem, null, 2))  

        if (this.editedIndex > -1) {
          this.payload.index=this.editedIndex
          this.payload.activity=this.editedItem
          this.AC_ACTIVITY_EDIT(this.payload)
          console.log('this.editedIndex : ' + this.editedIndex)
        }else{
          this.AC_ACTIVITY_PUSH(this.editedItem)
        }    
        this.close()
      },

      setActivityId(){
        this.editedItem.activity_id =  Math.max(...(this.GE_ACTIVITY_LIST.map(m => m.activity_id))) + 1
        console.log(' this.editedItem.activity_id : ' + this.editedItem.activity_id)
      },

      submit () {
        this.$refs.observer.validate()
      },
      clear () {
        this.defaultItem.activity_id = this.editedItem.activity_id
        this.editedItem = Object.assign({}, this.defaultItem)
        this.$refs.observer.reset()
      },

    },
  }
</script>
