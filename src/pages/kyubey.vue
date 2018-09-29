<template>
    <div class="kyubey-page-wrap">
        <div class="kyubey-header">

        </div>
        <!--<token-chart />-->
        <!--<token-info />-->
        <!--<token-orders />-->
    </div>
</template>

<script>
    export default {
        created() {
            // document.addEventListener('scatterLoaded', () => {
            //     if (!scatter.identity) return;
            //     const account = scatter.identity.accounts.find(account => account.blockchain === 'eos');
            //     if (!account) return;
            //     this.$store.commit('UPDATE_ACCOUNT', account)
            // });
            //
            // document.addEventListener('bitportalapi', () => {
            //     const bitportal = window.bitportal;
            //     window.bitportal = null;
            //
            //     bitportal.getCurrentWallet().then(data => {
            //         const account = {
            //             name: data.account,
            //             authority: data.permission,
            //             publicKey: data.publicKey,
            //             bitportal
            //         };
            //         this.$store.commit('UPDATE_ACCOUNT', account)
            //     });
            // });
        },

        components: {
            // tokenInfo: require('./components/token-info').default,
            // tokenChart: require('./components/token-chart').default,
            // tokenOrders: require('./components/orders').default,
            // tradeForm: require('@/components/trade').default,
        }
    }
</script>

<style scoped>
    .kyubey-page-wrap{
        margin-top: -144px;
    }

    @media screen and (max-width: 768px){
        .kyubey-page-wrap{
            margin-top: -176px;
        }
    }

</style>

