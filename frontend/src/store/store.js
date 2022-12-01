import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import produto from './modules/produto.js'
// import { baseApiUrl } from "@/global.js"
Vue.use(Vuex)

export default new Vuex.Store({
    modules:{produto},
    state: {
        isMenuVisible: false,
        user: null,

        // PERGUNTAS

        complementosPerguntas: [],
        observacaoPerguntas: [],
        produtosPerguntas: []

    },
    mutations: {
        toggleMenu(state, isVisible) {
            if (!state.user) {
                state.isMenuVisible = false
                return
            }
            if (isVisible === undefined) {
                state.isMenuVisible = !state.isMenuVisible
            } else {
                state.isMenuVisible = isVisible
            }

            console.log(state.isMenuVisible);
        },
        setUser(state, user) {
            state.user = user
            if (user) {
                axios.defaults.headers.common['Authorization'] = `bear ${user.token}`
                state.isMenuVisible = true
            }
            else {
                delete axios.defaults.headers.common['Authorization']
                state.isMenuVisible = false
            }
        },

        setComplementosPerg(state, value) {
            if (state.complementosPerguntas.length == 0) {
                state.complementosPerguntas.push(value)
            } else {

                var objBusca = state.complementosPerguntas.findIndex(({ id }) => id == value.id)
                if (objBusca == -1)
                    state.complementosPerguntas.push(value)
                else
                    if (objBusca > -1) {
                        state.complementosPerguntas[objBusca].preco_promo = value.preco_promo
                        state.complementosPerguntas[objBusca].qtdPermitida = value.qtdPermitida
                        // Só para atualizar a lista , até eu descobrir outra forma =)
                        state.complementosPerguntas.push({})
                        state.complementosPerguntas.pop()

                    }
            }
        },
        RemoveComplementosPerg(state, value) {
            state.complementosPerguntas.splice(state.complementosPerguntas.findIndex(({ id }) => id == value), 1)
        },
        resetComplementosPerg(state) {
            state.complementosPerguntas = []
        },

        setObservacaoPerg(state, value) {
            state.observacaoPerguntas.push(value)
        },
        RemoveObservacaoPerg(state, value) {
            state.observacaoPerguntas.splice(state.observacaoPerguntas.findIndex(({ descricao }) => descricao == value.descricao), 1)
        },
        resetObservacaoPerg(state) {
            state.observacaoPerguntas = []
        },
    },
    // getters: {
    //     getAllCategoriaInsumo() {
    //         console.log('entrei')
    //         axios
    //             .get(`${baseApiUrl}/insumo`)
    //             .then((res) => {
    //                 console.log(res.data)
    //                 return res.data;
    //             })
    //             .catch(() => { return null });
    //     },
    // }
})