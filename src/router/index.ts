import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		name: 'Home',
		component: () => import('@/views/Home.vue')
	},
	{
		path: '/watch/:slug',
		name: 'Player',
		component: () => import('@/views/Player.vue')
	},
	{
		path: '/:catchAll(.*)',
		redirect: {
			name: 'Home'
		},
	}
];

const router = createRouter({
	history: createWebHashHistory(),
	routes
});

export default router
