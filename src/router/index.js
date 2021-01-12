import Vue from 'vue'
import VueRouter from 'vue-router'
import GamePreparation from '../views/GamePreparation.vue'
import ScoreboardView from '../views/ScoreboardView.vue'
import Game from '../views/Game.vue'
import GameEnd from '../views/GameEnd.vue'

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
    path: '/gameend',
    name: 'GameEnd',
    component: GameEnd
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
