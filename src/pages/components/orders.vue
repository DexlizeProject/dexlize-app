<template>
  <section class="orders card">
    <div class="card-header">
        <!--<div class="card-nav" :class="{'active': currentTab === 1}" @click="currentTab = 1">My Orders</div>-->
        <div class="card-nav" :class="{'active': currentTab === 1}" @click="currentTab = 1">{{$t('allMarketOrders')}}</div>
    </div>
      <table class="market-orders-table">
          <thead>
          <tr>
              <th>{{$t('time')}}</th>
              <th>{{$t('account')}}</th>
              <th>EOS/{{this.$store.state.token}}</th>
              <th>{{$t('price')}} (EOS/{{this.$store.state.token}})</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="row in orders">
              <td v-html="dateFormatter(row)"></td>
              <td :style="{overflow: 'hidden', textOverflow: 'ellipsis'}">{{row.account_name}}<br><span :class="{'buy': row.is_buy_type, 'sell': !row.is_buy_type}">{{row.is_buy_type ? 'buy' : 'sell'}}</span></td>
              <td>{{(row.is_buy_type ? '+' : '-') +eosFormatter(row)}}/<br/> {{(row.is_buy_type ? '+' : '-' ) + row.amount}}</td>
              <td>{{priceFormatter(row)}} <a :href="`//eospark.com/MainNet/tx/${row.trx_id}`" target="_blank"><span class="icon-share"></span></a></td>
          </tr>
          </tbody>
      </table>
    <footer class="order-footer">
        <div class="order-nav">
            <div class="order-nav-item">
                <font-awesome-icon
                        @click="prevPage"
                        :class="{ 'disabled': offset === 1 }"
                        icon="chevron-left" />
            </div>
            <div class="order-nav-item" :class="{'btn-blue': offset === nav1}" @click="gotoPage(nav1)">{{this.nav1}}</div>
            <div class="order-nav-item" :class="{'btn-blue': offset === nav2}" @click="gotoPage(nav2)">{{this.nav2}}</div>
            <div class="order-nav-item" :class="{'btn-blue': offset === nav3}" @click="gotoPage(nav3)">{{this.nav3}}</div>
            <div class="order-nav-item" :class="{'btn-blue': offset === nav4}" @click="gotoPage(nav4)">{{this.nav4}}</div>
            <div class="order-nav-item" :class="{'btn-blue': offset === nav5}" @click="gotoPage(nav5)">{{this.nav5}}</div>
            <div class="order-nav-item">
                <font-awesome-icon
                        @click="nextPage"
                        :class="{ 'disabled': orders.length < limit }"
                        icon="chevron-right" />
            </div>
        </div>
    </footer>
  </section>
</template>

<script>
import fetch from '@/utils/api';

