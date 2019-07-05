<template>
    <div class="main-container">
        <h1 v-if="error.statusCode === 404"
            >Такой страницы не существует
        </h1>
        <h1 v-else-if="error.statusCode === 401"
            >У вас нет доступа к данному разделу
        </h1>
        <h1 v-else>Произошла ошибка в приложении</h1>
    </div>
</template>

<script>
    export default {
        props: ['error']
    }
</script>

<style lang="sass" scoped>

</style>