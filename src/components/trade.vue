<template>
  <section class="trade-container">
    <el-tabs 
      v-model="currentTab" 
      type="border-card">
      <el-tab-pane 
        label="Buy" 
        name="buy">
        <buy-form />
      </el-tab-pane>
      <el-tab-pane 
        label="Sell" 
        name="sell">
        <sell-form />
      </el-tab-pane>
      <el-tab-pane 
        label="Transfer" 
        name="transfer">
        <transfer-form /> 
      </el-tab-pane>
    </el-tabs>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        currentTab: 'buy'
      };
    },

    components: {
      buyForm: require('./form/buy').default,
      sellForm: require('./form/sell').default,
      transferForm: require('./form/transfer').default
    }
  };

</script>

<style scoped>
  .trade-container {
    margin-bottom: 30px;
  }
</style>

