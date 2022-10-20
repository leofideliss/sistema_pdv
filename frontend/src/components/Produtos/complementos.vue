<template>
    <div class="complemento-pages">
        <div class="header-complemento">
            <div class="titulo-complemento">
                <h1>Complementos</h1>
                <h2>(4)</h2>
            </div>
            <router-link to="/novoComplemento" class="botao-novo">
                <img src="@/assets/mais.png" alt="Icone de somar">
                <h1>Novo</h1>
            </router-link>
        </div>

        <b-table hover striped :items="complements" :fields="fields">
            <template slot="cell(actions)">
                <b-button variant="warning" class="mr-2">
                    <img src="@/assets/lapis.png" alt="Icone de somar" class="icone-lapis">
                </b-button>
            </template>   
        </b-table>

        
    </div>
</template>

<script>

    export default{
    name: 'ComplementosVue',
    data: function(){
        return{
            complements: [
                {id: 40, nome:'Alface',prodVinculados:'X-bacon,X-frango,X-Egg,X-Tudo, X-FrangoBacon' ,precoCusto:1.5, precoVenda:4.0, ativo:true},
                {id: 20, nome:'Milho',prodVinculados:'X-bacon,X-frango,X-Egg,X-Tudo, X-FrangoBacon', precoCusto:1, precoVenda:3., ativo: false},
                {id: 2, nome:'Banana', prodVinculados:'X-bacon,X-frango,X-Egg,X-Tudo, X-FrangoBacon' ,precoCusto:2.5, precoVenda:6.0, ativo: true},
                {id: 10, nome:'Amendoim', prodVinculados:'X-bacon,X-frango,X-Egg,X-Tudo, X-FrangoBacon' ,precoCusto:5, precoVenda:15.0, ativo:false},
            ],
            fields: [
                { key: 'id', label: 'Codigo', sortable: true},
                { key: 'nome', label: 'Nome', sortable: true},
                {key: 'prodVinculados', label: 'Produtos Vinculados'},
                {key: 'precoCusto', label: 'Preço de Custo', sortable: true},
                {key: 'precoVenda', label: 'Preço de Venda', sortable: true},
                {key: 'ativo', label: 'Status Venda', sortable: true, formatter: value => value ? 'Ativo' : 'Desativado'},
                {key: 'actions', label: 'Ações'}
            ]
        }
    }
    
}
</script>

<style>

    body{
        font-family: 'Poppins';
    }

    .header-complemento{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 25px;
    }

    .titulo-complemento{
        display: flex;
        align-items: center;
    }

    .titulo-complemento h1{
        font-family: 'Rubik';
        font-size: 1.5rem;
        margin-right: 10px;
        margin-bottom: 0px;
    }

    .titulo-complemento h2{
        font-family: 'Rubik';
        font-size: 1.5rem;
        margin-bottom: 0px;
    }
    
    .botao-novo{
        display: flex;
        align-items: center;
        -content: center;
        background-color: #3decb1;
        padding: 10px;
        border-radius: 15px;
        cursor: pointer;
        text-decoration: none;
    }

    .botao-novo:hover{
        text-decoration: none;
    }

    .botao-novo img{
        width: 20px;
        height: 20px;
        margin-right: 10px;
    }

    .botao-novo h1{
        font-family: 'Rubik';
        font-size: 1.2rem;
        color: white;
        margin: 0px;
    }

    .icone-lapis{
        width: 18px;
        height: 18px;
    }
</style>