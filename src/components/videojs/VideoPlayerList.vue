<template>
    <video ref="videoPlayerList" class="video-js"
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
</template>

<script>
import videojs from 'video.js'
import playlistMaker from "videojs-playlist/src/playlist-maker"

const plugin = function(list, item) {
  playlistMaker(this, list, item);
};

videojs.registerPlugin('playlist', plugin);


export default {
    name: "VideoPlayerList",
    props: {
        options: {
            type: Object,
            default() {
                return {};
            }
        },
        playerList: {
            type: Array,
            default() {
                return {};
            }
        }
    },
    data() {
        return {
            player: null
        }
    },
    mounted() {
        this.player = videojs(this.$refs.videoPlayerList, this.options, function onPlayerReady() {
            console.log('onPlayerReady', this);
        })
        // Play through the playlist automatically.    
            // --> this.onPlayerList(this.player)
        //parents
        this.$emit('player', this.player)
    },
    beforeDestroy() {
        if (this.player) {
            this.player.dispose()
        }
    },
    methods: {
      onPlayerList(player){
		    player.playlist(this.playerList);
        player.playlist.autoadvance(0);
        player.playlist.repeat(false);
        player.muted(false);    //auto Play true
      },  
      // listen event
      onPlayerPlay(player) {
        this.$emit('playerState', player)
        //console.log('player play!', player)
      },
      onPlayerPause(player) {
        this.$emit('playerState', player)
        //console.log('player pause!', player)
      },
      onPlayerEnded(player) {
        this.$emit('playerState', player)
        //console.log('player ended!', player)
      },
      onPlayerLoadeddata(player) {
        this.$emit('playerState', player)
        //console.log('player Loadeddata!', player)
      },
      onPlayerWaiting(player) {
        this.$emit('playerState', player)
        //console.log('player Waiting!', player)
      },
      onPlayerPlaying(player) {
        this.$emit('playerState', player)
        //console.log('player Playing!', player)
      },
      
      /*
      //@timeupdate="onPlayerTimeupdate($event)"           
      onPlayerTimeupdate() {
        this.$emit('playerState', this.player)
        //console.log('player Timeupdate!')
      },
      */      
      onPlayerCanplay(player) {
        this.$emit('playerState', player)
        //console.log('player Canplay!', player)
      },
      onPlayerCanplaythrough(player) {
        this.$emit('playerState', player)
        //console.log('player Canplaythrough!', player)
      },
      // or listen state event
      playerStateChanged(playerCurrentState) {
        this.$emit('playerState', playerCurrentState)
        //playerCurrentState
        console.log('player current update state', playerCurrentState)
      },
      // player is ready
      playerReadied(player) {
        this.$emit('playerState', player)
        // seek to 10s
        console.log('example player 1 readied', player)
        //player.currentTime(10)
        //console.log('example 01: the player is readied', player)
      },      
      
    },
}

</script>
