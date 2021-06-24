<template lang="pug">
  .page
    .discography(v-if="discographies")
      nuxt-link.album(v-for="(discography, key) in discographies" :to="{name: 'discography-id', params:{id: discography.link}}" :key="key")
        img(:src="discography.image[0].url") 
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { gql } from 'graphql-request'

@Component({})
export default class DiscographyPage extends Vue {
  private discographies?: object

  async asyncData(ctx: any) {
    try {
      const { discographies } = await ctx.$graphcms.request(
        gql`
          {
            discographies(orderBy: date_DESC) {
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

      return { discographies }
    } catch (error) {
      console.error(error)
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  @include page-base;
}

.discography {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  height: fit-content;

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
      object-fit: cover;
      transform: scale(1);
      transition: transform 0.2s ease;
    }

    &:hover {
      img {
        transform: scale(1.1);
      }
    }
  }
}
</style>
