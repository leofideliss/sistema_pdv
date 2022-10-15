<template>
    <header class="header">
        <a class="toggle" @click="toggleMenu">
            <img src="@/assets/check.svg" alt="abrir e fechar">
        </a>
        <h1 class="titulo">
            {{titulo}}
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
            console.log('ToggleMenu')
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

        color: #4280e1;
        font-weight: 100;
        flex-grow: 1;
        text-align: center;
        font-family: "Rubik";
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

    header.header > a.toggle:hover{
        background-color: rgba(0,0,0,0.2);
    }
</style>
