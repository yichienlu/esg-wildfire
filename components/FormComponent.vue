<script setup>
/*form validation start*/
import { useForm } from '@vorms/core';
const { register, errors, handleSubmit, handleReset } = useForm({
  initialValues: {
    contactName: '',
    contactPhone: '',
    contactAddress: '',
  },
  onSubmit() {
    submitForm();
  },
});
const { value: contactName, attrs: contactNameAttrs } = register('contactName', {
  validate(value) {
    if (!value) return '名字為必填';
  },
});
const { value: contactPhone, attrs: contactPhoneAttrs } = register('contactPhone',{
  validate(value) {
    if (!value) {return '電話號碼為必填'}
  }
});
const { value: contactAddress, attrs: contactAddressAttrs } = register('contactAddress',{
  validate(value) {
    if (!value) return '地址為必填';
  }
});
/*form validation end*/

/*google sheets start*/
  const scriptURL = 'https://script.google.com/macros/s/AKfycbz0GDp6RsJuadmwI9f14OyabeA2_CcsfgmN70ZonWnatniMeKmXNuQA88kIIsA1pJza/exec'
  const contactForm = ref(null)
  const emit = defineEmits(['closeForm','submitForm']);

  const submitForm = ()=>{
    formSubmitted.value = true
    fetch(scriptURL, { method: 'POST', body: new FormData(contactForm.value)})
      .then(response => {
        emit('submitForm')
        console.log('Success!', response);

      })
      .catch(error => console.error('Error!', error.message))
  }
  /*google sheets end */

  let formSubmitted = ref(false)
</script>
<template>
  <form ref="contactForm" name="list-form" @submit="handleSubmit" @reset="handleReset" id="form">
    <div class="fixed inset-0 flex justify-center items-center p-2 z-20 bg-[#000E]">
      <div class=" relative w-full sm:w-9/12 md:w-6/12 lg:5/12 xl:w-4/12 2xl:w-3/12 py-10 px-12  bg-white drop-shadow-2xl rounded-lg bg-bottom bg-no-repeat bg-contain bg-forest">
        <button id="infoCloseBtn" type="reset" class="absolute top-0 end-0 p-2 text-orange-600 hover:text-gray-200 rounded" @click="emit('closeForm')">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6L6.4 19Z"/></svg>
        </button>
        
        <div class="relative">
          <div v-if="formSubmitted" class="pt-10 pb-20">
            <p class="text-center font-bold text-2xl text-lime-800">
              表單已送出 <br>
              祝您幸運中獎!!</p>
          </div>
          <div v-else>          
            <div class="mb-4">
              <div class="flex">
                <label class="block w-1/6 mr-2 text-lime-700 text-lg font-bold" for="name">姓名</label>
                <input
                  v-model="contactName"
                  v-bind="contactNameAttrs"
                  class="shadow-sm appearance-none border border-lime-600 rounded w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:border-orange-500" id="name" type="text" placeholder="請填入收件人姓名" name="contactName">
              </div>
              <div v-show="'contactName' in errors" class="text-red-500 text-sm text-end">
                {{ errors.contactName }}
              </div>
            </div>
            <div class="mb-4 ">
              <div class="flex">
                <label class="block w-1/6 mr-2 text-lime-700 text-lg font-bold" for="phone">電話</label>
                <input 
                  v-model="contactPhone"
                  v-bind="contactPhoneAttrs"
                class="shadow-sm appearance-none border border-lime-600 rounded w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:border-orange-500" id="phone" type="tel" placeholder="請填入連絡電話" name="contactPhone">
              </div>
              <div v-show="'contactPhone' in errors" class="text-red-500 text-sm text-end">
                {{ errors.contactPhone }}
              </div>
            </div>
            <div class="mb-4">
              <div class="flex">
                <label class="block w-1/6 mr-2 text-lime-700 text-lg font-bold" for="address">地址</label>
                <input
                v-model="contactAddress"
                v-bind="contactAddressAttrs"
                class="shadow-sm appearance-none border border-lime-600 rounded w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:border-orange-500" id="address" type="text" placeholder="請填入寄件地址" name="contactAddress">
              </div>
              <div v-show="'contactAddress' in errors" class="text-red-500 text-sm text-end">
                {{ errors.contactAddress }}
              </div>
            </div>
            <p class="text-sm text-orange-600 mb-4">請務必留下完整聯絡資料，才能寄小禮物給您，謝謝！</p>
            <button type="submit" id="submitBtn"  class="block mx-auto mb-10 bg-orange-500 hover:bg-orange-600 active:bg-orange-600 text-white py-2 px-10 rounded-full shadow-[0_5px_0px_0px] shadow-orange-800 active:shadow-[0_1px_0px_0px] active:translate-y-[5px] duration-100 active:shadow-orange-800 ">
              確認送出
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>

</template>

<style scoped>
.bg-forest {
  background-image:url('/images/forest.png')
}
</style>