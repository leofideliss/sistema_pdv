<template>
  <div class="detalhesProduto">
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
      <div>
        <TamanhoProd></TamanhoProd>
        <TamanhoProd></TamanhoProd>
        <TamanhoProd></TamanhoProd>
      </div>
    </div>
    <div class="porcento50 areaDetalhesTamanho">
      <div class="formsProdutoTamanho">
        <label for="descricao"> Descrição </label>
        <textarea name="descricao" id="descricao" cols="10" rows="5"></textarea>
      </div>
      <div class="campoImagemProdutoTamanho">
        <div class="tituloFoto">Foto do Produto</div>
        <div
          class="previewImagem"
          :style="{ 'background-image': `url(${previewImage})` }"
          @click="selectImage"
        ></div>
        <label for="arquivo" class="labelInputFile">Selecionar Foto</label>
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
</template>
 
 <script>
import TamanhoProd from "@/components/Tipos Produtos/ProdutosTamanho/TabelaTamanho/TabelaTamanho.vue";

export default {
  name: "DetalhesProdTamanho",
  components: {
    TamanhoProd,
  },
  data() {
    return {
      previewImage: null,
    };
  },
  methods: {
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
  },
};
</script>
 
 <style scoped>
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
</style>