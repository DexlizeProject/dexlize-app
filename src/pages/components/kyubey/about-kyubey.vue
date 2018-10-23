<template>
    <section class="token-about card">
        <div class="card-header">
            <div class="card-nav">{{$t('about')}} {{token.toUpperCase()}}
                <font-awesome-icon icon="times" @click="closeDialog"/>
            </div>
        </div>
        <ul class="about-list">
            <li>
                <label>{{$t('marketSupply')}}</label>
                <span>{{about.marketSupply}}</span>
            </li>
            <li>
                <label>{{$t('marketBalance')}}</label>
                <span>{{about.marketBalance}}</span>
            </li>
            <li>
                <label>{{$t('description')}}</label>
            </li>
            <div class="about-kyubey-description">
                {{$t('aboutKby.desc')}}<br/><br/>
                {{$t('aboutKby.li1')}}<br/>
                {{$t('aboutKby.li2')}}<br/>
                {{$t('aboutKby.li3')}}<br/>
                {{$t('aboutKby.li4')}}<br/><br/>
                {{$t('aboutKby.forMore')}}<br/>
                <a href="https://github.com/kyubey-network/kyubey-initial-bancor-offer-contract">https://github.com/kyubey-network/kyubey-initial-bancor-offer-contract</a>
            </div>
        </ul>
        <ul class="social-link-wrap">
            <a href="https://github.com/kyubey-network" target="_blank"><span class="icon-github"></span></a>
        </ul>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                social: {}
            };
        },

        watch: {
            account() {
                this.getBalance();
            }
        },

        computed: {
            token() {
                return this.$store.state.token;
            },
            account() {
                return this.$store.state.account;
            },
            about() {
                return this.$store.state.kby.about;
            }
        },

        methods: {
            closeDialog() {
                this.$root.$emit('close-dialog')
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

    .about-kyubey-description {
        color: #2f2f2f;
        font-size: 12px;
        display: block;
        background: #f3f8fd;
        border: 1px solid #d6e9fb;
        border-radius: 5px;
        padding: 10px;
        line-height: 1.5;
    }

    .about-kyubey-description a {
        color: #0a7cdd;
        text-decoration: none;
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

    .about-list {
        padding-left: 20px;
        padding-right: 20px;
        padding-bottom: 20px;
    }

    .about-list > li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 15px;
        margin-bottom: 15px;
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
