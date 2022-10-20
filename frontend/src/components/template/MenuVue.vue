<template>
    <aside class="menu" v-show="isMenuVisible">
        <div class="divisao-interna">
            <h1>PRODUTOS</h1>
            <div class="itemH2Primeiro">
                <div class="divInternoItemH2">
                    <img src="@/assets/comer.png" alt="menu lateral" class="iconeh2">
                    <h2 class="textoH2">Todos os Produtos</h2>
                </div>
                <img src="@/assets/seta-direita.png" alt="menu lateral" class="setah2">
            </div>
            <router-link to="/complemento" class="link-item">
                <div class="itemH2">
                <div class="divInternoItemH2">
                    <img src="@/assets/molhos.png" alt="menu lateral" class="iconeh2">
                    <h2 class="textoH2">Complementos</h2>
                </div>
                <img src="@/assets/seta-direita.png" alt="menu lateral" class="setah2">
                </div>
            </router-link>

            <div class="itemH2">
                <div class="divInternoItemH2">
                    <img src="@/assets/contrato.png" alt="menu lateral" class="iconeh2">
                    <h2 class="textoH2">Observações</h2>
                </div>
                <img src="@/assets/seta-direita.png" alt="menu lateral" class="setah2">
            </div>
            <div class="itemH2">
                <div class="divInternoItemH2">
                    <img src="@/assets/etiqueta.png" alt="menu lateral" class="iconeh2">
                    <h2 class="textoH2">Categorias</h2>
                </div>
                <img src="@/assets/seta-direita.png" alt="menu lateral" class="setah2">
            </div>
            <div class="itemH2">
                <div class="divInternoItemH2">
                    <img src="@/assets/tamanho.png" alt="menu lateral" class="iconeh2">
                    <h2 class="textoH2">Tipos e Tamanhos</h2>
                </div>
                <img src="@/assets/seta-direita.png" alt="menu lateral" class="setah2">
            </div>
        </div>
        
        <div class="divisao-interna">
            <h1>ESTOQUE</h1>
            <div class="itemH2Primeiro">
                <div class="divInternoItemH2">
                    <img src="@/assets/menu-aberto.png" alt="menu lateral" class="iconeh2">
                    <h2 class="textoH2">Insumos</h2>
                </div>
                <img src="@/assets/seta-direita.png" alt="menu lateral" class="setah2">
            </div>
            <div class="itemH2">
                <div class="divInternoItemH2">
                    <img src="@/assets/menu-aberto.png" alt="menu lateral" class="iconeh2">
                    <h2 class="textoH2">Categorias</h2>
                </div>
                <img src="@/assets/seta-direita.png" alt="menu lateral" class="setah2">
            </div>
        </div>
    </aside>
</template>

<script>

import {mapState} from 'vuex'

export default {
    name: 'MenuVue',
    computed: mapState(['isMenuVisible'])
}
</script>

<style>
    .menu{
        grid-area: menu;
        background: #e9e9e9;
        color: aliceblue;
        
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }

    .divisao-interna{
        
    }

    .divisao-interna h1{
        color: black;
        padding: 20px 10px 15px 20px;
        font-family: 'Rubik';
        font-weight: 100;
        font-size: 1rem;
    }

    .link-item{
        text-decoration: none;
    }

    .link-item:hover{
        text-decoration: none;
    }


    .itemH2Primeiro{
        padding: 15px 10px 15px 30px;
        display: flex;
        border-top: 1px solid black;
        border-bottom: 1px solid black;
        justify-content: space-between;
        align-content: center;
        align-items: center;
    }

    .itemH2Primeiro:hover{
        background-color: #3decb1;
        cursor: pointer;
    }

    .itemH2{
        padding: 15px 10px 15px 30px;
        display: flex;
        border-bottom: 1px solid black;
        justify-content: space-between;
        align-content: center;
        align-items: center;
    }

    .itemH2:hover{
        background-color: #3decb1;
        cursor: pointer;
    }


    .divInternoItemH2{
        display: flex;
        align-items: center;
    }

    .iconeh2{
        width: 25px;
        height: 25px;
        margin-right: 10px;
    }

    .setah2{
        width: 10px;
        height: 10px;
    }

    .textoH2{
        color: black;
        font-family: 'Rubik';
        font-weight: 100;
        font-size: 1rem;
        margin-bottom: 0px;
    }

    .teste{
        widows: 30px;
    }
</style>
