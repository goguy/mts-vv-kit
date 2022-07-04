<template>
  <v-app id="inspire">
    <index-navbar />
    <!--
    <video autoplay muted loop id="myVideo">
      <source :src="require('@/assets/video/o2.mp4')" type="video/mp4">
    </video>
    -->
    <v-main>
      <section id="home" class="content">
        <!--
        <v-container class="fill-height">
          <v-row no-gutters>
            <v-col cols="12">
              <p class="text-center white--text text-h3 font-weight-medium">Maintenance Training Simulation</p>
            </v-col>
            <v-col cols="12" >
              <p class="text-center white--text text-h6">안전한 유지보수 작업을 위한 시뮬레이션 교육</p>
            </v-col>
          </v-row>
        </v-container>
        -->  
        <v-img
          :max-height="maxHeight"
          :src="require('@/assets/img/normal_work_gas_measure.png')"
          class="white--text"
          gradient="to bottom, rgba(11, 28, 61, .9), rgba(0,0,0,.2)"
        >
          <v-container class="fill-height">
            <v-row no-gutters>
              <v-col cols="12">
                <p class="text-center white--text text-h3 font-weight-medium">Maintenance Training Simulation</p>
              </v-col>
              <v-col cols="12" >
                <p class="text-center white--text text-h6">안전한 유지보수 작업을 위한 시뮬레이션 교육2</p>
              </v-col>
            </v-row>
          </v-container>          
        </v-img>
      </section>

      <section id="about">

        <v-container class="fill-height mt-10">
          <v-row>
            <v-col cols="12">
              <p
                class="text-center text-h5">
                ABOUT</p>
            </v-col>
            <v-col 
              cols="12" 
              lg="6"
              >
              <v-card>
                <v-list-item three-line>

                  <v-list-item-avatar
                    color="blue"
                    size="170"
                  >
                    <v-img 
                    :src="require('@/assets/img/tank.png')"/>

                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title class="text-h5 mb-1">
                      위험물 탱크 Cleaning 작업
                    </v-list-item-title>
                    <v-list-item-subtitle class="text-subtitle-1">세척/이물질제거, 소독 및 녹제거, 잔수(소독수, 녹물)제거, 세정, 잔수제거 및 건조등을 작업합니다.</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-col>
   
            <v-col 
              cols="12" 
              lg="6"
              >
              <v-card>
                <v-list-item three-line>

                  <v-list-item-avatar
                    color="red"
                    size="170"
                  >
                    <v-img 
                    :src="require('@/assets/img/tank.png')"/>

                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title class="text-h5 mb-1">
                      탱크 샌딩 및 도장 작업
                    </v-list-item-title>
                    <v-list-item-subtitle class="text-subtitle-1">세척/이물질제거, 소독 및 녹제거, 잔수(소독수, 녹물)제거, 세정, 잔수제거 및 건조등을 작업합니다.</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-col>
   
              <!--
              <v-timeline>
                  <v-timeline-item>
                    <template v-slot:icon>
                      <v-avatar
                        color="blue"
                        size="170"
                      >
                        <img 
                        :src="require('@/assets/img/tank.png')">
                      </v-avatar>
                    </template>
                    <template v-slot:opposite>
                      <span class="ma-15">Maintenance Training Simulation</span>
                    </template>
                    <v-card class="elevation-1 ma-15" >
                      <v-card-title class="title">
                        위험물 탱크 Cleaning 작업
                      </v-card-title>
                      <v-card-text class="body-1">
                        세척/이물질제거, 소독 및 녹제거, 잔수(소독수, 녹물)제거, 세정, 잔수제거 및 건조등을 작업합니다.
                      </v-card-text>
                    </v-card>
                  </v-timeline-item>

                  <v-timeline-item                    
                  >
                    <template v-slot:icon>
                      <v-avatar
                        color="red"
                        size="170"
                      >
                        <img 
                        :src="require('@/assets/img/tank.png')">
                      </v-avatar>
                    </template>
                    <template v-slot:opposite>
                      <span class="ma-15">Maintenance Training Simulation</span>
                    </template>
                    <v-card class="elevation-1 ma-15">
                      <v-card-title class="title">
                        탱크 샌딩 및 도장 작업
                      </v-card-title>
                      <v-card-text class="body-1">
                        샌딩, 균열검사 및 용접, 도장, 건조 및 도막검사등을 작업합니다.
                      </v-card-text>
                    </v-card>
                  </v-timeline-item>
              </v-timeline>
              -->
          </v-row>

        </v-container>
       
      </section>

    </v-main>
    
    <footer-component />
  </v-app>
</template>

<script>
import IndexNavbar from '@/components/layout/navbars/IndexNavbar.vue'
import FooterComponent from '@/components/layout/footers/Footer.vue'


  export default {
    data() {
      return {
      };
    },
    components: {
      IndexNavbar,
      FooterComponent
    },
    computed: {
      maxHeight () {
        const height = this.$vuetify.breakpoint.mdAndUp ? '50vh' : '80vh'
        return `calc(${height} - ${this.$vuetify.application.top}px)`
      },
    },
    methods: {
      choiceWork() {
        //this.$router.replace('/work/choiceWork');
        this.$router.push('/work/choiceWork');
      },
    }
  }
</script>
<style scoped>
/* Style the video: 100% width and height to cover the entire window */
#myVideo {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
}

/* Add some content at the bottom of the video/page */
/*
.content {
  position: fixed;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  color: #f1f1f1;
  width: 100%;
}
*/
</style>