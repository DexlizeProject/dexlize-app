<!--<template>-->
  <!--<el-card>-->
    <!--<header slot="header">PUBLISH TOKEN</header>-->
    <!--<el-alert-->
      <!--class="charge-tip"-->
      <!--:closable="false"-->
      <!--show-icon-->
      <!--v-if="!account.name"-->
      <!--title="login to publish token"-->
      <!--type="info" />-->
    <!--<el-alert-->
      <!--v-if="needCharge()"-->
      <!--class="charge-tip"-->
      <!--title="PUB is not enough, "-->
      <!--type="warning"-->
      <!--:closable="false"-->
      <!--show-icon>-->
      <!--<p>-->
        <!--You need at least 100 PUB to publish your own token-->
        <!--<a-->
          <!--@click="goCharge"-->
          <!--class="charge-link"-->
          <!--href="JavaScript:;">charge PUB</a>-->
      <!--</p>-->
    <!--</el-alert>-->
    <!--<div class="token-body">-->
      <!--<el-form-->
        <!--:label-width="labelWidth"-->
        <!--class="form publish-form-1">-->
        <!--<el-form-item label="Current PUB">-->
          <!--{{currentPUB}}-->
        <!--</el-form-item>-->
        <!--<el-form-item label="Publisher">-->
          <!--<el-input-->
            <!--class="form-item__name"-->
            <!--disabled-->
            <!--readonly-->
            <!--v-model="account.name" />-->
          <!--<el-tooltip-->
            <!--effect="dark"-->
            <!--content="token issuer"-->
            <!--placement="top-start">-->
            <!--<i class="el-icon-question" />-->
          <!--</el-tooltip>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="Token">-->
          <!--<el-input-->
            <!--@keydown.native="transformToken"-->
            <!--maxlength="7"-->
            <!--minlength="5"-->
            <!--type="text"-->
            <!--class="form-item__token"-->
            <!--placeholder="DAPPPUB"-->
            <!--v-model="form.token" />-->
          <!--<el-tooltip-->
            <!--effect="dark"-->
            <!--content="must be uppercase, length between 1~7 (include)"-->
            <!--placement="top-start">-->
            <!--<i class="el-icon-question" />-->
          <!--</el-tooltip>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="Base">-->
          <!--<el-input-->
            <!--class="form-item__base"-->
            <!--type="number"-->
            <!--placeholder="0.025"-->
            <!--v-model="form.base">-->
            <!--<template slot="append">EOS</template>-->
          <!--</el-input>-->
          <!--<el-tooltip-->
            <!--effect="dark"-->
            <!--content="basic EOS fund pool"-->
            <!--placement="top-start">-->
            <!--<i class="el-icon-question" />-->
          <!--</el-tooltip>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="Maximum Supply">-->
          <!--<el-input-->
            <!--class="form-item__base"-->
            <!--type="number"-->
            <!--placeholder="1000000.0000"-->
            <!--v-model="form.stake">-->
            <!--<template-->
              <!--v-if="form.token"-->
              <!--slot="append">{{form.token}}</template>-->
          <!--</el-input>-->
          <!--<el-tooltip-->
            <!--effect="dark"-->
            <!--content="maxmiun token supply"-->
            <!--placement="top-start">-->
            <!--<i class="el-icon-question" />-->
          <!--</el-tooltip>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="Option Quantity">-->
          <!--<el-input-->
            <!--class="form-item__base"-->
            <!--type="number"-->
            <!--placeholder="0.0000"-->
            <!--v-model="form.option">-->
            <!--<template-->
              <!--v-if="form.token"-->
              <!--slot="append">{{form.token}}</template>-->
          <!--</el-input>-->
          <!--<el-tooltip-->
            <!--effect="dark"-->
            <!--content="option amount for the token project owner"-->
            <!--placement="top-start">-->
            <!--<i class="el-icon-question" />-->
          <!--</el-tooltip>-->
        <!--</el-form-item>-->
      <!--</el-form>-->
      <!--<el-form-->
              <!--:label-width="labelWidth"-->
        <!--class="form publish-form-2">-->
        <!--<el-form-item label="Start Time">-->
          <!--<el-date-picker-->
            <!--v-model="form.startTime"-->
            <!--type="datetime"-->
            <!--placeholder="Select date and time">-->
          <!--</el-date-picker>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="Lock Period">-->
          <!--<el-input-->
            <!--class="form-item__time"-->
            <!--type="number"-->
            <!--placeholder="1000"-->
            <!--v-model="form.lockup">-->
            <!--<template  slot="append">DAYS</template>-->
          <!--</el-input>-->
          <!--<el-tooltip-->
            <!--effect="dark"-->
            <!--content="option lock period"-->
            <!--placement="top-start">-->
            <!--<i class="el-icon-question" />-->
          <!--</el-tooltip>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="Base Fee">-->
          <!--<el-input-->
            <!--class="form-item__percent"-->
            <!--type="number"-->
            <!--placeholder="10"-->
            <!--v-model="form.baseFee">-->
            <!--<template slot="append">%</template>-->
          <!--</el-input>-->
          <!--<el-tooltip-->
            <!--effect="dark"-->
            <!--content="minimum token selling fee"-->
            <!--placement="top-start">-->
            <!--<i class="el-icon-question" />-->
          <!--</el-tooltip>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="Init Fee">-->
          <!--<el-input-->
            <!--class="form-item__percent"-->
            <!--type="number"-->
            <!--placeholder="10"-->
            <!--v-model="form.initFee">-->
            <!--<template slot="append">%</template>-->
          <!--</el-input>-->
          <!--<el-tooltip-->
            <!--effect="dark"-->
            <!--content="initial token selling fee"-->
            <!--placement="top-start">-->
            <!--<i class="el-icon-question" />-->
          <!--</el-tooltip>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="Referral Fee">-->
          <!--<el-input-->
            <!--class="form-item__percent"-->
            <!--type="float"-->
            <!--placeholder="0.10"-->
            <!--v-model="form.referralFee">-->
            <!--<template slot="append">%</template>-->
          <!--</el-input>-->
          <!--<el-tooltip-->
            <!--effect="dark"-->
            <!--content="referral fee"-->
            <!--placement="top-start">-->
            <!--<i class="el-icon-question" />-->
          <!--</el-tooltip>-->
        <!--</el-form-item>-->
        <!--<el-form-item>-->
          <!--<el-button-->
            <!--:loading="loading"-->
            <!--:disabled="formDisabled()"-->
            <!--@click="publish"-->
            <!--type="primary">-->
            <!--{{publishFee}} PUB-->
          <!--</el-button>-->
        <!--</el-form-item>-->
      <!--</el-form>-->
    <!--</div>-->
  <!--</el-card>-->
