<template>
    <div class="markdown-wrapper md-elevation-2">
        <div
                    class="markdown-content"
                    v-if="!preview"

            ><textarea v-model="content" @input="$emit('input', content)"></textarea>
        </div>
        <div
                    class="markdown-ready-field markdown-parsed"
                    v-if="preview"
                    v-html="$md.render(content)"
        ></div>
        <md-divider style="margin-top: auto;"></md-divider>
        <div class="markdown-footer">
            <Button
                    @click="$emit('saved')"
                    type="add"
                >Сохранить
            </Button>
            <Button
                    type="primary"
                    v-if="preview"
                    @click="preview = false"
                >Редактировать
            </Button>
            <Button
                    type="primary"
                    v-if="!preview"
                    @click="preview = true"
                >Предпросмотр
            </Button>
        </div>
    </div>
</template>

<script>
    export default {
        data: () => ({
            content: '',
            preview: false,
        }),

        created() {
            if (this.$attrs.value) {
                this.content = this.$attrs.value
            }
        },

        methods: {},
    }
</script>

<style lang="sass" scoped>
    .markdown-wrapper
        display: flex
        flex-direction: column
        width: 100%
        height: 70vh
        border-radius: 3px


    .markdown-content, .markdown-ready-field
        width: 100%
        height: calc(100% - 60px)
        margin: 0 !important

        &:before
            border-bottom-left-radius: 0 !important
            border-bottom-right-radius: 0 !important

        > textarea
            height: 100%
            width: 100%
            max-height: none
            padding: 15px
            border: none
            resize: none
            font-family: 'Ubuntu Mono', monospace !important
            font-size: 16px



    .markdown-ready-field
        padding: 15px
        overflow: scroll
        background-color: #fff



    .markdown-footer
        display: flex
        justify-content: flex-end
        align-items: center
        height: 60px
        width: 100%
</style>