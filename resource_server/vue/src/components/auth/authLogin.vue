<template>
    <div>
        <h1>welcome to user photo cloud</h1>
        <form>
            username: 
            <input type="text" name="username" v-model="username">
            password: 
            <input type="password" name="password" v-model="password">
            <button type="button" @click="login" >Submit</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: "",
            password: "",
        }
    },
    methods: {
        async login() {
            const data = await this.$axios.post("/api/login", {
                username: this.username,
                password: this.password,
            })
            if (data.status !== 0) {
                // TODO: 
                return;
            }
            this.$router.push("/manager")
        }
    }
}
</script>

<style lang="scss" scoped>

</style>