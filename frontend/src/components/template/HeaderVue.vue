<template>
    <header class="header">
        <a class="toggle" @click="toggleMenu" v-if="hideToggle" >
            <img src="@/assets/menu-aberto.png" alt="menu lateral" class="menu-lateral">
        </a>
        <h1 class="titulo">
            <router-link to="/">
                {{titulo}}
            </router-link>
        </h1>
    </header>
</template>

<script>

export default {
    name: 'HeaderVue',
    props:{
        titulo: String,
        hideToggle: Boolean
    },
    methods: {
        toggleMenu(){
            this.$store.commit('toggleMenu')
        }
    }
}
</script>

<style>
    .header{
        grid-area: header;
        background: #3decb1 72%;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .titulo{
        font-size: 1.2rem;

        color: black;
        font-weight: 100;
        flex-grow: 1;
        text-align: center;
        font-family: "Rubik";
        margin-bottom: 0px;
    }

    .titulo a{
        color: black;
        text-decoration: none;
    }

    .header.header > a.toggle{
        width: 60px;
        height: 100%;
        color: #fff;
        justify-self: flex-start;
        text-decoration: none;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .menu-lateral{
        width: 20px;
    }

    header.header > a.toggle:hover{
        background-color: rgba(0,0,0,0.2);
        cursor: pointer;
    }
</style>
