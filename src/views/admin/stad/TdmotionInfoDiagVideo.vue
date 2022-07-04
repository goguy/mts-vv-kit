<template>
  <v-container
    id="TdmotionInfoDiagVideo"
    fluid
    tag="section"
  >
      <v-card>
        <v-card-title>
          Viedo          
        </v-card-title>          
        <v-card-text>
            <video-player
                :options="videoOptions"/>
        </v-card-text>          
        <v-card-actions>
        <v-spacer></v-spacer>
            <v-btn 
                color="green darken-1" 
                @click.native="close"
                >Close
            </v-btn>
        </v-card-actions>
      </v-card>
  </v-container>
</template>

<script>
import VideoPlayer from '@/components/videojs/VideoPlayer.vue'
import 'video.js/dist/video-js.css'

export default {
    components: {
      VideoPlayer,
    },
    name: 'TdmotionInfoDiagVideo',
    props: {
        dialogParam: Object,
    },
    data: () => ({
    }),
    computed: {
        videoOptions() {
            return this.setVideoOptions()
        },
    },
    create() {
        //this.setVideoOptions()
    },
    mounted() {
        console.log('AboutPopup mounted')
        console.log('dialogParam : ' + JSON.stringify(this.dialogParam,null,2))
        //this.setVideoOptions()
    },
    methods: {
        setVideoOptions(){
            let objOptions={
                controls: true,
                fluid: true,// 화면의 따라
                sources: [{
                    type: this.dialogParam.video_type,
                    src: this.dialogParam.video_url
                }],
            }
            return objOptions
        },
        close() {
            //this.$emit('update:diaglog', false)
            this.$emit('closeDialog', false)
        },    
    },    
}
</script>