<!--</template>-->

<!--<script>-->
  <!--import Eos from 'eosjs';-->
  <!--import network from '@/utils/network';-->
  <!--import api from '@/utils/eos';-->

  <!--// import 'element-ui/lib/index.js';-->

  <!--import 'element-ui/lib/theme-chalk/form.css';-->
  <!--import 'element-ui/lib/theme-chalk/card.css';-->
  <!--import 'element-ui/lib/theme-chalk/input.css';-->
  <!--import 'element-ui/lib/theme-chalk/button.css';-->
  <!--import 'element-ui/lib/theme-chalk/index.css';-->

  <!--export default {-->
    <!--mounted() {-->
      <!--this.getBalance();-->
    <!--},-->
    <!--data() {-->
      <!--return {-->
        <!--loading: false,-->
        <!--currentPUB: '',-->
        <!--form: {-->
          <!--token: '',-->
          <!--base: '10000.0000',-->
          <!--stake: '1000000',-->
          <!--option: '200000',-->
          <!--lockup: 365,-->
          <!--baseFee: '5',-->
          <!--initFee: '50',-->
          <!--referralFee: 0.10,-->
          <!--startTime: new Date()-->
        <!--}-->
      <!--};-->
    <!--},-->
    <!--watch: {-->
      <!--account() {-->
        <!--this.getBalance();-->
      <!--}-->
    <!--},-->
    <!--computed: {-->
      <!--account() {-->
        <!--return this.$store.state.account;-->
      <!--},-->
      <!--publishFee() {-->
        <!--if (!this.form.token) {-->
          <!--return 100;-->
        <!--}-->
        <!--length = this.form.token.length-->
        <!--return length <= 3 ? 100 * Math.pow(10, 4-length) : 100;-->
      <!--},-->
       <!--labelWidth() {-->
          <!--return window.screen.width <= 768 ? 'auto' : '150px';-->
        <!--}-->
    <!--},-->
    <!--methods: {-->
      <!--getBalance() {-->
        <!--api.getTableRows({-->
          <!--json: true,-->
          <!--code: 'tokendapppub',-->
          <!--table: 'accounts',-->
          <!--scope: this.account.name-->
        <!--}).then(({ rows }) => {-->
          <!--const balance = rows.find(row => /\sPUB$/.test(row.balance));-->
          <!--this.currentPUB = balance && balance.balance;-->
        <!--});-->
      <!--},-->
      <!--formDisabled() {-->
        <!--return !this.form.token-->
          <!--|| !this.form.base-->
          <!--|| !this.form.stake-->
          <!--|| !this.form.option-->
          <!--|| !this.form.lockup-->
          <!--|| !this.form.baseFee-->
          <!--|| !this.form.initFee-->
          <!--|| !this.form.startTime-->
          <!--|| !this.account.name-->
          <!--|| !this.form.referralFee;-->
      <!--},-->

      <!--transformToken(e) {-->
        <!--const { key } = e;-->
        <!--if (key.length > 1) return;-->
        <!--e.preventDefault();-->
        <!--if (this.form.token.length === 7) return;-->
        <!--this.form.token = `${this.form.token}${key.toUpperCase()}`;-->
      <!--},-->

      <!--goCharge() {-->
        <!--this.$router.push({ name: 'trade', query: { token: 'PUB' } });-->
      <!--},-->

      <!--needCharge() {-->
        <!--return !this.currentPUB || this.currentPUB.match(/(.+)?\s|$/)[1] < 100;-->
      <!--},-->

      <!--publish() {-->
        <!--const eos = scatter.eos(network, Eos, {});-->
        <!--const options = {-->
          <!--authorization: `${this.account.name}@${this.account.authority}`,-->
          <!--broadcast: true,-->
          <!--sign :true-->
        <!--};-->
        <!--this.loading = true;-->
        <!--eos.contract('tokendapppub', options).then(contract => {-->
          <!--contract.newtoken({-->
            <!--from: this.account.name,-->
            <!--base_eos_quantity: Number(this.form.base).toFixed(4) + ' EOS',-->
            <!--maximum_stake: Number(this.form.stake).toFixed(4) + ' ' + this.form.token,-->
            <!--option_quantity: Number(this.form.option).toFixed(4) + ' ' + this.form.token,-->
            <!--lock_up_period: +this.form.lockup * 86400,-->
            <!--base_fee_percent: +this.form.baseFee,-->
            <!--init_fee_percent: +this.form.initFee,-->
            <!--refer_fee: Number(+this.form.referralFee * 100).toFixed(0),-->
            <!--start_time: Math.round(this.form.startTime.getTime()/1000),-->

          <!--}, options).then(() => {-->
            <!--this.$notify.success({ message: 'Token publish success' });-->
            <!--this.loading = false;-->
          <!--}).catch(e => {-->
            <!--this.$notify.error({ title: 'Failure', message: e.message || JSON.parse(e).error.details[0].message });-->
            <!--this.loading = false;-->
          <!--});-->
        <!--});-->
      <!--}-->
    <!--}-->
  <!--};-->
