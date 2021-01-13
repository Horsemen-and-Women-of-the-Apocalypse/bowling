import Vue from 'vue'
import VueRouter from 'vue-router'
import GamePreparation from '../views/GamePreparation.vue'
import ScoreboardView from '../views/ScoreboardView.vue'
import Game from '../views/Game.vue'
import UserManual from '../views/UserManual.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'GamePreparation',
    component: GamePreparation
  },
  {
    path: '/game',
    name: 'Game',
    component: Game
  },
  {
    path: '/scoreboard',
    name: 'Scoreboard',
    component: ScoreboardView
  },
  {
    path: '/manual',
    name: 'UserManual',
    component: UserManual
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const authorizedRoutesPaths = ['/', '/manual']

router.beforeEach((to, from, next) => {
  // Redirect user on first visit if this page isn't authorized
  if (from.name === null && !authorizedRoutesPaths.includes(to.path)) {
    next({ name: routes[0].name })
  } else {
    next()
  }
})

export default router
