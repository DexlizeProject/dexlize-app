<template>
    <div :class="{'dex-alert': true, 'alert-warn': type === 'warning'}">
        <slot></slot>
    </div>
</template>

<script>
    export default{
        props: ['type']
    }
</script>

<style>
    .dex-alert{
        width: 100%;
        padding: 8px 16px;
        border-radius: 4px;
        position: relative;
    }
    .dex-alert.alert-warn{
        background-color: #fdf6ec;
        color: #e6a23c;
    }
    .dex-alert-content{
        padding: 0 8px;
    }
    .fa-exclamation-circle{
        vertical-align: middle;
    }
</style>