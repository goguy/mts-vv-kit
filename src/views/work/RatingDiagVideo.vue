<template>
  <v-container
    id="RatingDiagVideo"
    fluid
    tag="section"
  >
      <v-card>
        <v-card-title>
          {{dialogParam.name}}          
        </v-card-title>          
        <v-card-text>
            <video-player
                :options="videoOptions"
                @playerState="onPlayerState"/>
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
    name: 'RatingDiagVideo',
    props: {
        dialogParam: Object,
    },
    data: () => ({
        playEnd: false,
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

        onPlayerState(event){
            switch(event.type){
                case 'play':
                    console.log('player : ' + event.type)
                    break;    
                case 'pause':
                    console.log('player : ' + event.type)
                    break;    
                case 'ended':
                    console.log('player : ' + event.type)
                    this.playEnd = true                    
                    console.log('this.playEnd : ' + this.playEnd)
                    break;    
                case 'loadeddata':
                    console.log('player : ' + event.type)
                    break;    
                case 'waiting':
                    console.log('player : ' + event.type)
                    break;    
                case 'playing':
                    console.log('player : ' + event.type)
                    break;
                case 'canplay':
                    console.log('player : ' + event.type)
                    break;    
                case 'canplaythrough':
                    console.log('player : ' + event.type)
                    break;    
                default:
                    console.log('default')
            }
            
        },
        close() {
            //this.$emit('update:closeDialogVideo', false)
            this.$emit('closeDialog', false, this.playEnd)
        },    
    },    
}
</script>
