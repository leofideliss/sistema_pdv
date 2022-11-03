<template>
   <div class="detalhesProduto">
        <div class="formsProduto">
            <label for="descricao">
                Descrição
            </label>
            <textarea name="descricao" id="descricao" cols="10" rows="5"></textarea>
        </div>
        <div class="campoImagemProduto">
            <div class="tituloFoto">Foto do Produto</div>
            <div class="previewImagem" :style="{'background-image': `url(${previewImage})`}" @click="selectImage"></div>
            <label for="arquivo" class="labelInputFile">Selecionar Foto</label>
            <input id="arquivo" ref="fileInput" type="file" class="inputImagem" @input="pickFile"/>
        </div>
   </div> 
</template>

<script>
    export default{
        name: 'DetalhesProd',
        data(){
            return{
                previewImage: null
            };
        },
        methods:{
            pickFile(){
                let input = this.$refs.fileInput;
                let file = input.files;
                if(file && file[0]){
                    let reader = new FileReader;
                    reader.onload = e =>{
                        this.previewImage = e.target.result
                    }
                    reader.readAsDataURL(file[0]);
                    this.$emit('input', file[0])
                }
            },
            selectImage(){
                this.$refs.fileInput.click()
            }
        }

    }
</script>

<style scoped>
    .v-application--wrap{
        min-height: 0px !important;
    }

    .detalhesProduto{
        background-color: white;
        padding: 20px;
        display: flex;
        justify-content: space-between;
    }

    .detalhesProduto textarea{
        padding: 10px;
        max-width: 100%;
        width:100%;
        border-radius: 5px;
        border: 1px solid #ccc;
    }

    .formsProduto{
        width: 65%;
    }

    .previewImagem{
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

    
    .campoImagemProduto{
        width: 30%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .labelInputFile{
        padding: 15px 10px;
        width: 100%;
        max-width: 250px;
        background-color: #3decb1;
        color: black;
        font-family: 'Poppins';
        text-transform: uppercase;
        text-align: center;
        font-size: 1.2rem;
        margin-bottom: 0px;
    }

    .inputImagem{
        display: none;
    }

    .tituloFoto{
        font-family: 'Poppins';
        margin-bottom: 5px;
        font-size: 1rem;
    }

</style>