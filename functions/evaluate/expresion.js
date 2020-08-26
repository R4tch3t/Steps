isEqualAfter = (strArr, i, j, k, rstr, List) => {
    k=k-j
    let x=0
    let flag = List.length!==0
    let auxStr=""
    let OP=[]
    
    while (i<=k) {
        x=0;
        auxStr="";
        
        if (/*strArr[i] === "-" ||*/ (strArr.length<(i+1) && strArr[i+1] === "(") || strArr[i] === "("){
            OP.push(strArr[i])
            flag=true
        }
        
        if (strArr[i] === ")"){
            OP.pop()

            if (OP.length===0){
                if (flag) {
                return false
                }
                
            }
            
        }
        
        while (x<j){
            auxStr+=strArr[x+i]
            x+=1
            
        }

        if (auxStr == rstr && flag){
            return true
        }
        
        i+=1
    }
    
    return false
}

nDigits=(n1, n2) => {
    let c = 0;
    
    if (n1.includes(".")) {
        c = n1.split(".")[1].length
    }

    if (n2.includes(".")) {
        let a = n2.split(".")[1].length
        if (c < a) {
            c = a
        }
    }
    let divisor = Math.pow(10.0, Number(c))
    return divisor
}

place=(n1,n2) => {
    let c = 0;

    if (n1.includes(".")) {
        c = n1.split(".")[1].length
    }

    if (n2.includes(".")) {
        c += n2.split(".")[1].length
    }

    let divisor = Math.pow(10.0, Number(c))
    return divisor
}

