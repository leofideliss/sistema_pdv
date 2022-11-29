<template>
  <div class="perguntas-pages espacamento20geral">
    <div class="header-perguntas">
      <div class="titulo-perguntas">
        <h1>Perguntas</h1>
        <h2>({{ perguntas.length }})</h2>
      </div>
      <router-link to="/novaPergunta" class="botao-novo">
        <img src="@/assets/mais preto.png" alt="Icone de somar" />
        <h1>Novo</h1>
      </router-link>
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
        <v-data-table :headers="headers" :items="perguntas" :search="search">
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon dense class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon dense @click="deleteItem(item)"> mdi-delete </v-icon>
            <v-dialog v-model="dialogDelete" max-width="600px">
              <v-card>
                <v-card-title class="text-h5"
                  >Tem certeza que deseja excluir esta pergunta?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancelar</v-btn
                  >
                  <v-btn color="blue darken-1" @click="confirmDelete" text
                    >Confirmar</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
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
  name: "ListaPerguntas",
  data: function () {
    return {
      search: "",
      headers: [
        { text: "Cod.", align: "start", value: "id" },
        { text: "Tipo das Respostas", align: "start", value: "tipo" },
        { text: "Pergunta", align: "start", value: "pergunta" },
        { text: "Ações", value: "actions", sortable: false },
      ],
      perguntas: [],
      pergunta:{},
      dialogDelete : false,
    };
  },
  methods: {
    getAllPerguntas() {
      axios
        .get(`${baseApiUrl}/perguntas`)
        .then((res) => {
          this.perguntas = res.data;
        })
        .catch();
    },
    editItem(item) {
      this.$router.push({ path: `/alterarPergunta/${item.id}` });
    },
    deleteItem(item) {
      this.dialogDelete = true;
      this.pergunta.id = item.id;
    },
    confirmDelete() {
      axios
        .delete(`${baseApiUrl}/perguntas/${this.pergunta.id}`)
        .then(() => {
          this.getAllPerguntas();
          this.dialogDelete = false;
        })
        .catch();
    },
    closeDelete() {
      this.dialogDelete = false;
    },
  },
  created(){
    this.getAllPerguntas()
  },
  updated(){
    this.$store.commit("resetComplementosPerg");
    this.$store.commit("resetObservacaoPerg");

  }
};
</script>

<style>
body {
  font-family: "Poppins";
}

.header-perguntas {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.titulo-perguntas {
  display: flex;
  align-items: center;
}

.titulo-perguntas h1 {
  font-family: "Rubik";
  font-size: 1.5rem;
  margin-right: 10px;
  margin-bottom: 0px;
}

.titulo-perguntas h2 {
  font-family: "Rubik";
  font-size: 1.5rem;
  margin-bottom: 0px;
}

/* ---- BOTAO ----- */

.botao-novo {
  display: flex;
  align-items: center;
  -content: center;
  background-color: #3decb1;
  padding: 10px;
  border-radius: 15px;
  cursor: pointer;
  text-decoration: none;
}

.botao-novo:hover {
  text-decoration: none;
}

.botao-novo img {
  width: 16px;
  height: 16px;
  margin-right: 10px;
}

.botao-novo h1 {
  font-family: "poppins";
  font-size: 1rem;
  color: black;
  margin: 0px;
}

.icone-lapis {
  width: 18px;
  height: 18px;
}
</style>