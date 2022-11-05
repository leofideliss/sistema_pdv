<template>
    <div class="tiposTamanhos-pages espacamento20geral">
        <div class="header-tiposTamanhos">
            <div class="titulo-tiposTamanhos">
                <h1>Tipos e Tamanhos</h1>
                <h2>Cadastre ou altere os tipos de produto por tamanho e suas opções de tamanho</h2>
            </div>
            <div class="botoesTiposTamanhos">
                <v-dialog
                    v-model="dialog"
                    persistent
                    max-width="600px"
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                        class="botao-novoTipo"
                        v-bind="attrs"
                        v-on="on"
                        style="background-color:#3decb1"
                        >
                        <img src="@/assets/mais preto.png" alt="Voltar para Página anterior" class="imgTipoTamanho">
                        Novo Tipo
                        </v-btn>
                    </template>
                    <v-card class="centralizarCard">
                        <v-card-title class="topoCardTamanho">
                            <span class="text-h5">Tipos de Produto</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <div class="campos-formulario campoDescriTipo">
                                    <label for="DescricaoTipo">
                                        Descrição
                                    </label>
                                    <input id="DescricaoTipo" type="text">
                                    <div class="explicacaoTipoTamanho">Ex: Pizza, Açai, Marmita, etc...</div>
                                </div>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="red"
                                text
                                @click="dialog = false"
                            >
                            Fechar
                            </v-btn>
                            <v-btn
                                color="green"
                                text
                                @click="dialog = false"
                            >
                                Salvar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
 
                <v-dialog
                    v-model="dialog2"
                    persistent
                    max-width="600px"
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                        class="botao-novoTipo"
                        v-bind="attrs"
                        v-on="on"
                        style="background-color:#3decb1"
                        >
                        <img src="@/assets/mais preto.png" alt="Voltar para Página anterior" class="imgTipoTamanho">
                        Novo Tamanho
                        </v-btn>
                    </template>
                    <v-card class="centralizarCard">
                        <v-card-title class="topoCardTamanho">
                            <span class="text-h5">Tamanhos de Produtos</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <div class="campos-formulario campoDescriTamanho">
                                    <label for="DescricaoTamanho">
                                        Descrição
                                    </label>
                                    <input id="DescricaoTamanho" type="text">
                                    <div class="explicacaoTipoTamanho">Ex: Pequeno, Médio, Grande, etc...</div>
                                </div>
                                <div class="campos-formulario campoSiglaTamanho">
                                    <label for="siglaTamanho">
                                        Sigla
                                    </label>
                                    <input id="siglaTamanho" type="text">
                                    <div class="explicacaoTipoTamanho">Ex: P, M, G</div>
                                </div>
      
                                <div class="campos-formulario campoTipoTamanho">
                                    <label for="tipoTamanho">
                                        Tipo do tamanho
                                    </label>

                                    <select class="input-select" id="tipoTamanho">
                                        <option value="valor1">Açai</option>
                                        <option value="valor2">Pizza</option>
                                        <option value="valor3">Marmita</option>
                                    </select>
                                    
                                </div>    
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="red"
                                text
                                @click="dialog2 = false"
                            >
                            Fechar
                            </v-btn>
                            <v-btn
                                color="green"
                                text
                                @click="dialog2 = false"
                            >
                                Salvar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

            </div>

        </div>

    
        <v-app>
            <div style="display:flex">
                <div class="divisoriaTabelas">
                    <v-data-table
                        :headers="headers"
                        :items="itens"  
                        hide-default-footer
                        style="height:100%"
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

                </div>
                <div class="divisoriaTabelas">
                    <v-data-table
                        :headers="tamanhos"
                        :items="itensTamanhos"  
                        hide-default-footer
                        style="height:100%"
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
                </div>
            </div>
        </v-app>
   
    </div>
</template>

<script>

    export default{
    name: 'TiposTamanhos',
    data: function(){
        return{
        dialog: false,
        dialog2: false,
        headers: [
          { text: 'Tipos', value: 'tipos' },
          { text: 'Ações', value: 'actions', sortable: false, },
        ],
        itens: [
          {
            tipos: 'Açai',
          },
          {
            tipos: 'Pizza',
          },

        ],
        tamanhos: [
          { text: 'Tamanhos', value: 'tamanhos' },
          { text: 'Sigla', value: 'sigla' },
          { text: 'Ações', value: 'actions', sortable: false,},
        ],
        itensTamanhos: [
          {
            tamanhos: '300ml',
            sigla: 'P'

          },
          {
            tamanhos: '500ml',
            sigla: 'M'
          },
          {
            tamanhos: '700ml',
            sigla: 'G'
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

    .header-tiposTamanhos{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 25px;
    }

    .titulo-tiposTamanhos{
        display: flex;
        flex-direction: column;
        max-width: 50%;
    }

    .titulo-tiposTamanhos h1{
        font-family: 'Rubik';
        font-size: 1.5rem;
        margin-right: 10px;
        margin-bottom: 10px;
    }

    .titulo-tiposTamanhos h2{
        font-family: 'Rubik';
        font-size: 0.8rem;
        margin-bottom: 0px;
    }
    
    /* ----------- BOTOES ---------------- */

    .botoesTiposTamanhos{
        display:flex;
    }

    .botao-novoTipo{
        display: flex;
        align-items: center;
        -content: center;
        background-color: #3decb1;
        padding: 10px;
        border-radius: 15px;
        cursor: pointer;
        text-decoration: none;
    }

    .botao-novoTipo:first-child{
        margin-right: 10px;
    }

    .botao-novoTipo:hover{
        text-decoration: none;
    }

    .botao-novoTipo img{
        width: 18px;
        height: 18px;
        margin-right: 10px;
    }

    .botao-novoTipo h1{
        font-family: 'Rubik';
        font-size: 1.2rem;
        color: white;
        margin: 0px;
    }

    .icone-lapis{
        width: 15px;
        height: 15px;
    }

    .imgTipoTamanho{
        width: 15px;
        height: 15px;
    }

    /* ----------- CAMPO ADD TAMANHO  ---------------- */

    .topoCardTamanho{
        background-color: #3decb1;
        width: 100%;
        display: flex;
        justify-content: center;
        
    }

    .topoCardTamanho span{
        text-align: center;
    }

    .centralizarCard{
        display:flex;
        flex-direction: column; 
        align-items:center;
    }

    .campoDescriTamanho{
        width: 100%;
    }
    
    .campoSiglaTamanho{
        width: 100%;
    }

    .campoTipoTamanho{
        width: 100%;
    }

    .explicacaoTipoTamanho{
        font-family: 'Poppins';
        font-size: 0.8rem;
        font-style: italic;
    }

    /* ----------- TABELAS ---------------- */

    .divisoriaTabelas{
        border: 2px solid black;
        width: 50%;
    }
</style>