<template>
  <section class="token-about card">
    <div class="card-header">
      <div class="card-nav">{{$t('about')}} {{token.toUpperCase()}}
        <font-awesome-icon icon="times" @click="closeDialog"/>
      </div>
    </div>
    <ul class="about-list">
      <li>
        <label>{{$t('publisher')}}</label>
        <span>{{about.owner}}</span>
      </li>
      <li>
        <label>{{$t('publishtime')}}</label>
        <span>{{timeFormat(about.start_time)}}</span>
      </li>
      <li>
        <label>{{$t('totalamount')}}</label>
        <span>{{((+about.base_stake + Number(about.base_option) - Number(about.deserved_option)) / Math.pow(10, decimals)).toFixed(decimals)}}</span>
      </li>
      <li>
        <label>{{$t('baseoption')}}</label>
        <span>{{(about.base_option / 10000).toFixed(decimals)}}</span>
      </li>
      <li>
        <label>{{$t('eospool')}}</label>
        <span>{{about.eosPool}}</span>
      </li>
      <li>
        <label>{{$t('buyfeerate')}}</label>
        <span>{{referFeePercent}}%</span>
      </li>
      <li>
        <label>{{$t('sellfeerate')}}</label>
        <span>{{about.feePercent}}%</span>
      </li>
      <li>
        <label>{{$t('lockup')}}</label>
        <span>{{rangeFormat(about.lock_up_period)}}</span>
      </li>
    </ul>
    <ul class="social-link-wrap">
      <a href="https://t.me/DappPub" target="_blank" v-show="$store.state.token === 'PUB'"><span class="icon-telegram"></span></a>
      <a href="https://twitter.com/DappPub" target="_blank" v-show="$store.state.token === 'PUB'"><span class="icon-twitter"></span></a>
      <a href="https://medium.com/dapppub" target="_blank" v-show="$store.state.token === 'PUB'"><span class="icon-medium"></span></a>

      <a href="https://t.me/tokenPocket_en" target="_blank" v-show="$store.state.token === 'TPT'"><span class="icon-telegram"></span></a>
      <a href="https://twitter.com/TokenPocket_TP" target="_blank" v-show="$store.state.token === 'TPT'"><span class="icon-twitter"></span></a>
    </ul>
  </section>
</template>

<script>
import fetch from '@/utils/api';
import api from '@/utils/eos';
import { feePercent, hexTransform } from '@/utils/math';

export default {
  mounted() {
    this.getBalance();
    this.fetchToken();
    this.fetchReferFee();
  },
  data() {
    return {
      decimals: 0,
      about: {},
      social: {},
        referFeePercent: ''
    };
  },

  watch: {
    token() {
      this.fetchToken();
      this.getBalance();
      this.fetchReferFee();
    },

    account() {
      this.getBalance();
    }
  },

  computed: {
    token() {
      return this.$store.state.token;
    },
    account() {
      return this.$store.state.account;
    }
  },

  methods: {
    openTab(url) {
      window.open(url);
    },
      closeDialog(){
          console.log('close')
          this.$emit('close-dialog')
      },
    fetchToken() {
      api.getTableRows({
        json: true,
        code: 'tokendapppub',
        scope: this.token.toUpperCase(),
        table: 'games'
      }).then(({ rows }) => {
        this.about = rows[0];
        this.about.feePercent = feePercent(this.about);
        this.about.eosPool = (hexTransform(this.about.eos) - hexTransform(this.about.base_eos)).toFixed(4);
        // this.$store.commit('UPDATE_EOS_POOL', this.about.eosPool);
      });
    },

    fetchReferFee() {
      api.getTableRows({
        json: true,
        code: 'tokendapppub',
        scope: this.token.toUpperCase(),
        table: 'refer'
      }).then(({ rows }) => {
        if (rows.length == 1) {
          this.referFeePercent = rows[0].fee_percent/100;
        } else {
          this.referFeePercent = 0;
        }
      });
    },

    getBalance() {
      api.getTableRows({
        json: true,
        code: 'tokendapppub',
        table: 'stat',
        scope: this.token.toUpperCase()
      }).then(({ rows }) => {
        const { max_supply } = rows[0];
        this.decimals = (max_supply.match(/[\d\.]+/)[0].split('.')[1] || '').length;
      });
    },

    timeFormat(raw) {
      const date = new Date(raw * 1000);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${year}-${month}-${day}`;
    },

    rangeFormat(raw) {
      if (Number(raw) === 0) return 0;
      let time = raw * 1000;
      let year = (time / (864E5 * 365)).toFixed(0);
      let month = ((time - year * 864E5 * 365) / 864E5 * 30).toFixed(0);
      let day = ((time - year * 864E5 * 365 - month * 864E5 * 30) / 864E5).toFixed(0);
      if (year <= 0 && month <= 0 && day <= 0) return `less than 1 day`;
      return `${year > 0 ? year + ' years ' : ''}${month > 0 ? month + ' months ' : ''}${day > 0 ? day + ' days ' : ''}`;
    }
  }
};
</script>

<style scoped>
.token-about {
  padding:0;
  margin-top: 0;
  margin-bottom: 0;
  flex:1;
}

.token-about .card-nav{
  text-align: left;
  padding-left: 20px;
  padding-right: 20px;
  border-bottom: 1px solid rgba(0,0,0,.1);
}

.token-about > header {
  font-weight: 600;
  color: rgb(80, 92, 108);
  margin-bottom: 30px;
  line-height: 1.5;
}

.token-about .card-header svg{
  width: 18px;
  height: 18px;
  float: right;
  margin-top: 12px;
}

.about-list > li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
  margin-bottom: 15px;
}

.about-list{
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
}

.about-list > li > label {
  color: rgba(0,0,0,.5);
  margin-right: 100px;
  font-size: 12px;
}

.about-list > li > span {
  font-size: 12px;
  color: #2f2f2f;
  line-height: 1.5;
  font-weight: 500;
}

.social-link-wrap{
  background: #f9f9f9;
  padding-left: 20px;
  padding-right: 20px;
  height: 50px;
  line-height: 50px;
}

  .social-link-wrap a{
    margin-right: 15px;
  }
</style>
