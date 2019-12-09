<template>
    <Button @click='sendMessage'>
        send message
    </Button>
</template>

<script>
    export default {
        data: () => ({
            message: 'u r gae'
        }),
        mounted() {

        },
        computed: {},
        methods: {
            sendMessage(){
                this.$socket.emit('sendMessage', {message: this.message})
            }
        },

        sockets: {
            connect: () => {
                console.log('client connected');
            }
        },

        components: {}
    }
</script>