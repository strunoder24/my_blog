<template>
    <div class="admin-list md-layout">
        <md-card
                class="tag md-layout-item"
                v-for="tag in tags"
                @click.native="edit_tag(tag)"
                :key="tag.id"
                md-with-hover
        >
            <div class="tag-name ellipsis"
                 :title="tag.name"
                 v-if="editable_id !== tag.id">
                {{ tag.name }}
            </div>
            <input  class="tag-name tag-input"
                    v-if="editable_id === tag.id"
                    @blur="save_changes()"
                    @keyup.enter="blur()"
                    v-model="temp_value"
                    :ref="tag.id"
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
                    this.editable_id = tag.id;
                    this.temp_value = tag.name;
                    this.$nextTick(() => {
                        const element = this.$refs[tag.id][0];
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

            save_changes() {
                if (!this.prevent_save) {
                    // this.$axios.patch();
                    this.$store.commit('tags/changeTagValue', {id: this.editable_id, value: this.temp_value});
                    this.close_input()
                }
            }
        }
    }
</script>

<style lang="sass" scoped>
    .admin-list
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