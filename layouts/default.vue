<template lang="pug">
  .container
    fuepara-header
    nuxt
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import FueparaHeader from '~/components/Header.vue'

@Component({
  components: {
    FueparaHeader,
  },
})
export default class DefaultLayout extends Vue {
  mounted() {
    let vh: number = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
    window.addEventListener('resize', () => {
      vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    })
  }
}
</script>

<style lang="scss">
.container {
  min-height: calc(var(--vh, 1vh) * 100);
  padding: 80px 0 0;
  overflow-x: hidden;

  @media screen and (max-width: $width-tablet-small) {
    padding: 130px 30px 30px 30px;
  }
}
</style>
