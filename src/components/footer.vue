<template>
  <div>
    <footer class="footer">
      <div class="footer-item">
        <div class="footer-item-title">
          <div>相关协议</div>
        </div>
        <div class="footer-item-list">
          <a target="_blank" href="https://dapp.mytokenpocket.vip/%E5%9F%BA%E4%BA%8E%E7%8F%AD%E6%9F%AF%E7%9A%84%E5%AE%9E%E7%94%A8%E5" v-if="$store.state.token === 'PUB' || $store.state.token === 'TPT'">PUB</a>
          <a target="_blank" href="https://github.com/kyubey-network/kyubey-" v-if="$store.state.token === 'KBY'">Kyubey</a>
        </div>
      </div>
      <div class="footer-item">
        <div class="footer-item-title"><div>网站</div></div>
        <div class="footer-item-list">
          <a target="_blank" href="https://dapp.pub/" v-if="$store.state.token === 'PUB'">DappPub</a>
          <a target="_blank" href="http://tpdex.io/#/" v-if="$store.state.token === 'TPT'">TPDex</a>
          <a target="_blank" href="https://ibo.kyubey.network/" v-if="$store.state.token === 'KBY'">Kyubey Network</a>
        </div>
      </div>
    </footer>
  </div>

</template>

<style scoped>
  .footer {
    color: #888;
    font-size: .8em;
    font-weight: 300;
    line-height: 24px;
    padding: 15px 32px;
    justify-content: center;
    flex-wrap: wrap;
    background-color: #fff;
  }

  .footer-item{
    display: flex;
    line-height: 50px;
  }

  .footer-item-title{
    color: rgba(0,0,0,.2);
    font-size: 14px;
    flex: 1;
    justify-content: flex-start;
    vertical-align: middle;
  }

  .footer-item-list{
    flex: 2.5;
    font-size: 14px;
    justify-content: flex-end;
    vertical-align: middle;
    text-align: right;
  }

  .footer-item a{
    color: #0a7cdd;
    text-decoration: none;
    margin-left: 10px;
  }

</style>

