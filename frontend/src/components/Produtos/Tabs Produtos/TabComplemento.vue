<template>
  <v-app class="appComplementos">
    <div class="tabComplemento">
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
  </v-app>
</template>
 
 <script>
 import axios from "axios";
import { baseApiUrl } from "@/global";
export default {
  name: "TabComplemento",
  data() {
    return {
    
      listaComplementos: [
       
      ],
    };
  },
  methods:{
    getAllComplementos() {
      axios
        .get(`${baseApiUrl}/complemento`)
        .then((res) => {
          this.listaComplementos = res.data;
          this.listaComplementos.forEach(element => {
            element.preco_venda = element.preco_venda.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            });
            element.preco_custo = element.preco_custo.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            });
            element.status ? element.status = 'Ativo' : element.status = "Pausado"
          });
        })
        .catch();
    },
  },
  computed:{
    complementos: {
      get() {
        return this.$store.state.produto.item.complementos;
      },
      set(value) {
        this.$store.commit("alteraComplementosProduto", value);
      },
    },
  },
  created(){
    this.getAllComplementos()
  }
};
</script>
 
 <style scoped>
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
</style>