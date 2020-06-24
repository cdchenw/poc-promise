
/**
 * 5. promise如何串联操作多个任务
 * 1) promise 的then 返回一个新的promise,可以开城then的链式调用
 * 2) 通过then的链式调用； 串联多个同步/异步任务
 */
const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("执行任务1（异步）");
        resolve(1);
    }, 1000);
});

p.then(data => {
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
});
