<script setup>
const { $gsap } = useNuxtApp()

onMounted(()=>{
  // horizontal scroll
  if(process.client){
    const horizontal = document.querySelector(".horizontal");
    const horizontalInner = document.querySelector(".horizontal .inner");

    $gsap.to(horizontalInner, {
    ease: "none",
    x: () => -(horizontalInner.scrollWidth - window.innerWidth*2 + window.outerWidth),
    scrollTrigger: {
      trigger: horizontal,
      pin: horizontalInner,
      start: "top top",
      end: () => "+=" + (horizontalInner.scrollWidth + window.innerWidth),
      scrub: true,
      invalidateOnRefresh: true
    }
  });

  // scroll to top
  const scrollToTopBtn = document.querySelector("#scrollToTopBtn");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollToTopBtn.style.display = "flex";
    } else {
      scrollToTopBtn.style.display = "none";
    }
  });

  }
})

const scrollToTop =() => {
  window.scrollTo({top: 0,behavior: 'smooth'})
}

</script>

<template>
  <div class="select-none relative">
    <div id="intro" class="h-[100vh]  text-white relative">
      <Swiper
        :modules="[SwiperAutoplay]"
        :loop="true"
        :speed="1000"
        :autoplay="{
          delay: 5000,
        }"
        class=" h-full"
      >
        <SwiperSlide id="slide1"></SwiperSlide>
        <SwiperSlide id="slide2"></SwiperSlide>
        <SwiperSlide id="slide3"></SwiperSlide>
        <SwiperSlide id="slide4"></SwiperSlide>
      </Swiper>
      <div class="absolute inset-0 z-10 p-3">
        <div class="container mx-auto">
          <h1 class="font-black text-5xl sm:text-6xl md:text-8xl my-20">
            拯救
            <br />
            最後一口呼吸
          </h1>
          <p class="text-xl mb-4">
            氣候暖化導致地球升溫， <br />
            異常高溫及乾旱引發森林大火。
          </p>
          <p class="text-xl">
            森林內的生物面臨生存危機， <br />
            僅剩最後一口呼吸…
          </p>      
        </div>
      </div>
    </div>

    <img src="/images/esg-bg.png" alt="" class="w-full bg-black mb-10 ">

    <!-- 水平滾動 -->
    <div ref="horizontal" class="horizontal" @wheel="preventScroll">
      <div ref="horizontalInner" class="inner">
        <section id="section1" class="px-3 bg-contain  bg-bottom ">
          <div class="container mx-auto flex flex-col justify-evenly">
            <div class="mb-8 sm:w-8/12 lg:w-6/12 xl:w-4/12">
              <h3 class="font-bold text-2xl sm:text-3xl mb-8 ps-4 text-lime-800 border-s-4 border-lime-700">
                什麼是野火?
              </h3>
              <p class="text-lg md:text-2xl">
                森林或鄉村地區因高溫乾燥的氣候，遇上雷擊或人為用火不當等情形，便會引發大規模失控的火災。近年全球因氣候暖化而頻繁且廣泛地發生野火，嚴重影響生態及人類的安危。
              </p>
            </div>
            <div class="w-full sm:w-8/12 md:w-9/12 2xl:w-8/12 ms-auto relative md:translate-x-8 xl:translate-x-12 2xl:translate-x-18 ">
              <h3 class="font-bold text-2xl sm:text-3xl mb-8 md:mb-0 ps-4 text-lime-800 border-s-4 border-lime-700">近年野火發生地區</h3>
              <div class="flex justify-evenly mb-10 items-stretch md:block relative">
                <ul class="flex flex-col justify-between md:hidden md:w-full md:grid md:grid-cols-5 text-white text-md sm:text-2xl  font-bold">
                  <li class="mb-2"><p class="Bricolage">2019</p></li>
                  <li class="mb-2"><p class="Bricolage">2020</p></li>
                  <li class="mb-2"><p class="Bricolage">2021</p></li>
                  <li class="mb-2"><p class="Bricolage">2022</p></li>
                  <li class=""><p class="Bricolage">2023</p></li>
                </ul> 
                <ul class="md:w-full md:grid md:grid-cols-5 md:items-center flex md:block flex-col justify-between   sm:text-lg md:text-2xl xl:text-3xl  md:translate-y-10">
                  <li class="block relative">
                    <!-- <p class="Bricolage md:hidden">2019</p> -->
                    <ul class="flex md:block text-center ">
                      <li class="block md:mb-4">
                        <p class="mr-2">印尼</p>
                      </li>
                      <li class="block md:mb-4">
                        <p class="mr-2">亞馬遜</p>
                      </li>
                      <li class="block md:mb-4">
                        <p class="mr-2">剛果</p>
                      </li>
                      <li class="block md:mb-4">
                        <p class="mr-2">澳洲</p>
                      </li>
                      <li class="block md:mb-4">
                        <p class="mr-2">南韓</p>
                      </li>
                    </ul>
                  </li>
                  <li class="block relative">
                    <!-- <p class="Bricolage md:hidden">2020</p> -->
                    <ul class="flex md:block text-center ">
                      <li class="block md:mb-4">
                        <p class=" mr-2">加州</p>
                      </li>
                      <li class="block md:mb-4">
                        <p class=" mr-2">澳洲</p>
                      </li>
                      <li class="block md:mb-4">
                        <p class=" mr-2">泰國</p>
                      </li>
                      <li class="block md:mb-4">
                        <p class=" mr-2">烏克蘭</p>
                      </li>
                    </ul>
                  </li>
                  <li class="block relative">
                    <!-- <p class="Bricolage md:hidden">2021</p> -->
                    <ul class="flex md:block text-center ">
                      <li class="block md:mb-4">
                        <p class="mr-1 sm:mr-2">俄羅斯</p>
                      </li>
                      <li class="block md:mb-4">
                        <p class="mr-1 sm:mr-2">希臘</p>
                      </li>
                      <li class="block md:mb-4">
                        <p class="mr-1 sm:mr-2">土耳其</p>
                      </li>
                      <li class="block md:mb-4">
                        <p class="mr-1 sm:mr-2">芬蘭</p>
                      </li>
                      <li class="block md:mb-4">
                        <p class=" ">加州</p>
                      </li>
                    </ul>
                  </li>
                  <li class="block relative">
                    <!-- <p class="Bricolage md:hidden">2022</p> -->
                    <ul class="flex md:block text-center ">
                      <li class="block md:mb-4">
                        <p class=" mr-2">西班牙</p>
                      </li>
                      <li class="block md:mb-4">
                        <p class=" mr-2">阿根廷</p>
                      </li>
                      <li class="block md:mb-4">
                        <p class=" mr-2">南韓</p>
                      </li>
                      <li class="block md:mb-4">
                        <p class=" mr-2">亞馬遜</p>
                      </li>
                    </ul>
                  </li>
                  <li class="block relative">
                    <!-- <p class="Bricolage md:hidden">2023</p> -->
                    <ul class="flex md:block text-center ">
                      <li class="block md:mb-4">
                        <p class=" mr-2">智利</p>
                      </li>
                      <li class="block md:mb-4">
                        <p class=" mr-2">加拿大</p>
                      </li>
                      <li class="block md:mb-4">
                        <p class=" mr-2">夏威夷</p>
                      </li>
                    </ul>
                  </li>
                </ul>  
                <ul class="hidden md:w-full md:grid md:grid-cols-5 text-white text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold">
                  <li><p class="Bricolage" >2019</p></li>
                  <li><p class="Bricolage" >2020</p></li>
                  <li><p class="Bricolage" >2021</p></li>
                  <li><p class="Bricolage" >2022</p></li>
                  <li><p class="Bricolage" >2023</p></li>
                </ul>     
              </div>
            </div>
          </div>
        </section>
        <section id="section2" class="px-3 bg-cover">
          <div class="container mx-auto flex flex-col justify-evenly">
            <div class="sm:w-8/12 md:w-8/12 lg:w-6/12 xl:w-4/12 xl:translate-x-1/4">
              <h3 class="font-bold text-2xl sm:text-3xl mb-8 ps-4 text-lime-800 border-s-4 border-lime-700">對我們有什麼影響?</h3>
              <h4 class="font-bold text-lg md:text-2xl ">野火對於環境及人類都造成巨大衝擊</h4>
              <p class="text-lg md:text-2xl">      
                燃燒產生的有毒氣體會隨著氣流傳播到世界各地，汙染空氣及水源，PM2.5微粒子能輕易進入肺部及血液，促發各種疾病，嚴重威脅人類的健康，並造成巨大經濟損失。
              </p>
            </div>
            <div class="ms-auto sm:w-8/12 md:w-8/12 lg:w-6/12 xl:w-4/12 xl:-translate-x-1/4">
              <h3 class="font-bold text-2xl sm:text-3xl mb-8 ps-4 text-lime-800 border-s-4 border-lime-700">如何防止野火?</h3>
              <h4 class="font-bold text-lg md:text-2xl">減緩氣候暖化是防止野火的重要關鍵</h4>
              <p class="text-lg md:text-2xl">
                透過積極推廣節能減碳、植樹造林等方式，台灣房屋迄今植栽養護超過35,000棵樹，守護森林、守護台灣環境、也守護人們的健康安全。
              </p> 
            </div>
          </div>
        </section>
      </div>
    </div>


    <!-- 任務說明 -->
    <div class="pt-10">
      <div id="game-intro" class="relative mt-10 pt-10 pb-10 px-3 bg-lime-200 bg-no-repeat">
        <div class="container mx-auto p-4 bg-[#FFFA] sm:bg-transparent">
          <div class="text-orange-500 text-3xl font-bold sm:w-1/2 lg:w-1/3 mb-2 sm:mb-4 mx-auto ">台灣房屋</div>
          <h3 class="font-bold text-4xl lg:text-6xl sm:w-1/2 lg:w-1/3 mx-auto mb-4 sm:mb-8">
            <span>
              森林保衛戰
            </span>
            <br>
            <span>
              救援任務
            </span>
          </h3>
          <p class="text-xl sm:w-1/2 lg:w-1/3 mx-auto">台灣房屋邀請您參與森林保衛戰救援任務，透過遊戲獲得更多<span class="font-bold">節能減碳、植樹造林</span>知識，並有機會獲得<span class="font-bold">環保好禮</span>！</p>  
        </div>
      </div>

      <div class="py-20" >
        <div class="container mx-auto px-3">
          <h2 class="h2 text-center bg-no-repeat bg-center px-5 md:px-10 text-orange-800 text-[28px] md:text-4xl tracking-[2px] md:tracking-[4px] leading-[50px] md:leading-[60px] font-bold mb-12">
            任務說明
          </h2>
          <ul class="grid lg:grid-cols-3 gap-4">
            <li class="relative rounded-[24px] bg-lime-100 shadow-md p-8 w-full sm:w-2/3 md:w-1/2 lg:w-full mx-auto bezier duration-300 hover:scale-[102%] hover:shadow-xl hover:rotate-2">
              <div class="absolute top-2 left-4 text-6xl lg:text-7xl text-lime-700 Bricolage">1</div>
              <img src="/images/firefighter-start.png" alt="" class="h-24 mx-auto">
              <h3 class="text-2xl font-bold my-4 border-l-4 border-lime-700 px-2">參與救援任務</h3>
              <!-- <h3 class="text-2xl font-bold my-4 border-l-4 border-lime-700 px-2">登入參與救援任務</h3> -->
              <p class="text-lg">參加救援任務，學習ESG小知識。</p>
              <!-- <p class="text-lg">登入台灣房屋的會員之後，參加救援任務。</p> -->
            </li>
            <li class="relative rounded-[24px] bg-lime-100 shadow-md p-8 w-full sm:w-2/3 md:w-1/2 lg:w-full mx-auto bezier duration-300 hover:scale-[102%] hover:shadow-xl hover:rotate-2">
              <div class="absolute top-2 left-4 text-6xl lg:text-7xl text-lime-700 Bricolage">2</div>
              <div class="flex h-24 justify-center items-center">
                <img src="/images/hose.png" alt="" class="h-2/3 -rotate-12 translate-x-1/4 -translate-y-2">
                <img src="/images/med.png" alt="" class="h-2/3 rotate-6 -translate-x-1/4 translate-y-2">
              </div>
              <h3 class="text-2xl font-bold my-4 border-l-4 border-lime-700 px-2">滅火、救援</h3>
              <p class="text-lg">在任務中選擇以水柱撲滅火苗或使用急救箱救援動物。</p>
            </li>
            <li class="relative rounded-[24px] bg-lime-100 shadow-md p-8 w-full sm:w-2/3 md:w-1/2 lg:w-full mx-auto bezier duration-300 hover:scale-[102%] hover:shadow-xl hover:rotate-2">
              <div class="absolute top-2 left-4 text-6xl lg:text-7xl text-lime-700 Bricolage">3</div>
              <img src="/images/animals/1.png" alt="" class="h-24 mx-auto">
              <h3 class="text-2xl font-bold my-4 border-l-4 border-lime-700 px-2">圖鑑換好禮</h3>
              <p class="text-lg">集齊森林中的8種動物，達成抽好禮資格。
                </p>
            </li>
          </ul>
        </div>
      </div>

      <!-- 好禮 -->
      <div class="py-20 bg-lime-900" >
        <div class="container mx-auto px-3">
          <h2 class="h2 text-center bg-no-repeat bg-center px-5 md:px-10 text-[28px] md:text-4xl tracking-[2px] md:tracking-[4px] leading-[50px] md:leading-[60px] font-bold mb-12 text-lime-50">
            環保好禮
          </h2>
            <ul class="flex flex-col lg:flex-row justify-evenly items-center text-white">
              <li id="prize1" class="sm:flex justfy-center items-center lg:block mb-8 sm:mb-0">
                <div class="w-48 h-48 sm:w-64 sm:h-64 bg-white rounded-[50%] shadow-inner-lg ">
                  <img src="/images/prize1.png" alt="" id="prize1-photo" class="duration-300 bezier">
                </div>
                <div class="h-24 sm:w-64  flex justfy-center items-center">
                  <div class="mx-auto text-center">
                    <p class="text-2xl font-bold">環保購物袋</p>
                    <p class="inline-block text-sm bg-orange-500 px-2 rounded-full">共30名</p>
                  </div>
                </div>
              </li>

              <li id="prize2" class="flex flex-col sm:flex-row lg:flex-col flex-col-reverse flex-col-reverse justfy-center items-center">
                <div class=" h-24 sm:w-64  flex justfy-center items-center">
                  <div class="mx-auto text-center">
                    <p class="text-2xl font-bold ">環保餐具組</p>
                    <p class="inline-block text-sm bg-orange-500 px-2 rounded-full">共10名</p>                  
                  </div>
                </div>
                <div class="w-48 h-48 sm:w-64 sm:h-64 bg-white rounded-[50%] shadow-inner-lg flex justify-center items-center">
                  <img src="/images/prize2.png"  alt="" id="prize2-photo" class="relative h-full bezier duration-300">
                </div>
              </li>
            </ul>
        </div>
      </div>
    </div>

    <!-- 遊戲 -->
    <GameComponent />

    <!-- 活動辦法 -->
    <div class="py-20 px-3 bg-bottom bg-no-repeat" style="background-image: url('/images/forest.png');">
      <div class="container mx-auto text-lg">
        <h2 class="h2 text-center bg-no-repeat bg-center px-5 md:px-10 text-orange-800 text-[28px] md:text-4xl tracking-[2px] md:tracking-[4px] leading-[50px] md:leading-[60px] font-bold mb-4">
          活動辦法
        </h2>
        <div class="border-lime-600 border-2 rounded p-4 md:p-8 bg-[#FFFD]">
          <h3 class="flex text-xl font-bold mb-2">
            <img src="/images/sprout.png" alt="" class="object-contain h-6 mr-2">
            <span class="text-orange-600">活動期間：</span>
          </h3>
          <p class=" pl-8">2023/09/01 ~ 2023/12/31</p>
          <h3 class="flex text-xl font-bold mt-4 mb-2">
            <img src="/images/sprout.png" alt="" class="object-contain h-6 mr-2">
            <span class="text-orange-600">遊戲規則：</span>
          </h3>
          <ol class="list-decimal pl-8">
            <li class="mb-1">參加野火救援任務。</li>
            <!-- <li class="mb-1">先登入或加入台灣房屋會員，參加野火救援任務。</li> -->
            <li class="mb-1">在救援任務中選擇以水柱撲滅火苗或使用急救箱救援動物。</li>
            <li class="mb-1">在救援過程中，會有關於森林大火、節能減碳、植樹綠化等各種小知識喔！</li>
            <li class="mb-1">救援成功的動物將錄入動物圖鑑，集滿圖鑑中的動物即有機會獲得精美禮物一份。</li>
            <li class="mb-1">遊戲活動時間為15天，精美禮物數量有限，送完為止！趕快來完成任務吧！</li>
          </ol>

          <h3 class="flex text-xl font-bold mt-4 mb-2">
            <img src="/images/sprout.png" alt="" class="object-contain h-6 mr-2">
            <span class="text-orange-600">獎品領取辦法及活動注意事項：</span>
          </h3>
          <ol class="list-decimal pl-8">
            <li class="mb-1">得獎通知：得獎者會在完成任務時，看到遊戲畫面中顯示表單，填寫完表單之後，即可參加抽獎。</li>
            <li class="mb-1">獎品將於活動結束後進行抽獎，30天內郵寄給得獎人，但寄送途中如發生損壞或意外，導致得獎人權益損失，主辦單位不負責賠償責任，如有不便請見諒。</li>
            <li class="mb-1">得獎者填寫之資料應屬真實、正確且未冒用或盜用他人資料，如有不實或不正確資訊導致主辦單位無法聯絡中獎者，則視同放棄中獎資格，主辦單位無需負任何責任；倘若有損害主辦單位或其他任何第三人之行為，兌換者尚應就此負一切民、刑事責任。</li>
            <li class="mb-1">主辦單位保留修改活動與獎品細節的權利，無須事前通知，並有權對本活動所 有事宜作出解釋或裁決。如本活動因不可抗力之特殊原因無法執行時，主辦單位有權決定取消、終止、修改或暫停本活動。</li>
            <li class="mb-1">圖片僅供參考，獎品以實物為準。本活動之所有獎品不得轉換、轉讓或折換現金。獎品以公佈於本網站上的資料為準，如遇不可抗力之因素，主辦單位保留更換其他等值獎品之權利。</li>
            <li class="mb-1">凡參加此次活動即視同認可本活動之各項規定，未盡事宜主辦單位保留內容解釋及修改之權利，如有任何爭議主辦單位保留最後決定權。</li>
            <li class="mb-1">其他未盡事宜，悉依中華民國法律相關規定辦理之。</li>
          </ol>
        </div>
      </div>
    </div>


    <footer class="bg-orange-500 p-4 text-center">
      <div class="flex mb-2 justify-center">
        <a href="http://www.facebook.com/sharer/sharer.php?u=https://www.twhg.com.tw/esg/esgtree/esgtree_game.php" target="_blank" class="me-2">
          <img src="https://www.twhg.com.tw/esg/esgtree/images/icon_202x54_1.png" alt="" width="140">
        </a>
        <a href="https://lineit.line.me/share/ui?url=https://www.twhg.com.tw/esg/esgtree/esgtree_game.php">
          <img src="https://www.twhg.com.tw/esg/esgtree/images/icon_202x54_2.png" alt="" width="140">
        </a>
      </div>
      <p class="text-white">台灣房屋 版權所有 © Taiwan Realty All Rights Reserved.</p>
    </footer>


    <!-- 回頂端 -->
    <div id="scrollToTopBtn" class="fixed right-8 bottom-8 bg-[#000A] text-white font-bold w-16 h-16 rounded-[50%] flex justify-center items-center duration-100 hover:text-orange-500 hover:-translate-y-1 active:translate-y-1" @click="scrollToTop">
      <div>Top</div>
    </div>

  </div>
