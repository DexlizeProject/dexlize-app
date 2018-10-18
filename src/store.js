import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const url = new URL(location.href);
let token = url.pathname.slice(1)

export default new Vuex.Store({
  state: {
    account: {},
    token,
    tradeDisabled: false,
      about: {}
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

      UPDATE_ABOUT(state, about){
        state.about = about
      }
  }
});

