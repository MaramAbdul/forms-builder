import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import CreateFormView from '@/views/CreateFormView.vue';
import ViewFormView from '@/views/ViewFormView.vue';
import PublicFormView from '@/views/PublicFormView.vue';

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/create', name: 'CreateForm', component: CreateFormView },
  { path: '/form/:id', name: 'ViewForm', component: ViewFormView },
  { path: '/form/public/:id', component: PublicFormView }, // Public view

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;