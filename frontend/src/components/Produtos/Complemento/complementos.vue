<template>
  <div class="complemento-pages">
    <div class="header-complemento">
      <div class="titulo-complemento">
        <h1>Complementos</h1>
        <h2>({{ complementos.length }})</h2>
      </div>
      <router-link to="/novoComplemento" class="botao-novo">
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
        :items="complementos"
        :search="search"
        no-data-text="Nenhum registro encontrado!"
        no-results-text="Nenhum complemento encontrado!"
      >
        <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>

          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Tem certeza que deseja excluir este complemento?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancelar</v-btn
                >
                <v-btn color="blue darken-1" @click="confirmDelete" text>Confirmar</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios'
import { baseApiUrl } from '@/global';
export default {
  name: "ComplementosVue",
  data: function () {
    return {
      // CONTROLE DO DELETE
      dialogDelete: false,

      search: "",
      headers: [
        {
          text: "Código",
          align: "start",
          filterable: false,
          value: "id",
        },
        { text: "Nome", value: "nome" },
        { text: "Preço Custo", value: "preco_custo" },
        { text: "Preço Venda", value: "preco_venda" },
        { text: "Status", value: "status" },
        { text: "Ações", value: "actions" },
      ],
      complemento:{},
      complementos: [],
    };
  },
  methods: {
    getAllComplementos() {
      axios
        .get(`${baseApiUrl}/complemento`)
        .then((res) => {
          this.complementos = res.data;
          this.complementos.forEach(element => {
            element.preco_venda = element.preco_venda.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            });
            element.preco_custo = element.preco_custo.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            });
            element.status ? element.status = 'Ativo' : element.status = "Destivado"
          });
        })
        .catch();
    },
    editItem(item) {
      this.$router.push({ path: `/novoComplemento/${item.id}` });
    },
    deleteItem(item) {
      this.dialogDelete = true;
      this.complemento.id = item.id;
    },
    confirmDelete() {
      axios
        .delete(`${baseApiUrl}/complemento/${this.complemento.id}`)
        .then(() => {
          this.getAllComplementos();
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
  created(){
    this.getAllComplementos()
  }
};
</script>

<style>
body {
  font-family: "Poppins";
}

.complemento-pages {
  padding: 20px;
}

.header-complemento {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.titulo-complemento {
  display: flex;
  align-items: center;
}

.titulo-complemento h1 {
  font-family: "Rubik";
  font-size: 1.5rem;
  margin-right: 10px;
  margin-bottom: 0px;
}

.titulo-complemento h2 {
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