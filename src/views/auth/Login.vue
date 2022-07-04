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
            Welcome to MTS! 👋🏻
          </p>
          <p class="mb-2">
            Please sign-in to your account and start the adventure
          </p>
        </v-card-text>

        <!-- login form -->
        <v-card-text>
          <v-form
            ref="lognForm"
            v-model="valid"
            lazy-validation          
          >
            <v-text-field
              v-model="email"
              ref="email"
              :rules="emailRules"
              label="E-mail"
              outlined
              hide-details
              class="mb-3"
            ></v-text-field>

            <v-text-field
              v-model="password"
              ref="password"
              :rules="passwordRules"             
              outlined
              :counter="10"
              :type="isPasswordVisible ? 'text' : 'password'"
              label="Password"
              hide-details
              @click:append="isPasswordVisible = !isPasswordVisible"
            ></v-text-field>

            <div class="d-flex align-center justify-space-between flex-wrap">
              <v-checkbox
                label="Remember Me"
                hide-details
                class="me-3 mt-1"
              >
              </v-checkbox>

              <!-- forgot link -->
              <a
                href="javascript:void(0)"
                class="mt-1"
              >
                Forgot Password?
              </a>
            </div>

            <v-btn
              :disabled="!valid"
              color="primary"
              class="mt-6"
              @click="validate"
            >
              Login
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
            New on our platform?
          </span>
          <router-link :to="{name:'Register'}">
            Create an account
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
    <v-snackbar
      v-model="snackbar.isSnackbar"
      :vertical="snackbar.vertical"
    >
      {{ snackbar.message }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="red"
          text
          v-bind="attrs"
          @click="snackbar.isSnackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

  </div>  
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mapGetters, mapActions } from 'vuex'

const userStore = 'userStore'
const tokenStore = 'tokenStore'

export default {
  name: 'Login',
  data() {
    return {
      valid: true,
      isPasswordVisible: false,
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

      snackbar: {
        isSnackbar: false,
        vertical: true,
        message: '',
      },
    };
  },
  computed: {
    ...mapGetters(userStore, [
      'GE_USER'
    ]),    
    ...mapGetters(userStore, [
      'GE_USER_LIST'
    ]),    
    ...mapGetters(tokenStore, [
      'GE_TOKEN'
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

    ...mapActions(tokenStore, [
      'AC_TOKEN'
    ]),

    init() {
      console.log('this.GE_USER init: ' + JSON.stringify(this.GE_USER,null,2))
      console.log('this.GE_USER_LIST init: ' + JSON.stringify(this.GE_USER_LIST,null,2))    
      console.log('this.$token.getAccessToken init: ' + this.$token.getAccessToken())
      console.log('this.$token.getRefreshToken init: ' + this.$token.getRefreshToken())    
    },
    validate() {
      if(this.$refs.lognForm.validate()){
        if(!this.checkEmail()){
          alert('존재하지 않는 Email입니다. 확인바랍니다.')  
          return this.$refs.email.focus()
        }
        if(!this.checkPassword()){
          alert('패스워드가 일치하지 않습니다. 확인바랍니다.')
          return this.$refs.password.focus() 
        }
        //session 등록
        this.setToken(this.email, this.password)
        //this.setSnackbar('로그인되었습니다.')
        alert('로그인되었습니다.')
        //현재페이지 재호출
        //this.$router.go(this.$router.currentRoute)
        this.$router.push('/admin')
      }
    },
    reset() {
      this.$refs.lognForm.reset()
    },
    checkEmail() {
      if(this.GE_USER_LIST.length > 0)
        if( (this.GE_USER_LIST.filter(f=>f.email === this.email)).length > 0)
          return true
        else
          return false
      else
        return false
    },
    checkPassword() {
      if(this.GE_USER_LIST.length > 0)
        if( (this.GE_USER_LIST.filter(f=>(f.email === this.email && f.password === this.password))).length > 0)
          return true
        else
          return false
      else
        return false
    },
    setToken(email, password) {
      console.log('setToken')
      //token값을 cookie에 저장
      let accessToken=email+'$'+password
      let refreshToken=email+'#'+password
      this.$token.setAccessToken(accessToken)
      this.$token.setRefreshToken(refreshToken)
            
      this.pushToken(email, accessToken, refreshToken)

    },
    pushToken(email, accessToken, refreshToken) {
      this.GE_TOKEN.email=email
      this.GE_TOKEN.accessToken=accessToken
      this.GE_TOKEN.refreshToken=refreshToken

      this.AC_TOKEN(this.GE_TOKEN)
      console.log('this.GE_TOKEN pushToken: ' + JSON.stringify(this.GE_TOKEN,null,2))

    },

    setSnackbar(msg) {
        this.snackbar.isSnackbar=true
        this.snackbar.message=msg
        this.snackbar.vertical=true
    },


  },

}
</script>


