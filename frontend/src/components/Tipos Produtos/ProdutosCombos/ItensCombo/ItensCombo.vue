<template>
    <div class="divItensCombo">
        <div class="divOpcoesCombo">
            <div class="headerDivOpcoesCombo">
                <span>Combo</span>
                <DialogCombo></DialogCombo>
            </div>
            
            <v-app>
                <v-card>

                    <v-data-table
                        :headers="headers"
                        :items="itens"
                        :search="search"
                    >
                    <template v-slot:[`item.actions`]="{ item }">
                        <v-icon
                            dense
                            class="mr-2"
                            @click="editItem(item)"
                        >
                            mdi-pencil
                        </v-icon>
                        <v-icon
                            dense
                            @click="deleteItem(item)"
                        >
                            mdi-delete
                        </v-icon>
                    </template>

                    </v-data-table>
                </v-card>
            </v-app>
        </div>
    </div> 
 </template>
 
 <script>
        import DialogCombo from '@/components/Tipos Produtos/ProdutosCombos/ItensCombo/DialogCombo.vue'


     export default{
         name: 'ItensCombo',
         components:{
            DialogCombo
        },
         data(){
             return{
                dialog: false,
                headers: [
                { text: 'Nome do Item', value: 'nome' },
                { text: 'Qtde', value: 'qtde' },
                { text: 'Valor Venda', value: 'valorVenda' },
                { text: 'Opções de Produtos', value: 'opcoesProduto', sortable:false },
                { text: 'Ações', value: 'actions', sortable:false},
                ],
                itens: [
                    {
                        nome: 'Escolha uma pizza',
                        qtde: '1',
                        valorVenda: '30',
                        opcoesProduto: 'Pizza Calabresa, Pizza Chocolate, Pizza Baiana'
                    },
                    {
                        nome: 'Escolha uma pizza',
                        qtde: '1',
                        valorVenda: '30',
                        opcoesProduto: 'Pizza Calabresa, Pizza Chocolate, Pizza Baiana'
                    },
                    {
                        nome: 'Escolha uma pizza',
                        qtde: '1',
                        valorVenda: '30',
                        opcoesProduto: 'Pizza Calabresa, Pizza Chocolate, Pizza Baiana'
                    },
                ],
             };
         },
         methods:{

         }
 
     }
 </script>
 
 <style scoped>

    .divItensCombo{
        background-color: white;
    }

    .divOpcoesCombo{
        padding: 15px;
        
    }

    .headerDivOpcoesCombo{
        display: flex;
        justify-content: space-between;
        align-items:flex-end;
        padding-bottom: 20px;
        padding-top: 15px;
        padding-right: 15px;
        padding-left: 15px;
        background-color: #f2f2f2;
        border-radius: 20px 20px 0px 0px;
    }

    .headerDivOpcoesCombo{
        color: black;
        
    }
 </style>