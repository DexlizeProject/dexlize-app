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
    import api from '@/utils/eos';
    export default {
        mounted(){
            this.fetchToken();
        },
        data(){
            return {
                showAboutKyubey: false
            }
        },
        methods: {
            fetchToken() {
                // get market data and init the supply and balance of market from eos by contract
                api.getTableRows({
                    json: true,
                    code: 'dacincubator',
                    scope: 'dacincubator',
                    table: 'market'
                }).then(({rows}) => {
                    this.$store.commit('UPDATE_KBY_ABOUT', rows[0])

                });
            }
        },
        created() {
            this.$root.$on('close-dialog', () => {
                this.showAboutKyubey = false;
            })
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

