<template>
  <section class="orders card">
    <div class="card-header">
        <div class="card-nav">My Orders</div>
        <div class="card-nav">All Market Orders</div>
    </div>
      <table class="my-orders-table">
          <thead>
          <tr>
              <th>Time</th>
              <th>Account</th>
              <th>EOS/PUB</th>
              <th>Price(EOS/PUB)</th>
          </tr>
          <tr v-for="row in orders">
              <td>{{dateFormatter(row)}}</td>
              <td>{{row.account_name}}<br>{{row.is_buy_type ? 'buy' : 'sell'}}</td>
              <td></td>
              <td>{{priceFormatter(row)}} <a :href="`//eospark.com/MainNet/tx/${row.trx_id}`">Action</a></td>
          </tr>
          </thead>
      </table>
    <el-table
      class="table"
      border
      stripe
      :data="orders">
      <el-table-column
        prop="is_buy_type"
        label="Type"
        width="100">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.is_buy_type ? 'success' : 'danger'"
            disable-transitions>{{scope.row.is_buy_type ? 'buy' : 'sell'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="time" label="Time" :formatter="dateFormatter" />
      <el-table-column
        prop="account_name"
        label="Account" />
      <el-table-column
        prop="money"
        label="EOS" 
        :formatter="eosFormatter" />
      <el-table-column
        prop="amount"
        label="Amount"  />
      <el-table-column
        prop="price"
        label="price" 
        :formatter="priceFormatter" />

      <el-table-column
        label="Action">
        <template slot-scope="scope">
          <a 
            class="order-trxlink"
            target="_blank"
            :href="`//eospark.com/MainNet/tx/${scope.row.trx_id}`">detail</a>
        </template>
    </el-table-column>
    </el-table>
    <footer class="order-footer">
      <font-awesome-icon 
        @click="prevPage"
        :class="{ 'disabled': offset === 1 }" 
        icon="chevron-left" />
      <font-awesome-icon 
        @click="nextPage"
        :class="{ 'disabled': orders.length < limit }" 
        icon="chevron-right" />
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
      limit: 10
    };
  },

  computed: {
    account() {
      return this.$store.state.account;
    },

    token() {
      return this.$store.state.token;
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
      return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
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
      if (this.orders.length < this.limit) return;
      this.offset += 1;
      this.fetchOrders();
    },
  },
};
</script>

<style scoped>
.orders {
  flex: 2;
    min-width: 300px;
}

.my-orders-table{
    width: 100%;
}

.orders > header {
  font-weight: 600;
  color: rgb(80, 92, 108);
  margin-bottom: 30px;
  line-height: 1.5;
}

.table {
  margin-bottom: 15px;
  width: 100%;
}

.table >>> th {
  text-align: left;
  background-color: #FDFDFE;
  border-top: 1px solid #E6ECF3;
  border-bottom: 1px solid #E6ECF3;
}

.table >>> td,
.table >>> th {
  padding: 15px 8px;
}

.table >>> td {
  border-bottom: 1px solid #E6ECF3;
  font-size: .9em;
  font-weight: 300;
}

.table >>> tbody tr:hover {
  background-color: #f5f5f5;
  cursor: pointer
}

.order-trxlink {
  color: #0067c8;
}

.order-trxlink:hover {
  opacity: .8; 
}

.el-tag--success {
  color: #67c23a;  
}

.el-tag--danger {
  color: #f56c6c;
}

.order-footer {
  margin-top: 30px;
}

.order-footer svg:first-child {
  margin-right: 15px; 
}

.order-footer svg {
  cursor: pointer;
}

.order-footer svg.disabled {
  cursor: not-allowed;
}

.order-footer svg.disabled > path {
  fill: #c0c4cc;
}

.order-footer svg > path {
  fill: #303133;
}

.order-footer svg:hover > path {
  fill: #5F90D3;  
}

.order-footer svg.disabled:hover > path {
  fill: #c0c4cc;  
}

  @media screen and (max-width: 768px){

  }
</style>
