//
import vue from 'vue'

// 导入自定义到Toast组件
import CustToast from './index.vue'
import createSingle from './utils/single'


// 生成一个扩展实例构造器
const ToastConstructor = vue.extend(CustToast);

// 定义弹出组件的函数 接收四个参数  消息 toast类型 显示时间 挂载的dom
function showToast(options) {
    // message, type="warning", duration = 4000,domStr="body"
    const {type, message, duration, domStr} = options
    const _toast = new ToastConstructor({
        data() {
            return {
                showToast: true,
                type: type,
                message: message,
                duration: duration,
                domStr: domStr
            }
        }
    });
    return _toast
}
const singleToast =  createSingle(showToast)

// 需要在main.js 里面使用 Vue.use(showToast);
singleToast.install = (Vue) => {
    // 将组件注册到 vue 的 原型链里去,
    // 这样就可以在所有 vue 的实例里面使用 this.$toast()
    Vue.prototype.$toast = singleToast
};

// 导出
export default singleToast
