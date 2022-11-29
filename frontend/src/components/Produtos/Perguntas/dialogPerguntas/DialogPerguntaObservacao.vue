<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="botao-novoTipo"
        v-bind="attrs"
        v-on="on"
        style="background-color: #3decb1"
      >
        <img
          src="@/assets/mais preto.png"
          alt="Voltar para Página anterior"
          class="imgTipoTamanho"
        />
        Adicionar
      </v-btn>
    </template>
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-card class="centralizarCard">
        <v-card-title class="topoCardTamanho">
          <span class="text-h5">Nova Opção de Resposta - Observação</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <div class="campos-formulario campoDescriTipo">
              <label for="RespostaObservacao"> Resposta </label>
              <v-text-field
                id="DescricaoTipo"
                v-model="desc"
                :rules="descRules"
              ></v-text-field>
            </div>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click.prevent="dialog = false">
            Fechar
          </v-btn>
          <v-btn color="green" text @click.prevent="addObservacao">
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
export default {
  name: "DialogPerguntaObservacao",
  data() {
    return {
      desc: "",

      valid: true,
      descRules: [(v) => !!v || "Descrição é obrigatório"],

      dialog: false,
    };
  },
  methods: {
    addObservacao() {

      this.$store.commit("setObservacaoPerg",{tipo:'Observação',descricao: this.desc});
      this.dialog = false;
    },
  },
};
</script>

<style scoped>
</style>