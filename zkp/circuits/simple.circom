pragma circom 2.0.0;

template Simple(){
    signal input a;
    signal input b;
    signal output res;
    var c = 5;
    var sum = a*b+c;

    res <== sum;
    res === 11; // a*b+5 == 11;
}

component main = Simple();
