<template>
    <table class="trading-pair-table">
        <thead>
        <tr>
            <th>{{$t('tradingPair')}}</th>
            <th>{{$t('price')}}</th>
            <th>{{$t('change')}}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in tradingData">
            <td>{{item.tradingPair}}</td>
            <td>{{item.price}}</td>
            <td>{{item.change}}</td>
        </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        created() {
            this.tradingData = [
                {
                    tradingPair: 'PUB/EOS',
                    price: '0.031313123',
                    change: '+ 99.99%'
                }
            ]
        },
        data(){
            return{
                tradingData: []
            }
        }
    }
</script>

<style>
    .trading-pair-table{
        background: #fff;
        width: 100%;
    }

    .trading-pair-table thead th{
        font-weight: normal;
    }
</style>