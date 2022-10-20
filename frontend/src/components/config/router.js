import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/Home/Home.vue'
import Complemento from '@/components/Produtos/complementos.vue'
import NovoComplemento from '@/components/Produtos/NovoComplemento.vue'

Vue.use(VueRouter)

const routes = [{
    name: 'Home',
    path: '/',
    component: Home
},
{
    name: 'Complemento',
    path: '/complemento',
    component: Complemento
},
{
    name: 'NovoComplemento',
    path: '/novoComplemento',
    component: NovoComplemento
}
]

export default new VueRouter({
    mode: 'history',
    routes
})