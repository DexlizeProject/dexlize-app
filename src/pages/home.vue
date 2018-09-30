<template>
    <div class="home-page-wrap">
        <trading-switch :current-table="tradingType" :switch-table="switchTable"/>
        <trading-table :trading-type="tradingType" :trading-data="tradingData" :isLoading="loadingTable"/>
    </div>
</template>

<script>
import api from '@/utils/eos';
import fetch from '@/utils/api';
import {hexTransform, assetTransform} from '@/utils/math';

export default {
    mounted() {
        this.getData();
    },
    data(){
        return{
            tradingType: 'PUB',
            tradingData: [],
            loadingTable: false
        }
    },

    methods: {
        switchTable(type){
            this.tradingType = type;
            if(type === 'PUB'){
                this.getData('Dapppub');
            }else if(type === 'KBY'){
                this.getData('Kyubey');
            }
        },
        getData(product) {
            if(!product){
                product = 'Dapppub'
            }
            switch (product) {
                case 'Dapppub':
                this.getDapppubTradingData();
                break;
                case 'Kyubey':
                this.getKyubeyTradingData();
                break;
                default:
            }
        },
        getDapppubTradingData() {
            let tokens = ['PUB', 'TPT'];
            let tradingArr = []
            this.loadingTable = true;
            tokens.forEach(token => {
                api.getTableRows({
                    json: true,
                    code: 'tokendapppub',
                    scope: token,
                    table: 'games'
                }).then(({ rows }) => {
                    let currentPrice = (1 / ((parseInt(rows[0].stake) / 10000) / (hexTransform(rows[0].eos)))).toFixed(8);
                    // get change of current token
                    fetch(`token/kline?symbol=${token}&interval=1d&limit=2`).then(({ data }) => {
                        this.loadingTable = false;
                        let change = ((data[1].high - data[0].high) / data[0].high * 100).toFixed(4);
                        change = change > 0 ?  '+' + change + '%' : change + '%';
                        tradingArr.push({
                            tradingPair: token,
                            price: currentPrice,
                            change: change
                        });
                    });
                });
            });
            this.tradingData = tradingArr
        },
        getKyubeyTradingData() {
            let tokens = ['KBY'],
                tradingArr = []
            this.loadingTable = true;
            tokens.forEach(token => {
                api.getTableRows({
                    json: true,
                    code: 'myeosgroupon',
                    scope: 'myeosgroupon',
                    table: 'global'
                }).then(({rows}) => {
                    let global = rows[0];

                    api.getTableRows({
                        json: true,
                        code: 'dacincubator',
                        scope: 'dacincubator',
                        table: 'market'
                    }).then(({rows}) => {
                        this.loadingTable = false;
                        let market = rows[0];
                        // calculate the current price of KBY
                        let buy_eos_quantity = 100;
                        let eos_amout = assetTransform(market.balance) + assetTransform(global.reserve);
                        let K = 10000000000;
                        let kby_quantity = (Math.sqrt(eos_amout * 2 * K) * 100 - assetTransform(market.supply)) * buy_eos_quantity / assetTransform(global.reserve);
                        let currentPrice = (100 / kby_quantity).toFixed(8);

                        // push the current trading data of KBY
                        tradingArr.push({
                            tradingPair: token,
                            price: currentPrice,
                            // change: '+99.00%'
                        });
                    });
                });
            });
            this.tradingData = tradingArr
        },
    },
    components: {
        tradingSwitch: require('@/pages/components/trading-switch').default,
        tradingTable: require('@/pages/components/trading-table').default
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
