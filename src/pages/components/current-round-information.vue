<template>
    <div class="current-round-information">
        <header>Current Round Information</header>
        <div class="current-round-information-content">
            <div class="current-round-information-item">
                <div class="information-label">Remaining Time</div>
                <div class="information-value">01.09.38</div>
            </div>
            <div class="current-round-information-item">
                <div class="information-label">Reference Price <span class="icon-question"/></div>
                <div class="information-value">0.002 EOS</div>
            </div>
            <div class="current-round-information-item">
                <div class="information-label">Reserved Amount</div>
                <div class="information-value">3.7291 EOS</div>
            </div>
            <div class="current-round-information-item">
                <div class="information-label">Reserved Accounts</div>
                <div class="information-value">80</div>
            </div>
        </div>
    </div>
</template>

<style>
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
    .current-round-information-item{
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