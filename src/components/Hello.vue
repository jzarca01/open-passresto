<template>
  <div class="hello">
    <h1>Bonjour {{ userName }}</h1>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Hello extends Vue {
    @Prop()
    userName
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-weight: normal;
}

</style>
