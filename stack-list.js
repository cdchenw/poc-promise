

setTimeout(()=>{
    console.log("立即放入宏队列, time out callback1");
});

setTimeout(()=>{
    console.log("立即放入宏队列, time out callback2");
});

Promise.resolve(1).then(value=>{
    console.log("1.立即放入微队列>>", value);
});

Promise.resolve(2).then(value=>{
    console.log("2.立即放入微队列>>", value);
});