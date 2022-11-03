<template>
  <div id="principal" :class="{'hide-menu': !isMenuVisible}">
    <HeaderVue titulo="Sistema PDV" />
    <MenuVue />
    <FooterVue />
    <ConteudoVue />
  </div>
</template>

<script>
/*import AutenticacaoVue from './components/Autenticacao/AutenticacaoVue.vue'*/
import HeaderVue from './components/template/HeaderVue.vue'
import MenuVue from './components/template/MenuVue.vue'
import FooterVue from './components/template/FooterVue.vue'
import ConteudoVue from './components/template/ConteudoVue.vue'
import { mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    HeaderVue,
    MenuVue,
    FooterVue,
    ConteudoVue,
  },
  computed: mapState(['isMenuVisible'])


};
</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}


html,body{
  font-family: 'Poppins', sans-serif;
  font-family: 'Rubik', sans-serif;
  font-family: 'Roboto', sans-serif;
}

#principal{
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  display: grid;
  grid-template-rows: 60px 1fr 40px;
  grid-template-columns: 300px 1fr;
  grid-template-areas: 
  "header header"
  "menu content"
  "footer footer";
}

#principal.hide-menu{
  grid-template-areas:
  "header header"
  "content content"
  "footer footer";
}

.v-application--wrap{
            min-height: 0px !important;
    }


    .v-text-field__details{
        min-height: 0px !important;
    }


</style>
