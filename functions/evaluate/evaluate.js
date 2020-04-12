Evaluate=(str)=>{
        //Entrada de datos
        let STR=[]
        let  OP=[]
        let  S=[]
        let res = ""
        let str1=""
        let str2=""
        let str3=""
        let change=false
        
        try{
            res=strToLang("DigitEx")
            
            //Data clean
            if (BSC){
                STR=DepurarI(str)
            }
            else{
                STR=DepurarR(str)
            }
            
            
            while (STR.length>0) {
                switch (Pref(STR[STR.length-1])) {
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
                        while (OP.length > 0 && Pref(OP[OP.length-1]) >= Pref(STR[STR.length-1])) {
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
            console.log(STR)
            while (STR.length>0) {
                
                switch (STR[STR.length-1]) {
                case "+":
                    STR.pop()
                    let auxStr = S[S.length-1] === undefined ? "+": S.pop()
                    let aux1Str = S[S.length-1] === undefined ? "+": S.pop()
                    let aux2Str=""
                    
                    if (isNumber(auxStr) && isNumber(aux1Str)) {
                        strDevelopment = strDevelopment.split("("+aux1Str+")").join(aux1Str)
                        strDevelopment = strDevelopment.split("(" + auxStr + ")").join(auxStr)
                        auxStr = auxStr.split("(").join("")
                        aux1Str = aux1Str.split("(").join("")
                        auxStr = auxStr.split(")").join("")
                        aux1Str = aux1Str.split(")").join("")
                        strDevelopment = strDevelopment.split("("+aux1Str+")").join(aux1Str)
                        strDevelopment = strDevelopment.split("("+auxStr+")").join(auxStr)

                        //V.strDevelopment=V.strDevelopment.replacingOccurrences(of: "("+aux1Str+")", with: aux1Str)
                        //V.strDevelopment=V.strDevelopment.replacingOccurrences(of: "("+auxStr+")", with: auxStr)
                        str2=aux1Str+"+"+auxStr
                        
                        auxStr=DoubleStr(auxStr)
                        aux1Str=DoubleStr(aux1Str)
                        StepsC += 1
                        auxStr = auxStr.split("pi").join(Math.PI.toString())
                        aux1Str = aux1Str.split("pi").join(Math.PI.toString())
                        if (MoreDVal !== 1 && toDecimalVal === 1) {
                            let aux = (isNumber(auxStr) ? Number(auxStr) : 0.0)
                            let aux1 = (isNumber(aux1Str) ? Number(aux1Str) : 0.0)
                            let nD = nDigits(auxStr, aux1Str)

                            res = (round((aux + aux1)*nD)/nD).toString()
                            res = res.split("e+").join('e')
                        }else{
                            console.log(`${auxStr} + ${aux1Str}`)
                            res = plusstr(auxStr, aux1Str)
                            console.log(`res ${res}`)
                        }
                        
                        res=cleanR(res)

                     if ((aux1Str.startsWith("-") && (BiggerThan(auxStr, "0.0") || auxStr == "0.0")) && (auxStr != "oo" && aux1Str != "oo")) {
                            aux2Str=auxStr
                            auxStr=aux1Str
                            aux1Str=aux2Str
                            //aux1Str=aux1Str.replacingOccurrences(of: "+", with: "")
                            aux1Str = aux1Str.split("+").join('')
                            str3=aux1Str+auxStr
                            strDevelopment = strDevelopment.split("--").join('+')
                            strDevelopment = strDevelopment.split("+-").join('-')
                            strDevelopment = strDevelopment.split("-+").join('-')
                            change=true
                            
                        }else{
                            change=false
                            aux1Str = aux1Str.split("+").join('')
                        }
                        str2 = str2.split("+-").join('-')
                        str3 = str3.split("+-").join('-')
                        
                        str1=strToLang("Paso")+StepsC.toString()+": quad"
                        strDevelopment = strDevelopment.split("--").join('+')
                        strDevelopment = strDevelopment.split("+-").join('-')
                        strDevelopment = strDevelopment.split("-+").join('-')
                        
                        str2 = str2.split("++").join()
                        str3 = str3.split("++").join('+')
                        console.log(`str1: ${str1} strDevelopment: ${strDevelopment} `)
                        console.log(`str2: ${str2} str3: ${str3} res: ${res}`)
                        console.log(`strltx: ${strltx}`)
                        StepLatex(str1, strDevelopment, str2, str3, res, change, true)
                        console.log(`strltx: ${strltx}`)
                        str1="-> "
                        if (change) {
                            if (toDecimalVal===1) {
                                str2="[ "+str3+" ]"
                            }else{
                                if (str3.includes(".")) {
                                    str3=scanNumbers(str3,false)
                                    str3 = "["+str3+"]="+StepsFrac(str3)
                                }
                                str2=str3
                            }
                        }else{
                            if (toDecimalVal===1){
                                str2="[ "+str2+" ]"
                            }else{
                                
                                if (str2.includes(".")) {
                                    str2=scanNumbers(str2,false)
                                    str2 = "["+str2+"]="+StepsFrac(str2)
                                }
                                
                                str2=" "+str2+" "

                            }
                        }
                        if (toDecimalVal===1) {
                            str1=str1+str2+" = "+res.split("+").join("")
                            //str1=str1+str2+" = "+res.replacingOccurrences(of: "+", with: "")
                        }else{
                            str1=str1+str2+" = "+scanNumbers(res.split("+").join(""),false)
                            //str1=str1+str2+" = "+scanNumbers(res.replacingOccurrences(of: "+", with: ""),false)
                        }
                        str1 = str1.split(" + -").join(' - ');
                        str1 = str1.split("pi").join(Math.PI.toString());
                        //str1=str1.replacingOccurrences(of: " + -", with: " - ")
                        //str1=str1.replacingOccurrences(of: "pi", with: String(Double.pi))
                        strltx+="<p style='text-align:center' >`"+str1+"`</p>"

                    }
                     else if (isFrac(auxStr) && isFrac(aux1Str)) {
                        auxStr = auxStr.split("(").join('');
                        aux1Str = aux1Str.split("(").join('');
                        auxStr = auxStr.split(")").join('');
                        aux1Str = aux1Str.split(")").join('');
                        /*aux1Str=aux1Str.replacingOccurrences(of: "(", with: "")
                        aux1Str=aux1Str.replacingOccurrences(of: ")", with: "")
                        auxStr=auxStr.replacingOccurrences(of: "(", with: "")
                        auxStr=auxStr.replacingOccurrences(of: ")", with: "")*/
                       str2=aux1Str+"+"+auxStr
                       StepsC += 1
                       strDevelopment = strDevelopment.split("("+auxStr+")").join(auxStr);
                       strDevelopment = strDevelopment.split("("+aux1Str+")").join(aux1Str);
                        //V.strDevelopment=V.strDevelopment.replacingOccurrences(of: "("+auxStr+")", with: auxStr)
                        //V.strDevelopment=V.strDevelopment.replacingOccurrences(of: "("+aux1Str+")", with: aux1Str)
                        if (auxStr.includes(".")) {
                           auxStr=tofrac(auxStr)
                        }
                        
                        if (aux1Str.includes(".")) {
                            aux1Str=tofrac(aux1Str)
                        }
                        res=EvaluateFrac((aux1Str+"+"+auxStr).split("+-").join("-"))
                     
                        str2=str2.split("+-").join("-")
                        str1=strToLang("Paso")+StepsC.toString()+": quad"
                        StepLatex(str1, strDevelopment, str2, str3, res, false, true)
                        str2=aux1Str+"+"+auxStr
                        str2=str2.split("+-").join("-")
                        str1 = "-> ["+str2+"]="+StepsFrac(str2)+"="+res
                        
                         strltx+="<p style='text-align:center' >`"+str1+"`</p>"

                     }else{
                        res=strToLang("WrongEx")
                    }
                    strltx+="</div>"
                    strltx+="</div>"

                    S.push( res )
                    
                    break
                case "-":
                    STR.pop()
                    
                    auxStr = S[S.length-1] === undefined ? "-": S.pop()
                    aux1Str=S[s.length-1] === undefined ? "-": S.pop()
                    auxStr=auxStr.split("(").join("");
                    aux1Str=aux1Str.split("(").join("");
                    auxStr=auxStr.split(")").join("");
                    aux1Str=aux1Str.split(")").join("");

                    aux1Str=aux1Str.split("+").join("");
                    //aux1Str=aux1Str.replacingOccurrences(of: "+", with: "")
                    str2=aux1Str+"-"+auxStr

                    
                    if (isNumber(auxStr) && isNumber(aux1Str)) {

                        auxStr=DoubleStr(auxStr)
                        aux1Str=DoubleStr(aux1Str)
                        StepsC += 1
                        auxStr=auxStr.split("pi").join(Math.PI.toString())
                        aux1Str=aux1Str.split("pi").join(Math.PI.toString())
                       if (MoreDVal !== 1 && toDecimalVal === 1) {
                            let aux = (isNumber(auxStr) ? Number(auxStr) : 0.0)
                            let aux1 = (isNumber(aux1Str) ? Number(aux1Str) : 0.0)
                            let nD = nDigits(auxStr, aux1Str)

                            res = (round((aux - aux1)*nD)/nD).toString()
                            res = res.split('+').join("")
                        }else{
                            res = minusstr(aux1Str, auxStr)
                        }
                        
                        res=cleanR(res)
                        str2=str2.split("--").join("+")
                        str1=strToLang("Paso")+StepsC.toString()+": quad"
                        
                        strDevelopment=strDevelopment.split("("+aux1Str+")").join(aux1Str)
                        strDevelopment=strDevelopment.split("("+auxStr+")").join(auxStr)
                        strDevelopment=strDevelopment.split(auxStr+aux1Str).join(aux1Str+auxStr)
                        strDevelopment=strDevelopment.split(aux1Str+auxStr).join(auxStr+aux1Str)
                        
                        strDevelopment=strDevelopment.split("--").join("+")
                        strDevelopment=strDevelopment.split("+-").join("-")
                        strDevelopment=strDevelopment.split("-+").join("-")
                        StepLatex(str1, strDevelopment, str2, str2, res, false, true)
                        
                        str1="-> "
                        if (toDecimalVal===1){
                            str2="( "+str2+" )"
                            str1=str1+str2+" = "+res
                        }else{
                            str2="( "+scanNumbers(str2,false)+" )"
                            str1=str1+str2+" = "+tofrac(DoubleStr(res))
                        }
                        str1=str1.split("pi").join(Math.PI.toString())
                        strltx+="<p style='text-align:center' >`"+str1+"`</p>"
                        
                    }
                    else if (isFrac(auxStr) && isFrac(aux1Str)) {
                        str2=aux1Str+"-"+auxStr
                        StepsC += 1
                        if (auxStr.includes(".")) {
                            auxStr=tofrac(auxStr)
                        }
                        
                        if (aux1Str.includes(".")) {
                            aux1Str=tofrac(aux1Str)
                        }
                        res=EvaluateFrac((aux1Str+"-"+auxStr).split("+-").join("-"))
                        
                        str2 = str2.split("+-").join("-")
                        str1=strToLang("Paso")+StepsC.toString()+": quad"
                        StepLatex(str1, strDevelopment, str2, str3, res, false, true)
                        str2=aux1Str+"-"+auxStr
                        str2=str2.split("+-").join("-")
                        str1 = "-> ["+str2+"]="+StepsFrac(str2)+"="+res
                        
                        strltx+="<p style='text-align:center' >`"+str1+"`</p>"
                    }else{
                        res=WrongExpresion()
                    }
                    strltx+="</div>"
                    strltx+="</div>"
                    
                    S.push( res )
                    
                    break
                case "*":
                    STR.pop()
                    
                    auxStr = S[S.length-1] === undefined ? "*": S.pop()
                    aux1Str=S[S.length-1] === undefined ? "*": S.pop()
                    
                    auxStr=auxStr.split("(").join("")
                    aux1Str=aux1Str.split("(").join("")
                    auxStr=auxStr.split(")").join("")
                    aux1Str=aux1Str.split(")").join("")
                    if (isNumber(auxStr) && isNumber(aux1Str)) {
                        StepsC += 1
                        str2=aux1Str+"*"+auxStr
                        strDevelopment=strDevelopment.split("("+aux1Str+")").join(aux1Str)
                        strDevelopment=strDevelopment.split("("+auxStr+")").join(auxStr)
                        
                        auxStr=DoubleStr(auxStr)
                        aux1Str=DoubleStr(aux1Str)
                        auxStr=auxStr.split("pi").join(Math.PI.toString())
                        aux1Str = aux1Str.split("pi").join(Math.PI.toString())

                        if (MoreDVal !== 1&&toDecimalVal === 1) {
                            let aux = (isNumber(auxStr) ? Number(auxStr) : 0.0)
                            let aux1 = (isNumber(aux1Str) ? Number(aux1Str) : 0.0)
                            let nD = place(auxStr, aux1Str)
                            res = (round(aux * aux1 * nD) / nD).toString()
                            res = res.split("+").join("")

                        }else{
                            res =  forstr(auxStr, aux1Str)
                        }
                        
                        res=cleanR(res)
                        str2=str2.split("*+").join("*")
                        str1=strToLang("Paso")+StepsC.toString()+": quad"

                        strDevelopment=strDevelopment.split("--").join("+")
                        strDevelopment=strDevelopment.split("-+").join("-")
                        
                        if (LessThan(aux1Str,"0.0") && LessThan(auxStr,"0.0")){
                            StepLatex(str1, strDevelopment, str2, str2, "+"+res, false, true)
                        }else{
                            StepLatex(str1, strDevelopment, str2, str2, res, false, true)
                        }
                        
                        str1="-> "
                        if (toDecimalVal===1){
                            str2="[ "+aux1Str+" * "+auxStr+" ]"
                            str1=str1+str2+" = "+res.split("+").join("")
                        }else{
                            if (str2.includes(".")) {
                                str2=scanNumbers(aux1Str+"*"+auxStr,false)
                                str2="["+str2+"]="+StepsFrac(str2)
                            }
                            str1=str1+str2+" = "+DoubleStr(tofrac(res.split("+").join("")))
                        }
                        str1=str1.split("pi").join(Math.PI.toString())
                        strltx+="<p style='text-align:center' >`"+str1+"`</p>"
                        
                    }
                    else if (isFrac(auxStr) && isFrac(aux1Str)) {
                        aux1Str=aux1Str.split("(").join("")
                        auxStr=auxStr.split("(").join("")
                        aux1Str=aux1Str.split(")").join("")
                        auxStr=auxStr.split(")").join("")
                        str2=aux1Str+"*"+auxStr
                        StepsC += 1

                        strDevelopment=strDevelopment.split("("+auxStr+")").join(auxStr)
                        strDevelopment=strDevelopment.split("("+aux1Str+")").join(aux1Str)
                        
                        if (auxStr.includes(".")) {
                            auxStr=tofrac(auxStr)
                        }
                        
                        if (aux1Str.includes(".")) {
                            aux1Str=tofrac(aux1Str)
                        }
                        
                        res=EvaluateFrac((aux1Str+"*"+auxStr))
                        
                        str1=strToLang("Paso")+StepsC+": quad"
                        StepLatex(str1, strDevelopment, str2, str3, res, false, true)
                        str2=aux1Str+"*"+auxStr
                        str1 = "-> ["+str2+"]="+StepsFrac(str2)+"="+res
                        
                        strltx+="<p style='text-align:center' >`"+str1+"`</p>"
                    }else{
                        res=WrongExpresion()
                    }

                    strltx+="</div>"
                    strltx+="</div>"
                    
                    S.push( res )
                    
                    break
                case "√":
                    STR.pop()
                    auxStr = S[S.length-1] === undefined ? "": S.pop()
                    aux1Str=S[S.length-1] === undefined ? "": S.pop()

                    auxStr=auxStr.split("(").join("")
                    aux1Str = aux1Str.split("(").join("")
                    auxStr = auxStr.split(")").join("")
                    aux1Str = aux1Str.split(")").join("")
 
                    if ((isNumber(auxStr) && isNumber(aux1Str)) || (auxStr===""||aux1Str==="")) {

                        str2=aux1Str+"√"+auxStr;
                        strDevelopment=strDevelopment.split("("+aux1Str+")").join(aux1Str)
                        strDevelopment=strDevelopment.split("("+auxStr+")").join(auxStr)

                        if (!strDevelopment.includes("√"+auxStr)) {
                            aux1Str=auxStr
                            auxStr=""
                            str2=aux1Str+"√"+auxStr
                        } else {
                            auxStr=DoubleStr(auxStr)
                        }
                        StepsC += 1
                        auxStr=auxStr.split("pi").join(Math.PI.toString())
                        aux1Str = aux1Str.split("pi").join(Math.PI.toString())

                        if (MoreDVal !== 1 && toDecimalVal === 1) {
                            res = sqrtStr(auxStr, aux1Str)
                            res = res.split("e+").join("e")
                        }else{
                            res = sqrtStr(auxStr, aux1Str)
                            res = moreDStr(res)
                        }

                        res=cleanR(res)

                        str1=strToLang("Paso")+StepsC+": quad"

                        StepLatex(str1, strDevelopment, str2, str3, res, change, true)

                        str2="root("+aux1Str+")("+auxStr+")"

                        strltx=strltx.split(aux1Str+"√"+auxStr).join(str2)

                        str1="-> "
                        if (change) {
                            if (toDecimalVal===1){
                                str2="[ "+str3+" ]"
                            }else{
                                if (str3.includes(".")) {
                                    str3=scanNumbers(str3,false)
                                    str3 = "["+str3+"]="+StepsFrac(str3)
                                }
                                str2=str3
                            }

                        }else{
                            if (toDecimalVal===1) {
                                str2="[ "+str2+" ]"
                            }else{
                                if (str2.includes(".")) {
                                    str2=scanNumbers(str2,false)
                                    str2 = "["+str2+"]="+StepsFrac(str2)
                                }
                                str2=" "+str2+" "
                            }
                        }
                        if (toDecimalVal===1) {
                            str1=str1+str2+" = "+res
                        }else{
                            str1=str1+str2+" = "+scanNumbers(res,false)
                        }
                        str1=str1.split(' + -').join(" - ")
                        str1=str1.split('pi').join(Math.PI.toString())

                        strltx+="<p style='text-align:center' >`"+str1+"`</p>"


                    }
                    else if (isFrac(auxStr) && isFrac(aux1Str)) {
                        aux1Str=aux1Str.split('(').join("")
                        auxStr=auxStr.split('(').join("")
                        aux1Str=aux1Str.split(')').join("")
                        auxStr=auxStr.split(')').join("")
                        str2=aux1Str+"+"+auxStr
                        StepsC += 1
                        strDevelopment=strDevelopment.split("("+auxStr+")").join(auxStr)
                        strDevelopment=strDevelopment.split("("+aux1Str+")", aux1Str)
                        if (auxStr.includes(".")){
                            auxStr=tofrac(auxStr)
                        }

                        if (aux1Str.includes(".")) {
                            aux1Str=tofrac(aux1Str)
                        }
                        res=EvaluateFrac((aux1Str+"+"+auxStr).split("+-").join("-"))
                        str2=str2.split("+-").join("-")
                        str1=strToLang("Paso")+StepsC+": quad"
                        StepLatex(str1, strDevelopment, str2, str3, res, false, true)
                        str2=aux1Str+"+"+auxStr
                        str2=str2.split("+-").join("-")
                        str1 = "-> ["+str2+"]="+StepsFrac(str2)+"="+res

                        strltx+="<p style='text-align:center' >`"+str1+"`</p>"

                    }else{
                        res=strToLang("WrongEx")
                    }
                    strltx+="</div>"
                    strltx+="</div>"
                    S.push( res )

                    break
                case "^":
                    STR.pop()
                    auxStr = S[S.length-1] === undefined ? "0":S.pop()
                    aux1Str=S[S.length-1] === undefined ? "0": S.pop()

                    if (isNumber(auxStr) && isNumber(aux1Str)) {
                        str2=aux1Str+"^"+auxStr
                        strDevelopment=strDevelopment.split("("+aux1Str+")").join(aux1Str)
                        strDevelopment=strDevelopment.split("("+auxStr+")").join(auxStr)
                        auxStr=DoubleStr(auxStr)
                        aux1Str=DoubleStr(aux1Str)
                        StepsC += 1
                        aux1Str = aux1Str.split("pi").join(Math.PI.toString())
                        auxStr=auxStr.split("pi").join(Math.PI.toString())

                        if (MoreDVal !== 1 && toDecimalVal === 1) {
                            res = powStr(aux1Str, auxStr)
                            res = res.split("e+").join("e")
                            res = "("+res+")"
                        }else{
                            res = powStr(aux1Str, auxStr)
                            res = moreDStr(res)
                        }

                        res=cleanR(res)

                        change=false
                        aux1Str=aux1Str.split("+").join("")

                        str1=strToLang("Paso")+StepsC+": quad"

                        StepLatex(str1, strDevelopment, str2, str3, res, change, true)

                        str1="-> "
                     
                            if (toDecimalVal===1){
                                str2="[ "+str2+" ]"
                            }else{

                                if (str2.includes(".")) {
                                    str2=scanNumbers(str2,false)
                                    str2 = "["+str2+"]="+StepsFrac(str2)
                                }

                                str2=" "+str2+" "
                            }
                      
                        if (toDecimalVal===1) {
                            str1=str1+str2+" = "+res
                        }else{
                            str1=str1+str2+" = "+scanNumbers(res,false)
                        }
                        str1=str1.split("pi").join(Math.PI.toString())
                        strltx+="<p style='text-align:center' >`"+str1+"`</p>"


                    }
                    else if (isFrac(auxStr) && isFrac(aux1Str)) {
                        aux1Str=aux1Str.split("(").join("")
                        auxStr=auxStr.split("(").join("")
                        aux1Str=aux1Str.split(")").join("")
                        auxStr=auxStr.split(")").join("")
                        str2=aux1Str+"+"+auxStr
                        StepsC += 1
                        strDevelopment=strDevelopment.split("("+auxStr+")").join(auxStr)
                        strDevelopment=strDevelopment.split("("+aux1Str+")").join(aux1Str)
                        if (auxStr.includes(".")) {
                            auxStr=tofrac(auxStr)
                        }

                        if (aux1Str.includes(".")) {
                            aux1Str=tofrac(aux1Str)
                        }
                        res=EvaluateFrac((aux1Str+"+"+auxStr).split("+-").join("-"))

                        str2=str2.split("+-").join("-")
                        str1=strToLang("Paso")+StepsC+": quad"
                        StepLatex(str1, strDevelopment, str2, str3, res, false, true)
                        str2=aux1Str+"+"+auxStr
                        str2=str2.split("+-").join("-")
                        str1 = "-> ["+str2+"]="+StepsFrac(str2)+"="+res

                        strltx+="<p style='text-align:center' >`"+str1+"`</p>"

                    }else{
                        res=strToLang("WrongEx")
                    }

                    strltx+="</div>"
                    strltx+="</div>"
                    S.push( res )

                    break
                case "ln":
                    STR.pop()

                    auxStr = S[S.length-1] === undefined ? "0": S.pop()
                    auxStr=auxStr.split(")").join("")
                    auxStr = auxStr.split("(").join("")

                    if (auxStr.includes("/")) {
                        //auxStr.removeFirst()
                        //auxStr.removeLast()
                        auxStr = auxStr.slice(1, auxStr.length - 1)
                        let strArr=auxStr.split("/")
                        let n1=strArr[0]
                        let n2=strArr[1]
                        let aux1S=auxStr

                        auxStr=dividestr(n1, n2, 8)
                        strDevelopment=strDevelopment.split(aux1S).join(auxStr)
                    }

                    str2="ln("+auxStr+")"
                    auxStr=DoubleStr(auxStr)

                    if (isNumber(auxStr)) {
                        StepsC += 1
                        auxStr=auxStr.split('pi').join(Math.PI.toString())
                        if (MoreDVal !== 1 && toDecimalVal === 1) {
                            res =  ShaveStr(lnStr(auxStr), 16)
                            res = res.split("e+").join("e")
                        }else{
                            res = lnStr(auxStr)
                        }

                        res=cleanR(res)

                        str1=strToLang("Paso")+StepsC+": quad"
                        strDevelopment=strDevelopment.split("ln"+auxStr).join("ln("+auxStr+")")
                        strDevelopment=strDevelopment.split("--").join("+")
                        strDevelopment=strDevelopment.split("-+").join("-")

                            StepLatex(str1, strDevelopment, str2, str2, res, false, true)

                        str1="-> "
                        str2="ln("+auxStr+")"
                        if (toDecimalVal===1) {
                            str1=str1+str2+" = "+res.split("+").join("")
                        }else{
                            if (str2.includes(".")) {
                                str2=scanNumbers("ln("+auxStr+")",false)
                                str2=str2.split("ln").join("ln(")+")"
                                str2=str2+StepsFrac(str2)
                            }
                            str1=str1+str2+" = "+tofrac(DoubleStr(res.split("+").join("")))
                        }
                        str1=str1.split("pi").join(Math.PI.toString())
                        strltx+="<p style='text-align:center' >`"+str1+"`</p>"

                    }else{
                        res=WrongExpresion()
                    }

                    strltx+="</div>"
                    strltx+="</div>"

                    S.push( res )

                    break
                case "log10_":
                    STR.pop()

                    auxStr = S[S.length-1] === undefined ? "0": S.pop()
                    auxStr=auxStr.split("(").join("")
                    auxStr=auxStr.split(")").join("")

                    if (auxStr.includes("/")){
                        auxStr = auxStr.slice(1, auxStr.length - 1)

                        let strArr=auxStr.split("/")
                        let n1=strArr[0]
                        let n2=strArr[1]
                        let aux1S=auxStr

                        auxStr=dividestr(n1, n2, 8)
                        strDevelopment=strDevelopment.split(aux1S).join(auxStr)
                    }

                    str2="log_10("+auxStr+")"
                    auxStr=DoubleStr(auxStr)
                    strDevelopment=strDevelopment.split("log_10"+auxStr).join(str2)

                    if (isNumber(auxStr)) {
                        StepsC += 1
                        auxStr=auxStr.split("pi").join(Math.PI.toString())
                        if (MoreDVal !== 1 && toDecimalVal === 1) {
                            res =  ShaveStr(log10Str(auxStr), 16)
                            res = res.split("e+").join('e')
                        }else{
                            res = log10Str(auxStr)
                        }

                        res=cleanR(res)

                        str1=strToLang("Paso")+StepsC+": quad"
                        strDevelopment=strDevelopment.split("log10_"+auxStr).join("log_10("+auxStr+")")
                        strDevelopment=strDevelopment.split("--").join("+")
                        strDevelopment=strDevelopment.split("-+").join("-")

                            StepLatex(str1, strDevelopment, str2, str2, res, false, true)

                        str1="-> "
                        str2="log_10("+auxStr+")"
                        if (toDecimalVal===1){
                            str1=str1+str2+" = "+res.split("+").join("")
                        }else{
                            if (str2.includes(".")) {
                                str2=scanNumbers("log_10("+auxStr+")",false)
                                str2=str2.split("log_10").join("log_10(")+")"
                                str2=str2+StepsFrac(str2)
                            }
                            str1=str1+str2+" = "+tofrac(DoubleStr(res.split("+").join("")))

                        }
                        str1=str1.split("pi").join(Math.PI.toString())

                        strltx+="<p style='text-align:center' >`"+str1+"`</p>"

                    }else{
                        res=WrongExpresion()
                    }

                    strltx+="</div>"
                    strltx+="</div>"

                    S.push( res )

                    break
                case "log2_":
                    STR.pop()
                    auxStr = S[S.length-1] === undefined ? "0": S.pop()
                    auxStr=auxStr.split("(").join("")
                    auxStr=auxStr.split(")").join("")

                    if (auxStr.includes("/")){
                        auxStr = auxStr.slice(1, auxStr.length - 1)
                        let strArr=auxStr.split("/")
                        let n1=strArr[0]
                        let n2=strArr[1]
                        let aux1S=auxStr

                        auxStr=dividestr(n1, n2, 8)
                        strDevelopment=strDevelopment.split(aux1S).join(auxStr)
                    }

                    str2="log_2("+auxStr+")"
                    auxStr=DoubleStr(auxStr)
                    strDevelopment=strDevelopment.split("log_2"+auxStr).join(str2)

                    if (isNumber(auxStr)) {
                        StepsC += 1
                        auxStr=auxStr.split("pi").join(Math.PI.toString())
                        if (MoreDVal !== 1 && toDecimalVal === 1) {
                            res = ShaveStr(log2Str(auxStr), 16)
                            res = res.split("e+").join("e")
                        }else{
                            res = log2Str(auxStr)
                        }

                        res=cleanR(res)

                        str1=strToLang("Paso")+StepsC+": quad"
                        strDevelopment=strDevelopment.split("log2_"+auxStr).join("log_2("+auxStr+")")
                        strDevelopment=strDevelopment.split("--").join("+")
                        strDevelopment=strDevelopment.split("-+").join("-")
                        StepLatex(str1, strDevelopment, str2, str2, res, false, true)

                        str1="-> "
                        str2="log_2("+auxStr+")"
                        if (toDecimalVal===1) {
                            str1=str1+str2+" = "+res.split("+").join("")
                        }else{
                            if (str2.includes(".")){
                                str2=scanNumbers("log_2("+auxStr+")",false)
                                str2=str2.split("log_2").join("log_2(")+")"
                                str2=str2+StepsFrac(str2)
                            }
                            str1=str1+str2+" = "+tofrac(DoubleStr(res.split("+").join("")))
                        }
                        str1 = str1.split("pi").join(Math.PI.toString())

                        strltx+="<p style='text-align:center' >`"+str1+"`</p>"

                    }else{
                        res=WrongExpresion()
                    }

                    strltx+="</div>"
                    strltx+="</div>"

                    S.push( res )

                    break
                case "c":
                    STR.pop()

                    auxStr = S[S.length-1] === undefined ? "c" : S.pop()
                    auxStr=auxStr.split("(").join("")
                    auxStr = auxStr.split(")").join("")
                    if (auxStr.includes("/")) {
                        auxStr = auxStr.slice(1, auxStr.length - 1)

                        let strArr=auxStr.split("/")
                        let n1=strArr[0]
                        let n2=strArr[1]
                        let aux1S=auxStr

                        auxStr=dividestr(n1, n2, 8)
                        strDevelopment=strDevelopment.split(aux1S).join(auxStr)
                    }

                    str2="c"+auxStr
                    auxStr=DoubleStr(auxStr)

                    if (isNumber(auxStr)) {
                        StepsC += 1
                        auxStr=auxStr.split('pi').join(Math.PI.toString())
                        if (MoreDVal !== 1&&toDecimalVal === 1) {
                            res = ShaveStr((cosStr(auxStr, DegRad)), 16)
                            res = res.split('e+').join("e")
                        }else{
                            res = cosStr(auxStr, DegRad)
                        }

                        res=cleanR(res)
                        str2=str2.split('c+').join("c")
                        str1=strToLang("Paso")+StepsC+": quad"

                        strDevelopment=strDevelopment.split("("+auxStr+")").join(auxStr)
                        strDevelopment=strDevelopment.split("--").join("+")
                        strDevelopment=strDevelopment.split("-+").join("-")
                        StepLatex(str1, strDevelopment, str2, str2, res, false, true)

                        str1="-> "
                        str2="C O S("+auxStr+")"
                        if (toDecimalVal===1) {
                            str1=str1+str2+" = "+res.split("+").join("")
                        }else{
                            if (str2.includes(".")) {
                                str2=scanNumbers("c"+auxStr,false)
                                str2=str2.split("c").join("C O S(")+")"
                                str2=str2+StepsFrac(str2)
                            }
                            str1=str1+str2+" = "+tofrac(DoubleStr(res.split("+").join("")))
                        }
                        str1=str1.split("pi").join(Math.PI.toString())
                        strltx+="<p style='text-align:center' >`"+str1+"`</p>"
                    }else{
                        res=WrongExpresion()
                    }

                    strltx+="</div>"
                    strltx+="</div>"

                    S.push( res )

                    break
                case "s":
                    STR.pop()

                    auxStr = S[S.length-1] === undefined ? "s" : S.pop()
                    auxStr=auxStr.split("(").join("")
                    auxStr = auxStr.split(")").join("")
                    if (auxStr.includes("/")){
                        auxStr = auxStr.slice(1, auxStr.length - 1)

                        let strArr=auxStr.split("/")
                        let n1=strArr[0]
                        let n2=strArr[1]
                        let aux1S=auxStr

                        auxStr=dividestr(n1, n2, 8)
                        strDevelopment=strDevelopment.split(aux1S).join(auxStr)
                    }
                    str2="s"+auxStr
                    auxStr=DoubleStr(auxStr)
                    if (isNumber(auxStr)) {
                        StepsC += 1
                        auxStr=auxStr.split('pi').join(Math.PI.toString())
                        if (MoreDVal !== 1 && toDecimalVal === 1) {
                            res = ShaveStr((senStr(auxStr,DegRad)), 16)
                            res = res.split('e+').join("e")
                        }else{
                            res = senStr(auxStr,DegRad)
                        }

                        res=cleanR(res)

                        str2=str2.split('s+').join("s")
                        str1=strToLang("Paso")+StepsC+": quad"

                        strDevelopment=strDevelopment.split("("+auxStr+")").join(auxStr)
                        strDevelopment=strDevelopment.split("--").join("+")
                        strDevelopment=strDevelopment.split("-+").join("-")
                        StepLatex(str1, strDevelopment, str2, str2, res, false, true)

                        str1="-> "
                        str2="S E N("+auxStr+")"
                        if (toDecimalVal===1){
                            //str2="[ Cos("+String(auxStr)+" ) ]"
                            str1=str1+str2+" = "+res.split("+").join("")
                        }else{
                            if (str2.includes(".")) {
                                str2=scanNumbers("s"+auxStr,false)
                                str2=str2.split("s").join("S E N(")+")"
                                str2=str2+StepsFrac(str2)
                            }
                            str1=str1+str2+" = "+tofrac(DoubleStr(res.split("+").join("")))
                        }
                        str1=str1.split("pi").join(Math.PI.toString())
                        strltx+="<p style='text-align:center' >`"+str1+"`</p>"

                    }else{
                        res=WrongExpresion()
                    }

                    strltx+="</div>"
                    strltx+="</div>"

                    S.push( res )

                    break
                case "t":
                    STR.pop()

                    auxStr = S[S.length-1] === undefined ? "t" : S.pop()
                    auxStr=auxStr.split("(").join("")
                    auxStr = auxStr.split(")").join("")

                    if (auxStr.includes("/")) {
                        auxStr = auxStr.slice(1, auxStr.length - 1)
                        let strArr=auxStr.split("/")
                        let n1=strArr[0]
                        let n2=strArr[1]
                        let aux1S=auxStr

                        auxStr=dividestr(n1, n2, 8)
                        strDevelopment=strDevelopment.split(aux1S).join(auxStr)
                    }

                    str2="t"+auxStr
                    auxStr=DoubleStr(auxStr)
                    if (isNumber(auxStr)) {
                        StepsC += 1
                        auxStr=auxStr.split('pi').join(Math.PI.toString())
                        if (MoreDVal !== 1 && toDecimalVal === 1){
                            res = ShaveStr((tanStr(auxStr,DegRad)), 16)
                            res = res.split('e+').join("e")
                        }else{
                            res = tanStr(auxStr, DegRad)
                        }

                        res=cleanR(res)
                        str2=str2.split('t+').join("t")
                        str1=strToLang("Paso")+StepsC+": quad"
                        strDevelopment=strDevelopment.split("("+auxStr+")").join(auxStr)
                        strDevelopment=strDevelopment.split("--").join("+")
                        strDevelopment=strDevelopment.split("-+").join("-")
                        StepLatex(str1, strDevelopment, str2, str2, res, false, true)

                        str1="-> "
                        str2="T A N("+auxStr+")"
                        if (toDecimalVal===1){
                            str1=str1+str2+" = "+res.split("+").join("")
                        }else{
                            if (str2.includes(".")){
                                str2=scanNumbers("t"+auxStr,false)
                                str2=str2.split("t").join("T A N(")+")"
                                str2=str2+StepsFrac(str2)
                            }
                            str1=str1+str2+" = "+tofrac(DoubleStr(res.split("+").join("")))

                        }
                        str1=str1.split("pi").join(Math.PI.toString())
                        strltx+="<p style='text-align:center' >`"+str1+"`</p>"
                    }else{
                        res=WrongExpresion()
                    }

                    strltx+="</div>"
                    strltx+="</div>"

                    S.push( res )

                    break
                case "·":
                case "⋅":
                    auxStr = S[S.length-1] === undefined ? STR[STR.length-1] : S.pop()
                    aux1Str=S[S.length-1] === undefined ? STR[STR.length-1] : S.pop()
                    auxStr=auxStr.split("(").join("")
                    aux1Str = aux1Str.split("(").join("")
                    auxStr = auxStr.split(")").join("")
                    aux1Str = aux1Str.split(")").join("")
                    if (isNumber(auxStr) && isNumber(aux1Str)) {
                        StepsC += 1
                        str2=aux1Str+''+STR[STR.length-1]+''+auxStr
                        strDevelopment=strDevelopment.split("("+aux1Str+")").join(aux1Str)
                        strDevelopment=strDevelopment.split("("+auxStr+")").join(auxStr)

                        auxStr=DoubleStr(auxStr)
                        aux1Str=DoubleStr(aux1Str)
                        auxStr=auxStr.split("pi").join(Math.PI.toString())
                        aux1Str = aux1Str.split("pi").join(Math.PI.toString())

                        if (MoreDVal !== 1&&toDecimalVal === 1){
                            let aux = (isNumber(auxStr) ? Number(auxStr) : 0.0)
                            let aux1 = (isNumber(aux1Str) ? Number(aux1Str) : 0.0)
                            let nD = place(auxStr, aux1Str)

                            res = (round((aux * aux1)*nD)/nD).toString()
                            res = res.split("+").join("")

                        }else{
                            res =  forstr(auxStr, aux1Str)
                        }

                        res=cleanR(res)
                        str2=str2.split(STR[STR.length-1]+"+").join(STR[STR.length-1])
                        str1=strToLang("Paso")+StepsC+": quad"

                        strDevelopment=strDevelopment.split("--").join("+")
                        strDevelopment=strDevelopment.split("-+").join("-")

                        if (LessThan(aux1Str,"0.0") && LessThan(auxStr,"0.0")) {
                            StepLatex(str1, strDevelopment, str2, str2, "+"+res, false, true)
                        }else{
                            StepLatex(str1, strDevelopment, str2, str2, res, false, true)
                        }


                        str1="-> "
                        if (toDecimalVal===1){
                            str2="[ "+String(aux1Str)+" · "+String(auxStr)+" ]"
                            str1=str1+str2+" = "+res.split("+").join("")
                        }else{
                            if (str2.includes(STR[STR.length-1])) {

                                str2=scanNumbers(aux1Str+"·"+auxStr,false)
                                str2="["+str2+"]="+StepsFrac(str2)
                            }
                            str1=str1+str2+" = "+DoubleStr(tofrac(res.split("+").join("")))
                        }
                        str1=str1.split("pi").join(Math.PI.toString())
                        strltx+="<p style='text-align:center' >`"+str1+"`</p>"
                    }
                    else if (isFrac(auxStr) && isFrac(aux1Str)) {
                        aux1Str=aux1Str.split("(").join("")
                        auxStr = auxStr.split("(").join("")
                        aux1Str = aux1Str.split(")").join("")
                        auxStr = auxStr.split(")").join("")
                        str2=aux1Str+"·"+auxStr
                        StepsC += 1

                        strDevelopment=strDevelopment.split("("+auxStr+")").join(auxStr)
                        strDevelopment=strDevelopment.split("("+aux1Str+")").join(aux1Str)

                        if (auxStr.includes(".")) {
                            auxStr=tofrac(auxStr)
                        }

                        if (aux1Str.includes(".")){
                            aux1Str=tofrac(aux1Str)
                        }

                        res=EvaluateFrac(aux1Str+STR[STR.length-1]+auxStr)

                        str1=strToLang("Paso")+StepsC+": quad"
                        StepLatex(str1, strDevelopment, str2, str3, res, false, true)
                        str2=aux1Str+STR[STR.length-1]+auxStr
                        str1 = "-> ["+str2+"]="+StepsFrac(str2)+"="+res

                        strltx+="<p style='text-align:center' >`"+str1+"`</p>"
                    }else{
                        res=WrongExpresion()
                    }

                    strltx+="</div>"
                    strltx+="</div>"

                    S.push( res )
                    STR.pop()
                    
                    break
                case "/":
                    STR.pop()

                    auxStr = S[S.length-1] === undefined ? "÷": S.pop()
                    aux1Str=S[S.length-1] === undefined ? "÷": S.pop()
                    let band = true
                    auxStr=auxStr.split("+").join("")
                    aux1Str=aux1Str.split("+").join("")

                    if (isNumber(auxStr) && isNumber(aux1Str)){

                        str2=aux1Str+"/"+auxStr
                        strDevelopment=strDevelopment.split("("+aux1Str+")").join(aux1Str)
                        strDevelopment=strDevelopment.split("("+auxStr+")").join(auxStr)

                        auxStr=DoubleStr(auxStr)
                        aux1Str=DoubleStr(aux1Str)
                        auxStr=auxStr.split("pi").join(Math.PI.toString())
                        aux1Str=aux1Str.split("pi").join(Math.PI.toString())
                        if (toDecimalVal === 1) {
                            if (MoreDVal !== 1) {
                                if (aux1Str.includes("e")) {
                                    strDevelopment=strDevelopment.split(aux1Str).join("("+aux1Str+")")
                                    aux1Str="("+aux1Str+")"
                                    str2=aux1Str+"/"+auxStr
                                }
                                if (auxStr.includes("e")) {
                                    strDevelopment=strDevelopment.split(auxStr).join("("+auxStr+")")
                                    auxStr="("+auxStr+")"
                                    str2=aux1Str+"/"+auxStr
                                }
                                let auxStrD=auxStr
                                auxStrD=auxStrD.split('(').join("")
                                let aux1StrD=aux1Str
                                aux1StrD=aux1Str.split('(').join("")
                                auxStrD=auxStrD.split(')').join("")
                                aux1StrD = aux1Str.split(')').join("")

                                let aux = (isNumber(auxStr) ? Number(auxStr) : 0.0)
                                let aux1 = (isNumber(aux1Str) ? Number(aux1Str) : 0.0)

                                res = (aux1 / aux).toString()
                                if (res.length > 16) {
                                    let nD = pow(10.0, 14.0)
                                    res = (round((aux1 / aux)*nD)/nD).toString()
                                }
                                res = res.split('e+').join("e")
                            } else {
                                res = dividestr(aux1Str, auxStr, 128)
                            }
                            if (aux1Str.startsWith("-") && LessThan(auxStr, "0.0")) {
                                res = "+"+res
                            }

                            res=cleanR(res)
                            strDevelopment=strDevelopment.split('--').join("+")

                        }else{

                            if (aux1Str.includes(".") || auxStr.includes(".")){
                                aux1Str="("+tofrac(aux1Str)+")"
                                auxStr="("+tofrac(auxStr)+")"
                                res=EvaluateFrac(aux1Str+"÷"+auxStr)
                            }else{
                                res="("+aux1Str+"/"+auxStr+")"
                            }

                        }

                        band = str2.includes(".") || toDecimalVal === 1

                        if (band) {
                            StepsC += 1
                        }

                        str1=strToLang("Paso")+StepsC+": quad"

                        strDevelopment=strDevelopment.split('-+').join("-")

                        StepLatex(str1, strDevelopment, str2, str2, res, false,band)
                        res=res.split('+').join("")
                        str1="-> "

                        if (toDecimalVal===1) {
                            str2="[ "+str2+" ]"
                            str1=str1+str2+" = "+res
                        }
                        else{

                            if (str2.includes(".")) {
                                str2=aux1Str+"÷"+auxStr

                                str2=scanNumbers(str2,false)

                                str2="["+str2+"]="+StepsFrac(str2)
                            }
                            str2=str2.split('÷').join("/")

                            str1=str1+str2+" = "+tofrac(DoubleStr(res))


                        }
                        str1=str1.split('pi').join(Math.PI.toString())

                        if (band) {
                            strltx+="<p style='text-align:center' >`"+str1+"`</p>"
                        }
                    }
                    else if (isFrac(auxStr) && isFrac(aux1Str)){
                        aux1Str=aux1Str.split('(').join("")
                        auxStr=auxStr.split('(').join("")
                        aux1Str=aux1Str.split(')').join("")
                        auxStr=auxStr.split(')').join("")

                        str2=aux1Str+"/"+auxStr
                        StepsC += 1
                        strDevelopment=strDevelopment.split("("+auxStr+")").join(auxStr)
                        strDevelopment=strDevelopment.split("("+aux1Str+")").join(aux1Str)
                        if (auxStr.includes(".")) {
                            auxStr=tofrac(auxStr)
                        }
                        if (aux1Str.includes(".")) {
                            aux1Str=tofrac(aux1Str)
                        }

                        res=EvaluateFrac(aux1Str+"÷"+auxStr)

                        str1=strToLang("Paso")+StepsC+": quad"
                        StepLatex(str1, strDevelopment, str2, str3, res, false, true)
                        str2=aux1Str+"÷"+auxStr
                        str1 = "-> [("+aux1Str+")/("+auxStr+")]="+StepsFrac(str2)+"="+res

                        strltx+="<p style='text-align:center' >`"+str1+"`</p>"

                    }
                    else{
                        res=WrongExpresion()
                    }

                    strltx+="</div>"
                    strltx+="</div>"

                    S.push( res )

                    break
                case "%":
                    STR.pop()

                    auxStr = S[S.length-1] === undefined ? "%": S.pop()
                    aux1Str=S[S.length-1] === undefined ? "%": S.pop()
                    band = true
                    auxStr=auxStr.split("+").join("")
                    aux1Str=aux1Str.split("+").join("")
                    if (isNumber(auxStr) && isNumber(aux1Str)) {
                        str2=aux1Str+"%"+auxStr
                        strDevelopment=strDevelopment.split("("+aux1Str+")").join(aux1Str)
                        strDevelopment=strDevelopment.split("("+auxStr+")").join(auxStr)

                        auxStr=DoubleStr(auxStr)
                        aux1Str=DoubleStr(aux1Str)
                        auxStr=auxStr.split("pi").join(Math.PI.toString())
                        aux1Str=aux1Str.split("pi").join(Math.PI.toString())
                        if (toDecimalVal === 1) {
                            if (MoreDVal !== 1) {
                                if (aux1Str.includes("e")) {
                                    strDevelopment=strDevelopment.split(aux1Str).join("("+aux1Str+")")
                                    aux1Str="("+aux1Str+")"
                                    str2=aux1Str+"%"+auxStr
                                }
                                if (auxStr.includes("e")) {
                                    strDevelopment=strDevelopment.split(auxStr).join("("+auxStr+")")
                                    auxStr="("+auxStr+")"
                                    str2=aux1Str+"%"+auxStr

                                }
                                var auxStrD=auxStr
                                auxStrD=auxStrD.split('(').join("")
                                //auxStrD=auxStrD.replacingOccurrences(of: ")", with: "")
                                var aux1StrD=aux1Str
                                aux1StrD=aux1StrD.split('(').join("")
                                auxStrD=auxStrD.split(')').join("")
                                aux1StrD = aux1StrD.split(')').join("")

                                let aux = (isNumber(auxStr) ? Number(auxStr) : 1)
                                let aux1 = (isNumber(aux1Str) ? Number(aux1Str) : 0)
                                res = (aux1 % aux).toString()
                                res = res.split('e+').join("e")
                            } else {
                                res = residuo(aux1Str, auxStr)
                            }


                            if (aux1Str.startsWith("-") && LessThan(auxStr,"0.0")) {
                                res = "+"+res
                            }

                            res=cleanR(res)
                            strDevelopment=strDevelopment.split('--').join("+")

                        }

                        band = str2.includes(".") || toDecimalVal === 1

                        if (band) {
                            StepsC += 1
                        }

                        str1=strToLang("Paso")+StepsC+": quad"
                        strDevelopment=strDevelopment.split('-+').join("-")

                        StepLatex(str1, strDevelopment, str2, str2, res, false, band)
                        res=res.split('+').join("")
                        str1="-> "

                        if (toDecimalVal===1) {
                            str2="[ "+str2+" ]"
                            str1=str1+str2+" = "+res
                        }
                        else{

                            if (str2.includes(".")) {
                                str2=aux1Str+"÷"+auxStr

                                str2=scanNumbers(str2,false)

                                str2="["+str2+"]="+StepsFrac(str2)
                            }

                            str1=str1+str2+" = "+tofrac(DoubleStr(res))


                        }
                        str1=str1.split('pi').join(Math.PI.toString())

                        if (band) {
                            strltx+="<p style='text-align:center' >`"+str1+"`</p>"
                        }

                    }
                    else if (isFrac(auxStr) && isFrac(aux1Str)) {
                        aux1Str=aux1Str.split('(').join("")
                        auxStr=auxStr.split('(').join("")
                        aux1Str=aux1Str.split(')').join("")
                        auxStr=auxStr.split(')').join("")

                    }
                    else{
                        res=WrongExpresion()
                    }

                    strltx+="</div>"
                    strltx+="</div>"

                    S.push( res )

                break
                default:
                    S.push(STR.pop())
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