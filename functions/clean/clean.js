//
//  Clean.swift
//  Calculus Lite
//
//  Created by Victor Manuel Santamaria on 09/11/16.
//  Copyright © 2016 Victor Manuel Santamaria. All rights reserved.
//    
    
    prepareStrDevelopment=(str, rstr)=>{

        str = str.toLowerCase()
        strDevelopment = strDevelopment.toLowerCase()
        strDevelopment = strDevelopment.split(str).join(rstr)
        //strDevelopment = strDevelopment.replace(`/${str}/gi`, `${rstr}`)
    }

    Pref=(op)=>{
        let prf=99
        
        if (op==="^"||op==="√"||op==="c"||op==="t"||op==="s"||op==="ln"||op==='log'||op==="log10"||op==="log2"){
            prf=5
        }
        
        if (op==="*"||op==="·"||op==="/"||op==="%"||op==="⋅"||op==="×"){
            prf=4
        }
        
        if (op==="+"||op==="-"){
            prf=3
        }
        
        if (op===")"){
            prf=2
        }
        
        if (op==="("){
            prf=1
        }
        return prf
    }

    PrefF = (op) => {
        let prf = 99
        if (op === "+" || op === "-") {
            prf = 3
        }

        if (op === "*" || op === "·" || op === "/" || op === "%" || op === "⋅" || op === "×") {
            prf = 4
        }

        if (op === "^" || op === "√" || op === "c" || op === "t" || op === "s" || op === "ln" || op === 'log' || op === "log10" || op === "log2") {
            prf = 5
        }

        if (op === ")") {
            prf = 2
        }

        if (op === "(") {
            prf = 1
        }
        return prf
    }
    
    replacestrs=(str)=>{
        let rstr = str.split('c').join('C O S');
        rstr = rstr.split('s').join('S E N');
        if (!rstr.includes("I n f")){
            rstr = rstr.split('t').join('T A N')
        }
        return rstr
    }
    
    scanNumbers=(s, par)=>{
        let Fun=""
        let numbers=""
        let PreuniChar = 0
        let PreChar = ''
        let band=false
        let Str=s
        
        let codes=Str.split('')
        
        while (codes.length>0) {
            let char = codes.shift()
            let uniChar = char.charCodeAt(0)

            if ((uniChar > 47 && uniChar < 58 ) || uniChar === 46) {
               
                numbers+=char
                
            }else{
              
                if (uniChar === 47 || uniChar === 247) {
                    band=true
                }
                
                if (uniChar === 40) {
                    band=false
                    if (PreuniChar === 45) {
                        numbers = numbers.split('-').join('');
                        Fun+="-"
                    }
                }
                
                if (isNumber(numbers)) {
                    
                    if (band && !par){
                        Fun+="("+tofrac(DoubleStr(numbers))+")"+char
                        
                    }else{
                        if (band) {
                         
                            Fun+="("+tofrac(DoubleStr(numbers))+")"+char
                            
                        }else{
                            
                            Fun+=tofrac(DoubleStr(numbers))+char
                        
                        }
                    }
                    
                    numbers=""
                    if (uniChar !== 47 && uniChar !== 247) {
                        band=false
                    }

                }else if (uniChar === 45) {
                    if ((PreuniChar > 38 && PreuniChar<46 || PreuniChar===47||PreuniChar===183||PreuniChar===0||PreuniChar===247) && PreuniChar !== 44 && par) {
                   
                        Fun+=char
                        
                    }else{
                        numbers+=char
                    }
                    
                }else{
                   
                    Fun+=char
                    
                }
               
            }
            
            PreuniChar=uniChar;
            PreChar=char;
            
        }
        
        if ((PreuniChar === 45 && Fun === "") || numbers === "-") {
                   Fun+=PreChar
        }
        
        if (isNumber(numbers)) {
            
            if (band && !par) {
                Fun+="("+tofrac(DoubleStr(numbers))+")"
            }else{
                if (band) {
                    Fun+="("+tofrac(DoubleStr(numbers))+")"
                }else{
                    Fun+=tofrac(DoubleStr(numbers))
                }
            }
            
        }
        return Fun
    }
    
    isInt = (str) => {       
        return (!str.includes(".") && isNumber(str))
    }
    
    // Decimal a Fraccion
    tofrac=(D) => {
    let str=D
    let arrStr=str.split(".")
   
        if (arrStr.length>1) {
            let a=arrStr[1]
            let Count=a.length
            let b="2"
           
            a=arrStr[1]
            b=addZeros(Count)
            let MCD = MCDStr(a, b) // MCD para simplificar la "fraccion"
            //let MCD = Math.mcd(parseInt(a), parseInt(b)).toString();
            a=dividestr(a, MCD, Count)
            
                b=dividestr(b,MCD,Count)
            
                if (arrStr[0] !== "0") {
                    a = plusstr(absstr(a), absstr(forstr(arrStr[0], b)))
                }
                
                if (arrStr[0].includes("-")) {
                    a="-"+a
                }
                
                str=a

                if (BiggerThan(b, "1")) {
                    str=str+"/"+b
                }
            
        }
        
       return  str           
    }
    
    
    cleanR = (str) => {
        let aux="", rstr=".0"

        let arrStr=str
        var str = ""
        
        let i=0, j=0, k=0
        while (i<arrStr.length) {
            k=i
            aux=""
            if((i+2)<=arrStr.length){
                while (j<2) {
                    /*let cChar: [CChar]=[arrStr[k]]
                    cChar.withUnsafeBufferPointer { ptr in
                        aux += String(cString: ptr.baseAddress!)
                    }*/
                    
                    aux+=arrStr[k]
                    
                    j+=1
                    k+=1
                }
            }
            
            if(aux===rstr){
                
                if (i+2>=arrStr.length) {
                    
                    break
                }
                str+=arrStr[i]
            }
            else{
                str+=arrStr[i]
            }
            j=0;
            i+=1;
        }
        str = str.split("Infinity").join("I n f i n i t y") 
        return str
    }
    
    esPrimo = (i) => {
        let a = 1
        let n = 0
        
        while(a < i+1){
            if (i%a === 0){
                n+=1
            }
            a+=1
        }
        
        if (n !== 2) {
        return false
        }
        
        return true
    }

    DepurarR = (str) => {
        
        let s=str        
        let STR=[]
        let OP=[]
        
        console.log(`depurarR bef: ${s}`)
        s=s.split(' ').join("")
        s=s.split(')(').join(")*(")
        s=s.toLowerCase()
        s=s.split("cos").join("c")
        s=s.split("sen").join("s")
        s = s.split("tan").join("t")
        
        var str=s.split('')
        s=""
        var previusUnichar = 0
       // return []
        while (str.length>0) {
            var char = str.shift()
            var uniChar = char.charCodeAt(0)
            var nextUnichar = 0
            if (str.length>0) {
                nextUnichar=str[0].charCodeAt(0)
            }
           // console.log(`char: ${char} uniChar: ${uniChar} nextUnichar: ${nextUnichar}`)
            if ((uniChar > 47 && uniChar < 58) || uniChar === 46 || uniChar === 120703 || uniChar === 960) { //Si es numero
                
                if (previusUnichar === 41 || (previusUnichar === 120703 || previusUnichar === 960)) {
                    s+=",*,"
                }

                if (uniChar === 120703 || uniChar === 960) {
                    s+="pi"
                }else{
                    /*if (previusUnichar > 94 && previusUnichar < 123) {
                        s+=","+char
                    }else{*/
                        s+=char
                    //}
                }

                if (nextUnichar === 120703 || nextUnichar === 960) {
                    s+=",*,"
                }

                if (nextUnichar === 40) {
                    s+=",*"
                }
                
            }
            
            if (((uniChar > 36 && uniChar<46) || uniChar===47 || uniChar===94 || uniChar===215 || uniChar===183 || uniChar===8730 || uniChar===8901 ||  (uniChar>94 && uniChar<123)) && uniChar !== 44) {//Si es simbolo
                //a,+,-b
                if (uniChar === 45 && ((nextUnichar > 47 && nextUnichar < 58) || nextUnichar === 46 || nextUnichar === 120703 || nextUnichar === 960) && ((previusUnichar > 47 && previusUnichar < 58) || previusUnichar === 41 || previusUnichar === 46 || previusUnichar === 120703 || previusUnichar === 960)) { //Si a - b= a + -b                   
                    if (toDecimalVal===0){
                        s+=",+,"+char
                    }else{
                        s+=","+char+","
                    }
                }
                else if (uniChar === 45 && ((nextUnichar > 47 && nextUnichar < 58 || nextUnichar===46) && !((previusUnichar > 47 && previusUnichar < 58 || previusUnichar === 41 ) || previusUnichar===46))) {//Si a -[.-+*()..]b
                    s+=","+char //a,-,b
                }else if (previusUnichar !== 44 && uniChar === 45 && nextUnichar === 40) {
                    var aux = ""
                    //+-*/()-(0-9[aA-zZ])
                    if ((previusUnichar > 47 && previusUnichar<58 || previusUnichar===46) || previusUnichar === 41) {
                        s+=",+,"
                    }
                    char = str.shift()
                    uniChar = char.charCodeAt(0)
                    OP.push(char)

                    if (str.length>0) {
                       // nextUnichar = (String(str.first!) as NSString).character(at: str.startIndex)
                        nextUnichar = str[0].charCodeAt(0)
                    }
                    
                    while (OP.length>0 && str.length>0) {
                        previusUnichar=uniChar
                        char = str.shift()
                        uniChar = char.charCodeAt(0)
                        if (str.length>0) {
                           // nextUnichar = (String(str.first!) as NSString).character(at: str.startIndex)
                            nextUnichar = str[0].charCodeAt(0)
                        }
                        
                        if (uniChar === 40) {
                            OP.push(char)
                            //"("
                            aux+=char
                     
                        }
                        else if (uniChar === 41) {
                            OP.shift()
                     //")"
                            if (OP.length>0) {
                                aux+=char
                            }
                            }else{
                                aux+=char 
                            }
                        
                    }
                    //let s32 = []
                    
                    
                    
                    aux=Evaluate(aux)
                    strDevelopment=strDevelopment.split("("+aux+")").join(aux)
                    let sqrtC = 0
                    //let sqrtN = 43
                    if (str.length > 0) {
                        sqrtC = str[0].charCodeAt(0)
                        /*if(str.length>1){
                            sqrtN=str[1].charCodeAt(0)
                        }*/
                    }
                    
                    if (isFrac(aux) || toDecimalVal===1) {
                        if (!aux.includes("-")) {
                            /*if (sqrtC !== 8730 /*&& !(sqrtN>47 && sqrtN<58)){
                                s+="-"+aux
                                strDevelopment=strDevelopment.split("-"+aux).join("+ -"+aux)
                            }else{
                                s+="-"+aux
                                strDevelopment=strDevelopment.split("-"+aux).join("+ -"+aux)
                                strDevelopment=strDevelopment.split("+ +").join("+")
                            }*/
                            s+="-"+aux
                            strDevelopment=strDevelopment.split("-"+aux).join("+ -"+aux)
                            if (sqrtC === 8730){
                                strDevelopment=strDevelopment.split("+ +").join("+")
                            }
                        }
                        else{
                            s += aux.split('-').join("")
                            s=cleanR(s)
                        }
                        
                    }
                
                } else if (uniChar>94 && uniChar<123) {
                    if ((nextUnichar > 47 && nextUnichar < 58) || nextUnichar===46) {
                        s+=char+","
                    }else{
                        s+=char
                    }
                } else if (uniChar === 8730 && previusUnichar!==41 && !(previusUnichar > 47 && previusUnichar < 58)) {
                    s += "2," + char + ","
                } else {
                    s+=","+char+","
                }
                
            }
            
            previusUnichar=uniChar

            
        }
        
        strDevelopment=strDevelopment.split("*--").join("*")
        strDevelopment=strDevelopment.split("log10*").join("log_10")
       // strDevelopment=strDevelopment.split("log10").join("log_10")
        strDevelopment=strDevelopment.split("log2*").join("log_2")
        strDevelopment=strDevelopment.split("/--").join("/")

        

        s="(,"+s+",)"
        s=s.split(",,").join(",")
        s=s.split("-+").join("-")
        s=s.split(",--").join(",")
        s=s.split("(--").join("(")
        s=s.split("log,10,*").join("log10")
        s=s.split("log,2,*").join("log2")
        
        console.log(`depurarR aft: ${s}`)
        //s="("+s+")"
        STR=s.split(",")
        console.log(s)
        //console.log(STR.reverse())
        console.log(strDevelopment)
        //return [")", "^", "2x", "+", "2", "^", "2x", "+", "2", "^", "2x", "("]
        return STR.reverse()
    }

    DepurarI=(str)=>{
        let s=str;
        let STR=[];
        s = s.split(' ').join('');
        s = s.split(')(').join(')*(');
        s=s.toLowerCase();
        s = s.split('cos').join('c');
        s = s.split('sen').join('s');
        s = s.split('tan').join('t');

        strDevelopment=""
        s=cleanstrD(s)
        strDevelopment=strDevelopment.split("log10*").join("log_10")
        strDevelopment=strDevelopment.split("log2*").join("log_2")
        s="(,"+s+",)"
        //s = str.split(',,').join(',');
        s=s.replace(/,,/g,',')
        
        //s = str.split('-+').join('-');
        s=s.replace(/\-\+/g,'-')
        //
        s = s.split("log,10,*").join("log10")
        s = s.split("log,2,*").join("log2")

        STR=s.split(",")
        
        return STR.reverse()
    }
    
 
