<template>
    <div class="current-reservation">
        <header>
            {{$t('currentReservation')}}
        </header>
        <table class="reservation-table">
            <thead>
            <tr>
                <th>{{$t('account')}}</th>
                <th>{{$t('amount')}}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in reservationTable">
                <td>{{item.account}}</td>
                <td>{{item.quantity}}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                reservationTable: []
            }
        },
        method: {
            getReservation() {
                api.getTableRows({
                    json: true,
                    code: 'myeosgroupon',
                    scope: 'myeosgroupon',
                    table: 'order'
                }).then(({ rows }) => {
                    let orders = rows;

                    this.reservationTable = orders;
                });
            }
        }
    }
</script>

<style>
    .current-reservation{
        padding: 20px;
        background: #fff;
        border-radius: 5px;
        margin: 10px auto;
    }
    .current-reservation header{
        height: 20px;
        padding-left: 10px;
        border-left: 5px solid #0688e9;
        margin-bottom: 20px;
    }
    .reservation-table{
        width: 100%;
    }
    .reservation-table th{
        color: rgba(0,0,0,.5);
        font-size: 10px;
        text-align: left;
        font-weight: normal;
        border-bottom: 1px solid rgba(0,0,0,.1);
        height: 40px;
        line-height: 40px;
    }
    .reservation-table td{
        text-align: left;
        border-bottom: 1px solid rgba(0,0,0,.1);
        height: 44px;
        line-height: 44px;
    }
</style>
