<template>
  <div class="context_Two">

    <div id="header" class="min1140  pos-r">
      <div class="nav">
        <ul class="wrap mar-a  f-siz16 ">
          <li class="link1 minibox fl-l">
            <a  @click="goAnchor('#boxone')">旅游路线</a>
          </li>
          <li class="link2 minibox  fl-l">
            <a @click="goAnchor('#boxtwo')">酒店住宿</a>
          </li>
          <li class="icon minibox fl-l"></li>
          <li class="link3 minibox fl-l">
            <a @click="goAnchor('#boxthree')">美食推荐</a>
          </li>
          <li class="link4 minibox fl-l">
            <a @click="goAnchor('#boxfour')">景点推荐</a>
            <img style="position:relative; left: 190px; top: -50px;" @click="gologin()" src="../../assets/images/login.png" alt="">
          </li>
        </ul>
      </div>
      <div class="banner ">
        <ul>
          <li>
            <img src="../../assets/images/banner.png" width="100%" heigth="100%" alt="">
          </li>
          <li>
            <img src="../../assets/images/banner.png" width="100%" heigth="100%" alt="">
          </li>
          <li>
            <img src="../../assets/images/banner.png" width="100%" heigth="100%" alt="">
          </li>
        </ul>
        <p class="intro pos-a">ENJOY FREE REAVEL</p>
      </div>
    </div>

    <div id="boxone">
      <div class="myIMG">
        <div class="myIMG2">
          <img src="../../assets/images/title01.png" alt="">
        </div>
        <div class="myIMG3">
          <img src="../../assets/images/interval.png" alt="">
        </div>
      </div>
      <!-- 旅游景点组件 -->
      <FrontTravel class="jindian"></FrontTravel>
    </div>

    <div id="boxtwo">
      <div class="myIMG">
        <div class="myIMG2">
          <img src="../../assets/images/title02.png" alt="">
        </div>
        <div class="myIMG3">
          <img src="../../assets/images/interval.png" alt="">
        </div>
      </div>
      <div class="myIMG4" >
        <!-- style="width: 90%;height: 100%; margin-left: 5%; margin-top: -60px;" -->
        <FrontHotel class="contain_new"></FrontHotel>
      </div>
    </div>


    <div id="boxthree">
      <div class="myIMG">
        <div class="myIMG2">
          <img src="../../assets/images/title03.png" alt="">
        </div>
        <div class="myIMG3">
          <img src="../../assets/images/interval.png" alt="">
        </div>
      </div>

      <div id="myIMG5">
        <!-- <FrontHotel class="contain_new"></FrontHotel> -->
        <FrontFood></FrontFood>
      </div>
    </div>


    <div id="boxfour">
      <div class="myIMG">
        <div class="myIMG2">
          <img src="../../assets/images/title01.png" alt="">
        </div>
        <div class="myIMG3">
          <img src="../../assets/images/interval.png" alt="">
        </div>
      </div>

      <div class="myIMG6">
        <!-- <FrontHotel class="contain_new"></FrontHotel> -->
        <FrontScenic class="jindian"></FrontScenic>
      </div>
    </div>


    <!--    	<div class="dv3 mar-a ">
    		<div class="header pos-r ">
    			<div class="title pos-a ">
    			</div>
    		</div>
    		<div class="interval pos-r  ">
    			<img class="pos-a" src="../../assets/images/interval.png" alt="" width="78px" height="10px">
    		</div>
    		<div class="contain ">
    			<div class="div div-f fl-l  mar-r20">
    				<div class="top">
    					<a href="#">
    						<img src="../../assets/images/dv3-contain01.jpg" width="100px" height="100px" alt="">
    					</a>
    				</div>
    				<div class="bottom ">
    					<a class="title f-size26" href="">Tailor-Made Packages</a>
    					<a class="contain" href="#">When it comes to delivering the best planned holiday package to you, we strive to exceed your expectations. For us, it has to be spot-on. We do what we do in the ideal way possible.</a>
    				</div>
    			</div>
    			<div class="div div-c fl-l  mar-r20">
    				<div class="top">
    					<a href="#">
    						<img src="../../assets/images/dv3-contain01.jpg" width="100px" height="100px" alt="">
    					</a>
    				</div>
    				<div class="bottom ">
    					<a class="title f-size26" href="">Best Experience</a>
    					<a class="contain" href="#">At Purplerain Holidays, we choose to put forth an essence of our own expertise and firsthand experiences into our services and method of planning.</a>
    				</div>
    			</div>
    			<div class="div div-r fl-l ">
    				<div class="top">
    					<a href="#">
    						<img src="../../assets/images/dv3-contain01.jpg" width="100px" height="100px" alt="">
    					</a>
    				</div>
    				<div class="bottom ">
    					<a class="title f-size26" href="">Exquisite Service</a>
    					<a class="contain" href="#">From the moment you make the first call to enquire, our services are geared up. From the time booking, to your stay and well after the trip as well, we will guide you and be at your back and.</a>
    				</div>
    			</div>
    		</div>
    	</div> -->



    <!--    	<div class="footer pos-r ">
    		<div class="admin pad-t30 pos-a">
    			<form action="">
    				<ul class="list">
    					<li class="header f-size30">Send us a message</li>
    					<li class="name f-size20">
    						<input type="text" placeholder="Your Name">
    					</li>
    					<li class="email f-size20">
    						<input type="text" placeholder="Email">
    					</li>
    					<li class="message f-size20">
    						<input type="text" placeholder="Your Message">
    					</li>
    				</ul>
    				<input class="submit f-size18 pos-a" type="submit" value="SEND"/>
    			</form>
    		</div>
    	</div> -->



  </div>

