<template>
    <div class="kby-transaction">
        <header>
            <button @click="currentTab = 1" :class="{'active': currentTab === 1}">{{$t('buy')}}</button>
            <button @click="currentTab = 2" :class="{'active': currentTab === 2}">{{$t('sell')}}</button>
        </header>
        <div class="buy-content" v-show="currentTab === 1">
            <div class="information-item">
                <div class="information-label">
                    {{$t('balance')}}
                </div>
                <div class="information-value">
                    {{buy.balance}}
                </div>
            </div>
            <div class="information-item">
                <div class="information-label">
                    {{$t('amount')}}
                </div>
                <div class="information-value">
                    <input type="text" class="transaction-input" v-model="form.buy.amount"/>
                    <span class="transaction-input-unit">EOS</span>
                </div>
            </div>
            <div class="information-item">
                <div class="information-label">
                    {{$t('obtain')}} ≈
                </div>
                <div class="information-value">
                    {{getBuyObtain}}
                </div>
            </div>
            <div class="information-item">
                <button class="btn-buy" @click="buy()">{{$t('reserve')}}</button>
            </div>
        </div>
        <div class="sell-content" v-show="currentTab === 2">
            <div class="information-item">
                <div class="information-label">
                    {{$t('balance')}}
                </div>
                <div class="information-value">
                    {{sell.balance}}
                </div>
            </div>
            <div class="information-item">
                <div class="information-label">
                    {{$t('amount')}}
                </div>
                <div class="information-value">
                    <input type="text" class="transaction-input" v-model="form.sell.amount"/>
                    <span class="transaction-input-unit">KBY</span>
                </div>
            </div>
            <div class="information-item">
                <div class="information-label">
                    {{$t('obtain')}} ≈
                </div>
                <div class="information-value">
                    {{getSellObtain}}
                </div>
            </div>
            <div class="information-item">
                <button class="btn-sell" @click="sell()">{{$t('sell')}}</button>
            </div>
        </div>
    </div>

</template>

<script>
import network from '@/utils/network';
import Eos from 'eosjs';
import api from '@/utils/eos';

import {sellKuybeyFeePrecent, assetTransform} from '@/utils/math';

