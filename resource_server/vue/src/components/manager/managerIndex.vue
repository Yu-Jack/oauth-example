<template>
    <div>
        <form>
        <input type="file" name="photo" ref="photo">
        <button type="button" @click="upload">upload</button>
        <h4>{{ message }}</h4>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                message: ""
            }
        },
        methods: {
            async upload() {
                this.message = "";
                const file = this.$refs.photo.files[0];
                const formData = new FormData();
                formData.append("photo", file)
                const data = await this.$axios.post("/api/photos/upload", formData);
                if (data.status !== 0) {
                    this.message = "上傳失敗"
                } else {
                    this.message = "上傳成功"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>