export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['@/assets/scss/main.scss'],
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:3001'
    }
  },
  app: {
    head: {
      title: 'Управляй своими постами - PostVibe',
      meta: [
        { 
          name: 'description', 
          content: 'Создавай и читай посты на лучшем сайте этого рода - PostVibe, место где создаются мысли и идеи'
        }
      ]
    }
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: ` 
          @use "sass:map";
          @use "@/assets/scss/_variables.scss" as *;
          @use "@/assets/scss/_mixins.scss" as *;
          `
        }
      }
    }
  }
})