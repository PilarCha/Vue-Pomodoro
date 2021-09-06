<template>
  <v-row>
    <PickTime/>
      
  </v-row>

</template>

<script>
import PickTime from '@/components/settingsBar/pick-time.vue';
export default {
  name:'MainBar',
  components: {
    PickTime
  }
}
</script>

<style lang="css" scoped>
</style>
