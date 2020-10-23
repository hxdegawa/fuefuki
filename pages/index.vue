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
          .top__main__news__item__body.rich-text.small(v-html="announce.body.html")

      .top__main__introduce
        h1 {{ duo.title }}

        .top__main__introduce__contents
          .top__main__introduce__contents__images
            img.top__main__introduce__contents__image(src="~/assets/images/photos/duo.jpg")
            img.top__main__introduce__contents__image(src="~/assets/images/photos/duo.jpg")
            img.top__main__introduce__contents__image(src="~/assets/images/photos/duo.jpg")
            img.top__main__introduce__contents__image(src="~/assets/images/photos/duo.jpg")
            img.top__main__introduce__contents__image(src="~/assets/images/photos/duo.jpg")
          div
            h2.top__main__introduce__subtitle {{ duo.subtitle }}
            .top__main__introduce__contents__body.rich-text(v-html="duo.body.html")

        
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { gql } from 'graphql-request'

@Component({})
export default class IndexPage extends Vue {
  async asyncData(ctx: any) {
    try {
      const { announces, duos } = await ctx.$graphcms.request(
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
          }
        `
      )

      return { announces, duo: duos[0] }
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
      font-weight: medium;
      line-height: 30px;
      font-size: 0.8rem;
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
      font-size: 1em;
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

    h2 {
      font-size: 0.8em;
    }

    p {
      font-size: 0.8em;
      font-weight: normal;
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
          font-size: 0.7em;
          color: $color-lightgray;
        }

        &__title {
          font-size: 0.9em;
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

      &__contents {
        display: grid;
        gap: 30px;
        grid-template-columns: repeat(1, 1fr);

        &__images {
          display: grid;
          grid-template-rows: repeat(2, 100px);
          grid-template-columns: repeat(6, 1fr);
        }

        &__image {
          object-fit: contain;
          width: 100%;

          &:nth-child(1),
          &:nth-child(2),
          &:nth-child(3) {
            grid-column: 2fr;
          }

          &:nth-child(4),
          &:nth-child(5) {
            grid-column: 3fr;
          }
        }
      }
    }
  }
}
</style>
