<template>
  <section class="token-action card">
    <div class="card-header">
      <div class="card-nav" :class="{'active': currentTab === 1}"><button class="card-nav-btn" @click="currentTab = 1">{{$t('buy')}}</button></div>
      <div class="card-nav" :class="{'active': currentTab === 2}"><button class="card-nav-btn" @click="currentTab = 2">{{$t('sell')}}</button></div>
      <div class="card-nav" :class="{'active': currentTab === 3}"><button class="card-nav-btn" @click="currentTab = 3">{{$t('transfer')}}</button></div>
    </div>
    <div class="card-content">
      <div class="tab-buy" v-show="currentTab === 1">
        <div class="trade-dialog">
          <div class="transaction-form">
            <div class="transaction-item">
              <span class="transaction-title">{{$t('balance')}}</span>
              <span class="transaction-value">
                <span class="transaction-num">{{eos_balance}}</span>
                 <!-- <span class="transaction-unit">EOS</span> -->
              </span>
            </div>
            <div class="transaction-item">
              <span class="transaction-title">{{$t('eos_amount')}}</span>
              <span class="transaction-value">
                <input type="number" class="transaction-input" v-model="form.buy.amount"/>
                <span class="transaction-input-unit">EOS</span>
              </span>
            </div>
            <div class="transaction-item">
              <span class="transaction-title">{{$t('fee')}}</span>
              <span class="transaction-value">
                <span class="transaction-num">{{referFeePercent}}%</span>
                <!-- <span class="transaction-unit">{{this.$store.state.token}}</span> -->
              </span>
            </div>
            <div class="transaction-item">
              <span class="transaction-title">{{$t('obtain')}}≈</span>
              <span class="transaction-value">
                <span class="transaction-num">{{buyObtain}}</span>
                <span class="transaction-unit">{{this.$store.state.token}}</span>
              </span>
            </div>
          </div>
          <footer class="trade-footer" slot="footer">
            <el-button
                    @click="buy"
                    :loading="loading"
                    :disabled="!form.buy.amount || !account.name"
                    class="btn-trade btn-buy">{{$t('buy')}}</el-button>
          </footer>
        </div>
      </div>
      <div class="tab-sell" v-show="currentTab === 2">
        <div class="trade-dialog">
          <div class="transaction-form">
            <div class="transaction-item">
              <span class="transaction-title">{{$t('balance')}}</span>
              <span class="transaction-value">
                <span class="transaction-num">{{balance}}</span>
                 <!-- <span class="transaction-unit">{{this.$store.state.token}}</span> -->
              </span>
            </div>
            <div class="transaction-item">
              <span class="transaction-title">{{$t('amount')}}</span>
              <span class="transaction-value">
                <input type="number" class="transaction-input" v-model="form.sell.amount"/>
                <span class="transaction-input-unit">{{this.$store.state.token}}</span>
              </span>
            </div>
            <div class="transaction-item">
              <span class="transaction-title">{{$t('fee')}}</span>
              <span class="transaction-value"><span class="transaction-num">{{feePercent}}%</span>
                <!-- <span class="transaction-unit">EOS</span> -->
              </span>
            </div>
            <div class="transaction-item">
              <span class="transaction-title">{{$t('obtain')}}≈</span>
              <span class="transaction-value"><span class="transaction-num">{{sellObtain}}</span><span class="transaction-unit">EOS</span></span>
            </div>
          </div>

          <footer class="trade-footer" slot="footer">
            <el-button
                    @click="sell"
                    :loading="loading"
                    :disabled="!form.sell.amount || !account.name"
                    class="btn-trade btn-sell">{{$t('sell')}}</el-button>
          </footer>
        </div>
      </div>

      <div class="tab-transfer" v-show="currentTab === 3">
        <div class="trade-dialog">
          <div class="transaction-form">
            <div class="transaction-item">
              <span class="transaction-title">{{$t('balance')}}</span>
              <span class="transaction-value">
                <span class="transaction-num">{{balance}}</span>
                <!-- <span class="transaction-unit">PUB</span> -->
              </span>
            </div>
            <div class="transaction-item">
              <span class="transaction-title">{{$t('account')}}</span>
              <span class="transaction-value"><input type="text" class="transaction-input" style="border-radius: 5px;" v-model="form.transfer.to" placeholder="Enter receiver's account"/>
              </span>
            </div>
            <div class="transaction-item">
              <span class="transaction-title">{{$t('amount')}}</span>
              <span class="transaction-value">
                <input type="number" class="transaction-input" v-model="form.transfer.amount"/>
                <span class="transaction-input-unit">{{this.$store.state.token}}</span>
              </span>
            </div>
          </div>

          <footer class="trade-footer" slot="footer">
            <el-button
                    @click="transfer"
                    :loading="loading"
                    :disabled="!form.transfer.to || !form.transfer.amount"
                    class="btn-trade blue-gradient">{{$t('transfer')}}</el-button>
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
import { feePercent, hexTransform } from '@/utils/math';

