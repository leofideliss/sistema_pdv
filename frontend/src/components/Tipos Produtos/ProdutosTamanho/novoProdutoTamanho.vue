<template>
  <div class="NovoProdutoTamanho-pages">
    <div class="headerNovoProdutoTamanho">
      <router-link to="/produtosTamanho" class="botaoVoltar">
        <img
          src="@/assets/seta-esquerda.png"
          alt="Voltar para Página anterior"
        />
        <h1>Voltar</h1>
      </router-link>

      <h1 v-if="id">Alterar Produto por Tamanho</h1>
      <h1 v-else>Adicionar Novo Produto por Tamanho</h1>
    </div>

    <form action="" class="fomularioComplemento">
      <div class="primeiraLinha">
        <div class="personalizarCampos space">
          <div class="campoNomeSwitch">
            <div class="campos-formulario campoNomeProduto">
              <label for="nomeComplemento"> Nome </label>
              <input id="nomeComplemento" type="text" v-model="nome" />
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
            <input id="codigoAcompanhamento" type="number" v-model="codigo" />
          </div>
        </div>
      </div>
      <div class="primeiraLinha espacamentoBottom">
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
          <div class="campos-formulario campoCategoria">
            <label for="precoCategoria"> Tipo </label>

            <v-select
              v-model="tipoSelect"
              :items="tipoProduto"
              item-text="nome"
              item-value="id"
              label="Tipo"
              @change="getTamanhos"
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
            >Pergunta</v-tab
          >
        </v-tabs>
        <div>
          <!-- <Detalhes v-if="teste"></Detalhes> -->

          <div class="detalhesProduto" v-if="teste">
            <div class="porcento50 tabelaTamanhoPreco">
              <div class="headerTabelaProduto">
                <div class="porcentagemNomeTabela">
                  <span class="spanNomeTabela">Selecione por Nome</span>
                </div>
                <div class="porcentagemPrecoTabela">
                  <span class="spanPrecoCustoTabela">Preço de Custo</span>
                </div>
                <div class="porcentagemPrecoTabela">
                  <span class="spanPrecoVendaTabela">Preço de Venda</span>
                </div>
              </div>
              <div v-for="itens in tamanhos" :key="itens.id">
                <TamanhoProd
                  :sigla="itens.sigla"
                  :nome="itens.descricao"
                  :id_tamanho="itens.id"
                ></TamanhoProd>
              </div>
            </div>
            <div class="porcento50 areaDetalhesTamanho">
              <div class="formsProdutoTamanho">
                <label for="descricao"> Descrição </label>
                <textarea
                  name="descricao"
                  id="descricao"
                  cols="10"
                  rows="5"
                ></textarea>
              </div>
              <div class="campoImagemProdutoTamanho">
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
                  id="arquivo"
                  ref="fileInput"
                  type="file"
                  class="inputImagem"
                  @input="pickFile"
                />
              </div>
            </div>
          </div>

          <!-- FIM DETALHES -->
          <!-- <TabComplementos v-if="teste2"></TabComplementos> -->
          <v-app class="appComplementos" v-if="teste2">
            <div class="tabComplemento">
              <div class="headerTabComplTamanho">
                <h1 class="tituloCompleTamanho">
                  Selecione os complementos opcionais para seu tamanho:
                </h1>
                <!-- <select class="input-select selectComplTamanho">
                  <option value="valor1">Broto (P)</option>
                  <option value="valor2">Média (M)</option>
                  <option value="valor3">Grande (G)</option>
                </select> -->
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
          </v-app>
          <!-- FIM COMPLEMENTOS -->
          <!-- <FichaTecnica v-if="teste3"></FichaTecnica> -->
          <div class="div-fichatecnica" v-if="teste3">
            <div class="headerFichaTecnica">
              <div class="headerFichaTecnicaTamanho">
                <h1 class="tituloFichaTecnicaTamanho">
                  Selecione os itens que compõem o tamanho:
                </h1>

                <!-- <select class="input-select selectComplTamanho">
                  <option value="valor1">Broto (P)</option>
                  <option value="valor2">Média (M)</option>
                  <option value="valor3">Grande (G)</option>
                </select> -->
                <v-select
                  v-model="selectTamanho"
                  class="input-select selectComplTamanho"
                  :items="tamanhos"
                  item-text="descricao"
                  item-value="descricao"
                  no-data-text="Selecione o Tipo!"
                >
                </v-select>
              </div>

              <v-app>
                <v-dialog v-model="dialog" max-width="600px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" class="botaoAdicionarItem">
                      Adicionar item
                    </v-btn>
                  </template>
                  <v-card>
                    <div>
                      <v-card-title class="dialogFicha">
                        <span class="text-h5">Selecione o item</span>

                        <v-text-field
                          v-model="search2"
                          append-icon="mdi-magnify"
                          label="Buscar"
                          single-line
                          hide-details
                        ></v-text-field>

                        <!-- <v-data-table
                          :headers="cabecalhoFicha"
                          :items="itensFicha"
                          :search="search2"
                        >
                          <template v-slot:[`item.actions`]>
                            <v-icon
                              dense
                              color="red"
                              class="mr-2"
                              @click="reveal = true"
                            >
                              mdi-pencil
                            </v-icon>
                          </template>
                        </v-data-table> -->

                        <v-data-table
                          name="pequeno"
                          id="pequeno"
                          v-if="selectTamanho == 'Pequeno'"
                          v-model="itensPequeno"
                          :headers="cabecalhoFicha"
                          :items="itensFicha"
                          :search="searchFicha"
                          show-select
                          no-data-text="Nenhum item selecionado"
                          no-results-text="Nenhum item encontrado"
                        >
                        </v-data-table>

                        <v-data-table
                          name="medio"
                          id="medio"
                          v-if="selectTamanho == 'Medio'"
                          v-model="itensMedio"
                          :headers="cabecalhoFichaM"
                          :items="itensFicha"
                          :search="searchFicha"
                          show-select
                          no-data-text="Nenhum item selecionado"
                          no-results-text="Nenhum item encontrado"
                        >
                        </v-data-table>

                        <v-data-table
                          name="grande"
                          id="grande"
                          v-if="selectTamanho == 'Grande'"
                          v-model="itensGrande"
                          :headers="cabecalhoFichaG"
                          :items="itensFicha"
                          :search="searchFicha"
                          show-select
                          no-data-text="Nenhum item selecionado"
                          no-results-text="Nenhum item encontrado"
                        >
                        </v-data-table>
                      </v-card-title>
                    </div>

                    <v-expand-transition>
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
                          <v-btn
                            text
                            color="teal accent-4"
                            @click="reveal = false"
                          >
                            Salvar
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-expand-transition>
                  </v-card>
                </v-dialog>
              </v-app>
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
                name="pequeno"
                id="pequeno"
                v-if="selectTamanho == 'Pequeno'"
                :headers="headersFichaP"
                :items="itensPequeno"
                :search="search"
                no-data-text="Nenhum item selecionado"
                no-results-text="Nenhum item encontrado"
              >
                <template v-slot:[`item.qtd`]="props">
                  <v-edit-dialog
                    :return-value.sync="props.item.qtdP"
                    @save="save"
                    @cancel="cancel"
                    @open="open"
                    @close="close"
                  >
                    {{ props.item.qtdP ? props.item.qtdP : 0 }}
                    <template v-slot:input>
                      <v-text-field
                        v-model="props.item.qtdP"
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

              <v-data-table
                name="medio"
                id="medio"
                v-if="selectTamanho == 'Medio'"
                :headers="headersFichaM"
                :items="itensMedio"
                :search="search"
                no-data-text="Nenhum item selecionado"
                no-results-text="Nenhum item encontrado"
              >
                <template v-slot:[`item.qtd`]="props">
                  <v-edit-dialog
                    :return-value.sync="props.item.qtdM"
                    @save="save"
                    @cancel="cancel"
                    @open="open"
                    @close="close"
                  >
                    {{ props.item.qtdM ? props.item.qtdM : 0 }}

                    <template v-slot:input>
                      <v-text-field
                        v-model="props.item.qtdM"
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

              <v-data-table
                name="grande"
                id="grande"
                v-if="selectTamanho == 'Grande'"
                :headers="headersFichaG"
                :items="itensGrande"
                :search="search"
                no-data-text="Nenhum item selecionado"
                no-results-text="Nenhum item encontrado"
              >
                <template v-slot:[`item.qtd`]="props">
                  <v-edit-dialog
                    :return-value.sync="props.item.qtdG"
                    @save="save"
                    @cancel="cancel"
                    @open="open"
                    @close="close"
                  >
                    {{ props.item.qtdG ? props.item.qtdG : 0 }}

                    <template v-slot:input>
                      <v-text-field
                        v-model="props.item.qtdG"
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
          <!-- FIM FICHA TECNICA -->
          <!-- <Pergunta v-if="teste4"></Pergunta> -->
          <div class="divTabPergunta" v-if="teste4">
            <div class="headerTabPergunta">
              <div class="headerTabPerguntaTamanho">
                <h1 class="tituloTabPerguntaTamanho">
                  Selecione as perguntas do tamanho:
                </h1>
                <!-- <select class="input-select selectComplTamanho">
                  <option value="valor1">Broto (P)</option>
                  <option value="valor2">Média (M)</option>
                  <option value="valor3">Grande (G)</option>
                </select> -->
              </div>

              <v-app>
                <v-dialog
                  v-model="dialog_pergunta"
                  persistent
                  max-width="1000px"
                >
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
                        v-model="searchPergunta"
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
                          :search="searchPergunta"
                          show-select
                          class="elevation-1"
                          no-data-text="Nenhum item selecionado"
                          no-results-text="Nenhum item encontrado"
                        >
                        </v-data-table>
                      </template>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="red" text @click="dialog_pergunta = false">
                        Fechar
                      </v-btn>
                      <v-btn
                        color="green"
                        text
                        @click="dialog_pergunta = false"
                      >
                        Salvar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-app>
            </div>

            <!-- <v-app>
              <v-card>
                <v-card-title>
                  <v-text-field
                    v-model="search_pergunta"
                    append-icon="mdi-magnify"
                    label="Buscar"
                    single-line
                    hide-details
                  ></v-text-field>
                </v-card-title>
                <v-data-table
                  :headers="headers_pergunta"
                  :items="itens_pergunta"
                  :search="search_pergunta"
                >
                  <template v-slot:[`item.actions`]="{ item }">
                    <v-icon dense @click="deleteItem(item)">
                      mdi-delete
                    </v-icon>
                  </template>
                </v-data-table>
              </v-card>
            </v-app> -->

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
                  no-data-text="Nenhum item selecionado"
                  no-results-text="Nenhum item encontrado"
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
          <!-- FIM PERGUNTA  -->
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
// import Detalhes from "@/components/Produtos/Tabs Produtos/DetalhesProdutoTamanho.vue";
// import TabComplementos from "@/components/Tipos Produtos/ProdutosTamanho/TabelaTamanho/TabComplementoTamanho.vue";
// import FichaTecnica from "@/components/Tipos Produtos/ProdutosTamanho/TabelaTamanho/TabFichaTamanho.vue";
// import Pergunta from "@/components/Tipos Produtos/ProdutosTamanho/TabelaTamanho/TabPerguntaTamanho.vue";
import TamanhoProd from "@/components/Tipos Produtos/ProdutosTamanho/TabelaTamanho/TabelaTamanho.vue";

