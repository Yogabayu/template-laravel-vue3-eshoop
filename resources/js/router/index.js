import {
  createRouter,
  createWebHistory
} from "vue-router";

const router = createRouter({
  history: createWebHistory("/"),
  routes: [{
      path: "/",
      redirect: (to) => {
        const userToken = localStorage.getItem("userToken");
        // return userToken ? "/dashboard" : "/login";
        return "/dashboard";
      },
    },
    {
      path: "/dashboard",
      component: () => import("../layouts/guest/App.vue"),
      children: [{
        path: "",
        component: () => import("../pages/guest/dashboard.vue"),
      }, ],
    },
    {
      path: "/service",
      component: () => import("../layouts/guest/App.vue"),
      children: [{
        path: "",
        component: () => import("../pages/guest/service.vue"),
      }, ],
    },
    {
      path: "/shop",
      component: () => import("../layouts/guest/App.vue"),
      children: [{
        path: "",
        component: () => import("../pages/guest/shop.vue"),
      }, ],
    },
    {
      path: "/detail",
      component: () => import("../layouts/guest/App.vue"),
      children: [{
        path: "",
        component: () => import("../pages/guest/detail.vue"),
      }, ],
    },
    {
      path: "/cart",
      component: () => import("../layouts/guest/App.vue"),
      children: [{
        path: "",
        component: () => import("../pages/guest/cart.vue"),
      },
     ],
    },
    {
      path: "/login",
      component: () => import("../layouts/blank.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/auth/login.vue"),
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("../layouts/blank.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/[...all].vue"),
        },
      ],
    },
    {
      path: "/unauthorized",
      component: () => import("../layouts/blank.vue"),
      children: [{
        path: "",
        component: () => import("../pages/auth/unauthorized.vue"),
      }, ],
    },


    // authenticated

    // admin
    {
      path: "/admin/dashboard",
      component: () => import("../layouts/admin/default.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/admin/dashboard.vue"),
          beforeEnter: (to, from, next) => {
            checkAdminLogin(next);
          },
        },
      ],
    },    

    // //user
    // {
    //   path: "/user-dashboard",
    //   component: () => import("../layouts/user/default.vue"),
    //   children: [
    //     {
    //       path: "",
    //       component: () => import("../pages/user/dashboard.vue"),
    //       beforeEnter: (to, from, next) => {
    //         checkLogin(next);
    //       },
    //     },
    //   ],
    // },    
  ],
});

function checkLogin(next) {
  const userToken = localStorage.getItem("userToken");
  if (userToken) {
    next();
  } else {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");

    alert("You need to login to access this page.");
    next("/login");
  }
}

function checkAdminLogin(next) {
  const userToken = localStorage.getItem("userToken");
  const userData = JSON.parse(localStorage.getItem("userData"));
  if (userToken && userData && userData.type == 1) {
    next();
  } else {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");

    alert("You need to have admin permission to access this page.");
    next("/login");
  }
}

export default router;
