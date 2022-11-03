<template>
    <div class="observacoes-pages">
        <div class="header-observacoes">
            <div class="titulo-observacoes">
                <h1>Observações</h1>
                <h2>(4)</h2>
            </div>
            <router-link to="/novaObservacao" class="botao-novo">
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
        </v-app>


        
    </div>
</template>

<script>

    export default{
    name: 'ListaObservacoes',
    data: function(){
        return{
        
        search: '',
        headers: [
          { text: 'Descrição', align: 'start',value: 'descricao' },
          { text: 'Categorias Vinculadas', value: 'categoria' },
          { text: 'Ações', value: 'actions',sortable: false, },
        ],
        itens: [
          {
            
            descricao: 'Com Gelo',
            categoria: 'Bebida',

          },
          {
            descricao: 'Com gelo e Laranja',
            categoria: 'Bebida',
          },
          {
            descricao: 'Com Gelo e Limão',
            categoria: 'Bebida',
          },
          {
            descricao: 'Com Gelo',
            categoria: 'Bebida',
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

    .header-observacoes{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 25px;
    }

    .titulo-observacoes{
        display: flex;
        align-items: center;
    }

    .titulo-observacoes h1{
        font-family: 'Rubik';
        font-size: 1.5rem;
        margin-right: 10px;
        margin-bottom: 0px;
    }

    .titulo-observacoes h2{
        font-family: 'Rubik';
        font-size: 1.5rem;
        margin-bottom: 0px;
    }

    /* ---- BOTAO ----- */
    
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
        width: 16px;
        height: 16px;
        margin-right: 10px;
    }

    .botao-novo h1{
        font-family: 'poppins';
        font-size: 1rem;
        color: black;
        margin: 0px;
    }

    .icone-lapis{
        width: 18px;
        height: 18px;
    }

</style>