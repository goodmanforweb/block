import Vue from 'vue'
import Router from 'vue-router'
import routers from './router.js'

Vue.use(Router)

const router = new Router({
  	routes: routers
})


router.beforeResolve((to, from, next) => {
	if (!to.matched.length) {
		next("/home");
	}
	const isLogin = window.sessionStorage.getItem('account')
	if(to.meta.auth) {
		if(!isLogin) {
			next('/login')
		}
		else {
			next();
		}
	}
	else {
		if(isLogin && to.name == 'login') {
			next(false)
		}
		else {
			next();
		}
		
	}
})

export default router;
