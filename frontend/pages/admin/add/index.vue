<template>
    <div v-if="renderGranted" class="admin-wrapper main-container md-layout">
        <section class="section-wrapper">
            <ButtonsPanel />
            <div class="add-fields">
                <InputComponent v-model="title">
                    Заголовок
                </InputComponent>
                <div class="md-layout md-gutter">
                    <div class="md-layout-item">
                        <md-field>
                            <label for="language">Язык</label>
                            <md-select v-model="language" id="language">
                                <md-option value="en">Английский</md-option>
                                <md-option value="ru">Русский</md-option>
                            </md-select>
                        </md-field>
                    </div>
                    <div class="md-layout-item">
                        <md-field>
                            <label for="tags">Тэги</label>
                            <md-select  v-model="tags" id="tags" multiple>
                                <md-option
                                        v-for="tag in available_tags"
                                        :key="tag.id"
                                        :value="tag.id"
                                    >{{ tag.name }}
                                </md-option>
                            </md-select>
                        </md-field>
                    </div>
                </div>
                <md-checkbox v-model="is_published" value="true">
                    Опубликован
                </md-checkbox>
                <ImageUploader @imageLoaded="image = $event"/>
            </div>
            <Markdown @saved="saved" v-model="markdown"/>
        </section>
    </div>
</template>

<script>
    import ButtonsPanel from '~/components/admin/ButtonsPanel.vue'
    import ImageUploader from '~/components/UI/ImageUploader.vue'

    import Markdown from '~/components/admin/Markdown.vue'
    import { mapState } from 'vuex'

    export default {
        data() {
            return {
                title: '',
                is_published: false,
                language: 'ru',
                markdown: '',
                image: 0,
                tags: [],

                renderGranted: false, //Чтобы данные не мелькали лишний раз при отсуствии доступа на раздел
            }
        },

        computed: {
            ...mapState({
                users: state => state.accounts['user-info'],
                available_tags: state => state.tags.tags.results
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
                        main_image: this.image,
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
            Markdown,
            ImageUploader
        },

        beforeRouteEnter(to, from, next) {
            next(
                async vm => {
                    await vm.$store.dispatch('accounts/getUserInfo', vm);
                    await vm.$store.dispatch('tags/getTags', vm);
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
        padding-bottom: 30px


    .add-fields
        /*display: flex*/
</style>

