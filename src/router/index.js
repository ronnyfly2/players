import Vue from 'vue'
import VueRouter from 'vue-router'

import Header from '@/components/layouts/header'
import Footer from '@/components/layouts/footer'

Vue.use(VueRouter)
let loadView=(path, view)=>{
	return () => import(`@/views/${path}/${view}.vue`)
}
const routes = [
		{
			path: '/',
			name: 'Home',
			components: {
				default: Header,
				containerBlock: loadView('Home','Home'),
				footer: Footer
			}
		},
		{
			path: '/jugador/:id?',
			name: 'PlayerForm',
			components: {
				default: Header,
				containerBlock: loadView('Players','Player'),
				footer: Footer
			}
		},
		{
			path: '*',
			name: 'page',
			components:{
				default: Header,
				containerBlock: loadView('ErrorPage','PageNotFound'),
				footer: Footer
			}
		},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
