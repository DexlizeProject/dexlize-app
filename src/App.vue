<template>
  <main id="app">
    <div v-show="showAppShadow" class="app-shadow" @click="hideDialogAndShadow"></div>
    <token-header v-on:show-shadow="showShadow" v-on:hide-shadow="hideShadow" />
    <dex-alert type="warning" v-if="showAlert">
      <font-awesome-icon icon="exclamation-circle" size="2x"/>
      <span class="dex-alert-content">Token `{{token.toUpperCase()}}` not exist,
        <router-link class="create-link" :to="{ name: 'publish' }">publish one</router-link>
      </span>
    </dex-alert>
    <!--<el-alert-->
      <!--title=""-->
      <!--show-icon-->
      <!--v-if="showAlert"-->
      <!--type="warning"-->
      <!--:closable="false">-->
      <!--Token `{{token.toUpperCase()}}` not exist,-->
      <!--<router-link-->
        <!--class="create-link"-->
        <!--:to="{ name: 'publish' }">publish one</router-link>-->
    <!--</el-alert>-->
    <div class="container router-container" :class="this.$router.currentRoute.name + '-page'">
      <router-view />
    </div>
    <token-footer v-show="this.$router.currentRoute.name === 'tokens' || this.$router.currentRoute.name === 'kyubey'"/>
    <copyright/>
  </main>
</template>

<script>
/* global scatter */
import Eos from 'eosjs';
import api from '@/utils/eos';
import termsheetSketch from '@/assets/termsheet.png';

export default {
  created() {
      document.addEventListener('scatterLoaded', () => {
        if (!scatter.identity) return;
        const account = scatter.identity.accounts.find(account => account.blockchain === 'eos');
        if (!account) return;
        this.$store.commit('UPDATE_ACCOUNT', account);
      });

      document.addEventListener('bitportalapi', () => {
        const bitportal = window.bitportal;
        window.bitportal = null;

        bitportal.getCurrentWallet().then(data => {
          const account = {
            name: data.account,
            authority: data.permission,
            publicKey: data.publicKey,
            bitportal
          };
          this.$store.commit('UPDATE_ACCOUNT', account)
        });

      });
  },

  mounted() {
    // this.checkTermsheet();
    this.checkToken();
  },

  data() {
    return {
      tokenNotFound: false,
      // needTermsheet: false,
        showAppShadow: false,
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
      showShadow(){
        this.showAppShadow = true;
      },

      hideShadow(){
          this.showAppShadow = false;
      },

      hideDialogAndShadow(){
          this.showAppShadow = false;
          this.$root.$emit('close-dialog')
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
    tokenHeader: require('@/components/header').default,
      tokenFooter: require('@/components/footer').default,
      copyright: require('@/components/copyright').default
  }
}
</script>

<style scoped>
  .container {
    padding: 30px 100px;
  }

  .create-link {
    color: #589EF8;
  }

  .create-link:hover {
    opacity: .5;
  }

  @media screen and (max-width: 768px){
    .container{
      padding: 32px 16px 0;
    }

  }
</style>
