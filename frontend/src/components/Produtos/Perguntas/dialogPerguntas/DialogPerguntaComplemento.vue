<template>
  <v-dialog v-model="dialog" persistent max-width="800px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="botao-novoTipo"
        v-bind="attrs"
        v-on="on"
        style="background-color: #3decb1"
      >
        <img
          src="@/assets/mais preto.png"
          alt="Voltar para Página anterior"
          class="imgTipoTamanho"
        />
        <span v-if="itensComplementoExiste">Editar</span>
        <span v-else>Adicionar</span>
        
      </v-btn>
    </template>
    <v-card class="centralizarCard">
      <v-card-title class="topoCardTamanho">
        <span class="text-h5">Nova Opção de Resposta - Observação</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <div class="divisaoTabelaComplemento">
            <div class="headerTabelaComplemento">
              <div class="porcentagemNomeTabelaComplemento">
                <span class="spanTextoTabela textoInicial"
                  >Selecione por Produto</span
                >
              </div>
              <div class="porcentagemQtdeMaxima">
                <span class="spanTextoTabela">Qtde Máxima Permitida</span>
              </div>
              <div class="porcentagemPrecoVenda">
                <span class="spanTextoTabela">Preço de Venda</span>
              </div>
              <div class="porcentagemPrecoPromo">
                <span class="spanTextoTabela">Preço Promo</span>
              </div>
            </div>
            <div class="interiorTabelaComplemento">
              <div v-for="comp in complementos" :key="comp.id">
                <ItemTabelaComplemento
                  :complemento="comp"
                ></ItemTabelaComplemento>
              </div>
            </div>
          </div>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" text @click="dialog = false"> Fechar </v-btn>
        <v-btn color="green" text @click="salvarTabela"> Salvar </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ItemTabelaComplemento from "@/components/Produtos/Perguntas/TabelasPerguntas/TabelaComplemento.vue";
import axios from "axios";
import { baseApiUrl } from "@/global";
export default {
  name: "DialogPerguntaComplemento",
  components: {
    ItemTabelaComplemento,
  },
  data() {
    return {
      dialog: false,
      complementos: [],
      item: {},
    };
  },
  computed: {
    itensComplementoExiste() {
      if(this.$store.state.complementosPerguntas.length == 0) return false
      return true 
    },
  },
  methods: {
    getAllComplementos() {
      axios
        .get(`${baseApiUrl}/complemento`)
        .then((res) => {
          this.complementos = res.data;
          this.complementos.forEach((element) => {
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
    salvarTabela() {

      this.dialog = false;
    },
  },
  mounted() {
    this.getAllComplementos();
  },
};
</script>

<style scoped>
.headerTabelaComplemento {
  display: flex;
}

.porcentagemNomeTabelaComplemento {
  width: 40%;
  border: 1px solid black;
  padding-top: 10px;
  padding-bottom: 10px;
}

.porcentagemQtdeMaxima {
  width: 23%;
  border: 1px solid black;
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  justify-content: center;
}

.porcentagemPrecoPromo {
  width: 22%;
  border: 1px solid black;
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  justify-content: center;
}

.porcentagemPrecoVenda {
  width: 16%;
  border: 1px solid black;
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  justify-content: center;
}

.spanTextoTabela {
  font-family: "Poppins";
  font-size: 0.7rem;
  color: black;
}

.divisaoTabelaComplemento {
  border: 1px solid black;
}

.textoInicial {
  padding-left: 5px;
}

.interiorTabelaComplemento {
  max-height: 500px;
  overflow-y: scroll;
}

.divComplemento {
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid black;

  padding-top: 10px;
  padding-bottom: 10px;
  background-color: white;
}

.checkboxItemComplemento {
  display: flex;
  align-items: center;
  width: 40%;
  padding-left: 10px;
}

.checkboxItemComplemento span {
  font-family: "Poppins";
  margin-left: 5px;
  font-size: 0.9rem;
  margin-right: 5px;
  color: black;
}

.v-input--selection-controls {
  padding-top: 0px !important;
}

#precoCustoTamanho {
  border: 1px solid black;
  border-radius: 5px;
  width: 95%;
  text-align: center !important;
}

.inputQtdeMaxima {
  width: 22%;
  padding-left: 21px;
}

.inputValorVenda {
  width: 16%;
  padding-left: 5px;
  display: flex;
  justify-content: center;
}

.inputValorVenda span {
  text-align: center;
  color: black;
}

.textoQtdeMaxima {
  border: 1px solid black;
  outline: none; /*borda que aparece quando clicamos*/
  padding: 5px;
  background: white;
  font-size: 0.8rem;
  font-family: "Poppins";
  border-radius: 5px;
  width: 95%;
  text-align: center;
}
</style>