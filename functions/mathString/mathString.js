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
    if (str.includes("e") || str.includes("oo")) {
        return true
    }
    return !isSimbol(str)
}
    
isSimbol = (str) => {
    return (str === "" || str.includes(" ") || str.includes("+") || str === "-" || str.includes("*") || str.includes("/") || str.includes("c") || str.includes("÷") || (str.includes("(") && str.length === 2 && str.includes(")")) || str.includes("quad"))
}

lnStr = (number) => {
    let number=Number(number) ? Number(number) : 0.0
    return Math.log(number).toString()
}

log10Str = (number) => {
    let number=Number(number) ? Number(number) : 0.0
    return Math.log10(number).toString()
}

log2Str = (number) => {
    let number=Number(number) ? Number(number) : 0.0
    return Math.log2(number).toString()
}

cosStr = (number,degrad) => {
    let number = Number(number) ? Number(number) : 0.0

    if (degrad === 1) {
        number = (number / Math.PI) * 180
    }

    number = Math.cos(number * Math.PI / 180)

    return `${number}`
}

senStr = (number, degrad) => {
    let number = Number(number) ? Number(number) : 0.0

    if (degrad===1) {
        number = number / Math.PI * 180
    }

    number = Math.sin(number * Math.PI / 180)

    return `${number}`
}

