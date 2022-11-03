<template>
    <div class="NovaObservacao-pages">
        <div class="headerNovaObservacao">
            <router-link to='/observacao' class="botaoVoltar">
                <img src="@/assets/seta-esquerda.png" alt="Voltar para Página anterior">
                <h1>Voltar</h1>
            </router-link>

            <h1>
                Adicionar Nova Observação
            </h1>
        </div>

        <form action="" class="fomularioComplemento">
            <div class="primeiraLinha">
                <div class="personalizarCampos">
                    <div class="campos-formulario campoObservacao">
                        <label for="nomeObservacao">
                            Descrição
                        </label>
                        <input id="nomeObservacao" type="text">
                    </div>
                </div>
            </div>

            <div class="selecionarCategorias">
                <h1>Categorias de Produto vinculadas a sua observação</h1>
                <div class="divCheckboxCategorias">
                    <div class="checkboxItem">
                        <v-checkbox
                        v-model="selected"
                        value="pizzas"
                        ></v-checkbox>
                        <span>Pizzas</span>
                    </div>
                    <div class="checkboxItem">
                        <v-checkbox
                        v-model="selected"
                        value="pizzas"
                        ></v-checkbox>
                        <span>Pizzas</span>
                    </div>
                    <div class="checkboxItem">
                        <v-checkbox
                        v-model="selected"
                        value="pizzas"
                        ></v-checkbox>
                        <span>Pizzas</span>
                    </div>
                    <div class="checkboxItem">
                        <v-checkbox
                        v-model="selected"
                        value="pizzas"
                        ></v-checkbox>
                        <span>Pizzas</span>
                    </div>
                    <div class="checkboxItem">
                        <v-checkbox
                        v-model="selected"
                        value="pizzas"
                        ></v-checkbox>
                        <span>Pizzas</span>
                    </div>
                    <div class="checkboxItem">
                        <v-checkbox
                        v-model="selected"
                        value="pizzas"
                        ></v-checkbox>
                        <span>Pizzas</span>
                    </div>
                    <div class="checkboxItem">
                        <v-checkbox
                        v-model="selected"
                        value="pizzas"
                        ></v-checkbox>
                        <span>Pizzas</span>
                    </div>
                    <div class="checkboxItem">
                        <v-checkbox
                        v-model="selected"
                        value="pizzas"
                        ></v-checkbox>
                        <span>Pizzas</span>
                    </div>


                </div>

            </div>

            <div class="botaos-form">
                <button class="botao-cancelar">
                    Cancelar
                </button>
                <button class="botao-salvar">
                    Salvar
                </button>                
            </div>

        </form>
    </div>
</template>

<script>

    export default{
    name: 'NovaObservacao',
    data(){
        return{

        }
    }
    }
</script>

<style scoped>
    .headerNovaObservacao{
        display: flex;
        margin-bottom: 20px;
    }

    .headerNovaObservacao a{
        width: 80px;
    }

    .headerNovaObservacao h1{
        font-size: 1.6rem;
        width: 90%;
        text-align: center;
        margin-bottom: 0px;
    }

    .botaoVoltar{
        display: flex;
        align-items: center;
        text-decoration: none;
    }

    .botaoVoltar:hover{
        text-decoration: none;
    }

    .botaoVoltar img{
        width: 13px;
        height: 13px;
        margin-right: 10px;
    }

    .botaoVoltar h1{
        color: black;
        font-family: 'Rubik';
        font-size: 1.3rem;
        margin-bottom: 0px;
    }

    .fomularioComplemento{
        padding: 20px;
        display: flex;
        flex-direction: column;
        background-color: #f2f2f2;
        border-radius: 20px;
    }

    .primeiraLinha{
        display: flex;
        width: 100%;
        justify-content: space-between;
    }

    .personalizarCampos{
        display: flex;
        width: 100%;
    }

    .campos-formulario{
        display: flex;
        flex-direction: column;
        transition: .3s;
        margin: 10px
    }

    .campos-formulario label{
        font-family: 'Poppins';
        margin-bottom: 5px;
        font-size: 0.9rem;

    }

    .campos-formulario input{
        border: 1px solid black;
        outline: none; /*borda que aparece quando clicamos*/
        padding: 5px;
        background:white;
        font-size: 0.8rem;
        font-family: 'Poppins';
        border-radius: 5px;
    }

    .campoObservacao{
        width: 100%;
    }

    .botaos-form{
        display: flex;
        justify-content: end;
        margin-top: 50px;
    }

    .botaos-form button{
        padding: 10px 15px 10px 15px;
        border: none;
        border-radius: 10px;
        color: #def7f4;
        outline: none;
        cursor: pointer;
        font-size: 1rem;
        font-family: "Rubik";
        transition: .3s;
    }

    .botao-cancelar{
        background-color: #ff3131;
        margin-right: 15px;
    }

    .botao-cancelar:hover{
        background-color: #f95858;
    }

    .botao-salvar{
        background-color: #008000;
    }

    .botao-salvar:hover{
        background-color: #00b300;
    }

    .v-text-field{
        padding-top: 0px !important;
        margin-top: 0px !important;
    }

    .v-text-field input{
        padding: 5px !important;
    }

    .v-text-field > .v-input__control > .v-input__slot:before{
        border-style: none !important;
    }

    .input-select{
        border: 1px solid black;
        outline: none; /*borda que aparece quando clicamos*/
        padding: 5px;
        background:white;
        font-size: 0.8rem;
        font-family: 'Poppins';
        border-radius: 5px;
    }

    /* ---- CATEGORIAS ----- */

    .selecionarCategorias{
        padding: 10px;
        
    }

    .selecionarCategorias h1{
        font-family: 'Poppins';
        margin-bottom: 5px;
        font-size: 0.9rem;
    }

    .divCheckboxCategorias{
        background-color: white;
        display: flex;
        border: 1px solid black;
        flex-wrap: wrap;
        padding: 15px;
        border-radius: 15px;
        max-height: 350px;
        overflow-y: scroll;
    }

    .checkboxItem{
        display: flex;
        align-items: center;
        width: 150px;
        margin-bottom: 10px;
    }

    .checkboxItem span{
        font-family: 'Poppins';
        
        font-size: 0.9rem;
    }

    .v-input--selection-controls{
        padding-top: 0px !important;
    }

</style>