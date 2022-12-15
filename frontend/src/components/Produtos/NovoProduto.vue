<template>
  <div class="NovoProduto-pages espacamento20geral">
    <div class="headerNovoProduto">
      <router-link to="/produtos" class="botaoVoltar">
        <img
          src="@/assets/seta-esquerda.png"
          alt="Voltar para Página anterior"
        />
        <h1>Voltar</h1>
      </router-link>

      <h1 v-if="id">Altera Produto</h1>
      <h1 v-else>Adicionar Novo Produto</h1>
    </div>

    <form action="" class="fomularioComplemento">
      <div class="primeiraLinha">
        <div class="personalizarCampos space">
          <div class="campoNomeSwitch">
            <div class="campos-formulario campoNomeProduto">
              <label for="nomeComplemento"> Nome </label>
              <v-text-field
                v-model="nome"
                id="nomeComplemento"
                type="text"
              ></v-text-field>
            </div>
            <v-app class="appSwitch">
              <label class="labelStatus">Status do Produto</label>
              <div class="camposSwitch">
                <v-switch v-model="status" inset></v-switch>
                <div v-if="status" class="textoSwitch">Ativo</div>
                <div v-else class="textoSwitch">Pausado</div>
              </div>
            </v-app>
          </div>

          <div class="campos-formulario campoCodigo">
            <label for="codigoAcompanhamento"> Código </label>
            <input v-model="codigo" id="codigoAcompanhamento" type="number" />
          </div>
        </div>
      </div>
      <div class="primeiraLinha">
        <div class="personalizarCampos">
          <div class="campos-formulario campoCategoria">
            <label for="precoCategoria"> Categoria </label>

            <v-select
              v-model="categoria"
              :items="categoriaProduto"
              item-text="nome"
              item-value="id"
              label="Categoria"
            ></v-select>
          </div>
          <div class="campos-formulario campoMedida">
            <label for="produtosVinculados"> Medida do Produto </label>
            <div class="opcoes-medidas">
              <v-radio-group class="custom-radio" row v-model="medida">
                <v-radio
                  type="radio"
                  id="un"
                  name="medida"
                  value="UN"
                  class="radio-medidas"
                  color="#3decb1"
                  checked
                ></v-radio>
                <label for="un">UN</label>

                <div class="custom-radio">
                  <v-radio
                    type="radio"
                    id="kg"
                    name="medida"
                    value="KG"
                    color="#3decb1"
                    class="radio-medidas"
                  ></v-radio>
                  <label for="kg">KG</label>
                </div>

                <div class="custom-radio">
                  <v-radio
                    type="radio"
                    id="lt"
                    color="#3decb1"
                    name="medida"
                    value="LT"
                    class="radio-medidas"
                  ></v-radio>
                  <label for="lt">LT</label>
                </div>
              </v-radio-group>
            </div>
          </div>
        </div>
      </div>
      <div class="primeiraLinha">
        <div class="personalizarCampos">
          <div class="campos-formulario campoCustoProduto">
            <label for="precoCusto"> Preço de Custo </label>
            <v-currency-field id="precoCusto" v-model="preco_custo" />
          </div>
          <div class="campos-formulario campoCustoProduto">
            <label for="precoVenda"> Preço de Venda </label>
            <v-currency-field id="precoVenda" v-model="preco_venda" />
          </div>
        </div>
      </div>

      <div>
        <v-tabs>
          <v-tab
            @click="
              teste = true;
              teste2 = false;
              teste3 = false;
              teste4 = false;
            "
            >Mais Detalhes</v-tab
          >
          <v-tab
            @click="
              teste = false;
              teste2 = false;
              teste3 = true;
              teste4 = false;
            "
            >Ficha Técnica</v-tab
          >
          <v-tab
            @click="
              teste = false;
              teste2 = true;
              teste3 = false;
              teste4 = false;
            "
            >Complementos</v-tab
          >
          <v-tab
            @click="
              teste = false;
              teste2 = false;
              teste3 = false;
              teste4 = true;
            "
            >Perguntas</v-tab
          >
        </v-tabs>
        <div>
          <!-- <Detalhes v-if="teste"></Detalhes> -->

          <div v-if="teste" class="detalhesProduto">
            <div class="formsProduto">
              <label for="descricao"> Descrição </label>
              <textarea
                name="descricao"
                id="descricao"
                cols="10"
                rows="5"
                v-model="descricao"
              ></textarea>
            </div>
            <div class="campoImagemProduto">
              <div class="tituloFoto">Foto do Produto</div>
              <div
                class="previewImagem"
                :style="{ 'background-image': `url(${previewImage})` }"
                @click="selectImage"
              ></div>
              <label for="arquivo" class="labelInputFile"
                >Selecionar Foto</label
              >
              <input
                name="imgProd"
                id="arquivo"
                ref="fileInput"
                type="file"
                class="inputImagem"
                @input="pickFile"
              />
            </div>
          </div>

          <!-- FIM DO DETALHES -->
          <!-- <TabComplementos v-if="teste2"></TabComplementos> -->

          <div v-if="teste2" class="tabComplemento">
            <div>
              <h1 class="tituloComple">
                SELECIONE OS COMPLEMENTOS OPCIONAIS PARA SEU PRODUTO
              </h1>
            </div>

            <div class="selecionarComplementos">
              <v-select
                v-model="complementos"
                :items="listaComplementos"
                item-text="nome"
                item-value="id"
                label="Todos Complementos"
                multiple
                chips
                hint="Selecione quantos complementos quiser"
                persistent-hint
              ></v-select>
            </div>
          </div>

          <!-- FIM DO DO COMPLEMENTO -->
          <!-- <FichaTecnica v-if="teste3"></FichaTecnica> -->

          <div v-if="teste3" class="div-fichatecnica">
            <div class="headerFichaTecnica">
              <h1 class="tituloFichaTecnica">
                Selecione os itens que compõem o produto
              </h1>

              <v-app>
                <v-dialog v-model="dialogFicha" max-width="600px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn v-if="selectInsumo.length" v-bind="attrs" v-on="on" class="botaoAdicionarItem">
                      Editar item
                    </v-btn>
                    <v-btn v-else v-bind="attrs" v-on="on" class="botaoAdicionarItem">
                      Adicionar item
                    </v-btn>
                  </template>
                  <v-card>
                    <div>
                      <v-card-title class="dialogFicha">
                        <span class="text-h5">Selecione o item</span>

                        <v-text-field
                          v-model="searchFicha"
                          append-icon="mdi-magnify"
                          label="Buscar"
                          single-line
                          hide-details
                        ></v-text-field>

                        <v-data-table
                          v-model="selectInsumo"
                          :headers="cabecalhoFicha"
                          :items="itensFicha"
                          :search="searchFicha"
                          show-select
                        >
                          <!-- <template v-slot:[`item.qtd`]="props">
                            <v-edit-dialog
                              :return-value.sync="props.item.qtd"
                              @save="save"
                              @cancel="cancel"
                              @open="open"
                              @close="close"
                            >
                              {{ props.item.qtd }}
                              <template v-slot:input>
                                <v-text-field
                                  v-model="props.item.qtd"
                                  label="Edit"
                                ></v-text-field>
                              </template>
                            </v-edit-dialog>
                          </template> -->
                          <!-- <template v-slot:[`item.actions`]>
                    <v-icon
                      dense
                      color="red"
                      class="mr-2"
                      @click="reveal = true"
                    >
                      mdi-pencil
                    </v-icon>
                  </template> -->
                        </v-data-table>

                        <!-- <v-snackbar
                          v-model="snack"
                          :timeout="3000"
                          :color="snackColor"
                        >
                          {{ snackText }}

                          <template v-slot:action="{ attrs }">
                            <v-btn v-bind="attrs" text @click="snack = false">
                              FECHAR
                            </v-btn>
                          </template>
                        </v-snackbar> -->
                      </v-card-title>
                    </div>
                    <!-- <v-expand-transition>
              <v-card
                v-if="reveal"
                class="transition-fast-in-fast-out v-card--reveal"
                style="height: 100%"
              >
                <v-card-title class="centralizar-Conteudo">
                  <h1 class="titulo-quantidadeG text-h5">Quantidade</h1>
                </v-card-title>

                <v-card-text class="pb-0 centralizar-Conteudo">
                  <div class="formQuantG">
                    <label for="quantG"
                      >Informe a quantidade em gramas (g)</label
                    >
                    <input
                      v-model="quantidade"
                      type="number"
                      id="quantG"
                      name="quantG"
                      class="inputG"
                    />
                  </div>
                </v-card-text>

                <v-card-actions class="pt-0 centralizar-Conteudo">
                  <v-btn text color="red" @click="reveal = false">
                    Voltar
                  </v-btn>
                  <v-btn text color="teal accent-4" @click="reveal = false">
                    Salvar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-expand-transition> -->
                  </v-card>
                </v-dialog>
              </v-app>
            </div>

            <v-card>
              <v-card-title>
                <v-text-field
                  v-model="searchFichaSelect"
                  append-icon="mdi-magnify"
                  label="Buscar"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
              <v-data-table
                :headers="headersFicha"
                :items="selectInsumo"
                :search="searchFichaSelect"
              >
                <template v-slot:[`item.qtd`]="props">
                  <v-edit-dialog
                    :return-value.sync="props.item.qtd"
                    @save="save"
                    @cancel="cancel"
                    @open="open"
                    @close="close"
                  >
                    {{ props.item.qtd }}
                    <template v-slot:input>
                      <v-text-field
                        v-model="props.item.qtd"
                        label="Edit"
                      ></v-text-field>
                    </template>
                  </v-edit-dialog>
                </template>
              </v-data-table>
              <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
                {{ snackText }}

                <template v-slot:action="{ attrs }">
                  <v-btn v-bind="attrs" text @click="snack = false">
                    FECHAR
                  </v-btn>
                </template>
              </v-snackbar>
            </v-card>
          </div>

          <!-- FIM DO FICHA TÉCNICA  -->

          <!-- <TabPergunta v-if="teste4"></TabPergunta> -->

          <div v-if="teste4" class="divTabPergunta">
            <div class="headerTabPergunta">
              <h1 class="tituloTabPergunta">
                Selecione as perguntas do produto
              </h1>

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
                      <v-btn color="red" text @click="dialog = false">
                        Fechar
                      </v-btn>
                      <v-btn color="green" text @click="dialog = false">
                        Salvar
                      </v-btn>
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
                    <v-icon dense @click="deleteItem(item)">
                      mdi-delete
                    </v-icon>
                  </template>
                </v-data-table>
              </v-card>
            </v-app>
          </div>

          <!-- FIM DO TAB PERGUNTAS -->
        </div>
      </div>
      <div class="botaos-form">
        <button class="botao-cancelar" @click.prevent="voltar">Cancelar</button>
        <button class="botao-salvar" @click.prevent="salvarProduto">
          Salvar
        </button>
      </div>
    </form>
  </div>