tanStr = (number, degrad) => {
    let number = Number(number) ? Number(number) : 0.0

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
        let re = new RegExp('e','g');
        str=str.replace(re, "")
        let zeros = ""

        while (str[str.length-1] !== "+" && str[str.length-1] !== "-") {
            zeros = `${str.pop()}${zeros}`
        }

        let arr = str.split(".")
        re = new RegExp('.','g');
        str=str.replace(r, "")
        if (str.pop() === "+") {
            let c = (parseInt(zeros) ? parseInt(zeros) : 0)
            c -= arr[1].length
            while (c > 0)  {
                str+="0"
                c-=1
            }
        } else {
            let c = (parseInt(zeros) ? parseInt(zeros) : 0)
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
            
            if ((parseInt(Stack1[digits]) ? parseInt(Stack1[digits]) : 0) > 4) {
                if ((parseInt(Stack1[digits - 1]) ? parseInt(Stack1[digits - 1]) : 0) === 9) {
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
    let a = Number(numberA) ? Number(numberA) : 0.0
    let b = Number(numberB) ? Number(numberB) : 0.0
    let str = Math.pow(a,b)
    let re = new RegExp('inf', 'g')
    str=str.replace(re, "oo")
    return str
}

sqrtStr = (numberA, numberB) => {
    let a = Number(numberA) ? Number(numberA) : 0.0
    let b = 1 / (Number(numberB) ? Number(numberB) : 2.0)
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
    let re = new RegExp('-','g')
    divA=divA.replace(re, "")
    divB=divB.replace(re, "")
    
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
    re = new RegExp('.','g')
    divA=divA.replace(re, "")
    divB=divB.replace(re, "")
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
MCD = (a, b) => {
        
        if (b !== "0") {
            
            return MCD(b, residuo(a,b))
        
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
    let re = new RegExp('inf','g')
    numberA=numberA.replace(re, "0")
    numberB = numberB.replace(re, "0")
    re = new RegExp('nan','g')
    numberA=numberA.replace(re, "0")
    numberB = numberB.replace(re, "0")
    re = new RegExp('NaN', 'g')
    numberA = numberA.replace(re, "0")
    numberB = numberB.replace(re, "0")

    let bandminus = numberA.includes("-") && numberB.includes("-")
    if (numberA.includes("-") && !numberB.includes("-")) {
        return false
    }
    
    if (!numberA.includes("-") && numberB.includes("-")) {
        return true
    }
    
    re = new RegExp('-', 'g')
    numberA=numberA.replace(re, "")
    numberB=numberB.replace(re, "")
    
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
            let a = parseInt(n1) ? parseInt(n1) : 0
            let b = parseInt(StackB[0]) ? parseInt(StackB[0]) : 0
            
            if  (a > b) {
            
                return !bandminus
                
            }else if (a !== b){
            
                return bandminus

            }
            
        }
            StackB.pop()
        }
    }
    
    return false
}

    func dividestr(_ numberA: String,_ numberB: String,_ LimitDigits: Int)->String{
        //declare and mov method vars to local vars
        var divA=cleanRSTR(numberA)
        var divB=cleanRSTR(numberB) //a/b
        var bandminus = false
        var countDot = 0
        var Result=""
        var bandDot=false

        if divB == "1"{
            return numberA
        }

        bandminus=(divA.contains("-") && !divB.contains("-"))||(!divA.contains("-") && divB.contains("-"))

        if divA == "0" && divB == "0" {
            return "(NaN) quad Not quad a quad Number"
        }

        if divA == "0" {
            return "0"
        }

        if divB == "0" {
            return "oo"
        }

        if divA.contains("."){
            let partDecimal = divA.components(separatedBy: ".")[1]
            countDot = -partDecimal.count
            bandDot=true
        }

        if divB.contains("."){
            countDot+=divB.components(separatedBy: ".")[1].count
            bandDot=true
        }

        divA=divA.replacingOccurrences(of: "-", with: "")
        divB=divB.replacingOccurrences(of: "-", with: "")
        divA=divA.replacingOccurrences(of: ".", with: "")
        divB=divB.replacingOccurrences(of: ".", with: "")
        divA=cleanRSTR(divA)
        divB=cleanRSTR(divB)

        var StackA=Array(divA)
        var residuos=""
        var LimitDigits=LimitDigits
        var mult="0"


        //div process
        if(StackA.count>0){
            //a/b, divA empty, while b>a take first element to the array and put into divA
            divA=""
            if(BiggerThan(divB, divA)){
                divA+=StackA.removeFirst().description
                countDot+=1
            }
            while(BiggerThan(divB, divA) && !StackA.isEmpty){
                divA+=StackA.removeFirst().description
            }
            //if stack count == 0, complement with Zeros to div and result, countDot add 1
            if(StackA.isEmpty){
                if(BiggerThan(divB, divA)){
                    bandDot=true
                while(BiggerThan(divB, divA)){
                    divA+="0"
                    countDot-=1
                }
              }
            }
        }

        //a/b, subtract a to b, a-b, who many a contains b redundant
        while(residuos != "0" && LimitDigits>0){

            while(BiggerThan(divA, divB)||divA==divB){
                divA=minusstr(divA,divB)
                mult=plusstr(mult,"1")
            }

            Result+=mult
            if(StackA.count>0){
                if(BiggerThan(divB, divA)){
                    divA+=StackA.removeFirst().description
                    countDot+=1
                }
                while(BiggerThan(divB, divA) && !StackA.isEmpty){
                    divA+=StackA.removeFirst().description
                    Result+="0"
                    countDot+=1
                }
                divA=cleanRSTR(divA)
                if BiggerThan(divB, divA) && StackA.isEmpty {
                    if divA == "0"{
                        Result+="0"
                    } else {
                        bandDot=true
                        while(BiggerThan(divB, divA)){
                            divA+="0"
                            Result+="0"
                        }
                    }
                }
          }

            mult="0"
            LimitDigits-=1
            divA=cleanRSTR(divA)
            residuos=divA

            if(StackA.count==0){
                if(divA != "0" && BiggerThan(divB, divA)){
                    divA+="0"
                    bandDot=true
                    while(BiggerThan(divB, divA)){
                        divA+="0"
                        Result+="0"
                    }
               }
            }
        }

        //appending dot on the correct position
        if(bandDot){
            if(countDot>0){
                StackA=Array(Result)
                if(StackA.count>countDot){
                    StackA.insert(".", at: countDot)
                }else{
                    countDot-=1
                    while(countDot>0){
                        StackA.append("0")
                        countDot-=1
                    }
                }

                Result=StackA+""
            }else{
                StackA=Array(Result)
                countDot-=1
                while(countDot<0){
                    StackA.insert("0", at: 0)
                    countDot+=1
                }
                StackA.insert(".", at: 1)
                Result=StackA+""
            }
        }

        if bandminus {
            Result="-"+Result
        }

        return cleanRSTR(Result)
    }

    
    func forstr(_ numberA: String,_ numberB: String)->String{
        var numberA=numberA
        var numberB=numberB
        var bandminus = false
        let banddecimal = numberA.contains(".") || numberB.contains(".")
        var countDot = 0
        var Result=""
        var carry=0
        
        if numberA.contains("-") && !numberB.contains("-"){
            bandminus=true
        }
        
        if numberB.contains("-") && !numberA.contains("-"){
            bandminus=true
        }
        
        if numberA.contains("."){
            countDot+=numberA.components(separatedBy: ".")[1].count
        }
        
        if numberB.contains("."){
           countDot+=numberB.components(separatedBy: ".")[1].count
        }
        
        numberA=numberA.replacingOccurrences(of: "-", with: "")
        numberB=numberB.replacingOccurrences(of: "-", with: "")

        if numberA == "oo" || numberB == "oo" {
            return "oo"
        }

        if LessThan(numberA, numberB){
            let aux=numberA
            numberA=numberB
            numberB=aux
        }
        
        numberA=numberA.replacingOccurrences(of: ".", with: "")
        numberB=numberB.replacingOccurrences(of: ".", with: "")
       
        let StackA=Array(numberA.reversed())
        let StackB=Array(numberB.reversed())

        
       var StackPlus=Array<String>()
       var countA=0
       var countB=0
       
        for n1 in StackB {
         StackPlus.append("")
            for n2 in StackA{
                let nI1 = (Int(String(n1)) ?? 0)
                let nI2 = (Int(String(n2)) ?? 0)
                let x = String(nI1*nI2+carry)
                
                if countA < (StackA.count-1) && x.count > 1{
            
                carry=Int(String(Array(x)[0]))!
                    
                StackPlus[StackPlus.count-1]=String(Array(x)[1])+StackPlus[StackPlus.count-1]
                    
                }else{
                    StackPlus[StackPlus.count-1]=x+StackPlus[StackPlus.count-1]
                    carry=0
                }
                countA+=1
            }
            
            if StackB.count > 1{

                if countB == 0{
                    var auxStack = Array(StackPlus.removeFirst())
                    Result=String(auxStack.removeLast())+Result
                    StackPlus.append(String(auxStack))
                }else{
                    
                    var auxStack = Array(cleanRSTR(plusstr(StackPlus.removeFirst(), StackPlus.removeFirst())))
                    
                    if countB < (StackB.count-1){
                    Result=String(auxStack.removeLast())+Result
                    }
                    
                    StackPlus.append(String(auxStack))
                }
            }

            countA=0
            countB+=1
        }

        if StackPlus.count > 0 {
        Result=String(StackPlus.first!)+Result
        }else{
            Result="00"
        }
        
        if banddecimal {
            var arr=Array(Result)
            countDot=arr.count-countDot
            if countDot < 0{
                countDot *= -1
                while countDot > 0 {
                    arr.insert("0", at: 0)
                    countDot -= 1
                }
                arr.insert(".", at: 0)
            }else{
                arr.insert(".", at: countDot)
            }
            Result=String(arr)
        }
        
      
        if bandminus{
            Result="-"+Result
        }
        return cleanRSTR(Result)
    }
    
    func DoubleStr(_ str: String)->String{
        var arr=Array(str)
        var bandminus = false

        if str == "." || str == ""{
            return "0"
        }
        if arr.first! == "-"{
            arr.removeFirst()
            bandminus=true
        }
        if arr.first! == "."{
            arr.insert("0", at: 0)
        }

        if arr.last! == "."{
            arr.removeLast()
        }
        if bandminus{
            arr.insert("-", at: 0)
        }
        /*arr.withUnsafeBufferPointer { ptr in
            return String(cString: ptr.baseAddress!)
        }*/
        return String(arr)
    }
    
    func lengthCount(_ str: String)->Int{
        var count = 0
        var arr: Array! = Array(str)

        if arr != nil {

        while arr.first! != "." {
            arr.removeFirst()
            count+=1
        }
            
        }
        return count
    }
    
    func minusstr(_ numberA: String,_ numberB: String)->String{
        var numberA=numberA
        var numberB=numberB
        var bandminus = false
        var Result=""
        var count=0
        var carry=0
        
        if numberA == numberB {
            return "0"
        }
        
        if numberA.contains("-")&&numberB.contains("-"){
            return plusstr(numberB.replacingOccurrences(of: "-", with: ""), numberA)
        }
        
        if numberA.contains("-"){
            return "-"+plusstr(numberA.replacingOccurrences(of: "-", with: ""), numberB)
        }
        
        if numberB.contains("-"){
            return plusstr(numberA, numberB.replacingOccurrences(of: "-", with: ""))
        }
        
        if LessThan(numberA, numberB){
            bandminus=true
        }
        
        if LessThan(numberB, numberA){
            let aux=numberA
            numberA=numberB
            numberB=aux
        }

        if numberA == "oo" || numberB == "oo" {
            return "oo"
        }
        
        if !numberA.contains("."){
            numberA+=".0"
        }
        
        if !numberB.contains("."){
            numberB+=".0"
        }
        var countA=numberA.components(separatedBy: ".")[1].count
        var countB=numberB.components(separatedBy: ".")[1].count
        var dif = 0
        var i=0
        
        if countA < countB{
            dif = countB-countA
            while i<dif {
                numberA+="0"
                i+=1
            }
        }else{
            dif = countA-countB
            while i<dif {
                numberB+="0"
                i+=1
            }
        }

        countA=numberA.components(separatedBy: ".")[0].count
        countB=numberB.components(separatedBy: ".")[0].count
        dif = 0
        i=0
        
        if countA < countB{
            dif = countB-countA
            while i<dif {
                numberA="0"+numberA
                i+=1
            }
        }else{
            dif = countA-countB
            while i<dif {
                numberB="0"+numberB
                i+=1
            }
        }
        let countDot=lengthCount(numberA)
        
        numberA=numberA.replacingOccurrences(of: ".", with: "")
        numberB=numberB.replacingOccurrences(of: ".", with: "")
        var StackA=Array(numberA)
        var StackB=Array(numberB)
        StackB=StackB.reversed()
        StackA=StackA.reversed()
        
        
        while count < StackA.count {
           if 0 < StackB.count /*&& String(StackA[count]) != "." && String(StackB.first!) != "."*/ {
            let a = Int(String(StackA[count])) ?? 0
            var b = Int(String(StackB.removeFirst())) ?? 0
            b+=carry
            if b < a{
                b+=10
                let rest = b-a
                carry = -1
                Result=String(rest)+Result
            }else{
                let rest = b-a
                Result=String(rest)+Result
                carry=0
            }
                
            }else{
                Result=String(Int(String(StackB.first!))!+carry)+Result
                carry=0
            }

            count+=1
        }
        
        while !StackB.isEmpty {
            Result=String(StackB.removeFirst())+Result
        }
        
        var arr = Array(Result)
        arr.insert(".", at: countDot)


        Result = String(arr)
        
        if bandminus{
            Result="-"+Result
        }

        return cleanRSTR(Result)
    }
    
    func plusstr(_ numberA: String,_ numberB: String)->String{
        var numberA=numberA
        var numberB=numberB
        if numberA.contains("-") && !numberB.contains("-"){
            return minusstr(numberB, numberA.replacingOccurrences(of: "-", with: ""))
        }
        if numberB.contains("-") && !numberA.contains("-"){
            return minusstr(numberA, numberB.replacingOccurrences(of: "-", with: ""))
        }
        let bandminus = numberB.contains("-") && numberA.contains("-")
        
        numberA=numberA.replacingOccurrences(of: "-", with: "")
        numberB=numberB.replacingOccurrences(of: "-", with: "")

        if numberA == "oo" || numberB == "oo" {
            return "oo"
        }

        if !numberA.contains("."){
            numberA+=".0"
        }
        
        if !numberB.contains("."){
            numberB+=".0"
        }
        
        var countA=numberA.components(separatedBy: ".")[1].count
        var countB=numberB.components(separatedBy: ".")[1].count
        var dif = 0
        var i=0
        
        if countA < countB{
            dif = countB-countA
            while i<dif {
                numberA+="0"
                i+=1
            }
        }else{
            dif = countA-countB
            while i<dif {
                numberB+="0"
                i+=1
            }
        }
        
        countA=numberA.components(separatedBy: ".")[0].count
        countB=numberB.components(separatedBy: ".")[0].count
        dif = 0
        i=0
        
        if countA < countB{
            dif = countB-countA
            while i<dif {
                numberA="0"+numberA
                i+=1
            }
        }else{
            dif = countA-countB
            while i<dif {
                numberB="0"+numberB
                i+=1
            }
        }
        var countDot=lengthCount(numberA)
        
        numberA=numberA.replacingOccurrences(of: ".", with: "")
        numberB=numberB.replacingOccurrences(of: ".", with: "")
        
        var StackA=Array(numberA.reversed())
        var StackB=Array(numberB.reversed())
        var Result=""
        var count=0
        var carry=0

        while count < StackA.count {
            if 0 < StackB.count {

                let a = Int(StackA[count].description) ?? 0
                let b = (Int(StackB.removeFirst().description) ?? 0)+carry

                var sum = a+b
                if sum>9 {
                    sum-=10
                    carry = 1
                    Result=String(sum)+Result
                    StackA.append("0")
                    StackB.append("0")
                    countDot+=1
         
                }else{
                    Result=String(sum)+Result
                    carry=0
                }
                
            }else{
                Result=String(Int(StackB.first!.description)!+carry)+Result
                    carry=0
            }
            
            count+=1
        }
        
        var arr = Array(Result.map { String($0) })
        arr.insert(".", at: countDot) 
        Result = arr.joined()

        if bandminus {
            Result="-"+Result
        }
        return cleanRSTR(Result)
        
    }
//}