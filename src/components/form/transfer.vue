<template>
  <div>
    <header class="form-header">Current {{token.toUpperCase()}}: <strong>{{balance}}</strong></header>
    <el-form 
      class="form">
      <el-form-item>
        <el-input 
          readonly
          disabled
          v-model="account.name" />
      </el-form-item> 
      <el-form-item>
        <el-input 
          placeholder="Enter accept user account"
          v-model="to" />
      </el-form-item>
      <el-form-item>
        <el-input 
          type="number"
          placeholder="25"
          v-model="amount">
          <template slot="append">{{token.toUpperCase()}}</template>
        </el-input>
      </el-form-item> 
      <el-form-item>
        <el-button 
          :disabled="!account.name || !to || !amount || !balance"
          type="warning" 
          @click="transfer">Transfer</el-button>
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

  export default {
    mounted() {
      this.getBalance();
    },
    data() {
      return {
        to: '',
        balance: '',
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
        this.getBalance();  
      },
      token() {
        this.getBalance();
      }
    },
    methods: {
      transfer() {
        const eos = scatter.eos(network, Eos, {});
        const options = {
          authorization: `${this.account.name}@${this.account.authority}`,
          broadcast: true,
          sign :true
        };
        const raw = this.balance.match(/[\d\.]+/)[0].split('.')[1] || '';
        const decimals = raw.length;
        eos.contract('tokendapppub', options).then(contract => {
          contract.transfer({
            from: this.account.name, 
            to: this.to,
            quantity: Number(this.amount).toFixed(decimals) + ` ${this.token.toUpperCase()}`,
            memo: this.token.toUpperCase() 
          }, options).then(() => {
            this.$notify.success({ message: 'Token exchange success' });
            this.getBalance();
          }).catch(e => {
            this.$notify.error({ title: 'Failure', message: e.message || JSON.parse(e).error.details[0].message });
          });
        });
      },
      getBalance() {
        if (!this.account.name) return;
        api.getTableRows({
          json: true,
          code: 'tokendapppub',
          table: 'accounts',
          scope: this.account.name
        }).then(({ rows }) => {
          const balance = rows.find(row => new RegExp(`\\s${this.token.toUpperCase()}\$`).test(row.balance));
          this.balance = balance && balance.balance;
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
</style>

