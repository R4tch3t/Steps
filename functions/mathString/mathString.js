//
//  MathString.swift
//  Calculus Lite
//
//  Created by Victor Manuel Santamaria on 1/9/17.
//  Copyright © 2017 Victor Manuel Santamaria. All rights reserved.
//


//class MathString: NSObject {
    
cleanRSTR= (str) => {
    let aux="", rstr=".0"
    let arrStr = str.split('')
    //var str = str
    let bandminus = false
    let i=0, j=0, k=0

    if (str === "" || str === " " || str === "0" || str === "00" || str === "NaN" || str === "nan" || str === "inf")
    {
        return "0"
    }

    if (arrStr.length>0) {
        if (arrStr[0] === "-") {
            bandminus=true
        }
        if (arrStr[arrStr.length-1] === ".") {
            arrStr.pop()
        }
        if (arrStr.length === 1 && arrStr[0] === "0") {
            return "0"
        }
        
        if (arrStr[0] === "-") {
            str=(arrStr.shift()).toString()
        }
        
        var countLeft=0
        if (str.includes(".")) {

            countLeft=str.split(".")[0].length
            
            while(arrStr.length>0&&arrStr[0] === "0"&&countLeft>1){
                arrStr.shift()
                countLeft-=1
            }
            
            countLeft=str.split(".")[1].length

            while(arrStr.length>0&&arrStr[arrStr.length-1] === "0"&&countLeft>1){
                arrStr.pop()
                countLeft-=1
            }
            
        }else{
        
            while(arrStr.length>1&&arrStr[0] === "0"){
                arrStr.shift()
            }
        }
    }
    str = ""
    
    while (i<arrStr.length) {
        k=i
        aux=""
        
        if((i+2)<=arrStr.length){
            while (j<2) {
                aux+=arrStr[k].toString()
                j+=1
                k+=1
            }
        }
        
        if(aux===rstr){
            
            if (i+2>=arrStr.length) {
                break
            }
            str+=arrStr[i].toString()
        }
        else{
            str+=arrStr[i].toString()
        }
        j=0;
        i+=1;
    }

    if(str[0]==="."){
        str = `0${str}`
        //str.insert("0", at: str.startIndex)
    }
    
    if (bandminus) {
        str="-"+str
    }
    return str
}
    
isNumber = (str) => {
    var str = `${str}`
    if (str.includes("e") || str.includes("oo") || str.includes("I n f i n i t y")) {
        return true
    }
    str=str.split("(").join("")
    str=str.split(")").join("")
    console.log(`isNum: ${str}`)
    return !isSimbol(str)
}
    
isSimbol = (str) => {
    return (str === "" || str.includes(" ") || str.includes("+") || str === "-" 
    || str.includes("*") || str.includes("/") || str.includes("c") || str.includes("÷") 
    /*|| (str.includes("(") && str.length === 2 && str.includes(")"))*/ || str.includes("quad")
    || str === null || str===undefined || isNaN(str))
}

lnStr = (number) => {
    number = isNumber(number) ? Number(number) : 0.0
    return Math.log(number).toString().split("Infinity").join("I n f i n i t y")
}

log10Str = (number) => {
    number = isNumber(number) ? Number(number) : 0.0
    return Math.log10(number).toString()
}

log2Str = (number) => {
    number = isNumber(number) ? Number(number) : 0.0
    return Math.log2(number).toString()
}

cosStr = (number,degrad) => {
    number = isNumber(number) ? Number(number) : 0.0

    if (degrad === 1) {
        number = (number / Math.PI) * 180
    }

    number = Math.cos(number * Math.PI / 180)

    return `${number}`
}

senStr = (number, degrad) => {
    number = isNumber(number) ? Number(number) : 0.0

    if (degrad===1) {
        number = number / Math.PI * 180
    }

    number = Math.sin(number * Math.PI / 180)

    return `${number}`
}

tanStr = (number, degrad) => {
    number = isNumber(number) ? Number(number) : 0.0

    if (degrad===1) {
        number = number / Math.PI * 180
    }

    number = Math.tan(number * Math.PI / 180)
    return `${number}`
}
    
absstr = (str) => {
    if (str === "") {
        return str
    }

    let arr=str.split('')

    if (arr[0] === "-") {
        arr.shift()
    }
    
    return arr.join('')
}

