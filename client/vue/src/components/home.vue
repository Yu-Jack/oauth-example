<template>
    <div>
        <a :href="oauthUrl">Go OAuth</a>
    </div>
</template>

<script>
export default {
    data() {
        return {
            oauthUrl: "",
        }
    },
    async mounted() {
        const url = new URL(window.location.href);
        if (!url.searchParams.has("grantCode") && !url.searchParams.get("checksum")) {
            const data = await this.$axios.post("/api/oauth/init");
            this.oauthUrl = `${process.env.OUATH_URL}/oauth/login?checksum=${data.checksum}&callbackUrl=${data.callbackUrl}&clientId=${data.clientId}`
            return;
        }

        const data = await this.$axios.post("/api/oauth/callback", {
            grantCode: url.searchParams.get("grantCode"),
            checksum: url.searchParams.get("checksum")
        })
        if (data.status !== 0) {
            this.$router.push("/error")
            return;
        }
        this.$router.push("/photo")
    }
}
</script>

<style lang="scss" scoped>

</style>