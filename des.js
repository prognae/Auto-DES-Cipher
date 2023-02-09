
function shiftLeftDES1(arr){
    var shifted = arr.shift()
    arr.push(shifted)
    return arr
}

function shiftLeftDES2(arr){
    var shifted = arr.shift()
    arr.push(shifted)

    var shifted2 = arr.shift()
    arr.push(shifted2)
    return arr
}

function convertpc2(arr){
    pc2 = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2,
        41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32]

    k = []

    for(i=0; i<pc2.length; i++){
        k.push(arr[pc2[i]-1])        
    }
    return k
}

async function convertDESstep1(arr){
    //pc1 is the 56-bit key
    pc1 = [ 57,49,41,33,25,17,9,1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11,   
            3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 
            53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4]    
    
    //initialization of c0 and d0 as an arrays
    c0 = []
    d0 = []

    //pushing pc-1 keys to c0 and d0
    for(i=0; i<pc1.length; i++){
        if(i < pc1.length/2){
            c0.push(arr[pc1[i]-1])
        }
        else if(i >= pc1.length/2){
            d0.push(arr[pc1[i]-1])
        }
        
    }
    //convert c0 and d0 to 16 48-bit keys using left shifts
    //shifts = 1,1,2,2,2,2,2,2,1,2,2,2,2,2,2,1

    //c shifts
    c1 = shiftLeftDES1(c0.slice())
    c2 = shiftLeftDES1(c1.slice())
    c3 = shiftLeftDES2(c2.slice())
    c4 = shiftLeftDES2(c3.slice())
    c5 = shiftLeftDES2(c4.slice())
    c6 = shiftLeftDES2(c5.slice())
    c7 = shiftLeftDES2(c6.slice())
    c8 = shiftLeftDES2(c7.slice())
    c9 = shiftLeftDES1(c8.slice())
    c10 = shiftLeftDES2(c9.slice())
    c11 = shiftLeftDES2(c10.slice())
    c12 = shiftLeftDES2(c11.slice())
    c13 = shiftLeftDES2(c12.slice())
    c14 = shiftLeftDES2(c13.slice())
    c15 = shiftLeftDES2(c14.slice())
    c16 = shiftLeftDES1(c15.slice())

    //d shifts
    d1 = shiftLeftDES1(d0.slice())
    d2 = shiftLeftDES1(d1.slice())
    d3 = shiftLeftDES2(d2.slice())
    d4 = shiftLeftDES2(d3.slice())
    d5 = shiftLeftDES2(d4.slice())
    d6 = shiftLeftDES2(d5.slice())
    d7 = shiftLeftDES2(d6.slice())
    d8 = shiftLeftDES2(d7.slice())
    d9 = shiftLeftDES1(d8.slice())
    d10 = shiftLeftDES2(d9.slice())
    d11 = shiftLeftDES2(d10.slice())
    d12 = shiftLeftDES2(d11.slice())
    d13 = shiftLeftDES2(d12.slice())
    d14 = shiftLeftDES2(d13.slice())
    d15 = shiftLeftDES2(d14.slice())
    d16 = shiftLeftDES1(d15.slice())

   
    //convertpc2 is the function that permutates c and d to k using pc2 table
     k1 = convertpc2(c1.concat(d1))
     k2 = convertpc2(c2.concat(d2))
     k3 = convertpc2(c3.concat(d3))
     k4 = convertpc2(c4.concat(d4))
     k5 = convertpc2(c5.concat(d5))
     k6 = convertpc2(c6.concat(d6))
     k7 = convertpc2(c7.concat(d7))
     k8 = convertpc2(c8.concat(d8))
     k9 = convertpc2(c9.concat(d9))
     k10 = convertpc2(c10.concat(d10))
     k11 = convertpc2(c11.concat(d11))
     k12 = convertpc2(c12.concat(d12))
     k13 = convertpc2(c13.concat(d13))
     k14 = convertpc2(c14.concat(d14))
     k15 = convertpc2(c15.concat(d15))
     k16 = convertpc2(c16.concat(d16))

}

