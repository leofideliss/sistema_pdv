<template>
  <div class="fundoAutenticacao">
    <form action="" class="conteudoAutenticacao">
        <header class="headerAutenticacao">
          <img src="@/assets/logo.svg" alt="Logo do Sistema PDV" />
          <h1>Sistema PDV</h1>
        </header>
        <div>
          <div class="campos-formularioAutenticacao campoEmailAutenticacao">
            <input id="email" type="email" placeholder="Email" v-model="user.email"/>
            <label for="email">
              <img src="@/assets/avatar.svg" alt="Email" />
            </label>
          </div>
          <div class="campos-formularioAutenticacao campoSenhaAutenticacao">
            <input id="password" type="password" placeholder="Senha" v-model="user.password"/>
            <label for="password">
              <img src="@/assets/lock.svg" alt="Senha" />
            </label>
          </div>
          <div class="checkbox">
            <input type="checkbox" checked id="lembrar-senha" />
            <label for="lembrar-senha"> Lembrar senha </label>
          </div>
        </div>
        <div class="footerAutenticacao">
          <button @click.prevent="signin" class="buttonAutenticacao">Login</button>
          
            <span class="esqueciSenhaAutenticacao">
              <a href="#">Esqueci minha senha </a>
            </span>


        </div>
    </form>
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

.fundoAutenticacao{
  background: linear-gradient(72deg, #4280e1 1%, #3decb1 72%);
  height: 100vh;
  display: flex;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}


.conteudoAutenticacao {
  font-size: 62.5%;
}

.conteudoAutenticacao {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 80%;
  max-width: 800px;
  height: 75%;
  
}

.headerAutenticacao {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
}

.headerAutenticacao h1 {
  font-family: "Rubik";
  font-weight: bold;
  color: #f0fbfa;
  font-size: 3.5rem;
  margin-left: 25px;
}

.headerAutenticacao img{
  width: 50px;
  height: 50px;
}

/* .mainAutenticacao {
  margin: auto;
  width: 100%;
  height: 70%;
} */

.mainAutenticacao form {
  display: flex;
  flex-direction: column;

}

.campos-formularioAutenticacao {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  height: 4rem;
  border: 2px solid #def7f4;
  flex-direction: row-reverse;
  transition: 0.3s;
}

.campos-formularioAutenticacao:hover {
  border: 2px solid #d5ecea;
}

.campos-formularioAutenticacao:hover > input {
  background-color: #d5ecea;
  transition: 0.3s;
}

.campos-formularioAutenticacao input {
  border: none;
  outline: none; /*borda que aparece quando clicamos*/
  background: #def7f4;
  width: 85%;
  height: 4rem;
  padding-left: 20px;
  font-size: 1.5rem;
  font-family: "Poppins";
  border-radius: 0 8px 8px 0;
}

::-webkit-input-placeholder {
  color: #6d6e6f;
  font-weight: 300;
}

.campos-formularioAutenticacao label {
  height: 4rem;
  width: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.campos-formularioAutenticacao label img {
  width: 2rem;
  height: 2rem;
}

.checkbox label {
  color: #def7f4;
  font-family: "Rubik";
  font-size: 1.3rem;
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
  width: 2rem;
  height: 2rem;
  vertical-align: middle;
  border: 2px solid #def7f4;
  border-radius: 5px;
  margin-right: 10px;
}

.checkbox input:checked + label:before {
  background: url(@/assets/check.svg) no-repeat center;
}

.formAutenticacao{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 90%;
  width: 80%;
  min-height: 440px;
}

.buttonAutenticacao {
  height: 4rem;
  background-color: #447ce2;
  border: none;
  border-radius: 10px;
  color: #def7f4;
  outline: none;
  cursor: pointer;
  font-size: 2rem;
  font-family: "Rubik";
  transition: 0.3s;
}

.buttonAutenticacao:hover {
  background: #3f72d1;
}

.footerAutenticacao{
  display: flex;
  flex-direction: column;
}

.esqueciSenhaAutenticacao{
  margin-top: 10px;
}

.esqueciSenhaAutenticacao a {
  color: #cbf0ee;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 400;
  font-family: "Rubik";
  font-style: italic;
  transition: 0.3s;
}

.criarContaAutenticacao a{
  color: #cbf0ee;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 400;
  font-family: "Rubik";
  font-style: italic;
  transition: 0.3s;
}

.campoEmailAutenticacao{
  margin-bottom: 50px;
}

.campoSenhaAutenticacao{
  margin-bottom: 30px;
}

.criarContaAutenticacao{

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
