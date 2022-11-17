<template>
  <div class="observacoes-pages espacamento20geral">
    <div class="header-observacoes">
      <div class="titulo-observacoes">
        <h1>Observações</h1>
        <h2>({{ observacoes.length }})</h2>
      </div>
      <router-link to="/novaObservacao" class="botao-novo">
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
        <v-data-table :headers="headers" :items="observacoes" :search="search">
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon dense class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon dense @click="deleteItem(item)"> mdi-delete </v-icon>

            <v-dialog v-model="dialogDelete" max-width="600px">
              <v-card>
                <v-card-title class="text-h5"
                  >Tem certeza que deseja excluir esta observação?</v-card-title
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
  name: "ListaObservacoes",
  data: function () {
    return {
      dialogDelete: false,
      search: "",
      headers: [
        { text: "Descrição", align: "start", value: "descricao" },
        { text: "Categorias Vinculadas", value: "categoria" },
        { text: "Ações", value: "actions", sortable: false },
      ],
      observacoes: [],
      observacao: {},
    };
  },
  methods: {
    getAllObservacoes() {
      this.observacoes = []
      axios
        .get(`${baseApiUrl}/observacaoCategorias`)
        .then((res) => {
          const grouped = res.data.reduce((acumulador, obs) => {
            if (!acumulador[obs.descricao]) {
              acumulador[obs.descricao] = [];
            }
            acumulador[obs.descricao].push(obs.categoria);
            return acumulador;
          }, {});
          this.tabelaFormatada(grouped);
        })
        .catch();
    },
    tabelaFormatada(grouped) {
      for (let i = 0; i < Object.keys(grouped).length; i++) {
        let obj = {
          descricao: Object.keys(grouped)[i],
          categoria: Object.values(grouped)[i],
        };
        this.observacoes.push(obj);
      }
    },
    editItem(item) {
      this.$router.push({ path: `/alteraObservacao/${item.descricao}` });
    },
    deleteItem(item) {
      this.dialogDelete = true;
      this.observacao.descricao = item.descricao;
    },
    confirmDelete() {
      axios
        .delete(`${baseApiUrl}/observacao/${this.observacao.descricao}`)
        .then(() => {
          this.getAllObservacoes();
          this.dialogDelete = false;
        })
        .catch();
    },
    closeDelete() {
      this.dialogDelete = false;
    },
  },
  created() {
    this.getAllObservacoes();
  },
};
</script>

<style>
body {
  font-family: "Poppins";
}

.header-observacoes {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.titulo-observacoes {
  display: flex;
  align-items: center;
}

.titulo-observacoes h1 {
  font-family: "Rubik";
  font-size: 1.5rem;
  margin-right: 10px;
  margin-bottom: 0px;
}

.titulo-observacoes h2 {
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