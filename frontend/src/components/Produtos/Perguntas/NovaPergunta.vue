<template>
  <div class="NovaPergunta-pages espacamento20geral">
    <div class="headerNovaPergunta">
      <router-link to="/perguntas" class="botaoVoltar">
        <img
          src="@/assets/seta-esquerda.png"
          alt="Voltar para Página anterior"
        />
        <h1>Voltar</h1>
      </router-link>

      <h1 v-if="id">Alterar Pergunta</h1>
      <h1 v-else>Adicionar Nova Pergunta</h1>
    </div>

    <v-form v-model="valid" ref="form" class="fomularioComplemento">
      <div class="divPerguntas">
        <div class="divFormPerguntas">
          <div class="primeiraLinha">
            <div class="personalizarCampos">
              <div class="campos-formulario campoPergunta">
                <label for="nomePergunta"> Pergunta </label>
                <v-text-field
                  id="nomePergunta"
                  type="text"
                  v-model="reg.pergunta"
                  :rules="perguntaRules"
                ></v-text-field>
              </div>
            </div>
          </div>

          <div v-if="!id" class="tipoResposta">
            <label class="labelTipoResposta">Tipo da resposta</label>
            <v-radio-group v-model="reg.tipo" row>
              <div class="radioTipoResposta">
                <v-radio value="observacao"></v-radio>
                <span>Observação</span>
              </div>

              <div class="radioTipoResposta">
                <v-radio value="complemento"></v-radio>
                <span>Complemento</span>
              </div>
              <div class="radioTipoResposta">
                <v-radio value="produto"></v-radio>
                <span>Produto</span>
              </div>
            </v-radio-group>
          </div>

          <div v-else class="tipoResposta">
            <label class="labelTipoResposta">Tipo da resposta</label>
            <v-radio-group v-model="reg.tipo" row>
              <div class="radioTipoResposta" v-if="reg.tipo == 'observacao'">
                <v-radio :disabled="true" value="observacao"></v-radio>
                <span>Observação</span>
              </div>

              <div class="radioTipoResposta" v-if="reg.tipo == 'complemento'">
                <v-radio :disabled="true" value="complemento"></v-radio>
                <span>Complemento</span>
              </div>
              <div class="radioTipoResposta" v-if="reg.tipo == 'produto'">
                <v-radio :disabled="true" value="produto"></v-radio>
                <span>Produto</span>
              </div>
            </v-radio-group>
          </div>

          <div class="divOpcoesRespostas">
            <div class="headerDivOpcoesRespostas">
              <span>Opções de Respostas</span>

              <DialogPerguntaComplemento
                :itensComplemento="itensComplemento"
                v-if="reg.tipo == 'complemento'"
              ></DialogPerguntaComplemento>
              <DialogPerguntaObservacao
                v-if="reg.tipo == 'observacao'"
              ></DialogPerguntaObservacao>
              <DialogPerguntaProduto
                v-if="reg.tipo == 'produto'"
              ></DialogPerguntaProduto>
            </div>

            <v-card>
              <v-data-table
                v-if="reg.tipo == 'produto'"
                :headers="headersProduto"
                :search="search"
                :items="itensProduto"
              >
                <template v-slot:[`item.actions`]="{ item }">
                  <v-icon dense @click="deleteItem(item)"> mdi-delete </v-icon>
                </template>
              </v-data-table>

              <v-data-table
                v-if="reg.tipo == 'complemento'"
                :headers="headersComplemento"
                :items="itensComplemento"
                :search="search"
              >
              </v-data-table>

              <v-data-table
                v-if="reg.tipo == 'observacao'"
                :headers="headersObservacao"
                :search="search"
                :items="itensObservacao"
              >
                <template v-slot:[`item.actions`]="{ item }">
                  <v-icon dense @click="deleteItemObs(item)">
                    mdi-delete
                  </v-icon>
                </template>
              </v-data-table>
            </v-card>
          </div>

          <div class="respostaObrigatoria">
            <label class="labelTipoResposta">Resposta Obrigatória</label>
            <v-radio-group v-model="reg.obrigatorio" row>
              <div class="radioTipoResposta">
                <v-radio :value="true"></v-radio>
                <span>Sim</span>
              </div>

              <div class="radioTipoResposta">
                <v-radio :value="false"></v-radio>
                <span>Não</span>
              </div>
            </v-radio-group>
          </div>

          <div class="qtasRespostasEscolher">
            <label class="labelTipoResposta"
              >Quantas opções de respostas pode escolher?</label
            >
            <div class="divMinMax">
              <div class="divMin">
                <span>No mínimo:</span>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="0"
                  max="5"
                  class="inputMinMax"
                  v-model="reg.min"
                />
              </div>
              <div>
                <span>No máximo:</span>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="0"
                  max="5"
                  class="inputMinMax"
                  v-model="reg.max"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="listaProdVinculados">
          <h1>Produtos Vinculados</h1>

          <div class="divListaProdVinculados">
            <v-app>
              <v-simple-table>
                <template v-slot:default>
                  <tbody>
                    <tr v-for="item in produtos" :key="item.nome">
                      <td>{{ item.nome }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-app>
          </div>
        </div>
      </div>
      <div class="botaos-form">
        <button class="botao-cancelar" @click.prevent="cancelar">
          Cancelar
        </button>
        <button class="botao-salvar" @click.prevent="salvarPergunta">
          Salvar
        </button>
      </div>
    </v-form>
  </div>
</template>

<script>
import DialogPerguntaObservacao from "@/components/Produtos/Perguntas/dialogPerguntas/DialogPerguntaObservacao.vue";
import DialogPerguntaComplemento from "@/components/Produtos/Perguntas/dialogPerguntas/DialogPerguntaComplemento.vue";
import DialogPerguntaProduto from "@/components/Produtos/Perguntas/dialogPerguntas/DialogPerguntaProduto.vue";
import axios from "axios";
import { baseApiUrl } from "@/global";
export default {
  components: {
    DialogPerguntaComplemento,
    DialogPerguntaObservacao,
    DialogPerguntaProduto,
  },
  name: "NovaObservacao",
  props: ["id"],

  data() {
    return {
      pergunta: {},
      valid: true,
      search: "",
      reg: {
        tipo: "observacao",
        obrigatorio: false,
        pergunta: "",
        max: "",
        min: "",
      },
      perguntaRules: [(v) => !!v || "Nome da pergunta é obrigatório"],

      dialog: false,
      headersObservacao: [
        { text: "Tipo", value: "tipo" },
        { text: "Opção", value: "descricao" },
        // { text: "Qtde Permitida", value: "qtdPermitida" },
        { text: "Excluir", value: "actions", sortable: false },
      ],
      headersComplemento: [
        { text: "Tipo", value: "tipo" },
        { text: "Opção", value: "opcao" },
        { text: "Qtde Permitida", value: "qtdPermitida" },
        { text: "Preço Venda", value: "preco_venda" },
        { text: "Preco Promo.", value: "preco_promo" },
      ],
      itensComplemento: this.$store.state.complementosPerguntas,
      itensObservacao: this.$store.state.observacaoPerguntas,
      itensProduto: this.$store.state.produtosPerguntas,

      headersProduto: [
        { text: "Tipo", value: "tipo" },
        { text: "Opção", value: "opcao" },
        { text: "Qtde Permitida", value: "qtdPermitida" },
        { text: "Excluir", value: "actions", sortable: false },
      ],

      produtos: [
        {
          nome: "Frozen Yogurt",
        },
        {
          nome: "Ice cream sandwich",
        },
        {
          nome: "Eclair",
        },
        {
          nome: "Cupcake",
        },
        {
          nome: "Gingerbread",
        },
        {
          nome: "Jelly bean",
        },
        {
          nome: "Lollipop",
        },
        {
          nome: "Honeycomb",
        },
      ],
    };
  },
  computed: {},
  methods: {
    salvarPergunta() {
      if (this.validate()) {
        const method = this.id ? "put" : "post";
        const id = this.id ? this.id : "";
        axios[method](`${baseApiUrl}/perguntas/${id}`, this.reg)
          .then((res) => {
            if (this.reg.tipo == "complemento") {
              let perg_complementos = {
                id_pergunta: res.data[0].id,
                complementos: this.itensComplemento,
              };
              axios[method](
                `${baseApiUrl}/perguntasComplemento/${id}`,
                perg_complementos
              )
                .then(() => {
                  this.$router.back();
                })
                .catch();
            }
            if (this.reg.tipo == "observacao") {
              let obs = {
                id_pergunta: res.data[0].id,
                observacoes: this.itensObservacao,
              };
              axios[method](`${baseApiUrl}/perguntasObservacao/${id}`, obs)
                .then(() => {
                  this.$router.back();
                })
                .catch();
            }
            // if (this.reg.tipo == "produto") {
            // }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    getPerguntaByIdComp() {
      axios
        .get(`${baseApiUrl}/perguntasComplemento/${this.id}`)
        .then((res) => {
          res.data.forEach((element) => {
            let obj = {
              id: element.id,
              qtdPermitida: element.qtdPermitida,
              tipo: element.tipo,
              opcao: element.nome,
              preco_venda: element.preco_venda.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              }),
              preco_promo: element.preco_promo.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              }),
            };
            this.itensComplemento.push(obj);
          });
        })
        .catch();
    },
    getPerguntaByIdObs() {
      axios
        .get(`${baseApiUrl}/perguntasObservacao/${this.id}`)
        .then((res) => {
            res.data.forEach((element) => {
              let objObs = {
                descricao: element.descricao,
                tipo: element.tipoObs,
              };

              this.itensObservacao.push(objObs);
            });
          
        })
        .catch();
    },
    validate() {
      return this.$refs.form.validate();
    },
    cancelar() {
      this.$router.back();
    },

    deleteItemObs(item) {
      this.$store.commit("RemoveObservacaoPerg", item);
    },
  },
  created() {
    if (this.id) {
      axios
        .get(`${baseApiUrl}/perguntas/${this.id}`)
        .then((res) => {
          this.pergunta = { ...res.data };

          this.reg.pergunta = this.pergunta.pergunta;
          this.reg.tipo = this.pergunta.tipo;
          this.reg.obrigatorio = this.pergunta.obrigatorio;
          this.reg.max = this.pergunta.max;
          this.reg.min = this.pergunta.min;

          if (this.pergunta.tipo == "complemento") this.getPerguntaByIdComp();
          if (this.pergunta.tipo == "observacao") this.getPerguntaByIdObs();
        })
        .catch();
    }
  },
};
</script>

