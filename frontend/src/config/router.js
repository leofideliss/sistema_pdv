import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/Home/Home.vue'
import Complemento from '@/components/Produtos/Complemento/complementos.vue'
import NovoComplemento from '@/components/Produtos/Complemento/NovoComplemento.vue'
import Insumos from '@/components/Estoque/Insumos/InsumosVue.vue'
import InsumoRouter from '@/components/Estoque/Insumos/InsumoRouter.vue'
import NovoInsumos from '@/components/Estoque/Insumos/NovoInsumo.vue'
import CategoriasInsumos from '@/components/Estoque/categorias/CategoriaInsumos.vue'
import NovaCategoriaInsumos from '@/components/Estoque/categorias/NovaCategoriaInsumos.vue'
import CategoriasProdutos from '@/components/Produtos/CategoriasProdutos/CategoriaProdutos.vue'
import NovaCategoriaProdutos from '@/components/Produtos/CategoriasProdutos/NovaCategoriaProdutos.vue'
import ProdutosVue from '@/components/Produtos/ProdutosVue.vue'
import NovoProduto from '@/components/Produtos/NovoProduto.vue'
import QuantidadeItem from '@/components/Produtos/Tabs Produtos/QuantidadeItem.vue'
import TiposTamanhos from '@/components/Produtos/TiposTamanhos/ListaTiposTamanhos.vue'
import NovaObservacao from '@/components/Produtos/Observacoes/NovaObservacoes.vue'
import Observacao from '@/components/Produtos/Observacoes/ListaObservacoes.vue'
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
        path: '/insumos',
        name: 'insumos',
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
                name: 'NovaCategoriaInsumos',
                path: '/alterarCategoriaInsumo/:id',
                component: NovaCategoriaInsumos,
                props: true

            },
        ]
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
        name: 'ProdutosVue',
        path: '/produtos',
        component: ProdutosVue
    },
    {
        name: 'NovoProduto',
        path: '/novoProduto',
        component: NovoProduto
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
        name: 'NovaObservacao',
        path: '/novaObservacao',
        component: NovaObservacao
    },
    {
        name: 'Observacao',
        path: '/observacao',
        component: Observacao
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