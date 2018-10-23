<template>
    <div class="tokens-page-wrap">
        <div class="header-what-is" @click="showTokenAbout = !showTokenAbout">
            <span class="icon-info"/> What is {{this.$store.state.token}}?
        </div>
        <pub-chart/>
        <pub-transaction/>
        <orders/>
        <dex-dialog :visible.sync="showTokenAbout">
            <about-pub/>
        </dex-dialog>
    </div>
</template>

<script>
    import api from '@/utils/eos';

    export default {
        mounted() {
            this.getInitialData();
        },
        watch: {
            token() {
                this.getInitialData()
            },
            account() {
                this.getBalance();
                this.getEOSBalance();
            }
        },
        data() {
            return {
                showTokenAbout: false,
            }
        },
        computed: {
            token() {
                return this.$store.state.token;
            },
            account(){
                return this.$store.state.account;
            }
        },
        methods: {
            getInitialData() {
                this.getBalance();
                this.getEOSBalance();
                this.fetchToken();
                this.fetchReferFee();
            },
            getBalance() {
                api.getTableRows({
                    json: true,
                    code: 'tokendapppub',
                    table: 'stat',
                    scope: this.token.toUpperCase()
                }).then(({rows}) => {
                    this.$store.commit('UPDATE_BALANCE', rows[0])
                });
            },
            fetchToken() {
                api.getTableRows({
                    json: true,
                    code: 'tokendapppub',
                    scope: this.token.toUpperCase(),
                    table: 'games'
                }).then(({rows}) => {
                    this.$store.commit('UPDATE_PUB_ABOUT', rows[0])
                });
            },
            fetchReferFee() {
                api.getTableRows({
                    json: true,
                    code: 'tokendapppub',
                    scope: this.token.toUpperCase(),
                    table: 'refer'
                }).then(({rows}) => {
                    this.$store.commit('UPDATE_PUB_REFER_FEE_PERCENT', rows)
                });
            },
            getEOSBalance() {
                api.getCurrencyBalance('eosio.token', this.account.name, 'EOS').then((row) => {
                    this.$store.commit('UPDATE_EOS_BALANCE', row[0]);
                });
            }
        },
        created() {
            document.addEventListener('scatterLoaded', () => {
                if (!scatter.identity) return;
                const account = scatter.identity.accounts.find(account => account.blockchain === 'eos');
                if (!account) return;
                this.$store.commit('UPDATE_ACCOUNT', account)
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

            this.$root.$on('close-dialog', () => {
                this.showTokenAbout = false;
            })
        },

        components: {
            pubTransaction: require('./components/pub/pub-transaction').default,
            pubChart: require('./components/pub/pub-chart').default,
            orders: require('./components/pub/orders').default,
            aboutPub: require('./components/pub/about-pub').default
        }
    }
</script>

<style scoped>
    .tokens-page-wrap {
        margin-top: -113px;
    }

    .token-filter > p {
        margin-right: 15px;
    }

    .header-what-is {
        color: #2e79cd;
        padding: 0 20px;
        background: #fff;
        height: 40px;
        line-height: 40px;
        margin: 10px auto;
        border-radius: 5px;
    }

    .header-what-is .icon-info {
        margin-right: 10px;
        vertical-align: middle;
    }

    @media screen and (max-width: 768px) {
        .tokens-page-wrap {
            margin-top: -136px;
        }
    }

</style>

