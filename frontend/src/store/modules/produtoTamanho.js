export default {
    state: {
        item: {
            nome: '',
            status: '',
            codigo: '',
            medida: '',
        
            descricao: '',
            image: '',
            categoria: '',
            tipo:'',
            selectComplementos: [],
            selectPerguntas :[],
            tamanhos:[],
            itensPequeno:[],
            itensMedio:[],
            itensGrande:[],
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
        
        alteraDescricaoProduto(state, value) {
            state.item.descricao = value
        },
        alteraImageProduto(state, value) {
            state.item.image = value
        },
        alteraCategoriaProduto(state, value) {
            state.item.categoria = value
        },
        alteraComplementosProduto(state, value) {
            state.item.selectComplementos = value
        },
     
        alteraPerguntasProduto(state, value) {
            state.item.selectPerguntas = value
        },
        alteraTipoProduto(state,value){
            state.item.tipo = value
        },
        removePerguntasProdutoTamanho(state, value) {
            state.item.selectPerguntas.splice(state.item.selectPerguntas.findIndex(({ id }) => id == value), 1)
        },

        resetProduto(state){
            state.item = {
                nome: '',
                status: '',
                codigo: '',
                medida: '',
             
                descricao: '',
                image: '',
                categoria: '',
                selectComplementos: [],
                selectPerguntas :[],
            }

          
        },
        alteraTamanhosProduto(state, value) {
            state.item.tamanhos.push(value)
        },

        alteraItensPequeno(state, value) {
            state.item.itensPequeno = value
        },

        alteraItensMedio(state, value) {
            state.item.itensMedio = value
        },
        alteraItensGrande(state, value) {
            state.item.itensGrande = value
        },


    },
    actions: {},
}