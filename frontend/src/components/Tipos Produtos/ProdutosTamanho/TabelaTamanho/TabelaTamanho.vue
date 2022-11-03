<template>
    <div class="divTamanho">
        <div class="checkboxItemTamanho">
            <v-checkbox
            v-model="selected"
            value="pizzas"
            style="margin-top: 0px !important;"
            ></v-checkbox>
            <span>Grande (G)</span>
        </div>
        <div class="precoInputTamanho">
            <v-currency-field id="precoCustoTamanho" />
        </div>     
        <div class="precoInputTamanho">
            <v-currency-field id="precoCustoTamanho" />
        </div>  

    </div> 
 </template>
 
 <script>
     export default{
         name: 'TabelaTamanho',
         data(){
            return{
                teste: true
            }
         }
     }
 </script>
 
 <style scoped>
    .divTamanho{
        width: 100%;
        display: flex;
        align-items: center;
        border-bottom: 1px solid black;
        
        padding-top: 10px;
        padding-bottom: 10px;
        background-color: white;
    }

    .checkboxItemTamanho{
        display: flex;
        align-items: center;
        width: 40%;
        padding-left: 10px;
        
    }

    .checkboxItemTamanho span{
        font-family: 'Poppins';
        margin-left: 5px;
        font-size: 0.9rem;
        margin-right: 5px;
    }

    .v-input--selection-controls{
        padding-top: 0px !important;
    }

    #precoCustoTamanho{
        border: 1px solid black;
        border-radius: 5px;
        width: 85%;
    }

    .precoInputTamanho{
        width: 30%;
        padding-left: 5px;
    }

 </style>