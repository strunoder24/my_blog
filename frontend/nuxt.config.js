module.exports = {
    /*
      ** Headers of the page
      */
    head: {
        title: 'Web Developer Blog',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: 'My blog fully created by me'}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
            {rel: 'stylesheet', href: '//fonts.googleapis.com/css?family=Roboto:100,200,300,400,500,700,400italic|Material+Icons' }
        ]
    },
    
    // Глобальные стили
    css: [
        { src: 'vue-material/dist/vue-material.min.css', lang: 'css' },
        { src: '~/assets/vue-material/theme.scss', lang: 'scss'} // include vue-material theme engine
    ],
    
    // Скрипты исполняемые перед началом работы SPA
    plugins: [
        '~/plugins/global-components',
        '~/plugins/vue-material',
    ],
    
    axios: {
        baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:8000/api/v1/' : '/api/v1/',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: true,
    },
    
    //Подключаемые библиотеке в виде модуля, с доступом через $
    modules: [
        '@nuxtjs/axios',
        'cookie-universal-nuxt',
    ],
    
    /*
    ** Customize the progress bar color
    */
    loading: {color: '#3B8070'},
    /*
    ** Build configuration
    */
    build: {
        /*
        ** Run ESLint on save
        */
        extend(config, {isDev, isClient}) {
            if (isDev && isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }
        }
    },
    
    env: {
        baseUrl: '',
    },
}

