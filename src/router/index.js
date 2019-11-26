import Vue from 'vue'
import VueRouter from 'vue-router'
import Produtos from '../views/Produtos.vue'
import NovoProduto from '../views/NovoProduto.vue'
import EditarProduto from '../views/EditarProduto.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/produtos',
    name: 'produtos',
    component: Produtos,
  },
  {
    path: '/produtos/novo',
    name: 'novo-produto',
    component: NovoProduto,
  },
  {
    path: '/produtos/:id',
    name: 'editar-produto',
    component: EditarProduto,
    props: true,
  },
  {
    path: '/',
    redirect: '/produtos',
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
