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
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ]
    },
    
    // Глобальные стили
    css: [
        {src: '~/assets/styles/global_styles.sass', lang: 'sass'}
    ],
    
    // Скрипты исполняемые перед началом работы SPA
    plugins: [
        '~/plugins/global-components.js'
    ],
    
    //Подключаемые библиотеке в виде модуля, с доступом через $
    modules: [
        '@nuxtjs/axios'
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
    }
}
