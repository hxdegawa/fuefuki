import { config } from 'dotenv'

config()

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'fuefuki',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&display=swap',
      },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['~/plugins/graphcms.ts'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    '@nuxtjs/style-resources',
    '@nuxtjs/moment',
  ],

  styleResources: {
    scss: [
      '~/assets/scss/_palette.scss',
      '~/assets/scss/_browser.scss',
      '~/assets/scss/_variable.scss',
      '~/assets/scss/_global.scss',
      '~/assets/scss/_rich-text.scss',
      '~/assets/scss/_mixin.scss',
      '~/assets/scss/_transition.scss',
    ],
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'nuxt-lazy-load',
    // https://go.nuxtjs.dev/pwa
    // '@nuxtjs/pwa',
  ],

  env: {
    BIRTHDAY: process.env.BIRTHDAY,
    DATE_FORMAT: process.env.DATE_FORMAT,
    GA_TOKEN: process.env.GA_TOKEN,
    CMS_URL: process.env.CMS_URL,
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
