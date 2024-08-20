Page({

  data: {
    region:['山东省','青岛市','黄岛区'],
    id: 101220301,
    now: {
      temp: 0,//温度
      text:'未知',//内容
      icon:'999',//天气代码
      humidity: 0,//湿度
      pressure: 0,
      vis: 0,
      windDir: 0,
      windScale: 0,
      windSpeed: 0
    }
  },

  regionChange: function(e) {
    this.setData({region: e.detail.value})
    this.getId(this.data.region[1])
  },

  getId: function(city) {
    city = city.slice(0, -1)
    let that = this

    wx.request({
      url: 'https://geoapi.qweather.com/v2/city/lookup',
      data: {
        location: city,
        key: "0b82b9a90aab4810beaf27fcfe57a1cc"
      },
      success: function(res) {
        that.setData({id: res.data.location[0].id})
        that.getWeather()
      }
    })
  },

  getWeather: function() {
    console.log(this.data.id)

    let that = this
    wx.request({
      url: 'https://devapi.qweather.com/v7/weather/now',
      data: {
        location: that.data.id,
        key: "0b82b9a90aab4810beaf27fcfe57a1cc"
      },
      success: function(res) {
        console.log(res.data)
        that.setData({now: res.data.now})
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getId(this.data.region[1])
  },


  
})
