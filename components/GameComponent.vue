<script setup>
  import nuxtStorage from 'nuxt-storage';
  import { infos } from '@/src/infos.json'

  const expired = ref(Date.now() > 1704038400000 ? true : false) // 2024/01//01 00:00:00
  // https://timestamp.online/

  let shuffledInfos = ref([])
  const round = 16
  let num = ref(0)
  let runNum = ref(0)
  let oxygen = ref(20)
  const collection = ref([0,0,0,0,0,0,0,0,0])
  const local_collection = ref([]);
  let game_status = ref('start')
  let firefighter_status = ref('start')
  let result = ref('');
  let info_content = ref('')
  let waterBtn = ref(null)
  let medBtn = ref(null)
  let info_shown = ref(false)
  let form_shown = ref(false)

  let formComponent = ref(null)
  
  let positionNum = ref(0)
  let animalNum = ref(0);
  let objectNum = ref(0);

  const objArr = ref([{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}])


  onMounted(()=>{
    // nuxtStorage.localStorage.removeItem('twhg_esg-wildfire')
    // nuxtStorage.localStorage.setData('twhg_esg-wildfire', '[1,1,1,1,1,1,1,1,1,false]', 3,'m')
    local_collection.value = JSON.parse(nuxtStorage.localStorage.getData('twhg_esg-wildfire')) || [0,0,0,0,0,0,0,0,0,false]
  })


  const init = () => {
    collection.value = [0,0,0,0,0,0,0,0,0]

    shuffledInfos.value = infos.sort(() => Math.random() - 0.5);
    
      for (let i = 0; i < round; i++) {
        generate();
      }
      num.value = 0;
      setTimeout(()=>{
        objArr.value[0].location = 'run1'
      },0)
      setTimeout(()=>{
        run();
      },1)
    
  }

  // 生成當次出現物體
  const generate = () => {
    
    objectNum.value = Math.floor(Math.random() * 2); // 出現機率 動物1:2火
    animalNum.value = Math.floor(Math.random() * 8); // 8種隨機
    positionNum.value = Math.floor(Math.random() * 2); // 上或下

    objArr.value[num.value].objectNum = objectNum.value;
    objArr.value[num.value].animalNum = animalNum.value;
    objArr.value[num.value].positionNum = positionNum.value;
    objArr.value[num.value].location = 'run0'
    objArr.value[num.value].success = false

    num.value += 1;
    
  }

