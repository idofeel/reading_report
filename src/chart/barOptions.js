// const barOpt = {
//   grid: {
//     top: 0,
//     left: 10,
//     right: 10,
//     bottom: 30,
//   },
//   // color: ["#2e4048"],
//   xAxis: {
//     type: "category",
//     data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
//     min: 0,
//     // axisLine: { show: false },
//     axisTick: { show: false },
//     splitLine: { show: false },
//     axisLabel: {
//       style: {
//         fontSize: 14,
//         fill: "#333",
//       },
//     },
//   },
//   yAxis: {
//     data: "value",
//     min: 0,
//     // axisLine: { show: false },
//     // axisTick: { show: false },
//     // axisLabel: { show: false },
//     // splitLine: { show: false },
//   },
//   series: [
//     {
//       data: [],
//       type: "bar",
//     },
//   ],
// };

const option = {
  grid: {
    top: 10,
    left: 10,
    right: 10,
    bottom: 30,
  },
  color: ["#00837d"],
  xAxis: {
    type: "category",
    data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: "value",
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { show: false },
    splitLine: { show: false },
  },
  series: [
    {
      data: [],
      type: "line",
      smooth: true,
    },
  ],
};

export default option;
