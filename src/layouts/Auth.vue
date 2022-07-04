<template>
<v-app id="inspire">
  <auth-navbar />

    <v-main class="relative bg-blueGray-800"
      :style="`background-image: url('${registerBg2}');`">

      <v-container>
        <v-row>
          <v-col>
            <router-view />                       
          </v-col>
        </v-row>
      </v-container>
    </v-main>

  <footer-small />
</v-app>  
</template>
<script>
import AuthNavbar from '@/components/layout/navbars/AuthNavbar.vue'
import FooterSmall from '@/components/layout/footers/FooterSmall.vue'

import registerBg2 from "@/assets/img/register_bg_2.png";

export default {
  data() {
    return {
      registerBg2,
    };
  },
  components: {
    AuthNavbar,
    FooterSmall,
  },
};
</script>


<!--
<template>
  <div>
    <navbar />
    <main>
      <section class="relative w-full h-full py-40 min-h-screen">
        <div
          class="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
          :style="`background-image: url('${registerBg2}');`"
        ></div>
        <router-view />
        <footer-small absolute />
      </section>
    </main>
  </div>
</template>
<script>
import Navbar from "@/components/layout/navbars/AuthNavbar.vue";
import FooterSmall from "@/components/layout/footers/FooterSmall.vue";

import registerBg2 from "@/assets/img/register_bg_2.png";

export default {
  data() {
    return {
      registerBg2,
    };
  },
  components: {
    Navbar,
    FooterSmall,
  },
};
</script>
-->