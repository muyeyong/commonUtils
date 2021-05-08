// 插件挂载方式
const Single =function(fn){
    let result = null
    return function(){
        if(!result) {
            result=fn.call(this,arguments[0])
        }
        result.show(arguments[0])
        // return result||(result=fn.apply(this,arguments))
    }
}


export default Single;