</template>

<script>
// import Detalhes from "@/components/Produtos/Tabs Produtos/ProdutoDetalhes.vue";
// import TabComplementos from "@/components/Produtos/Tabs Produtos/TabComplemento.vue";
// import FichaTecnica from "@/components/Produtos/Tabs Produtos/FichaTecnica.vue";
// import TabPergunta from "@/components/Produtos/Tabs Produtos/TabPergunta.vue";
import axios from "axios";
import { baseApiUrl } from "@/global";

export default {
  name: "NovoProduto",
  components: {
    // Detalhes,
    // TabComplementos,
    // FichaTecnica,
    // TabPergunta,
  },
  props: ["id"],
  data() {
    return {
      dialogFicha: false,
      revealFicha: false,
      searchFichaSelect: "",
      searchFicha: "",
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
      dialog: false,
      reveal: false,
      search: "",
      search2: "",
      headersFicha: [
        { text: "Nome do Item", value: "nomeInsumo" },
        { text: "Qtde.", value: "qtd" },
        { text: "Medida", value: "medida" },
        { text: "Custo", value: "preco" },
        // { text: "Ações", value: "actions" },
      ],

      cabecalhoFicha: [
        { text: "Insumos", value: "nomeInsumo" },
        { text: "Medida", value: "medida" },
        { text: "Preço Custo", value: "preco" },
        // { text: "Quantidade (g)", value: "qtd" },
        // { text: "Ações", value: "actions" },
      ],
      itensFicha: [],
      snack: false,
      snackColor: "",
      snackText: "",
      previewImage: null,
      listaComplementos: [],
      categoriaProduto: [],
      teste: true,
      teste2: false,
      teste3: false,
      teste4: false,
    };
  },
  computed: {
    item() {
      return this.$store.state.produto.item;
    },
    nome: {
      get() {
        return this.$store.state.produto.item.nome;
      },
      set(value) {
        this.$store.commit("alteraNomeProduto", value);
      },
    },
    status: {
      get() {
        return this.$store.state.produto.item.status;
      },
      set(value) {
        this.$store.commit("alteraStatusProduto", value);
      },
    },
    codigo: {
      get() {
        return this.$store.state.produto.item.codigo;
      },
      set(value) {
        this.$store.commit("alteraCodigoProduto", value);
      },
    },
    medida: {
      get() {
        return this.$store.state.produto.item.medida;
      },
      set(value) {
        this.$store.commit("alteraMedidaProduto", value);
      },
    },
    preco_custo: {
      get() {
        return this.$store.state.produto.item.preco_custo;
      },
      set(value) {
        this.$store.commit("alteraPrecoCustoProduto", value);
      },
    },
    categoria: {
      get() {
        return this.$store.state.produto.item.categoria;
      },
      set(value) {
        this.$store.commit("alteraCategoriaProduto", value);
      },
    },
    preco_venda: {
      get() {
        return this.$store.state.produto.item.preco_venda;
      },
      set(value) {
        this.$store.commit("alteraPrecoVendaProduto", value);
      },
    },
    descricao: {
      get() {
        return this.$store.state.produto.item.descricao;
      },
      set(value) {
        this.$store.commit("alteraDescricaoProduto", value);
      },
    },
    complementos: {
      get() {
        return this.$store.state.produto.item.selectComplementos;
      },
      set(value) {
        this.$store.commit("alteraComplementosProduto", value);
      },
    },
    selectInsumo: {
      get() {
        return this.$store.state.produto.item.selectInsumo;
      },
      set(value) {
        this.$store.commit("alteraInsumoProduto", value);
      },
    },
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
    getAllCategoriaProduto() {
      axios
        .get(`${baseApiUrl}/categoriaProduto`)
        .then((res) => {
          this.categoriaProduto = res.data;
        })
        .catch();
    },
    salvarProduto() {
      console.log("salvar produto", this.id);
      const method = this.id ? "put" : "post";
      const id = this.id ? this.id : "";
      var objProduto = {
        nome: this.item.nome,
        status: this.item.status,
        id_categoria: this.item.categoria,
        medida: this.item.medida,
        preco_custo: this.item.preco_custo,
        preco_venda: this.item.preco_venda,
        descricao: this.item.descricao,
        imagem_prod: this.item.image,
        complementos: this.item.selectComplementos,
        insumos: this.item.selectInsumo,
        perguntas: this.item.selectPerguntas,
      };
      axios[method](`${baseApiUrl}/produto/${id}`, objProduto)
        .then(() => {
          this.$router.back();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getProdutoById() {
      axios
        .get(`${baseApiUrl}/produto/${this.id}`)
        .then((res) => {
          this.nome = res.data.prodNome;
          this.status = res.data.status;
          this.codigo = res.data.prodID;
          this.categoria = res.data.id_categoria;
          this.medida = res.data.medida;
          this.preco_custo = res.data.preco_custo;
          this.preco_venda = res.data.preco_venda;
          this.descricao = res.data.descricao;
        })
        .catch();
    },
    voltar() {
      this.$router.back();
    },

    pickFile() {
      let input = this.$refs.fileInput;
      let file = input.files;
      this.$store.commit("alteraImageProduto", file[0]);
      if (file && file[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage = e.target.result;
        };
        reader.readAsDataURL(file[0]);
        this.$emit("input", file[0]);
      }
    },
    selectImage() {
      this.$refs.fileInput.click();
    },
    getAllComplementos() {
      axios
        .get(`${baseApiUrl}/complemento`)
        .then((res) => {
          this.listaComplementos = res.data;
          this.listaComplementos.forEach((element) => {
            element.preco_venda = element.preco_venda.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            });
            element.preco_custo = element.preco_custo.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            });
            element.status
              ? (element.status = "Ativo")
              : (element.status = "Pausado");
          });
        })
        .catch();
    },

    getAllInsumos() {
      axios
        .get(`${baseApiUrl}/insumo`)
        .then((res) => {
          var itens;

          itens = res.data;
          itens.forEach((element) => {
            var obj = {
              id: element.id,
              preco: element.preco.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              }),
              nomeInsumo: element.nomeInsumo,
              medida: element.medida,
              qtd: 0,
            };

            this.itensFicha.push(obj);
          });
        })
        .catch();
    },

    save() {
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Quantidade adicionada";
    },
    cancel() {
      this.snack = true;
      this.snackColor = "error";
      this.snackText = "Cancelado";
    },
    open() {
      this.snack = true;
      this.snackColor = "info";
      this.snackText = "Insira a quantidade";
    },
    close() {
      // console.log("Dialog closed");
    },
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

    getInsumosSelect(id) {
      var respostas = [];

      axios
        .get(`${baseApiUrl}/produtoInsumo/${id}`)
        .then((res) => {
          res.data.forEach((element) => {
            var objInsumo = {
              id: element.id,
              preco: element.preco.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              }),
              nomeInsumo: element.nomeInsumo,
              medida: element.medida,
              qtd: element.qtd,
            };
            respostas.push(objInsumo);
          });
          this.selectInsumo = respostas;
        })
        .catch();
    },
    getComplementoSelect(id) {
      var respostas = [];

      axios
        .get(`${baseApiUrl}/produtoComplemento/${id}`)
        .then((res) => {
          res.data.forEach((element) => {
            var objComplemento = {
              id: element.id,
              nome: element.nome,
            };
            respostas.push(objComplemento);
          });
          this.complementos = respostas;
        })
        .catch();
    },
    getPerguntasSelect(id) {
      var perguntas_selecionadas = [];

      axios
        .get(`${baseApiUrl}/produtoPergunta/${id}`)
        .then((res) => {
          res.data.forEach((element) => {
            var respostas = {};
            if (element.tipo == "observacao")
              respostas = this.getPerguntaByIdObs(element.id_pergunta);
            if (element.tipo == "complemento")
              respostas = this.getPerguntaByIdComp(element.id_pergunta);
            var objPergunta = {
              id: element.id,
              tipo: element.tipo,
              pergunta: element.pergunta,
              opcoesRespostas: respostas,
            };
            perguntas_selecionadas.push(objPergunta);
          });
          this.selectPerguntas = perguntas_selecionadas;
        })
        .catch();
    },
    deleteItem(item) {
      this.$store.commit("removePerguntasProduto", item.id);

    },
  },

  created() {
    if (this.id) {
      this.getProdutoById();
      this.getInsumosSelect(this.id);
      this.getComplementoSelect(this.id);
      this.getPerguntasSelect(this.id);
    }
    this.getAllCategoriaProduto();
    this.getAllComplementos();
    this.getAllInsumos();
    this.getAllPerguntas();
  },
};
</script>

