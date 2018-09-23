<template>
  <header class="header">
    <ul>
      <li @click="navigateTo('trade')">
        <font-awesome-icon icon="wallet" />
        <span>Token</span>
      </li>
      <li @click="navigateTo('publish')">
        <font-awesome-icon icon="dollar-sign" />
        <span>Publish</span>
      </li>
    </ul>
  </header>  
</template>

<script>
export default {
  methods: {
    navigateTo(route) {
      const { name } = this.$route;
      if (name === route) return;
      const { token } = this.$route.query;
      this.$router.push({ name: route, query: { token } });
    }
  }
};
</script>

<style scoped>
  .header {
    background-color: #fff; 
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
    padding: 0 100px;
  }

  .header > ul {
    display: flex;
    align-items: center;
  }

  .header > ul > li {
    cursor: pointer;
    color: #8699B6;
    line-height: 64px;
    margin-right: 30px;
    font-weight: 500;
    padding: 0 15px;
  }

  .header > ul > li:hover {
    border-bottom: 1px solid #2968C9;
  }

  .header > ul > li > span {
    margin-left: 10px;
  }

  /*.btn-invite {*/
    /*cursor: pointer;*/
    /*background-image: url('../assets/btn-invite-bg.svg');*/
    /*font-weight: 600;*/
    /*border: 1px solid rgb(0, 170, 109);*/
    /*background-color: rgb(0, 197, 127);*/
    /*border-radius: 4px;*/
    /*color: #fff;*/
    /*padding: 10px;*/
    /*font-size: .9em;*/
    /*transition: opacity ease 200ms;*/
  /*}*/

  /*.btn-invite:hover {*/
    /*opacity: .9;*/
  /*}*/

  @media screen and (max-width: 768px){
    .header{
      padding: 0 16px;
    }
    .header > ul > li {
      padding: 0;
    }

  }
</style>

