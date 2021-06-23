<template lang="pug">
  .top
    .top__hero
      div
        img(src="~/assets/images/logo.svg" alt="logo")
        p 世界のさまざまな笛と
          br
          | ピアノによるインストポップDUO
      
    main.top__main
      .top__main__news
        h1 ニュース

        .top__main__news__item(v-for="announce in announces")
          p.top__main__news__item__date {{ $moment(announce.date).format(dateFormat) }}
          h3.top__main__news__item__title {{ announce.name }}
          //- Announceがここに来ます
          .top__main__news__item__body.rich-text.small(v-html="announce.body.html")

      .top__main__introduce
        h1 {{ duo.title }}

        .top__main__introduce__contents.duo
          .top__main__introduce__contents__images
            img.top__main__introduce__contents__image(data-src="~/assets/images/photos/duo1.jpg" v-lazy-load)
            img.top__main__introduce__contents__image(data-src="~/assets/images/photos/duo2.jpg" v-lazy-load)
            img.top__main__introduce__contents__image(data-src="~/assets/images/photos/duo3.jpg" v-lazy-load)
            img.top__main__introduce__contents__image(data-src="~/assets/images/photos/duo4.jpg" v-lazy-load)
            img.top__main__introduce__contents__image(data-src="~/assets/images/photos/duo5.jpg" v-lazy-load)
          .top__main__introduce__box
            h2.top__main__introduce__subtitle {{ duo.subtitle }}
            .top__main__introduce__contents__body.rich-text(v-html="duo.body.html")

        .top__main__introduce__contents__introductions
          .top__main__introduce__contents.haru
            h2.top__main__introduce__subtitle {{ haru.title }}          
            .rich-text(v-html="haru.body.html")

          .top__main__introduce__contents.yuri
            h2.top__main__introduce__subtitle {{ yuri.title }}
            .rich-text(v-html="yuri.body.html")

      a(href="mailto:kapi@fuefuki.net").contact-button
        p お問い合わせ
        .send-bg
          img(src="~/assets/images/send.svg")

</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { gql } from 'graphql-request'

@Component({})
export default class IndexPage extends Vue {
  async asyncData(ctx: any) {
    try {
      const { announces, duos, harus, yuris } = await ctx.$graphcms.request(
        gql`
          {
            announces(orderBy: date_DESC) {
              title
              date
              body {
                html
              }
            }

            duos {
              title
              subtitle
              body {
                html
              }
            }

            harus {
              title
              body {
                html
              }
            }

            yuris {
              title
              body {
                html
              }
            }
          }
        `
      )

      return { announces, duo: duos[0], haru: harus[0], yuri: yuris[0] }
    } catch (error) {
      console.error(error)
    }
  }

  get dateFormat() {
    return process.env.DATE_FORMAT
  }
}
</script>

