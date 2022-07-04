<template>
<v-app id="inspire">
    <work-navbar />

    <v-main>
      <router-view />
    </v-main>

  <footer-component />
</v-app>  
</template>
<script>
import WorkNavbar from '@/components/layout/navbars/WorkNavbar.vue'
import FooterComponent from '@/components/layout/footers/Footer.vue'

  export default {
    data() {
      return {
        //
      };
    },
    components: {
      WorkNavbar,
      FooterComponent,
    }
  }
</script>
