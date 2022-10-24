<template>

  <div class="complemento-pages">
    <div class="header-complemento">
      <div class="titulo-complemento">
        <h1>Complementos</h1>
        <h2>(4)</h2>
      </div>
      <router-link to="/novoComplemento" class="botao-novo">
        <img src="@/assets/mais.png" alt="Icone de somar" />
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
      <v-data-table :headers="headers" :items="itens" :search="search">
        <template v-slot:[`item.actions`]="{ item }">
          <router-link to="/novoComplemento">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
          </router-link>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>

          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancelar</v-btn
                >
                <v-btn color="blue darken-1" text 
                  >Confirmar</v-btn
                >
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
        { text: "Produtos Vinculados", value: "prodVinculados" },
        { text: "Preço Custo", value: "precoCusto" },
        { text: "Preço Venda", value: "precoVenda" },
        { text: "Status", value: "status" },
        { text: "Ações", value: "actions" },
      ],
      itens: [
        {
          id: 13,
          nome: "Frozen Yogurt",
          prodVinculados: "X-tudo, X-Frango, X-egg, X-Burger",
          precoCusto: 6.0,
          precoVenda: 24,
          status: "ativo",
        },
        {
          id: 13,
          nome: "Frozen Yogurt",
          prodVinculados: "X-tudo, X-Frango, X-egg, X-Burger",
          precoCusto: 6.0,
          precoVenda: 24,
          status: "desativado",
        },
        {
          id: 2,
          nome: "Frozen Yogurt",
          prodVinculados: "X-tudo, X-Frango, X-egg, X-Burger",
          precoCusto: 6.0,
          precoVenda: 24,
          status: "ativo",
        },
        {
          id: 13,
          nome: "Frozen Yogurt",
          prodVinculados: "X-tudo, X-Frango, X-egg, X-Burger",
          precoCusto: 6.0,
          precoVenda: 24,
          status: "ativo",
        },
        {
          id: 54,
          nome: "Frozen Yogurt",
          prodVinculados: "X-tudo, X-Frango, X-egg, X-Burger",
          precoCusto: 6.0,
          precoVenda: 24,
          status: "ativo",
        },
        {
          id: 12,
          nome: "Frozen Yogurt",
          prodVinculados: "X-tudo, X-Frango, X-egg, X-Burger",
          precoCusto: 6.0,
          precoVenda: 24,
          status: "ativo",
        },
        {
          id: 32,
          nome: "Frozen Yogurt",
          prodVinculados: "X-tudo, X-Frango, X-egg, X-Burger",
          precoCusto: 6.0,
          precoVenda: 24,
          status: "ativo",
        },
        {
          id: 13,
          nome: "Calabresa",
          prodVinculados: "X-tudo, X-Frango, X-egg, X-Burger",
          precoCusto: 6.0,
          precoVenda: 24,
          status: "ativo",
        },
        {
          id: 13,
          nome: "Cebola",
          prodVinculados: "X-tudo, X-Frango, X-egg, X-Burger",
          precoCusto: 6.0,
          precoVenda: 24,
          status: "ativo",
        },
        {
          id: 13,
          nome: "Alface",
          prodVinculados: "X-tudo, X-Frango, X-egg, X-Burger",
          precoCusto: 6.0,
          precoVenda: 24,
          status: "ativo",
        },
        {
          id: 13,
          nome: "Alface",
          prodVinculados: "X-tudo, X-Frango, X-egg, X-Burger",
          precoCusto: 6.0,
          precoVenda: 24,
          status: "ativo",
        },
      ],
    };
    
  },
  methods:{
    closeDelete () {
        this.dialogDelete = false
     
      },
      deleteItem () {
        this.dialogDelete = true
      },
  },
  watch:{
    dialogDelete (val) {
        val || this.closeDelete()
      },
  }
};
</script>

<style>
body {
  font-family: "Poppins";
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