<template>
    <div v-if="renderGranted" class="admin-wrapper main-container md-layout">
        <section class="section-wrapper">
            <ButtonsPanel />
            <div class="add-fields">
                <InputComponent v-model="title">
                    Заголовок
                </InputComponent>
                <md-field>
                    <label for="language">Язык</label>
                    <md-select v-model="language" id="language">
                        <md-option value="en">Английский</md-option>
                        <md-option value="ru">Русский</md-option>
                    </md-select>
                </md-field>
                <md-checkbox v-model="is_published" value="true">
                    Опубликован
                </md-checkbox>
            </div>
            <Markdown @saved="saved" v-model="markdown"/>
        </section>
    </div>
</template>

<script>
    import ButtonsPanel from '~/components/admin/ButtonsPanel.vue'
    import Markdown from '~/components/admin/Markdown.vue'
    import { mapState } from 'vuex'

    export default {
        data() {
            return {
                title: '',
                is_published: false,
                language: 'ru',
                markdown: '',
                tags: [1,3],

                renderGranted: false //Чтобы данные не мелькали лишний раз при отсуствии доступа на раздел
            }
        },

        computed: {
            ...mapState({
                users: state => state.accounts['user-info']
            })
        },

        methods: {
            async saved() {
                try {
                    const response = await this.$axios.post(`${process.env.baseUrl}/posts/`, {
                        title: this.title,
                        is_published: this.is_published,
                        language: this.language,
                        markdown: this.markdown,
                        tags: this.tags
                    });
                    this.$router.push('/admin')
                } catch (e) {
                    console.log(e);
                }
            }
        },

        components: {
            ButtonsPanel,
            Markdown
        },

        beforeRouteEnter(to, from, next) {
            next(
                async vm => {
                    await vm.$store.dispatch('accounts/getUserInfo', vm);
                    if (Object.keys(vm.users).length === 0) next('/admin');
                    else vm.renderGranted = true;
                }
            )
        },
    }
</script>

<style lang="sass" scoped>
    .admin-wrapper
        flex: 1


    .add-fields
        /*display: flex*/
</style>

