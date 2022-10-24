import Vue from 'vue'
import VueRouter from 'vue-router'

// import AutenticacaoVue from '@/components/Autenticacao/AutenticacaoVue.vue'

import Home from '@/components/Home/Home.vue'
import Complemento from '@/components/Produtos/complementos.vue'
import NovoComplemento from '@/components/Produtos/NovoComplemento.vue'



Vue.use(VueRouter)

const routes = [
    // {
    //     name: 'Login',
    //     path: '/signin',
    //     component: AutenticacaoVue
    // },    
    {
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