// 往前移動
  const run = () => {
    game_status.value = 'run'
    
    firefighter_status.value = "run"
    objArr.value[runNum.value].location = 'run2'
    if(runNum.value<round-1){
      objArr.value[runNum.value + 1].location = 'run1';
    }

    setTimeout(() => {
      game_status.value = 'save'
      firefighter_status.value = "start"
      waterBtn.value.disabled = false;
      medBtn.value.disabled = false; 
    }, 2000);
    
  }

  // 滅火 or 救援
  const save = (item) => {
    
      if (item && objArr.value[runNum.value].objectNum) {
        oxygen.value += 5;
        result.value = '滅火成功';
        objArr.value[runNum.value].success = true
        firefighter_status.value = "water"
        collection.value[8] += 1;
      } 

      else if (!item && !objArr.value[runNum.value].objectNum) {
        oxygen.value += 5;
        result.value = '救援成功';
        objArr.value[runNum.value].success = true
        firefighter_status.value = "rescue"
        collection.value[objArr.value[runNum.value].animalNum] += 1;
      } 

      else if (item && !objArr.value[runNum.value].objectNum) {
        firefighter_status.value = "water"
        result.value = '救援失敗';
        oxygen.value -= 5;
      } 

      else if (!item && objArr.value[runNum.value].objectNum) {
        firefighter_status.value = "rescue"
        result.value = '滅火失敗';
        oxygen.value -= 5;
      }

      if (oxygen.value == 0) {
        lose();
      } else {
        waterBtn.value.disabled = true;
        medBtn.value.disabled = true;
        
        setTimeout(() => {
          info_content.value = shuffledInfos.value[runNum.value].content
          info_shown.value = true
        }, 1000);
      }
    
  }

  const closeInfo = () => {
    info_shown.value = false
    result.value = '';

    objArr.value[runNum.value].location = 'run3';
    if(runNum.value<round-1){
      objArr.value[runNum.value+1].location = 'run2';
    }
    runNum.value += 1;

    if (runNum.value < round) {
      setTimeout(() => {
        waterBtn.value.disabled = false;
        medBtn.value.disabled = false;

      }, 2000);

      run();
    }else {
      // 最後一輪結束
      game_status.value = 'end'
      firefighter_status.value = "start"

      for(let i=0; i<=8;i++){
        local_collection.value[i] += collection.value[i]
      }

      nuxtStorage.localStorage.setData('twhg_esg-wildfire', JSON.stringify(local_collection.value), 120, 'd') // 120 天過期
    }
  }

  const lose = () => {
    
      setTimeout(()=>{
        game_status.value = 'end';
        firefighter_status.value = "start";
        result.value = '';
        collection.value = [0,0,0,0,0,0,0,0,0];
      },1000)

  }

  const reset = () => {
    game_status.value = 'start'
      
    runNum.value = 0;
    oxygen.value = 20;

    for(let i=0; i < 16; i++){
      objArr.value[i].objectNum= 0
      objArr.value[i].animalNum= 0
      objArr.value[i].positionNum= 0
      objArr.value[i].location='run0'
    }
    
  }

  const showForm = (boolean) => {
      form_shown.value = boolean
  }

  const submitForm = () => {
    local_collection.value[9]=true
    nuxtStorage.localStorage.setData('twhg_esg-wildfire', JSON.stringify(local_collection.value), 120, 'd')
  }

</script>

