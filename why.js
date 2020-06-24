/**
 * 1. 指定回调方式更加的灵活：
 * 旧的：必须在启动异步任务前指定
 * promise: 启动异步任务=>返回promise对象=>给promise 对象绑定回调函数（甚至可以在异步执行之后绑定）
 * 
 * 2. 支持链式调用，可以解决回调地狱问题
 * 什么是回调地狱？回调函数嵌套调用，外部回调函数异步执行的结果是嵌套的回调函数执行的条件
 * 回调地狱的缺点？不方便阅读，不便于异常处理
 * 解决方案：promise 链式调用
 * 终极方案：async/await
 */

//success callback function
function successCallback(data) {
    console.log("create successfully: " + data);
}

//failed callback function
function failureCallback(error) {
    console.log("create failed：" + error.message);
}

/**
 * 1.1 use old callback way
 */
createAudioFileAsync(audioSettings, successCallback, failureCallback);

/**
 * 1.2 use promise
 */

const promise = createAudioFileAsync(audioSettings);
setTimeout(() => {
    promise.then(successCallback, failureCallback);
}, 3000);

/**
 * 2.1 回调地狱
 */
doSomething(data => {
    doSomethingElse(data, newData => {
        doThirdThing(newData, finalData => {
            console.log("Got the final result = " + finalData);
        }, failureCallback);
    }, failureCallback);
}, failureCallback);

/**
 * 2.2 使用promise链式调用解决回调地狱问题
 */

doSomething().then(data => {
    return doSomethingElse(data);
}).then(data => {
    return doThirdThing(data);
}).then(data => {
    console.log("Got the final result = " + data);
}).catch(failureCallback);

/**
 * 2.3 async/await: 回调地狱终极解决方案
 */
async function requst() {
    try {
        const result = await doSomething();
        const result1 = await doSomethingElse(result);
        const result2 = await doThirdThing(result1);
        console.log("Got the final result = " + result2);
    } catch (error) {
        failureCallback(error);
    }
}


