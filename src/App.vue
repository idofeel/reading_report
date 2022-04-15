<template>
  <div id="app" @touchend="handleAutoplay" @touchstart="handleAutoplay">
    <div
      class="music_icon"
      :class="{ playing: !paused }"
      @click.stop="togglePlay"
    >
      <svg viewBox="0 0 1024 1024" version="1.1">
        <path
          d="M512 960A448 448 0 1 1 802.133333 170.666667a42.666667 42.666667 0 0 1-55.466666 65.493333 362.666667 362.666667 0 1 0 112 170.666667l-226.346667 226.133333a170.666667 170.666667 0 1 1 44.16-164.906667l165.546667-167.04a42.666667 42.666667 0 0 1 37.333333-13.653333 42.666667 42.666667 0 0 1 32.426667 23.04A448 448 0 0 1 512 960z m0-533.333333a85.333333 85.333333 0 0 0-60.373333 145.706666 87.466667 87.466667 0 0 0 120.746666 0l2.133334-2.133333 1.066666-1.493333A85.333333 85.333333 0 0 0 512 426.666667z"
          p-id="4760"
        ></path>
      </svg>
    </div>

    <!--  -->
    <audio ref="video" class="video" controls autoplay @play="handlePlaying">
      <source src="/bg.mp3" autoplay="autoplay" type="audio/mp3" />
    </audio>
    <full-page
      ref="fullpage"
      :options="options"
      id="fullpage"
      @after-load="afterLoad"
    >
      <!--p1 -->
      <div class="section p1">
        <!-- <img :src="require('@/assets/logo.png')" class="logo" alt="" /> -->
        <div>
          <div class="content main" v-if="loading">
            <dv-loading class="loading">
              <span v-if="times === 30">
                <!-- 开启天津图书馆<b>{{ year }}</b
                >年度个人阅读账单中...
                 -->
                专属您的阅读报告正在生成，请耐心等待……
              </span>
              <span v-else
                >加载数据量较大，请您稍候，预计还需要{{ times }}秒</span
              >
            </dv-loading>
          </div>

          <!-- <h4>
              <b>{{ year }}</b
              >年度个人阅读账单
            </h4> -->
          <button v-show="!loading" @click="nexPage" class="open">开启</button>
          <!-- <div class="title">天津图书馆</div> -->
        </div>
      </div>
      <!--  -->
      <!--p2 -->
      <div class="section p1_5">
        <!-- <img :src="require('@/assets/logo.png')" class="logo" alt="" /> -->
        <div class="content">
          <div>
            <b>{{ registrationDate }}</b> <span>我们相遇</span>
          </div>
          <div class="line2">
            <span>在一起度过了</span> <b>{{ readData.regNowDay }}天</b>
          </div>
          <!-- <div class="desc">读书不觉已春深，一寸光阴一寸金（王贞白）</div> -->
        </div>
      </div>
      <!--p3 -->
      <div class="section p3" v-if="showHistory">
        <!-- <img :src="require('@/assets/logo.png')" class="logo" alt="" /> -->
        <div class="content">
          <p>
            <b>{{ year }}</b
            >年我在天津图书馆
          </p>
          <p>
            到馆借阅 <b>{{ readData.borrowedDayTotal }} </b>次
          </p>
          <p>
            共借阅书籍 <b>{{ readData.borrowedTotal }} </b>册
          </p>
          <p>
            <!-- ？ -->
            共节省 <b>{{ readData.priceCount }} </b>元
          </p>

          <p>
            累计借阅<b>{{ readData.sumDay }}</b
            >天
          </p>
        </div>
      </div>
      <div class="section p3" v-else>
        <!-- <img :src="require('@/assets/logo.png')" class="logo" alt="" /> -->
        <div class="content">
          <p>
            您在<b>{{ year }}</b
            >年度未有借阅记录
          </p>
        </div>
      </div>
      <!--p4 -->
      <div class="section p4_1">
        <!-- <img :src="require('@/assets/logo.png')" class="logo" alt="" /> -->
        <!-- <div class="content">
          <p>生活的一切不解与疑惑</p>
          <p>都能在书中找到答案</p>
        </div> -->
      </div>

      <!-- p5 -->
      <div class="section p2" v-if="showHistory">
        <!-- <img :src="require('@/assets/logo.png')" class="logo" alt="" /> -->
        <div class="content">
          <div>
            <h5>
              <b>{{ year }}</b
              >年我借阅的第一本书
            </h5>
            <h4>《{{ readData.fistBookInfo.title }}》</h4>
            <p>责任者：{{ readData.fistBookInfo.author }}</p>
            <p>出版社：{{ readData.fistBookInfo.publisher }}</p>
            <p>ISBN：{{ readData.fistBookInfo.isbn }}</p>

            <!-- <p>索书号：{{ readData.fistBookInfo.callNo }}</p> -->
            <p>借阅日期: {{ readData.fistBookInfo.dueDate }}</p>
          </div>

          <div>
            <h5>
              <b>{{ year }}</b
              >年我借阅的最后一本书
            </h5>
            <h4>《{{ readData.lastBookInfo.title }}》</h4>
            <p>责任者：{{ readData.lastBookInfo.author }}</p>
            <p>出版社：{{ readData.lastBookInfo.publisher }}</p>
            <p>ISBN：{{ readData.lastBookInfo.isbn }}</p>
            <!-- <p>索书号：{{ readData.lastBookInfo.callNo }}</p> -->
            <p>借阅日期： {{ readData.lastBookInfo.dueDate }}</p>
          </div>
        </div>
      </div>
      <!-- p6 -->
      <div class="section p6_1">
        <!-- <img :src="require('@/assets/logo.png')" class="logo" alt="" /> -->
        <!-- <div class="content">
          <p>一半诗意，一半烟火</p>
          <p>才是生活最美的样子</p>
        </div> -->
      </div>

      <!-- p7 -->
      <div class="section p4 barChart" v-if="showHistory">
        <!-- <img :src="require('@/assets/logo.png')" class="logo" alt="" /> -->
        <div class="content">
          <div class="title">
            <!-- <h4>看看我什么时间在图书馆呢？</h4> -->
            <p>
              <b>{{ year }}</b
              >年我在<b>{{ weekName }}</b
              >借书最多
            </p>
          </div>
          <!-- chartchart  -->
          <!-- <dv-charts ref="chartRef" :option="chartOption" /> -->
          <div ref="chartRef" class="chart_ref"></div>
        </div>
      </div>
      <!-- p8 -->
      <div class="section p4_2">
        <!-- <img :src="require('@/assets/logo.png')" class="logo" alt="" /> -->
        <!-- <div class="content">
          <p>即使读书不会给你带来直接的财富</p>
          <p>但是可以使你的内心富足</p>
        </div> -->
      </div>
      <!-- p9 -->
      <div class="section p5 pieChart" v-if="showHistory">
        <!-- <img :src="require('@/assets/logo.png')" class="logo" alt="" /> -->
        <div class="content">
          <p>
            <b>{{ year }}</b> 年这些充满知识的书籍
          </p>
          <!-- <p>
            我到馆借阅<b>{{ readData.borrowedTotal }}</b
            >次
          </p>
          <p>
            共陪伴了我<b>{{ readData.sumDay }}</b
            >天
          </p>
          <p>
            节省了<b>{{ readData.priceCount }}</b
            >元钱
          </p> -->
          <p>
            让我的人生厚度增加了<b>{{ readData.pageCount }}</b
            >页
          </p>
          <p>
            让我人生的宽度增加了<b>{{ readData.thickCount }}</b
            >厘米
          </p>
          <!-- <p class="desc">腹有诗书气自华，你就是你读的书</p> -->
        </div>
      </div>
      <!-- p10 -->
      <div class="section p6" v-if="showHistory">
        <!-- <img :src="require('@/assets/logo.png')" class="logo" alt="" /> -->
        <div class="content">
          <p style="margin: 20px">我的阅读取向</p>
          <!-- chartchart  -->
          <!-- <dv-charts ref="pieChartRef" :option="pieOption" /> -->
          <div class="chart_ref" ref="pieChartRef"></div>
          <!-- <p class="desc">
            一本书像一艘船，带领我们从狭隘的地方，驶向生活的无限广阔的海洋。（海伦·凯勒）
          </p> -->
        </div>
      </div>
      <!-- p11 -->
      <div class="section p11_1">
        <!-- <img :src="require('@/assets/logo.png')" class="logo" alt="" /> -->
        <!-- <div class="content">
          <p>一本书可以让你知道</p>
          <p>从古到今跟你有同样烦恼</p>
          <p>并且同样在寻找答案的人有很多</p>
          <p>你并不孤单</p>
        </div> -->
        <!-- <p class="desc">其实你不孤单，你身旁有书有灯有未来</p> -->
      </div>
      <!-- p12 -->
      <div class="section p7" v-if="showHistory">
        <!-- <img :src="require('@/assets/logo.png')" class="logo" alt="" /> -->
        <div class="content">
          <!-- 悦读趣味：我是一个XX家 -->
          <p>
            <b>{{ year }}</b
            >年我最爱的书
          </p>
          <h4>《{{ readData.p7BookInfo.title }}》</h4>
          <!-- <p>作者：{{ readData.p7BookInfo.author }}</p> -->
          <!-- <p>索书号：{{ readData.p7BookInfo.callNo }}</p> -->
          <p>责任者：{{ readData.p7BookInfo.author }}</p>
          <p>出版社：{{ readData.p7BookInfo.publisher }}</p>
          <p>ISBN：{{ readData.p7BookInfo.isbn }}</p>
          <p>借阅日期:{{ readData.p7BookInfo.dueDate }}</p>
          <p>
            这本书，我看了<b>{{ readData.p7BookInfo.week }}</b
            >天
          </p>
        </div>
      </div>
      <!-- p13 -->
      <div class="section p8">
        <!-- <img :src="require('@/assets/logo.png')" class="logo" alt="" /> -->
        <div class="content">
          <p style="margin-bottom: 10px">图书推荐</p>
          <div>
            <h4 class="theme">《{{ readData.printout.bookNames }}》</h4>
          </div>

          <!-- <p class="desc">奇文共欣赏，疑义相与析。（陶渊明）</p> -->
        </div>
      </div>
      <!-- p14 -->
      <div class="section p9">
        <!-- <img :src="require('@/assets/logo.png')" class="logo" alt="" /> -->
        <div class="content">
          <p>
            <b>{{ year }}</b>
            年天津图书馆微信服务号陪伴了我
            <b>{{ readData.wechatNowDay }}</b>
            <!-- <b>191</b> -->天
          </p>
          <br />
          <div>
            同时为全馆读者推送了:
            <p>
              <!-- <b>{{ readData.tipNotice }}</b> -->
              <b>76584</b>
              次图书到期提醒
            </p>
            <p>
              <!-- <b>{{ readData.p9a }}</b
              > -->
              <b>195</b>
              篇推文
            </p>
            <p>
              <!-- <b>{{ readData.p9b }}</b> -->
              <b>17</b>
              个微信阅读数据库
            </p>
            <p>
              <!-- <b>{{ readData.p9c }}</b> -->
              <b>34</b>
              次读者活动预告
            </p>
          </div>
        </div>
      </div>
      <!-- p15 -->
      <div class="section p10">
        <!-- <img :src="require('@/assets/logo.png')" class="logo" alt="" /> -->
        <!-- <p>无论你是年老还是年轻</p>
          <p>无论你是贫穷还是富有</p>
          <p>无论你是患病还是健康</p>
          <p style="margin-top: 20px">都能享受阅读带来的乐趣</p>
          <p style="margin: 20px 0">
            都能尊重和感谢为人类文明做出巨大贡献的文学、文化、科学思想大师们，
            都能保护知识产权。
          </p> -->
        <!-- <div class="content">
        
          <p>要么读书</p>
          <p>要么旅行</p>
          <p>心和身体总要有一个在路上</p>
          <p>读起来，让我的2022年闪闪发光！</p>
          <p style="text-align: right; margin-top: 20px">
            致{{ year * 1 + 1 }}年4月23日世界读书日
          </p>
        </div> -->
      </div>
    </full-page>

    <modal class="login_modal" name="login" :clickToClose="false" width="320">
      <Login @success="loginSuccess"></Login>
    </modal>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
