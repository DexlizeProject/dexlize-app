<template>
  <div class="token-banner">
    <div>
      <img src="/static/img/banner-logo.png" class="banner-logo"/>
      <div class="banner-options">
        <div class="banner-option">
          <button class="banner-option-btn" @click="showTokenList = !showTokenList"><div class="blue-circle"></div> PUB <font-awesome-icon v-show="!showTokenList" icon="caret-down"/><font-awesome-icon v-show="showTokenList" icon="caret-up"/></button>
        </div>
        <div class="banner-option">
          <button class="banner-option-btn" @click="showTokenAbout = !showTokenAbout">About PUB</button>
        </div>
        <div class="banner-option">
          <button
                  @click="showMyAccount = !showMyAccount"
                  class="header-account banner-option-btn"
                  v-if="account.name">
            My Account <font-awesome-icon icon="caret-down" v-show="!showMyAccount"/><font-awesome-icon icon="caret-up" v-show="showMyAccount"/>
            <!--<font-awesome-icon-->
            <!--@click="logout"-->
            <!--icon="sign-out-alt" />-->
          </button>
          <button
                  class="login-link banner-option-btn"
                  @click="login"
                  v-else>Login</button>
        </div>
      </div>
    </div>
    <div class="token-list-tip tip" v-show="showTokenList">
      <div class="tip-header">Token List</div>
      <ul>
        <li @click="changeToken('pub')">PUB</li>
        <li @click="changeToken('dex')">DEX</li>
      </ul>
    </div>
    <div class="my-account-tip tip" v-show="showMyAccount">
      <div class="account-item">
        <div class="item-title">Account Name</div>
        <div class="item-value">{{account.name}}</div>
      </div>
      <div class="account-item">
        <div class="item-title">Balance</div>
        <div class="item-value">1322321312<span class="item-unit">EOS</span><br/>31231231<span class="item-unit">PUB</span> </div>
      </div>
    </div>
    <el-dialog :visible.sync="showTokenAbout">
      <token-about v-on:close-dialog="showTokenAbout = false"/>
    </el-dialog>
    <!--<ul>-->
    <!--<li @click="navigateTo('trade')">-->
    <!--<font-awesome-icon icon="wallet" />-->
    <!--<span>Token</span>-->
    <!--</li>-->
    <!--<li @click="navigateTo('publish')">-->
    <!--<font-awesome-icon icon="dollar-sign" />-->
    <!--<span>Publish</span>-->
    <!--</li>-->
    <!--</ul>-->
  </div>
</template>

<script>
  import network from '@/utils/network';
  import api from '@/utils/eos';

  const url = new URL(location.href);

  export default {
    data() {
        return {
            keyword: "",
            showTokenList: false,
            showTokenAbout: false,
            showMyAccount: false
        }
    },

    methods: {
        changeToken(target){
            this.search(target);
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
        this.checkToken(keyword).then(result => {
            console.log(111, result);
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
      }
    },

    watch: {
      $route(to, from) {
        if (to.query.token === from.query.token) return;
        this.$store.commit('UPDATE_TOKEN', to.query.token);
      }
    },

      components:{
        tokenAbout: require('./token-about').default
      }
  };
</script>


<style scoped>
  .token-banner {
    padding: 25px 16px 0;
    height: 220px;
    background-size: 100%;
    background-image: url('/static/img/banner-bg.png');
    background-repeat: no-repeat;
  }

  .banner-options{
    display: flex;
  }

  .banner-option{
    flex: 1;
  }

  .banner-option:last-child{
    flex: 1.2;
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
    width: 126px;
    height: 23px;
    margin: 0 auto 25px;
    display: block;
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
    top: 124px;
    left: 16px;
  }

  .token-list-tip li{
    line-height: 32px;
  }

  .my-account-tip{
    position: absolute;
    right: 16px;
    top: 124px;
    width: 75%;
  }

  .account-item{
    display: flex;
    line-height: 32px;
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
  }

  .account-item .item-unit{
    margin-left: 10px;
    color: rgba(0,0,0,.5);
  }

  @media screen and (max-width: 768px){
    .token-banner > ul > li {
      padding: 0;
    }
  }
</style>

