<template>
    <div>
        <video ref="videoPlayering" class="video-js"
                :playsinline="true" /> 
        <!--
        <video ref="videoPlayering" class="video-js"
                    :playsinline="true"
                    @play="onPlayerPlay($event)"
                    @pause="onPlayerPause($event)"
                    @ended="onPlayerEnded($event)"
                    @loadeddata="onPlayerLoadeddata($event)"
                    @waiting="onPlayerWaiting($event)"
                    @playing="onPlayerPlaying($event)"
                    @canplay="onPlayerCanplay($event)"
                    @canplaythrough="onPlayerCanplaythrough($event)"
                    @ready="playerReadied"
                    @statechanged="playerStateChanged($event)">                    
        </video>
        -->
    </div>
</template>

<script>
import videojs from 'video.js'

export default {
    name: "VideoPlayering",
    /*
    props: {
        optioning: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    */
    data() {
        return {
            playering: null
        }
    },
    mounted() {
        /*
        console.log('videoPlayer mounted')        
        this.player = videojs(this.$refs.videoPlayering, this.optioning, function onPlayerReady() {
            console.log('onPlayerReady', this);
        })
        */        
    },
    beforeDestroy() {
        console.log('videoPlayer beforeDestroy')        
        if (this.playering) {
            this.playering.dispose()
        }
    },
    methods: {
     
      /*
      // listen event
      onPlayerPlay(player) {
            console.log('player play!', player)
      },
      onPlayerPause(player) {
            console.log('player pause!', player)
      },
      onPlayerEnded(player) {
            console.log('player ended!', player)
      },
      onPlayerLoadeddata(player) {
            console.log('player Loadeddata!', player)
      },
      onPlayerWaiting(player) {
            console.log('player Waiting!', player)
      },
      onPlayerPlaying(player) {
            console.log('player Playing!', player)
      },
      --/*
      @timeupdate="onPlayerTimeupdate($event)"     
      onPlayerTimeupdate(player) {
            console.log('player Timeupdate!', player.currentTime())
      },
      --/*      
      onPlayerCanplay(player) {
            console.log('player Canplay!', player)
      },
      onPlayerCanplaythrough(player) {
            console.log('player Canplaythrough!', player)
      },
      // or listen state event
      playerStateChanged(playerCurrentState) {
            console.log('player current update state', playerCurrentState)
      },
      // player is ready
      playerReadied(player) {
        // seek to 10s
        console.log('example player 1 readied', player)
        //player.currentTime(10)
        console.log('example 01: the player is readied', player)
      },
      */  
      playingVideo(option){         
        this.playering = videojs(this.$refs.videoPlayering, option, function onPlayerReady() {
            console.log('onPlayerReady', this)
        })        
      },
    },
}
</script>