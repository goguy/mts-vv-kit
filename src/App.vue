<template>
  <v-fade-transition mode="out-in">
    <router-view />
  </v-fade-transition>

  <!--
  <v-app>
    <router-view />
  </v-app>
  -->  
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
