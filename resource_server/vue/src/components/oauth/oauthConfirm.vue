<template>
    <div>
        <h2>Do you want to approve this login?</h2>
        <form ref="form" action="/api/oauth/login/confirm" method="post">
            <input type="hidden" name="isConfirm" v-model="isConfirm">
            <button type="button" @click="submitForm(true)">Yes</button>
            <button type="button" @click="submitForm(false)">No</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isConfirm: null
        }
    },
    methods: {
        submitForm(isConfirm) {
            this.isConfirm = isConfirm;
            this.$nextTick(() => {
                this.$refs.form.submit();
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>