moreDStr = (str) => {
    //var str=str
    if (str.includes("e")) {
        str=str.split('e').join("")
        let zeros = ""

        while (str[str.length-1] !== "+" && str[str.length-1] !== "-") {
            zeros = `${str.pop()}${zeros}`
        }

        let arr = str.split(".")
        str=str.split('.').join("")
        if (str.pop() === "+") {
            let c = (isNumber(zeros) ? parseInt(zeros) : 0)
            c -= arr[1].length
            while (c > 0)  {
                str+="0"
                c-=1
            }
        } else {
            let c = (isNumber(zeros) ? parseInt(zeros) : 0)
            c--
            while (c > 0)  {
                str="0"+str
                c-=1
            }
            str="0."+str
        }

    }
    return str
}
    //"Rasurar" cadena
ShaveStr = (str, digits) => {
    //let str=str

    str = moreDStr(str)

    if (str.includes(".")) {        
        var StackStr=str.split(".")
        var Stack1 = StackStr[1].split("")

        //  str=StackStr[0]+"."
        if (Stack1.length > digits) {
            
            if ((isNumber(Stack1[digits]) ? parseInt(Stack1[digits]) : 0) > 4) {
                if ((isNumber(Stack1[digits - 1]) ? parseInt(Stack1[digits - 1]) : 0) === 9) {
                //Efecto domino inverso a la cadena
                    let i = digits-1
                    Stack1[i]="0"
                    i -= 1
                    if (Stack1[i] === "9") {
                        while (Stack1[i] === "9" && i > 0) {
                            Stack1[i]="0"
                            i -= 1
                        }
                    }
                
                if (i === 0) {
                    if (Stack1[i] === "9") {
                        Stack1[i]="0"
                        StackStr[0]=plusstr(StackStr[0], "1")
                    }else{
                        let n = plusstr(Stack1[i], "1")
                        Stack1[i]=n
                    }
                }else{
                    let n = plusstr(Stack1[i], "1")
                    Stack1[i]=n
                }
                
            }else{
                let n = plusstr(Stack1[digits-1],"1")
                Stack1[digits-1]=n
            }
        }
        
        str=StackStr[0]+"."
        let i = 0
        while (i < digits) {
            str+=Stack1[i]
            i += 1
        }
        
    }
        
}
    
return cleanRSTR(str)
}
    
addZeros = (N) => {
    let str = "1"
    let i = 0
    while (i<N) {
        str=str+"0"
        i+=1
    }
    return str
}
    
powStr = (numberA, numberB) => {
    let a = isNumber(numberA) ? Number(numberA) : 0.0
    let b = isNumber(numberB) ? Number(numberB) : 0.0
    let str = Math.pow(a,b).toString()
    str=str.split('inf').join("oo")
    return str
}

sqrtStr = (numberA, numberB) => {
    let a = isNumber(numberA) ? Number(numberA) : 0.0
    let b = 1 / (isNumber(numberB) ? Number(numberB) : 2.0)
    return Math.pow(a,b).toString()       
}
    
isFrac = (Str) => {
    return Str.includes("/") || isNumber(Str)
}
    
    //a%b
residuo = (numberA, numberB) => {
    let divA=numberA
    let divB=numberB

    divA=cleanRSTR(divA)
    divB=cleanRSTR(divB)
    
    if (divA==="1" && divB==="1") {
        return "0"
    }
    
    if (divA==="1" || divB==="1") {
        return "1"
    }
    divA=divA.split('-').join("")
    divB=divB.split('-').join("")
    
    if (LessThan(divA, divB)) {
        return divA
    }
    
    if (divB === "1") {
        return numberA
    }
    
    if (divA === "0" && numberB === "0") {
        return "nan"
    }
    
    if (divA === "0") {
        return "0"
    }
    
    if (divB === "0") {
        return "inf"
    }
    divA=divA.split('.').join("")
    divB=divB.split('.').join("")
    divA=cleanRSTR(divA)
    divB=cleanRSTR(divB)

    let StackA=divA.split('')
    let residuos=""

    //div process
    if(StackA.length>0){
        //a/b, divA empty, while b>a take first element to the array and put into divA
        divA=""
    }

    //a/b, subtract a to b, a-b, who many a contains b redundant
    while(StackA.length>0){
        while(BiggerThan(divB, divA) && StackA.length>0){
            divA+=StackA.shift()
        }
        while(BiggerThan(divA, divB)){
            divA=minusstr(divA,divB)
        }

        if (divA===divB) {
            residuos="0"
            divA=""
        }else{
            residuos=divA
        }
    }

    return residuos
    }

    //Maximo Común Divisor
