<template>
  <div>
    <ul class="form-header">
      <li>Current {{token.toUpperCase()}}: <strong>{{currentToken}}</strong></li>
      <li>Current EOS: <strong>{{currentEOS}}</strong></li>
    </ul>
    <el-form 
      class="form">
      <el-form-item>
        <el-input 
          type="number"
          placeholder="0.025"
          v-model="eos">
          <template slot="append">EOS</template>
        </el-input>
      </el-form-item> 
      <el-form-item>
        <el-button 
          :disabled="!account.name || !eos || tradeDisabled"
          type="primary" 
          @click="buy">Buy Now</el-button>
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
      this.getPUB();
    },

    data() {
      return {
        eos: '',
        currentEOS: '',
        currentToken: ''
      };
    },
    computed: {
      account() {
        return this.$store.state.account;
      },

      token() {
        return this.$store.state.token;
      },

      tradeDisabled() {
        return this.$store.state.tradeDisabled
      }
    },
    watch: {
      account() {
        this.getPUB();
        this.getBalance();
      },

      token() {
        this.getBalance();
      }
    },
    methods: {
      getPUB() {
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
          this.currentToken = balance && balance.balance;
        });
      },

      buy() {
        const eos = scatter.eos(network, Eos, {});
        if (!this.currentToken) {
          eos.transaction({
            actions: [{
              account: 'tokendapppub',
              name: 'reg',
              authorization: [{
                actor: this.account.name,
                permission: this.account.authority
              }],
              data: {
                from: this.account.name, 
                memo: this.token.toUpperCase()
              }
            }, {
              account: 'eosio.token', 
              name: 'transfer',
              authorization: [{
                actor: this.account.name,
                permission: this.account.authority
              }],
              data: {
                from: this.account.name,
                to: 'tokendapppub',
                quantity: Number(this.eos).toFixed(4) + ' EOS',
                memo: this.token.toUpperCase()
              }
            }]   
          }, { broadcast: true, sign: true }).then(() => {
            this.$notify.success('Token exchange success');
            this.getBalance();
            this.getPUB();
          }).catch(e => {
            this.$notify.error(e.message || JSON.parse(e).error.details[0].message);
          });
        } else {
          eos.transfer({
            from: this.account.name,
            to: 'tokendapppub', 
            quantity: Number(this.eos).toFixed(4) + ' EOS', 
            memo: this.token.toUpperCase() 
          }, {
            authorization: `${this.account.name}@${this.account.authority}`,
            broadcast: true,
            sign :true
          }).then(() => {
            this.$notify.success('Token exchange success');
            this.getBalance();
            this.getPUB();
          }).catch(e => {
            this.$notify.error(e.message || JSON.parse(e).error.details[0].message);
          });
        }
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

