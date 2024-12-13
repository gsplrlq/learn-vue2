<!-- eslint-disable vue/no-v-html -->
<template>
  <div>
    <div style="overflow: hidden;" v-html="data.details"></div>
  </div>
</template>
<script>
export default {
  name: 'XXX', // XXX
  props: {
    data: {
      type: Object
    }
  },
  computed: {

  },
  data () {
    return {
      
    }
  },
  methods: {
    
  },
}
</script>
<style scoped>

</style>