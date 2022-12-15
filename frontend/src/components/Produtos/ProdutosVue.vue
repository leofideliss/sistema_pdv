<template>
  <div class="produtos-pages">
    <div class="header-produtos">
      <div class="titulo-produtos">
        <h1>Produtos</h1>
        <h2>({{ produtos.length }})</h2>
      </div>
      <router-link to="/novoproduto" class="botao-novo">
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
        :items="produtos"
        :search="search"
        no-data-text="Nenhum item encontrado"
        no-results-text="Nenhum item encontrado"
      >
        <template v-slot:top>
          <v-dialog v-model="dialogDelete" max-width="600px">
            <v-card>
              <v-card-title class="text-h5"
                >Tem certeza que deseja excluir este produto?</v-card-title
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
  name: "ProdutosVue",
  data: function () {
    return {
      dialogDelete: false,
      produtos: [],
      produto: {},
      search: "",
      headers: [
        { text: "Cod.", value: "id" },
        { text: "Nome", value: "prodNome" },
        { text: "Medida", value: "medida" },
        { text: "Categoria", value: "nomeCategoria" },
        { text: "Preço de custo", value: "preco_custo" },
        { text: "Preço de venda", value: "preco_venda" },

        { text: "Ações", value: "actions" },
      ],
      itens: [
        {
          nome: "Frios",
        },
        {
          nome: "Bebidas",
        },
        {
          nome: "Verduras",
        },
      ],
    };
  },
  methods: {
    getAllProdutos() {
      axios
        .get(`${baseApiUrl}/produto`)
        .then((res) => {
          this.produtos = res.data;
          this.produtos.forEach((element) => {
            element.preco_venda = element.preco_venda.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            });
            element.preco_custo = element.preco_custo.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            });
          });
        })
        .catch();
    },
    editItem(item) {
      this.$router.push({
        path: `/alteraProduto/${item.prodID}`,
      });
    },
    deleteItem(item) {
      this.dialogDelete = true;
      this.produto.id = item.prodID;
    },
    confirmDelete() {
      axios
        .delete(`${baseApiUrl}/produto/${this.produto.id}`)
        .then(() => {
          this.getAllProdutos();
          this.dialogDelete = false;
        })
        .catch();
    },
    closeDelete() {
      this.dialogDelete = false;
    },
  },
  created() {
    this.getAllProdutos();
    this.$store.commit("resetProduto");
  },
};
</script>

<style>
body {
  font-family: "Poppins";
}

.produtos-pages {
  padding: 20px;
}

.header-produtos {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.titulo-produtos {
  display: flex;
  align-items: center;
}

.titulo-produtos h1 {
  font-family: "Rubik";
  font-size: 1.5rem;
  margin-right: 10px;
  margin-bottom: 0px;
}

.titulo-produtos h2 {
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