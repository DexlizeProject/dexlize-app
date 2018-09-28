<template>
    <div class="trading-switch">
        <button class="active">PUB</button>
        <button>Kyubey</button>
    </div>
</template>

<style>
    .trading-switch{
        background: #fff;
        margin-bottom: 10px;
        display: flex;
        border-radius: 5px;
        height: 40px;
        line-height: 40px;
        padding: 5px;
    }
    .trading-switch button{
        color: rgba(0,0,0,.5);
        background: #fff;
        flex: 1;
        border: none;
        border-radius: 5px;
    }
    .trading-switch button.active{
        color: #fff;
        background: #0688e9;
    }
</style>