<template>
    <div class="home-page-wrap">
        <trading-switch/>
        <trading :trading-data="tradingData"/>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                tradingData: []
            }
        },
        created(){
            this.tradingData = [
                {
                    tradingPair: 'PUB/EOS',
                    price: '0.031313123',
                    change: '+ 99.99%'
                },
                {
                    tradingPair: 'PUB/EOS',
                    price: '0.031313123',
                    change: '+ 99.99%'
                },
                {
                    tradingPair: 'PUB/EOS',
                    price: '0.031313123',
                    change: '+ 99.99%'
                },
                {
                    tradingPair: 'PUB/EOS',
                    price: '0.031313123',
                    change: '+ 99.99%'
                },
                {
                    tradingPair: 'PUB/EOS',
                    price: '0.031313123',
                    change: '+ 99.99%'
                },
                {
                    tradingPair: 'PUB/EOS',
                    price: '0.031313123',
                    change: '+ 99.99%'
                },
                {
                    tradingPair: 'PUB/EOS',
                    price: '0.031313123',
                    change: '+ 99.99%'
                },
                {
                    tradingPair: 'PUB/EOS',
                    price: '0.031313123',
                    change: '+ 99.99%'
                }
            ]
        },
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