MCDStr = (a, b) => {
        if (b !== "0") {
            
            return MCDStr(b, residuo(a,b))
        
        }
        
        return a
    }
    
    //Menor que
LessThan = (numberA, numberB) => {
    return !BiggerThan(numberA, numberB) && numberA !== numberB
}
    
    //Mayor que
BiggerThan = (numberA, numberB) => {
    //let numberA=numberA
    //let numberB=numberB
    
    if (numberA === "" || numberA === " ") {
        return false
    }

    if (numberB === "") {
        return true
    }
    numberA=numberA.split('inf').join("0")
    numberB = numberB.split('inf').join("0")
    numberA=numberA.split('nan').join("0")
    numberB = numberB.split('nan').join("0")
    numberA = numberA.split('NaN').join("0")
    numberB = numberB.split('NaN').join("0")

    let bandminus = numberA.includes("-") && numberB.includes("-")
    if (numberA.includes("-") && !numberB.includes("-")) {
        return false
    }
    
    if (!numberA.includes("-") && numberB.includes("-")) {
        return true
    }
    
    numberA=numberA.split('-').join("")
    numberB=numberB.split('-').join("")
    
    if (numberA === numberB) {
        return false
    }
    
    if (!numberA.includes(".")){
        numberA+=".0"
    }
    if (!numberB.includes(".")) {
        numberB+=".0"
    }
    
    if (numberA.split(".")[0]==="") {
        numberA="0"+numberA
    }
    
    if (numberB.split(".")[0]==="") {
        numberB="0"+numberB
    }
    
    let countA=numberA.split(".")[1].length
    let countB=numberB.split(".")[1].length
    let dif = 0
    let i=0
    
    if (countA < countB) {
        dif = countB-countA
        while (i<dif) {
            numberA+="0"
            i+=1
        }
    }else{
        dif = countA-countB
        while (i<dif) {
            numberB+="0"
            i+=1
        }
    }
    
    countA=numberA.split(".")[0].length
    countB=numberB.split(".")[0].length
    dif = 0
    i=0
    
    if (countA < countB) {
        dif = countB-countA
        while (i<dif) {
            numberA="0"+numberA
            i+=1
        }
    }else{
        dif = countA-countB
        while (i<dif) {
            numberB="0"+numberB
            i+=1
        }
    }

    let StackA=numberA.split('')
    let StackB=numberB.split('')
    
    if (StackB.length > StackA.length) {
        let auxS=StackA
        StackA=StackB
        StackB=auxS
    }
    
    for (i in StackA) {
        let n1 = StackA[i]
        if (0 < StackB.length) {
        if (n1 !== ".") {
            let a = isNumber(n1) ? parseInt(n1) : 0
            let b = isNumber(StackB[0]) ? parseInt(StackB[0]) : 0
            
            if  (a > b) {
            
                return !bandminus
                
            }else if (a !== b){
            
                return bandminus

            }
            
        }
            StackB.shift()
        }
    }
    
    return false
}
    
DoubleStr = (str) => {
    let arr=str.split('')
    let bandminus = false

    if (str === "." || str === "") {
        return "0"
    }
    if (arr[0] === "-") {
        arr.shift()
        bandminus=true
    }
    if (arr[0] === ".") {
        //arr.insert("0", at: 0)
        arr.splice(0, 0, "0")
    }

    if (arr[arr.length-1] === ".") {
        arr.pop()
    }
    if (bandminus) {
        //arr.insert("-", at: 0)
        arr.splice(0, 0, "-")
    }
    /*arr.withUnsafeBufferPointer { ptr in
        return String(cString: ptr.baseAddress!)
    }*/
    return arr.join('')
}
    
lengthCount = (str) => {
    let count = 0
    let arr = str.split('')

    if (arr.length>0) {

    while (arr[0] !== ".") {
        arr.shift()
        count+=1
    }
        
    }
    return count
}
    
    
//}