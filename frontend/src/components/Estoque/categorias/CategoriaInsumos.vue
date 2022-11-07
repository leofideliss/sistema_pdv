<template>
  <div class="categoria-pages espacamento20geral">
    <div class="header-categoria">
      <div class="titulo-categoria">
        <h1>Categorias Insumos</h1>
        <h2>({{categoriasInsumo.length}})</h2>
      </div>
      <router-link to="/novaCategoriaInsumo" class="botao-novo">
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
        :items="categoriasInsumo"
        :search="search"
        no-data-text="Nenhum registro encontrado!"
        no-results-text="Nenhuma categoria encontrada!"
      >
        <template v-slot:top>
          <v-dialog v-model="dialogDelete" max-width="600px">
            <v-card>
              <v-card-title class="text-h5"
                >Tem certeza que deseja excluir esta categoria?</v-card-title
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
import axios from "axios";
import { baseApiUrl } from "@/global";
export default {
  name: "CategoriaInsumos",
  data: function () {
    return {
      insumo: {},
      dialogDelete: false,
      search: "",
      headers: [
        { text: "Nome", value: "nome" },
        { text: "Ações", value: "actions" },
      ],
      categoriasInsumo: [],
    };
  },
  methods: {
    getAllCategoriaInsumo() {
      axios
        .get(`${baseApiUrl}/insumo`)
        .then((res) => {
          this.categoriasInsumo = res.data;
        })
        .catch();
    },
    editItem(item) {
      this.$router.push({ path: `/alterarCategoriaInsumo/${item.id}` });
    },
    deleteItem(item) {
      this.dialogDelete = true;
      this.insumo.id = item.id;
    },
    confirmDelete() {
      console.log(this.insumo.id);
      axios
        .delete(`${baseApiUrl}/insumo/${this.insumo.id}`)
        .then(() => {
          this.getAllCategoriaInsumo();
          this.dialogDelete = false;
        })
        .catch();
    },
    closeDelete() {
      this.dialogDelete = false;
    },
  },
  watch: {
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created() {
    this.getAllCategoriaInsumo();
  },
};
</script>

<style>
body {
  font-family: "Poppins";
}

.header-categoria {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.titulo-categoria {
  display: flex;
  align-items: center;
}

.titulo-categoria h1 {
  font-family: "Rubik";
  font-size: 1.5rem;
  margin-right: 10px;
  margin-bottom: 0px;
}

.titulo-categoria h2 {
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