import axios from "axios";
import { baseApiUrl } from "@/global";
export default {
  name: "NovoProdutoTamanho",
  components: {
    // Detalhes,
    // TabComplementos,
    // FichaTecnica,
    // Pergunta,
    TamanhoProd,
  },
  data() {
    return {
      previewImage: null,
      tipoSelect: "",
      switch1: true,
      categoriaProduto: [],
      tipoProduto: [],
      teste: true,
      teste2: false,
      teste3: false,
      teste4: false,
      tamanhos: [],

      // COMPLEMENTOS
      complementos_static: [],

      //FICHA TECNICA

      selectTamanho: "",
      dialog: false,
      reveal: false,
      search: "",
      search2: "",
      headersFichaP: [
        { text: "Nome do Item", value: "nomeInsumo" },
        { text: "Qtde.", value: "qtd" },
        { text: "Medida", value: "medida" },
        { text: "Custo", value: "preco" },
        // { text: "Ações", value: "actions" },
      ],
      headersFichaM: [
        { text: "Nome do Item", value: "nomeInsumo" },
        { text: "Qtde.", value: "qtd" },
        { text: "Medida", value: "medida" },
        { text: "Custo", value: "preco" },
        // { text: "Ações", value: "actions" },
      ],
      headersFichaG: [
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
        // { text: "Ações", value: "actions" },
      ],

      cabecalhoFichaM: [
        { text: "Insumos", value: "nomeInsumo" },
        { text: "Medida", value: "medida" },
        { text: "Preço Custo", value: "preco" },
        // { text: "Ações", value: "actions" },
      ],

      cabecalhoFichaG: [
        { text: "Insumos", value: "nomeInsumo" },
        { text: "Medida", value: "medida" },
        { text: "Preço Custo", value: "preco" },
        // { text: "Ações", value: "actions" },
      ],
      itensFicha: [],

      // PERGUNTA

      dialog_pergunta: false,
      reveal_pergunta: false,
      search_pergunta: "",
      searchPergunta: "",
      headers: [
        { text: "Tipo", value: "tipo" },
        // { text: "Ordem", value: "ordem" },
        { text: "Pergunta", value: "pergunta" },
        { text: "Opções de Resposta", value: "opcoesRespostas" },
        { text: "Excluir", value: "actions", sortable: false },
      ],

      singleSelect: true,
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
    };
  },
  computed: {
    item() {
      return this.$store.state.produtoTamanho.item;
    },
    nome: {
      get() {
        return this.$store.state.produtoTamanho.item.nome;
      },
      set(value) {
        this.$store.commit("alteraNomeProduto", value);
      },
    },
    status: {
      get() {
        return this.$store.state.produtoTamanho.item.status;
      },
      set(value) {
        this.$store.commit("alteraStatusProduto", value);
      },
    },
    codigo: {
      get() {
        return this.$store.state.produtoTamanho.item.codigo;
      },
      set(value) {
        this.$store.commit("alteraCodigoProduto", value);
      },
    },
    medida: {
      get() {
        return this.$store.state.produtoTamanho.item.medida;
      },
      set(value) {
        this.$store.commit("alteraMedidaProduto", value);
      },
    },
    preco_custo: {
      get() {
        return this.$store.state.produtoTamanho.item.preco_custo;
      },
      set(value) {
        this.$store.commit("alteraPrecoCustoProduto", value);
      },
    },
    categoria: {
      get() {
        return this.$store.state.produtoTamanho.item.categoria;
      },
      set(value) {
        this.$store.commit("alteraCategoriaProduto", value);
      },
    },
    tipo: {
      get() {
        return this.$store.state.produtoTamanho.item.tipo;
      },
      set(value) {
        this.$store.commit("alteraTipoProduto", value);
      },
    },
    preco_venda: {
      get() {
        return this.$store.state.produtoTamanho.item.preco_venda;
      },
      set(value) {
        this.$store.commit("alteraPrecoVendaProduto", value);
      },
    },
    descricao: {
      get() {
        return this.$store.state.produtoTamanho.item.descricao;
      },
      set(value) {
        this.$store.commit("alteraDescricaoProduto", value);
      },
    },
    complementos: {
      get() {
        return this.$store.state.produtoTamanho.item.selectComplementos;
      },
      set(value) {
        this.$store.commit("alteraComplementosProduto", value);
      },
    },

    selectPerguntas: {
      get() {
        return this.$store.state.produtoTamanho.item.selectPerguntas;
      },
      set(value) {
        this.$store.commit("alteraPerguntasProduto", value);
      },
    },

    itensPequeno: {
      get() {
        return this.$store.state.produtoTamanho.item.itensPequeno;
      },
      set(value) {
        this.$store.commit("alteraItensPequeno", value);
      },
    },

    itensMedio: {
      get() {
        return this.$store.state.produtoTamanho.item.itensMedio;
      },
      set(value) {
        this.$store.commit("alteraItensMedio", value);
      },
    },

    itensGrande: {
      get() {
        return this.$store.state.produtoTamanho.item.itensGrande;
      },
      set(value) {
        this.$store.commit("alteraItensGrande", value);
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
    getAllTipoProduto() {
      axios
        .get(`${baseApiUrl}/tiposProdutos`)
        .then((res) => {
          this.tipoProduto = res.data;
        })
        .catch();
    },
    pickFile() {
      let input = this.$refs.fileInput;
      let file = input.files;
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

    getTamanhos() {
      this.tipo = this.tipoSelect;
      axios
        .get(`${baseApiUrl}/produtoTamanhos/${this.tipoSelect}`)
        .then((res) => {
          this.tamanhos = res.data;
          console.log(this.tamanhos);
        })
        .catch();
    },
    salvarProduto() {
      const method = this.id ? "put" : "post";
      const id = this.id ? this.id : "";

      axios[method](`${baseApiUrl}/produtosComTamanhos/${id}`, this.item)
        .then(() => {
          this.$router.back();
        })
        .catch((err) => {
          console.log(err);
        });
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
              qtd: 1,
            };

            this.itensFicha.push(obj);
          });
        })
        .catch();
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
          console.log(this.perguntas);
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
    voltar() {
      this.$router.back();
    },
    deleteItem(item) {
      this.$store.commit("removePerguntasProdutoTamanho", item.id);
    },
  },
  created() {
    this.getAllCategoriaProduto();
    this.getAllTipoProduto();
    this.getAllInsumos();
    this.getAllComplementos();
    this.getAllPerguntas();
  },
};
</script>

