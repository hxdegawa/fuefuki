<template lang="pug">
  .page
    .discography
      carousel.carousel(v-bind="carouselSettings")
        slide.slide(v-for="(image, key) in discography.image" :key="key")
          img(:src="image.url")
      
      .detail.rich-text(v-html="discography.description.html")
    
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { gql } from 'graphql-request'

import Carousel from 'vue-carousel/src/Carousel.vue'
import Slide from 'vue-carousel/src/Slide.vue'
import CarouselSettings from '~/lib/constants'

@Component({
  components: {
    Carousel,
    Slide,
  },
})
export default class DiscographyPage extends Vue {
  async asyncData(ctx: any) {
    try {
      const { discographies } = await ctx.$graphcms.request(
        gql`
          {
            discographies(where: { link: "${ctx.params.id}" }) {
              title
              link
              image {
                url
              }
              description {
                html
              }
            }
          }
        `
      )

      return { discography: discographies[0], params: ctx.params }
    } catch (error) {
      console.error(error)
    }
  }

  get carouselSettings() {
    return CarouselSettings
  }
}
</script>

<style lang="scss" scoped>
.page {
  @include page-base;
}

.discography {
  background-color: $color-bg-secondary;

  .album {
    position: relative;
    padding-top: 100%;
    width: 100%;
    overflow: hidden;

    img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .carousel {
    padding: 80px 40px;

    .slide {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow-x: hidden;

      img {
        object-fit: contain;
        width: 100%;
        max-height: 500px;
      }
    }
  }

  .detail {
    padding: 20px 40px;
  }
}
</style>
