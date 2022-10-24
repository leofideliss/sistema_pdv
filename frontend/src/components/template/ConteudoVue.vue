<template>
    <div class="content">
        <router-view></router-view>

    </div>
</template>

<script>

export default {
    name: 'ConteudoVue'
}
</script>

<style>
    .content{
        grid-area: content;
        background-color: white;
        padding: 20px;
    }
</style>