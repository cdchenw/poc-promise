/**
 * 自定义Promise函数模块 IIFE
 */

(
    function (window) {
        const PENDING = "pending";
        const RESOLVED = "resolved";
        const REJECTED = "rejected";

        /**
         * Promise构造函数
         * excutor:执行器函数
         */
        function Promise(executor) {
            let self = this;
            self.status = PENDING;//给promise对象指定status 属性,
            self.data = undefined; //给promise对象指定一个用于存储结果数据的属性
            self.callbacks = []; //每个元素的结构{ onResovled(){}, onRejected(){}}

            function resolve(value) {
                if (self.status !== PENDING) {
                    return;
                }
                //修改状态为resolved
                self.status = RESOLVED;
                //保存value数据
                self.data = value;
                //如果有带值型的callback,立即异步执行回调
                if (self.callbacks.length > 0) {
                    setTimeout(() => { //放入队列中，执行所有成功的回调
                        self.callbacks.forEach(cbsObj => {
                            cbsObj.onResolved(value);
                        });
                    }, 0);
                }
            }
            function reject(reason) {
                if (self.status !== PENDING) {
                    return;
                }

                //修改状态为rejected
                self.status = REJECTED;
                //保存value数据
                self.data = value;
                //如果有带值型的callback,立即异步执行回调
                if (self.callbacks.length > 0) {
                    setTimeout(() => { //放入队列中，执行所有成功的回调
                        self.callbacks.forEach(cbsObj => {
                            cbsObj.onRejected(reason);
                        });
                    }, 0);
                }
            }

            try {
                //立即同步执行executor
                executor(resolve, reject);
            } catch (error) {
                //处理执行器里面抛出的异常，同意改变成rejected状态
                reject(error);
            }

        }

        /**
         * 定义 Promise原型then方法
         * 指定成功和失败的回调函数
         * 返回一个新的Promise对象
         */
        Promise.prototype.then = function (onResolved, onRejected) {
            let self = this;

            //指定默认的失败回调(实现异常传透的关键步骤)
            onResolved = typeof onResolved === 'function' ? onResolved : value => value; //向后传递成功的value
            onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason; }; //向后传递失败的reason

            return new Promise((resolve, reject) => {
                /**
                 * 调用指定的回调函数，根据执行结果，改变return 的promise的状态
                 */
                let handle = function (callback) {
                    /**
                     * 1.如果执行抛出异常，返回的promise失败 失败的reason就是exception error
                     * 2.如果回调函数返回非promise, return的promise就会成功，value就是返回的值
                     * 3.如果回调 函数返回的是promise, return的promise的结果就是这个promise的结果 
                     */
                    try {
                        let result = callback(self.data);
                        if (result instanceof Promise) {
                            // result.then(
                            //     value=> resolve(value), //当result成功时候，让return的promise成功
                            //     error=>reject(error)    //当result失败的时候，让return的promise也失败
                            // );
                            result.then(resolve, reject);//另外一种写法,和上面的等价
                        } else {
                            resolve(result);
                        }
                    } catch (error) {
                        reject(error);
                    }
                }

                if (self.status == PENDING) {
                    //假设当前状态是pending状态，将 回调函数保存起来
                    self.callbacks.push({
                        onResolved(value) {
                            handle(onResolved);
                        },//: onResolved,
                        onRejected(reason) {
                            handle(onRejected);
                        }//: onRejected
                    });
                } else if (self.status == RESOLVED) { //如果当前是resolved状态，异步执行onResolve并且改变return 的promise的状态
                    setTimeout(() => {
                        handle(onResolved);
                    });
                } else { //如果当前是rejected状态，异步执行onRejected,并且改变return的promise的状态
                    setTimeout(() => {
                        handle(onRejected);
                    });
                }
            });
        }

        /**
         * 定义 Promise原型catch方法
         * 指定失败的回调函数
         * 返回一个新的Promise对象
         */
        Promise.prototype.catch = function (onRejected) {
            //假设当前状态是pending状态，将 回调函数保存起来
            this.callbacks.push({
                onRejected//: onRejected
            });
        }

        /**
         * 定义Promise函数对象resolve方法
         * 返回一个指定结果的成功的Promise对象
         */
        Promise.resolve = function (value) {

        }

        /**
        * 定义Promise函数对象reject方法
        * 返回一个指定结果的失败的Promise对象
        */
        Promise.reject = function (value) {

        }

        /**
        * 定义Promise函数对象all方法
        * 返回一个Promise对象，只有当所有promise都成功则成功，否则只要有一个失败的，结果即失败
        */
        Promise.all = function (...promises) {

        }

        /**
         * 定义Promise函数对象race方法
         * 返回一个Promise对象，其结果由第一个完成的promise决定
         */
        Promise.race = function (...promises) {

        }

        window.Promise = Promise;
    }

)(window);