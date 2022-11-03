<template>

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
            Adicionar
            </v-btn>
        </template>
        <v-card class="centralizarCard">
            <v-card-title class="topoCardTamanho">
                <span class="text-h5">Nova Opção de Resposta - Observação</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <div class="campos-formulario campoDescriTipo">
                        <label for="RespostaObservacao">
                            Resposta
                        </label>
                        <input id="DescricaoTipo" type="text">

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
        name: 'DialogPerguntaObservacao',
        data(){
            return{
                dialog: false,
            }
        }
    }
</script>

<style scoped>
</style>