/*
Buatlah sebuah function sederhana untuk menghitung potongan harga, biaya yang harus dibayar, dan total kembalian pada sistem voucher DumbWays Klontong , ketentuan : 
Voucher : 
DumbWaysJos, potongan 21,1%, minimal uang belanja 50000, Maksimal diskon 20000
DumbWaysMantap, potongan 30%, minimal uang belanja 80000, maksimal diskon 40000

Clue : maka jika function dijalankan:
hitungVoucher(DumbWaysJos, 100000)
	output :     -	Uang yang harus dibayar : 80000
Diskon : 20000
Kembalian  : 20000
*/

function hitungVoucher(voucher, amount) {
    let discount;
    let result = {
        pay: 0,
        disc:0
    }
    switch (voucher.toLowerCase()) {
        case 'dumbwaysjos':
            discount = [21.1, 20000, 50000]
            break
        case 'dumbwaysmantap':
            discount = [30, 40000, 80000]
            break
        default:
            console.log('invalid voucher')
            discount = [0,0,0]
            break
    }

    if(amount >= discount[2]){
        let totalDiscount =  amount*(discount[0]/100) 
        totalDiscount >= discount[1] ? result.disc = discount[1] : result.disc = Math.floor(totalDiscount)

    }
    result.pay = amount - result.disc

    console.log(`
        - Uang yang harus di bayar: ${result.pay}
        - Diskon : ${result.disc}
        - Kembalian : ${result.disc}
    `)
}

hitungVoucher('DumbWaysMantap', 90000)