<template>
  <div id="game" class="py-10 md:py-20 bg-lime-100">
    <div class=" relative">
      <div class="game h-[60vh] relative overflow-hidden">
        <!-- 背景 -->
        <div id="bg-image" class="bg-image absolute top-0 left-0 right-0" 
        :class="{
          'bg-image1':oxygen<=30, 
          'bg-image2':oxygen>30 && oxygen<=55,
          'bg-image3':oxygen>55 && oxygen<=80,
          'bg-image4':oxygen>80 && oxygen<100,
          'bg-image5':oxygen==100,
          'paused':game_status!='run',
          }"></div> 

        <!-- 氧氣含量 -->
        <div v-show="game_status=='run' || game_status=='save'" id="oxygen" class="absolute top-8 md:top-12 start-8 w-44 bg-orange-400 flex justify-between items-center p-2 rounded outline outline-4 outline-white font-bold">
          <div class="text-sm w-1/4">氧氣含量</div>
          <ul class="grid grid-cols-5 w-2/3 outline outline-1 outline-black mx-2">
            <li class="h-12 border border-orange-400" :class="{'bg-white':oxygen>=20, 'bg-orange-400':oxygen<20}"></li>
            <li class="h-12 border border-orange-400" :class="{'bg-white':oxygen>=40, 'bg-orange-400':oxygen<40}"></li>
            <li class="h-12 border border-orange-400" :class="{'bg-white':oxygen>=60, 'bg-orange-400':oxygen<60}"></li>
            <li class="h-12 border border-orange-400" :class="{'bg-white':oxygen>=80, 'bg-orange-400':oxygen<80}"></li>
            <li class="h-12 border border-orange-400" :class="{'bg-white':oxygen>=100, 'bg-orange-400':oxygen<100}"></li>
          </ul>
          <div>{{ oxygen }}%</div>
        </div>

        <!-- 動物 or 火 -->
        <div  v-show="game_status=='run' || game_status=='save' || game_status=='result' || game_status=='info'" class="objects absolute inset-0">
          <div v-for="(item, index) in objArr" :key="index" class="object animal absolute w-16 md:w-20" 
          :class="{
            'bottom-1/3 z-10': item.positionNum, 
            'top-1/3':!item.positionNum, 
            'run0':item.location=='run0', 
            'run1':item.location=='run1', 
            'run2':item.location=='run2',
            'run3':item.location=='run3', 
            } " :data-num="index" :data-object="item.objectNum? 'fire': item.animalNum">
            <div v-if="item.objectNum">
              <img v-if="item.success" src="/images/sprout.png" alt="" class="w-16 md:w-20">
              <img v-else src="/images/fire.png" alt="" class="w-16 md:w-20">
            </div>
            <div v-else>
              <img v-if="item.success" src="/images/heart.png" alt="" class="w-16 md:w-20">
              <template v-else>
                <img v-if="item.animalNum==0" src="/images/animal-0.png" alt="" class="w-16 md:w-20">
                <img v-else-if="item.animalNum==1" src="/images/animal-1.png" alt="" class="w-16 md:w-20">
                <img v-else-if="item.animalNum==2" src="/images/animal-2.png" alt="" class="w-16 md:w-20">
                <img v-else-if="item.animalNum==3" src="/images/animal-3.png" alt="" class="w-16 md:w-20">
                <img v-else-if="item.animalNum==4" src="/images/animal-4.png" alt="" class="w-16 md:w-20">
                <img v-else-if="item.animalNum==5" src="/images/animal-5.png" alt="" class="w-16 md:w-20">
                <img v-else-if="item.animalNum==6" src="/images/animal-6.png" alt="" class="w-16 md:w-20">
                <img v-else-if="item.animalNum==7" src="/images/animal-7.png" alt="" class="w-16 md:w-20">
              </template>
            </div>

          </div>
        </div>

        <!-- 消防員 -->
        <div class="absolute top-1/3 left-[10%] sm:left-[20%] h-1/4 ">
          <img class="h-full" :class="{'hidden':firefighter_status != 'start'}" src="/images/firefighter-start.png" alt="">
          <img class="h-full running" :class="{'hidden':firefighter_status != 'run'}" src="/images/firefighter-run.png" alt="">
          <img class="h-full" :class="{'hidden':firefighter_status != 'water'}" src="/images/firefighter-water.png" alt="">
          <img class="h-full" :class="{'hidden':firefighter_status != 'rescue'}" src="/images/firefighter-rescue.png" alt="">
          <div class="result font-bold">{{ result }}</div>
        </div>
        
        <!-- 登入 -->
        <div id="login" class="hidden absolute top-1/2 start-1/2 -translate-y-1/2 -translate-x-1/4 md:-translate-x-1/2 text-xl sm:text-2xl text-center font-bold">
          <p>登入台灣房屋會員</p>
          <p class="mb-4">
            領取救援任務
          </p>
          <!-- 網址 esgbreath -->
          <a href="https://www.twhg.com.tw/login.php?source=esgbreath"  id="playBtn" class="bg-orange-500 hover:bg-orange-600 active:bg-orange-600 text-white py-2 px-8 rounded-full shadow-[0_5px_0px_0px] shadow-orange-800 active:shadow-[0_1px_0px_0px] active:translate-y-[5px] duration-100 active:shadow-orange-800" @click="login">登入</a>
        </div>

        <!-- 遊戲說明 -->
        <div v-show="game_status=='start'" id="description" class="absolute top-1/2 start-1/2 -translate-y-1/2 -translate-x-1/4 md:-translate-x-1/2 text-xl sm:text-2xl text-center font-bold">
          <div>
            <span class="mb-2 inline-block whitespace-nowrap">撲滅火苗、</span>
            <span class="mb-2 inline-block whitespace-nowrap">拯救動物</span>
            <p class="mb-4">收集動物圖鑑</p>
          </div>
          <button type="button" id="playBtn" @click="init" class="bg-orange-500 hover:bg-orange-600 active:bg-orange-600 text-white py-2 px-8 rounded-full shadow-[0_5px_0px_0px] shadow-orange-800 active:shadow-[0_1px_0px_0px] active:translate-y-[5px] duration-100 active:shadow-orange-800">開始！</button>
        </div>

        <!-- 結束畫面 -->
        <div v-show="game_status=='end'" id="finish" class="relative top-1/2 -translate-y-1/2 w-9/12 sm:w-8/12 xl:w-6/12 ms-auto xl:mx-auto   text-center font-bold">
          <p v-if="oxygen>0" class="mb-1 text-xl sm:text-2xl">
            遊戲結束！
          </p>
          <p v-else class="mb-1 text-xl sm:text-2xl">
            遊戲失敗...
          </p>
          <p v-if="oxygen>0" id="finish-success" class="mb-2 text-md md:text-lg ">
            <span v-if="local_collection.indexOf(0)==-1 || expired">恭喜您完成森林救援任務</span>
            <span v-else>集齊8種動物，達成抽好禮資格！</span>
          </p>
          <!-- 成績 -->
          <div v-if="oxygen>0" class="md:w-full ms-auto mb-2 text-md sm:text-lg">
            <div class="inline-block md:flex p-2 justify-center">
              <div class="flex md:block">
                <div id="oxygen" class="hidden md:flex w-44 h-20 bg-orange-400  justify-between items-center p-2 rounded outline outline-4 outline-white font-bold mx-auto">
                  <div class="text-sm w-1/4 hidden lg:inline">氧氣含量</div>
                  <ul class="grid grid-cols-5 w-2/3 outline outline-1 outline-black mx-2">
                    <li class="h-12 border border-orange-400" :class="{'bg-white':oxygen>=20, 'bg-orange-400':oxygen<20}"></li>
                    <li class="h-12 border border-orange-400" :class="{'bg-white':oxygen>=40, 'bg-orange-400':oxygen<40}"></li>
                    <li class="h-12 border border-orange-400" :class="{'bg-white':oxygen>=60, 'bg-orange-400':oxygen<60}"></li>
                    <li class="h-12 border border-orange-400" :class="{'bg-white':oxygen>=80, 'bg-orange-400':oxygen<80}"></li>
                    <li class="h-12 border border-orange-400" :class="{'bg-white':oxygen>=100, 'bg-orange-400':oxygen<100}"></li>
                  </ul>
                  <div class="text-sm">{{ oxygen }}%</div>
                </div>
                
                <div class="text-xl bg-orange-400 border-2 border-white shadow-sm rounded md:hidden h-24 h-[32px]  me-4 md:mx-auto flex items-center">
                  <div class="text-sm">
                    {{ oxygen }}%
                  </div>
                </div>
                <p class="py-1">氧氣含量</p>
              </div>
              <div class="flex md:block md:mx-4">
                <img src="/images/animal-1.png" alt="" class="w-8 md:w-20 me-4 md:mx-auto object-contain">
                <p class="py-1">
                  您拯救了{{collection[0]+collection[1]+collection[2]+collection[3]+collection[4]+collection[5]+collection[6]+collection[7]}}隻動物
                </p>
              </div>
              <div class="flex md:block">
                <img src="/images/sprout.png" alt="" class="w-8 md:w-20 me-4 md:mx-auto object-contain">
                <p class="py-1">您種下了{{collection[8]}}棵樹苗</p>
              </div>
            </div>
          </div>
          <div class="justify-center flex">
            <!-- <button type="button" id="shareBtn" class="bg-green-500 hover:bg-green-600 active:bg-green-600 text-sm md:text-md text-white p-1 md:p-2 me-2 rounded shadow-[0_5px_0px_0px] shadow-green-800 active:shadow-[0_1px_0px_0px] active:translate-y-[5px] duration-100 active:shadow-green-800 ">
              分享結果
            </button> -->
            <button type="button" id="shareBtn" @click="reset" class="bg-orange-500 hover:bg-orange-600 active:bg-orange-600 text-sm md:text-md text-white py-2 px-5  rounded-full shadow-[0_5px_0px_0px] shadow-orange-800 active:shadow-[0_1px_0px_0px] active:translate-y-[5px] duration-100 active:shadow-orange-800 ">
              再玩一次
            </button>
          </div>
        </div>
      </div>

      <div id="panel" class="container relative mx-auto p-2 md:p-4 xl:p-8"> 
        <div class="flex flex-col md:flex-row justify-evenly items-center p-2 h-full">
          <!-- 滅火 or 救援 -->
          <div id="saveBtn" class="flex md:block w-11/12 sm:w-3/4 md:w-1/6 mb-4 md:mb-0">
            <button ref="waterBtn" type="button" id="waterBtn" class="bg-sky-400 hover:bg-sky-500 p-2 mr-2 md:mr-0 rounded md:mb-4 w-full h-20 bg-contain bg-center bg-no-repeat bg-origin-content shadow-[0_5px_0px_0px] shadow-sky-800 active:shadow-[0_1px_0px_0px] active:translate-y-[5px] duration-100 active:shadow-sky-800" @click="save(1)" disabled>
            </button>

            <button ref="medBtn" type="button" id="medBtn" class="bg-green-400 hover:bg-green-500 p-2 rounded md:mb-4 w-full h-20 bg-contain bg-center bg-no-repeat bg-origin-content shadow-[0_5px_0px_0px] shadow-green-800 active:shadow-[0_1px_0px_0px] active:translate-y-[5px] duration-100 active:shadow-green-800" @click="save(0)" disabled>
            </button>
               
          </div>
          <!-- 收集 -->
          <div id="collection" class="w-11/12 sm:w-3/4 md:w-1/2 lg:w-2/5 xl:w-1/3 ">
            <ul class=" grid grid-cols-4 gap-2 md:gap-4 ">
              <li class="">
                <img src="/images/animal-0.png" alt="" class="rounded border-4 border-orange-500 bg-white w-full shadow" :class="{'grayscale':local_collection[0]==0 && collection[0] == 0}">
              </li>
              <li class="">
                <img src="/images/animal-1.png" alt="" class="rounded border-4 border-orange-500 bg-white w-full shadow" :class="{'grayscale':local_collection[1]==0 && collection[1] == 0}">
              </li>
              <li class="">
                <img src="/images/animal-2.png" alt="" class="rounded border-4 border-orange-500 bg-white w-full shadow" :class="{'grayscale':local_collection[2]==0 && collection[2] == 0}">
              </li>
              <li class="">
                <img src="/images/animal-3.png" alt="" class="rounded border-4 border-orange-500 bg-white w-full shadow" :class="{'grayscale':local_collection[3]==0 && collection[3] == 0}">
              </li>
              <li class="">
                <img src="/images/animal-4.png" alt="" class="rounded border-4 border-orange-500 bg-white w-full shadow" :class="{'grayscale':local_collection[4]==0 && collection[4] == 0}">
              </li>
              <li class="">
                <img src="/images/animal-5.png" alt="" class="rounded border-4 border-orange-500 bg-white w-full shadow" :class="{'grayscale':local_collection[5]==0 && collection[5] == 0}">
              </li>
              <li class="">
                <img src="/images/animal-6.png" alt="" class="rounded border-4 border-orange-500 bg-white w-full shadow" :class="{'grayscale':local_collection[6]==0 && collection[6] == 0}">
              </li>
              <li class="">
                <img src="/images/animal-7.png" alt="" class="rounded border-4 border-orange-500 bg-white w-full shadow" :class="{'grayscale':local_collection[7]==0 && collection[7] == 0}">
              </li>
            </ul>
          </div>
        </div>

        <!-- 填寫表單按鈕 -->
        <div v-show="local_collection.indexOf(0)==-1 && local_collection[9]==false" class="mt-5">
          <p class="text-center font-bold text-xl mb-2">恭喜您集齊8種動物圖鑑！</p>
          <button v-if="!expired" type="button" @click="showForm(true)" id="showFormBtn" class="block bg-orange-500 hover:bg-orange-600 active:bg-orange-600 text-2xl text-white font-bold py-2 px-12 rounded-full w-full md:w-auto shadow-[0_5px_0px_0px] shadow-orange-800 active:shadow-[0_1px_0px_0px] active:translate-y-[5px] duration-100 active:shadow-orange-800 mx-auto ">參加抽獎！！</button>
        </div>
      </div>
    </div>


    <!-- 小知識 -->
    <div v-show="info_shown" id="info" class="fixed inset-0 p-2 flex justify-center items-center z-20 bg-[#000E]">
      <div class="relative w-full sm:w-9/12 md:w-6/12 lg:5/12 xl:w-4/12 2xl:w-3/12 p-2 md:p-4 bg-white drop-shadow-2xl rounded-lg border-4 border-white">
        <h2 class="text-center text-3xl p-2 font-bold bg-bottom bg-no-repeat bg-contain text-lime-800">小知識</h2>
        <p id="info-content" class="p-4 text-xl">{{ info_content }}</p>
        <button id="infoCloseBtn" type="button" class="absolute top-0 end-0 p-2 text-orange-600 hover:text-gray-200 rounded" @click="closeInfo">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6L6.4 19Z"/></svg>
        </button>
      </div>
    </div>

    <!-- 表單 -->
    <FormComponent v-show="form_shown" ref="formComponent" @close-form ="showForm(false)" @submit-form="submitForm"></FormComponent>
  </div>
