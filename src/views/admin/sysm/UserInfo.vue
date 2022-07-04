<template>
  <v-container
    id="user-info"
    fluid
    tag="section"
  > 

    <v-data-table
        :headers="headers"
        :items="GE_USER_LIST"
        sort-by="email"
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
                        sm="4"
                        md="4"
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
                          label="성명"
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
                          name="editedItem.email"
                          rules="required|email"
                        >
                        <v-text-field
                          v-model="editedItem.email"
                          :error-messages="errors"
                          required
                          label="email"
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
                          name="editedItem.password"
                          rules="required|max:20"
                        >
                        <v-text-field
                          v-model="editedItem.password"
                          :counter="20"
                          :error-messages="errors"
                          required
                          label="password"
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
                          name="editedItem.role"
                          rules="required"
                        >
                          <v-select
                            v-model="editedItem.role"
                            :items="roleItems"
                            :error-messages="errors"
                            item-text="codeNm"
                            item-value="code"
                            label="권한"
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
                          name="editedItem.limits"
                          :rules="{
                            required: true,
                            regex:'|^[0-9]*$|'
                          }"
                        >
                        <v-text-field
                          v-model="editedItem.limits"
                          :counter="3"                          
                          :error-messages="errors"
                          type="number"
                          required
                          label="제한 횟수"
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
                          name="checkbox"
                          rules="required"
                        >
                        <v-checkbox
                          v-model="checkbox"
                          :error-messages="errors"
                          required
                          type="checkbox"
                          label="동의"
                        ></v-checkbox>
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

  const userStore = 'userStore'

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
    name: 'UserInfo',
    data: () => ({
      dialog: false,
      dialogDelete: false,
      checkbox: null,
      headers: [
        {
          text: '성명',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: '이메일', value: 'email' },
        { text: '비번', value: 'password' },
        { text: '동의여부', value: 'agree' },
        { text: '제한', value: 'limits' },
        { text: '권한', value: 'role' },
        { text: '등록일', value: 'reg_dt' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        email: '',
        name: '',
        password: '',
        agree: null,
        limits:0,
        role: '',
        reg_dt: '',
      },
      defaultItem: {
        email: '',
        name: '',
        password: '',
        agree: null,
        limits:0,
        role: '',
        reg_dt: '',
      },
      payload: {
        index: 0,
        user:{}
      },
      roleItems: [
        {codeNm: '관리자', code: 'Admin'},
        {codeNm: '일반', code: 'User'},
      ],

    }),

    computed: {
      ...mapGetters(userStore, [
        'GE_USER', 'GE_USER_LIST'
      ]),    

      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },
    watch: {
      dialog (val) {
        console.log('val watch : ' + val)
        console.log('this.editedIndex watch : ' + this.editedIndex)
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
      checkbox(val) {
          if(val)
            this.editedItem.agree=val
          else{
            this.editedItem.agree=null
            this.checkbox=null
          }  
      },

    },

    created () {},

    methods: {
      ...mapActions(userStore, [
        'AC_USER', 'AC_USER_PUSH', 'AC_USER_EDIT', 'AC_USER_DEL', 'AC_USER_LIST' 
      ]),



      editItem (item) {
        
        console.log('item editItem : '+ JSON.stringify(item, null, 2))
        //this.editedIndex = this.desserts.indexOf(item)
        //this.editedIndex = this.GE_USER_LIST.indexOf(item)
        
        //this.editedIndex = this.GE_USER_LIST.indexOf(this.GE_USER_LIST.filter(f=>f.work_id === item.work_id)[0])
        this.editedIndex = this.GE_USER_LIST.indexOf(this.GE_USER_LIST.find(f=>f.work_id===item.work_id))
        this.editedItem = Object.assign({}, item)
        this.dialog = true

        console.log('this.editedIndex : '+ JSON.stringify(this.editedIndex, null, 2))
        console.log('this.editedItem : '+ JSON.stringify(this.editedItem, null, 2))

      },

      deleteItem (item) {
        //this.editedIndex = this.desserts.indexOf(item)
        this.editedIndex = this.GE_USER_LIST.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {

        this.AC_USER_DEL(this.editedItem)
        //this.AC_USER_DEL(this.editedIndex)
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
        if(this.editedItem.role['code'] !== undefined){
          let roleCode = this.editedItem.role['code']
          this.editedItem.role = roleCode
        }
      },

      save () {
        console.log('save')
        this.setSelectValue()

        if (this.editedIndex > -1) {
          this.payload.index=this.editedIndex
          this.payload.user=this.editedItem
          this.AC_USER_EDIT(this.payload)
          console.log('this.editedIndex edit : ' + this.editedIndex)
        }else{
          this.editedItem.reg_dt=(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
          this.AC_USER_PUSH(this.editedItem)
        }    
        this.close()
      },

      submit () {
        this.$refs.observer.validate()
      },
      clear () {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.$refs.observer.reset()
      },
    },
  }

</script>
