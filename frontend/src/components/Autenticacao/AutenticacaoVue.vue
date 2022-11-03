<template>
  <div class="conteudo">
    <header>
      <img src="@/assets/logo.svg" alt="Logo do Sistema PDV" />
      <h1>Sistema PDV</h1>
    </header>
    <main>
      <form action="">
        <div class="campos-formulario">
          <input id="email" type="email" placeholder="Email" v-model="user.email"/>
          <label for="email">
            <img src="@/assets/avatar.svg" alt="Email" />
          </label>
        </div>
        <div class="campos-formulario">
          <input id="password" type="password" placeholder="Senha" v-model="user.password"/>
          <label for="password">
            <img src="@/assets/lock.svg" alt="Senha" />
          </label>
        </div>
        <div class="checkbox">
          <input type="checkbox" checked id="lembrar-senha" />
          <label for="lembrar-senha"> Lembrar senha </label>
        </div>
        <button @click.prevent="signin">Login</button>
      </form>
    </main>
    <footer>
      <span><a href="#">Esqueci minha senha </a></span>
    </footer>
  </div>
</template>

<script>
import { userKey, baseApiUrl  } from "@/global.js";
import axios from "axios";
export default {
  name: "AutenticacaoVue",
  data() {
    return {
      user: {},
    };
  },
  methods: {
    signin(){
        axios.post(`${baseApiUrl}/login`,this.user)
        .then(res=>{
            this.$store.commit('setUser',res.data)
            localStorage.setItem(userKey,JSON.stringify(res.data))
            this.$router.push({path:'/'})
        }).catch()
    }
  },
};
</script>

<style scoped>
html {
  font-size: 62.5%;
}

body,
html {
  height: 100vh;
  background: linear-gradient(72deg, #4280e1 1%, #3decb1 72%);
  display: flex;
  justify-content: center;
  align-items: center;
}

.conteudo {
  display: flex;
  flex-direction: column;
  height: 480px;
  min-height: 440px;
  max-height: 500px;
}

header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
}

header h1 {
  font-family: "Rubik";
  font-weight: bold;
  color: #f0fbfa;
  font-size: 6.4rem;
  margin-left: 25px;
}

main {
  margin: auto;
  width: 85%;
  height: 70%;
}

main form {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
}

.campos-formulario {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  height: 5.5rem;
  border: 2px solid #def7f4;
  flex-direction: row-reverse;
  transition: 0.3s;
}

.campos-formulario:hover {
  border: 2px solid #d5ecea;
}

.campos-formulario:hover > input {
  background-color: #d5ecea;
  transition: 0.3s;
}

.campos-formulario input {
  border: none;
  outline: none; /*borda que aparece quando clicamos*/
  background: #def7f4;
  width: 82%;
  height: 5.5rem;
  padding-left: 20px;
  font-size: 2rem;
  font-family: "Poppins";
  border-radius: 0 8px 8px 0;
}

::-webkit-input-placeholder {
  color: #6d6e6f;
  font-weight: 300;
}

.campos-formulario label {
  height: 5.5rem;
  width: 18%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.campos-formulario label img {
  width: 3.3rem;
  height: 3.3rem;
}

.checkbox label {
  color: #def7f4;
  font-family: "Rubik";
  font-size: 1.8rem;
  cursor: pointer;
  transition: 0.3s;
}

.checkbox label:hover {
  color: #c0e8ee;
}

.checkbox input {
  display: none;
}

.checkbox input + label::before {
  content: "";
  display: inline-block;
  width: 2.4rem;
  height: 2.4rem;
  vertical-align: middle;
  border: 2px solid #def7f4;
  border-radius: 5px;
  margin-right: 10px;
}

.checkbox input:checked + label:before {
  background: url(@/assets/check.svg) no-repeat center;
}

form button {
  height: 5.5rem;
  background-color: #447ce2;
  border: none;
  border-radius: 10px;
  color: #def7f4;
  outline: none;
  cursor: pointer;
  font-size: 3rem;
  font-family: "Rubik";
  transition: 0.3s;
}

form button:hover {
  background: #3f72d1;
}

.conteudo footer {
  margin: auto;
  width: 85%;
  display: flex;
  height: 20%;
  align-items: center;
  border-bottom: 2px solid #def7f478;
}

.conteudo footer a {
  color: #cbf0ee;
  text-decoration: none;
  font-size: 1.6rem;
  font-weight: 400;
  font-family: "Rubik";
  font-style: italic;
  transition: 0.3s;
}

.conteudo footer a:hover {
  color: #bee3e9;
}

@media (max-width: 600px) {
  html {
    font-size: 58%;
  }

  header h1 {
    font-size: 5.5rem;
  }
}

@media (max-width: 470px) {
  html {
    font-size: 56%;
  }

  header h1 {
    display: none;
  }

  .conteudo {
    width: 80%;
  }

  .conteudo main,
  .conteudo footer {
    width: 100%;
  }

  .conteudo footer a {
    font-size: 1.4rem;
  }
}
</style>
