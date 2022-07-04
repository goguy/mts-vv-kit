<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
      
        <v-data-table
            :headers="headers"
            :items="GE_DISASTER_LIST"
            sort-by="disaster_id"
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
                              label="재해명"
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
                              name="editedItem.disaster_id"
                              :rules="{
                                required: true,
                                regex:'|^[0-9]*$|'
                              }"
                            >
                            <v-text-field
                              v-model="editedItem.disaster_id"
                              :counter="7"
                              :error-messages="errors"
                              type="number"
                              :disabled="true"
                              label="재해ID"
                              required
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
                              name="editedItem.rate"
                              rules="required|max:10"
                            >
                            <v-text-field
                              v-model="editedItem.rate"
                              :counter="10"
                              :error-messages="errors"
                              label="등급"
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

import { required, digits, email, max, regex } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

  const disasterStore = 'disasterStore'

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
    name: 'DisasterInfo',
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: '재해명',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: '재해ID', value: 'disaster_id' },
        { text: '등급', value: 'rate' },
        { text: '설명', value: 'rmk' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        disaster_id: 0,	
        name: '',
        rate: '',
        rmk: ''
      },
      defaultItem: {
        disaster_id: 0,	
        name: '',
        rate: '',
        rmk: ''
      },
      payload: {
        index: 0,
        disaster:[]
      },
    }),

    computed: {
      ...mapGetters(disasterStore, [
        'GE_DISASTER', 'GE_DISASTER_LIST'
      ]),    

      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },

    },

    watch: {
      dialog (val) {
        console.log('val watch : ' + val)
        console.log('this.editedIndex watch : ' + this.editedIndex)
        if( this.editedIndex === -1 && val === true) 
          this.setDisasterId()

        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initList()
    },

    methods: {
      ...mapActions(disasterStore, [
        'AC_DISASTER', 'AC_DISASTER_PUSH', 'AC_DISASTER_EDIT', 'AC_DISASTER_DEL', 'AC_DISASTER_LIST' 
      ]),

      initList () {
        let query = this.GE_DISASTER_LIST
        console.log('initLIst', JSON.stringify(query, null, 2))
      },

      initialize () {
        this.desserts = this.GE_DISASTER_LIST

      },

      editItem (item) {
        this.editedIndex = this.GE_DISASTER_LIST.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.GE_DISASTER_LIST.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.AC_DISASTER_DEL(this.editedItem)  
        //this.AC_DISASTER_DEL(this.editedIndex)
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
          /*
          let disasterId = this.editedItem.disaster_id
          this.editedItem.disaster_id = parseInt(disasterId)
          */

          this.payload.index=this.editedIndex
          this.payload.disaster=this.editedItem
          this.AC_DISASTER_EDIT(this.payload)
          console.log('this.editedIndex : ' + this.editedItem.disaster_id)
        }else{
          this.AC_DISASTER_PUSH(this.editedItem)
        }    
        this.close()
      },

      setDisasterId(){        
        this.editedItem.disaster_id =  Math.max(...((this.GE_DISASTER_LIST.map(m => m.disaster_id)).filter(f=>f!==90))) + 1
        //this.editedItem.disaster_id =  Math.max(...((this.desserts.map(m => m.disaster_id)).filter(f=>f!=='90'))) + 1
        console.log(' this.editedItem.disaster_id : ' + this.editedItem.disaster_id)
      },

      submit () {
        this.$refs.observer.validate()
      },
      clear () {
        this.defaultItem.disaster_id = this.editedItem.disaster_id
        this.editedItem = Object.assign({}, this.defaultItem)
        this.$refs.observer.reset()
      },

    },
  }
</script>