function step2farraypush(num, arr){
    if(num.length < 4){
        numPad = num.padStart(4,0)
        for(i=0; i<4; i++){
            arr.push(parseInt(numPad[i]))
        }
    }
    else if(num.length == 4){
        for(i=0; i<4; i++){
            arr.push(parseInt(num[i]))
        }
    }
}

//step 2 finding f
function step2findf(arr, karr){
    ebit = [32,     1,    2,     3,     4,    5,
        4,    5,    6,     7,     8,    9,
        8,     9,   10,    11,    12,   13,
       12,    13,   14,    15,    16,   17,
       16,    17,   18,    19,    20,   21,
       20,    21,   22,    23,    24,   25,
       24,    25,   26,    27,    28,   29,
       28,    29,   30,    31,    32,    1]
    
    esubr0 = []
    for(i=0; i<ebit.length; i++){
        esubr0.push(arr[ebit[i]-1])        
    }
    
    //XOR (0 if similar, 1 if not)
    xor = []
    for(i=0; i<esubr0.length; i++){
        if(karr[i] == esubr0[i]){
            xor.push(0)
        }
        else if(karr[i] != esubr0[i]){
            xor.push(1)
        }
    }
    

    //rows and columns for s boxes
    s1row = parseInt('' + xor[0] + xor[5], 2)
    s2row = parseInt('' + xor[6] + xor[11], 2)
    s3row = parseInt('' + xor[12] + xor[17], 2)
    s4row = parseInt('' + xor[18] + xor[23], 2)
    s5row = parseInt('' + xor[24] + xor[29], 2)
    s6row = parseInt('' + xor[30] + xor[35], 2)
    s7row = parseInt('' + xor[36] + xor[41], 2)
    s8row = parseInt('' + xor[42] + xor[47], 2)

    s1col = parseInt('' + xor[1] + xor[2] + xor[3] + xor[4], 2)
    s2col = parseInt('' + xor[7] + xor[8] + xor[9] + xor[10], 2)
    s3col = parseInt('' + xor[13] + xor[14] + xor[15] + xor[16], 2)
    s4col = parseInt('' + xor[19] + xor[20] + xor[21] + xor[22], 2)
    s5col = parseInt('' + xor[25] + xor[26] + xor[27] + xor[28], 2)
    s6col = parseInt('' + xor[31] + xor[32] + xor[33] + xor[34], 2)
    s7col = parseInt('' + xor[37] + xor[38] + xor[39] + xor[40], 2)
    s8col = parseInt('' + xor[43] + xor[44] + xor[45] + xor[46], 2)

    //s boxes (s1 to s8)
    s1array = [
                [14,4,13,1,2,15,11,8,3,10,6,12,5,9,0,7], 
                [0, 15,   7,  4,  14,  2,  13,  1,  10 , 6 , 12, 11,   9,  5,   3,  8],
                [4,  1,  14,  8,  13,  6,   2, 11,  15, 12,   9,  7,   3, 10,   5,  0], 
                [15, 12,   8,  2,   4,  9,   1,  7,   5, 11,   3, 14,  10,  0,   6, 13]
            ]

    s2array = [
        [15,  1,   8, 14,   6, 11,   3,  4,   9,  7,   2, 13,  12,  0,   5, 10,],
        [3, 13,   4,  7,  15,  2,   8, 14, 12,  0,   1, 10,   6,  9,  11,  5],
        [0, 14,   7, 11,  10,  4,  13,  1,   5,  8,  12,  6,   9,  3,   2, 15],
        [13,  8,  10,  1,   3, 15,   4,  2,  11,  6,   7, 12,   0,  5,  14,  9]
    ]

    s3array = [
        [10,  0,   9, 14,   6,  3,  15,  5,   1, 13,  12,  7,  11,  4,   2,  8],
        [13,  7,   0,  9,   3,  4,   6, 10,   2,  8,   5, 14,  12, 11,  15, 1],
        [13,  6,   4,  9,   8, 15,   3,  0,  11,  1,   2, 12,   5, 10,  14,  7],
        [1, 10,  13,  0,   6,  9,   8,  7,   4, 15,  14,  3,  11, 5,   2, 12]
    ]

    s4array = [
        [7, 13,  14,  3,   0,  6,   9, 10,   1,  2,   8,  5,  11, 12,   4, 15],
        [13,  8,  11,  5,   6, 15,   0,  3,   4,  7,   2, 12,   1, 10,  14,  9],
        [10,  6,   9,  0,  12, 11,   7, 13,  15,  1,   3, 14,   5,  2,   8,  4],
        [3, 15,   0,  6,  10,  1,  13,  8,   9,  4,   5, 11,  12,  7,   2, 14]
    ]

    s5array = [
        [2, 12,   4,  1,   7, 10,  11,  6,   8,  5,   3, 15,  13,  0,  14,  9],
        [14, 11,   2, 12,   4,  7,  13,  1,   5,  0,  15, 10,  3,  9,   8,  6],
        [4,  2,   1, 11,  10, 13,   7,  8,  15,  9,  12,  5,   6,  3,   0, 14],
        [11,  8,  12,  7,   1, 14,   2, 13,   6, 15,   0,  9,  10,  4,   5,  3]
    ]

    s6array = [
        [12,  1,  10, 15,   9,  2,   6,  8,   0, 13,   3,  4,  14,  7,   5, 11],
        [10, 15,   4,  2,   7, 12,   9,  5,   6,  1,  13, 14,   0, 11,   3,  8],
        [9, 14,  15,  5,   2,  8,  12,  3,   7,  0,   4, 10,   1, 13,  11,  6],
        [4,  3,   2, 12,   9,  5,  15, 10,  11, 14,   1,  7,   6,  0,   8, 13]
    ]

    s7array = [
        [4, 11,   2, 14,  15,  0,   8, 13,   3, 12,   9,  7,   5, 10,   6,  1],
        [13,  0,  11,  7,   4,  9,   1, 10,  14,  3,   5, 12,   2, 15,   8,  6],
        [1,  4,  11, 13,  12,  3,   7, 14,  10, 15,   6,  8,   0,  5,   9,  2],
        [6, 11,  13,  8,   1,  4,  10,  7,   9,  5,   0, 15,  14,  2,   3, 12]
    ]

    s8array = [
        [13,  2,   8,  4,   6, 15,  11,  1,  10,  9,   3, 14,   5,  0,  12,  7],
        [1, 15,  13,  8,  10,  3,   7,  4,  12,  5,   6, 11,   0, 14,   9,  2],
        [7, 11,   4,  1,   9, 12,  14,  2,   0,  6,  10, 13,  15,  3,   5,  8],
        [2,  1,  14,  7,   4, 10,   8, 13,  15, 12,   9,  0,   3,  5,   6, 11]
    ]

    sArray = []

    s1 = s1array[s1row][s1col].toString(2)
    s2 = s2array[s2row][s2col].toString(2)
    s3 = s3array[s3row][s3col].toString(2)
    s4 = s4array[s4row][s4col].toString(2)
    s5 = s5array[s5row][s5col].toString(2)
    s6 = s6array[s6row][s6col].toString(2)
    s7 = s7array[s7row][s7col].toString(2)
    s8 = s8array[s8row][s8col].toString(2)
    
    step2farraypush(s1, sArray)
    step2farraypush(s2, sArray)
    step2farraypush(s3, sArray)
    step2farraypush(s4, sArray)
    step2farraypush(s5, sArray)
    step2farraypush(s6, sArray)
    step2farraypush(s7, sArray)
    step2farraypush(s8, sArray)

    //permutate sArray into the permutation table.
    p = [16,   7,  20,  21,
        29,  12,  28,  17,
         1,  15,  23,  26,
         5,  18,  31,  10,
         2,   8,  24,  14,
        32,  27,   3,   9,
        19,  13,  30,   6,
        22,  11,   4,  25]
    

    f = []
    for(i=0; i<p.length; i++){
        f.push(sArray[p[i]-1])        
    }
    return f
}

