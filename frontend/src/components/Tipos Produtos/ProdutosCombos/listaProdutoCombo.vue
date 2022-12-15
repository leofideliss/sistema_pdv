<template>
    <div class="produtosCombo-pages">
        <div class="header-produtosCombo">
            <div class="titulo-produtosCombo">
                <h1>Combos de Produtos</h1>
                <h2>({{combos.length}})</h2>
            </div>
            <router-link to="/novoProdutosCombo" class="botao-novo">
                <img src="@/assets/mais preto.png" alt="Icone de somar">
                <h1>Novo</h1>
            </router-link>
        </div>


        <v-app>
            <v-card>
                <v-card-title>
                    <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Buscar"
                        single-line
                        hide-details
                    ></v-text-field>
                </v-card-title>
                <v-data-table
                    :headers="headers"
                    :items="combos"
                    :search="search"
                    no-data-text="Nenhum item encontrado"
                  no-results-text="Nenhum item encontrado"
                >
                    <template v-slot:[`item.actions`]="{ item }">
                        <v-icon
                            dense
                            class="mr-2"
                            @click="editItem(item)"
                        >
                            mdi-pencil
                        </v-icon>
                        <v-icon
                            dense
                            @click="deleteItem(item)"
                        >
                            mdi-delete
                        </v-icon>
                    </template>
                </v-data-table>
            </v-card> 
        </v-app>
    </div>
</template>

<script>

    export default{
    name: 'listaProdutoCombo',
    data: function(){
        return{
        
        search: '',
        headers: [
            { text: 'Código', value: 'codigo' },
            { text: 'Categoria', value: 'categoria' },
            { text: 'Nome', value: 'nome' },
            { text: 'Preço Custo', value: 'precoCusto' },
            { text: 'Preço Venda', value: 'precoVenda' },
            { text: 'Status', value: 'status' },
            { text: 'Ações', value: 'actions' },
        ],
        combos: [],
        }
    },
    
}
</script>

<style>

    body{
        font-family: 'Poppins';
    }

    .produtosCombo-pages{
        padding: 20px;
    }

    .header-produtosCombo{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 25px;
    }

    .titulo-produtosCombo{
        display: flex;
        align-items: center;
    }

    .titulo-produtosCombo h1{
        font-family: 'Rubik';
        font-size: 1.5rem;
        margin-right: 10px;
        margin-bottom: 0px;
    }

    .titulo-produtosCombo h2{
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