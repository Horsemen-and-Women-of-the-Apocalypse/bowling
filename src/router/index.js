import Vue from 'vue'
import VueRouter from 'vue-router'
import GamePreparation from '../views/GamePreparation.vue'
import ScoreboardView from '../views/ScoreboardView.vue'
import Game from '../views/Game.vue'

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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
