<template>
  <div>
    <ul class="form-header">
      <li>Current {{token.toUpperCase()}}: <strong>{{balance}}</strong></li>
      <li>Current EOS: <strong>{{currentEOS}}</strong></li>
    </ul>
    <el-form 
      class="form">
      <el-form-item>
        <el-input 
          type="number"
          placeholder="25"
          v-model="amount">
          <template slot="append">{{ token.toUpperCase() }}</template>
        </el-input>
      </el-form-item> 
      <el-form-item>
        <el-button 
          :disabled="!account.name || !token || !balance"
          type="danger" 
          @click="sell">Sell Now</el-button>
        <el-alert
          v-if="!account.name"
          class="login-tip"
          title="Login to trade"
          type="info"
          :closable="false"
          show-icon /> 
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import Eos from 'eosjs';
  import network from '@/utils/network';
  import api from '@/utils/eos';
  import BigNumber from 'bignumber.js';

  export default {
    mounted() {
      this.getAccount();
      this.getBalance();
    },
    data() {
      return {
        balance: '',
        currentEOS: '',
        amount: ''
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
      account() {
        this.getAccount();
        this.getBalance();
      },
      token() {
        this.getBalance();
      }
    },
    methods: {
      getAccount() {
        if (!this.account.name) return;
        api.getAccount(this.account.name).then(({ core_liquid_balance }) => {
          this.currentEOS = core_liquid_balance;
        });
      },
      getBalance() {
        api.getTableRows({
          json: true,
          code: 'tokendapppub',
          table: 'accounts',
          scope: this.account.name
        }).then(({ rows }) => {
          const balance = rows.find(row => new RegExp(`\\s${this.token.toUpperCase()}\$`).test(row.balance));
          this.balance = balance && balance.balance;
        });
      },
      sell() {
        const eos = scatter.eos(network, Eos, {});
        const options = {
          authorization: `${this.account.name}@${this.account.authority}`,
          broadcast: true,
          sign :true
        };
        eos.contract('tokendapppub', options).then(contract => {
          const raw = this.balance.match(/[\d\.]+/)[0].split('.')[1] || '';
          const decimals = raw.length;
          contract.sell({
            from: this.account.name, 
            quantity: Number(this.amount).toFixed(decimals) + ` ${this.token.toUpperCase()}`  
          }, options).then(() => {
            this.$notify.success({ message: 'Token exchange success' });
            this.getAccount();
            this.getBalance();   
          }).catch(e => {
            this.$notify.error({ title: 'Failure', message: e.message || JSON.parse(e).error.details[0].message });
          });
        });
      }
    }
  };
</script>

<style scoped>
  .login-tip {
    margin-top: 15px;
  }
  .form-header {
    color: #9696a4;
    margin-bottom: 15px;
  }
  .form-header > li {
    margin-bottom: 10px;
  }
</style>

