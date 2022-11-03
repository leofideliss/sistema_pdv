<template>
    <v-app class="appComplementos">
        <div class="tabComplemento">
            <div>
                <h1 class="tituloComple">SELECIONE OS COMPLEMENTOS OPCIONAIS PARA SEU PRODUTO</h1>
            </div>

            <div class="selecionarComplementos">
                <v-select
                v-model="complementos"
                :items="listaComplementos"
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
    export default{
        name: 'TabComplemento',
        data(){
            return{
                complementos: [],
                listaComplementos: [
                    'Alface - R$1,50', 'Bacon - R$3,00', 'Cebola Frita - R$2,00', 'Queijo Prato - R$2,00', 'Queijo Cheedar - R$2,50'
                ]
            }
        }
    }
 </script>
 
 <style scoped>

    .tituloComple{
        font-size: 1.2rem;
        font-family: 'Poppins';
        text-align: center;
        padding: 20px 0px 20px 0px;
        background-color: #3decb1;;
        margin-bottom: 0px;
    }

    .appComplementos{
        display:flex;
    }

     .tabComplemento{
         background-color: white;
         padding: 20px 20px 40px 20px;
     }

     .selecionarComplementos{
        width: 100% !important; 
        padding: 30px 10px 20px 10px;
        border-width: 0px 1px 1px 1px;
        border-color: black;
        border-style: solid;
     }
 
 
 </style>