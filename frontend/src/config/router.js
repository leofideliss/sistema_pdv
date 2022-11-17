import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/Home/Home.vue'
import Complemento from '@/components/Produtos/Complemento/complementos.vue'
import ComplementoRouter from '@/components/Produtos/Complemento/ComplementoRouter.vue'
import NovoComplemento from '@/components/Produtos/Complemento/NovoComplemento.vue'
import InsumoRouter from '@/components/Estoque/Insumos/InsumoRouter.vue'
import Insumos from '@/components/Estoque/Insumos/InsumosVue.vue'
import NovoInsumos from '@/components/Estoque/Insumos/NovoInsumo.vue'
// import CategoriaInsumoRouter from '@/components/Estoque/categorias/CategoriaInsumoRouter.vue'
import CategoriasInsumos from '@/components/Estoque/categorias/CategoriaInsumos.vue'
import NovaCategoriaInsumos from '@/components/Estoque/categorias/NovaCategoriaInsumos.vue'
import CategoriasProdutos from '@/components/Produtos/CategoriasProdutos/CategoriaProdutos.vue'
import NovaCategoriaProdutos from '@/components/Produtos/CategoriasProdutos/NovaCategoriaProdutos.vue'
import ProdutosVue from '@/components/Produtos/ProdutosVue.vue'
import NovoProduto from '@/components/Produtos/NovoProduto.vue'
import ProdutoRouter from '@/components/Produtos/ProdutoRouter.vue'
import QuantidadeItem from '@/components/Produtos/Tabs Produtos/QuantidadeItem.vue'
import TiposTamanhos from '@/components/Produtos/TiposTamanhos/ListaTiposTamanhos.vue'
import NovaObservacao from '@/components/Produtos/Observacoes/NovaObservacoes.vue'
import Observacao from '@/components/Produtos/Observacoes/ListaObservacoes.vue'
import ObservacoesRouter from '@/components/Produtos/Observacoes/ObservacoesRouter.vue'
import Perguntas from '@/components/Produtos/Perguntas/ListaPerguntas.vue'
import NovaPergunta from '@/components/Produtos/Perguntas/NovaPergunta.vue'
import ListaProdutosTamanho from '@/components/Tipos Produtos/ProdutosTamanho/ListaProdutosTamanho.vue'
import NovoProdutosTamanho from '@/components/Tipos Produtos/ProdutosTamanho/novoProdutoTamanho.vue'
import ListaProdutoCombo from '@/components/Tipos Produtos/ProdutosCombos/listaProdutoCombo.vue'
import NovoProdutoCombo from '@/components/Tipos Produtos/ProdutosCombos/novoProdutoCombo.vue'

import AutenticacaoVue from '@/components/Autenticacao/AutenticacaoVue.vue'



Vue.use(VueRouter)

const routes = [
    {
        name: 'Home',
        path: '/',
        component: Home
    },
    {
        name: 'ComplementoRouter',
        path: '/complemento',
        component: ComplementoRouter,
        children: [
            {
                name: 'Complemento',
                path: '/complemento',
                component: Complemento
            },
            {
                name: 'NovoComplemento',
                path: '/novoComplemento',
                component: NovoComplemento
            },
            {
                name: 'AlterarComplemento',
                path: '/novoComplemento/:id',
                component: NovoComplemento,
                props: true
            },
        ]
    },


    {
        path: '/insumos',
        name: 'insumosRouter',
        component: InsumoRouter,
        children: [
            {
                name: 'CategoriasInsumos',
                path: '/categoriasInsumo',
                component: CategoriasInsumos,
            },
            {
                name: 'NovaCategoriaInsumos',
                path: '/novaCategoriaInsumo',
                component: NovaCategoriaInsumos,

            },
            {
                name: 'AlterarCategoriaInsumos',
                path: '/alterarCategoriaInsumo/:id',
                component: NovaCategoriaInsumos,
                props: true

            },
            {
                name: 'Insumos',
                path: '/insumos',
                component: Insumos
            },
            {
                name: 'NovoInsumos',
                path: '/novoInsumos',
                component: NovoInsumos
            },
            {
                name: 'AlterarInsumos',
                path: '/alterarInsumo/:id',
                component: NovoInsumos,
                props: true

            },
        ]
    },


    {
        name: 'ProdutosVueRouter',
        path: '/produtos',
        component: ProdutoRouter,
        children: [
            {
                name: 'ProdutosVue',
                path: '/produtos',
                component: ProdutosVue
            },
            {
                name: 'CategoriasProdutos',
                path: '/categoriasProdutos',
                component: CategoriasProdutos
            },
            {
                name: 'NovaCategoriaProdutos',
                path: '/novaCategoriaProdutos',
                component: NovaCategoriaProdutos
            },
            {
                name: 'AlterarCategoriaProdutos',
                path: '/alterarCategoriaProduto/:id',
                component: NovaCategoriaProdutos,
                props: true
            },
            {
                name: 'NovoProduto',
                path: '/novoProduto',
                component: NovoProduto
            },
        ]
    },
    {
        name: 'QuantidadeItem',
        path: '/quantidadeItem',
        component: QuantidadeItem
    },
    {
        name: 'TiposTamanhos',
        path: '/tiposTamanhos',
        component: TiposTamanhos
    },

    {
        name: 'ObservacaoRouter',
        path: '/observacao',
        component: ObservacoesRouter,
        children: [
            {
                name: 'Observacao',
                path: '/observacao',
                component: Observacao
            },
            {
                name: 'NovaObservacao',
                path: '/novaObservacao',
                component: NovaObservacao
            },
            {
                name: 'AlteraObservacao',
                path: '/alteraObservacao/:descricao',
                component: NovaObservacao,
                props:true
            },
        ]
    },
    {
        name: 'NovaPergunta',
        path: '/novaPergunta',
        component: NovaPergunta
    },
    {
        name: 'Perguntas',
        path: '/perguntas',
        component: Perguntas
    },
    {
        name: 'ListaProdutosTamanho',
        path: '/produtosTamanho',
        component: ListaProdutosTamanho
    },
    {
        name: 'NovoProdutosTamanho',
        path: '/novoProdutosTamanho',
        component: NovoProdutosTamanho
    },
    {
        name: 'ListaProdutoCombo',
        path: '/produtosCombo',
        component: ListaProdutoCombo
    },
    {
        name: 'NovoProdutoCombo',
        path: '/novoProdutosCombo',
        component: NovoProdutoCombo
    },
    {
        name: 'login',
        path: '/login',
        component: AutenticacaoVue

    },



]

export default new VueRouter({
    mode: 'history',
    routes
})