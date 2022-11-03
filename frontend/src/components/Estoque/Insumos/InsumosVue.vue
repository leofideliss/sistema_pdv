<template>
    <div class="insumo-pages">
        <div class="header-insumo">
            <div class="titulo-insumo">
                <h1>Insumos</h1>
                <h2>(4)</h2>
            </div>
            <router-link to="/novoInsumos" class="botao-novo">
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
    name: 'InsumosVue',
    data: function(){
        return{
        
        search: '',
        headers: [
          {
            text: 'Código',
            align: 'start',
            filterable: false,
            value: 'id',
          },
          { text: 'Nome', value: 'nome' },
          { text: 'Categoria', value: 'categoria' },
          { text: 'Preço Custo', value: 'precoCusto' },
          { text: 'Medida', value: 'medida' },
          { text: 'Ações', value: 'actions' },
        ],
        itens: [
          {
            id: 13,
            nome: 'Frozen Yogurt',
            categoria: 'Bebida',
            precoCusto: 6.0,
            medida: 'Litro',
            status: 'ativo',
          },
          {
            id: 13,
            nome: 'Frozen Yogurt',
            categoria: 'Bebida',
            precoCusto: 6.0,
            medida: 'Litro',
            status: 'ativo',
          },
          {
            id: 13,
            nome: 'Frozen Yogurt',
            categoria: 'Bebida',
            precoCusto: 6.0,
            medida: 'Litro',
            status: 'ativo',
          },
          {
            id: 13,
            nome: 'Frozen Yogurt',
            categoria: 'Bebida',
            precoCusto: 6.0,
            medida: 'Kg',
            status: 'ativo',
          },
          {
            id: 13,
            nome: 'Frozen Yogurt',
            categoria: 'Bebida',
            precoCusto: 6.0,
            medida: 'Litro',
            status: 'ativo',
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

    .header-insumo{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 25px;
    }

    .titulo-insumo{
        display: flex;
        align-items: center;
    }

    .titulo-insumo h1{
        font-family: 'Rubik';
        font-size: 1.5rem;
        margin-right: 10px;
        margin-bottom: 0px;
    }

    .titulo-insumo h2{
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