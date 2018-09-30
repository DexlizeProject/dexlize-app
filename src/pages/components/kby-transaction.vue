<template>
    <div class="kby-transaction">
        <header>
            <button>Buy</button>
            <button>Sell</button>
        </header>
        <div class="buy-content">
            <div class="information-item">
                <div class="information-label">
                    Balance
                </div>
                <div class="information-value">
                    1,12312,231312.3221 EOS
                </div>
            </div>
            <div class="information-item">
                <div class="information-label">
                    Amount
                </div>
                <div class="information-value">
                    <input type="text" class="transaction-input"/>
                    <span class="transaction-input-unit">EOS</span>
                </div>
            </div>
            <div class="information-item">
                <div class="information-label">
                    Obtain ≈
                </div>
                <div class="information-value">
                    23,600 KBY
                </div>
            </div>

        </div>
        <div class="sell-content">

        </div>
    </div>

</template>

<style scoped>
    .kby-transaction{
        padding:0 20px 20px;
        background: #fff;
        border-radius: 5px;
        margin: 10px auto;
    }
    .kby-transaction header{
        display: flex;
        height: 50px;
        line-height: 50px;
        margin-bottom: 20px;
    }
    .kby-transaction header button{
        flex: 1;
    }
    .transaction-input{
        outline: 0;
        padding-left: 4px;
        border: 1px solid #a8a8a8;
        background: #fff;
        border-radius: 5px 0 0 5px;
        font-size: 16px;
        min-width: 0;
        -webkit-appearance: none;
        flex-shrint: 1;
    }
    .transaction-input::placeholder{
        font-size: 14px;
    }
    .transaction-input-unit{
        color: #a8a8a8;
        border: 1px solid #a8a8a8;
        border-left: none;
        padding: 0 4px;
        background: #fff;
        border-radius: 0 5px 5px 0;
    }
    .information-item{
        display: flex;
        margin-bottom: 15px;
        height: 20px;
    }
    .information-label{
        flex: 1;
        justify-content: left;
        color: rgba(0,0,0,.5);
        align-items: center;
    }
    .information-value{
        flex: 3;
        align-items: center;
        text-align: right;
        justify-content: right;
    }
</style>