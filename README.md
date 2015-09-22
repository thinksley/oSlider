# oSlider
移动图片swiper插件

# 先引入oslider.min.js 和oslider.min.css

      html结构如下：(如果没标题) 可把标题的p标签去掉
      
      <section id="swiper" class="swiper">
          <ul class="swiperList">
              <li><a href=""><img src="src/img/1.jpg" /><p>这是第一个的标题</p></a></li>
              <li><a href=""><img src="src/img/2.jpg" /><p>这是第2个的标题</p></a></li>
              <li><a href=""><img src="src/img/3.jpg" /><p>这是第3个的标题</p></a></li>
          </ul>
      </section> 
      
#js代码配置
      实例化
      var o=new Oslider({
                wrapper:'swiper',
                isAutoPlay:false
            });
            
#相关参数说明：
      wrapper           ------  最外围容器id名'
      isAutoPlay        ------  true/false  是否自动播放(默认自动播放)
      autoPlayTimeGap   ------  自动播放时间间隔（默认3000毫秒）

<a href="http://thinksley.github.io/oSlider/index.html" target="_blank">戳这预览(请适配手机端)</a>

      