</template>

<style scoped>
.run0 {
  left: 100%;
}
.run1 {
  animation: run1 2s forwards linear
}
.run2 {
  animation: run2 2s forwards linear
}
.run3 {
  animation: run3 2s forwards linear
}


@keyframes run1 {
  0% {
    left: 100%;
  }
  100% {
    left:  65%;
  }
}
@keyframes run2 {
  0% {
    left: 65%;
  }
  100% {
  left: 30%;
  }
}
@keyframes run3 {
  0% {
    left: 30%;
    opacity: 1;

  }
  99% {
    left: -5%;
    opacity: 1;
  }
  100% {
    left: -5%;
    opacity: 0;
    }
}
.fire {
  left: 100%;
}
.animal  {
  position: absolute;
  left: 100%;
}

.bg-image {
  height: 100%;
  background-size: auto 30%;
  background-repeat: repeat-x;
  background-position: top, bottom;
  animation: bg_image 60s linear 0s infinite;
}
.bg-image1 {
  background-image: url('/images/1-1.png'), url('/images/1-1.png');
}
.bg-image2 {
  background-image: url('/images/1-2.png'), url('/images/1-2.png');
}
.bg-image3 {
  background-image: url('/images/1-3.png'), url('/images/1-3.png');
}
.bg-image4 {
  background-image: url('/images/1-4.png'), url('/images/1-4.png');
}
.bg-image5 {
  background-image: url('/images/1-5.png'), url('/images/1-5.png');
}
@keyframes bg_image {
  0%{
      left: 0px;
  }
  100%{
    left: -1000%;
}
}



.running {
  animation: running .5s linear 0s infinite;

}


@keyframes running {
  0%{
    transform: translateY(0);
  }
  50%{
    transform: translateY(0.25rem);
  }
  100%{
    transform: translateY(0);
}
}

.paused {
  animation-play-state: paused;
}

#waterBtn {
  background-image:url('/images/hose.png');
}
#medBtn {
  background-image: url('/images/med.png');
}
#info h2{
  background-image: url('/images/forest-h2.png');
}


</style>