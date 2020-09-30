StepsFactor = (str) => {
    console.log('StepsFactor ' + BSC)
    
    //Entrada de datos
    let STR=[]
    let OP=[]
    let S=[]
    res = ""
    str1 = ""
    str2 = ""
    str3 = ""
    change = false
    
    try{
        res=strToLang("DigitEx")
        console.log('StepsFactor2 '+str)
        //Data clean
        if (BSC){
            console.log('DepurarI ' + str)
            STR=DepurarI(str)
        }
        else{
            console.log('DepurarR ' + str)
            STR=DepurarR(str)
        }
        console.log('AfterDepurar: ' + str)

        
        while (STR.length>0) {
            switch (PrefF(STR[STR.length-1])) {
                case 1:
                    OP.push(STR.pop())
                break
                    
                case 2:
                    while (OP.length > 0 && OP[OP.length-1] !== "(") {
                        S.push(OP.pop())
                    }
                    
                    OP.pop()
                    
                    STR.pop()
                    break
                case 3:
                case 4:
                case 5:
                    while (OP.length > 0 && PrefF(OP[OP.length-1]) >= PrefF(STR[STR.length-1])) {
                        S.push(OP.pop())
                    }
                    
                    OP.push(STR.pop())
                    break
                    
                default:
                    S.push(STR.pop())
            } 
        }

        //STR.removeAll()
        STR.splice(0)
        while (S.length>0) {
            STR.push(S.pop())
        }
        S.splice(0)
        OP = []
        console.log(`STR steps: ${STR}`);
        while (STR.length>0) {
            //console.log(STR[STR.length - 1])
            switch (STR[STR.length-1]) {
            case "-":
            case "+":
                factorSum(STR, S, OP);
                break
            /*case "-":
                let sign = STR.pop()
                let auxStr = S[S.length - 1] === undefined ? "+" : S.pop();
                let aux1Str = S[S.length - 1] === undefined ? "+" : S.pop();
                let auxChar = auxStr.match(/[A-Z]/gi);
                let aux1Char = aux1Str.match(/[A-Z]/gi);
                let strSplit = aux1Str.split(aux1Char).join("")
                if (strSplit===""){
                    strSplit = "1"
                } else if (strSplit === "-" ){
                    strSplit = "-1"
                }
                console.log(`aux1Char--: ${aux1Char}`)
                //OP.push(sign)
                OP.push([[sign + "" + auxStr,"",0],[strSplit,aux1Char,1]])
                //OP.push()
                break*/
            case "·":
            case "⋅":
            case "×":
            case "*":
                STR.pop()
                let auxStr = S[S.length - 1] === undefined ? null : S.pop();
                let aux1Str = S[S.length - 1] === undefined ? null : S.pop();
                console.log(`plusFactor auxStr: ${auxStr} aux1Str: ${aux1Str}`)
                console.log(`plusFactor STR??: ${STR}`)
                //let arrStr = auxStr.split("");
               // let arr1Str = aux1Str.split("");
                let c = 0
                let c2 = 0
                let prevPow = -1
                let resArr = []
                let bandMul = true
                let powArr = []
                const subRes = ["", "", ""]
                const numberArr = []
                const charArr = []
                if (!STR.length && OP.length > 0) {
                    console.log(`OP: ${OP}`)
                    let a = null//OP.shift()//.reverse()
                    let b = null//OP.shift().reverse()
                    res = "("
                    
                    while(c2<OP.length){
                        a=OP[c2]
                        c = a.length - 1
                        while (c > -1) {
                            if (a[c][1] === "") {
                                res += parseInt(a[c][0]) > -1 ? "+" + a[c][0] : a[c][0]
                            } else {
                                //res += a[c][0] + "" + a[c][1]
                                if (c === a.length - 1) {
                                    res += (((a[c][0] + "") === "1") ? "" : ((a[c][0] + "") === "-1" ? "-" : a[c][0])) + "" + a[c][1] + "" + (a[c][2] > 1 ? ("^" + a[c][2]) : "")
                                } else {
                                    res += (((a[c][0] + "") === "1") ? "+" : ((a[c][0] + "") === "-1" ? "-" : (a[c][0] > -1 ? "+" + a[c][0] : a[c][0]))) + "" + a[c][1] + "" + (a[c][2] > 1 ? ("^" + a[c][2]) : "")
                                }
                            }

                            c--
                        }
                        c2++
                        res += (c2 === OP.length) ? ")" : ")*("
                        /*if(c2===OP.length){
                            res += ")"
                        }else{
                            res += ")*("
                        }*/
                    }
                    StepsC += 1;
                    str1 = strToLang("Paso") + StepsC.toString() + ": quad"
                    str2 = strDevelopment
                    StepLatex(str1, strDevelopment, str2, str3, res, change, true)
                    str1 = "-> "
                    str2 = "[ " + str2 + " ]"
                    str1 = str1 + str2 + " = " + res
                    Pstrltx(str1)
                    strltx += "</div>"
                    strltx += "</div>"
                    
                    c=0
                    c2=0
                    a=OP.shift()
                    b=OP.shift()
                    console.log(`firstRes: ${res}`)
                    while(bandMul){
                        console.log(`a: ${a[0]}`)
                        console.log(`b: ${b}`)
                        bandMul = OP.length>0

                        //build Res
                        //StepsC += 1;
                        //str1 = strToLang("Paso") + StepsC.toString() + ": quad"
                        //str2 = res
                        res = "("
                        c = a.length-1
                        while(c>-1){
                                if (a[c][1]===""){
                                    res += parseInt(a[c][0])>-1 ? "+"+a[c][0] : a[c][0]
                                }else{
                                    //res += a[c][0] + "" + a[c][1]
                                    if (c === a.length - 1) {
                                        res += (((a[c][0] + "") === "1") ? "" : ((a[c][0] + "") === "-1" ? "-" : a[c][0])) + "" + a[c][1] + "" + (a[c][2] > 1 ? ("^" + a[c][2]) : "")
                                    } else {
                                        res += (((a[c][0] + "") === "1") ? "+" : ((a[c][0] + "") === "-1" ? "-" : (a[c][0] > -1 ? "+" + a[c][0] : a[c][0]))) + "" + a[c][1] + "" + (a[c][2] > 1 ? ("^" + a[c][2]) : "")
                                    }
                                }
                               
                            c--
                        }
                        res += ")*("
                        c = b.length - 1
                        while (c > -1) {
                            if (b[c][1] === "") {
                                res += parseInt(b[c][0]) > -1 ? "+" + b[c][0] : b[c][0]
                            } else {
                                //res += a[c][0] + "" + a[c][1]
                                if (c === b.length - 1){
                                    res += (((b[c][0] + "") === "1") ? "" : ((b[c][0] + "") === "-1" ? "-" : b[c][0])) + "" + b[c][1] + "" + (b[c][2] > 1 ? ("^" + b[c][2]) : "")
                                }else{
                                    res += (((b[c][0] + "") === "1") ? "+" : ((b[c][0] + "") === "-1" ? "-" : (b[c][0] > 0 ? "+" + b[c][0] : ""))) + "" + b[c][1] + "" + (b[c][2] > 1 ? ("^" + b[c][2]) : "")
                                }
                            }
                            c--
                        }
                        c=0
                        res += ")"
                       // StepLatex(str1, strDevelopment, str2, str3, res, change, true)
                       // str1 = "-> "
                        //str2 = "[ " + str2 + " ]"
                        //str1 = str1 + str2 + " = " + res
                        //Pstrltx(str1)
                        //strltx += "</div>"
                        //strltx += "</div>"
                        
                        while(c<a.length){
                            const arrA = a[c]
                            const charA = arrA[1];
                            //const arrPowA = strA[2]
                            let powA = arrA[2]
                            /*if(arrPowA.length>1){
                                powA=parseInt(arrPowA[1])
                                //strA = arrPowA[0]
                            } */
                            let consA = parseInt(arrA[0])
                            
                            /*if (consA === "") {
                                consA = 1
                            } else if (splitA === "-"){
                                consA = -1
                            }*/

                            //splitA = parseInt(splitA)
                            //const i = c;
                            while (c2 < b.length) {
                                const arrB = b[c2]
                                const charB = arrB[1];
                                let powB = arrB[2]
                                let consB = parseInt(arrB[0])
                                let abyb = consA * consB
                                let powAB = powA + powB
                                let charsA = ""
                                let charsB = ""
                                let charsPow = ""
                                //let charsB2 = ""
                               // splitB = parseInt(splitB)
                                //numberArr.push(consA * consB)
                                //if (powA > 0 || powB > 0){
                                //powArr.push([(powA + powB), (consA * consB)])
                                /*}else{
                                    powArr.push(i + c2)
                                }*/
                                
                                
                                if (charB!=="") {
                                  //  charArr.push(charB)
                                    powArr.push([powAB, abyb, charB])
                                    charsB = ((consB === 1) ? "" : (consB === -1 ? "-" : consB)) + charB + (powB>1?("^"+powB):"")
                                    if (powAB>1){
                                        charsPow = (abyb === 1 ? "" : (abyb === -1 ? "-" : abyb)) + "" + charB + "^(color(red)(" + powA + "+" + powB + "))"
                                    } else {
                                        charsPow = (abyb === 1 ? "" : (abyb === -1 ? "-" : abyb)) + "" + charB
                                    }
                                    if (charA !== ""){
                                        charsA = ((consA === 1) ? "" : (consA === -1 ? "-" : consA)) + charA + (powA > 1 ? ("^" + powA) : "")
                                    }else{
                                        charsA = "" + consA + charA
                                    }
                                } else if (charA !== "") {
                                    //charArr.push(charA)
                                    powArr.push([powAB, abyb, charA])
                                    charsA = ((consA === 1) ? "" : (consA === -1 ? "-" : consA)) + charA + (powA > 1 ? ("^" + powA) : "")
                                    if (powAB > 1) {
                                        charsPow = (abyb === 1 ? "" : (abyb === -1 ? "-" : abyb)) + "" + charA + "^(color(red)(" + powA + "+" + powB + "))"
                                    }else{
                                        charsPow = (abyb === 1 ? "" : (abyb === -1 ? "-" : abyb)) + "" + charA
                                    }
                                    if (charB !== "") {
                                        charsB = ((consB === 1) ? "" : (consB === -1 ? "-" : consB)) + charB + (powB > 1 ? ("^" + powB) : "")
                                    } else {
                                        charsB = "" + consB + charB
                                    }
                                    //subRes[0] += (consA > -1 ? "+" : "") + consA + "*" + consB + charA
                                } else {
                                    //charArr.push("")
                                    powArr.push([powAB, abyb, ""])
                                    charsA = "" + consA + charA
                                    charsB = "" + consB + charB
                                    charsPow = abyb + "" //(abyb>-1?"+"+abyb:abyb) + ""
                                    //subRes[0] += (consA > -1 ? "+" : "") + consA + "*" + consB
                                } 
                                //subRes[0] = ((consA > -1 && c < (a.length) && c2 < (b.length-1)) ? "+(" : "+(") + consA + charA + "*" + consB + charB + ")" + subRes[0]
                                subRes[0] = (c === (a.length-1) && c2 === (b.length-1)?"(color(red)(":"+(color(red)(") + charsA + "*" + charsB + "))" + subRes[0]
                                subRes[1] = (c === (a.length - 1) && c2 === (b.length - 1) ? "" : abyb>-1?"+":"") + charsPow + "" + subRes[1]
                                //subRes[0] = "(" + subRes[0] + ")"
                                c2++
                            // i++
                            }
                            c2=0
                            c++
                        }
                        c=0
                        c2=0
                        a = []
                        //powArr=powArr.sort()
                        while(c<powArr.length){
                            if(prevPow===powArr[c][0]){
                                //c2 += numberArr[c]
                                c2 += powArr[c][1]
                                const subB = powArr[c][1]
                                if (!powArr[c + 1] || prevPow !== powArr[c + 1][0]) {
                                    //resArr.push([c2, charArr[c], powArr[c]])
                                    resArr.push([c2, powArr[c][2], powArr[c][0]])
                                    a.push([c2, powArr[c][2], powArr[c][0]])
                                    if (powArr[c][2]===""){
                                        subRes[2] = c2 + "" + powArr[c][2] + (powArr[c][0] > 1 ? "^" + powArr[c][0] : "") + subRes[2]
                                    }else{
                                        subRes[2] = "color(red)(" + (subB === 1 ? "+" : (subB === -1 ? "-" : (subB < -1 ? subB : "+" + subB))) + powArr[c][2] + (powArr[c][0] > 1 ? "^" + powArr[c][0] : "") + subRes[2]
                                    }
                                }else{
                                    subRes[2] = c2 + "" + powArr[c][2] + (powArr[c][0] > 1 ? "^" + powArr[c][0] : "") + subRes[2]
                                }
                            }else{
                                //c2 = numberArr[c]
                                c2 = powArr[c][1]
                                if (!powArr[c + 1] || powArr[c][0] !== powArr[c + 1][0]) {
                                    //resArr.push([c2, charArr[c], powArr[c]])
                                    resArr.push([c2, powArr[c][2], powArr[c][0]])
                                    a.push([c2, powArr[c][2], powArr[c][0]])
                                    if (powArr[c][2] === "") {
                                        subRes[2] = (c2 > -1 ? ("+" + c2) : c2) + "" + powArr[c][2] + (powArr[c][0] > 1 ? "^" + powArr[c][0] : "") + subRes[2]
                                    } else {
                                        subRes[2] = ((c2 === 1) ? "+" : (c2 === -1 ? "-" : (c2 < -1 ? c2 : "+" + c2))) + "" + powArr[c][2] + (powArr[c][0] > 1 ? "^" + powArr[c][0] : "") + subRes[2]
                                    }
                                }else{
                                   // if (powArr[c][2] === "") {
                                    //    subRes[2] = (c2 > -1 ? ("+"+c2) : c2) + "" + powArr[c][2] + subRes[2]
                                    //}else{    
                                    subRes[2] = ((c2 === 1) ? "+" : (c2 === -1 ? "-" :(c2 < -1 ? c2 : "+" + c2))) + "" + powArr[c][2] + (powArr[c][0] > 1 ? "^" + powArr[c][0] : "") + ")" + subRes[2]
                                    //}    
                                }
                                
                            }
                            prevPow = powArr[c][0]
                            c++
                        }
                        subRes[2] = "["+subRes[2]+"]"
                        subRes[2] = subRes[2].split("[+").join("[")
                        //numberArr = numberArr.reverse()
                        //numberArr = numberArr.reverse()
                    
                        //resArr = resArr.reverse()
                        StepsC += 1;
                        str1 = strToLang("Paso") + StepsC.toString() + ": quad"
                        str2 = res
                        //c=0
                        console.log(`resArr: ${resArr}`)
                        const firstLot = resArr.pop()
                        res = (firstLot[0] === 1 ? "" : firstLot[0] === -1?"-":firstLot[0]) + "" + firstLot[1] + "^" + firstLot[2]
                        while (resArr.length){
                            const lot = resArr.pop()
                            console.log(`lot: ${lot}`)
                            /*if (lot[0]===1){
                                res += "" + lot[1] + "^" + lot[2]
                            } else if (lot[0] === -1) {
                                res += "-" + lot[1] + "^" + lot[2]
                            }else{*/
                            if (lot[1]===""){
                                res += ((lot[0] > -1) ? "+" + lot[0] : lot[0]) + "" //+ lot[1] + "^" + lot[2]
                            }else{
                                res += (lot[0] === 1 ? "+" : lot[0] === -1 ? "-" : (lot[0] > -1 ? ("+" + lot[0]) : lot[0])) + "" + lot[1]
                                //res += (lot[1] === 1 ? "" : lot[1] === -1 ? "-" : lot[1]) + ""
                                res += (lot[2] > 1 ? "^" + lot[2] : "")
                            }
                            //}
                            //c++
                        }
                        //strltx+="<div><div>"
                        
                        const redRes = strDevelopment.replace(str2,"color(red)("+str2+")")
                        strltx += "<div class='card divSteps' style='background: transparent' >"
                        strltx += "<div class='card-body' style='background: transparent' >"
                        strltx += "<p>`" + str1 + redRes + "`</p>"
                        strDevelopment = strDevelopment.replace(str2,"(" + res + ")")
                       // strltx = strltx.split(str2).join("color(red)(" + res + ")")
                        //StepLatex(str1, strDevelopment, str2, str3, "("+res+")", false, true)
                        str1 = "-> "
                        str2 = "[ " + str2 + " ]" + " = [ " + subRes[0] + " ] = [ " + subRes[1] + " ] = " + subRes[2]
                        str1 = str1 + str2 + " = " + res
                        Pstrltx(str1)
                        strltx += "</div>"
                        strltx += "</div>"
                        S.push(res)
                        console.log(`numberArr: ${numberArr}`)
                        console.log(`powArr: ${powArr}`)
                        console.log(`charArr: ${charArr}`)
                        console.log(`resArr: ${resArr}`)
                        b=OP.shift();
                        resArr=[];
                        powArr=[];
                        c2=0;
                        subRes[0]=""
                        subRes[1]=""
                        subRes[2]=""
                    }
                }
                break
            case "/":
                STR.pop()
                break
            case "√":
                STR.pop()
                break
            case "^":
                factorPow(STR, S, OP);   
                break
            case 'log':
            case "ln":
                STR.pop()
                break
            case "log10":
                STR.pop()
                break
            case "log2":
                STR.pop()

                break
            case "c":
                STR.pop()

                break
            case "s":
                STR.pop()

                break
            case "t":
                STR.pop()

                break
            case "%":
                STR.pop()

                break
            default:
                S.push(STR.pop()+"")
            //break
            }
        }
    }catch(e){
        console.log(e)
    }
    if(S[S.length-1]===undefined){
        S.push(strToLang("DigitEx"))
    }
    return S[S.length-1].split('pi').join(Math.PI.toString());
}