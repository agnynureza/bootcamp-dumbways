function pascal_function(n) {
    let result = []
    for (let i = 0; i <= n; i++) {
        let temp = []
        for (let j = 0; j <= i; j++) {
            if (j == 0 || j == i) {
                temp.push(1)
            } else {
                temp[j] = result[j-1] + result[j]
            }
        }
        console.log(temp.join(' '))
        result = temp
    }
}

pascal_function(4)
/*
1
1 1
1 2 1
1 3 3 1
1 4 6 4 1
*/
pascal_function(10)