<template>
  <section class="token-action card">
    <div class="card-header">
      <div class="card-nav"><button @click="dialog.sell = true">Sell</button></div>
      <div class="card-nav"><button @click="dialog.buy = true">Buy</button></div>
      <div class="card-nav"><button @click="dialog.transfer = true">Transfer</button></div>
    </div>
    <!--<div class="token-action__info">-->
      <!--<img -->
        <!--class="token-logo"-->
        <!--:src="iconPub" />-->
      <!--<strong>{{token.toUpperCase()}}</strong>-->
    <!--</div>-->
    <div class="token-action__action">
      <div class="left">
        <p class="token-action__title">YOUR BALANCE</p>
        <p class="token-action__balance">{{balance}}</p>
      </div>
    </div>
    
    <el-dialog :visible.sync="dialog.buy">
      <div class="trade-dialog">
        <header>
          <img 
            class="trade-logo"
            :src="iconPub" /> 
          <div class="trade-info">
            <strong>{{token.toUpperCase()}}</strong>
            <p>{{token.toUpperCase()}} is an awesome token</p>
          </div>
        </header>
        <el-form 
          class="trade-body"
          :model="form.buy">
          <el-form-item 
            label="EOS">
            <el-input 
              type="number"
              placeholder="Enter pay EOS amount"
              v-model="form.buy.amount" />
          </el-form-item>
          <el-form-item>
            <el-alert
              :closable="false"
              :title="'Fee percent: ' + referFeePercent + '%'"
              type="warning"
              show-icon />
          </el-form-item>
        </el-form>
        <footer class="trade-footer" slot="footer">
          <el-button 
            @click="buy"
            :loading="loading"
            :disabled="!form.buy.amount || !account.name"
            class="btn-trade">Buy</el-button>
        </footer>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialog.sell">
      <div class="trade-dialog">
        <header>
          <img 
            class="trade-logo"
            :src="iconPub" /> 
          <div class="trade-info">
            <strong>{{token.toUpperCase()}}</strong>
            <p>{{token.toUpperCase()}} is an awesome token</p>
          </div>
        </header>
        <el-form 
          class="trade-body"
          :model="form.sell">
          <el-form-item 
            :label="token.toUpperCase()">
            <el-input 
              placeholder="Enter sell amount"
              v-model="form.sell.amount" />
          </el-form-item>
          <el-form-item>
            <el-alert
              :closable="false"
              :title="'Fee percent: ' + feePercent + '%'"
              type="warning"
              show-icon />
          </el-form-item>
        </el-form>
        <footer class="trade-footer" slot="footer">
          <el-button 
            @click="sell"
            :loading="loading"
            :disabled="!form.sell.amount || !account.name"
            class="btn-trade">Sell</el-button>
        </footer>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialog.transfer">
      <div class="trade-dialog">
        <header>
          <img 
            class="trade-logo"
            :src="iconPub" /> 
          <div class="trade-info">
            <strong>{{token.toUpperCase()}}</strong>
            <p>{{token.toUpperCase()}} is an awesome token</p>
          </div>
        </header>
        <el-form 
          class="trade-body"
          :model="form.sell">
          <el-form-item 
            label="From">
            <el-input 
              disabled
              v-model="account.name" />
          </el-form-item>
          <el-form-item 
            label="To">
            <el-input 
              placeholder="Enter receiver account" 
              v-model="form.transfer.to" />
          </el-form-item>
          <el-form-item 
            :label="token.toUpperCase()">
            <el-input 
              placeholder="Enter transfer amount"
              v-model="form.transfer.amount" />
          </el-form-item>
        </el-form>
        <footer class="trade-footer" slot="footer">
          <el-button 
            @click="transfer"
            :loading="loading"
            :disabled="!form.transfer.to || !form.transfer.amount || !account.name"
            class="btn-trade">Transfer</el-button>
        </footer>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import network from '@/utils/network';
import iconPub from '@/assets/pub.png';
import api from '@/utils/eos';
import Eos from 'eosjs';
import { feePercent } from '@/utils/math';

