import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const url = new URL(location.href);
let token = url.searchParams.get('token');

if (!token) {
  token = 'PUB';
  url.searchParams.set('token', token); 
  history.pushState('', '', url.toString());
}

export default new Vuex.Store({
  state: {
    account: {},
    token,
    tradeDisabled: false,
      eosPool: ''
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

      UPDATE_EOS_POOL(state, num){
        state.eosPool = num
      }
  }
});

