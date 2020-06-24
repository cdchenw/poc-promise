

const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("success data");
        // reject("failure data");  
    }, 2000)
});

promise.then(data => {
    console.log("onResolved() ", data);
}, error => {
    console.log("onRejected() ", error);
});

//产生一个成功值是1的 promise
const p1 = new Promise((resolve, reject) => {
    resolve(1);
});

const p2 = Promise.resolve(2);
const p3 = Promise.reject(3);

p1.then(data => {
    console.log(data);
});
p2.then(data => {
    console.log(data);
});
p3.catch(error => {
    console.log(error);
});

//所有promise完成后，执行
const pAll = Promise.all([p1, p2, p3]);

pAll.then(data => {
    console.log("all onResolved()", data);
}, error => {
    console.log("all onRejected()", error);
});