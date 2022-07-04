<template>
  <div class="auth-wrapper auth-v1">
    <div class="auth-inner">
      <v-card class="auth-card">
        <!-- logo -->
        <v-card-title class="d-flex align-center justify-center py-7">
          <router-link
            to="/"
            class="d-flex align-center"
          >

            <h2 class="text-2xl font-weight-semibold">
              MTS
            </h2>
          </router-link>
        </v-card-title>

        <!-- title -->
        <v-card-text>
          <p class="text-2xl font-weight-semibold text--primary mb-2">
            Adventure starts here 🚀
          </p>
          <p class="mb-2">
            Make your app management easy and fun!
          </p>
        </v-card-text>

        <!-- login form -->
        <v-card-text>
          <v-form
            ref="regrForm"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="name"
              :counter="10"
              :rules="nameRules"
              label="UserName"
              outlined
              required
              class="mb-3"
            ></v-text-field>

            <v-text-field
              v-model="email"
              ref="email"
              :rules="emailRules"
              label="E-mail"
              outlined
              required
              class="mb-3"
            ></v-text-field>

            <v-text-field
              v-model="password"
              outlined
              :counter="10"
              :type="isPasswordVisible ? 'text' : 'password'"
              :rules="passwordRules"
              label="Password"
              required
              @click:append="isPasswordVisible = !isPasswordVisible"
              class="mb-3"
            ></v-text-field>

            <v-text-field
              v-model="rePassword"
              ref="rePassword"
              outlined
              :counter="10"
              :type="isPasswordVisible ? 'text' : 'password'"
              :rules="rePasswordRules"
              label="RePassword"
              required
              hide-details
              @click:append="isPasswordVisible = !isPasswordVisible"
            ></v-text-field>

            <v-checkbox
              v-model="agree"
              hide-details
              class="mt-1"
              :rules="[v => !!v || 'You must agree to continue!']"
              required
            >
              <template #label>
                <div class="d-flex align-center flex-wrap">
                  <span class="me-2">I agree to</span><a href="javascript:void(0)">privacy policy &amp; terms</a>
                </div>
              </template>
            </v-checkbox>

            <v-btn
              :disabled="!valid"
              color="primary"
              class="mt-6"
              @click="validate"
            >
              Sign Up
            </v-btn>
            &nbsp;
            <v-btn
              color="error"
              class="mt-6"
              @click="reset"
            >
              Reset
            </v-btn>

          </v-form>
        </v-card-text>

        <!-- create new account  -->
        <v-card-text class="d-flex align-center justify-center flex-wrap mt-2">
          <span class="me-2">
            Already have an account?
          </span>
          <router-link :to="{ name:'Login' }">
            Sign in instead
          </router-link>
        </v-card-text>

        <!-- divider -->
        <v-card-text class="d-flex align-center mt-2">
          <v-divider></v-divider>
          <span class="mx-5">or</span>
          <v-divider></v-divider>
        </v-card-text>

      </v-card>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

const userStore = 'userStore'

export default {
  name: 'Register',
  data() {
    return {
      valid: true,
      isPasswordVisible: false,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],      
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],      
      password: '',
      passwordRules: [
        v => !!v || 'passwordRules is required',
        v => (v && v.length <= 10) || 'Name must be less than 1 characters',
      ],
      rePassword:'',
      rePasswordRules: [
        v => !!v || 'rePasswordRules is required',
        v => (v && v.length <= 10) || 'Name must be less than 1 characters',
      ],
      agree: null,
    };
  },
  computed: {
    ...mapGetters(userStore, [
      'GE_USER'
    ]),    
    ...mapGetters(userStore, [
      'GE_USER_LIST'
    ]),    
  },
  watch: {},
  created() {},
  mounted() {
    this.init()
  },
  methods: {
    ...mapActions(userStore, [
      'AC_USER','AC_USER_PUSH'
    ]),

    init() {
      console.log('this.GE_USER init: ' + JSON.stringify(this.GE_USER,null,2))
      console.log('this.GE_USER_LIST init: ' + JSON.stringify(this.GE_USER_LIST,null,2))    
    },
    validate() {
      if(this.$refs.regrForm.validate()){
        if(!this.checkPassword()){
          alert('패스워드가 일치하지 않습니다. 확인바랍니다.')
          return this.$refs.rePassword.focus() 
        }
        if(!this.checkEmail()){
          alert('존재하는 Email입니다. 이Email은 사용할 수 없습니다.')  
          return this.$refs.email.focus()
        }
        this.pushEmail(this.name, this.email, this.password, this.agree)
        alert('등록되었습니다.')
      }
    },
    reset() {
      this.$refs.regrForm.reset()
    },
    checkPassword() {
      if(this.password === this.rePassword)
        return true
      else 
        return false
    },
    checkEmail() {
      if(this.GE_USER_LIST.length > 0)
        if( (this.GE_USER_LIST.filter(f=>f.email === this.email)).length > 0)
          return false
        else
          return true
      else
        return true
    },
    pushEmail(name, email, password, agree) {
      this.GE_USER.name = name
      this.GE_USER.email = email
      this.GE_USER.password = password
      this.GE_USER.agree = agree

      this.AC_USER(this.GE_USER)
      this.AC_USER_PUSH(this.GE_USER)
      
      console.log('this.GE_USER pushEmail: ' + JSON.stringify(this.GE_USER,null,2))
      console.log('this.GE_USER_LIST pushEmail: ' + JSON.stringify(this.GE_USER_LIST,null,2))

    },
  },

}
</script>