export default {
  mounted() {
    if (typeof scatter === 'undefined') return;
    this.getBalance();
    this.getToken();
    this.fetchReferFee();
  },

  data() {
    return {
      iconPub,
      balance: '',
      loading: false,
      feePercent: '',
      dialog: {
        buy: false,
        sell: false,
        transfer: false
      },
      form: {
        buy: {
          amount: ''
        }, 
        sell: {
          amount: ''
        },
        transfer: {
          to: '',
          amount: ''
        } 
      }
    };
  },

  watch: {
    account() {
      this.getBalance();
      this.getToken();
      this.fetchReferFee();
    },

    token() {
      this.getBalance(); 
      this.getToken();
      this.fetchReferFee();
    }
  },

  methods: {
    getBalance() {
      api.getTableRows({
        json: true,
        code: 'tokendapppub',
        table: 'accounts',
        scope: this.account.name
      }).then(({ rows }) => {
        const balance = rows.find(row => new RegExp(`\\s${this.token.toUpperCase()}\$`).test(row.balance));
        if (!balance) {
          return api.getTableRows({
            json: true,
            code: 'tokendapppub',
            table: 'stat',
            scope: this.token.toUpperCase()
          }).then(({ rows }) => {
            const { max_supply } = rows[0]; 
            const decimals = (max_supply.match(/[\d\.]+/)[0].split('.')[1] || '').length;
            this.balance = (0).toFixed(decimals); 
          });
        }
        this.balance = balance.balance;
      });
    },
    getToken() {
      api.getTableRows({
        json: true,
        code: 'tokendapppub',
        scope: this.token.toUpperCase(),
        table: 'games'
      }).then(({ rows }) => {
        this.feePercent = feePercent(rows[0]);
        console.log(this.feePercent);
      }); 
    },
    fetchReferFee() {
      api.getTableRows({
        json: true,
        code: 'tokendapppub',
        scope: this.token.toUpperCase(),
        table: 'refer'
      }).then(({ rows }) => {
        if (rows.length == 1) {
          this.referFeePercent = rows[0].fee_percent/100;
        } else {
          this.referFeePercent = 0;
        }  
      }); 
    },
    buy() {
      const eos = scatter.eos(network, Eos, {});
      this.loading = true;
      if (!this.balance) {
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
              quantity: Number(this.form.buy.amount).toFixed(4) + ' EOS',
              memo: this.token.toUpperCase() + '-referrer:eosbitportal'
            }
          }]   
        }, { broadcast: true, sign: true }).then(() => {
          this.$notify.success('Token exchange success');
          this.loading = false;
          this.dialog.buy = false;
          this.getBalance();
        }).catch(e => {
          this.loading = false;
          this.dialog.buy = false;
          this.$notify.error(e.message || JSON.parse(e).error.details[0].message);
        });
      } else {
        eos.transfer({
          from: this.account.name,
          to: 'tokendapppub', 
          quantity: Number(this.form.buy.amount).toFixed(4) + ' EOS', 
          memo: this.token.toUpperCase() + '-referrer:eosbitportal'
        }, {
          authorization: `${this.account.name}@${this.account.authority}`,
          broadcast: true,
          sign :true
        }).then(() => {
          this.$notify.success('Token exchange success');
          this.getBalance();
          this.dialog.buy = false;
          this.loading = false;
        }).catch(e => {
          this.$notify.error(e.message || JSON.parse(e).error.details[0].message);
          this.loading = false;
          this.dialog.buy = false;
        });
      }
    },
    sell() {
      const eos = scatter.eos(network, Eos, {});
      const options = {
        authorization: `${this.account.name}@${this.account.authority}`,
        broadcast: true,
        sign :true
      };
      this.loading = true;
      eos.contract('tokendapppub', options).then(contract => {
        const raw = this.balance.match(/[\d\.]+/)[0].split('.')[1] || '';
        const decimals = raw.length;
        contract.sell({
          from: this.account.name, 
          quantity: Number(this.form.sell.amount).toFixed(decimals) + ` ${this.token.toUpperCase()}`  
        }, options).then(() => {
          this.$notify.success({ message: 'Token exchange success' });
          this.loading = false;
          this.dialog.sell = false;
          this.getBalance();   
        }).catch(e => {
          this.loading = false;
          this.dialog.sell = false;
          this.$notify.error({ title: 'Failure', message: e.message || JSON.parse(e).error.details[0].message });
        });
      });
    },
    transfer() {
      const eos = scatter.eos(network, Eos, {});
      const options = {
        authorization: `${this.account.name}@${this.account.authority}`,
        broadcast: true,
        sign :true
      };
      const raw = this.balance.match(/[\d\.]+/)[0].split('.')[1] || '';
      const decimals = raw.length;
      this.loading = true;
      eos.contract('tokendapppub', options).then(contract => {
        contract.transfer({
          from: this.account.name, 
          to: this.form.transfer.to,
          quantity: Number(this.form.transfer.amount).toFixed(decimals) + ` ${this.token.toUpperCase()}`,
          memo: this.token.toUpperCase() 
        }, options).then(() => {
          this.$notify.success({ message: 'Token exchange success' });
          this.loading = false;
          this.dialog.transfer = false;
          this.getBalance();
        }).catch(e => {
          this.$notify.error({ title: 'Failure', message: e.message || JSON.parse(e).error.details[0].message });
          this.loading = false;
          this.dialog.transfer = false;
        });
      });
    }
  },

  computed: {
    account() {
      return this.$store.state.account;
    },

    token() {
      return this.$store.state.token;
    }
  }
};
</script>

