<template>
    <div class="default-layout-wrapper">
        <no-ssr>
            <A-Header></A-Header>
        </no-ssr>
        <nuxt/>
    </div>
</template>

<script>
    export default {}
</script>

<style lang="sass">
    .default-layout-wrapper
        display: flex
        flex-direction: column
        width: 100%
        height: 100%
        padding-top: 80px
</style>