export default {
  mounted() {
    this.fetchOrders();
  },

  data() {
    return {
      orders: [],
      offset: 1,
      keyword: '',
      filter: 0,
      limit: 10,
        currentTab : 1
    };
  },

  computed: {
    account() {
      return this.$store.state.account;
    },

    token() {
      return this.$store.state.token;
    },

      nav1(){
        return this.offset <= 3 ? 1 : this.offset -2
      },

      nav2(){
        return this.offset <= 3 ? 2 : this.offset - 1
      },

      nav3(){
        return this.offset <= 3 ? 3 : this.offset
      },

      nav4(){
          return this.offset <= 3 ? 4 : this.offset + 1
      },

      nav5(){
          return this.offset <= 3 ? 5 : this.offset + 2
      }
  },

  watch: {
    token() {
      this.fetchOrders();
    }
  },
  methods: {
    search() {
      this.$route.query.token = this.keyword;
      this.$store.commit('UPDATE_TOKEN', this.keyword);
    },

    fetchOrders() {
      let uri = `token/deals?symbol=${this.token.toUpperCase()}&start=${(this.offset - 1) * this.limit}&limit=${this.limit}`;
      if (this.accountName) uri += `&account_name=${this.keyword}`; 
      if (this.filter) uri += `&eos_limit=${this.filter}`;
      fetch(uri).then(({ deals }) => {
        this.orders = deals;
      });
    },

    dateFormatter({ time }) {
      const date = new Date(time);
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      return `${date.getMonth() + 1}-${date.getDate()} <br/> ${date.getHours()}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    },

    eosFormatter({ money }) {
      return money.toFixed(4) + ' EOS';
    },

    priceFormatter({ price }) {
      return price ? price.toFixed(6) : '-';
    },

    prevPage() {
      if (this.offset === 1) return;
      this.offset -= 1;
      this.fetchOrders();
    },

    nextPage() {
        if(this.offset === 5) return;
      if (this.orders.length < this.limit) return;
      this.offset += 1;
      this.fetchOrders();
    },

      gotoPage(num){
        this.offset = num;
        this.fetchOrders();
      }
  },
};
</script>

<style scoped>
.orders {
  flex: 2;
}

.market-orders-table{
    width: 100%;
    overflow: scroll;
    display: block;
    font-size: 10px;
    border-collapse: collapse;
}

.market-orders-table thead{
    display: flex;
}

.market-orders-table tr{
    display: flex;
    width: 100%;
    height: 70px;
    vertical-align: middle;
}

.market-orders-table thead tr{
    border-bottom: 2px solid rgba(0,0,0,.1);
}

.market-orders-table thead th{
    flex: 1;
    color: rgba(0,0,0,.5);
    font-weight: normal;
    line-height: 18px;
    text-align: left;
    padding-top: 12px;
    padding-bottom: 12px;
}

.market-orders-table tbody{
    display: flex;
    flex-wrap: wrap;
}

.market-orders-table tbody td{
    flex: 1;
    border-bottom: 1px solid rgba(0,0,0,.1);
    padding: 10px 0;
}

.market-orders-table tbody tr:last-child td{
    border-bottom: none;
}

.market-orders-table tbody td{
    line-height: 18px;
    text-align: left;
}

.market-orders-table .icon-share{
    margin-left: 8px;
}

.orders > header {
  font-weight: 600;
  color: rgb(80, 92, 108);
  margin-bottom: 30px;
  line-height: 1.5;
}

.order-nav{
    display: flex;
}

.order-nav-item{
    display: inline-block;
    flex: 1;
    text-align: center;
    margin: 0 4px;
    line-height: 32px;
    border-radius: 5px;
}

.order-nav-item.blue-gradient{
    border: transparent;
}

/*.table {*/
  /*margin-bottom: 15px;*/
  /*width: 100%;*/
/*}*/

/*.table >>> th {*/
  /*text-align: left;*/
  /*background-color: #FDFDFE;*/
  /*border-top: 1px solid #E6ECF3;*/
  /*border-bottom: 1px solid #E6ECF3;*/
/*}*/

/*.table >>> td,*/
/*.table >>> th {*/
  /*padding: 15px 8px;*/
/*}*/

/*.table >>> td {*/
  /*border-bottom: 1px solid #E6ECF3;*/
  /*font-size: .9em;*/
  /*font-weight: 300;*/
/*}*/

/*.table >>> tbody tr:hover {*/
  /*background-color: #f5f5f5;*/
  /*cursor: pointer*/
/*}*/

.order-trxlink {
  color: #0067c8;
}

.order-trxlink:hover {
  opacity: .8; 
}
.buy {
  color: #09ba07;
}

.sell {
  color: #ff3232;
}

.order-footer {
  margin-top: 30px;
}

.order-footer svg {
  cursor: pointer;
}

.order-footer svg.disabled {
  cursor: not-allowed;
}

.order-footer svg.disabled > path {
  fill: #979797;
}

.order-footer svg > path {
  fill: #979797;
}

.order-footer svg:hover > path {
  fill: #979797;
}

.order-footer svg.disabled:hover > path {
  fill: #979797;
}

</style>
