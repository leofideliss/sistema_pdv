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
                            <span class="text-h5">Selecionar itens</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <div class="headerCamposFormularios">
                                    <div class="campos-formularioCombo tamNomeItem">
                                        <label for="NomeItemCombo">
                                            Nome do Item no Combo
                                        </label>
                                        <input id="NomeItemCombo" type="text">
                                        <div class="explicacaoTipoTamanho">Ex: Lanche, Refrigerante, Suco...</div>
                                    </div>
                                    <div class="campos-formularioCombo tamQuantCombo">
                                            
                                            <span>Quantidade</span>
                                            <input type="number" id="quantity" name="quantity" min="0" max="5" class="inputQuantCombo"/>
                                        
                                    </div>
                                    <div class="campos-formularioCombo tamPrecoCombo">
                                        <label for="precoVendaCombo">
                                            Preço de Venda
                                        </label>
                                        <v-currency-field id="precoVendaCombo" />
                                    </div>
                                </div>
                                <div class="listaItensCombo">
                                    <span>Selecione as opções de produtos para esse item (mínimo 1):</span>
                                    <v-app>
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
                                            v-model="selected"
                                            :headers="headers"
                                            :items="desserts"
                                            :search="search"
                                            
                                            item-key="name"
                                            show-select
                                            class="elevation-1"
                                        >
                                        </v-data-table>
                                    </v-app>
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
export default{
    name: 'ItensCombo',
    data(){
        return{
            dialog: false,
            
            selected: [],
            search: '',
            headers: [
            {
            text: 'Selecione o Produto',
            align: 'start',
            sortable: false,
            value: 'name',
            },
            { text: 'Preço Original', value: 'precoOriginal' },
            ],
            desserts: [
            {
                name: 'Frozen Yogurt',
                precoOriginal: 159,

            },
            {
                name: 'Ice Cream',
                precoOriginal: 19,
            },
            ]
        }
    }
}
</script>

<style scoped>

    .headerCamposFormularios{
        display: flex;
    }


    /* ----- HEADER FORMULARIO ---------- */ 

    .tamNomeItem{
        width: 50%;
        padding: 10px;
    }

    .tamNomeItem input{
        width: 100%;
        border: 1px solid black;
        border-radius: 5px;
        padding: 5px;
    }

    .inputQuantCombo{
        border: 1px solid black;
        border-radius: 5px;
        padding: 5px;
        text-align: center;
    }

    .tamQuantCombo{
        display: flex;
        flex-direction: column;
        width: 20%;
        padding: 10px;
        height: 100%;
    }

    .tamQuantCombo span{
        margin-bottom: 0.5rem;
        
    }

    .tamPrecoCombo{
        width: 30%;
        padding: 10px;
    }

    #precoVendaCombo{
        border: 1px solid black;
        border-radius: 5px;
        padding: 5px;
        outline: none;
        font-size: 0.8rem;
        font-family: 'Poppins';
    }

    .listaItensCombo{
        margin-top: 10px;
    }

    .listaItensCombo span{
        font-weight: bold;
    }
</style>