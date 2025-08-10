/*
// 1. Napiši program v Javascriptu, ki prebere tvoje ime
//    in te pozdravi. (Uporabi funkciji prompt in console.log)
Ime = prompt('Kako ti je ime?')
console.log('Živjo ' + Ime + '!')

// 2. Preberi številko in tolikokrat izpiši vrstico "Ding. Dong."
//    Namig: ne pozabi niz spremeniti v številko z uporabo parseInt
beseda = 'Ding Dong.'
stevilka = parseInt(prompt('Vpiši neko številko:'))
for (var i = 1; i < (stevilka + 1); i++){
    console.log(beseda + i)
}

// 3. Preberi številko a in izračunaj površino kvadrata s stranico a
a = parseInt(prompt('Vpiši dolžino stranice A:'))
console.log('Površina kvadrata je: ' + (a**2) + ' cm2.')

// 4. Preberi številko r in izračunaj obseg kroga s polmerom r
//    obseg kroga se izračuna: 2 krat PI krat r
//    za PI uporabi Math.PI
r = parseInt(prompt('Vpiši polmer kroga:'))
console.log('Obseg kroga je: ' + (2*Math.PI*r) + '.')
*/
// 5. Za vpisano število izriši kvadrat a stranico velikost vpisanega števila
/*
Primer: Vpisano št.: 4
* * * *
* * * *
* * * *
* * * *
*/

// 6. Za vpisano število izriši pravokotni trikotnik a stranico velikost vpisanega števila
/*
Primer: Vpisano št.: 4
*
* *
* * *
* * * *
*/

// 7. Za vpisano število izriši pravokotni trikotnik a stranico velikost vpisanega števila
/*
Primer: Vpisano št.: 4
* * * *
* * *
* *
*
*/


// 10. Trikotnik
/*
function trikotnik(a) {
    y=a
    for (i=1; y>0; i++) {
        y=y-2
    }
    y=y+2
    x=''
    m=''
    for (i=y; i<=a; i=i+2) {
        for (n=1; n<=i; n++) {
            x=x+'*'
        }
        for (n=1; n<=((a-i)/2); n++) {
            m=m+' '
        }
        console.log(m+x+m)
        x=''
        m=''
    }
}
*/

//var s = 5
//trikotnik(s)
//trikotnik(s)
//trikotnik(s)





/*
    1. Napiši funkcijo, ki vzame
    seznam in vrne povprečno vrednost
    števila v seznamu
    (vsota vseh elementov deljena s številom vseh)
*/

/*
    2. Napiši funkcijo, ki izpiše N-to število
    Fibonaccijevega zaporedja
    (1,1,2,3,5,8,13,...)
    Prvi in drugi člen sta 1
    Vsak naslednji člen je vsota prejšnjih dveh
*/

/*
    3. Imamo seznam:
        var l = [5,12,9,4,123,17,18,21,122];
    Napiši program, ki ga uredi po velikosti z uporabo bubble sort.

*/