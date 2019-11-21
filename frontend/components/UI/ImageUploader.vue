<template>
    <div class="image-uploader-wrapper">
        <div class="uploader-buttons">
            <input type="file"
               id="uploadImages"
               @change="uploader"
               hidden>
            <h2>Загрузить заглавную картинку</h2>
            <Button @click="uploadButton" style="margin-right: 15px;">Загрузить</Button>
            <Button @click="showMediateka = true">Выбрать из медиатеки</Button>
            <MediatekaPopup
                    v-if="showMediateka"
                    @close="showMediateka = false"
                    @imagePicked="(imageData) => {
                        this.uploadedImage = imageData;
                        this.sendSignalToForm()
                    }" />
        </div>
        <img class="loaded-image" @click='deleteImage' :src="uploadedImage.src">
    </div>
</template>

<script>
    import MediatekaPopup from '~/components/UI/MediatekaPopup.vue'

    export default {
        props: {
            image: {
                type: Number,
                required: false
            }
        },

        data(){
            return {
                imageOnload: {},
                uploadProgress: 0,
                uploadedImage: {
                    id: 0,
                    src: '',
                },
                showMediateka: false
            }
        },

        mounted(){
            if (this.image) this.getExistingImage();
        },

        watch: {
            image: function () {
                if (this.uploadedImage === 0) this.getExistingImage()
            }
        },

        methods: {
            async getExistingImage(){
                let { data } = await this.$axios.get('/images/' + this.image + '/');
                this.uploadedImage.id = data.id;
                this.uploadedImage.src = data.file;
            },

            uploadButton(){
                const input = document.querySelector('#uploadImages');
                input.click()
            },

            uploader(){
                const input = document.querySelector('#uploadImages');
                this.imagesOnload = {
                    file: input.files[0],
                    name: input.files[0].name,
                    src: URL.createObjectURL(input.files[0]),
                    extension: input.files[0].name.split('.')[1].toUpperCase(),
                };
                this.uploadImage(this.imagesOnload.file);
            },

            uploadImage(){
                const forPost= {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    onUploadProgress: (progressEvent) => {
                        this.uploadProgress = progressEvent.loaded / progressEvent.total * 100
                    },
                };

                const data = new FormData();
                data.append('file', this.imagesOnload.file);
                this.$axios.post(`/api/images/`, data, forPost)
                    .then(({ data }) => {
                        this.uploadedImage.id = data.public_id;
                        this.uploadedImage.src = data.original_url;
                        this.sendSignalToForm();
                        this.clear_after_load();
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            },

            deleteImage(){
                this.uploadedImage = {
                    id: '',
                    src: ''
                }
            },

            sendSignalToForm(){
                this.$emit('imageLoaded', this.uploadedImage.id)
            },

            clear_after_load() {
                this.uploadProgress = 0;
                this.imagesOnload = {};
            }
        },

        components: {
            MediatekaPopup
        }
    }
</script>

<style lang="sass" scoped>
    .image-uploader-wrapper
        display: block
        padding-bottom: 15px


    .uploader-buttons
        padding-bottom: 15px


    .loaded-image
        width: 600px
        cursor: pointer
</style>