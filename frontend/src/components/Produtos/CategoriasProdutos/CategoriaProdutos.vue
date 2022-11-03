<template>
    <div class="categoria-pages">
        <div class="header-categoria">
            <div class="titulo-categoria">
                <h1>Categorias Produtos</h1>
                <h2>(4)</h2>
            </div>
            <router-link to="/novaCategoriaProdutos" class="botao-novo">
                <img src="@/assets/mais.png" alt="Icone de somar">
                <h1>Novo</h1>
            </router-link>
        </div>

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
                :items="itens"
                :search="search"
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

        
    </div>
</template>

<script>

    export default{
    name: 'CategoriaProdutos',
    data: function(){
        return{
        
        search: '',
        headers: [
          { text: 'Nome', value: 'nome' },
          { text: 'Ações', value: 'actions' },
        ],
        itens: [
          {
            nome: 'Frios',
          },
          {
            nome: 'Bebidas',
          },
          {
            nome: 'Verduras',
          },
        ],
        }
    },
    
}
</script>

<style>

    body{
        font-family: 'Poppins';
    }

    .header-categoria{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 25px;
    }

    .titulo-categoria{
        display: flex;
        align-items: center;
    }

    .titulo-categoria h1{
        font-family: 'Rubik';
        font-size: 1.5rem;
        margin-right: 10px;
        margin-bottom: 0px;
    }

    .titulo-categoria h2{
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