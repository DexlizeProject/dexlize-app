<template>
  <section class="token-action card">
    <div class="card-header">
      <div class="card-nav" :class="{'active': currentTab === 1}"><button class="card-nav-btn" @click="currentTab = 1">Sell</button></div>
      <div class="card-nav" :class="{'active': currentTab === 2}"><button class="card-nav-btn" @click="currentTab = 2">Buy</button></div>
      <div class="card-nav" :class="{'active': currentTab === 3}"><button class="card-nav-btn" @click="currentTab = 3">Transfer</button></div>
    </div>
    <div class="card-content">
      <div class="tab-sell" v-show="currentTab === 1">
        <div class="trade-dialog">
          <div class="transaction-form">
            <div class="transaction-item">
              <span class="transaction-title">Balance</span>
              <span class="transaction-value"><span class="transaction-num">{{balance}}</span><span class="transaction-unit">PUB</span></span>
            </div>
            <div class="transaction-item bg-gray">
              <span class="transaction-title">Amount</span>
              <span class="transaction-value"><input type="text" class="pure-input" v-model="form.sell.amount"/> <span
                      class="transaction-unit">PUB</span></span>
            </div>
            <div class="transaction-item">
              <span class="transaction-title">Fee</span>
              <span class="transaction-value"><span class="transaction-num">{{feePercent}}%</span> <span
                      class="transaction-unit">PUB</span></span>
            </div>
            <div class="transaction-item">
              <span class="transaction-title">Obtain</span>
              <span class="transaction-value"><span class="transaction-num">1000</span><span class="transaction-unit">PUB</span></span>
            </div>
          </div>

          <footer class="trade-footer" slot="footer">
            <el-button
                    @click="sell"
                    :loading="loading"
                    :disabled="!form.sell.amount || !account.name"
                    class="btn-trade blue-gradient">Sell</el-button>
          </footer>
        </div>
      </div>
      <div class="tab-buy" v-show="currentTab === 2">
        <div class="trade-dialog">
          <div class="transaction-form">
            <div class="transaction-item">
              <span class="transaction-title">Balance</span>
              <span class="transaction-value"><span class="transaction-num">{{balance}}</span><span class="transaction-unit">PUB</span></span>
            </div>
            <div class="transaction-item bg-gray">
              <span class="transaction-title">Amount</span>
              <span class="transaction-value"><input type="text" class="pure-input" v-model="form.buy.amount"/> <span
                      class="transaction-unit">PUB</span></span>
            </div>
            <div class="transaction-item">
              <span class="transaction-title">Fee</span>
              <span class="transaction-value"><span class="transaction-num">{{feePercent}}%</span> <span
                      class="transaction-unit">PUB</span></span>
            </div>
            <div class="transaction-item">
              <span class="transaction-title">Obtain</span>
              <span class="transaction-value"><span class="transaction-num">1000</span><span class="transaction-unit">PUB</span></span>
            </div>
          </div>
          <footer class="trade-footer" slot="footer">
            <el-button
                    @click="buy"
                    :loading="loading"
                    :disabled="!form.buy.amount || !account.name"
                    class="btn-trade blue-gradient">Buy</el-button>
          </footer>
        </div>
      </div>
      <div class="tab-transfer" v-show="currentTab === 3">
        <div class="trade-dialog">
          <div class="transaction-form">
            <div class="transaction-item">
              <span class="transaction-title">Balance</span>
              <span class="transaction-value"><span class="transaction-num">{{balance}}</span><span class="transaction-unit">PUB</span></span>
            </div>
            <div class="transaction-item bg-gray">
              <span class="transaction-title">Account</span>
              <span class="transaction-value"><input type="text" class="pure-input" v-model="form.transfer.to" placeholder="receiver's account"/> <span
                      class="transaction-unit">PUB</span></span>
            </div>
            <div class="transaction-item bg-gray">
              <span class="transaction-title">Amount</span>
              <span class="transaction-value"><input type="text" class="pure-input" v-model="form.transfer.amount"/> <span
                      class="transaction-unit">PUB</span></span>
            </div>
          </div>

          <footer class="trade-footer" slot="footer">
            <el-button
                    @click="transfer"
                    :loading="loading"
                    :disabled="!form.transfer.to || !form.transfer.amount || !account.name"
                    class="btn-trade blue-gradient">Transfer</el-button>
          </footer>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import network from '@/utils/network';
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
      balance: '',
      loading: false,
      feePercent: '',
        referFeePercent: '',
        currentTab: 1,
      // dialog: {
      //   buy: false,
      //   sell: false,
      //   transfer: false
      // },
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
      if (this.account.bitportal) {
        this.loading = true;
        if (!this.balance) {
          this.account.bitportal.pushEOSAction({
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
          }).then(() => {
            this.$notify.success('Token exchange success');
            this.loading = false;
            this.dialog.buy = false;
            this.getBalance();
          }).catch(e => {
            this.$notify.error(e.message || JSON.parse(e).error.details[0].message);
            this.loading = false;
            this.dialog.buy = false;
          })
        } else {
          this.account.bitportal.transferEOSAsset({
            from: this.account.name,
            to: 'tokendapppub', 
            symbol: 'EOS',
            precision: 4,
            contract: 'eosio.token',
            amount: this.form.buy.amount,
            memo: this.token.toUpperCase() + '-referrer:eosbitportal'
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
      } else if (scatter) {
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
      }
    },
    sell() {
      if (this.account.bitportal) {
        const raw = this.balance.match(/[\d\.]+/)[0].split('.')[1] || '';
        const decimals = raw.length;
        this.loading = true;
        this.account.bitportal.pushEOSAction({
          actions: [
            {
              account: 'tokendapppub',
              name: 'sell',
              authorization: [{
                actor: this.account.name,
                permission: this.account.authority
              }],
              data: {
                from: this.account.name,
                quantity: Number(this.form.sell.amount).toFixed(decimals) + ` ${this.token.toUpperCase()}`
              }
            }
          ]
        }).then(() => {
          this.$notify.success({ message: 'Token exchange success' });
          this.loading = false;
          this.dialog.sell = false;
          this.getBalance();  
        }).catch(e => {
          this.loading = false;
          this.dialog.sell = false;
          this.$notify.error({ title: 'Failure', message: e.message || JSON.parse(e).error.details[0].message });
        })
      } else if (scatter) {
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
      }
    },
    transfer() {
      if (this.account.bitportal) {
        const raw = this.balance.match(/[\d\.]+/)[0].split('.')[1] || '';
        const decimals = raw.length;
        this.loading = true;
        this.account.bitportal.pushEOSAction({
          actions: [
            {
              account: 'tokendapppub',
              name: 'transfer',
              authorization: [{
                actor: this.account.name,
                permission: this.account.authority
              }],
              data: {
                from: this.account.name, 
                to: this.form.transfer.to,
                quantity: Number(this.form.transfer.amount).toFixed(decimals) + ` ${this.token.toUpperCase()}`,
                memo: this.token.toUpperCase() 
              }
            }
          ]
        }).then(() => {
          this.$notify.success({ message: 'Token exchange success' });
          this.loading = false;
          this.dialog.transfer = false;
          this.getBalance();
        }).catch(e => {
          this.$notify.error({ title: 'Failure', message: e.message || JSON.parse(e).error.details[0].message });
          this.loading = false;
          this.dialog.transfer = false;
        });
      } else if (scatter) {
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
    /*display: flex;*/
    /*align-items: center;*/
    /*justify-content: space-between;*/
    /*margin-bottom: 32px;*/
    /*flex-wrap: wrap;*/
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
    color: #fff;
    background-color: #fff;
    border-radius: 5px;
    width: 100%;
    border: none;
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

  .transaction-item {
    height: 36px;
    font-size: 14px;
    line-height: 36px;
    border-radius: 5px;
    margin-top: 12px;
    margin-bottom: 12px;
    padding-left: 12px;
    padding-right: 12px;
    display: flex;
  }
  .transaction-title {
    color: #a8a8a8;
    justify-content: flex-start;
    flex: 1;
  }
  .transaction-value {
    flex: 1;
    justify-content: flex-end;
    color: #505050;
    text-align: right;
    display: flex;
  }
  .transaction-unit {
    display: inline-block;
    margin-left: 8px;
    color: #a8a8a8;
    width: 36px;
    flex: 1;
  }
  .pure-input{
    flex: 1;
    text-align: right;
    outline: 0;
    border: none;
    background: transparent;
  }
  .transaction-num{
    flex: 5;
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

