import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import World from '@/components/World'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'World',
      component: World
    },
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    }
  ]
})
