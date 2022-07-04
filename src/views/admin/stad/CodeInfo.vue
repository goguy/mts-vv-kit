<template>
  <v-container
    id="code-info"
    fluid
    tag="section"
  >    
    <v-data-table
        :headers="headers"
        :items="GE_CODE_LIST"
        sort-by="code_id"
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
                          name="editedItem.code"
                          rules="required|max:20"
                        >
                        <v-text-field
                          v-model="editedItem.code"
                          :counter="20"
                          :error-messages="errors"
                          required
                          label="코드"
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
                          name="editedItem.name"
                          rules="required|max:20"
                        >
                        <v-text-field
                          v-model="editedItem.name"
                          :counter="20"
                          :error-messages="errors"
                          required
                          label="코드명"
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
                          name="editedItem.code_id"
                          :rules="{
                            required: true,
                            regex:'|^[0-9]*$|'
                          }"
                        >
                        <v-text-field
                          v-model="editedItem.code_id"
                          :counter="7"
                          :error-messages="errors"
                          type="number"
                          :disabled="true"
                          label="코드ID"
                          required
                        ></v-text-field>
                        </validation-provider>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="4"
                        md="4"
                    >
                      <v-select
                        v-model="editedItem.group_code_id"
                        :items="groupItems"                            
                        item-text="name"
                        item-value="code_id"
                        label="그룹코드"
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
                          :counter="7"
                          :error-messages="errors"
                          type="number"
                          :disabled="true"
                          label="레벨"
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
                          v-model="editedItem.attr1"
                          label="속성1"
                          :counter="50"
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="4"
                        md="4"
                    >
                        <v-text-field
                          v-model="editedItem.attr2"
                          label="속성2"
                          :counter="50"
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="4"
                        md="4"
                    >
                        <v-text-field
                          v-model="editedItem.attr3"
                          label="속성3"
                          :counter="50"
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
import { required, digits, max, regex } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

const codeStore = 'codeStore'
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

export default {
    components: {
      ValidationProvider,
      ValidationObserver,
    },    
    name: 'CodeInfo',
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: '코드',
          align: 'start',
          sortable: false,
          value: 'code',
        },
        { text: '코드명', value: 'name' },
        { text: '코드ID', value: 'code_id' },
        { text: '그룹코드ID', value: 'group_code_id' },
        { text: '레벨', value: 'level' },
        { text: '속성1', value: 'attr1' },
        { text: '설명', value: 'rmk' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        code_id: 0,
        code: '',
        name: '',
        group_code_id: null,
        level: 0,
        attr1: '',
        attr2: '',
        attr3: '',
        rmk: ''
      },
      defaultItem: {
        code_id: 0,
        code: '',
        name: '',
        group_code_id: null,
        level: 0,
        attr1: '',
        attr2: '',
        attr3: '',
        rmk: ''
      },
      payload: {
        index: 0,
        code:[]
      },
    }),

    computed: {
      ...mapGetters(codeStore, [
        'GE_CODE', 'GE_CODE_LIST'
      ]),    

      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      
      groupItems () {
        let query = [{code_id: null, name:'그룹코드', level: null }] 
        return query.concat(this.GE_CODE_LIST.filter(f => f.group_code_id === null))
      }      
    },

    watch: {
      dialog (val) {
        console.log('val watch : ' + val)
        console.log('this.editedIndex watch : ' + this.editedIndex)
        if( this.editedIndex === -1 && val === true) 
          this.setCodeId()

        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initList()
    },

    mounted() {
      /*
      let query = [{code_id: null, name:'New' }]       
      query = query.concat(this.GE_CODE_LIST.filter(f => f.group_code_id === null))
      console.log('query', JSON.stringify(query,null, 2) )
      */
    },
    methods: {
      
      ...mapActions(codeStore, [
        'AC_CODE', 'AC_CODE_PUSH', 'AC_CODE_EDIT', 'AC_CODE_DEL', 'AC_CODE_LIST' 
      ]),

      initList(){
        let query = this.GE_CODE_LIST
        console.log('initList', JSON.stringify(query, null, 2))

      },
      initialize(){
        console.log('initialize')
      },

      setCodeId(){
        this.editedItem.code_id =  Math.max(...(this.GE_CODE_LIST.map(m => m.code_id))) + 1
        console.log(' this.editedItem.code_id : ' + this.editedItem.code_id)
      },
      changeLevel(e){
        this.editedItem.level = e.level === null ? 0 : e.level + 1
        this.editedItem.group_code_id = e.code_id
        console.log('changeLevel',JSON.stringify(e, null, 2))
      },
      save () {
        console.log('save')

        if (this.editedIndex > -1) {
          this.payload.index=this.editedIndex
          this.payload.code=this.editedItem
          this.AC_CODE_EDIT(this.payload)
          console.log('this.editedIndex : ' + this.editedIndex)
        }else{
          this.AC_CODE_PUSH(this.editedItem)
        }    
        this.close()
      },

      editItem (item) {
        
        console.log('item editItem : '+ JSON.stringify(item, null, 2))
        this.editedIndex = this.GE_CODE_LIST.indexOf(this.GE_CODE_LIST.find(f=>f.code_id===item.code_id))
        this.editedItem = Object.assign({}, item)
        this.dialog = true

        console.log('this.editedIndex : '+ JSON.stringify(this.editedIndex, null, 2))
        console.log('this.editedItem : '+ JSON.stringify(this.editedItem, null, 2))

      },

      deleteItem (item) {
        this.editedIndex = this.GE_CODE_LIST.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {

        this.AC_CODE_DEL(this.editedItem)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
          this.$refs.observer.reset()
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      submit () {
        this.$refs.observer.validate()
      },
      clear () {
        this.defaultItem.code_id = this.editedItem.code_id
        this.editedItem = Object.assign({}, this.defaultItem)
        this.$refs.observer.reset()
      },
    },  
}
</script>

<style>

</style>