</template>
<style>
#slide1 {
  background-image:linear-gradient(#0000 70%, #000F),url('/images/intro1.png');
  background-size: cover;
  background-position: bottom;
}
#slide2 {
  background-image: 
  linear-gradient(90deg, #0008 20%, #0000 50%),
  linear-gradient(#0000 80%, #000F), url('/images/fox.png');
  background-size: cover;
  background-position:bottom 30% right 30%;
}
#slide3 {
  background-color:#000;
  background-image:linear-gradient(#0000 95%, #000F),url('/images/intro2.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position:bottom center;
}
#slide4 {
  background-color:#000;
  background-image:linear-gradient(#0000 70%, #000F),url('/images/kid.jpg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position:bottom 30% right 30%;
}

.h2 {
  background-image: url('/images/forest-h2.png');
  background-size: contain;
}

#game-intro {
  background-image: 
    url('/images/trees2.png'),
    url('/images/trees1.png'),
    url('/images/curve-up.png'), 
    url('/images/curve-down.png')
    ;
  background-size:  
    30%, 
    30%, 
    200% 30%, 
    200% 30%
    ;
  background-position: 
    top right, 
    bottom left, 
    top, 
    bottom 
    ;
}
@media (min-width: 420px) {
  #game-intro {
    background-position: 
      top 10% right 10%, 
      bottom 0.5rem left 10%, 
      top, 
      bottom 
      ;
  }
}