// import axios from "axios";
// const http =  axios.create({
//       baseURL: '/dev-api', // url = base url + request url
//       // withCredentials: true, // send cookies when cross-domain requests
//       timeout: 500000, // request timeout
//     });

// import Charts from "@jiaminghi/charts";

import pieOption from "./chart/pieOptions";
import chartOption from "./chart/barOptions";
import Login from "./components/Login.vue";

const baseUrl = process.env.VUE_APP_BASE_API;
export default {
  name: "App",
  components: {
    // HelloWorld,
    Login,
  },

  data() {
    return {
      options: {
        // 为每个section设置背景色
        //sectionsColor: ["#f00","#0f0","#00f"],
        //用来控制slide幻灯片的箭头，设置为false，两侧的箭头会消失
        //controlArrows: false,
        //每一页幻灯片的内容是否垂直居中
        //verticalCentered: false,
        //字体是否随着窗口缩放而缩放
        //resize: true,
        //页面滚动速度
        //scrollingSpeed: 700,
        //定义锚链接，用户可以快速打开定位到某一页面；不需要加"#"，不要和页面中任意的id和name相同
        //anchors: ["page1","page2","page3"],
        //是否锁定锚链接
        //lockAnchors: true,
        //定义section页面的滚动方式，需要引入jquery.easings插件
        //easing:,
        //是否使用css3 transform来实现滚动效果
        //css3: false,
        //滚动到最顶部后是否连续滚动到底部
        //loopTop: true,
        //滚动到最底部后是否连续滚动到顶部
        //loopBottom: true,
        //横向slide幻灯片是否循环滚动
        //loopHorizontal: false,
        //是否循环滚动，不会出现跳动，效果很平滑
        //continuousVertical: true,
        //是否使用插件滚动方式，设为false后，会出现浏览器自带的滚动条，将不会按页滚动
        //autoScrolling: false,
        //是否包含滚动条，设为true，则浏览器自带的滚动条会出现，页面还是按页滚动，但是浏览器滚动条默认行为也有效
        //scrollBar: true,
        //设置每个section顶部的padding，当我们要设置一个固定在顶部的菜单、导航、元素等时使用
        //paddingTop: "100px",
        //设置每个section底部的padding，当我们要设置一个固定在底部的菜单、导航、元素等时使用
        //paddingBottom: "100px",
        //固定的元素，为jquery选择器；可用于顶部导航等
        //fixedElements: ".nav",
        //是否可以使用键盘方向键导航
        //keyboardScrolling: false,
        //在移动设置中页面敏感性，最大为100，越大越难滑动
        //touchSensitivity: 5,
        //设为false，则通过锚链接定位到某个页面不再有动画效果
        //animateAnchor: false,
        //是否记录历史，可以通过浏览器的前进后退来导航
        //recordHistory: true,
        //绑定菜单，设定相关属性和anchors的值对应后，菜单可以控制幻灯片滚动
        //menu: '.nav',
        //是否显示导航，设为true会显示小圆点作为导航
        //navigation: true,
        //导航小圆点的位置，可以设置为left或者right
        //navigationPosition: right,
        //鼠标移动到小圆点上时显示出的提示信息
        //navigationTooltips: ["第一页","第二页","第三页"],
        //是否显示当前页面小圆点导航的提示信息，不需要鼠标移上
        //showActiveTooltip: true,
        //是否显示横向幻灯片的导航
        //slidesNavigation: true,
        //横向幻灯片导航的位置，可以为top或者bottom
        //slidesNavPosition: bottom,
        //内容超过满屏时是否显示滚动条，需要jquery.slimscroll插件
        //scrollOverflow: true,
        //section选择器
        //sectionSelector: ".section",
        //slide选择器
        //slideSelector: ".slide"
        licenseKey: "OPEN-SOURCE-GPLV3-LICENSE",
        afterLoad: this.afterLoad,
        scrollOverflow: true,
        scrollBar: false,
        menu: "#menu",
        // navigation: true,
        // anchors: ['page1', 'page2', 'page3'],
        sectionsColor: [
          "#41b883",
          "#ff5f45",
          "#0798ec",
          "#fec401",
          "#1bcee6",
          "#ee1a59",
          "#2c3e4f",
          "#ba5be9",
          "#b4b8ab",
          "#1bcee6",
        ],
      },
      paused: true,
      autoplay: false,
      loading: true,
      times: 30,
      readData: {
        fistBookInfo: {},
        lastBookInfo: {},
        p7BookInfo: {},
        printout: {},
        // 周数据
        weekObj: {},
      },
      chartOption,
      pieOption,
      weekNames: [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
      ],
      params: {
        borId: "",
        beginDate: "",
        endDate: "",
      },
    };
  },
  computed: {
    registrationDate() {
      const date = String(this.readData.registrationDate);
      return date
        ? `${date.slice(0, 4)}年${date.slice(4, 6)}月${date.slice(6)}日`
        : "";
    },
    week() {
      if (!this.readData.returnWeekList || !this.readData.returnWeekList.length)
        return "";
      return this.readData.returnWeekList.map((i) => i.total);
    },
    weekName() {
      const maxReadDay = this.getMax(Object.values(this.readData.weekObj));
      return this.weekNames[maxReadDay];
    },
    year() {
      return this.params.beginDate ? this.params.beginDate.slice(0, 4) : "";
    },
    showHistory() {
      const { borrowedDayTotal } = this.readData;

      return borrowedDayTotal && borrowedDayTotal > 0;
    },
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.$refs.fullpage.api.reBuild();
    });

    this.$refs.fullpage.api.setAllowScrolling(false);

    // 判断是否等咯
    const paramsStr = window.location.search.substring(1);
    const queryList = paramsStr.split("&");
    const query = {};
    //
    queryList.forEach((i) => {
      const [key, value] = i.split("=");
      query[key] = value;
    });

    this.params = query;

    // 没有borId beginDate endDate
    if (!query.borId || !query.beginDate || !query.endDate) {
      this.$modal.show("login");
    } else {
      this.getData();
    }
    document.title = `天津图书馆${this.year}年度读者阅读报告`;
    // http.get('/wechat/historyjob!history.action?borId=TJPD00000007621&beginDate=20210101&endDate=20211231')
    // const video = this.$refs.video;
    // console.log(video.paused);
    // if(video.paused) video.play();
    // setTimeout(()=>{
    // this.muted = false
    // },1000)
  },
  methods: {
    togglePlay() {
      const video = this.$refs.video;
      this.paused ? video.play() : video.pause();
      this.paused = !this.paused;
    },
    handleAutoplay() {
      const video = this.$refs.video;
      if (!this.autoplay && video.paused) {
        video.play();
        // this.autoplay = true;
        // this.paused = !this.paused;
      }
    },
    handlePlaying() {
      this.autoplay = true;
      this.paused = false;
    },
    reBuild() {
      this.$refs.fullpage.api.reBuild();
    },
    countdown() {
      this.timer = setInterval(() => {
        this.times--;
        if (this.times === 0) {
          clearInterval(this.timer);
        }
      }, 1000);
    },
    loginSuccess(borInfo) {
      this.closeModal();
      this.params = {
        ...this.params,
        ...borInfo,
      };
      this.getData();
    },
    closeModal() {
      this.$modal.hide("login");
    },
    //获取最大值
    getMax(arr) {
      var max = arr[0];
      //声明了个变量 保存下标值
      var index = 0;
      for (var i = 0; i < arr.length; i++) {
        if (max < arr[i]) {
          max = arr[i];
          index = i;
        }
      }
      return index;
    },
    nexPage() {
      this.$refs.fullpage.api.moveSectionDown();
    },
    afterLoad(old, current) {
      console.log(old);
      if (current.item.className.includes("barChart")) {
        this.showWeekBorrow(this.readData.weekObj);
      }
      if (current.item.className.includes("pieChart")) {
        const sortData = this.readData.type.sort((a, b) => b.total - a.total);
        const topFive = sortData.reduce((total, item) => {
          if (total.length < 5) {
            total.push({
              name: item.name,
              value: item.total,
            });
          } else {
            if (total[5]) {
              total[5].value += item.total;
            } else {
              total[5] = { name: "其他", value: item.total };
            }
          }
          return total;
        }, []);
        console.log(JSON.stringify(topFive));
        this.showPieChart(topFive);
      }
    },
    queryParams(data, isPrefix) {
      isPrefix = isPrefix ? isPrefix : false;
      let prefix = isPrefix ? "?" : "";
      let _result = [];
      for (let key in data) {
        let value = data[key];
        // 去掉为空的参数
        if (["", undefined, null].includes(value)) {
          continue;
        }
        if (value.constructor === Array) {
          value.forEach((_value) => {
            _result.push(
              encodeURIComponent(key) + "[]=" + encodeURIComponent(_value)
            );
          });
        } else {
          _result.push(
            encodeURIComponent(key) + "=" + encodeURIComponent(value)
          );
        }
      }

      return _result.length ? prefix + _result.join("&") : "";
    },
    async getData() {
      const search = this.queryParams(this.params);
      // 5s 后进行倒计时展示
      const timer = setTimeout(() => {
        this.countdown();
      }, 5000);
      try {
        const res = await fetch(
          baseUrl + "/wechat/historyjob!history.action?" + search,
          {
            method: "GET", //
            mode: "cors",
          }
        );
        clearTimeout(timer);
        if (res.status === 200) {
          const data = await res.json();
          //  fistBookInfo: {},
          // lastBookInfo: {},
          // p7BookInfo: {},
          // printout: {},
          // // 周数据
          // weekObj: {},
          data.fistBookInfo = data.fistBookInfo || {};
          data.lastBookInfo = data.lastBookInfo || {};
          data.p7BookInfo = data.p7BookInfo || {};
          data.printout = data.printout || {};
          this.readData = data;

          // 修改图表数据
          const weekObj = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
          };
          data.returnWeekList.forEach((i) => (weekObj[i.name] = i.total));

          this.readData.weekObj = weekObj;

          this.loading = false;
          // this.reBuild()
          console.log(this.$refs.fullpage);

          this.$nextTick(() => {
            this.$refs.fullpage.api.destroy();
            this.$refs.fullpage.build();
            // this.$refs.fullpage.api.setAllowScrolling(true);
          });
          // this.showWeekBorrow(data.returnWeekList);

          console.log(this.readData);
        } else {
          this.$toast.center("获取数据失败，绑定后重试");
          this.$modal.show("login");
        }
      } catch (error) {
        this.$toast.center("获取数据失败，请登录后重试");
        this.$modal.show("login");
      }
    },
    showWeekBorrow(weekObj) {
      const [sunday, ...list] = Object.values(weekObj);
      if (sunday !== undefined) list.push(sunday);

      this.chartOption.series[0].data = list;

      const chart = this.initEchart("chartRef");
      // this.$refs.chartRef.
      chart.setOption(this.chartOption);
      console.log(this.chartOption);
    },
    showPieChart(data) {
      if (data.length === 0) return;
      this.pieOption.series[0].data = data;

      const chart = this.initEchart("pieChartRef");
      // this.$refs.chartRef.
      chart.setOption(this.pieOption);
      // this.$refs.pieChartRef.chart.setOption(this.pieOption);
    },
    initEchart(refsName) {
      if (!refsName) return;
      const myEchart = this.$echarts.init(this.$refs[refsName], null);
      window.addEventListener("resize", myEchart.resize);
      return myEchart;
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
button {
  /* background: #ff8200; */
  background: #25ac6c;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 10px;
  letter-spacing: 1px;
  font-family: Open Sans, sans-serif;
  font-weight: 400;
  min-width: 140px;
  margin-top: 8px;
  color: #8b8c8d;
  cursor: pointer;
  border: 1px solid #dddedf;
  text-transform: uppercase;
  transition: all 0.1s;
  font-size: 10px;
  outline: none;
  /* border-color: #ff8200; */
  border-color: #25ac6c;
  color: #ffffff;
  font-weight: 500;
}

.music_icon {
  fill: #25ac6c;
  position: fixed;
  z-index: 9;
  right: 0;
  top: 0;
  padding: 20px;
  width: 30px;
  height: 30px;
}

.playing {
  animation: rotate 3s infinite linear;
}

.music_icon::after {
  /* content:'';
  display: block;
  position: absolute;
  z-index: 2;
  width: 40px;
  height: 2px;
  left: 15px;
  background: #333;
  bottom: 50%; */
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.video {
  position: fixed;
  z-index: -10;
  visibility: hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
.section {
  display: flex;
  flex-direction: column;
  background-size: 100% 100%;
  /* background-size: cover; */
  position: relative;
  flex: 1;
}
h3 {
  font-size: 20px;
  color: #333;
}
h4 {
  font-size: 16px;
  color: #000;
}
h5 {
  font-size: 16px;
  color: #333;
  font-weight: normal;
}

.p1 {
  background-image: url("./assets/p1.jpeg");
}
.p1_5 {
  background-image: url("./assets/p2.jpeg");
}
.p3 {
  background-image: url("./assets/p3.jpeg");
}
.p4_1 {
  background-image: url("./assets/p4.jpeg");
}

.p2 {
  background-image: url("./assets/p5.jpeg");
}

.p6_1 {
  background-image: url("./assets/p6.jpeg");
}

.p4 {
  background-image: url("./assets/p7.jpeg");
}

.p4_2 {
  background-image: url("./assets/p8.jpeg");
}

.p5 {
  background-image: url("./assets/p9.jpeg");
}
.p6 {
  background-image: url("./assets/p10.jpeg");
}

.p11_1 {
  background-image: url("./assets/p11.jpeg");
}

.p7 {
  background-image: url("./assets/p12.jpeg");
}
.p8 {
  background-image: url("./assets/p13.jpeg");
}
.p9 {
  background-image: url("./assets/p14.jpeg");
}
.p10 {
  background-image: url("./assets/p15.jpeg");
}

/* .p15_1 {
  background-image: url("./assets/p15_1.jpg");
} */

.p1 .title {
  margin-top: 20px;
  text-align: right;
  color: #666;
}
.chart_ref {
  height: 200px;
}

.open {
  margin: 20px 0;
}

.content {
  width: 270px;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 8px;
  color: #333;
  padding: 40px 20px;
  font-size: 16px;
  line-height: 1.5;
  text-align: left;
}

.main {
  background: rgba(255, 255, 255, 0.5);
  text-align: center;
}

.content b {
  /* font-size: 24px; */
  /* color: #ff8200; */
  font-weight: normal;
  color: #25ac6c;
  line-height: 1.5;
}

.content .bold {
  /* font-size: 24px; */
  /* color: #ff8200; */
  font-weight: 600;
  color: #25ac6c;
}

.theme {
  color: #25ac6c;
}
/* test */
/* .p8 .content b,
.p9 .content b,
.p10 .content b {
  color: #ff8200;
} */

.p1_5 .content > div:first-child {
  text-align: left;
}
.p1_5 .line2 {
  margin-top: 20px;
  /* text-align: right; */
}

.desc {
  margin-top: 40px;
  color: #666;
  font-size: 12px;
  text-align: right;
}

.p2 h4 {
  color: #000;
}

.p2 h4 > b {
  font-size: 24px;
}

.p2 .content > div {
  text-align: left;
  padding-bottom: 30px;
  font-size: 16px;
  line-height: 1.75;
}

.fp-tableCell {
  padding: 0 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.loading.dv-loading .loading-tip {
  margin-top: 20px;
  font-size: 16px;
}
.logo {
  position: absolute;
  top: 0;
  left: 0;
  padding: 20px;
  width: 200px;
}
.p4 .dv-charts-container {
  height: 300px;
  /* padding-top: 100px; */
}
.p4_1 .content {
  color: #222;
}
.p4_1 .content p:last-child {
  margin-top: 12px;
  text-align: right;
}
.p4_2 .content p:last-child {
  margin-top: 12px;
  text-align: right;
}
.p6_1 .content p:last-child {
  margin-top: 12px;
  text-align: right;
}

.p6 .content {
  background: rgba(255, 255, 255, 0.9);
  padding: 0;
  width: 95%;
}

.p6 h4,
.p6 .desc {
  padding: 40px 10px;
  margin: 0;
}
.p6 .dv-charts-container {
  height: 300px;
}

.p8 .content {
  text-align: center;
}

.p10 .content {
  font-weight: 500;
}
.login_modal .vm--modal {
  background: #fff;
  overflow: hidden;
  width: 656px;
  height: 400px;
  border-radius: 2px;
  box-shadow: 0 0 40px #000;
  color: #8b8c8d;
  font-size: 0;
}
</style>