export default {
  mounted() {
    if (typeof scatter === 'undefined' && (typeof this.account.bitportal === 'undefined')) return;
    this.getEOSBalance();
    this.getBalance();
    this.getToken();
    this.fetchReferFee();
  },

  data() {
    return {
      eos_balance: '',
      balance: '',
      loading: false,
      feePercent: '',
      referFeePercent: '',
      currentTab: 1,
      token_eos: '',
      token_stake: '',
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
      this.getEOSBalance();
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
    getEOSBalance() {
      api.getCurrencyBalance('eosio.token', this.account.name, 'EOS').then((row) => {
        this.eos_balance = row[0];
        console.log('eos_balance', this.eos_balance);
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
        this.token_eos = hexTransform(rows[0].eos);
        this.token_stake = rows[0].stake/10000;
        console.log('token', this.feePercent, this.token_eos, this.token_stake)
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
            // this.dialog.buy = false;
            this.getBalance();
          }).catch(e => {
            this.$notify.error(e.message || JSON.parse(e).error.details[0].message);
            this.loading = false;
            // this.dialog.buy = false;
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
            // this.dialog.buy = false;
            this.loading = false;
          }).catch(e => {
            this.$notify.error(e.message || JSON.parse(e).error.details[0].message);
            this.loading = false;
            // this.dialog.buy = false;
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
            // this.dialog.buy = false;
            this.getBalance();
          }).catch(e => {
            this.loading = false;
            // this.dialog.buy = false;
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
            // this.dialog.buy = false;
            this.loading = false;
          }).catch(e => {
            this.$notify.error(e.message || JSON.parse(e).error.details[0].message);
            this.loading = false;
            // this.dialog.buy = false;
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
          // this.dialog.sell = false;
          this.getBalance();  
        }).catch(e => {
          this.loading = false;
          // this.dialog.sell = false;
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
            // this.dialog.sell = false;
            this.getBalance();   
          }).catch(e => {
            this.loading = false;
            // this.dialog.sell = false;
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
          // this.dialog.transfer = false;
          this.getBalance();
        }).catch(e => {
          this.$notify.error({ title: 'Failure', message: e.message || JSON.parse(e).error.details[0].message });
          this.loading = false;
          // this.dialog.transfer = false;
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
            // this.dialog.transfer = false;
            this.getBalance();
          }).catch(e => {
            this.$notify.error({ title: 'Failure', message: e.message || JSON.parse(e).error.details[0].message });
            this.loading = false;
            // this.dialog.transfer = false;
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
    },

      sellFee() {
        return (this.form.sell.amount * this.feePercent / 100).toFixed(4);
      },

      buyFee() {
        return (this.form.buy.amount * this.referFeePercent / 100).toFixed(4);
      },

      sellObtain() {
        let sell_stake = (this.form.sell.amount * this.token_eos) / (parseFloat(this.form.sell.amount) + this.token_stake);
        // return sell_stake * ();
        return (sell_stake * (1 - this.feePercent / 100)).toFixed(4);
      },

      buyObtain() {
        let buy_eos = this.form.buy.amount * (1 - this.referFeePercent / 100);
        return ((parseFloat(buy_eos) * this.token_stake) / (parseFloat(buy_eos) + this.token_eos)).toFixed(8);
        // return (this.form.buy.amount * (1 - this.referFeePercent / 100)).toFixed(4);
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
    flex: 2.2;
    justify-content: flex-start;
    color: #505050;
    text-align: right;
    display: flex;
  }
  .transaction-unit {
    display: inline-block;
    margin-left: 4px;
    color: #a8a8a8;
    width: 36px;
  }
  .transaction-input{
    /*flex: 5;*/
    width: 100%;
    outline: 0;
    padding-left: 4px;
    border: 1px solid #a8a8a8;
    background: #fff;
    border-radius: 5px 0 0 5px;
    font-size: 16px;
    min-width: 0;
    -webkit-appearance: none;
    flex-shrint: 1;
  }
  .transaction-input::placeholder{
    font-size: 14px;
  }
  .transaction-input-unit{
    color: #a8a8a8;
    border: 1px solid #a8a8a8;
    border-left: none;
    padding: 0 4px;
    background: #fff;
    border-radius: 0 5px 5px 0;
  }
  .transaction-num{
    /*flex: 5;*/
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

