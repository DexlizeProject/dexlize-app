<template>
    <div class="kyubey-page-wrap">
        <div class="header-what-is" @click="showAboutKyubey = !showAboutKyubey">
            <span class="icon-info"/> What is {{this.$store.state.token}}?
        </div>
        <current-round-information/>
        <kby-transaction/>
        <current-reservation/>
        <el-dialog :visible.sync="showAboutKyubey">
            <about-kyubey v-on:close-dialog="showAboutKyubey = false"/>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                showAboutKyubey: false
            }
        },
        created() {
            this.$root.$on('close-dialog', () => {
                this.showAboutKyubey = false;
            })
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
            aboutKyubey: require('./components/kyubey/about-kyubey').default,
            kbyTransaction: require('@/pages/components/kyubey/kby-transaction').default,
            currentRoundInformation: require('@/pages/components/kyubey/current-round-information').default,
            currentReservation: require('@/pages/components/kyubey/current-reservation').default
        }

    }
</script>

<style scoped>
    .header-what-is{
        color: #2e79cd;
        padding: 0 20px;
        background: #fff;
        height: 40px;
        line-height: 40px;
        margin: 10px auto;
        border-radius: 5px;
    }

    .header-what-is .icon-info{
        margin-right: 10px;
        vertical-align: middle;
    }
    .kyubey-page-wrap{
        margin-top: -104px;
    }

    @media screen and (max-width: 768px){
        .kyubey-page-wrap{
            margin-top: -136px;
        }
    }

</style>

