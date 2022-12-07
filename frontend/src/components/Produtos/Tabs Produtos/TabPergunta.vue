<template>
  <div class="divTabPergunta">
    <div class="headerTabPergunta">
      <h1 class="tituloTabPergunta">Selecione as perguntas do produto</h1>

      <v-app>
        <v-dialog v-model="dialog" persistent max-width="1000px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="botao-novaPergunta" v-bind="attrs" v-on="on">
              <img
                src="@/assets/mais preto.png"
                alt="Voltar para Página anterior"
                class="imgButtonPergunta"
              />
              Adicionar Pergunta
            </v-btn>
          </template>
          <v-card class="centralizarCard">
            <v-card-title class="topoCardTamanho">
              <span class="text-h5"
                >Selecione uma pergunta para vincular ao produto</span
              >
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
              <template>
                <v-data-table
                  v-model="selectPerguntas"
                  :headers="headersPerguntas"
                  :items="perguntas"
                  :search="search2"
                  show-select
                  class="elevation-1"
                >
                </v-data-table>
              </template>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red" text @click="dialog = false"> Fechar </v-btn>
              <v-btn color="green" text @click="dialog = false"> Salvar </v-btn>
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
          :items="selectPerguntas"
          :search="search"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon dense @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-app>
  </div>
</template>
 
 <script>
import axios from "axios";
import { baseApiUrl } from "@/global";
export default {
  name: "TabPergunta",
  data() {
    return {
      dialog: false,
      reveal: false,
      search: "",
      search2: "",
      headers: [
        { text: "Tipo", value: "tipo" },
        // { text: "Ordem", value: "ordem" },
        { text: "Pergunta", value: "pergunta" },
        { text: "Opções de Resposta", value: "opcoesRespostas" },
        { text: "Excluir", value: "actions", sortable: false },
      ],
      itens: [],
      singleSelect: true,
      selected: [],
      headersPerguntas: [
        {
          text: "Cod.",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "Tipo das Respostas", value: "tipo" },
        { text: "Pergunta", value: "pergunta" },
        { text: "Opções de Respostas", value: "opcoesRespostas" },
      ],
      perguntas: [],
      perguntasObs: [],
    };
  },
  computed: {
    selectPerguntas: {
      get() {
        return this.$store.state.produto.item.selectPerguntas;
      },
      set(value) {
        this.$store.commit("alteraPerguntasProduto", value);
      },
    },
  },
  methods: {
    getAllPerguntas() {
      axios
        .get(`${baseApiUrl}/perguntas`)
        .then((res) => {
          res.data.forEach((element) => {
            var respostas = {};
            if (element.tipo == "observacao")
              respostas = this.getPerguntaByIdObs(element.id);
            if (element.tipo == "complemento")
              respostas = this.getPerguntaByIdComp(element.id);
            var objPergunta = {
              id: element.id,
              tipo: element.tipo,
              pergunta: element.pergunta,
              opcoesRespostas: respostas,
            };
            this.perguntas.push(objPergunta);
          });
        })
        .catch();
    },
    getPerguntaByIdObs(id) {
      var respostas = [];
      axios
        .get(`${baseApiUrl}/perguntasObservacao/${id}`)
        .then((res) => {
          res.data.forEach((element) => {
            respostas.push(element.descricao);
          });
        })
        .catch();
      return respostas;
    },
    getPerguntaByIdComp(id) {
      var respostas = [];
      axios
        .get(`${baseApiUrl}/perguntasComplemento/${id}`)
        .then((res) => {
          res.data.forEach((element) => {
            respostas.push(element.nome);
          });
        })
        .catch();
      return respostas;
    },
  },
  created() {
    this.getAllPerguntas();
    // this.getPerguntaByIdObs();
  },
};
</script>
 
 <style scoped>
.divTabPergunta {
  background-color: white;
  padding: 20px;
}

.headerTabPergunta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #3decb1;
}

.tituloTabPergunta {
  font-size: 1.2rem;
  font-family: "Poppins";
  margin-bottom: 0px;
  padding: 10px 10px 10px 10px;
  text-transform: uppercase;
}

.dialogTabPergunta {
  display: flex;
  flex-direction: column;
}

.botao-novaPergunta {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.imgButtonPergunta {
  margin-right: 5px;
  width: 18px;
  height: 18px;
}

.espacamentoTabPergunta {
  margin-top: 10px;
}

.buscarAdicionarPergunta {
  margin-bottom: 15px;
  border: 1px solid black;
  padding: 5px;
  border-radius: 5px;
}
</style>