<style scoped>
.headerNovaPergunta {
  display: flex;
  margin-bottom: 20px;
}

.headerNovaPergunta a {
  width: 80px;
}

.headerNovaPergunta h1 {
  font-size: 1.6rem;
  width: 90%;
  text-align: center;
  margin-bottom: 0px;
}

.botaoVoltar {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.botaoVoltar:hover {
  text-decoration: none;
}

.botaoVoltar img {
  width: 13px;
  height: 13px;
  margin-right: 10px;
}

.botaoVoltar h1 {
  color: black;
  font-family: "Rubik";
  font-size: 1.3rem;
  margin-bottom: 0px;
}

.fomularioComplemento {
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: #f2f2f2;
  border-radius: 20px;
}

.primeiraLinha {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.personalizarCampos {
  display: flex;
  width: 100%;
}

.campos-formulario {
  display: flex;
  flex-direction: column;
  transition: 0.3s;
  margin: 10px;
}

.campos-formulario label {
  font-family: "Poppins";
  margin-bottom: 5px;
  font-size: 0.9rem;
}

.campos-formulario input {
  border: 1px solid black;
  outline: none; /*borda que aparece quando clicamos*/
  padding: 5px;
  background: white;
  font-size: 0.8rem;
  font-family: "Poppins";
  border-radius: 5px;
}

.campoPergunta {
  width: 100%;
}

.botaos-form {
  display: flex;
  justify-content: end;
  margin-top: 50px;
}

.botaos-form button {
  padding: 10px 15px 10px 15px;
  border: none;
  border-radius: 10px;
  color: #def7f4;
  outline: none;
  cursor: pointer;
  font-size: 1rem;
  font-family: "Rubik";
  transition: 0.3s;
}

.botao-cancelar {
  background-color: #ff3131;
  margin-right: 15px;
}

.botao-cancelar:hover {
  background-color: #f95858;
}

.botao-salvar {
  background-color: #008000;
}

.botao-salvar:hover {
  background-color: #00b300;
}

.v-text-field {
  padding-top: 0px !important;
  margin-top: 0px !important;
}

.v-text-field input {
  padding: 5px !important;
}

.v-text-field > .v-input__control > .v-input__slot:before {
  border-style: none !important;
}

.input-select {
  border: 1px solid black;
  outline: none; /*borda que aparece quando clicamos*/
  padding: 5px;
  background: white;
  font-size: 0.8rem;
  font-family: "Poppins";
  border-radius: 5px;
}

/* -----   FORMULARIOS PERGUNTAS   ------*/

.divPerguntas {
  display: flex;
  justify-content: space-between;
}

.divFormPerguntas {
  width: 69%;
  border: 1px solid black;
  padding: 15px;
  border-radius: 15px;
}

.radioTipoResposta {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.radioTipoResposta span {
  font-family: "Poppins";

  font-size: 0.9rem;
}

.v-input--radio-group.v-input--radio-group--row .v-radio {
  margin-right: 5px;
}

.labelTipoResposta {
  font-family: "Poppins";
  margin-bottom: 5px;
  font-size: 0.9rem;
}

.tipoResposta {
  padding: 10px;
}

/* ----  PRODUTOS VINCULADOS ----*/

.listaProdVinculados {
  width: 30%;
  border: 1px solid black;
  background-color: white;
  border-radius: 15px;
}

.listaProdVinculados h1 {
  background-color: #3decb1;
  border-radius: 15px 15px 0px 0px;
  font-family: "Poppins";
  margin-bottom: 0px;
  padding: 15px;
  text-align: center;
  font-size: 1.2rem;
  border-bottom: 1px solid black;
}

.divListaProdVinculados {
  border-radius: 0px 0px 15px 15px;
  max-height: 100%;
  overflow-y: scroll;
}

/* ------ OPÇOES DE RESPOSTAS --------*/

.divOpcoesRespostas {
  padding: 15px;
}

.headerDivOpcoesRespostas {
  display: flex;
  /* justify-content: baseline; */
  align-items: flex-end;
  margin-bottom: 20px;
}

.headerDivOpcoesRespostas > span {
  margin-right: 20px;
}

.respostaObrigatoria {
  padding: 15px;
}

.qtasRespostasEscolher {
  padding: 15px;
}

.divMinMax {
  display: flex;
  margin-top: 10px;
}

.divMinMax span {
  font-family: "Poppins";
  margin-bottom: 5px;
  font-size: 0.9rem;
  margin-right: 10px;
}

.divMin {
  margin-right: 30px;
}

.inputMinMax {
  border: 1px solid black;
  border-radius: 8px;
  background-color: white;
  text-align: center;
}
</style>