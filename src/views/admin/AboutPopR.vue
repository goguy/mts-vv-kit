<template>
  <v-layout row justify-center>
      <v-card>
        <v-card-title class="headline">Use Google's location service?</v-card-title>
        <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
        <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn 
            color="green darken-1" 
            @click.native="close"
            >Close
            </v-btn>
        </v-card-actions>
      </v-card>
  </v-layout>
</template>

<script>
export default {
    name: 'AboutPopup',
    props: {
        dialogParam: Object,
    },
    data() {
      return {          
      };
    },
    mounted() {
        console.log('AboutPopup mounted')
        console.log('dialogParam : ' + JSON.stringify(this.dialogParam,null,2))
    },
    beforeDestroy() {
        console.log('AboutPopup beforeDestroy')
    },  
    methods: {
        close() {
        //this.$emit('update:diaglog', false)
        this.$emit('closeDialog', false)
      }

    }
}
</script>

<style>

</style>