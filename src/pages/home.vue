<template>
    <div class="home-page-wrap">
        <trading-switch/>
        <trading/>
    </div>
</template>

<script>
    export default {
        components: {
            tradingSwitch: require('@/pages/components/trading-switch').default,
            trading: require('@/pages/components/trading').default
        }
    }
</script>

<style>
    .home-page-wrap {
        margin-top: -144px;
    }

    @media screen and (max-width: 768px) {
        .home-page-wrap {
            margin-top: -176px;
        }
    }
</style>