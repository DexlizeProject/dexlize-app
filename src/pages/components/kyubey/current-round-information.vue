<template>
    <div class="current-round-information">
        <header>{{$t('currentRoundInformation')}}</header>
        <div class="current-round-information-content">
            <div class="information-item">
                <div class="information-label">{{$t('remainingTime')}}</div>
                <div class="information-value">{{remainingTime}}</div>
            </div>
            <div class="information-item">
                <div class="information-label">{{$t('referencePrice')}} <span @click="showReferencePrice = true" class="icon-question"/></div>
                <div class="information-value">{{referencePrice}}</div>
            </div>
            <div class="information-item">
                <div class="information-label">{{$t('reservedAmount')}}</div>
                <div class="information-value">{{reservedAmount}}</div>
            </div>
            <div class="information-item">
                <div class="information-label">{{$t('reservedAccounts')}}</div>
                <div class="information-value">{{reservedAccounts}}</div>
            </div>
        </div>
        <dex-dialog :visible.sync="showReferencePrice">
            <div class="card">
                <div class="card-header">
                    <div class="card-nav">
                        {{$t('whyNoPrice')}}
                        <font-awesome-icon icon="times" @click="showReferencePrice = false"/>
                    </div>
                </div>
                <div class="card-content">
                    {{$t('whyNoPriceExplain')}}
                </div>
            </div>
        </dex-dialog>
    </div>
</template>

<script>
    import api from '@/utils/eos';
    import {sellKuybeyFeePrecent, assetTransform} from '@/utils/math';

    export default{
    created(){
        this.initRoundInfo();
    },
    data(){
        return{
            remainingTime: '',
            referencePrice: '',
            reservedAmount: '',
            reservedAccounts: '',
            showReferencePrice: false
        }
    },
    methods: {
        closeDialog(){
            this.$root.$emit('close-dialog')
        },
        initRoundInfo() {
            // init the info
            api.getTableRows({
                json: true,
                code: 'myeosgroupon',
                scope: 'myeosgroupon',
                table: 'global'
            }).then(({rows}) => {
                let global = rows[0];
                // init the reserve amount
                this.reservedAmount = global.reserve;

                // calculate remaining time
                let PERIOD = 6 * 60 * 60;
                let remainingTime = PERIOD - (parseInt(Date.now() / 1000) - global.claim_time);
                if (remainingTime > 0) {
                    let h = parseInt(remainingTime / 3600);
                    let m = parseInt(remainingTime % 3600 / 60);
                    let s = parseInt(remainingTime % (60*60) % 60);
                    this.remainingTime = '' + h + ':' + m + ':' + s;
                } else {
                    this.remainingTime = '0:0:0';
                }
                if (assetTransform(global.reserve) > 0) {
                    api.getTableRows({
                        json: true,
                        code: 'dacincubator',
                        scope: 'dacincubator',
                        table: 'market'
                    }).then(({rows}) => {
                        let market = rows[0];

                        // calculate the current price of KBY
                        let buy_eos_quantity = 100;
                        let eos_amout = assetTransform(market.balance) + assetTransform(global.reserve);
                        let K = 10000000000;
                        let kby_quantity = (Math.sqrt(eos_amout * 2 * K) * 100 - assetTransform(market.supply)) * buy_eos_quantity / assetTransform(global.reserve);
                        let currentPrice = (100 / kby_quantity).toFixed(4);

                        // init the the reference price
                        this.referencePrice = currentPrice + ' EOS';
                    });
                } else {
                    this.referencePrice = 0.0020 + ' EOS';
                }
            });

            // init the reserve accounts
            api.getTableRows({
                json: true,
                code: 'myeosgroupon',
                scope: 'myeosgroupon',
                limit: 65535,
                table: 'order'
            }).then(({rows}) => {
                this.reservedAccounts = rows.length;
            });
        }
    }
}
</script>

<style scoped>
    .current-round-information{
        padding: 20px;
        background: #fff;
        border-radius: 5px;
        margin: 10px auto;
    }
    .current-round-information header{
        height: 20px;
        padding-left: 10px;
        border-left: 5px solid #0688e9;
        margin-bottom: 20px;
    }
    .information-item{
        display: flex;
        height: 32px;
        line-height: 32px;
    }
    .information-label{
        flex: 1;
        justify-content: left;
        color: rgba(0,0,0,.5);
    }
    .information-value{
        flex: 1;
        text-align: right;
        justify-content: right;
    }

    .current-round-information .card-header{
        border-bottom: 1px solid rgba(0,0,0,.1);
        margin-bottom: 20px;

    }


    .current-round-information .card-nav{
        color: rgba(0,0,0,.5);
        text-align: left;
    }

    .current-round-information .card-header svg{
        width: 18px;
        height: 18px;
        float: right;
        margin-top: 12px;
    }

    .current-round-information .card-content{
        color: #2f2f2f;
        font-size: 12px;
        line-height: 17px;
    }
</style>