</template>


<script>
  import FrontTravel from "@/components/pages/front/travel/FrontTravel.vue";
  import FrontHotel from "@/components/pages/front/hotel/FrontHotel.vue";
  import FrontFood from "@/components/pages/front/food/FrontFood.vue";
  import FrontScenic from "@/components/pages/front/scenic/FrontScenic.vue";

  export default {
    components: {
      FrontTravel,
      FrontHotel,
      FrontFood,
      FrontScenic
    },
    methods: {
      gologin(){
        this.$router.push({
        	path: '/loginNew',
        })
      },
      goAnchor(id) {
            var anchor = document.getElementById(id);
            // chrome
            document.body.scrollTop = anchor.offsetTop;
            // firefox
            document.documentElement.scrollTop = anchor.offsetTop;
            // safari
            window.pageYOffset = anchor.offsetTop;
          },

           //模拟锚点跳转
                    goAnchor(selector) {//参数selector是id选择器（#anchor14）
                           document.querySelector(selector).scrollIntoView({
                               behavior: "smooth"
                           });
                       },

    },
    mounted() {


    }
  }
</script>

<style scoped>
  @import url("../../assets/style/base.css");
  @import url("../../assets/style/index.css");

  * {
    margin: 0px;
    padding: 0px;
  }

  #header .nav .wrap .link1 a[data-v-afb2b1dc] {
    width: 65px;
    height: 100%;
    display: block;
    font-weight: 700;
    line-height: 70px;
    text-align: center;
  }

  .myIMG {
    width: 100%;
    margin-top: 50px;
    margin-bottom: 30px;
  }
  .myIMG4{
    width: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .myIMG2 {
    width: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .myIMG3 {
    padding-top: 10px;
    width: 300px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .jindian {
    padding: 10px;
    padding-left: 25px;
    height: 600px;
  }

  #boxtwo {
    margin-top: -250px;
  }

  .contain_new {
    margin: 0 auto;
    width: 100%;
    height: 1000px;
    margin-left: 65px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ;

  }

  #boxthree {
    margin-top: -100px;
  }

  .myIMG6 {
    margin-top: 80px;
  }
</style>
