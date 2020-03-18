<template>
  <div class="map">
    <div class="total">
      <h1>{{allData.times}}</h1>
      <h3>全国疫情</h3>
      <div class="list">
        <div class="confirm">
          <div class="tip">确诊</div>
          <div class="num">{{allData.gntotal}}</div>
          <div class="yesterday" v-if="allData.add_daily">
            较昨日
            <span class="ye-num">+{{allData.add_daily.addcon}}</span>
          </div>
        </div>
        <div class="sus">
          <div class="tip">疑似</div>
          <div class="num">{{allData.sustotal}}</div>
          <div class="yesterday" v-if="allData.add_daily">
            较昨日
            <span class="ye-num">+{{allData.add_daily.wjw_addsus}}</span>
          </div>
        </div>
        <div class="deal">
          <div class="tip">死亡</div>
          <div class="num">{{allData.deathtotal}}</div>
          <div class="yesterday" v-if="allData.add_daily">
            较昨日
            <span class="ye-num">+{{allData.add_daily.adddeath}}</span>
          </div>
        </div>
        <div class="cure">
          <div class="tip">治愈</div>
          <div class="num">{{allData.curetotal}}</div>
          <div class="yesterday" v-if="allData.add_daily">
            较昨日
            <span class="ye-num">+{{allData.add_daily.addcure}}</span>
          </div>
        </div>
      </div>
    </div>
    <div ref="mapBox" style="height:600px;margin: 0 auto;padding:0 1.6rem"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import "echarts/map/js/china";
import jsonp from "jsonp";
import axios from "axios";
const option = {
  title: {
    text: "新型冠状病毒分布图",
    align: "center"
  },
  series: [
    {
      name: "确诊人数",
      type: "map",
      map: "china", //渲染中国地图
      label: {
        //控制对应地区的汉字
        show: true,
        color: "#333333",
        fontSize: 10
      },
      zoom: 1.2, //控制地图的放大和缩小
      itemStyle: {
        //控制地图板块的颜色和边框
        areaColor: "#ffffff"
        //borderColor:"blue" //地图边框颜色
      },
      emphasis: {
        //控制鼠标滑过之后的背景色和字体颜色
        label: {
          color: "#000000",
          fontSize: 12
        },
        itemStyle: {
          areaColor: "#c7fefd"
        }
      },
      data: [] //用来展示后台给的数据
    }
  ],
  visualMap: [
    {
      type: "piecewise",
      show: true,
      pieces: [
        //分段
        { min: 1000 },
        { min: 1000, max: 9999 },
        { min: 100, max: 999 },
        { min: 10, max: 99 },
        { min: 1, max: 9 }
      ],
      //showLabel:false, // 控制分段的字的显示
      inRange: {
        color: ["#ffaa85", "#660408"]
      }
    }
  ],
  tooltip: {
    trugger: "item",
    formatter: function(params) {
      // console.log(params)
      return params.data
        ? `
               ${params.data.name}<br/>
              确诊病例:${params.data.value}<br/>
              治愈病例:${params.data.cureNum}<br/>
              死亡病例:${params.data.deathNum}<br/>
                        `
        : "";
    }
  }
};
export default {
  name: "Map",
  data() {
    return {
      allData: {}
    };
  },
  mounted() {
    this.getData(); //为什么不在created的钩子函数执行，
    this.myChart = echarts.init(this.$refs.mapBox);
    this.myChart.setOption(option, (window.onresize = this.myChart.resize));
  },
  methods: {
    getData() {
      jsonp(
        "https://interface.sina.cn/news/wap/fymap2020_data.d.json?_=1580892522427",
        {},
        (err, data) => {
          console.log(data);
          this.allData = data.data
          if (!err) {
            let list = data.data.list.map(item => ({
              name: item.name, //省份名称
              value: item.value, //确诊数量
              cureNum: item.cureNum, //疑似数量
              deathNum: item.deathNum //死亡数量
            }));
            option.series[0].data = list;
            this.myChart.setOption(option);
          }
        }
      );
      // axios({
      //   url: "https://tianqiapi.com/api",
      //   params: {
      //     appid: "81661511",
      //     appsecret: "0oTDWd9T",
      //     version: "epidemic",
      //     vue: 1
      //   }
      // }).then(res => {
      //   this.allData = res.data.data;
      //   let list = res.data.data.area.map(item => {
      //     return {
      //       name: item.provinceName, //省份名称
      //       value: item.confirmedCount, //确诊数量
      //       cureNum: item.curedCount, //治愈数量
      //       deathNum: item.deadCount //死亡数量
      //     };
      //   }, []);
      //   option.series[0].data = list;
      //   this.myChart.setOption(option, (window.onresize = this.myChart.resize));
      // });
    }
  }
};
</script>

<style>
.map {
  margin-top: 2rem;
}
.total {
  margin-bottom: 2rem;
  padding: 0 1.6rem;
  text-align: center;
}
.total h1 {
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}
.total h3 {
  font-size: 1.8rem;
  font-weight: 500;
}
.list {
  display: flex;
  justify-content: space-between;
  text-align: center;
  margin-top: 2rem;
  padding-bottom: 2rem;
  border-bottom: 0.1rem solid #ccc;
}
.list .num,
.list .yesterday {
  margin-top: 0.7rem;
}

.confirm .tip {
  font-size: 1.4rem;
}
.confirm .num {
  font-size: 2.2rem;
  font-weight: 500;
}
.confirm .yesterday {
  font-size: 1.2rem;
}
.confirm .yesterday .ye-num {
  color: rgb(174, 33, 44);
}
.confirm .tip,
.confirm .num {
  color: rgb(174, 33, 44);
}

.sus .tip {
  font-size: 1.4rem;
}
.sus .num {
  font-size: 2.2rem;
  font-weight: 500;
}
.sus .yesterday {
  font-size: 1.2rem;
}
.sus .yesterday .ye-num {
  color: rgb(247, 130, 7);
}
.sus .tip,
.sus .num {
  color: rgb(247, 130, 7);
}

.deal .tip {
  font-size: 1.4rem;
}
.deal .num {
  font-size: 2.2rem;
  font-weight: 500;
}
.deal .yesterday {
  font-size: 1.2rem;
}
.deal .yesterday .ye-num {
  color: rgb(93, 112, 146);
}
.deal .tip,
.deal .num {
  color: rgb(93, 112, 146);
}

.cure .tip {
  font-size: 1.4rem;
}
.cure .num {
  font-size: 2.2rem;
  font-weight: 500;
}
.cure .yesterday {
  font-size: 1.2rem;
}
.cure .yesterday .ye-num {
  color: rgb(40, 183, 163);
}
.cure .tip,
.cure .num {
  color: rgb(40, 183, 163);
}
</style>