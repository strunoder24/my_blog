<template>
    <button @click="$emit('click')">
        <slot></slot>
    </button>
</template>

<script>
    export default {}
</script>

<style lang="sass" scoped>
    button
        width: 100px
        height: 26px
        font-size: 14px

        &:hover
            transition: background-color linear .2s
            background-color: gray
</style>