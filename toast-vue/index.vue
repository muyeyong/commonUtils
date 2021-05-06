<template>
  <slide-y-up-transition>
    <div :class="['CustToast',type, position]" v-if="showToast">
      <span class="icon">
        <img :src="iconSrc" />
      </span>
      <span class="message">
        {{ message }}
      </span>
    </div>
  </slide-y-up-transition>
</template>

<script>

import { SlideYUpTransition } from 'vue2-transitions'

export default {
  name: 'CustToast',
  components:{
    SlideYUpTransition,
  },
  props:{
   
  },
  created(){
    
  },
  data() {
    return {
      showToast: true,
      type: 'warning',
      message: '消息提示',
      duration: 3000,
      domStr: 'body',
      position:'top',
      timeOut: null
    };
  },
  computed: {
    iconSrc() {
      const tipType = ['success', 'info', 'error'];
      if (tipType.includes(this.type)) {
        return require(`./assess/svg/${this.type}.svg`);
      }
      throw 'Toast type数据只允许为  success, info, error 三种其中的一种，默认为info';
    },
  },
  methods:{
    init(options){
      const {message, type = 'info', duration = 3000, domStr = 'body', position='top'} = options
      this.message = message
      this.type = type
      this.duration = duration
      this.domStr = domStr
      this.position = position
      this.showToast = true
      if(this.timeOut) clearTimeout(this.timeOut)
    },
    show(options){
      this.init(options)
      let element = this.$mount().$el;
      const target = document.querySelector(this.domStr);
      target.appendChild(element);
     this.timeOut = setTimeout(() => {this.showToast = false} ,this.duration)
    }
  }
};
</script>

<style  lang='less' scoped>
@import "./css/common.css";
.CustToast {
  position: absolute;
  background: rgb(233, 233, 235);
  padding: 10px;
  border-radius: 5px;
  color: #000;
  overflow: hidden;
  display: flex;
  align-items: center;
  z-index: 3000;
  .message{
    white-space: nowrap;
  }
}



.success {
  background: #4cc36d;
}

.info {
  background: #5a8ff0;
}

.error {
  background: #ec6055;
}

.top {
  left: 50%;
  top: 15%;
  transform: translate(-50%, -50%);
}

.top-right{
  top: 15%;
  right: 2%;
  
}

.top-left{
  top: 15%;
  left: 2%;
}

.bottom{
  bottom: 5%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.bottom-left{
  bottom: 5%;
  left: 2%;
}

.bottom-right{
  bottom: 5%;
  right: 2%;
}



.icon img {
  width: 20px;
  height: 20px;
  margin-top: 3px;
  margin-right: 4px;
  background: transparent;
}
</style>