export default{
    created(){
        this.getEOSBalance();
    },
    data(){
        return {
            currentTab: 1,
            form: {
                buy:{
                   amount: ''
                },
                sell:{
                    amount: ''
                }
            },
            balance: '1,12312,231312.3221 EOS',
            amount: '',
            obtain: ''
        }
    },
    methods: {
        getEOSBalance() {
          api.getCurrencyBalance('eosio.token', this.account.name, 'EOS').then((row) => {
            this.balance = row[0];
            console.log(111, this.balance)
          });
        },
        buy() {
            if (this.account.bitportal) {
                this.loading = true;
                this.account.bitportal.transferEOSAsset({
                  from: this.account.name,
                  to: 'myeosgroupon',
                  symbol: 'EOS',
                  precision: 4,
                  contract: 'eosio.token',
                  amount: this.form.buy.amount,
                  memo: 'KBY'
                }).then(() => {
                  this.$notify.success('Token exchange success');
                  this.getBalance();
                  this.loading = false;
                }).catch(e => {
                  this.$notify.error(e.message || JSON.parse(e).error.details[0].message);
                  this.loading = false;
                });
            } else if (scatter) {
                eos.transfer({
                  from: this.account.name,
                  to: 'myeosgroupon',
                  quantity: Number(this.form.buy.amount).toFixed(4) + ' EOS',
                  memo: ''
                }, {
                  authorization: `${this.account.name}@${this.account.authority}`,
                  broadcast: true,
                  sign : true
                }).then(() => {
                  this.$notify.success('Token exchange success');
                  this.getBalance();
                  this.loading = false;
                }).catch(e => {
                  this.$notify.error(e.message || JSON.parse(e).error.details[0].message);
                  this.loading = false;
                });
            }
        },
        sell() {
            if (this.account.bitportal) {
                this.loading = true;
                this.account.bitportal.pushEOSAction({
                  actions: [
                    {
                      account: 'dacincubator',
                      name: 'transfer',
                      authorization: [{
                        actor: this.account.name,
                        permission: this.account.authority
                      }],
                      data: {
                        from: this.account.name,
                        to: 'dacincubator',
                        quantity: Number(this.form.sell.amount).toFixed(4) + ' KBY',
                        memo: 'sell'
                      }
                    }
                  ]
                }).then(() => {
                  this.$notify.success({ message: 'Token exchange success' });
                  this.loading = false;
                  this.getBalance();
                }).catch(e => {
                  this.$notify.error({ title: 'Failure', message: e.message || JSON.parse(e).error.details[0].message });
                })
            } else if (scatter) {
                const eos = scatter.eos(network, Eos, {});
                const options = {
                  authorization: `${this.account.name}@${this.account.authority}`,
                  broadcast: true,
                  sign :true
                };

                this.loading = true;
                eos.contract('dacincubator', options).then(contract => {
                  contract.transfer({
                    from: this.account.name,
                    to: 'dacincubator',
                    quantity: Number(this.form.sell.amount).toFixed(4) + ' KBY',
                    memo: 'sell'
                  }, options).then(() => {
                    this.$notify.success({ message: 'Token exchange success' });
                    this.loading = false;
                    this.getBalance();
                  }).catch(e => {
                    this.loading = false;
                    this.$notify.error({ title: 'Failure', message: e.message || JSON.parse(e).error.details[0].message });
                  });
                });
            }
        }
    },
    computed: {
        sellFee() {
            return sellKuybeyFeePrecent();
        },
        getBuyObtain() {
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
                    let market = rows[0];

                    // calculate the current price of KBY
                    let buy_eos_quantity = this.form.buy.amount * 10000;
                    let eos_amout = assetTransform(market.balance) + assetTransform(global.reserve);
                    let K = 10000000000;
                    let kby_quantity = (Math.sqrt(eos_amout * 2 * K) * 100 - assetTransform(market.supply)) * buy_eos_quantity / assetTransform(global.reserve);
                    return kby_quantity;
                });
            });
        },
        getSellObtain() {
            api.getTableRows({
                json: true,
                code: 'dacincubator',
                scope: 'dacincubator',
                table: 'market'
            }).then(({rows}) => {
                let market = rows[0];

                let supply = assetTransform(market.suplly) + this.form.sell.amount * 10000;
                let K = 10000000000;
                let delta_balance = (supply * supply) / 2 / K / 10000 - assetTransform(market.balance);
                return (delta_balance * (1 - sellKuybeyFeePrecent()) / 10000).toFixed(4);
            });
        }
    }
}
</script>

<style scoped>
    header button.active{
        border: none;
        border-bottom: 2px solid #0688e9;
        background: #fff;
        outline: 0;
    }
    .kby-transaction{
        padding:0 20px 20px;
        background: #fff;
        border-radius: 5px;
        margin: 10px auto;
    }
    .kby-transaction header{
        display: flex;
        height: 50px;
        line-height: 50px;
        margin-bottom: 20px;
    }
    .kby-transaction header button{
        flex: 1;
    }
    .transaction-input{
        outline: 0;
        padding-left: 4px;
        border: 1px solid #a8a8a8;
        background: #fff;
        border-radius: 5px 0 0 5px;
        font-size: 16px;
        min-width: 0;
        height: 40px;
        line-height: 40px;
        -webkit-appearance: none;
    }
    .transaction-input::placeholder{
        font-size: 14px;
    }
    .transaction-input-unit{
        color: #a8a8a8;
        border: 1px solid #a8a8a8;
        border-left: none;
        height: 40px;
        line-height: 40px;
        padding: 0 4px;
        background: #fff;
        border-radius: 0 5px 5px 0;
        display: inline-block;
    }
    .information-item{
        display: flex;
        height: 40px;
        line-height: 40px;
    }
    .information-label{
        flex: 1;
        justify-content: left;
        color: rgba(0,0,0,.5);
        align-items: center;
    }
    .information-value{
        flex: 3;
        align-items: center;
        text-align: right;
        justify-content: right;
    }
    .btn-buy, .btn-sell{
        width: 100%;
        outline: 0;
        border: none;
        border-radius: 5px;
        margin-top: 12px;
        height: 40px;
        -webkit-appearance: none;
    }
</style>
