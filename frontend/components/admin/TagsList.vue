<template>
    <div class="tags-list">
        <md-card
                class="tag md-layout-item"
                v-for="tag in tags"
                @click.native="edit_tag(tag)"
                :key="tag._id"
                md-with-hover
        >
            <div class="tag-name ellipsis"
                 :title="tag.name"
                 v-if="editable_id !== tag._id">
                {{ tag.name }}
            </div>
            <input  class="tag-name tag-input"
                    v-if="editable_id === tag._id"
                    @blur="save_changes()"
                    @keyup.enter="blur()"
                    v-model="temp_value"
                    :ref="tag._id"
                    type="text">
        </md-card>
    </div>
</template>

<script>
    import { directive as onClickaway } from 'vue-clickaway';

    export default {
        directives: {
            onClickaway: onClickaway,
        },

        props: {
            tags: {
                type: Array,
            }
        },

        data: function(){
            return {
                editable_id: 0,
                temp_value: '',
                prevent_save: false,
            }
        },

        methods: {
            edit_tag(tag) {
                if (this.editable_id === 0) {
                    this.editable_id = tag._id;
                    this.temp_value = tag.name;
                    this.$nextTick(() => {
                        const element = this.$refs[tag._id][0];
                        element.focus();
                    });
                }
            },

            close_input(){
                this.editable_id = 0;
                this.temp_value = '';
            },

            blur() {
                this.$nextTick(() => {
                    const element = this.$refs[this.editable_id][0];
                    element.blur();
                })
            },

            async save_changes() {
                if (!this.prevent_save) {
                    if (this.temp_value === '') {
                        await this.$store.dispatch('tags/deleteTag', {context: this, tag: {_id: this.editable_id, name: this.temp_value}});
                    } else {
                        await this.$store.dispatch('tags/changeTag', {context: this, tag: {_id: this.editable_id, name: this.temp_value}});
                    }
                    this.close_input()
                }
            }
        }
    }
</script>

<style lang="sass" scoped>
    .tags-list
        display: flex
        flex-wrap: wrap
        margin: -10px

    .tag
        display: flex
        align-items: center
        height: 60px
        min-width: 300px
        padding: 0 10px
        margin: 10px

    .tag-name
        width: 100%
        font-size: 26px
        font-weight: 600
        line-height: 1.3


    .tag-input
        position: relative
        left: -1px
        width: 100%
        font-family: "Roboto", "Noto Sans"
        letter-spacing: 0.14px
        font-weight: 600
        outline: none
        border: none


        .edit-button
            margin-left: auto
</style>