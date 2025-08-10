/*
    1. Napiši program, ki vpraša za ime
    in izpiše "Lepo pozdravljen " + ime

    var ime = prompt("Kako ti je ime?");
    console.log("Pozdravljen, " + ime);
*/

/*
    2. Preberi število N in izpiši
    kvadrirano vrednost: N * N
    Namig: ne pozabi uporabiti parseInt()

    var n = parseInt(prompt('n'))
    console.log(n * n)
*/

/*
    3. Napiši program, ki z uporabo for zank
    izpiše pravokotni trikotnik v obliki:
    ****
    ***
    **
    *
*/

/*
var n = parseInt(prompt("st?"));
for (var i = n; i > 0; i--) {
    var z = "";
    for (var j = 0; j < i; j++) {
        z = z + "*";
    }
    console.log(z);
}
*/

/*
    4. Napiši program, ki z uporabo for zank
    izpiše pravokotni trikotnik v obliki:
    ___*
    __**
    _***
    ****

*/

/*
    5. Napiši program, ki z uporabo for zank
    izpiše piramido v obliki:
       *
      *|*
     **|**
    ***|***
       |

*/

/*
var n = parseInt(prompt("st?"));
for (var i = n; i > 0; i--) {
    var z = "";
    for (var j = 0; j < i; j++) {
        if (Math.random() > 0.8) {
            z = z + "o";
        } else {
            z = z + "*";
        }
    }
    console.log(z);
}
*/
/*
    1. Napiši funkcijo, ki vzame
    dve števili in vrne njun zmnožek
*/
function mnozi(a,b) {
    // ...
}

/*
    2. Napiši funkcijo, ki vzame
    seznam in vrne povprečno vrednost
    števila v seznamu
    (vsota vseh elementov deljena s številom vseh)
*/

/*
    3. Napiši funkcijo, ki izpiše N-to število
    Fibonaccijevega zaporedja
    (1,1,2,3,5,8,13,...)
    Prvi in drugi člen sta 1
    Vsak naslednji člen je vsota prejšnjih dveh
*/
/*
function fibr (n){
    if (n == 1) return 1;
    if (n == 2) return 1;
    return fibr(n-2) + fibr(n-1);
}

function fib (n){
    if (n==1||n==2) return 1;
    var a=1;
    var b=1;
    for(var i=0; i<n-2; i++){
        var c= a+b;
        a=b;
        b=c;


    }
    return c;
}
*/

/*
    Imamo seznam:
        var l = [5,12,9,4,123,17,18,21,122];
    Napiši program, ki ga uredi po velikosti z uporabo bubble sort.
*/
var l = [5, 12, 9, 4, 123, 17, 18, 21, 122];
var vmes = 0
function sort(input) {
    for (var a = 0; a < input.length; a++) {
        for (var i = 0; i < input.length; i++) {
            if (input[i] > input[i + 1]) {
                vmes = input[i];
                input[i] = input[i + 1];
                input[i + 1] = vmes;
            }
        }
    }
    //o oosf
}

sort(l);
console.log(l);