<style lang="scss">
.top {
  &__hero {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(var(--vh, 1vh) * 50 - 30px);
    padding: 30px;
    animation: bg-move 3s linear infinite;
    background-image: url('~assets/images/bg.svg');
    background-repeat: repeat;
    background-size: 60px;
    border: solid $color-black 2px;

    @media screen and (max-width: $width-tablet-small) {
      min-height: calc(var(--vh, 1vh) * 100 - 60px);
    }

    @keyframes bg-move {
      from {
        background-position: 0 0;
      }

      to {
        background-position: 60px 60px;
      }
    }

    img {
      display: block;
      margin: 0 auto 50px auto;
      object-fit: contain;
      max-width: 160px;
      width: 100%;
    }

    p {
      font-weight: $weight-bold;
      font-size: 0.9rem;
      line-height: 30px;
    }
  }

  &__main {
    max-width: $width-pc-small;
    padding: 60px 30px;
    margin: 0 auto;

    @media screen and (max-width: $width-tablet-small) {
      padding: 60px 0;
    }

    h1 {
      position: relative;
      font-size: 1.2rem;
      margin-bottom: 60px;

      &::after {
        content: '';
        position: absolute;
        top: calc(100% + 17px);
        left: 0;
        height: 3px;
        width: 40px;
        background-color: $color-black;
      }
    }

    &__news {
      margin-bottom: 80px;

      &__item {
        border-left: solid 2px $color-black;
        padding: 10px 10px 10px 30px;
        margin-bottom: 30px;

        &:last-of-type {
          margin-bottom: 0;
        }

        &__date {
          margin-bottom: 10px;
          color: $color-lightgray;
        }

        &__title {
          font-weight: 500;
          margin-bottom: 20px;
        }
      }
    }

    &__introduce {
      margin-bottom: 80px;

      &__subtitle {
        margin-bottom: 30px;
      }

      &__box {
        position: relative;
        padding: 100px 0;
        margin: 50px 0;

        & > h2 {
          position: relative;
          z-index: 5;
          font-weight: $weight-medium;
        }

        & > div {
          position: relative;
          z-index: 5;

          p {
            font-weight: $weight-medium;
          }
        }

        * {
          color: $color-text-primary;
        }

        &::before {
          content: '';
          position: absolute;
          z-index: 1;
          background-color: yellow;
          top: 5%;
          left: 50%;
          width: 140vw;
          height: 90%;
          pointer-events: none;
          transform: translateX(-50%) rotateZ(-4deg);
        }
      }

      &__contents {
        display: grid;
        gap: 30px;
        height: fit-content;

        &.duo {
          grid-template-columns: repeat(1, 1fr);
          margin-bottom: 50px;
        }

        &.yuri,
        &.haru {
          display: block;
          padding: 20px 30px;
          background-color: $color-purewhite;
          border-bottom: solid 2px $color-black;
          border-right: solid 2px $color-black;
        }

        &__introductions {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 50px;

          h2 {
            font-weight: $weight-bold;
            font-size: 1.1rem;
          }

          p {
            font-weight: $weight-medium;
            font-size: 0.8rem;
          }

          @media screen and (max-width: $width-tablet-small) {
            grid-template-columns: repeat(1, 1fr);
          }
        }

        &__images {
          display: grid;
          grid-template-rows: 400px 300px;
          grid-template-columns: repeat(6, 1fr);
          gap: 10px;

          @media screen and (max-width: $width-tablet-small) {
            grid-template-columns: repeat(1, 1fr);
            grid-template-rows: repeat(5, 300px);
          }
        }

        &__image {
          object-fit: cover;
          height: 100%;
          width: 100%;

          @media screen and (max-width: $width-tablet-small) {
            grid-row: initial !important;
            grid-column-start: unset !important;
            grid-column-end: unset !important;
          }

          &:nth-child(1) {
            grid-row: 1;
            grid-column-start: 1;
            grid-column-end: 3;
          }

          &:nth-child(2) {
            grid-row: 1;
            grid-column-start: 3;
            grid-column-end: 5;
          }

          &:nth-child(3) {
            grid-row: 1;
            grid-column-start: 5;
            grid-column-end: 7;
          }

          &:nth-child(4) {
            grid-row: 2;
            grid-column-start: 1;
            grid-column-end: 4;
          }

          &:nth-child(5) {
            grid-row: 2;
            grid-column-start: 4;
            grid-column-end: 7;
          }
        }
      }
    }
  }

  .contact-button {
    position: relative;
    display: flex;
    height: 64px;
    max-width: 640px;
    margin: 0 auto;
    filter: drop-shadow(3px 3px 10px $color-tertiary);
    background-color: $color-bg-secondary;
    overflow: hidden;
    transform: scale(1);
    transition: transform 0.2s ease;

    &:hover {
      cursor: pointer;
      transform: scale(1.1);
    }

    p {
      flex-grow: 1;
      line-height: 64px;
      font-size: 1rem;
      font-weight: $weight-medium;
      text-align: center;
      color: $color-text-primary;
    }

    .send-bg {
      position: relative;
      right: 0;
      top: 0;
      width: 0;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        display: inline-block;
        position: relative;
        background-color: $color-dark-bg-primary;
        padding: 20px;
        transform: translateX(-44px);
      }

      &::before {
        position: relative;
        content: '';
        transform: translateX(-44px);
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 0 64px 30px;
        border-color: transparent transparent $color-dark-bg-primary transparent;
      }
    }
  }
}
</style>
