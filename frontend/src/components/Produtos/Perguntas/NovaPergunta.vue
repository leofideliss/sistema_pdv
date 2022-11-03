<template>
    <div class="NovaPergunta-pages">
        <div class="headerNovaPergunta">
            <router-link to='/perguntas' class="botaoVoltar">
                <img src="@/assets/seta-esquerda.png" alt="Voltar para Página anterior">
                <h1>Voltar</h1>
            </router-link>

            <h1>
                Adicionar Nova Pergunta
            </h1>
        </div>

        <form action="" class="fomularioComplemento">

            <div class="divPerguntas">
                <div class="divFormPerguntas">
                    <div class="primeiraLinha">
                        <div class="personalizarCampos">
                            <div class="campos-formulario campoPergunta">
                                <label for="nomePergunta">
                                    Pergunta
                                </label>
                                <input id="nomePergunta" type="text">
                            </div>
                        </div>
                    </div>

                    <div class="tipoResposta">

                        <label class="labelTipoResposta">Tipo da resposta</label>
                        <v-radio-group
                        v-model="row"
                        row
                        >
                            <div class="radioTipoResposta">
                                <v-radio
                        
                                value="radio-1"
                                ></v-radio>
                                <span>Observação</span>
                            </div>

                            <div class="radioTipoResposta">
                                <v-radio
                        
                                value="radio-2"
                                ></v-radio>
                                <span>Complemento</span>
                            </div>
                            <div class="radioTipoResposta">
                                <v-radio
                        
                                value="radio-3"
                                ></v-radio>
                                <span>Produto</span>
                            </div>
                        </v-radio-group>
                    </div>

                    <div class="divOpcoesRespostas">
                        <div class="headerDivOpcoesRespostas">
                            <span>Opções de Respostas</span>
                        
                            <DialogPerguntaComplemento></DialogPerguntaComplemento>
                            <DialogPerguntaObservacao></DialogPerguntaObservacao>
                            <DialogPerguntaProduto></DialogPerguntaProduto>
                        </div>
                        
                        <v-app>
                            <v-card>

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

                    <div class="respostaObrigatoria">
                        <label class="labelTipoResposta">Resposta Obrigatória</label>
                        <v-radio-group
                        v-model="row"
                        row
                        >
                            <div class="radioTipoResposta">
                                <v-radio
                        
                                value="radio-1"
                                ></v-radio>
                                <span>Sim</span>
                            </div>

                            <div class="radioTipoResposta">
                                <v-radio
                        
                                value="radio-2"
                                ></v-radio>
                                <span>Não</span>
                            </div>

                        </v-radio-group>
                    </div>

                    <div class="qtasRespostasEscolher">
                        <label class="labelTipoResposta">Quantas opções de respostas pode escolher?</label>
                        <div class="divMinMax">
                            <div class="divMin">
                                <span>No mínimo:</span>
                                <input type="number" id="quantity" name="quantity" min="0" max="5" class="inputMinMax"/>
                            </div>
                            <div>
                                <span>No máximo:</span>
                                <input type="number" id="quantity" name="quantity" min="0" max="5" class="inputMinMax"/>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="listaProdVinculados">
                    <h1>Produtos Vinculados</h1>

                    <div class="divListaProdVinculados">
                        <v-app>
                            <v-simple-table>
                                <template v-slot:default>

                                <tbody>
                                    <tr
                                    v-for="item in produtos"
                                    :key="item.nome"
                                    >
                                    <td>{{ item.nome }}</td>
                                    
                                    </tr>
                                </tbody>
                                </template>
                            </v-simple-table>
                        </v-app>
                    </div>

                </div>
            </div>





            <div class="botaos-form">
                <button class="botao-cancelar">
                    Cancelar
                </button>
                <button class="botao-salvar">
                    Salvar
                </button>                
            </div>

        </form>
    </div>
</template>

<script>

    import DialogPerguntaObservacao from '@/components/Produtos/Perguntas/dialogPerguntas/DialogPerguntaObservacao.vue'
    import DialogPerguntaComplemento from '@/components/Produtos/Perguntas/dialogPerguntas/DialogPerguntaComplemento.vue'
    import DialogPerguntaProduto from '@/components/Produtos/Perguntas/dialogPerguntas/DialogPerguntaProduto.vue'

    export default{
    name: 'NovaObservacao',
    components:{
        DialogPerguntaComplemento,
        DialogPerguntaObservacao,
        DialogPerguntaProduto
    },
    data(){
        return{
            dialog: false,
            headers: [
            { text: 'Tipo', value: 'tipo' },
            { text: 'Opção', value: 'opcao' },
            { text: 'Qtde Permitida', value: 'qtdPermitida' },
            { text: 'Excluir', value: 'actions', sortable:false},
            ],
            itens: [
                {
                    tipo: 'Compl.',
                    opcao: 'Alface - 0,50',
                    qtdPermitida: '1'
                },
                {
                    tipo: 'Compl.',
                    opcao: 'Bacon - 3,50',
                    qtdPermitida: '3'
                },
                {
                    tipo: 'Compl.',
                    opcao: 'Cebola - 1,50',
                    qtdPermitida: '2'
                },
            ],
            produtos: [
                {
                    nome: 'Frozen Yogurt',

                },
                {
                    nome: 'Ice cream sandwich',
                    
                },
                {
                    nome: 'Eclair',
                    
                },
                {
                    nome: 'Cupcake',
                    
                },
                {
                    nome: 'Gingerbread',
                    
                },
                {
                    nome: 'Jelly bean',
                    
                },
                {
                    nome: 'Lollipop',
                    
                },
                {
                    nome: 'Honeycomb',
                    
                },

            ],
        }
    }
    }
