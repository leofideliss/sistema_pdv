import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
// import { baseApiUrl } from "@/global.js"
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isMenuVisible: false,
        user: null
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
        }
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