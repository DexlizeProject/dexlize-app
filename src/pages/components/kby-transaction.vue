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
                    <input type="text" class="transaction-input" v-model="buy.amount"/>
                    <span class="transaction-input-unit">EOS</span>
                </div>
            </div>
            <div class="information-item">
                <div class="information-label">
                    {{$t('obtain')}} ≈
                </div>
                <div class="information-value">
                    {{buy.obtain}}
                </div>
            </div>
            <div class="information-item">
                <button class="btn-buy" @click="reserve()">{{$t('reserve')}}</button>
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
                    <input type="text" class="transaction-input" v-model="sell.amount"/>
                    <span class="transaction-input-unit">KBY</span>
                </div>
            </div>
            <div class="information-item">
                <div class="information-label">
                    {{$t('obtain')}} ≈
                </div>
                <div class="information-value">
                    {{sell.obtain}}
                </div>
            </div>
            <div class="information-item">
                <button class="btn-sell" @click="sell()">{{$t('sell')}}</button>
            </div>
        </div>
    </div>

</template>

<script>
    export default{
        data(){
            return {
                currentTab: 1,
                buy:{
                    balance: '1,12312,231312.3221 EOS',
                    amount: '',
                    obtain: ''
                },
                sell:{
                    balance: '1,12312,231312.3221 EOS',
                    amount: '',
                    obtain: ''
                }

            }
        },
        method:{
            reserve(){
                console.log('reserve')
            },
            sell(){
                console.log('sell')
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
    }
</style>