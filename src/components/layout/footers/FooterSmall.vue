<template>
  <v-footer
    app
    color="#1E293B"  
    dark
    padless
    min-height="62"
  >
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <div class="d-flex flex-wrap justify-md-start justify-center justify-md-none">
            <template v-for="(s, i) in social">
              <a
                :key="s"
                class="white--text pa-1 pa-md-0"
                href="#"
                v-text="s"
              />

              <v-responsive
                v-if="i < social.length - 1"
                :key="`divider-${s}`"
                class="mx-4 shrink hidden-sm-and-down"
                max-height="24"
              >
                <v-divider vertical />
              </v-responsive>
            </template>
          </div>
        </v-col>

        <v-col
          class="text-center text-md-right"
          cols="12"
          md="6"
        >
          Copyright &copy; {{ new Date().getFullYear() }} MTS, LLC
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
  export default {
    name: 'HomeFooter',

    data: () => ({
      social: [
        'Facebook',
        'Twitter',
        'Instagram',
        'Linkedin',
      ],
    }),
  }
</script>

<!--
<template>
  <v-footer
    app
    color="#1E293B"  
    dark
    padless
  >
    <v-row
      
      no-gutters
    >
      <v-col
        cols="12"
        sm="6"
        md="8"        
      >
          Copyright © {{ date }}
      </v-col>

      <v-col
        cols="6"
        md="4"
      >
        Creative Tim, About Us, Blog, MIT License
      </v-col>

    </v-row>
  </v-footer>
</template>
<script>

export default {
  data() {
    return {
      date: new Date().getFullYear(),
    };
  },
};
</script>
-->
