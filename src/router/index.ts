import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/c/:slug',
		name: 'Channel',
		component: () => import('@/views/Channel.vue'),
		props: true,  
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
