<template>
  <div class="details-list" />
</template>

<script>
// eslint-disable-next-line
let that
export default {
  name: 'Apidetails',
  data() {
    return {
      id: 0
    }
  },
  mounted() {
    that = this
    that.id = that.$route.params.id
    console.log(that.id)
  }
}
</script>
<style lang="scss" scoped>
.details-list{
    padding: 20px;
}
</style>
