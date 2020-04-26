import Vue from "vue";
import VueRouter from "vue-router";
import home from "@/components/home"
import error from "@/components/error"
import photo from "@/components/photo"
import axios from "axios";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: home,
        name: "home",
    },
    {
        path: "/photo",
        component: photo,
        name: "photo"
    },
    {
        path: "/error",
        component: error,
        name: "error"
    }
];

const router = new VueRouter({
    // mode: process.env.NODE_ENV === "development" ? "hash" : "history",
    mode: "history",
    routes,
});

router.beforeEach(async (to, from, next) => {
    if (to.name === "error") {
        return next();
    }
    const data = await axios.post("/api/login/check").then(response => response.data);
    if (data.status === 0 && to.name === "home") {
        return next("/photo");
    }
    if (data.status === 0) {
        return next();
    }
    if (data.status !== 0 && to.name === "home") {
        return next();
    }
    return next("/");
})

export default router;