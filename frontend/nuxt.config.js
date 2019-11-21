let path = require('path');

module.exports = {
    /*
      ** Headers of the page
      */
    head: {
        title: 'Web Developer Blog',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1' },
            {hid: 'description', name: 'description', content: 'Блог fullstack web разработчика' }
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            {rel: 'stylesheet', href: '//fonts.googleapis.com/css?family=Roboto:100,200,300,400,500,700,400italic|Material+Icons' },
            {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Lora:400,400i,700&display=swap&subset=cyrillic-ext'},
            {rel: "stylesheet", href: 'https://fonts.googleapis.com/css?family=Ubuntu+Mono&display=swap&subset=cyrillic-ext' }
        ]
    },
    
    // Глобальные стили
    css: [
        { src: 'vue-material/dist/vue-material.min.css', lang: 'css' },
        { src: '~/assets/vue-material/theme.scss', lang: 'scss'}, // include vue-material theme engine
        { src: '~/assets/styles/main.sass', lang: 'sass'},
    ],
    
    postcss: [
        require('autoprefixer')({
            browsers: ['> 5%']
        })
    ],
    
    // middleware запускаемый только на серваке
    serverMiddleware: [
        '~/middleware/server.js'
    ],
    
    // Скрипты исполняемые перед началом работы SPA
    plugins: [
        '~/plugins/global-components',
        '~/plugins/vue-material',
        '~/plugins/axios',
        '~/plugins/directives',
        '~/plugins/bus',
    ],
    
    axios: {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: true,
        proxy: true
    },
    
    proxy: {
        '/api/': {
            target: 'http://localhost:8000/api/v1/',
            pathRewrite: { "^/api/": "" }
        },
    
        '/images/': {
            target: 'http://localhost:8000/',
            pathRewrite: { "^/images/": "" }
        },
        
        '/auth/': {
            target: 'http://localhost:8000/',
            pathRewrite: { "^/auth/": "" }
        }
    },
    
    //Подключаемые библиотеке в виде модуля, с доступом через $
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/proxy',
        'cookie-universal-nuxt',
        '@nuxtjs/markdownit',
    ],
    
    markdownit: {
        injected: true
    },
    
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
            config.resolve.alias['~'] = path.resolve(__dirname);
            config.resolve.alias['~a'] = path.resolve(__dirname, 'assets');
            config.resolve.alias['~c'] = path.resolve(__dirname, 'components');
            config.resolve.alias['~s'] = path.resolve(__dirname, 'store');
            config.resolve.alias['~h'] = path.resolve(__dirname, 'helpers');
        }
    },
    
    env: {
        baseUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:8000/api/v1' : 'http://localhost:8000/api/v1',
        uploadUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:8000/uploads/' : 'http://localhost:8000/uploads/',
    },
};

