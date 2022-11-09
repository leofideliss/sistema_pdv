<template>
  <div class="tiposTamanhos-pages espacamento20geral">
    <div class="header-tiposTamanhos">
      <div class="titulo-tiposTamanhos">
        <h1>Tipos e Tamanhos</h1>
        <h2>
          Cadastre ou altere os tipos de produto por tamanho e suas opções de
          tamanho
        </h2>
      </div>
      <div class="botoesTiposTamanhos">
        <v-dialog v-model="dialogTipo" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="botao-novoTipo"
              v-bind="attrs"
              v-on="on"
              color="#3decb1"
            >
              <img
                src="@/assets/mais preto.png"
                alt="Voltar para Página anterior"
                class="imgTipoTamanho"
              />
              Novo Tipo
            </v-btn>
          </template>
          <v-card class="centralizarCard">
            <v-card-title class="topoCardTamanho">
              <span class="text-h5">Tipos de Produto</span>
            </v-card-title>
            <v-card-text>
              <v-form v-model="valid_tipos" lazy-validation ref="formTipos">
                <v-container>
                  <div class="campos-formulario campoDescriTipo">
                    <label for="DescricaoTipo"> Descrição </label>
                    <v-text-field
                      id="DescricaoTipo"
                      type="text"
                      label="Nome *"
                      v-model="tipo.nome"
                      :rules="nameRules"
                    >
                    </v-text-field>
                    <div class="explicacaoTipoTamanho">
                      Ex: Pizza, Açai, Marmita, etc...
                    </div>
                  </div>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red" text @click="cancelarTipo"> Fechar </v-btn>
              <v-btn color="green" text @click="salvarTipo"> Salvar </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogTipoDelete" max-width="600px">
          <v-card>
            <v-card-title class="text-h5"
              >Tem certeza que deseja excluir este Tipo?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeTipoDelete"
                >Cancelar</v-btn
              >

              <v-btn color="blue darken-1" text @click="deleteTipoItemConfirm"
                >Confirmar</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogTamanho" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="botao-novoTipo"
              v-bind="attrs"
              v-on="on"
              color="#3decb1"
            >
              <img
                src="@/assets/mais preto.png"
                alt="Voltar para Página anterior"
                class="imgTipoTamanho"
              />
              Novo Tamanho
            </v-btn>
          </template>
          <v-card class="centralizarCard">
            <v-card-title class="topoCardTamanho">
              <span class="text-h5">Tamanhos de Produtos</span>
            </v-card-title>
            <v-card-text>
              <v-form
                v-model="valid_tamanhos"
                lazy-validation
                ref="formTamanhos"
              >
                <v-container>
                  <div class="campos-formulario campoDescriTamanho">
                    <label for="DescricaoTamanho"> Descrição </label>
                    <v-text-field
                      id="DescricaoTamanho"
                      type="text"
                      label="Tamanho *"
                      v-model="tamanho.descricao"
                      :rules="descricaoRules"
                    ></v-text-field>
                    <div class="explicacaoTipoTamanho">
                      Ex: Pequeno, Médio, Grande, etc...
                    </div>
                  </div>
                  <div class="campos-formulario campoSiglaTamanho">
                    <label for="siglaTamanho"> Sigla </label>
                    <v-text-field
                      id="siglaTamanho"
                      type="text"
                      label="Sigla *"
                      v-model="tamanho.sigla"
                      :rules="siglaRules"
                    ></v-text-field>
                    <div class="explicacaoTipoTamanho">Ex: P, M, G</div>
                  </div>

                  <div class="campos-formulario campoTipoTamanho">
                    <label for="tipoTamanho"> Tipo do tamanho </label>

                    <v-select
                      class="input-select"
                      id="tipoTamanho"
                      :items="tiposProdutos"
                      item-text="nome"
                      item-value="id"
                      v-model="tamanho.id_tipo"
                    >
                    </v-select>
                  </div>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red" text @click="cancelarTamanho"> Fechar </v-btn>
              <v-btn color="green" text @click="salvarTamanho"> Salvar </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogTamanhoDelete" max-width="600px">
          <v-card>
            <v-card-title class="text-h5"
              >Tem certeza que deseja excluir este tamanho?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeTamanhoDelete"
                >Cancelar</v-btn
              >

              <v-btn color="blue darken-1" text @click="deleteTamanhoItemConfirm"
                >Confirmar</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </div>
    </div>

    <v-app>
      <div style="display: flex">
        <div class="divisoriaTabelas">
          <v-data-table
            :headers="headers"
            :items="tiposProdutos"
            hide-default-footer
            style="height: 100%"
            no-data-text="Nenhum registro encontrado!"
            no-results-text="Nenhum registro encontrado!"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon dense class="mr-2" @click="editTipoItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon dense @click="deleteTipoItem(item)"> mdi-delete </v-icon>
            </template>
          </v-data-table>
        </div>
        <div class="divisoriaTabelas">
          <v-data-table
            :headers="tamanhos"
            :items="tamanhosProdutos"
            hide-default-footer
            style="height: 100%"
            no-data-text="Nenhum registro encontrado!"
            no-results-text="Nenhum registro encontrado!"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon dense class="mr-2" @click="editTamanhoItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon dense @click="deleteTamanhoItem(item)">
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </div>
      </div>
    </v-app>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl } from "@/global";
