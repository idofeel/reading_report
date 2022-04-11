import Vue from "vue";
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from "echarts/core";
// 引入各种图表，图表后缀都为 Chart
import { BarChart, PieChart } from "echarts/charts"; //这里我引用两个类型的图表
// import echarts from '@/utils/echartsUI';

// 引入提示框，标题，直角坐标系等组件，组件后缀都为 Component
import {
  //   TitleComponent,
  //   TooltipComponent,
  GridComponent,
  //   LegendComponent,
  // ToolboxComponent,
  //   DataZoomComponent,
  // GeoCoComponent
} from "echarts/components";
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from "echarts/renderers";

// 注册必须的组件
echarts.use([
  // 布局组件
  // TitleComponent,
  // TooltipComponent,
  GridComponent,
  // LegendComponent,
  CanvasRenderer,
  // SVGRenderer,
  // ToolboxComponent,
  // DataZoomComponent,
  // 图表
  BarChart,
  PieChart,
  // LineChart,
]);

Vue.prototype.$echarts = echarts;

export default echarts;
