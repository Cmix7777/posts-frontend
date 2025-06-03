// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config"
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['@/assets/scss/main.scss'],
  app:{
    head:{
      title:'Управляй своими постами - PostVibe',
      meta:[
        { name:'description', content:'Создавай и читай посты на лучшем сайта этого рода - PostVibe, место где создаются мысли и идеи'
        }
      ]
    }
  },
  vite:{
    css:{
      preprocessorOptions:{
        scss:{
          additionalData:` 
          @use "sass:map";
          @use "@/assets/scss/_variables.scss" as *;
          @use "@/assets/scss/_mixins.scss" as *;
          `

        }
      }
    }
  }
})
