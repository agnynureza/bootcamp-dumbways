/*
Input : alagcgcdodol
Output : algcdo
*/


function uniqueWord(word){
    let result = []
    for(let i = 0 ; i < word.length ; i++){
        if(result.indexOf(word[i]) == -1){
            result.push(word[i])
        }
    }
    console.log(result.join(''))
}


uniqueWord('alagcgcdodol')
uniqueWord('acccasbdabcba')