function xorlr(arr1, arr2){
    xorarr = []
    for(i=0; i<arr1.length; i++){
        if(arr1[i] == arr2[i]){
            xorarr.push(0)
        }
        else if(arr1[i] != arr2[i]){
            xorarr.push(1)
        }
    }
    return xorarr
}

function step2finalpermutation(arr){
    ip = [40,     8,   48,    16,    56,   24,    64,   32,
        39,     7,   47,    15,    55,   23,    63,  31,
        38,     6,   46,    14,    54,   22,    62,   30,
        37,     5,   45,    13,    53,   21,    61,   29,
        36,     4,   44,    12,    52,   20,    60,   28,
        35,     3,   43,    11,    51,   19,    59,   27,
        34,     2,   42,    10,    50,   18,    58,   26,
        33,     1,   41,     9,    49,   17,    57,   25]

    finalArr = []
    for(i=0; i<ip.length; i++){
        finalArr.push(arr[ip[i]-1])        
    }

    return finalArr
}

function convertDESstep2(arr){
    //converts the M or the message (which is the passed array) into l0 and r0 using the ip table
    ip = [58,50,42,34,26,18,10,2,60,52,44,36,28,20,12,4,62,54,46,38,30,22,14,6,64,56,48,40,32,24,16,8,
          57,49,41,33,25,17,9,1,59,51,43,35,27,19,11,3,61,53,45,37,29,21,13,5,63,55,47,39,31,23,15,7]
    
    l0 = []
    r0 = []

    for(i=0; i<ip.length; i++){
        if(i < ip.length/2){
            l0.push(arr[ip[i]-1])
        }
        else if(i >= ip.length/2){
            r0.push(arr[ip[i]-1])
        }        
    }    
    // step2findf(r0)
    l1 = r0
    r1 = xorlr(l0, step2findf(r0, k1))
    l2 = r1
    r2 = xorlr(l1, step2findf(r1, k2))
    l3 = r2
    r3 = xorlr(l2, step2findf(r2, k3))
    l4 = r3
    r4 = xorlr(l3, step2findf(r3, k4))
    l5 = r4
    r5 = xorlr(l4, step2findf(r4, k5))
    l6 = r5
    r6 = xorlr(l5, step2findf(r5, k6))
    l7 = r6
    r7 = xorlr(l6, step2findf(r6, k7))
    l8 = r7
    r8 = xorlr(l7, step2findf(r7, k8))
    l9 = r8
    r9 = xorlr(l8, step2findf(r8, k9))
    l10 = r9
    r10 = xorlr(l9, step2findf(r9, k10))
    l11 = r10
    r11 = xorlr(l10, step2findf(r10, k11))
    l12 = r11
    r12 = xorlr(l11, step2findf(r11, k12))
    l13 = r12
    r13 = xorlr(l12, step2findf(r12, k13))
    l14 = r13
    r14 = xorlr(l13, step2findf(r13, k14))
    l15 = r14
    r15 = xorlr(l14, step2findf(r14, k15))
    l16 = r15
    r16 = xorlr(l15, step2findf(r15, k16))
    

    console.log(step2finalpermutation(r16.concat(l16)))
    
    
    //lsubN = rsubn-1 -- rsubn = lsubn-1 XOR f(rsubn-1, ksubn)

}

binMessage1 = [1,1,1,1, 1,0,1,0, 1,1,0,1, 1,1,1,0, 1,1,0,1, 1,1,0,1, 1,1,1,0, 1,1,0,0, 1,0,1,0, 1,1,1,1, 0,0,0,0, 0,0,0,1, 0,1,1,0, 0,1,1,0, 1,0,0,1, 0,0,1,0]
convertDESstep1(binMessage1)



binMessage2 = [1,0,1,1, 1,1,1,0, 1,0,1,0, 1,1,0,1, 1,1,0,0, 1,0,1,0, 1,1,1,1, 1,1,1,0, 0,0,0,0, 1,0,1,0, 0,1,0,0, 0,1,0,1, 1,0,0,1, 0,0,0,0, 0,1,1,0, 0,1,1,1]
convertDESstep2(binMessage2)


