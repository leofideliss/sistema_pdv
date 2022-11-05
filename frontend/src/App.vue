<template>
  <div id="principal" :class="{ 'hide-menu': !isMenuVisible || !user, 'teste': !user }">

    <HeaderVue titulo="Sistema PDV" :hideToggle="user" />
    <MenuVue />
    <LoadingVue v-if="validatingToken" />
    <FooterVue />
    <ConteudoVue />
  </div>
</template>

<script>
import HeaderVue from "./components/template/HeaderVue.vue";
import MenuVue from "./components/template/MenuVue.vue";
import FooterVue from "./components/template/FooterVue.vue";
import ConteudoVue from "./components/template/ConteudoVue.vue";
import LoadingVue from "@/components/template/LoadingVue.vue";



import { mapState } from "vuex";

import { userKey, baseApiUrl } from "@/global.js";
import axios from "axios";

export default {
  name: "App",
  components: {
    HeaderVue,
    MenuVue,
    FooterVue,
    ConteudoVue,
    LoadingVue,
 
  },
  computed: mapState(["isMenuVisible", "user"]),
  methods: {
    async validateToken() {
      this.validatingToken = true;
      const json = localStorage.getItem(userKey);
      const userData = JSON.parse(json);
      this.$store.commit("setUser", null);
      if (!userData) {
        this.validatingToken = false;
        this.$router.push({ name: "login" });
        return;
      }
      const res = await axios.post(`${baseApiUrl}/validateToken`, userData);
      if (res.data) {
        this.$store.commit("setUser", userData);

        if (this.$mq === "xs" || this.$mq === "sm") {
          this.$store.commit("toggleMenu", false);
        }
      } else {
        localStorage.removeItem(userKey);
        this.$router.push({ name: "login" });
      }
      this.validatingToken = false;
    },
  },
  created() {
    // const user = {
    //   email: "andre@gmail.com",
    //   name: "andre",
    //   password: "admin",
    //   admin: true
    // };
    // axios.post(`${baseApiUrl}/signup`, user).then(() => {
    //   console.log("criou usuario");
    // });
    this.validateToken();
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  font-family: "Poppins", sans-serif;
  font-family: "Rubik", sans-serif;
  font-family: "Roboto", sans-serif;
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

#principal.teste{
  grid-template-areas:
    "content content"
    "content content"
    "content content";
}

.v-application--wrap{
            min-height: 0px !important;
    }


    .v-text-field__details{
        min-height: 0px !important;
    }

    .espacamento20geral{
      padding: 20px;
    }

    .botao-novo h1{
      color: black;
    }

</style>
