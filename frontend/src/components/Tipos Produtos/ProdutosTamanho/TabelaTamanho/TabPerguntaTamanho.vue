<template>
    <div class="divTabPergunta">
        
        <div class="headerTabPergunta">
            <div class="headerTabPerguntaTamanho">
                <h1 class="tituloTabPerguntaTamanho">Selecione as perguntas do tamanho:</h1>
                <select class="input-select selectComplTamanho">
                    <option value="valor1">Broto (P)</option>
                    <option value="valor2">Média (M)</option>
                    <option value="valor3">Grande (G)</option>
                </select>
            </div>
            

            <v-app>
                <v-dialog
                    v-model="dialog"
                    persistent
                    max-width="1000px"
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                        class="botao-novaPergunta"
                        v-bind="attrs"
                        v-on="on"
                        
                        >
                        <img src="@/assets/mais preto.png" alt="Voltar para Página anterior" class="imgButtonPergunta">
                        Adicionar Pergunta
                        </v-btn>
                    </template>
                    <v-card class="centralizarCard">
                        <v-card-title class="topoCardTamanho">
                            <span class="text-h5">Selecione uma pergunta para vincular ao produto</span>

                        </v-card-title>
                        <v-card-text class="espacamentoTabPergunta">
                            <v-text-field
                                v-model="search2"
                                append-icon="mdi-magnify"
                                label="Buscar"
                                single-line
                                hide-details
                                class="buscarAdicionarPergunta"
                            ></v-text-field>
                            <template >
                                <v-data-table
                                    v-model="selected"
                                    :headers="headers2"
                                    :items="desserts2"
                                    :search="search2"
                                    :single-select="singleSelect"
                                    item-key="codigo"
                                    show-select
                                    class="elevation-1"
                                >

                                </v-data-table>
                            </template>
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
            </v-app>

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
         name: 'TabPergunta',
         data(){
             return{
                dialog: false,
                reveal: false,
                search: '',
                search2: '',
                headers: [
                { text: 'Tipo',value: 'tipo' },
                { text: 'Ordem', value: 'ordem' },
                { text: 'Pergunta', value: 'pergunta' },
                { text: 'Opções de Resposta', value: 'opcoesResposta' },
                { text: 'Excluir', value: 'actions', sortable: false },
                ],
                itens: [
                {
                    tipo: 'Compl.',
                    ordem: '1',
                    pergunta: 'Quais frutas deseja?',
                    opcoesResposta: 'Abacaxi, Banana, Kiwi, Uva'
                },
                {
                    tipo: 'Prod.',
                    ordem: '2',
                    pergunta: 'Quais confeitos deseja?',
                    opcoesResposta: 'Abacaxi, Banana, Kiwi, Uva'
                },
                {
                    tipo: 'Compl.',
                    ordem: '3',
                    pergunta: 'Quais frutas deseja?',
                    opcoesResposta: 'Abacaxi, Banana, Kiwi, Uva'
                },
                ],

                singleSelect: true,
                selected: [],
                headers2: [
                {
                    text: 'Cod.',
                    align: 'start',
                    sortable: false,
                    value: 'codigo',
                },
                { text: 'Tipo das Respostas', value: 'tiposRespostas' },
                { text: 'Pergunta', value: 'pergunta' },
                { text: 'Opções de Respostas', value: 'opcoesRespostas' },

                ],
                desserts2: [
                {
                    codigo: 2,
                    tiposRespostas: 'Compl.',
                    pergunta: 'Deseja Molho?',
                    opcoesRespostas: 'Molho Branco, Molho Vermelho, Molho de Queijo',
                },
                {
                    codigo: 3,
                    tiposRespostas: 'Obs.',
                    pergunta: 'Qual salada deseja?',
                    opcoesRespostas: 'Alface, Couve',
                },
                {
                    codigo: 4,
                    tiposRespostas: 'Obs.',
                    pergunta:'Qual o tipo de massa?',
                    opcoesRespostas: 'Massa espanhola',
                },
                {
                    codigo: 5,
                    tiposRespostas: 'Prod.',
                    pergunta: 'Deseja Bebida?',
                    opcoesRespostas: 'Coca-cola, kuat, sprite',
                },
                {
                    codigo: 6,
                    tiposRespostas: 'Obs.',
                    pergunta: 'Deseja talher?',
                    opcoesRespostas: 'Sim, Não',
                },

                ],



             };
         },
 
     }
 </script>
 
 <style scoped>

    .divTabPergunta{
        background-color: white;
        padding: 20px;
    }

    .headerTabPergunta{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        background-color: #3decb1;
    }

    .tituloTabPerguntaTamanho{
        font-size: 1rem;
        font-family: 'Poppins';
        margin-bottom: 0px;
        padding: 10px 10px 10px 10px;
    
    }

    .dialogTabPergunta{
        display: flex;
        flex-direction: column;
    }

    .botao-novaPergunta{
        display: flex;
        align-items: center;
        text-decoration: none;
    }

    .imgButtonPergunta{
        margin-right: 5px;
        width: 18px;
        height: 18px;
    }

    .espacamentoTabPergunta{
        margin-top: 10px;
    }

    .buscarAdicionarPergunta{
        margin-bottom: 15px;
        border: 1px solid black;
        padding: 5px;
        border-radius: 5px;
    }

    .headerTabPerguntaTamanho{
        display: flex;
    }

 </style>