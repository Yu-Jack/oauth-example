import Vue from "vue";
import VueRouter from "vue-router";
import authLogin from "@/components/auth/authLogin"
import managerIndex from "@/components/manager/managerIndex"
import oauthLogin from "@/components/oauth/oauthLogin"
import oauthConfirm from "@/components/oauth/oauthConfirm"
import axios from "axios";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: authLogin,
        name: "authLogin",
    },
    {
        path: "/manager",
        component: managerIndex,
        name: "managerIndex",
    },
    {
        path: "/oauth/login",
        component: oauthLogin,
        name: "oauthLogin",
    },
    {
        path: "/oauth/confirm",
        component: oauthConfirm,
        name: "oauthConfirm",
    }
];

const router = new VueRouter({
    // mode: process.env.NODE_ENV === "development" ? "hash" : "history",
    mode: "history",
    routes,
});

router.beforeEach(async (to, from, next) => {
    if (to.name === "oauthLogin" || to.name === "oauthConfirm" || to.name === "error") {
        return next();
    }
    const data = await axios.post("/api/login/check").then(response => response.data);
    if (data.status === 0 && to.name === "authLogin") {
        return next("/manager");
    }
    if (data.status === 0) {
        return next();
    }
    if (data.status !== 0 && to.name === "authLogin") {
        return next();
    }
    return next("/");
})


export default router;