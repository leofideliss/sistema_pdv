<template>
  <div class="divComplemento">
    <div class="checkboxItemComplemento">
      <v-checkbox
        @click="adicionarItem"
        v-model="select"
        :value="complemento.id"
        style="margin-top: 0px !important"
      ></v-checkbox>
      <span>{{ complemento.nome }}</span>
    </div>
    <div class="inputQtdeMaxima">
      <input
        class="textoQtdeMaxima"
        id="qtdeMaxima"
        type="number"
        v-model="item.qtdPermitida"
      />
    </div>
    <div class="inputValorVenda">
      <span>{{ complemento.preco_venda }}</span>
    </div>
    <div class="inputQtdeMaxima">
      <v-currency-field
        placeholder="R$0,00"
        id="precoCustoTamanho"
        v-model="promocao"
      />
    </div>
  </div>
</template>
 
 <script>
export default {
  name: "TabelaComplemento",
  props: ["complemento"],
  data() {
    return {
      teste: true,
      select: "",
      promocao: '',
      item: {
        qtdPermitida: "",
        id: "",
      },
    };
  },

  methods: {
    adicionarItem() {
      if (this.select) {
        this.item.id = this.select;
        this.item.tipo = "Complemento";
        this.item.opcao = this.complemento.nome;
        this.item.preco_venda = this.complemento.preco_venda;
        this.item.preco_promo = this.promocao.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        })
        this.$store.commit("setComplementosPerg", this.item);
      } else {
        this.$store.commit("RemoveComplementosPerg", this.item);
        this.item = {
          qtdPermitida: "",
          id: "",
        }
      }
    },
  },
};
</script>
 
 <style scoped>
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