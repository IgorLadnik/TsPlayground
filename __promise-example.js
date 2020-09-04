const doAsync = (a, b) =>
    new Promise((resolve, reject) => {
        if (a < 0)
            reject('REJECT');
        else
            resolve(a + b);
    });

(async () => {
    // async-await
    try {
        console.log(await doAsync(2, 3));  // output: 5
    }
    catch (err) {
        console.log(err);  // output: REJECT
    }

    // then-catch
    doAsync(2, 3)
        .then(res => console.log(res))   // output: 5
        .catch(err => console.log(err))  // output: REJECT
})();
