<template>
    <div class="current-round-information">
        <header>{{$t('currentRoundInformation')}}</header>
        <div class="current-round-information-content">
            <div class="information-item">
                <div class="information-label">{{$t('remainingTime')}}</div>
                <div class="information-value">{{remainingTime}}</div>
            </div>
            <div class="information-item">
                <div class="information-label">{{$t('referencePrice')}} <span class="icon-question"/></div>
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
    </div>
</template>

<script>
export default{
    created(){

    },
    data(){
        return{
            remainingTime: '01.09.38',
            referencePrice: '0.002 EOS',
            reservedAmount: '3.7291 EOS',
            reservedAccounts: '80'
        }
    },
    method: {
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
                    let h = parseInt(remianTime / 3600);
                    let m = parseInt(remianTime % 3600 / 60);
                    let s = parseInt(remianTime % (60*60) % 60);
                    this.remainingTime = '' + h + '.' + m + '.' + s;
                } else {
                    this.remainingTime = '0.0.0';
                }

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
            });

            // init the reserve accounts
            api.getTableRows({
                json: true,
                code: 'myeosgroupon',
                scope: 'myeosgroupon',
                table: 'order'
            }).then(({rows}) => {
                this.reserveAccounts = rows.length;
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
</style>
