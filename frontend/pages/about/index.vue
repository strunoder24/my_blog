<template>
    <div class="main-container">
        <md-card class='content'>
            <div class='head'>
                <img class='photo' src='../../assets/images/about-photo.jpg' alt='photo'>
                <div class='title'>
                    <h2>Кондик Виктор</h2>
                    <h2>Middle Frontend developer</h2>
                </div>
            </div>

            <div class='body'>
                Здраствуйте! Меня зовут Виктор, я frontend разработчик проживающий в городе Лучегорск, на Дальнем Востоке.
                <br>
                <br>
                В 2016 году я закончил унивеситет ТОГУ по специальности ИННОВАТИКА. Во время учёбы я заинтересовался
                разработкой. В последствие, смог себе позволить зарабатывать этим себе на жизнь.
                Тематика блога соответствует технической части моих интересов.
                <br>
                <br>
                В 2017 году я начал работать на компанию <a href='http://perfectura.ru' target='_blank'>Perfectura</a>
                где и получил свой основной опыт на данный момент. Я проработал там около двух лет и в данный момент
                ищу работы на удалёнке.
                <br>
                <br>
                Подробнее о моих навыках можно узнать на
                <router-link :to='{name: "services"}'>этой</router-link>
                странице, а найти мои контактные данные на
                <router-link :to='{name: "contacts"}'>этой</router-link>.
                Некоторой частью этого опыта я стараюсь делиться в блоге, но чем больше опыта — тем меньше времени,
                чтобы о нём рассказать. Отдельно можно посмотреть на мои комерческие
                <router-link :to='{name: "projects"}'>проекты</router-link>.
            </div>

        </md-card>
    </div>
</template>

<script>
    export default {}
</script>

<style lang="scss" scoped>
    @import "~a/styles/media_mixins.sass";

    .content {
        padding: 20px;

        h1 {
            margin-top: 0;
        }

        @include media(xs-s) {
            padding: 10px;
        }

        @media(min-width: 1316px) {
            min-width: 1200px;
        }
    }


    .head {
        display: flex;
    }

    .title {
        margin-left: 20px;

        h2 {
            margin-top: 0;
            margin-bottom: 10px;

            @include media(xs-s) {
                margin-bottom: 5px;
            }
        }

        @include media(xs-s) {
            font-size: 10px;
            margin-left: 5px;
        }
    }

    .photo {
        width: 200px;
        border-radius: 50%;

        @include media(xs-s) {
            width: 100px;
        }
    }

    .body {
        h2 {
            margin-bottom: 10px;
        }
    }
</style>