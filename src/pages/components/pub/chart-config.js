export default {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      animation: false,
      type: 'cross',
      lineStyle: {
        color: '#376df4',
        width: 2,
        opacity: 1
      }
    }
  },
  xAxis: {
    type: 'category',
    axisLine: { lineStyle: { color: '#8392A5' } },
    data: []
  },
  yAxis: {
    scale: true,
    axisLine: { lineStyle: { color: '#8392A5' } },
    splitLine: {
    }
  },
  grid: {
    left: 80,
    bottom: 50,
    top: 30,
    right: 50
  },
  series: [
    {
      type: 'k',
      name: 'TOKEN',
      data: [],
      itemStyle: {
        normal: {
          color: '#67c23a',
          color0: '#f56c6c',
          borderColor: '#67c23a',
          borderColor0: '#f56c6c'
        }
      }
    }
  ]
};

