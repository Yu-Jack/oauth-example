<template>
    <div style="width: 100%">
        this is photo page, you can print these photos.!
        <ul>
            <li v-for="(photo, index) in photos" :key="index">
                <img :src="photo" alt="" style="width: 100%; height: auto;">
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            photos: [],
        }
    },
    async mounted() {
        const data = await this.$axios.post("/api/photo");
        this.photos = data.photos;
    }
}
</script>

<style lang="scss" scoped>

</style>