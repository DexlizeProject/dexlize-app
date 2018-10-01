<template>
    <div class="trading-switch">
        <button :class="{'active': this.currentTable === 'PUB'}" @click="switchViewTable('PUB')">PUB</button>
        <button :class="{'active': this.currentTable === 'KBY'}" @click="switchViewTable('KBY')">Kyubey</button>
    </div>
</template>

<script>
    export default{
        props:['switchTable', 'currentTable'],
        methods:{
            switchViewTable(type){
                this.switchTable(type);
            }
        }
    }
</script>

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