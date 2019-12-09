import vue from 'vue'
import VueSocketIO from 'vue-socket.io'

export default function ({store}) {
    vue.use(new VueSocketIO({
        debug: false,
        connection: 'http://localhost:8000',
        vuex: {
            store,
            actionPrefix: 'SOCKET_',
            mutationPrefix: 'SOCKET_'
        }
    }));
}