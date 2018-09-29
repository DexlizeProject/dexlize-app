<template>
  <div class="tokens-page-wrap">
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
    margin-top: -85px;
  }

  .token-filter > p {
    margin-right: 15px;
  }

  @media screen and (max-width: 768px){
    .tokens-page-wrap{
      margin-top: -108px;
    }
  }

</style>