<!--</script>-->

<!--<style scoped>-->
  <!--.login-tip {-->
    <!--margin-top: 15px;-->
  <!--}-->

  <!--.form-item__name {-->
    <!--width: 200px;-->
  <!--}-->

  <!--.form-item__base {-->
    <!--width: 300px;-->
  <!--}-->

  <!--.form-item__token {-->
    <!--width: 300px;-->
  <!--}-->

  <!--.form-item__time {-->
    <!--width: 200px;-->
  <!--}-->

  <!--.form-item__percent {-->
    <!--width: 120px;-->
  <!--}-->

  <!--.el-form-item >>> .el-input {-->
    <!--margin-right: 15px;-->
  <!--}-->

  <!--.token-body {-->
    <!--display: flex;-->
    <!--flex-wrap: wrap;-->
  <!--}-->

  <!--.publish-form-1{-->
    <!--flex: 1;-->
  <!--}-->

  <!--.publish-form-2{-->
    <!--flex: 1;-->
  <!--}-->

  <!--.charge-link {-->
    <!--color: #589EF8;-->
  <!--}-->

  <!--.chart-link:hover {-->
    <!--opacity: .5;-->
  <!--}-->

  <!--.charge-tip {-->
    <!--margin-bottom: 30px;-->
  <!--}-->
  <!--@media screen and (max-width: 768px){-->
    <!--.publish-form-1 label, .publish-form-2 label{-->
        <!--width: auto !important;-->
    <!--}-->
  <!--}-->
<!--</style>-->
