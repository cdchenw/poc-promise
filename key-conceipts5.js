
/**
 * 6. promise 的异常传递
 * 1) 当使用promise的then链式调用时，可以在最后指定失败的回调
 * 2) 当前面任何操作出了异常，都会传到最后失败的回调中处理
 * 
 * 7. 中断promise链
 * 1)当使用promise.then链式调用的时候，在中间中断，不在调用后面的回调函数
 * 2)办法：在回调函数中返回一个pendding状态的promise对象
 */
const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("执行任务1（异步）");
        resolve(1);
    }, 1000);
});

p.then(data => {
    reject(0);
    console.log("任务1的结果：", data)
    console.log("执行任务2(同步)");
    return 2;
}).then(data => {
    console.log("任务2的结果: ", data)
    // 启动异步任务3
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            console.log("执行任务3（异步）");
            resolve(3);
        }, 2000);
    });
}).then(data=>{
    console.log("任务3的结果是", data);
}, error=>{
    console.log("异常处理.");
});