<style scoped>
  .token-action {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 32px;
    flex-wrap: wrap;
  }

  .token-action__info {
    display: flex;
    align-items: center;
    flex: 1;
  }

  .token-action__info > strong {
    font-size: 2em;
    font-weight: 500;
    color: #515C6C;
  }

  .token-action__action {
    display: flex;
  }

  .token-action__action > .left {
    margin-right: 30px;
    text-align: right;
  }

  .token-action__action button {
    background-color: #5190D9; 
    font-weight: 500;
    border-radius: 4px;
    border: 1px solid #5190D9;
    padding: 14px 40px;
    color: #fff;
    cursor: pointer;
  }

  .token-action__action button:hover {
    background-color: #2e7bc4;
  }

  .token-action__action button:first-child {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right: .5px solid #427BBE;
  }

  .token-action__action button:nth-child(2) {
    border-radius: 0;
    border-left: .5px solid #427BBE;
    border-right: .5px solid #427BBE;
    z-index: 1;
  }

  .token-action__action button:last-child {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left: .5px solid #427BBE;
  }

  .token-action__title {
    color: #B9C0C8;  
    letter-spacing: 1.5px;
    font-weight: 500;
    line-height: 1.5;
  }

  .token-action__balance {
    color: #515C6C; 
    font-size: 1.5em;
    font-weight: 600;
    line-height: 1.5;
  }

  .trade-dialog {
    background-color: #fff;
    border-radius: 15px;
    margin: 0 auto;
  }

  .trade-dialog > .trade-body {
    padding: 20px 15px; 
  }

  .trade-dialog > header {
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    padding: 30px 15px;
    background-color: #212A35;
    color: #fff;
    display: flex;
  }

  .trade-logo {
    width: 60px;
    height: 60px;
    flex-shrink: 0;
    margin-right: 30px;
    border: 2px solid #fff;
    border-radius: 50%;
    box-shadow: 0 0 5px #fff;
  }

  .trade-body >>> label {
    font-size: .9em;
    display: block;
  }

  .trade-body >>> .el-form__item {
    margin-bottom: 0;
  }

  .trade-body >>> input {
    background-color: #FCFCFC; 
    border-radius: 5px;
    border: 1px solid #ccc;
    padding: 8px;
    outline: none;
    width: 100%;
    margin-bottom: 10px;
  }

  .trade-body >>> input:disabled {
    cursor: not-allowed;
    background-color: #F5F7FA;
    color: #c0c4cc;
  }

  .trade-footer {
    padding: 20px;
  }

  .trade-info > strong {
    margin-bottom: 10px;
    font-weight: 600;
    display: block;
  }

  .trade-info > p {
    color: #BCBFC2;
    font-size: .8em;
  }

  .btn-trade {
    padding: 10px 0;
    cursor: pointer;
    border: 1px solid #3673CD;
    color: #3673CD;
    background-color: #fff;
    border-radius: 5px;
    width: 100%;
    transition: color, background-color ease 200ms;
  }

  .btn-trade:disabled {
    opacity: .5;
    cursor: not-allowed;
  }

  .btn-trade:disabled:hover {
    color: #3673CD;
    background-color: #fff;
  }

  .btn-trade:hover {
    color: #fff;
    background-color: #3673CD;
  }

  .token-action >>> .el-dialog {
    width: 22%;
    max-width: 400px;
    margin: 0 auto;
    background-color: transparent;
    border-radius: 15px;
  }

  .token-action >>> .el-dialog__body {
    padding: 0;
  }
  @media screen and (max-width: 768px){
    .token-action__info {
      margin-bottom: 32px;
    }
    .token-action__action .btn-group button{
        border-radius: 4px;
        padding: 12px 20px;
      margin: 4px;
    }
    .token-action >>> .el-dialog{
      width: 90%;
      max-width: none;
    }
    .trade-body >>> input {
      margin-bottom: 0;
    }
  }
</style>

