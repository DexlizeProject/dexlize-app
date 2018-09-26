<template>
  <div class="token-banner">
    <div>
      <img src="/static/img/banner-logo.png" class="banner-logo"/>
      <div class="language-switch" @click="switchLanguage()">
        <span class="icon-en" v-show="locale === 'zh'"></span>
        <span class="icon-zh" v-show="locale === 'en'"></span>
        <span>{{$t('switchLanguage')}}</span>
      </div>
      <div class="banner-options">
        <div class="banner-option" style="text-align: left;">
          <button class="banner-option-btn" @click="toggleTokenList"><div class="blue-circle"></div> {{this.$store.state.token}} <font-awesome-icon v-show="!showTokenList" icon="caret-down"/><font-awesome-icon v-show="showTokenList" icon="caret-up"/></button>
        </div>
        <div class="banner-option" style="text-align: center;">
          <button class="banner-option-btn" @click="showTokenAbout = !showTokenAbout">{{$t('about')}} {{this.$store.state.token}}</button>
        </div>
        <div class="banner-option" style="text-align: right;">
          <button
                  @click="toggleShowMyAccount"
                  class="header-account banner-option-btn"
                  v-if="account.name">
            {{$t('myAccount')}} <font-awesome-icon icon="caret-down" v-show="!showMyAccount"/><font-awesome-icon icon="caret-up" v-show="showMyAccount"/>
          </button>
          <button
                  class="login-link banner-option-btn"
                  @click="login"
                  v-else>{{$t('login')}}</button>
        </div>
      </div>
    </div>
    <div class="token-list-tip tip" v-show="showTokenList">
      <span class="icon-triangle"></span>
      <div class="tip-header">{{$t('tokenList')}}</div>
      <ul>
        <li @click="changeToken('PUB')">PUB</li>
        <li @click="changeToken('TPT')">TPT</li>
      </ul>
    </div>
    <div class="my-account-tip tip" v-show="true || showMyAccount">
      <span class="icon-triangle"></span>
      <div class="account-item">
        <div class="item-title">{{$t('accountName')}}</div>
        <div class="item-value">{{account.name}}</div>
      </div>
      <div class="account-item">
        <div class="item-title">{{$t('balance')}}</div>
        <div class="item-value">
          {{this.eos_balance}}<br/>
          {{this.balance}}
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="showTokenAbout">
      <token-about v-on:close-dialog="showTokenAbout = false"/>
    </el-dialog>
  </div>
</template>

<script>
  import network from '@/utils/network';
  import api from '@/utils/eos';

  const url = new URL(location.href);

  export default {
    mounted() {
      // if (this.account.name) return;
      this.getEOSBalance();
      this.getBalance();
      // this.getToken();
      // this.fetchReferFee();
      this.$root.$on('close-dialog', () => {
          this.showTokenList = false;
          this.showTokenAbout = false;
          this.showMyAccount = false;
  })
    },
    data() {
        return {
            balance: "",
            eos_balance: "",
            keyword: "",
            showTokenList: false,
            showTokenAbout: false,
            showMyAccount: false
        }
    },

    methods: {
        switchLanguage(){
            console.log(this.$i18n);
        },
        getEOSBalance() {
          api.getCurrencyBalance('eosio.token', this.account.name, 'EOS').then((row) => {
            this.eos_balance = row[0];
          });
        },
        getBalance() {
          api.getTableRows({
            json: true,
            code: 'tokendapppub',
            table: 'accounts',
            scope: this.account.name
          }).then(({
            rows
          }) => {
            const balance = rows.find(row => new RegExp(`\\s${this.$store.state.token.toUpperCase()}\$`).test(row.balance));
            if (!balance) {
              return api.getTableRows({
                json: true,
                code: 'tokendapppub',
                table: 'stat',
                scope: this.$store.state.token
              }).then(({
                rows
              }) => {
                const {
                  max_supply
                } = rows[0];
                const decimals = (max_supply.match(/[\d\.]+/)[0].split('.')[1] || '').length;
                this.balance = (0).toFixed(decimals);
              });
            }
            this.balance = balance.balance;
          });
        },
        changeToken(target){
            this.search(target);
            this.getBalance();
        },
        toggleTokenList(){
            this.showMyAccount = false;
            this.showTokenList = !this.showTokenList
            if(this.showTokenList || this.showMyAccount){
                this.$emit('show-shadow')
            }else{
                this.$emit('hide-shadow')
            }
        },
        toggleShowMyAccount(){
            this.showTokenList = false;
            this.showMyAccount = !this.showMyAccount
            if(this.showTokenList || this.showMyAccount){
                this.$emit('show-shadow')
            }else{
                this.$emit('hide-shadow')
            }
        },
      login() {
        if (scatter) {
          scatter.getIdentity({
            accounts: [network]
          }).then(() => {
            const account = scatter.identity.accounts.find(account => account.blockchain === 'eos');
            if (!account) return;
            this.$store.commit('UPDATE_ACCOUNT', account);
          }).catch(e => {
            this.$message.warning(e.message);
          });
        }
      },

      logout() {
        scatter.forgetIdentity().then(() => {
          this.$message.success('User logout success');
          this.$store.commit('UPDATE_ACCOUNT', {});
        });
      },

      search(target) {
        const keyword = target;
        if (!keyword) return;
        this.showTokenList = false;
        this.$emit('hide-shadow')
        this.checkToken(keyword).then(result => {
          if (!result) {
            this.$message.error(`Token: ${keyword.toUpperCase()} not exists`);
          } else {
            this.$router.push({ query: { token: keyword.toUpperCase() } });
            this.$store.commit('UPDATE_TOKEN', keyword);
          }
        });
      },

      checkToken(token) {
        return api.getTableRows({
          json: true,
          code: 'tokendapppub',
          scope: token.toUpperCase(),
          table: 'games'
        }).then(({ rows }) => {
          return rows.length;
        });
      }
    },

    computed: {
      account() {
        return this.$store.state.account;
      },

      locale() {
          return this.$i18n.locale
      }
    },

    watch: {
      $route(to, from) {
        if (to.query.token === from.query.token) return;
        this.$store.commit('UPDATE_TOKEN', to.query.token);
      },
      balance() {
        this.getEOSBalance()
        this.getBalance()
      }
    },

      components:{
        tokenAbout: require('./token-about').default
      }
  };
