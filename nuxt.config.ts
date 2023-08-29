// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  // devtools: { enabled: true },
  ssr:false,
  app: {
    head: {
      script: [
        // { 
        //   src: './assets/js/gsap.js' 
        // },
        // { 
        //   src: './assets/js/scrollTrigger.js' 
        // }
      ],
    },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-swiper',
    '@nuxtjs/google-fonts'
  ],

  googleFonts: {
    families:{
      'Bricolage+Grotesque':{
        wght: [800]
      }
    }
  }

})
