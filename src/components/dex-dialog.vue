<template>
    <div class="dex-dialog-bg" v-show="visible">
        <div class="dex-dialog">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['visible']
    }
</script>

<style scoped>
    .dex-dialog-bg{
        background: rgba(50, 50, 50, .5);
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
    }
    .dex-dialog{
        width: 80%;
        margin: auto;
        position: absolute;
        top: 15%;
        left:0;
        right: 0;
        bottom: 0;
    }
</style>