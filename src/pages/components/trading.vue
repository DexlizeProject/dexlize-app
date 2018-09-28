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
        <tr v-for="item in this.tradingData">
            <td>{{item.tradingPair}}</td>
            <td>{{item.price}}</td>
            <td>{{item.change}}</td>
        </tr>
        </tbody>
    </table>
</template>

<script>
    export default{
        props: ['tradingData']
    }
</script>

<style>
    .trading-pair-table{
        background: #fff;
        width: 100%;
        border-radius: 5px;
        padding: 0 20px;
    }

    .trading-pair-table tr{
    }

    .trading-pair-table thead th{
        font-weight: normal;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #f5f5f5;
    }

    .trading-pair-table thead th:nth-child(1){
        text-align: left;
    }

    .trading-pair-table thead th:nth-child(2){
        text-align: right;
    }

    .trading-pair-table thead th:last-child{
        text-align: right;
    }

    .trading-pair-table tbody tr td{
        border-bottom: 1px solid #f5f5f5;
        height: 56px;
        line-height: 56px;
    }

    .trading-pair-table tbody tr td:nth-child(1){
        text-align: left;
    }

    .trading-pair-table tbody tr td:nth-child(2){
        text-align: right;
    }

    .trading-pair-table tbody tr td:nth-child(3){
        text-align: right;
    }


</style>