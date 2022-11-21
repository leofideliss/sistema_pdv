<template>

    <v-dialog
        v-model="dialog"
        persistent
        max-width="800px"
        >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
            class="botao-novoTipo"
            v-bind="attrs"
            v-on="on"
            style="background-color:#3decb1"
            >
            <img src="@/assets/mais preto.png" alt="Voltar para Página anterior" class="imgTipoTamanho">
            Adicionar
            </v-btn>
        </template>
        <v-card class="centralizarCard">
            <v-card-title class="topoCardTamanho">
                <span class="text-h5">Selecionar Produtos</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <div class="divisaoTabelaProduto">
                        <div class="headerTabelaProduto">
                            <div class="porcentagemNomeTabelaProduto">
                                <span class="spanTextoTabela textoInicial">Selecione por Produto</span>
                            </div>
                            <div class="porcentagemQtdeMaxima">
                                <span class="spanTextoTabela">Qtde Máxima Permitida</span>
                            </div>
                            <div class="porcentagemPrecoVenda">
                                <span class="spanTextoTabela">Preço de Venda</span>
                            </div>
                            <div class="porcentagemPrecoPromo">
                                <span class="spanTextoTabela">Preço Promo</span>
                            </div>
                        </div>
                        <div class="interiorTabelaProduto">
                            <div v-for="n in 6" :key="n">
                            <ItemTabelaProduto></ItemTabelaProduto>
                        </div>
                            <!-- <ItemTabelaProduto></ItemTabelaProduto>
                            <ItemTabelaProduto></ItemTabelaProduto>

                            <ItemTabelaProduto></ItemTabelaProduto>
                            <ItemTabelaProduto></ItemTabelaProduto>
                            <ItemTabelaProduto></ItemTabelaProduto>
                            <ItemTabelaProduto></ItemTabelaProduto>
                            <ItemTabelaProduto></ItemTabelaProduto>
                            <ItemTabelaProduto></ItemTabelaProduto>
                            <ItemTabelaProduto></ItemTabelaProduto>
                            <ItemTabelaProduto></ItemTabelaProduto>
                            <ItemTabelaProduto></ItemTabelaProduto> -->

                        </div>

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
</template>

<script>
        import ItemTabelaProduto from '@/components/Produtos/Perguntas/TabelasPerguntas/TabelaProduto.vue'

    export default{
        name: 'DialogPerguntaProduto',
        components:{
            ItemTabelaProduto
        },
        data(){
            return {
                dialog: false,
            }
        }
    }
    
</script>

<style scoped>

    .headerTabelaProduto{
        display: flex;
    }

    .porcentagemNomeTabelaProduto{
        width: 40%;
        border: 1px solid black;
        padding-top: 10px;
        padding-bottom: 10px;
    }

    .porcentagemQtdeMaxima{
        width: 23%;
        border: 1px solid black;
        padding-top: 10px;
        padding-bottom: 10px;
        display: flex;
        justify-content: center;
    }

    .porcentagemPrecoPromo{
        width: 22%;
        border: 1px solid black;
        padding-top: 10px;
        padding-bottom: 10px;
        display: flex;
        justify-content: center;
    }

    .porcentagemPrecoVenda{
        width: 16%;
        border: 1px solid black;
        padding-top: 10px;
        padding-bottom: 10px;
        display: flex;
        justify-content: center;
    }

    .spanTextoTabela{
        font-family: 'Poppins';
        font-size: 0.7rem;
        color: black;
       
    }

    .divisaoTabelaProduto{
        border: 1px solid black;
    }

    .textoInicial{
        padding-left: 5px;
    }

    .interiorTabelaProduto{
        max-height: 500px;
        overflow-y: scroll;
    }
</style>