
/**
 * 4. promise.then() 返回新的promise的结果状态由什么决定
 * 1) 简单表达：由then()指定的回调函数执行的结果觉得
 * 2) 详细表达
 *   2.1）如果抛出异常，新promise变为rejected, reason为抛出的异常
 *   2.2) 如果返回的是非promise的任意值,新promise状态变为resolved, value为返回的值
 *   2.3) 如果返回是是另外一个新的promise,此promise的结果就会成为新的promise的结果
 */
const p = new Promise((resolve, reject) => {
    resolve(1);
    reject(0);
});

p.then(data => {
    console.log("daerrorta1=>>", data);
}, error => {
    console.log("error1=>>", error);
}).then(data => {
    console.log("data2=>>", data);
}, error => {
    console.log("error2=>>", error);
});
