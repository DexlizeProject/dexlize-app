import Vue from 'vue';
import Vuex from 'vuex';
import { feePercent, hexTransform } from '@/utils/math';

Vue.use(Vuex);

const url = new URL(location.href);
let token = url.pathname.slice(1).toUpperCase()

export default new Vuex.Store({
    state: {
        account: {},
        token,
        tradeDisabled: false,
        about: {},
        eos_balance: '',
        balance: {
            max_supply: '',
            decimals: ''
        },
        pub:{
            about:{},
            referFeePercent:''
        },
        kby:{
            about:{}
        }
    },

    mutations: {
        UPDATE_ACCOUNT(state, account) {
            state.account = account;
        },

        UPDATE_TOKEN(state, token) {
            state.token = token;
        },

        UPDATE_TRADE_DISABLED(state, disabled) {
            state.tradeDisabled = disabled;
        },

        UPDATE_ABOUT(state, about) {
            state.about = about
        },

        UPDATE_BALANCE(state, balance){
            state.balance.max_supply = balance.max_supply;
            state.decimals = (balance.max_supply.match(/[\d\.]+/)[0].split('.')[1] || '').length;
        },

        UPDATE_PUB_ABOUT(state, about){
            state.pub.about = about;
            state.pub.about.feePercent = feePercent(about);
            state.pub.about.eosPool = (hexTransform(about.eos) - hexTransform(about.base_eos)).toFixed(4);
            state.pub.about.currentPrice = (1 / ((parseInt(about.stake)/10000) / (hexTransform(about.eos)))).toFixed(8);
            state.pub.about.stakeRatio = ((1 - (about.stake / (parseInt(about.base_stake) + parseInt(about.claimed_option)))) * 100).toFixed(4);

            state.pub.about.token_eos = hexTransform(about.eos);
            state.pub.about.token_stake = about.stake/10000;
        },

        UPDATE_KBY_ABOUT(state, market){
            state.kby.about.marketSupply = market.supply;
            state.kby.about.marketBalance = market.balance;
        },

        UPDATE_PUB_REFER_FEE_PERCENT(state, referFeePercent){
            if (referFeePercent.length == 1) {
                state.pub.referFeePercent = referFeePercent[0].fee_percent / 100;
            } else {
                state.pub.referFeePercent = 0;
            }
        },

        UPDATE_EOS_BALANCE(state, balance){
            state.eos_balance = balance;
        }
}
});

