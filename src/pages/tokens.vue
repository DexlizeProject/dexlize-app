<template>
  <div class="tokens-page-wrap">
    <div class="header-what-is" @click="showTokenAbout = !showTokenAbout">
      <span class="icon-info"/> What is {{this.$store.state.token}}?
    </div>
    <token-chart />
    <token-info />
    <token-orders />
  </div>
</template>

<script>
export default {
  created() {
    document.addEventListener('scatterLoaded', () => {
      if (!scatter.identity) return;
      const account = scatter.identity.accounts.find(account => account.blockchain === 'eos');
      if (!account) return;
      this.$store.commit('UPDATE_ACCOUNT', account)
    });

    document.addEventListener('bitportalapi', () => {
      const bitportal = window.bitportal;
      window.bitportal = null;

      bitportal.getCurrentWallet().then(data => {
        const account = {
          name: data.account,
          authority: data.permission,
          publicKey: data.publicKey,
          bitportal
        };
        this.$store.commit('UPDATE_ACCOUNT', account)
      });
    });
  },

  components: {
    tokenInfo: require('./components/token-info').default,
    tokenChart: require('./components/token-chart').default,
    tokenOrders: require('./components/orders').default,
    tradeForm: require('@/components/trade').default,

  }
}
</script>

<style scoped>
  .tokens-page-wrap{
    margin-top: -113px;
  }

  .token-filter > p {
    margin-right: 15px;
  }

  .header-what-is{
    color: #2e79cd;
    padding: 0 20px;
    background: #fff;
    height: 40px;
    line-height: 40px;
    margin: 10px auto;
    border-radius: 5px;
  }

  .header-what-is .icon-info{
    margin-right: 10px;
    vertical-align: middle;
  }

  @media screen and (max-width: 768px){
    .tokens-page-wrap{
      margin-top: -136px;
    }
  }

</style>