<style>
.NovoProduto-pages {
  padding: 20px;
}

.headerNovoProduto {
  display: flex;
  margin-bottom: 20px;
}

.headerNovoProduto a {
  width: 80px;
}

.headerNovoProduto h1 {
  font-size: 1.8rem;
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

.space {
  display: flex;
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

.campoNomeProduto {
  width: 71%;
}

.campoCodigo {
  width: 15%;
}

.campoCategoria {
  width: 50%;
}

.campoMedida {
  width: 30%;
}

.campoCustoProduto {
  width: 20%;
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

.opcoes-medidas {
  display: flex;
  width: 100%;
}

.opcoes-medidas div {
  margin-right: 15px;
}

.radio-medidas {
  margin-right: 4px;
}

.custom-radio {
  display: flex;
  align-items: center;
}

.custom-radio label {
  cursor: pointer;
  margin-bottom: 0px !important;
}

.radio-medidas {
  cursor: pointer !important;
  appearance: none !important;
  width: 25px !important;
  height: 25px !important;
  border-radius: 50% !important;
  outline: none !important;
  border: 2px solid #3decb1 !important;
  position: relative !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 0px !important;
}

.radio-medidas:before {
  content: "";
  position: absolute;
  height: 11px;
  width: 11px;
  background: #3decb1;
  border-radius: 50%;
  opacity: 0;
  transition: all 300ms ease-in-out;
}

.radio-medidas:checked:before {
  opacity: 1;
}

.radio-medidas:focus {
  box-shadow: 0 0 5px rgba(0, 0, 0, 1);
}

/** SWITCH **/

.labelStatus {
  font-family: "Poppins";
  margin-bottom: 5px;
  font-size: 0.9rem;
}

.camposSwitch {
  display: flex;
  align-items: center;
}

.campoNomeSwitch {
  display: flex;
  width: 70%;
}

.appSwitch {
  padding: 10px;
}

.textoSwitch {
  font-family: "Poppins";

  font-size: 0.8rem;
}

/** -------------- ALTERA CAMPOS VUE  ------------------ **/

.v-input--selection-controls {
  margin-top: 0px !important;
}

.v-messages {
  display: none;
}

.v-input__slot {
  margin-bottom: 0px !important;
}

.v-application .primary--text {
  color: #3decb1 !important;
  caret-color: #3decb1 !important;
}

.theme--light.v-application {
  background-color: #f2f2f2 !important;
}

.v-application--wrap {
  min-height: 0px !important;
}

.detalhesProduto {
  background-color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
}

.detalhesProduto textarea {
  padding: 10px;
  max-width: 100%;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.formsProduto {
  width: 65%;
}

.previewImagem {
  width: 100%;
  max-width: 250px;
  height: 250px;
  display: block;
  cursor: pointer;
  margin: 0 auto 10px;
  background-size: cover;
  background-position: center center;
  border: 1px solid black;
}

.campoImagemProduto {
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.labelInputFile {
  padding: 15px 10px;
  width: 100%;
  max-width: 250px;
  background-color: #3decb1;
  color: black;
  font-family: "Poppins";
  text-transform: uppercase;
  text-align: center;
  font-size: 1.2rem;
  margin-bottom: 0px;
}

.inputImagem {
  display: none;
}

.tituloFoto {
  font-family: "Poppins";
  margin-bottom: 5px;
  font-size: 1rem;
}
.tituloComple {
  font-size: 1.2rem;
  font-family: "Poppins";
  text-align: center;
  padding: 20px 0px 20px 0px;
  background-color: #3decb1;
  margin-bottom: 0px;
}

.appComplementos {
  display: flex;
}

.tabComplemento {
  background-color: white;
  padding: 20px 20px 40px 20px;
}

.selecionarComplementos {
  width: 100% !important;
  padding: 30px 10px 20px 10px;
  border-width: 0px 1px 1px 1px;
  border-color: black;
  border-style: solid;
}

.div-fichatecnica {
  background-color: white;
  padding: 20px;
}

.headerFichaTecnica {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #3decb1;
}

.tituloFichaTecnica {
  font-size: 1.2rem;
  font-family: "Poppins";
  margin-bottom: 0px;
  padding: 10px 10px 10px 10px;
  text-transform: uppercase;
}

.botao-novo {
  display: flex;
  align-items: center;
  -content: center;
  background-color: white;
  padding: 10px;
  border-radius: 15px;
  cursor: pointer;
  text-decoration: none;
}

.botao-novo:hover {
  text-decoration: none;
}

.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.botao-novo img {
  width: 15px;
  height: 15px;
  margin-right: 10px;
}

.botao-novo h1 {
  font-family: "Rubik";
  font-size: 1rem;
  color: black;
  margin: 0px;
}

.botaoAdicionarItem {
  font-family: "Rubik";
  text-transform: capitalize;
  font-size: 1rem;
  color: black;
}

.dialogFicha {
  display: flex;
  flex-direction: column;
}

.v-input {
  width: 100%;
}

/* CARD QUANTIDADE GRAMAS */

.formQuantG {
  display: flex;
  flex-direction: column;
}

.inputG {
  border: 1px solid black;
  outline: none; /*borda que aparece quando clicamos*/
  padding: 5px;
  background: white;
  font-size: 0.8rem;
  font-family: "Poppins";
  border-radius: 5px;
  width: 100%;
}

.centralizar-Conteudo {
  display: flex;
  justify-content: center;
}

.titulo-quantidadeG {
  text-align: center;
  font-family: "Poppins";
  font-size: 1.2rem;
}

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