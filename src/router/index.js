import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main.vue";
import QnA from "../views/QnA.vue";
import Login from "@/views/user/Login.vue";
import Signup from "@/views/user/SignUp.vue";
import Rating from "@/views/user/InitialRating.vue";
import BoardGameDetail from "@/views/boardgame/BoardGameDetail.vue";
import BoardGameSearch from "@/views/boardgame/BoardGameSearch.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Main",
        component: Main,
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/signup",
        name: "Signup",
        component: Signup,
    },
    {
        path: "/rating",
        name: "Rating",
        component: Rating,
    },
    {
        path: "/qna",
        name: "QnA",
        component: QnA,
    },
    {
        path: "/board/:id",
        name: "BoardGameDetail",
        component: BoardGameDetail,
    },
    {
        path: "/search",
        name: "BoardGameSearch",
        component: BoardGameSearch,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
