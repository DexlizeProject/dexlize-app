<template>
  <section class="token-chart card">
    <header>
      <div>
      </div>
      <ul class="token-filter">
        <li 
          @click="changeInterval('1m')"
          :class="{ 'active': this.interval === '1m' }">1M</li>
        <li 
          @click="changeInterval('1h')"
          :class="{ 'active': this.interval === '1h' }">1h</li>
        <li 
          @click="changeInterval('1d')"
          :class="{ 'active': this.interval === '1d' }">1D</li>
      </ul> 
    </header>
    <div ref="chart"></div>
  </section>
</template>

<script>
import Echarts from 'echarts';
import chartConfig from '../chart-config';
import fetch from '@/utils/api';

export default {
  mounted() {
    this.$refs.chart.style.height = window.innerHeight / 3 + 'px'; 
    this.chart = Echarts.init(this.$refs.chart); 

    this.fetchTrending();

    window.onresize = this.chart.resize;
  },

  data() {
    return {
      interval: '1h'
    };
  },

  watch: {
    token() {
      this.fetchTrending();
    }
  },

  computed: {
    token() {
      return this.$store.state.token;
    }
  },

  methods: {
    fetchTrending() {
      fetch(`token/kline?symbol=${this.token.toUpperCase()}&interval=${this.interval}&limit=50`).then(({ data }) => {
        const dates = data.map(({ time }) => {
          const date = new Date(time);
          const minutes = date.getMinutes();
          return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${minutes < 10 ? '0' + minutes : minutes}`;
        });  
        const kData = data.map(({ open, close, low, high }) => [open, close, low, high]);
        chartConfig.xAxis.data = dates;
        chartConfig.series[0].data = kData;
  
        this.chart.setOption(chartConfig);
      });    
    },

    changeInterval(interval) {
      this.interval = interval;
      this.fetchTrending();
    }
  }
};
</script>

<style scoped>
.token-chart {
  padding: 0;
  margin-bottom: 30px;
}

.token-chart > header {
  padding: 24px 32px 16px;
  display: flex; 
  align-item: center;
  justify-content: space-between;
}

.token-symbol, .token-price {
  color: #515C6C; 
  vertical-align: top;
}

.token-symbol {
  font-weight: 500;
  font-size: 1.8em;
}

.token-price {
  font-weight: 400;
  font-size: 3em;
}

.token-filter {
  display: flex;
  align-items: center;
}

.token-filter > li {
  margin-right: 30px;
  font-size: .8em;
  letter-spacing: 1.5px;
  cursor: pointer;
  color: #9ba6b2;
}

.token-filter > li.active {
  color: #0667d0;
}

.token-filter > li:hover {
  color: #4e5c6e;
}

  @media screen and (max-width: 768px){
    .token-chart > header {
    }
  }
</style>
