<template>
    <div class="current-round-information">
        <header>Current Round Information</header>
        <div class="current-round-information-content">
            <div class="information-item">
                <div class="information-label">Remaining Time</div>
                <div class="information-value">{{remainingTime}}</div>
            </div>
            <div class="information-item">
                <div class="information-label">Reference Price <span class="icon-question"/></div>
                <div class="information-value">{{referencePrice}}</div>
            </div>
            <div class="information-item">
                <div class="information-label">Reserved Amount</div>
                <div class="information-value">{{reservedAmount}}</div>
            </div>
            <div class="information-item">
                <div class="information-label">Reserved Accounts</div>
                <div class="information-value">{{reservedAccounts}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        created(){

        },
        data(){
            return{
                remainingTime: '01.09.38',
                referencePrice: '0.002 EOS',
                reservedAmount: '3.7291 EOS',
                reservedAccounts: '80'
            }
        }
    }
</script>

<style scoped>
    .current-round-information{
        padding: 20px;
        background: #fff;
        border-radius: 5px;
        margin: 10px auto;
    }
    .current-round-information header{
        height: 20px;
        padding-left: 10px;
        border-left: 5px solid #0688e9;
        margin-bottom: 20px;
    }
    .information-item{
        display: flex;
        margin-bottom: 15px;
    }
    .information-label{
        flex: 1;
        justify-content: left;
        color: rgba(0,0,0,.5);
    }
    .information-value{
        flex: 1;
        text-align: right;
        justify-content: right;
    }
</style>