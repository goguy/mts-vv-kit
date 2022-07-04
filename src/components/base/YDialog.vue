<template>
  <v-container fluid>
      <component 
        :is="param.target" 
        :dialogParam="param.param" 
        @closeDialog="param.closeCallback" />
  </v-container>      
</template>

<script>
export default {
  name: 'y-dialog',
  props: {
    param: {
      type: Object,
      default: () => ({
        // 부모로부터 받을 component
        target: null,
        // 부모로부터 받을 파람
        param: {},
        // 부모로부터 받을 닫기 여부
        closeCallback: null,
      }),
    },
  },
  data() {
    return {}
  },
  //computed: {},
  beforeCreate() {},
  created() {},
  beforeMount() {
    //Object.assign을 이용하여 데이터를 복사하여사용.
    Object.assign(this.$data, this.$options.data())
    this.init()
  },
  mounted() {},
  beforeDestory() {},
  methods: {
    init() {},
  },
};

</script>
