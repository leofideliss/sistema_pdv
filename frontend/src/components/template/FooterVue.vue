<template>
    <footer class="footer">
        <span>Copyright © 2022-2022</span>
    </footer>
</template>

<script>

export default {
    name: 'FooterVue'
}
</script>

<style>
    .footer{
        grid-area: footer;
        background: #3decb1 72%;
        color: #4280e1;

        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-right: 10px;
    }

    .footer span{
        font-family: "Rubik";
        font-size: 0.8rem;
    }
</style>
