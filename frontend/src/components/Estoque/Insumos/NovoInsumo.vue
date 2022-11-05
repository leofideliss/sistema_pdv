<template>
    <div class="NovoInsumo-pages espacamento20geral">
        <div class="headerNovoInsumo">
            <router-link to='/insumos' class="botaoVoltar">
                <img src="@/assets/seta-esquerda.png" alt="Voltar para Página anterior">
                <h1>Voltar</h1>
            </router-link>

            <h1>
                Adicionar Novo Insumo
            </h1>
        </div>


        <form action="" class="fomularioComplemento">
            <div class="primeiraLinha">
                <div class="personalizarCampos space">
                    <div class="campos-formulario campoNomeInsumo">
                        <label for="nomeComplemento">
                            Nome
                        </label>
                        <input id="nomeComplemento" type="text">
                    </div>
                    <div class="campos-formulario campoCodigo">
                        <label for="codigoAcompanhamento">
                            Código
                        </label>
                        <input id="codigoAcompanhamento" type="number">
                    </div>
                </div>

            </div>
            <div class="primeiraLinha">
                <div class="personalizarCampos">
                    <div class="campos-formulario campoCategoriaInsumo">
                        <label for="precoCategoria">
                            Categoria
                        </label>

                        <select class="input-select">
                            <option value="valor1">Bebidas</option>
                            <option value="valor2">Condimentos</option>
                            <option value="valor3">Frios</option>
                            <option value="valor4">Embalagens</option>
                        </select>
                        
                    </div>                  
                    <div class="campos-formulario campoMedida">
                        <label for="produtosVinculados">
                            Medida do insumo
                        </label>
                        
                        <div class="opcoes-medidas">
                            <div class="custom-radio">
                                <input type="radio" id="un" name="medida" value="un" class="radio-medidas" checked>
                                <label for="un">UN</label>
                            </div>

                            <div class="custom-radio">
                                <input type="radio" id="kg" name="medida" value="kg" class="radio-medidas">
                                <label for="kg">KG</label>
                            </div>

                            <div class="custom-radio">
                                <input type="radio" id="lt" name="medida" value="lt" class="radio-medidas">
                                <label for="lt">LT</label>
                            </div>

                        </div>


                    </div>
                    <div class="campos-formulario campoCustoInsumo">
                        <label for="precoCusto">
                            Preço de Custo
                        </label>
                        <v-currency-field id="precoCusto" />
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
    name: 'NovoInsumo',
    data(){
        return{
            switch1: true,
            switch2: false
        }
    }
    }
</script>

<style>
    .headerNovoInsumo{
        display: flex;
        margin-bottom: 20px;
    }

    .headerNovoInsumo a{
        width: 80px;
    }

    .headerNovoInsumo h1{
        font-size: 1.8rem;
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

    .campoNomeInsumo{
        width: 50%;
    }

    .campoCodigo{
        width: 15%;
    }

    .campoCategoriaInsumo{
        width: 50%;
    }

    .campoMedida{
        width: 30%;
    }

    .campoCustoInsumo{
        width: 25%;
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

    .opcoes-medidas{
        display: flex;
        width: 100%;
    }

    .opcoes-medidas div{
        margin-right: 15px;
    }

    .radio-medidas{
        margin-right: 4px;
    }

    .custom-radio{
        display: flex;
        align-items: center;
    }

    .custom-radio label{
        cursor: pointer;
        margin-bottom: 0px !important;
    }

    .radio-medidas{
        cursor:pointer !important;
        appearance: none !important;
        width: 25px !important;
        height: 25px !important;
        border-radius: 50% !important;
        outline: none !important;
        border: 2px solid #3decb1 !important;
        position: relative !important;;
        display: flex !important;;
        align-items: center !important;;
        justify-content: center !important;
        padding: 0px !important;
    }

    .radio-medidas:before{
        content: '';
        position: absolute;
        height: 11px;
        width: 11px;
        background: #3decb1;
        border-radius: 50%;
        opacity: 0;
        transition: all 300ms ease-in-out;
    }

    .radio-medidas:checked:before{
        opacity: 1;
    }

    .radio-medidas:focus{
        box-shadow: 0 0 5px rgba(0, 0, 0, 1);
    }


    /** 
    .custom-radio input{
        display: none;
        
    }

    .custom-radio input + label:before{
        content: '';
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background-color: white;
        border: 1px solid gray;
        display: inline-block;
        vertical-align: middle;
        margin-right: 4px;
    }

    .custom-radio input:checked + label:before{
        
        background-color: #3decb1;
        border: none;
        
    }
    **/

    /** TESTE **/

    .custom-switch.b-custom-control-lg .custom-control-label::before, .input-group-lg .custom-switch .custom-control-label::before{
        height: 2rem;
        width: 4rem;
        
    }

    .custom-switch.b-custom-control-lg .custom-control-label::after, .input-group-lg .custom-switch .custom-control-label::after{
        width: calc(2rem - 4px);
        height: calc(2rem - 4px) !important;
    }
</style>