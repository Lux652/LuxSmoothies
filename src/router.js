import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import AddSmoothie from "@/components/AddSmoothie"
import EditSmoothie from "@/components/EditSmoothie"

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path:'/add-smoothie',
      name: 'AddSmoothie',
      component: AddSmoothie
    },
    {
      path:'/edit-smoothie/:smoothie_slug',
      name:'EditSmoothie',
      component:EditSmoothie
    }
  ]
});