</script>

<style scoped>
    .headerNovaPergunta{
        display: flex;
        margin-bottom: 20px;
    }

    .headerNovaPergunta a{
        width: 80px;
    }

    .headerNovaPergunta h1{
        font-size: 1.6rem;
        width: 90%;
        text-align: center;
        margin-bottom: 0px;
    }

    .botaoVoltar{
        display: flex;
        align-items: center;
        text-decoration: none;
    }

    .botaoVoltar:hover{
        text-decoration: none;
    }

    .botaoVoltar img{
        width: 13px;
        height: 13px;
        margin-right: 10px;
    }

    .botaoVoltar h1{
        color: black;
        font-family: 'Rubik';
        font-size: 1.3rem;
        margin-bottom: 0px;
    }

    .fomularioComplemento{
        padding: 20px;
        display: flex;
        flex-direction: column;
        background-color: #f2f2f2;
        border-radius: 20px;
    }

    .primeiraLinha{
        display: flex;
        width: 100%;
        justify-content: space-between;
    }

    .personalizarCampos{
        display: flex;
        width: 100%;
    }

    .campos-formulario{
        display: flex;
        flex-direction: column;
        transition: .3s;
        margin: 10px
    }

    .campos-formulario label{
        font-family: 'Poppins';
        margin-bottom: 5px;
        font-size: 0.9rem;

    }

    .campos-formulario input{
        border: 1px solid black;
        outline: none; /*borda que aparece quando clicamos*/
        padding: 5px;
        background:white;
        font-size: 0.8rem;
        font-family: 'Poppins';
        border-radius: 5px;
    }

    .campoPergunta{
        width: 100%;
    }

    .botaos-form{
        display: flex;
        justify-content: end;
        margin-top: 50px;
    }

    .botaos-form button{
        padding: 10px 15px 10px 15px;
        border: none;
        border-radius: 10px;
        color: #def7f4;
        outline: none;
        cursor: pointer;
        font-size: 1rem;
        font-family: "Rubik";
        transition: .3s;
    }

    .botao-cancelar{
        background-color: #ff3131;
        margin-right: 15px;
    }

    .botao-cancelar:hover{
        background-color: #f95858;
    }

    .botao-salvar{
        background-color: #008000;
    }

    .botao-salvar:hover{
        background-color: #00b300;
    }

    .v-text-field{
        padding-top: 0px !important;
        margin-top: 0px !important;
    }

    .v-text-field input{
        padding: 5px !important;
    }

    .v-text-field > .v-input__control > .v-input__slot:before{
        border-style: none !important;
    }

    .input-select{
        border: 1px solid black;
        outline: none; /*borda que aparece quando clicamos*/
        padding: 5px;
        background:white;
        font-size: 0.8rem;
        font-family: 'Poppins';
        border-radius: 5px;
    }

    /* -----   FORMULARIOS PERGUNTAS   ------*/

    .divPerguntas{
        display: flex;
        justify-content: space-between;
    }

    .divFormPerguntas{
        width: 69%;
        border: 1px solid black;
        padding: 15px;
        border-radius: 15px;
    }

    .radioTipoResposta{
        display: flex;
        align-items: center;
        margin-right: 20px;
    }

    .radioTipoResposta span{
        font-family: 'Poppins';
        
        font-size: 0.9rem;
    }

    .v-input--radio-group.v-input--radio-group--row .v-radio{
        margin-right: 5px;
    }

    .labelTipoResposta {
        font-family: 'Poppins';
        margin-bottom: 5px;
        font-size: 0.9rem;

    }

    .tipoResposta{
        padding: 10px;
    }

    /* ----  PRODUTOS VINCULADOS ----*/

    .listaProdVinculados{
        width: 30%;
        border: 1px solid black;
        background-color: white;
        border-radius: 15px;
    }

    .listaProdVinculados h1{
        background-color: #3decb1;
        border-radius: 15px 15px 0px 0px;
        font-family: 'Poppins';
        margin-bottom: 0px;
        padding: 15px;
        text-align: center;
        font-size: 1.2rem;
        border-bottom: 1px solid black;
    }

    .divListaProdVinculados{
        border-radius: 0px 0px 15px 15px;
        max-height: 100%;
        overflow-y: scroll;
    }

    /* ------ OPÇOES DE RESPOSTAS --------*/

    .divOpcoesRespostas{
        padding: 15px;
    }

    .headerDivOpcoesRespostas{
        display: flex;
        justify-content: space-between;
        align-items:flex-end;
        margin-bottom: 20px;
    }

    .respostaObrigatoria{
        padding: 15px;
    }

    .qtasRespostasEscolher{
        padding: 15px;
    }

    .divMinMax{
        display: flex;
        margin-top: 10px;
    }

    .divMinMax span{
        font-family: 'Poppins';
        margin-bottom: 5px;
        font-size: 0.9rem;
        margin-right: 10px;
    }

    .divMin{
        margin-right: 30px;
    }

    .inputMinMax{
        border: 1px solid black;
        border-radius: 8px;
        background-color: white;
        text-align: center;
    }

</style>