</script>


<style scoped>
  .token-banner {
    padding: 30px 100px;
    height: 220px;
    background-size: 100%;
    background-image: url('/static/img/banner-bg.png');
    background-repeat: no-repeat;
  }

  .language-switch{
    display: inline-block;
    float: right;
    color: #fff;
    margin-bottom: 25px;
  }

  .language-switch span{
    margin-right: 10px;
    display: inline-block;
    vertical-align: middle;
  }

  .language-switch span:last-child{
    margin-top: -6px;
  }

  .banner-options{
    display: flex;
    z-index: 100;
    position: relative;
  }

  .banner-option{
    flex: 1;
  }

  .banner-option-btn{
    width: 95%;
    height: 40px;
    line-height: 40px;
    margin:0 auto;
    text-align: center;
    background: #fff;
    border-radius: 5px;
    border: none;
    padding: 0;
    font-size: 14px;
  }

  .banner-option-btn svg{
    vertical-align: inherit;
  }

  .banner-logo{
    width: 256px;
    height: 46px;
    margin-bottom: 25px;
    display: inline-block;
  }

  .header-account > svg {
    cursor: pointer;
  }

  .login-link:hover {
    cursor: pointer;
    text-shadow: 0 0 5px #fff;
  }

  /*.search-input {*/
    /*outline: none;*/
    /*position: absolute;*/
    /*top: 0;*/
    /*bottom: 0;*/
    /*width: 100%;*/
    /*font-size: 1.5em;*/
    /*font-style: italic;*/
    /*border: none;*/
  /*}*/

  .token-banner > ul {
    display: flex;
    align-items: center;
  }

  .token-banner > ul > li {
    cursor: pointer;
    color: #8699B6;
    line-height: 64px;
    margin-right: 30px;
    font-weight: 500;
    padding: 0 15px;
  }

  .token-banner > ul > li:hover {
    border-bottom: 1px solid #2968C9;
  }

  .token-banner > ul > li > span {
    margin-left: 10px;
  }

  .token-list-tip{
    position: absolute;
    top: 134px;
    left: 16px;
  }

  .token-list-tip li{
    line-height: 42px;
  }

  .my-account-tip{
    position: absolute;
    right: 16px;
    top: 134px;
    width: 75%;
  }

  .my-account-tip .icon-triangle{
    position: absolute;
    top: -10px;
    right: 12px;
  }

  .token-list-tip .icon-triangle{
    position: absolute;
    top:-10px;
    left: 16px;
  }

  .account-item{
    display: flex;
    line-height: 48px;
    border-bottom: 1px solid rgba(0,0,0,.1);
  }

  .account-item:last-child{
    border: none;
  }

  .account-item .item-title{
    color: rgba(0,0,0,.5);
    flex: 1;
    justify-content: left;
  }

  .account-item .item-value{
    flex: 1;
    justify-content: right;
    text-align: right;
  }

  .account-item .item-unit{
    margin-left: 10px;
    color: rgba(0,0,0,.5);
  }

  @media screen and (max-width: 768px){
    .token-banner{
      padding: 25px 16px 0;
    }
    .banner-logo{
      width: 126px;
      height: 23px;
    }
    .token-banner > ul > li {
      padding: 0;
    }
  }
</style>

