<template lang="pug">
  .header
    .inner 
      nuxt-link(to="/"): img(src='~/assets/images/fuepara.svg')

      ul
        li: nuxt-link(to="/discography") ディスコグラフィー
        li: nuxt-link(to="/schedule") スケジュール
        li: nuxt-link(to="/story") ストーリー
      
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({})
export default class FueparaHeader extends Vue {}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  width: 100%;
  height: 80px;
  top: 0;
  left: 0;
  background-color: $color-bg-primary;
  z-index: 10;
  border-bottom: solid 2px $color-tertiary;

  .inner {
    max-width: $width-pc-small;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media screen and (max-width: $width-pc-small) {
      padding: 0 20px;
    }

    img {
      object-fit: contain;
      height: 60px;
      padding: 15px 0;
    }

    ul {
      display: flex;
      list-style: none;
      justify-content: flex-end;
      margin: 0;

      li {
        line-height: 80px;

        a {
          font-size: 0.8rem;
          font-weight: $weight-bold;
          color: $color-text-primary;
        }

        // TODO: make hamburger
        @media screen and (max-width: $width-tablet-large) {
          &:nth-child(3) {
            display: none;
          }
        }

        &:not(:last-child) {
          margin-right: 15px;
        }

        &::before {
          content: '';
        }
      }
    }
  }
}
</style>
