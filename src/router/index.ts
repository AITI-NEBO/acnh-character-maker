import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    redirect: 'skin',
    component: HomePage,
    props: true,
    children: [
      {
        path: 'skin',
        name: 'skin',
        component: () => import('../views/SettingsSkin.vue'),
      },
      {
        path: 'hair',
        name: 'hair',
        component: () => import('../views/SettingsHair.vue'),
      },
      {
        path: 'eyes',
        name: 'eyes',
        component: () => import('../views/SettingsEyes.vue'),
      },
      {
        path: 'nose-mouth',
        name: 'nose-mouth',
        component: () => import('../views/SettingsNoseMouth.vue'),
      },
      {
        path: 'blush',
        name: 'blush',
        component: () => import('../views/SettingsBlush.vue'),
      },
      {
        path: 'background',
        name: 'background',
        component: () => import('../views/SettingsBackground.vue'),
      },
      {
        path: 'clothes',
        name: 'clothes',
        component: () => import('../views/SettingsClothes.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
