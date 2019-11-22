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
                                        :key="tag._id"
                                        :value="tag._id"
                                    >{{ tag.name }}
                                </md-option>
                            </md-select>
                        </md-field>
                    </div>
                </div>
                <md-checkbox v-model="is_published">
                    Опубликован
                </md-checkbox>
                <ImageUploader @imageLoaded="image = $event"/>
            </div>
            <h1>Превью поста</h1>
            <textarea class="preview-text md-elevation-2"
                      maxlength="500"
                      v-model="preview_text"
            ></textarea>
            <h1>Текст поста</h1>
            <Markdown @saved="save" v-model="markdown"/>
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
                preview_text: '',
                image: 0,
                tags: [],

                renderGranted: false, //Чтобы данные не мелькали лишний раз при отсуствии доступа на раздел
            }
        },

        computed: {
            ...mapState({
                users: state => state.accounts['user-info'],
                available_tags: state => state.tags.tags
            })
        },

        methods: {
            async save() {
                try {
                    const response = await this.$axios.post(`/api/posts/`, {
                        title: this.title,
                        is_published: this.is_published,
                        lang: this.language,
                        preview_text: this.preview_text,
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


    .preview-text
        width: 100%
        margin-bottom: 20px
        resize: none
        padding: 10px
        font-size: 16px
        height: 150px
        border: none
        font-family: Lora, sans-serif
</style>

