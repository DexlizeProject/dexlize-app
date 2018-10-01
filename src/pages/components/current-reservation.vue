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
            <tr v-for="item in reservationTableToShow">
                <td>{{item.account}}</td>
                <td>{{item.quantity}}</td>
            </tr>
            </tbody>
        </table>
        <footer class="order-footer">
            <div class="order-nav">
                <div class="order-nav-item">
                    <font-awesome-icon
                            @click="gotoPage(currentPage - 1)"
                            :class="{ 'disabled': currentPage === 1 }"
                            icon="chevron-left" />
                </div>
                <div class="order-nav-item" :class="{'btn-blue': currentPage === nav1, 'display-none': nav1 === 'null'}" @click="gotoPage(nav1)">{{this.nav1}}</div>
                <div class="order-nav-item" :class="{'btn-blue': currentPage === nav2, 'display-none': nav2 === 'null'}" @click="gotoPage(nav2)">{{this.nav2}}</div>
                <div class="order-nav-item" :class="{'btn-blue': currentPage === nav3, 'display-none': nav3 === 'null'}" @click="gotoPage(nav3)">{{this.nav3}}</div>
                <div class="order-nav-item" :class="{'btn-blue': currentPage === nav4, 'display-none': nav4 === 'null'}" @click="gotoPage(nav4)">{{this.nav4}}</div>
                <div class="order-nav-item" :class="{'btn-blue': currentPage === nav5, 'display-none': nav5 === 'null'}" @click="gotoPage(nav5)">{{this.nav5}}</div>
                <div class="order-nav-item">
                    <font-awesome-icon
                            @click="gotoPage(currentPage + 1)"
                            :class="{ 'disabled': currentPage === pages }"
                            icon="chevron-right" />
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
    import api from '@/utils/eos';
    export default{
        created(){
            this.getReservation();
        },
        data(){
            return {
                reservationTable: [],
                reservationTableToShow: [],
                pages: '',
                currentPage: 1
            }
        },
        methods: {
            gotoPage(num){
                console.log(num)
                if(num > this.pages || num <= 0){
                    return false;
                }
                this.currentPage = num;
                this.reservationTableToShow = this.reservationTable.slice((num-1) * 10, 10)
            },
            getReservation() {
                api.getTableRows({
                    json: true,
                    code: 'myeosgroupon',
                    scope: 'myeosgroupon',
                    limit: 65535,
                    table: 'order'
                }).then(({ rows }) => {
                    let orders = rows;
                    this.reservationTable = orders;
                    this.pages = Math.ceil(this.reservationTable.length / 10);
                    this.reservationTableToShow = this.reservationTable.slice((this.currentPage -1) * 10, 10)
                });
            }
        },
        computed: {
            nav1(){
                if(this.currentPage === this.pages){
                    return this.currentPage - 4 > 0 ? this.currentPage - 4 : 'null'
                }else{
                    return this.currentPage <= 3 ? 1 : this.currentPage -2
                }
            },

            nav2(){
                if(this.currentPage === this.pages){
                    return this.currentPage - 3 > 0 ? this.currentPage - 3 : 'null'
                }else{
                    return this.currentPage <= 3 ? 2 : this.currentPage - 1
                }
            },

            nav3(){
                if(this.currentPage === this.pages){
                    return this.currentPage - 2 > 0 ? this.currentPage - 2 : 'null'
                }else{
                    return this.currentPage <= 3 ? 3 : this.currentPage
                }
            },

            nav4(){
                if(this.currentPage === this.pages){
                    return this.currentPage - 1 > 0 ? this.currentPage - 1 : 'null'
                }else{
                    return this.currentPage <= 3 ? 4 : this.currentPage + 1
                }
            },

            nav5(){
                if(this.currentPage === this.pages){
                    return this.currentPage
                }else{
                    return this.currentPage <= 3 ? 5 : this.currentPage + 2
                }
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

    .order-nav{
        display: flex;
    }

    .order-nav-item{
        display: inline-block;
        flex: 1;
        text-align: center;
        margin: 0 4px;
        line-height: 32px;
        border-radius: 5px;
    }

    .order-nav-item.blue-gradient{
        border: transparent;
    }

    .order-footer {
        margin-top: 30px;
    }

    .order-footer svg {
        cursor: pointer;
    }

    .order-footer svg.disabled {
        cursor: not-allowed;
    }

    .order-footer svg.disabled > path {
        fill: #979797;
    }

    .order-footer svg > path {
        fill: #979797;
    }

    .order-footer svg:hover > path {
        fill: #979797;
    }

    .order-footer svg.disabled:hover > path {
        fill: #979797;
    }
</style>
