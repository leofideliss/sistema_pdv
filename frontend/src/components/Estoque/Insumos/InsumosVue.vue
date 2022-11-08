<template>
  <div class="insumo-pages espacamento20geral">
    <div class="header-insumo">
      <div class="titulo-insumo">
        <h1>Insumos</h1>
        <h2>({{ insumos.length }})</h2>
      </div>
      <router-link to="/novoInsumos" class="botao-novo">
        <img src="@/assets/mais preto.png" alt="Icone de somar" />
        <h1>Novo</h1>
      </router-link>
    </div>

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
        :items="insumos"
        :search="search"
        no-data-text="Nenhum registro encontrado!"
        no-results-text="Nenhuma categoria encontrada!"
      >
        <template v-slot:top>
          <v-dialog v-model="dialogDelete" max-width="600px">
            <v-card>
              <v-card-title class="text-h5"
                >Tem certeza que deseja excluir este insumo?</v-card-title
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
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon dense class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon dense @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { baseApiUrl } from "@/global";
import axios from "axios";
export default {
  name: "InsumosVue",
  data: function () {
    return {
      search: "",
      headers: [
        {
          text: "Código",
          align: "start",
          filterable: false,
          value: "id",
        },
        { text: "Nome", value: "nomeInsumo" },
        { text: "Categoria", value: "nomeCategoria" },
        { text: "Preço Custo", value: "preco" },
        { text: "Medida", value: "medida" },
        { text: "Ações", value: "actions" },
      ],
      insumos: [],
      dialogDelete: false,
    };
  },
  methods: {
    getAllInsumos() {
      axios
        .get(`${baseApiUrl}/insumo`)
        .then((res) => {
          this.insumos = res.data;
          this.insumos.forEach((element) => {
            element.preco = element.preco.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            });
          });
        })
        .catch();
    },
    editItem(item) {
      this.$router.push({ path: `/alterarInsumo/${item.id}` });
    },
    deleteItem(item) {
      this.dialogDelete = true;
      this.insumos.id = item.id;
    },
    confirmDelete() {
      axios
        .delete(`${baseApiUrl}/insumo/${this.insumos.id}`)
        .then(() => {
          this.getAllInsumos();
          this.dialogDelete = false;
        })
        .catch();
    },
    closeDelete() {
      this.dialogDelete = false;
    },
  },
  mounted() {
    this.getAllInsumos();
  },
};
</script>

<style>
body {
  font-family: "Poppins";
}

.header-insumo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.titulo-insumo {
  display: flex;
  align-items: center;
}

.titulo-insumo h1 {
  font-family: "Rubik";
  font-size: 1.5rem;
  margin-right: 10px;
  margin-bottom: 0px;
}

.titulo-insumo h2 {
  font-family: "Rubik";
  font-size: 1.5rem;
  margin-bottom: 0px;
}

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
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.botao-novo h1 {
  font-family: "Rubik";
  font-size: 1.2rem;
  color: white;
  margin: 0px;
}

.icone-lapis {
  width: 18px;
  height: 18px;
}
</style>