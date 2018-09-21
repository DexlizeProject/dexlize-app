<template>
  <header class="header">
    <p class="logo-text">token</p>
    <div>
      <font-awesome-icon 
        class="icon-search"
        @click="showSearch = true"
        icon="search-dollar" />
      <div 
        class="header-account"
        v-if="account.name">
        <p>{{account.name}}</p> 
        <font-awesome-icon 
          @click="logout"
          icon="sign-out-alt" />
      </div>
      <p 
        class="login-link"
        @click="login"
        v-else>Login</p>
    </div>
    <el-dialog :visible.sync="showSearch">
      <input 
        v-model="keyword"
        @keydown.13="search"
        placeholder="Enter token name, ie: PUB"
        class="search-input" />
    </el-dialog>
  </header>
</template>

<script>
  import network from '@/utils/network';
  import Logo from '@/assets/logo.png';
  import api from '@/utils/eos';

  const url = new URL(location.href);

  export default {
    data() {
      return {
        Logo,
        keyword: "",
        showSearch: false
      }
    },

    methods: {
      login() {
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
      },

      logout() {
        scatter.forgetIdentity().then(() => {
          this.$message.success('User logout success');
          this.$store.commit('UPDATE_ACCOUNT', {});
        });
      },

      search() {
        const { keyword } = this;
        if (!keyword) return;
        this.checkToken(keyword).then(result => {
          if (!result) {
            this.$message.error(`Token: ${keyword.toUpperCase()} not exists`);
          } else {
            this.$router.push({ query: { token: keyword.toUpperCase() } });
            this.$store.commit('UPDATE_TOKEN', keyword);
            this.showSearch = false;
          }
        });
      },

      checkToken(token) {
        return api.getTableRows({
          json: true,
          code: 'tokendapppub',
          scope: token.toUpperCase(),
          table: 'games'
        }).then(({ rows }) => {
          return rows.length;
        });
      }
    },

    computed: {
      account() {
        return this.$store.state.account;
      }
    },

    watch: {
      $route(to, from) {
        if (to.query.token === from.query.token) return;
        this.$store.commit('UPDATE_TOKEN', to.query.token);
      }
    }
  };
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #2968C9;
  padding: 0 100px;
  height: 70px; 
  box-shadow: rgba(114, 115, 119, 0.05) 0px 4px 14px;
  color: #fff;
}

.header > div {
  display: flex;
  align-items: center;
}

.logo-text {
  font-weight: 600;
  font-size: 1.4em;
  letter-spacing: 1px;
}

.header-account {
  display: flex;
  align-items: center;
}

.header-account > p {
  margin-right: 10px;
}

.header-account > svg {
  cursor: pointer;
}

.login-link:hover {
  cursor: pointer; 
  text-shadow: 0 0 5px #fff;
}

.icon-search {
  margin-right: 60px;
  cursor: pointer;
  transition: transform ease 400ms; 
}

.icon-search:hover {
  transform: scale(2);
}

.search-input {
  outline: none;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  font-size: 1.5em;
  font-style: italic;
  border: none;
}
</style>

