<template>
    <div>
        <input type="file"
               id="uploadImages"
               @change="uploader"
               hidden>
        <Button @click="uploadButton">Загрузить</Button>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                imageOnload: {},
                uploadProgress: 0
            }
        },

        methods: {
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
                this.$axios.post(`/upload/`, data, forPost)
                    .then(() => {
                        this.uploadProgress = 0
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            },
        }
    }
</script>

<style lang="sass" scoped>
</style>