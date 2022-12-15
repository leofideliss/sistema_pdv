export default {
    state: {
        item: {
            nome: '',
            status: '',
            codigo: '',
            medida: '',
            preco_custo: '',
            preco_venda: '',
            descricao: '',
            image: '',
            categoria: '',
 
        }
    },
    getters: {},
    mutations: {
        alteraNomeProduto(state, value) {
            state.item.nome = value
        },
        alteraStatusProduto(state, value) {
            state.item.status = value
        },
        alteraCodigoProduto(state, value) {
            state.item.codigo = value
        },
        alteraMedidaProduto(state, value) {
            state.item.medida = value
        },
        alteraPrecoCustoProduto(state, value) {
            state.item.preco_custo = value
        },
        alteraPrecoVendaProduto(state, value) {
            state.item.preco_venda = value
        },
        alteraDescricaoProduto(state, value) {
            state.item.descricao = value
        },
        alteraImageProduto(state, value) {
            state.item.image = value
        },
        alteraCategoriaProduto(state, value) {
            state.item.categoria = value
        },
      

        resetProduto(state){
            state.item = {
                nome: '',
                status: '',
                codigo: '',
                medida: '',
                preco_custo: '',
                preco_venda: '',
                descricao: '',
                image: '',
                categoria: '',
   
            }
        }


    },
    actions: {},
}