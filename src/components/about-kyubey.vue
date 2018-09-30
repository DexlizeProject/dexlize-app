<template>
  <section class="token-about card">
    <div class="card-header">
      <div class="card-nav">{{$t('about')}} {{token.toUpperCase()}}
        <font-awesome-icon icon="times" @click="closeDialog"/>
      </div>
    </div>
    <ul class="about-list">
      <li>
        <label>Market Supply</label>
        <span>{{about.marketSupply}}</span>
      </li>

      <li>
        <label>Market Balance</label>
        <span>{{about.marketBalance}}%</span>
      </li>
      <li>
        <label>Description</label>
      </li>
      <div class="about-kyubey-description">
        KBY 使用了 Kyubey 协议合约和团购合约发行。 Kyubey 协议将设置价格与发行量的函数为一次函数，类似 P3D 的价格曲线。

        - 价格增加速率：10^-10 / KBY
        - 初始价格：0.002 EOS/KBY
        - 初始 dummy 发行量：20M
        - 初始 dummy 储备金：20k

        更多关于 KBY 的介绍请参考
        <a href="https://github.com/kyubey-network/kyubey-initial-bancor-offer-contract">https://github.com/kyubey-network/kyubey-initial-bancor-offer-contract</a>
        </div>
    </ul>
    <ul class="social-link">123</ul>
  </section>
</template>

<script>
import fetch from '@/utils/api';
import api from '@/utils/eos';
import { feePercent, hexTransform } from '@/utils/math';

export default {
  mounted() {
    this.fetchToken();
  },
  data() {
    return {
      about: {
          marketSupply: '21321321.123 KBY',
          marketBalance: '13321313.123 EOS'
      },
      social: {},
        referFeePercent: ''
    };
  },

  watch: {
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
      // api.getTableRows({
      //   json: true,
      //   code: 'tokendapppub',
      //   scope: this.token.toUpperCase(),
      //   table: 'games'
      // }).then(({ rows }) => {
      //   this.about = rows[0];
      //   this.about.feePercent = feePercent(this.about);
      //   this.about.eosPool = (hexTransform(this.about.eos) - hexTransform(this.about.base_eos)).toFixed(4);
      //   // this.$store.commit('UPDATE_EOS_POOL', this.about.eosPool);
      // });
    }
  }
};
</script>

<style scoped>
.token-about {
  padding-top: 0;
  margin-top: 0;
  margin-bottom: 0;
  flex:1;
}

.token-about .card-nav{
  text-align: left;
  border-bottom: 1px solid rgba(0,0,0,.1);
}

.about-kyubey-description{
  color: #2f2f2f;
  font-size: 12px;
  display: block;
  background: #f3f8fd;
  border: 1px solid #d6e9fb;
  border-radius: 5px;
  padding: 10px;
  line-height: 1.5;
}

.about-kyubey-description a{
  color: #0a7cdd;
  text-decoration: none;
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
  }
</style>

