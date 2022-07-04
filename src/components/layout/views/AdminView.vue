<template>
  <v-main>
    <router-view />

    <footer-admin />
  </v-main>
  
</template>

<script>
import FooterAdmin from '@/components/layout/footers/FooterAdmin.vue'

export default {
    components: {
      FooterAdmin,
    },
    name: 'AdminView',
    data() {
      return {
        //
      };
    },    
}
</script>

