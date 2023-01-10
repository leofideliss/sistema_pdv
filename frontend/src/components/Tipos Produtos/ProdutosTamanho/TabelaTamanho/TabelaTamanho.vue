<template>
  <div class="divTamanho">
    <div class="checkboxItemTamanho">
      <v-checkbox
        v-model="reg.selected"
        style="margin-top: 0px !important"
        @click="adicionarTamanho"
      ></v-checkbox>
      <span>{{ nome }} ({{ sigla }})</span>
    </div>
    <div class="precoInputTamanho">
      <v-currency-field id="precoCustoTamanho" v-model="reg.preco_custo" />
    </div>
    <div class="precoInputTamanho">
      <v-currency-field id="precoCustoTamanho" v-model="reg.preco_venda" />
    </div>
  </div>
</template>
 
 <script>
export default {
  name: "TabelaTamanho",
  props: ["sigla", "nome", "id_tamanho"],
  data() {
    return {
      teste: true,
      reg: {
        id: this.id_tamanho,
        selected: false,
        preco_venda: 0,
        preco_custo: 0,
        descricao: this.nome,
        sigla: this.sigla
      },
    };
  },
  methods: {
    adicionarTamanho() {
      if (this.reg.selected) {
        this.$store.commit("alteraTamanhosProduto", this.reg);
      }
      
    },
  },
};
</script>
 
 <style scoped>
.divTamanho {
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid black;

  padding-top: 10px;
  padding-bottom: 10px;
  background-color: white;
}

.checkboxItemTamanho {
  display: flex;
  align-items: center;
  width: 40%;
  padding-left: 10px;
}

.checkboxItemTamanho span {
  font-family: "Poppins";
  margin-left: 5px;
  font-size: 0.9rem;
  margin-right: 5px;
}

.v-input--selection-controls {
  padding-top: 0px !important;
}

#precoCustoTamanho {
  border: 1px solid black;
  border-radius: 5px;
  width: 85%;
}

.precoInputTamanho {
  width: 30%;
  padding-left: 5px;
}
</style>