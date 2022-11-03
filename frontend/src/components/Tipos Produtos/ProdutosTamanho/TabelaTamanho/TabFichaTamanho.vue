<template>
    <div class="div-fichatecnica">

        <div class="headerFichaTecnica">
            <div class="headerFichaTecnicaTamanho">
                <h1 class="tituloFichaTecnicaTamanho">Selecione os itens que compõem o tamanho:</h1>
                <select class="input-select selectComplTamanho">
                    <option value="valor1">Broto (P)</option>
                    <option value="valor2">Média (M)</option>
                    <option value="valor3">Grande (G)</option>
                </select>
            </div>

            <v-app>
                <v-dialog
                    v-model="dialog"
                    
                    max-width="600px"
                    >
                    <template v-slot:activator="{ on, attrs }">
                        
                            <v-btn
                            v-bind="attrs"
                            v-on="on"
                            class="botaoAdicionarItem"
                            >
                            Adicionar item
                            </v-btn>
                        
                    </template>
                    <v-card>
                        <div >
                            <v-card-title class="dialogFicha">
                                <span class="text-h5">Selecione o item</span>

                                <v-text-field
                                        v-model="search2"
                                        append-icon="mdi-magnify"
                                        label="Buscar"
                                        single-line
                                        hide-details
                                ></v-text-field>
                                
                                <v-data-table
                                    :headers="cabecalhoFicha"
                                    :items="itensFicha"
                                    :search="search2"
                                >
                                    <template v-slot:[`item.actions`]>
                                        
                                        <v-icon
                                            dense
                                            color="red"
                                            class="mr-2"
                                        
                                            @click=" reveal = true"
                                        >
                                            mdi-pencil
                                        </v-icon>
                                    
                                    </template>
                                </v-data-table>
                            </v-card-title>
                        </div>

                        <v-expand-transition>

                            <v-card
                                v-if="reveal"
                                class="transition-fast-in-fast-out v-card--reveal"
                                style="height: 100%;"
                            >
                                <v-card-title class="centralizar-Conteudo">
                                    <h1 class="titulo-quantidadeG text-h5">Quantidade</h1>
                                </v-card-title>
                                
                                <v-card-text class="pb-0 centralizar-Conteudo">
                                    
                                    <div class="formQuantG">
                                        <label for="quantG">Informe a quantidade em gramas (g)</label>
                                        <input type="number" id="quantG" name="quantG" class="inputG">
                                    </div>
                                    
                                </v-card-text>

                                <v-card-actions class="pt-0 centralizar-Conteudo">
                                    <v-btn
                                        text
                                        color="red"
                                        @click="reveal = false"
                                    >
                                        Voltar
                                    </v-btn>
                                    <v-btn
                                        text
                                        color="teal accent-4"
                                        @click="reveal = false"
                                    >
                                        Salvar
                                    </v-btn>
                                </v-card-actions>
                            </v-card>

                        </v-expand-transition>
                    </v-card>
                </v-dialog>
            </v-app>

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
            </v-data-table>
        </v-card>

    </div>
</template>
 
 <script>
    export default{
        name: 'FichaTecnica',
        data: function(){
        return{
        dialog: false,
        reveal: false,
        search: '',
        search2: '',
        headers: [
          { text: 'Nome do Item',value: 'nome' },
          { text: 'Qtde.', value: 'qtde' },
          { text: 'Medida', value: 'medida' },
          { text: 'Custo', value: 'custo' },
          { text: 'Ações', value: 'actions' },
        ],
        itens: [
          {
            nome: 'Açucar',
            qtde: '0,200',
            medida: 'Kg',
            custo: '0,75'
          },
          {
            nome: 'Banana',
            qtde: '0,200',
            medida: 'Kg',
            custo: '0,75'
          },
          {
            nome: 'Açucar',
            qtde: '0,200',
            medida: 'Kg',
            custo: '0,75'
          },
        ],

        cabecalhoFicha: [
          { text: 'Insumos',value: 'nome' },
          { text: 'Medida', value: 'medida' },
          { text: 'Preço Custo', value: 'custo' },
          { text: 'Ações', value: 'actions' },
        ],
        itensFicha: [
          {
            nome: 'Hamburguer',
            medida: 'Kg',
            custo: '2'
          },
          {
            nome: 'Presunto',
            medida: 'Kg',
            custo: '1'
          },
          {
            nome: 'Queijo',
            medida: 'Kg',
            custo: '0,75'
          },
        ],


        
        }
    },
    }
 </script>
 
 <style scoped>



    .div-fichatecnica{
        background-color: white;
        padding: 20px;
    }

    .headerFichaTecnica{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        background-color: #3decb1;
    }

    .tituloFichaTecnicaTamanho{
        font-size: 1rem;
        font-family: 'Poppins';
        margin-bottom: 0px;
        padding: 10px 10px 10px 10px;
    }

    .botao-novo{
        display: flex;
        align-items: center;
        -content: center;
        background-color: white;
        padding: 10px;
        border-radius: 15px;
        cursor: pointer;
        text-decoration: none;
    }

    .botao-novo:hover{
        text-decoration: none;
    }

    .v-card--reveal {
        bottom: 0;
        opacity: 1 !important;
        position: absolute;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .botao-novo img{
        width: 15px;
        height: 15px;
        margin-right: 10px;
        
    }

    .botao-novo h1{
        font-family: 'Rubik';
        font-size: 1rem;
        color: black;
        margin: 0px;
    }

    .botaoAdicionarItem{
        font-family: 'Rubik';
        text-transform: capitalize;
        font-size: 1rem;
        color: black;
    }

    .dialogFicha{
        display: flex;
        flex-direction: column;
    }

    .v-input{
        width: 100%;
    }

    /* CARD QUANTIDADE GRAMAS */

    .formQuantG{
        display: flex;
        flex-direction: column;
    }

    .inputG{
        border: 1px solid black;
        outline: none; /*borda que aparece quando clicamos*/
        padding: 5px;
        background:white;
        font-size: 0.8rem;
        font-family: 'Poppins';
        border-radius: 5px;
        width: 100%;
    }

    .centralizar-Conteudo{
        display: flex;
        justify-content: center;
    }

    .titulo-quantidadeG{
        text-align: center;
        font-family: 'Poppins';
        font-size: 1.2rem;
    }

    .headerFichaTecnicaTamanho{
        display: flex;
    }

 </style>