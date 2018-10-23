<template>
    <section class="token-about card">
        <div class="card-header">
            <div class="card-nav">{{$t('about')}} {{token.toUpperCase()}}
                <font-awesome-icon icon="times" @click="closeDialog"/>
            </div>
        </div>
        <ul class="about-list">
            <li>
                <label>{{$t('publisher')}}</label>
                <span>{{pub.about.owner}}</span>
            </li>
            <li>
                <label>{{$t('publishtime')}}</label>
                <span>{{timeFormat(pub.about.start_time)}}</span>
            </li>
            <li>
                <label>{{$t('totalamount')}}</label>
                <span>{{((+pub.about.base_stake + Number(pub.about.base_option) - Number(pub.about.deserved_option)) / Math.pow(10, balance.decimals)).toFixed(balance.decimals)}}</span>
            </li>
            <li>
                <label>{{$t('baseoption')}}</label>
                <span>{{(pub.about.base_option / 10000).toFixed(balance.decimals)}}</span>
            </li>
            <li>
                <label>{{$t('eospool')}}</label>
                <span>{{pub.about.eosPool}}</span>
            </li>
            <li>
                <label>{{$t('buyfeerate')}}</label>
                <span>{{pub.referFeePercent}}%</span>
            </li>
            <li>
                <label>{{$t('sellfeerate')}}</label>
                <span>{{pub.about.feePercent}}%</span>
            </li>
            <li>
                <label>{{$t('lockup')}}</label>
                <span>{{rangeFormat(pub.about.lock_up_period)}}</span>
            </li>
        </ul>
        <ul class="social-link-wrap">
            <a href="https://t.me/DappPub" target="_blank" v-show="$store.state.token === 'PUB'"><span
                    class="icon-telegram"></span></a>
            <a href="https://twitter.com/DappPub" target="_blank" v-show="$store.state.token === 'PUB'"><span
                    class="icon-twitter"></span></a>
            <a href="https://medium.com/dapppub" target="_blank" v-show="$store.state.token === 'PUB'"><span
                    class="icon-medium"></span></a>

            <a href="https://t.me/tokenPocket_en" target="_blank" v-show="$store.state.token === 'TPT'"><span
                    class="icon-telegram"></span></a>
            <a href="https://twitter.com/TokenPocket_TP" target="_blank" v-show="$store.state.token === 'TPT'"><span
                    class="icon-twitter"></span></a>
        </ul>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                social: {},
            };
        },
        computed: {
            pub() {
                return this.$store.state.pub
            },
            token() {
                return this.$store.state.token;
            },
            account() {
                return this.$store.state.account;
            },
            balance() {
                return this.$store.state.balance;
            }
        },
        methods: {
            closeDialog() {
                this.$root.$emit('close-dialog')
            },
            timeFormat(raw) {
                const date = new Date(raw * 1000);
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const day = date.getDate();
                return `${year}-${month}-${day}`;
            },

            rangeFormat(raw) {
                if (Number(raw) === 0) return 0;
                let time = raw * 1000;
                let year = (time / (864E5 * 365)).toFixed(0);
                let month = ((time - year * 864E5 * 365) / 864E5 * 30).toFixed(0);
                let day = ((time - year * 864E5 * 365 - month * 864E5 * 30) / 864E5).toFixed(0);
                if (year <= 0 && month <= 0 && day <= 0) return `less than 1 day`;
                return `${year > 0 ? year + ' years ' : ''}${month > 0 ? month + ' months ' : ''}${day > 0 ? day + ' days ' : ''}`;
            }
        }
    };
</script>

<style scoped>
    .token-about {
        padding: 0;
        margin-top: 0;
        margin-bottom: 0;
        flex: 1;
    }

    .token-about .card-nav {
        text-align: left;
        padding-left: 20px;
        padding-right: 20px;
        border-bottom: 1px solid rgba(0, 0, 0, .1);
    }

    .token-about > header {
        font-weight: 600;
        color: rgb(80, 92, 108);
        margin-bottom: 30px;
        line-height: 1.5;
    }

    .token-about .card-header svg {
        width: 18px;
        height: 18px;
        float: right;
        margin-top: 12px;
    }

    .about-list > li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 15px;
        margin-bottom: 15px;
    }

    .about-list {
        padding-left: 20px;
        padding-right: 20px;
        padding-bottom: 20px;
    }

    .about-list > li > label {
        color: rgba(0, 0, 0, .5);
        margin-right: 100px;
        font-size: 12px;
    }

    .about-list > li > span {
        font-size: 12px;
        color: #2f2f2f;
        line-height: 1.5;
        font-weight: 500;
    }

    .social-link-wrap {
        background: #f9f9f9;
        padding-left: 20px;
        padding-right: 20px;
        height: 50px;
        line-height: 50px;
    }

    .social-link-wrap a {
        margin-right: 15px;
    }
</style>
