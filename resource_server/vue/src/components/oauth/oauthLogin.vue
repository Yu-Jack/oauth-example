<template>
    <div>
        <h2>Welcome to OAuth Login</h2>
        <form>
            username: 
            <input type="text" name="username" v-model="username">
            password: 
            <input type="password" name="password" v-model="password">
            <input type="hidden" name="clientId" v-model="clientId" >
            <input type="hidden" name="callbackUrl" v-model="callbackUrl" >
            <input type="hidden" name="checksum" v-model="checksum" >
            <button type="button" @click="login" >Submit</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            clientId: "",
            callbackUrl: "",
            checksum: "",
            username: "",
            password: "",
        }
    },
    async mounted() {
        const url = new URL(window.location.href);
        this.clientId = url.searchParams.get("clientId");
        this.callbackUrl = url.searchParams.get("callbackUrl");
        this.checksum = url.searchParams.get("checksum");
    },
    methods: {
        async login() {
            const data = await this.$axios.post("/api/oauth/login", {
                username: this.username,
                password: this.password,
                clientId: this.clientId,
                callbackUrl: this.callbackUrl,
                checksum: this.checksum,
            })
            if (data.status !== 0) {
                // TODO: 
                return;
            }
            this.$router.push("/oauth/confirm")
        }
    }
}
</script>

<style lang="scss" scoped>

</style>