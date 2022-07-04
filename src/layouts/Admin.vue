<template>
  <v-app>
    <admin-navbar />

    <admin-sidebar />

    <admin-view />
  </v-app> 
</template>
<script>
import AdminNavbar from '@/components/layout/navbars/AdminNavbar.vue'
import AdminSidebar from '@/components/layout/sidebars/AdminSidebar.vue'
import AdminView from '@/components/layout/views/AdminView.vue'

  export default {
    components: {
      AdminNavbar,
      AdminSidebar,
      AdminView,
    },
    data() {
      return {
        //
      };
    },
  }
</script>