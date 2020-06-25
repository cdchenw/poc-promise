

//async函数返回的是一个promise对象
async function fn1(){
    // return 1;
    // throw 2;
    // return Promise.resolve(1);
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(3);
        }, 1000);
    });
   
}

const result = fn1();

console.log(result);

result.then(data=>{
    console.log("onResovled", data);
},error=>{
    console.log("onRejected", error)
});


function fn2(){
    return Promise.resolve(22);
}

function fn4(){
    return 44;
}

function fn5(){
    return Promise.reject(55);
}

async function fn3(){
    try{
        const p = await fn2();//await右则表达式是promise,得到的结果就是promise成功的value
        console.log(p);

        const p1 = await fn4(); //await右侧表达式不是promise,则直接返回数值
        console.log(p1);

        const p2 = await fn5(); //await右侧表达式是promise,如果失败直接抛出异常
        console.log(p2);
    }catch(e){
        console.log("error>>", e);
    }
}

fn3();