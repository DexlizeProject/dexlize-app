<template>
    <div>
        <table class="trading-pair-table" v-show="this.tradingType === 'PUB'">
            <thead>
            <tr>
                <th>{{$t('tradingPair')}}</th>
                <th>{{$t('price')}}</th>
                <th>{{$t('change')}}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-show="isLoading"><td class="loading-td">Loading...</td></tr>
            <tr v-for="item in this.tradingData" @click="viewTokenDetail(item.tradingPair)">
                <td><span class="icon-token"/>{{item.tradingPair}}<span class="trading-pair-unit">/EOS</span></td>
                <td>{{item.price}}</td>
                <td><div class="trading-percent" :class="'up'">{{item.change}}</div></td>
            </tr>
            </tbody>
        </table>
        <table class="trading-pair-table" v-show="this.tradingType === 'KBY'">
            <thead>
            <tr>
                <th>{{$t('tradingPair')}}</th>
                <th>{{$t('referencePrice')}}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-show="isLoading"><td class="loading-td">Loading...</td></tr>
            <tr v-for="item in this.tradingData" @click="viewTokenDetail('KBY')">
                <td><span class="icon-token"/>{{item.tradingPair}}<span class="trading-pair-unit">/EOS</span></td>
                <td>{{item.price}}</td>
            </tr>
            </tbody>
        </table>
    </div>

</template>

<script>
    export default{
        props: ['tradingData', 'tradingType', 'isLoading'],
        created(){
        },
        methods:{
            viewTokenDetail(tokenType) {
                const url = tokenType === 'PUB' || tokenType === 'TPT' ? new URL('/pub', location.href) : new URL('/kyubey', location.href);
                // url.searchParams.set('token', tokenType);
                location.href = url;
            }
        }
    }
</script>

<style>
    .icon-token{
        display: inline-block;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        margin-right: 10px;
        vertical-align: middle;
        background: #0f77ff;
    }
    .trading-pair-table{
        background: #fff;
        width: 100%;
        border-radius: 5px;
        padding: 0 20px;
    }

    .loading-td{
        height: 56px;
        line-height: 1;
    }

    .trading-pair-unit{
        font-size: 12px;
        color: rgba(0,0,0,.5);
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
        font-size: 16px;
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

    .trading-percent{
        border-radius: 5px;
        height: 25px;
        line-height: 25px;
        font-size: 14px;
        text-align: center;
        width: 85%;
        float: right;
    }

    .trading-percent.up{
        color: #fff;
        background: #44c14a;
    }

    .trading-percent.down{
        color: #fff;
        background: #ef2f5f;
    }


</style>