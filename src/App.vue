<template>
  <main id="app">
    <token-banner />
    <!--<token-second-header />-->
    <el-dialog
      class="termsheet-dialog"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :visible.sync="needTermsheet && $route.name !== 'termsheet'">
      <img
        class="termsheet-img"
        :src="termsheetSketch" />
      <div class="content">
        <strong>Welcome to DappPub</strong>
        <p>The site you are about to enter is a DApp platform that includes various DApps.</p>
        <p>By choosing "I AGREE" below, you agree to DappPub's <router-link
          class="termsheet-link"
          :to="{ 'name': 'termsheet', 'query': { 'token': $route.query.token } }">Term of User</router-link>.</p>
      </div>
      <footer slot="footer">
        <button
          @click="agreeTermsheet"
          class="btn-agree">I AGREE</button>
      </footer>
    </el-dialog>
    <el-alert
      title=""
      show-icon
      v-if="showAlert"
      type="warning"
      :closable="false">
      Token `{{token.toUpperCase()}}` not exist,
      <router-link
        class="create-link"
        :to="{ name: 'publish' }">publish one</router-link>
    </el-alert>
    <div class="container">
      <router-view />
    </div>
    <token-footer />
  </main>
</template>

<script>
/* global scatter */
import Eos from 'eosjs';
import api from '@/utils/eos';
import termsheetSketch from '@/assets/termsheet.png';

export default {
  created() {
      document.addEventListener('bitportalapi', () => {
        const bitportalapi = window.bitportal;
        window.bitportal = null;

        bitportalapi.getCurrentWallet().then(data => {
          const account = {
            name: data.account,
            authority: 'active',
            eosAccountName: data.account,
            fromAccount: data.account,
            signAccount: data.account,
            signPublicKey: data.publicKey,
            voter: data.account
          };
          this.$store.commit('UPDATE_ACCOUNT', account)
        });
      });
  },

  mounted() {
    this.checkTermsheet();
    this.checkToken();
  },

  data() {
    return {
      tokenNotFound: false,
      needTermsheet: false,
      termsheetSketch
    }
  },

  watch: {
    token() {
      this.checkToken();
    },

    '$route.name'(to) {

    }
  },

  methods: {
    checkTermsheet() {
      const termsheet = localStorage.getItem('TERMSHEET_AGREE');
      if (!termsheet) {
        this.needTermsheet = true;
      }
    },

    checkToken() {
      api.getTableRows({
        json: true,
        code: 'tokendapppub',
        scope: this.token.toUpperCase(),
        table: 'games'
      }).then(({ rows }) => {
        this.$store.commit('UPDATE_TRADE_DISABLED', !rows.length);
        this.tokenNotFound = !rows.length;
      });
    },

    agreeTermsheet() {
      localStorage.setItem('TERMSHEET_AGREE', true);
      this.needTermsheet = false;
    }
  },

  computed: {
    token() {
      return this.$store.state.token;
    },

    showAlert() {
      return this.tokenNotFound && this.$route.name === 'trade';
    }
  },

  components: {
    tokenBanner: require('@/components/banner').default,
    tokenFooter: require('@/components/footer').default
  }
}
</script>

<style scoped>
  #app {
    background-color: #f4f4f4;
  }

  .container {
    padding: 30px 100px;
  }

  .trade-container {
    margin-bottom: 30px;
  }

  .create-link {
    color: #589EF8;
  }

  .create-link:hover {
    opacity: .5;
  }

  .termsheet-dialog >>> .el-dialog {
    width: 384px;
    margin: 0 auto;
    border-radius: 15px;
    box-shadow: 0 16px 24px 2px rgba(0,0,0,0.14), 0 6px 30px 5px rgba(0,0,0,0.12), 0 8px 10px -5px rgba(0,0,0,0.14);
  }

  .termsheet-dialog >>> .el-dialog__body {
    padding: 0;
  }

  .termsheet-dialog >>> .el-dialog__body .content,
  .termsheet-dialog >>> .el-dialog__footer {
    background-color: #fff;
  }

  .termsheet-dialog >>> .el-dialog__body .content {
    padding: 26px 24px 18px 24px;
  }

  .termsheet-dialog >>> .el-dialog__body .content strong {
    font-weight: 700;
    color: rgba(0,0,0,0.87);
    font-size: 1.2em;
    margin-bottom: 18px;
    display: block;
  }

  .termsheet-dialog >>> .el-dialog__body .content p {
    margin-bottom: 18px;
    color: rgba(0,0,0,0.7);
    font-size: .9em;
    font-weight: 400;
    line-height: 1.5;
  }

  .termsheet-dialog >>> .el-dialog__footer {
    padding: 24px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  .termsheet-img {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    max-width: 100%;
    display: block;
  }

  .termsheet-link {
    text-decoration: none;
    color: #4285f4;
    font-weight: 600;
  }

  .btn-agree {
    color: #fff;
    border-radius: 4px;
    padding: 10px;
    border: 1px solid #5190D9;
    font-size: .8em;
    background-color: #427BBE;
  }

  .btn-agree:hover {
    background-color: #2e7bc4;
  }

  @media screen and (max-width: 768px){
    .container{
      padding: 32px 16px;
    }

  }
</style>

