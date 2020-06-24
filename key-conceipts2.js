
/**
 * 3. 改变promise 状态 和指定回调函数谁先谁后？
 * 1) 都有可能，正常情况是先指定回调函数 然后再改变状态，但是也可以反过来
 * 2) 如何先改变状态，在指定回调？
 *   2.1）在执行器中直接调用resolve()/reject()
 *   2.2) 延迟更长时间才调用Promise.prototype.then()
 * 3) 什么时候才能得到数据
 *   3.1）如果先指定回调，那么当状态发生改变时候，回调函数就会调用，得到数据
 *   3.2）如果先改变状态，当指定回调时，回调函数就会调用，得到数据
 */
const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(0); //后改变状态
    }, 1000);
});

p.then(data => { //先指定回调函数，保存当前指定的回调函数
    console.log("data=>>", data);
}, error => {
    console.log("error=>>", error);
});

const p1 = new Promise((resolve, reject) => {
    resolve(1); //先改变状态
});

p1.then(data => { //后指定回调函数，立即执行
    console.log("data1=>>", data);
}, error => {
    console.log("error1=>>", error);
});

const p2 = new Promise((resolve, reject) => {
    resolve(2); //后改变状态
});

setTimeout(() => {
    p2.then(data => { //先指定回调函数，保存当前指定的回调函数
        console.log("data2=>>", data);
    }, error => {
        console.log("error2=>>", error);
    });
}, 2000);

