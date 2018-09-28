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
  .search-container > .el-input {
    width: 30%;
    min-width: 200px;
    margin-right: 15px;
  }

  .tokens-page-wrap{
    margin-top: -116px;
  }

  /*.heading {*/
    /*font-weight: 300;*/
    /*margin-bottom: 15px;*/
  /*}*/

  /*.token-header {*/
    /*display: flex;*/
    /*align-items: center;*/
    /*justify-content: space-between;*/
  /*}*/

  /*.token-filter {*/
    /*display: flex;*/
    /*align-items: center;*/
    /*margin-bottom: 15px;*/
  /*}*/

  .token-filter > p {
    margin-right: 15px;
  }

  /*.order-footer {*/
    /*text-align: center;*/
    /*margin-top: 15px;*/
  /*}*/

  /*.order-filter {*/
    /*display: flex;*/
    /*align-items: center;*/
    /*justify-content: space-between;*/
    /*margin-bottom: 15px;*/
  /*}*/

  /*.order-filter__user,*/
  /*.order-filter__amount {*/
    /*display: flex;*/
    /*align-items: center;*/
  /*}*/

  /*.order-filter__title {*/
    /*margin-right: 15px;*/
    /*color: #909194;*/
    /*font-weight: 300;*/
  /*}*/

  /*.username-input {*/
    /*margin-right: 15px;*/
  /*}*/

  @media screen and (max-width: 768px){
    .tokens-page-wrap{
      margin-top: -139px;
    }
  }

</style>