@media (min-width: 640px) {
  #game-intro {
    background-size:  
      20%, 
      20%, 
      100% 30%, 
      100% 30%
      ;
    background-position: 
      top 10% right 10%, 
      bottom 10% left 10%, 
      top, 
      bottom 
      ;
  }
}


@media (min-width: 1024px) {
  #game-intro {
    background-size:  
    auto, 
    auto,  
      100% 30%, 
      100% 30%
      ;
  }
}

.shadow-inner-lg {
  box-shadow: inset 0 10px 20px 0 rgb(0 0 0 / 0.20)
}


#prize1:hover img, #prize2:hover img{
  transform: translateY(-32px);
}

.bezier {
  transition-timing-function:cubic-bezier(.47,1.64,.41,.8);
}

/* 水平 */

.horizontal {
  overflow-x: hidden;
}

.horizontal .inner {
  display: flex;  
  flex-wrap: nowrap;

}

.spacer {
  height: 100vh;
  background-color: black;
}

section {
  position: relative;
  height: 100vh;
  flex: 0 0 100%;
  display: flex;
  justify-content: center;
}

#section1 {
  background-image: linear-gradient(#FFFF, #FFFA 30%, #FFF8 50%, #FFFA 70%, #FFFF),url('/images/wildfire-map-left.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: right;
}
#section2 {
  background-image: linear-gradient(#FFFF, #FFFA 30%, #FFF8 50%, #FFFA 70%, #FFFF),url('/images/wildfire-map-right.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: left;
}

*{
  /* outline: 1px solid #A00; */
  box-sizing: border-box;
  font-family: sans-serif;
}
.Bricolage {
  font-family: 'Bricolage Grotesque';
}
</style>