export default {
  name: "TiposTamanhos",
  data: function () {
    return {
      dialogTipo: false,
      dialogTipoDelete: false,
      dialogTamanho: false,
      dialogTamanhoDelete:false,
      headers: [
        { text: "Tipos", value: "nome" },
        { text: "Ações", value: "actions", sortable: false },
      ],

      tamanhos: [
        { text: "Tamanhos", value: "descricao" },
        { text: "Sigla", value: "sigla" },
        { text: "Ações", value: "actions", sortable: false },
      ],
      tipo: {},
      tiposProdutos: [],
      tamanho: {},
      tamanhosProdutos: [],

      valid_tipos: true,
      valid_tamanhos: true,
      nameRules: [(v) => !!v || "Nome é obrigatório"],
      descricaoRules: [(v) => !!v || "Descrição é obrigatório"],
      siglaRules: [
        (v) => !!v || "Sigla é obrigatória",
        (v) =>
          (v && v.length <= 3) || "Sigla deve conter no máximo 3 caracteres",
      ],
    };
  },
  methods: {
    // *** TIPOS ***
    salvarTipo() {
      if (this.validate_tipo()) {
        const method = this.id ? "put" : "post";
        const id = this.id ? this.id : "";

        axios[method](`${baseApiUrl}/tiposProdutos/${id}`, this.tipo)
          .then(() => {
            this.dialogTipo = false;
            this.resetTipo();
            this.getAllTiposProdutos();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    getAllTiposProdutos() {
      axios
        .get(`${baseApiUrl}/tiposProdutos`)
        .then((res) => {
          this.tiposProdutos = res.data;
        })
        .catch();
    },
    validate_tipo() {
      return this.$refs.formTipos.validate();
    },
    editTipoItem(item) {
      this.dialogTipo = true;
      this.tipo.id = item.id;
      this.tipo.nome = item.nome;

    },
    cancelarTipo() {
      this.resetTipo();
      this.dialogTipo = false;
    },
    deleteTipoItem(item) {
      this.dialogTipoDelete = true;
      this.tipo.id = item.id;
    },
    resetTipo() {
      this.$refs.formTipos.reset();
    },
    closeTipoDelete() {
      this.dialogTipoDelete = false;
    },
    deleteTipoItemConfirm() {
      axios
        .delete(`${baseApiUrl}/tiposProdutos/${this.tipo.id}`)
        .then(() => {
          this.getAllTiposProdutos();
          this.dialogTipoDelete = false;
        })
        .catch();
    },

    // *** FIM TIPOS ***

    // *** TAMANHOS ***

    cancelarTamanho() {
      this.resetTamanho();
      this.dialogTamanho = false;
    },
    salvarTamanho() {
      if (this.validate_tamanho()) {
        const method = this.id ? "put" : "post";
        const id = this.id ? this.id : "";
        console.log(this.tamanho);
        axios[method](`${baseApiUrl}/tamanhosProdutos/${id}`, this.tamanho)
          .then(() => {
            this.getAllTamanhoProdutos();
            this.resetTamanho();
            this.dialogTamanho = false;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    getAllTamanhoProdutos() {
      axios
        .get(`${baseApiUrl}/tamanhosProdutos`)
        .then((res) => {
          this.tamanhosProdutos = res.data;
        })
        .catch();
    },
    validate_tamanho() {
      return this.$refs.formTamanhos.validate();
    },
    resetTamanho() {
      this.$refs.formTamanhos.reset();
    },
    editTamanhoItem(item) {
      this.dialogTamanho = true;

      this.tamanho.descricao = item.descricao;
      this.tamanho.sigla = item.sigla;
      this.tamanho.id_tipo = item.id_tipo;
      this.tamanho.id = item.id;
    },
    deleteTamanhoItem(item) {
      this.dialogTamanhoDelete = true;
      this.tamanho.id = item.id;
    },

    closeTamanhoDelete() {
      this.dialogTamanhoDelete = false;
    },
    deleteTamanhoItemConfirm() {
      axios
        .delete(`${baseApiUrl}/tamanhosProdutos/${this.tamanho.id}`)
        .then(() => {
          this.getAllTamanhoProdutos();

          this.dialogTamanhoDelete = false;
        })
        .catch();
    },

    // *** FIM TAMANHOS
  },
  mounted() {
    this.getAllTiposProdutos();
    this.getAllTamanhoProdutos();
  },
};
</script>

<style>
body {
  font-family: "Poppins";
}

.header-tiposTamanhos {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.titulo-tiposTamanhos {
  display: flex;
  flex-direction: column;
  max-width: 50%;
}

.titulo-tiposTamanhos h1 {
  font-family: "Rubik";
  font-size: 1.5rem;
  margin-right: 10px;
  margin-bottom: 10px;
}

.titulo-tiposTamanhos h2 {
  font-family: "Rubik";
  font-size: 0.8rem;
  margin-bottom: 0px;
}

/* ----------- BOTOES ---------------- */

.botoesTiposTamanhos {
  display: flex;
}

.botao-novoTipo {
  display: flex;
  align-items: center;
  -content: center;
  background-color: #3decb1;
  padding: 10px;
  border-radius: 15px;
  cursor: pointer;
  text-decoration: none;
}

.botao-novoTipo:first-child {
  margin-right: 10px;
}

.botao-novoTipo:hover {
  text-decoration: none;
}

.botao-novoTipo img {
  width: 18px;
  height: 18px;
  margin-right: 10px;
}

.botao-novoTipo h1 {
  font-family: "Rubik";
  font-size: 1.2rem;
  color: white;
  margin: 0px;
}

.icone-lapis {
  width: 15px;
  height: 15px;
}

.imgTipoTamanho {
  width: 15px;
  height: 15px;
}

/* ----------- CAMPO ADD TAMANHO  ---------------- */

.topoCardTamanho {
  background-color: #3decb1;
  width: 100%;
  display: flex;
  justify-content: center;
}

.topoCardTamanho span {
  text-align: center;
}

.centralizarCard {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.campoDescriTamanho {
  width: 100%;
}

.campoSiglaTamanho {
  width: 100%;
}

.campoTipoTamanho {
  width: 100%;
}

.explicacaoTipoTamanho {
  font-family: "Poppins";
  font-size: 0.8rem;
  font-style: italic;
}

/* ----------- TABELAS ---------------- */

.divisoriaTabelas {
  border: 2px solid black;
  width: 50%;
}
</style>