<style>
.NovoProdutoTamanho-pages {
  padding: 20px;
}

.headerNovoProdutoTamanho {
  display: flex;
  margin-bottom: 20px;
}

.headerNovoProdutoTamanho a {
  width: 80px;
}

.headerNovoProdutoTamanho h1 {
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

.espacamentoBottom {
  margin-bottom: 15px;
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

/* COMPONENTE DETALHES */

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

.formsProdutoTamanho {
  width: 100%;
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

.campoImagemProdutoTamanho {
  width: 50%;
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

.porcento50 {
  width: 49%;
}

.areaDetalhesTamanho {
  padding: 5px;
}

.tabelaTamanhoPreco {
  background-color: #f2f2f2;
  border: 1px solid black;
}

/* --- SPAN TABELA ----*/

.headerTabelaProduto {
  display: flex;
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid black;
}

.porcentagemNomeTabela {
  width: 40%;
  padding-left: 10px;
}

.porcentagemPrecoTabela {
  width: 30%;
  padding-left: 5px;
}

.spanNomeTabela {
  font-size: 0.8rem;
  font-weight: bold;
}

.spanPrecoCustoTabela {
  font-weight: bold;
  font-size: 0.8rem;
}

.spanPrecoVendaTabela {
  font-weight: bold;
  font-size: 0.8rem;
}

/* COMPLEMENTOS */
.tituloCompleTamanho {
  font-size: 1rem;
  font-family: "Poppins";
  text-align: center;
  padding: 20px 0px 20px 0px;

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

.headerTabComplTamanho {
  display: flex;
  align-items: center;
  padding-left: 15px;
  background-color: #3decb1;
}

.selectComplTamanho {
  width: 10%;
  margin-left: 10px;
}

/* FICHA TECNICA */

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

.tituloFichaTecnicaTamanho {
  font-size: 1rem;
  font-family: "Poppins";
  margin-bottom: 0px;
  padding: 10px 10px 10px 10px;
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

.headerFichaTecnicaTamanho {
  display: flex;
}

/* PERGUNTA */
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

.tituloTabPerguntaTamanho {
  font-size: 1rem;
  font-family: "Poppins";
  margin-bottom: 0px;
  padding: 10px 10px 10px 10px;
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

.headerTabPerguntaTamanho {
  display: flex;
}
</style>