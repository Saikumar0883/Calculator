let buttons = document.querySelectorAll('button');
let p = document.querySelector('.calculations');
let ismulordiv = false;
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        appendbutton(button.textContent);
    })
})

let string = '';
let n = '';
let a = '';//for storing the character number string
let c = 0;//just a temp variable
let d = 0;//just a temp variable
let ans = 0;
let isTherePreviousdot = false;
function appendbutton(val) {
    //checking whether the last enetered is an operator and present enetered also an operator
    if (string.length)
        a = string.charAt(string.length - 1);
    else {
        if (val == 'x' || val == '÷' || val == '%') {
            return;
        }
    }

    if (a == val && a == '.') return;
    
    if (a == '+' || a == '-' || a == 'x' || a == '÷' || a == '%') {
        if (val == '+' || val == '-' || val == 'x' || val == '÷' || val == '%') {
            string = string.slice(0, -1) + val;
            p.innerHTML = string;
            return;
        }
    }

    //checking whether already the number having a decimal dot
    if (val == '.' && isTherePreviousdot) return;

    if (val == '+' || val == '-' || val == 'x' || val == '÷' || val == '%') isTherePreviousdot = false;
    if (val == '.') isTherePreviousdot = true;


    if (val == '⌫') {
        string = string.slice(0, -1);
    }

    //setting all the values to the intial when user enters clear button
    else if (val == 'C') {
        string = '';
        console.log(string);
        isTherePreviousdot = false;
        c = 0;
        d = 0;
        ans = 0;
    }
    else if (val == '=') { eval(string); return; }

    else string += val;

    p.innerHTML = string;
    console.log(string);
}

function eval(String) {
    a = '';
    n = '';

    //for loop for performing mul,div and modular operations;
    for (let i = 0; i < string.length; i++) {

        //if present operator is either + or - just leaving as it is and appending that to n
        if (string[i] == '+' || string[i] == '-') {
            n += a;
            n += string[i];
            a = '';
            console.log(n);
        }

        //if operator is mul,div or modular then performing the operation
        else if (string[i] == 'x' || string[i] == '÷' || string[i] == '%') {
            c = Number(a);
            console.log(`c = ${c}`);
            console.log(`n = ${n}`);
            let s = string[i];

            a = '';
            i++;
            while (i < string.length && (string[i] != '%' && string[i] != 'x' && string[i] != '+' && string[i] != '-' && string[i] != '÷')) {
                a += string[i++];
                console.log(`a = ${a}`);
            }
            d = Number(a);
            if (s == 'x')
                c = c * d;
            else {
                //if divisor is 0 then showing user that expression is error
                if (d == 0) {
                    let str = string;
                    string = "ERROR";
                    console.log(`Error = ${string}`);
                    p.innerHTML = string;
                    setTimeout(() => {
                        string = str;
                        p.innerHTML = string;
                    }, 2000);
                    return;
                }
                else if (s == '%') c = c % d;
                else c = c / d;
            }
            a = c;
            i--;
        }
        else a += string[i];

    }

    n += a;
    if (n.length)
        string = n;

    a = '';
    let s = '';
    if (s[0] != '-')
        s = '+';
    else s = '-';

    for (let i = 0; i < string.length; i++) {
        if (string[i] == '+' || string[i] == '-') {
            if (s == '+') {
                ans += Number(a);
                a = '';
                s = string[i];
            }
            else {
                ans -= Number(a);
                a = '';
                s = string[i];
            }
        }
        else a += string[i];
    }
    console.log(`ans = ${ans}`);
    if (s == '+') {
        ans += Number(a);
    }
    else {
        ans -= Number(a);
    }

    string = ans;
    p.innerHTML += "\n<br> = ";
    p.innerHTML += ans;

}