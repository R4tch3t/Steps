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
            
            while (STR.length>0) {
                
                switch (STR[STR.length-1]) {
                case "+":
                    STR.pop()
                    let auxStr = S[S.length-1] === undefined ? "+": S.pop()
                    let aux1Str = S[S.length-1] === undefined ? "+": S.pop()
                    let aux2Str=""
                    let re = new RegExp("(" + aux1Str + ")", 'g');
                    if (isNumber(auxStr) && isNumber(aux1Str)) {
                        strDevelopment = strDevelopment.replace(re, aux1Str)
                        re = new RegExp("("+auxStr+")", 'g');
                        strDevelopment = strDevelopment.replace(re, auxStr)
                        re = new RegExp("(", 'g');
                        auxStr = auxStr.replace(re, "")
                        aux1Str = aux1Str.replace(re, "")
                        re = new RegExp(")", 'g');
                        auxStr = auxStr.replace(re, "")
                        aux1Str = aux1Str.replace(re, "")
                        re = new RegExp("("+aux1Str+")", 'g');
                        strDevelopment = strDevelopment.replace(re, aux1Str)
                        re = new RegExp("("+auxStr+")", 'g');
                        strDevelopment = strDevelopment.replace(re, auxStr)

                        //V.strDevelopment=V.strDevelopment.replacingOccurrences(of: "("+aux1Str+")", with: aux1Str)
                        //V.strDevelopment=V.strDevelopment.replacingOccurrences(of: "("+auxStr+")", with: auxStr)
                        str2=aux1Str+"+"+auxStr

                        auxStr=DoubleStr(auxStr)
                        aux1Str=DoubleStr(aux1Str)
                        StepsC += 1
                        re = new RegExp("pi", 'g');
                        auxStr = auxStr.replace(re, Math.PI.toString())
                        re = new RegExp("pi", 'g');
                        aux1Str = aux1Str.replace(re, Math.PI.toString())
                        //auxStr=auxStr.replacingOccurrences(of: "pi", with: String(Double.pi))
                        //aux1Str=aux1Str.replacingOccurrences(of: "pi", with: String(Double.pi))
                        if (MoreDVal !== 1 && toDecimalVal === 1) {
                            let aux = (Number(auxStr) ? Number(auxStr) : 0.0)
                            let aux1 = (Number(aux1Str) ? Number(aux1Str) : 0.0)//(Double(aux1Str) ? ? 0.0)
                            let nD = nDigits(auxStr, aux1Str)

                            res = (round((aux + aux1)*nD)/nD).toString()
                            re = new RegExp("e+", 'g');
                            res = res.replace(re, 'e')
                            //res = res.replacingOccurrences(of: "e+", with: "e")
                        //res =  MthS.ShaveStr( (MthS.plusstr(auxStr, aux1Str)),16 )
                        }else{

                            res = plusstr(auxStr, aux1Str)
                        }

                        res=cleanR(res)

                     if ((aux1Str.startsWith("-") && (BiggerThan(auxStr, "0.0") || auxStr == "0.0")) && (auxStr != "oo" && aux1Str != "oo")) {
                            aux2Str=auxStr
                            auxStr=aux1Str
                            aux1Str=aux2Str
                            //aux1Str=aux1Str.replacingOccurrences(of: "+", with: "")
                            re = new RegExp("+", 'g');
                            aux1Str = aux1Str.replace(re, '')
                            str3=aux1Str+auxStr
                            re = new RegExp("--", 'g');
                            strDevelopment = strDevelopment.replace(re, '+')
                            re = new RegExp("+-", 'g');
                            strDevelopment = strDevelopment.replace(re, '-')
                            re = new RegExp("-+", 'g');
                            strDevelopment = strDevelopment.replace(re, '-')
                            change=true
                            
                        }else{
                            change=false
                            re = new RegExp("+", 'g');
                            aux1Str = aux1Str.replace(re, '')
                        }
                        re = new RegExp("+-", 'g');
                        str2 = str2.replace(re, '-')
                        str3 = str3.replace(re, '-')
                        
                        str1=strToLang("Paso")+StepsC.toString()+": quad"
                        re = new RegExp("--", 'g');
                        strDevelopment = strDevelopment.replace(re, '+')
                        re = new RegExp("+-", 'g');
                        strDevelopment = strDevelopment.replace(re, '-')
                        re = new RegExp("-+", 'g');
                        strDevelopment = strDevelopment.replace(re, '-')
                        
                        re = new RegExp("++", 'g');
                        str2 = str2.replace(re, '+')
                        str3 = str3.replace(re, '+')

                        StepLatex(str1, strDevelopment, str2, str3, res, change, true)
                        
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
                        re = new RegExp("+", 'g');
                        if (toDecimalVal===1) {
                            str1=str1+str2+" = "+res.replace(re, "")
                            //str1=str1+str2+" = "+res.replacingOccurrences(of: "+", with: "")
                        }else{
                            str1=str1+str2+" = "+scanNumbers(res.replace(re, ""),false)
                            //str1=str1+str2+" = "+scanNumbers(res.replacingOccurrences(of: "+", with: ""),false)
                        }
                        re = new RegExp(" + -", 'g');
                        str1 = str1.replace(re, ' - ');
                        re = new RegExp("pi", 'g');
                        str1 = str1.replace(re, Math.PI.toString());
                        //str1=str1.replacingOccurrences(of: " + -", with: " - ")
                        //str1=str1.replacingOccurrences(of: "pi", with: String(Double.pi))
                        strltx+="<p style='text-align:center' >`"+str1+"`</p>"

                    }
                     else if (isFrac(auxStr) && isFrac(aux1Str)) {
                        re = new RegExp("(", 'g');
                        auxStr = auxStr.replace(re, '');
                        aux1Str = aux1Str.replace(re, '');
                        re = new RegExp(")", 'g');
                        auxStr = auxStr.replace(re, '');
                        aux1Str = aux1Str.replace(re, '');
                        /*aux1Str=aux1Str.replacingOccurrences(of: "(", with: "")
                        aux1Str=aux1Str.replacingOccurrences(of: ")", with: "")
                        auxStr=auxStr.replacingOccurrences(of: "(", with: "")
                        auxStr=auxStr.replacingOccurrences(of: ")", with: "")*/
                       str2=aux1Str+"+"+auxStr
                       StepsC += 1
                       re = new RegExp("("+auxStr+")", 'g');
                       strDevelopment = strDevelopment.replace(re, auxStr);
                       re = new RegExp("("+aux1Str+")", 'g');
                       strDevelopment = strDevelopment.replace(re, aux1Str);
                        //V.strDevelopment=V.strDevelopment.replacingOccurrences(of: "("+auxStr+")", with: auxStr)
                        //V.strDevelopment=V.strDevelopment.replacingOccurrences(of: "("+aux1Str+")", with: aux1Str)
                        if (auxStr.includes(".")) {
                           auxStr=tofrac(auxStr)
                        }
                        
                        if (aux1Str.includes(".")) {
                            aux1Str=tofrac(aux1Str)
                        }
                        re = new RegExp("+-", 'g');
                        res=EvaluateFrac((aux1Str+"+"+auxStr).replace(re,"-"))
                     
                        str2=str2.replace(re, "-")
                        str1=strToLang("Paso")+StepsC.toString()+": quad"
                        StepLatex(str1, strDevelopment, str2, str3, res, false, true)
                        str2=aux1Str+"+"+auxStr
                        str2=str2.replace(re, "-")
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
                    
                    let auxStr = S[S.length-1] === undefined ? "-": S.pop()
                    let aux1Str=S[s.length-1] === undefined ? "-": S.pop()
                    let re = new RegExp("(", 'g');
                    auxStr=auxStr.replace(re, "");
                    aux1Str=aux1Str.replace(re, "");
                    re = new RegExp(")", 'g');
                    auxStr=auxStr.replace(re, "");
                    aux1Str=aux1Str.replace(re, "");

                    re = new RegExp("+", 'g');
                    aux1Str=aux1Str.replace(re, "");
                    //aux1Str=aux1Str.replacingOccurrences(of: "+", with: "")
                    str2=aux1Str+"-"+auxStr

                    
                    if (isNumber(auxStr) && isNumber(aux1Str)) {

                        auxStr=DoubleStr(auxStr)
                        aux1Str=DoubleStr(aux1Str)
                        StepsC += 1
                        re = new RegExp("pi", 'g');
                        auxStr=auxStr.replace("pi", Math.PI.toString())
                        aux1Str=aux1Str.replace("pi", Math.PI.toString())
                       if (MoreDVal !== 1 && toDecimalVal === 1) {
                            let aux = (Number(auxStr) ? Number(auxStr) : 0.0)
                            let aux1 = (Number(aux1Str) ? Number(aux1Str) : 0.0)
                            let nD = nDigits(auxStr, aux1Str)

                            res = (round((aux - aux1)*nD)/nD).toString()
                            re = new RegExp("+", 'g');
                            res = res.replace(re, "")
                        }else{
                            res = minusstr(aux1Str, auxStr)
                        }
                        
                        res=cleanR(res)
                        re = new RegExp("--", 'g');
                        str2=str2.replace(re, "+")
                        str1=strToLang("Paso")+StepsC.toString()+": quad"
                        
                        re = new RegExp("("+aux1Str+")", 'g');
                        strDevelopment=strDevelopment.replace(re, aux1Str)
                        re = new RegExp("("+auxStr+")", 'g');
                        strDevelopment=strDevelopment.replace(re, auxStr)
                        re = new RegExp(auxStr+aux1Str, 'g');
                        strDevelopment=strDevelopment.replace(re, aux1Str+auxStr)
                        re = new RegExp(aux1Str+auxStr, 'g');
                        strDevelopment=strDevelopment.replace(re, auxStr+aux1Str)
                        
                        re = new RegExp("--", 'g');
                        strDevelopment=strDevelopment.replace(re, "+")
                        re = new RegExp("+-", 'g');
                        strDevelopment=strDevelopment.replace(re, "-")
                        re = new RegExp("-+", 'g');
                        strDevelopment=strDevelopment.replace(re, "-")
                        StepLatex(str1, strDevelopment, str2, str2, res, false, true)
                        
                        str1="-> "
                        if (toDecimalVal===1){
                            str2="( "+str2+" )"
                            str1=str1+str2+" = "+res
                        }else{
                            str2="( "+scanNumbers(str2,false)+" )"
                            str1=str1+str2+" = "+tofrac(DoubleStr(res))
                        }
                        re = new RegExp("pi", 'g');
                        str1=str1.replace(re, Math.PI.toString())
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
                        re = new RegExp("+-", 'g');
                        res=EvaluateFrac((aux1Str+"-"+auxStr).replace(re, "-"))
                        
                        str2=str2.replace(re, "-")
                        str1=strToLang("Paso")+StepsC.toString()+": quad"
                        StepLatex(str1, strDevelopment, str2, str3, res, false, true)
                        str2=aux1Str+"-"+auxStr
                        str2=str2.replace(re, "-")
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
                    
                    let auxStr = S[S.length-1] === undefined ? "*": S.pop()
                    let aux1Str=S[S.length-1] === undefined ? "*": S.pop()
                    
                    let re = new RegExp("(", 'g');
                    auxStr=auxStr.replace(re, "")
                    aux1Str=aux1Str.replace(re, "")
                    re = new RegExp(")", 'g');
                    auxStr=auxStr.replace(re, "")
                    aux1Str=aux1Str.replace(re, "")
                    if (isNumber(auxStr) && isNumber(aux1Str)) {
                        StepsC += 1
                        str2=aux1Str+"*"+auxStr
                        re = new RegExp("("+aux1Str+")", 'g');
                        strDevelopment=strDevelopment.replace(re, aux1Str)
                        re = new RegExp("("+auxStr+")", 'g');
                        strDevelopment=strDevelopment.replace(re, auxStr)
                        
                        auxStr=DoubleStr(auxStr)
                        aux1Str=DoubleStr(aux1Str)
                        re = new RegExp("pi", 'g');
                        auxStr=auxStr.replace(re, Math.PI.toString())
                        aux1Str = aux1Str.replace(re, Math.PI.toString())

                        if (MoreDVal !== 1&&toDecimalVal === 1) {
                            //res =  MthS.ShaveStr( (MthS.forstr(auxStr, aux1Str)),16 )
                            let aux = (Number(auxStr) ? Number(auxStr) : 0.0)
                            let aux1 = (Number(aux1Str) ? Number(aux1Str) : 0.0)
                            let nD = place(auxStr, aux1Str)
                            res = (round(aux * aux1 * nD) / nD).toString()
                            re = new RegExp("+", 'g');
                            res = res.replace(re, "")

                        }else{
                            res =  forstr(auxStr, aux1Str)
                        }
                        
                        res=cleanR(res)
                        re = new RegExp("*+", 'g');
                        str2=str2.replace(re, "*")
                        str1=strToLang("Paso")+StepsC.toString()+": quad"

                        re = new RegExp("--", 'g');
                        strDevelopment=strDevelopment.replace(re, "+")
                        re = new RegExp("-+", 'g');
                        strDevelopment=strDevelopment.replace(re, "-")
                        
                        if (LessThan(aux1Str,"0.0") && LessThan(auxStr,"0.0")){
                            StepLatex(str1, strDevelopment, str2, str2, "+"+res, false, true)
                        }else{
                            StepLatex(str1, strDevelopment, str2, str2, res, false, true)
                        }
                        
                        str1="-> "
                        if (toDecimalVal===1){
                            str2="[ "+aux1Str+" * "+auxStr+" ]"
                            re = new RegExp("+", 'g');
                            str1=str1+str2+" = "+res.replace(re, "")
                        }else{
                            if (str2.includes(".")) {
                                str2=scanNumbers(aux1Str+"*"+auxStr,false)
                                str2="["+str2+"]="+StepsFrac(str2)
                            }
                            re = new RegExp("+", 'g');
                            str1=str1+str2+" = "+DoubleStr(tofrac(res.replace(re, "")))
                        }
                        re = new RegExp("pi", 'g');
                        str1=str1.replace(re, Math.PI.toString())
                        strltx+="<p style='text-align:center' >`"+str1+"`</p>"
                        
                    }
                    else if (isFrac(auxStr) && isFrac(aux1Str)) {
                        re = new RegExp("(", 'g');
                        aux1Str=aux1Str.replace(re, "")
                        auxStr=auxStr.replace(re, "")
                        re = new RegExp(")", 'g');
                        aux1Str=aux1Str.replace(re, "")
                        auxStr=auxStr.replace(re, "")
                        str2=aux1Str+"*"+auxStr
                        StepsC += 1

                        re = new RegExp("("+auxStr+")", 'g');
                        strDevelopment=strDevelopment.replace(re, auxStr)
                        re = new RegExp("("+aux1Str+")", 'g');
                        strDevelopment=strDevelopment.replace(re, aux1Str)
                        
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
                    var auxStr = S[S.length-1] === undefined ? "": S.pop()
                    var aux1Str=S[S.length-1] === undefined ? "": S.pop()
                    let re = new RegExp("(", 'g');

                    auxStr=auxStr.replace(re, "")
                    aux1Str = aux1Str.replace(re, "")
                    re = new RegExp(")", 'g');
                    auxStr = auxStr.replace(re, "")
                    aux1Str = aux1Str.replace(re, "")
 
                    if ((isNumber(auxStr) && isNumber(aux1Str)) || (auxStr===""||aux1Str==="")) {

                        str2=aux1Str+"√"+auxStr;
                        re = new RegExp("("+aux1Str+")", 'g');
                        strDevelopment=strDevelopment.replace(re, aux1Str)
                        re = new RegExp("("+auxStr+")", 'g');
                        strDevelopment=strDevelopment.replace(re, auxStr)

                        if (!strDevelopment.includes("√"+auxStr)) {
                            aux1Str=auxStr
                            auxStr=""
                            str2=aux1Str+"√"+auxStr
                        } else {
                            auxStr=DoubleStr(auxStr)
                        }
                       // aux1Str=MthS.DoubleStr(aux1Str)
                        StepsC += 1
                        re = new RegExp("pi", 'g');
                        auxStr=auxStr.replace(re, Math.PI.toString())
                        aux1Str = aux1Str.replace(re, Math.PI.toString())

                        if (MoreDVal !== 1 && toDecimalVal === 1) {
                            res = sqrtStr(auxStr, aux1Str)
                            re = new RegExp("e+", 'g');
                            res = res.replace(re, "e")
                        }else{
                            res = sqrtStr(auxStr, aux1Str)
                            res = moreDStr(res)
                        }

                        res=cleanR(res)

                        str1=strToLang("Paso")+StepsC+": quad"

                        StepLatex(str1, strDevelopment, str2, str3, res, change, true)

                        str2="root("+aux1Str+")("+auxStr+")"

                        re = new RegExp(aux1Str+"√"+auxStr, 'g');
                        strltx=strltx.replace(re, str2)

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
                        re = new RegExp(' + -', 'g');
                        str1=str1.replace(re, " - ")
                        re = new RegExp('pi', 'g');
                        str1=str1.replace(re, Math.PI.toString())

                        strltx+="<p style='text-align:center' >`"+str1+"`</p>"


                    }
                    else if (isFrac(auxStr) && isFrac(aux1Str)) {
                        re = new RegExp('(', 'g');
                        aux1Str=aux1Str.replace(re, "")
                        auxStr=auxStr.replace(re, "")
                        re = new RegExp(')', 'g');
                        aux1Str=aux1Str.replace(re, "")
                        auxStr=auxStr.replace(re, "")
                        str2=aux1Str+"+"+auxStr
                        StepsC += 1
                        re = new RegExp("("+auxStr+")", 'g');
                        strDevelopment=strDevelopment.replace(re, auxStr)
                        re = new RegExp("("+aux1Str+")", 'g');
                        strDevelopment=strDevelopment.replace(re, aux1Str)
                        if (auxStr.includes(".")){
                            auxStr=tofrac(auxStr)
                        }

                        if (aux1Str.includes(".")) {
                            aux1Str=tofrac(aux1Str)
                        }
                        re = new RegExp("+-", 'g');
                        res=EvaluateFrac((aux1Str+"+"+auxStr).replace(re, "-"))
                        str2=str2.replace(re, "-")
                        str1=strToLang("Paso")+StepsC+": quad"
                        StepLatex(str1, strDevelopment, str2, str3, res, false, true)
                        str2=aux1Str+"+"+auxStr
                        str2=str2.replace(re, "-")
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
                    let auxStr = S[S.length-1] === undefined ? "0":S.pop()
                    let aux1Str=S[S.length-1] === undefined ? "0": S.pop()
                    let re = new RegExp("("+aux1Str+")", 'g');

                    if (isNumber(auxStr) && isNumber(aux1Str)) {
                        str2=aux1Str+"^"+auxStr
                        strDevelopment=strDevelopment.replace(re, aux1Str)
                        re = new RegExp("("+auxStr+")", 'g');
                        strDevelopment=strDevelopment.replace(re, auxStr)
                        auxStr=DoubleStr(auxStr)
                        aux1Str=DoubleStr(aux1Str)
                        StepsC += 1
                        re = new RegExp("pi", 'g');
                        auxStr=auxStr.replace(re, Math.PI.toString())
                        aux1Str = aux1Str.replace(re, Math.PI.toString())

                        if (MoreDVal !== 1 && toDecimalVal === 1) {
                            res = powStr(aux1Str, auxStr)
                            re = new RegExp("e+", 'g');
                            res = res.replace(re, "e")
                            res = "("+res+")"
                        }else{
                            res = powStr(aux1Str, auxStr)
                            res = moreDStr(res)
                        }

                        res=cleanR(res)

                        change=false
                        re = new RegExp("+", 'g');
                        aux1Str=aux1Str.replace(re, "")

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
                        re = new RegExp("pi", 'g');
                        str1=str1.replace(re, Math.PI.toString())
                        strltx+="<p style='text-align:center' >`"+str1+"`</p>"


                    }
                    else if (isFrac(auxStr) && isFrac(aux1Str)) {
                        re = new RegExp("(", 'g');
                        aux1Str=aux1Str.replace(re, "")
                        auxStr=auxStr.replace(re, "")
                        re = new RegExp(")", 'g');
                        aux1Str=aux1Str.replace(re, "")
                        auxStr=auxStr.replace(re, "")
                        str2=aux1Str+"+"+auxStr
                        StepsC += 1
                        re = new RegExp("("+auxStr+")", 'g');
                        strDevelopment=strDevelopment.replace(re, auxStr)
                        re = new RegExp("("+aux1Str+")", 'g');
                        strDevelopment=strDevelopment.replace(re, aux1Str)
                        if (auxStr.includes(".")) {
                            auxStr=tofrac(auxStr)
                        }

                        if (aux1Str.includes(".")) {
                            aux1Str=tofrac(aux1Str)
                        }
                        re = new RegExp("+-", 'g');
                        res=EvaluateFrac((aux1Str+"+"+auxStr).replace(re, "-"))

                        str2=str2.replace(re, "-")
                        str1=strToLang("Paso")+StepsC+": quad"
                        StepLatex(str1, strDevelopment, str2, str3, res, false, true)
                        str2=aux1Str+"+"+auxStr
                        str2=str2.replace(re, "-")
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

                    let auxStr = S[S.length-1] === undefined ? "0": S.pop()
                    let re = new RegExp(")", 'g');
                    auxStr=auxStr.replace(re, "")
                    re = new RegExp("(", 'g');
                    auxStr = auxStr.replace(re, "")

                    if (auxStr.includes("/")) {
                        //auxStr.removeFirst()
                        //auxStr.removeLast()
                        auxStr = auxStr.slice(1, auxStr.length - 1)
                        let strArr=auxStr.split("/")
                        let n1=strArr[0]
                        let n2=strArr[1]
                        let aux1S=auxStr

                        auxStr=dividestr(n1, n2, 8)
                        re = new RegExp(aux1S, 'g');
                        strDevelopment=strDevelopment.replace(re, auxStr)
                    }

                    str2="ln("+auxStr+")"
                    auxStr=DoubleStr(auxStr)

                    if (isNumber(auxStr)) {
                        StepsC += 1
                        re = new RegExp('pi', 'g');
                        auxStr=auxStr.replace(re, Math.PI.toString())
                        if (MoreDVal !== 1 && toDecimalVal === 1) {
                            res =  ShaveStr(lnStr(auxStr), 16)
                            re = new RegExp('e+', 'g');
                            res = res.replace("e+", "e")
                        }else{
                            res = lnStr(auxStr)
                        }

                        res=cleanR(res)

                        str1=strToLang("Paso")+StepsC+": quad"
                        re = new RegExp("ln"+auxStr, 'g');
                        strDevelopment=strDevelopment.replace(re, "ln("+auxStr+")")
                        re = new RegExp("--", 'g');
                        strDevelopment=strDevelopment.replace(re, "+")
                        re = new RegExp("-+", 'g');
                        strDevelopment=strDevelopment.replace(re, "-")

                            StepLatex(str1, strDevelopment, str2, str2, res, false, true)

                        str1="-> "
                        str2="ln("+auxStr+")"
                        if (toDecimalVal===1) {
                            re = new RegExp("+", 'g');
                            str1=str1+str2+" = "+res.replace(re, "")
                        }else{
                            if (str2.includes(".")) {
                                str2=scanNumbers("ln("+auxStr+")",false)
                                re = new RegExp("ln", 'g');
                                str2=str2.replace(re, "ln(")+")"
                                str2=str2+StepsFrac(str2)
                            }
                            re = new RegExp("+", 'g');
                            str1=str1+str2+" = "+tofrac(DoubleStr(res.replace(re, "")))
                        }
                        re = new RegExp("pi", 'g');
                        str1=str1.replace(re, Math.PI.toString())
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

                    let auxStr = S[S.length-1] === undefined ? "0": S.pop()
                    let re = new RegExp("(", 'g');
                    auxStr=auxStr.replace(re, "")
                    re = new RegExp(")", 'g');
                    auxStr=auxStr.replace(re, "")

                    if (auxStr.includes("/")){
                        auxStr = auxStr.slice(1, auxStr.length - 1)

                        let strArr=auxStr.split("/")
                        let n1=strArr[0]
                        let n2=strArr[1]
                        let aux1S=auxStr

                        auxStr=dividestr(n1, n2, 8)
                        re = new RegExp(aux1S, 'g');
                        strDevelopment=strDevelopment.replace(re, auxStr)
                    }

                    str2="log_10("+auxStr+")"
                    auxStr=DoubleStr(auxStr)
                    re = new RegExp("log_10"+auxStr, 'g');
                    strDevelopment=strDevelopment.replace(re, str2)

                    if (isNumber(auxStr)) {
                        StepsC += 1
                        re = new RegExp("pi", 'g');
                        auxStr=auxStr.replace(re, Math.PI.toString())
                        if (MoreDVal !== 1 && toDecimalVal === 1) {
                            res =  ShaveStr(log10Str(auxStr), 16)
                            re = new RegExp("e+", 'g');
                            res = res.replace(re, "e")
                        }else{
                            res = log10Str(auxStr)
                        }

                        res=cleanR(res)

                        str1=strToLang("Paso")+StepsC+": quad"
                        re = new RegExp("log10_"+auxStr, 'g');
                        strDevelopment=strDevelopment.replace(re, "log_10("+auxStr+")")
                        re = new RegExp("--", 'g');
                        strDevelopment=strDevelopment.replace(re, "+")
                        re = new RegExp("-+", 'g');
                        strDevelopment=strDevelopment.replace(re, "-")

                            StepLatex(str1, strDevelopment, str2, str2, res, false, true)

                        str1="-> "
                        str2="log_10("+auxStr+")"
                        if (toDecimalVal===1){
                            re = new RegExp("+", 'g');
                            str1=str1+str2+" = "+res.replace(re, "")
                        }else{
                            if (str2.includes(".")) {
                                str2=scanNumbers("log_10("+auxStr+")",false)
                                re = new RegExp("log_10", 'g');
                                str2=str2.replace(re, "log_10(")+")"
                                str2=str2+StepsFrac(str2)
                            }
                            re = new RegExp("+", 'g');
                            str1=str1+str2+" = "+tofrac(DoubleStr(res.replace(re, "")))

                        }
                        re = new RegExp("pi", 'g');
                        str1=str1.replace(re, Math.PI.toString())

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
                    let auxStr = S[S.length-1] === undefined ? "0": S.pop()
                    let re = new RegExp("(", 'g');
                    auxStr=auxStr.replace(re, "")
                    re = new RegExp(")", 'g');
                    auxStr=auxStr.replace(")", "")

                    if (auxStr.includes("/")){
                        auxStr = auxStr.slice(1, auxStr.length - 1)
                        let strArr=auxStr.split("/")
                        let n1=strArr[0]
                        let n2=strArr[1]
                        let aux1S=auxStr

                        auxStr=dividestr(n1, n2, 8)
                        re = new RegExp(aux1S, 'g');
                        strDevelopment=strDevelopment.replace(re, auxStr)
                    }

                    str2="log_2("+auxStr+")"
                    auxStr=DoubleStr(auxStr)
                    re = new RegExp("log_2"+auxStr, 'g');
                    strDevelopment=strDevelopment.replace(re, str2)

                    if (isNumber(auxStr)) {
                        StepsC += 1
                        re = new RegExp("pi", 'g');
                        auxStr=auxStr.replace(re, Math.PI.toString())
                        if (MoreDVal !== 1 && toDecimalVal === 1) {
                            res = ShaveStr(log2Str(auxStr), 16)
                            re = new RegExp("e+", 'g');
                            res = res.replace(re, "e")
                        }else{
                            res = log2Str(auxStr)
                        }

                        res=cleanR(res)

                        str1=strToLang("Paso")+StepsC+": quad"
                        re = new RegExp("log2_"+auxStr, 'g');
                        strDevelopment=strDevelopment.replace(re, "log_2("+auxStr+")")
                        re = new RegExp("--", 'g');
                        strDevelopment=strDevelopment.replace(re, "+")
                        re = new RegExp("-+", 'g');
                        strDevelopment=strDevelopment.replace(re, "-")
                        StepLatex(str1, strDevelopment, str2, str2, res, false, true)

                        str1="-> "
                        str2="log_2("+auxStr+")"
                        if (toDecimalVal==1) {
                            re = new RegExp("+", 'g');
                            str1=str1+str2+" = "+res.replace(re, "")
                        }else{
                            if (str2.includes(".")){
                                str2=scanNumbers("log_2("+auxStr+")",false)
                                re = new RegExp("log_2", 'g');
                                str2=str2.replace(re, "log_2(")+")"
                                str2=str2+StepsFrac(str2)
                            }
                            re = new RegExp("+", 'g');
                            str1=str1+str2+" = "+tofrac(DoubleStr(res.replace(re, "")))
                        }
                        re = new RegExp("pi", 'g');
                        str1=str1.replace(re, Math.PI.toString())

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

                    let auxStr = S[S.length-1] === undefined ? "c" : S.pop()
                    let re = new RegExp("(", 'g');
                    auxStr=auxStr.replace(re, "")
                    re = new RegExp(")", 'g');
                    auxStr = auxStr.replace(re, "")
                    if (auxStr.includes("/")) {
                        auxStr = auxStr.slice(1, auxStr.length - 1)

                        let strArr=auxStr.split("/")
                        let n1=strArr[0]
                        let n2=strArr[1]
                        let aux1S=auxStr

                        auxStr=dividestr(n1, n2, 8)
                        re = new RegExp(aux1S, 'g');
                        strDevelopment=strDevelopment.replace(re, auxStr)
                    }

                    str2="c"+auxStr
                    auxStr=DoubleStr(auxStr)

                    if (isNumber(auxStr)) {
                        StepsC += 1
                        re = new RegExp('pi', 'g');
                        auxStr=auxStr.replace(re, Math.PI.toString())
                        if (MoreDVal !== 1&&toDecimalVal === 1) {
                            res = ShaveStr((cosStr(auxStr, DegRad)), 16)
                            re = new RegExp('e+', 'g');
                            res = res.replace(re, "e")
                        }else{
                            res = cosStr(auxStr, DegRad)
                        }

                        res=cleanR(res)
                        re = new RegExp('c+', 'g');
                        str2=str2.replace(re, "c")
                        str1=strToLang("Paso")+StepsC+": quad"

                        re = new RegExp("("+auxStr+")", 'g');
                        strDevelopment=strDevelopment.replace(re, auxStr)
                        re = new RegExp("--", 'g');
                        strDevelopment=strDevelopment.replace(re, "+")
                        re = new RegExp("-+", 'g');
                        strDevelopment=strDevelopment.replace(re, "-")
                        StepLatex(str1, strDevelopment, str2, str2, res, false, true)

                        str1="-> "
                        str2="C O S("+auxStr+")"
                        if (toDecimalVal===1) {
                            re = new RegExp("+", 'g');
                            str1=str1+str2+" = "+res.replace(re, "")
                        }else{
                            if (str2.includes(".")) {
                                str2=scanNumbers("c"+auxStr,false)
                                re = new RegExp("c", 'g');
                                str2=str2.replace(re, "C O S(")+")"
                                str2=str2+StepsFrac(str2)
                            }
                            re = new RegExp("+", 'g');
                            str1=str1+str2+" = "+tofrac(DoubleStr(res.replace(re, "")))
                        }
                        re = new RegExp("pi", 'g');
                        str1=str1.replace(re, Math.PI.toString())
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

                    let auxStr = S[S.length-1] === undefined ? "s" : S.pop()
                    let re = new RegExp("(", 'g');
                    auxStr=auxStr.replace(re, "")
                    re = new RegExp(")", 'g');
                    auxStr = auxStr.replace(re, "")
                    if (auxStr.includes("/")){
                        auxStr = auxStr.slice(1, auxStr.length - 1)

                        let strArr=auxStr.split("/")
                        let n1=strArr[0]
                        let n2=strArr[1]
                        let aux1S=auxStr

                        auxStr=dividestr(n1, n2, 8)
                        re = new RegExp(aux1S, 'g');
                        strDevelopment=strDevelopment.replace(re, auxStr)
                    }
                    str2="s"+auxStr
                    auxStr=DoubleStr(auxStr)
                    if (isNumber(auxStr)) {
                        StepsC += 1
                        re = new RegExp('pi', 'g');
                        auxStr=auxStr.replace(re, Math.PI.toString())
                        if (MoreDVal !== 1 && toDecimalVal === 1) {
                            res = ShaveStr((senStr(auxStr,DegRad)), 16)
                            re = new RegExp('e+', 'g');
                            res = res.replace(re, "e")
                        }else{
                            res = senStr(auxStr,DegRad)
                        }

                        res=cleanR(res)

                        re = new RegExp('s+', 'g');
                        str2=str2.replace(re, "s")
                        str1=strToLang("Paso")+StepsC+": quad"

                        re = new RegExp("("+auxStr+")", 'g');
                        strDevelopment=strDevelopment.replace(re, auxStr)
                        re = new RegExp("--", 'g');
                        strDevelopment=strDevelopment.replace(re, "+")
                        re = new RegExp("-+", 'g');
                        strDevelopment=strDevelopment.replace(re, "-")
                        StepLatex(str1, strDevelopment, str2, str2, res, false, true)

                        str1="-> "
                        str2="S E N("+auxStr+")"
                        if (toDecimalVal===1){
                            //str2="[ Cos("+String(auxStr)+" ) ]"
                            re = new RegExp("+", 'g');
                            str1=str1+str2+" = "+res.replace(re, "")
                        }else{
                            if (str2.includes(".")) {
                                str2=scanNumbers("s"+auxStr,false)
                                re = new RegExp("s", 'g');
                                str2=str2.replace(re, "S E N(")+")"
                                str2=str2+StepsFrac(str2)
                            }
                            re = new RegExp("+", 'g');
                            str1=str1+str2+" = "+tofrac(DoubleStr(res.replace(re, "")))
                        }
                        re = new RegExp("pi", 'g');
                        str1=str1.replace(re, Math.PI.toString())
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

                    let auxStr = S[S.length-1] === undefined ? "t" : S.pop()
                    let re = new RegExp("(", 'g');
                    auxStr=auxStr.replace(re, "")
                    re = new RegExp(")", 'g');
                    auxStr = auxStr.replace(re, "")

                    if (auxStr.includes("/")) {
                        auxStr = auxStr.slice(1, auxStr.length - 1)
                        let strArr=auxStr.split("/")
                        let n1=strArr[0]
                        let n2=strArr[1]
                        let aux1S=auxStr

                        auxStr=dividestr(n1, n2, 8)
                        re = new RegExp(aux1S, 'g');
                        strDevelopment=strDevelopment.replace(re, auxStr)
                    }

                    str2="t"+auxStr
                    auxStr=DoubleStr(auxStr)
                    if (isNumber(auxStr)) {
                        StepsC += 1
                        re = new RegExp('pi', 'g');
                        auxStr=auxStr.replace(re, Math.PI.toString())
                        if (MoreDVal !== 1 && toDecimalVal === 1){
                            res = ShaveStr((tanStr(auxStr,DegRad)), 16)
                            re = new RegExp('e+', 'g');
                            res = res.replace(re, "e")
                        }else{
                            res = tanStr(auxStr, DegRad)
                        }

                        res=cleanR(res)
                        re = new RegExp('t+', 'g');
                        str2=str2.replace(re, "t")
                        str1=strToLang("Paso")+StepsC+": quad"
                        re = new RegExp("("+auxStr+")", 'g');
                        strDevelopment=strDevelopment.replace(re, auxStr)
                        re = new RegExp("--", 'g');
                        strDevelopment=strDevelopment.replace(re, "+")
                        re = new RegExp("-+", 'g');
                        strDevelopment=strDevelopment.replace(re, "-")
                        StepLatex(str1, strDevelopment, str2, str2, res, false, true)

                        str1="-> "
                        str2="T A N("+auxStr+")"
                        if (toDecimalVal===1){
                            re = new RegExp("+", 'g');
                            str1=str1+str2+" = "+res.replace(re, "")
                        }else{
                            if (str2.includes(".")){
                                str2=scanNumbers("t"+auxStr,false)
                                re = new RegExp("t", 'g');
                                str2=str2.replace(re, "T A N(")+")"
                                str2=str2+StepsFrac(str2)
                            }
                            re = new RegExp("+", 'g');
                            str1=str1+str2+" = "+tofrac(DoubleStr(res.replace(re, "")))

                        }
                        re = new RegExp("pi", 'g');
                        str1=str1.replace(re, Math.PI.toString())
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
                    let auxStr = S[S.length-1] === undefined ? STR[STR.length-1] : S.pop()
                    let aux1Str=S[S.length-1] === undefined ? STR[STR.length-1] : S.pop()
                    let re = new RegExp("(", 'g');
                    auxStr=auxStr.replace(re, "")
                    aux1Str = aux1Str.replace(re, "")
                    let re = new RegExp(")", 'g');
                    auxStr = auxStr.replace(re, "")
                    aux1Str = aux1Str.replace(re, "")
                    if (isNumber(auxStr) && isNumber(aux1Str)) {
                        StepsC += 1
                        str2=aux1Str+''+STR[STR.length-1]+''+auxStr
                        re = new RegExp("("+aux1Str+")", 'g');
                        strDevelopment=strDevelopment.replace(re, aux1Str)
                        re = new RegExp("("+auxStr+")", 'g');
                        strDevelopment=strDevelopment.replace(re, auxStr)

                        auxStr=DoubleStr(auxStr)
                        aux1Str=DoubleStr(aux1Str)
                        re = new RegExp("pi", 'g');
                        auxStr=auxStr.replace(re, Math.PI.toString())
                        aux1Str = aux1Str.replace(re, Math.PI.toString())

                        if (MoreDVal !== 1&&toDecimalVal === 1){
                            let aux = (Number(auxStr) ? Number(auxStr) : 0.0)
                            let aux1 = (Number(aux1Str) ? Number(aux1Str) : 0.0)
                            let nD = place(auxStr, aux1Str)

                            res = (round((aux * aux1)*nD)/nD).toString()
                            re = new RegExp("+", 'g');
                            res = res.replace(re, "")

                        }else{
                            res =  forstr(auxStr, aux1Str)
                        }

                        res=cleanR(res)
                        re = new RegExp(STR[STR.length-1]+"+", 'g');
                        str2=str2.replace(re, STR[STR.length-1])
                        str1=strToLang("Paso")+StepsC+": quad"

                        re = new RegExp("--", 'g');
                        strDevelopment=strDevelopment.replace(re, "+")
                        re = new RegExp("-+", 'g');
                        strDevelopment=strDevelopment.replace(re, "-")

                        if (LessThan(aux1Str,"0.0") && LessThan(auxStr,"0.0")) {
                            StepLatex(str1, strDevelopment, str2, str2, "+"+res, false, true)
                        }else{
                            StepLatex(str1, strDevelopment, str2, str2, res, false, true)
                        }


                        str1="-> "
                        if (toDecimalVal===1){
                            str2="[ "+String(aux1Str)+" · "+String(auxStr)+" ]"
                            re = new RegExp("+", 'g');
                            str1=str1+str2+" = "+res.replace(re, "")
                        }else{
                            if (str2.includes(STR[STR.length-1])) {

                                str2=scanNumbers(aux1Str+"·"+auxStr,false)
                                str2="["+str2+"]="+StepsFrac(str2)
                            }
                            re = new RegExp("+", 'g');
                            str1=str1+str2+" = "+DoubleStr(tofrac(res.replace(re, "")))
                        }
                        re = new RegExp("pi", 'g');
                        str1=str1.replace(re, Math.PI.toString())
                        strltx+="<p style='text-align:center' >`"+str1+"`</p>"
                    }
                    else if (isFrac(auxStr) && isFrac(aux1Str)) {
                        re = new RegExp("(", 'g');
                        aux1Str=aux1Str.replace(re, "")
                        auxStr = auxStr.replace(re, "")
                        re = new RegExp(")", 'g');
                        aux1Str = aux1Str.replace(re, "")
                        auxStr = auxStr.replace(re, "")
                        str2=aux1Str+"·"+auxStr
                        StepsC += 1

                        re = new RegExp("("+auxStr+")", 'g');
                        strDevelopment=strDevelopment.replace(re, auxStr)
                        re = new RegExp("("+aux1Str+")", 'g');
                        strDevelopment=strDevelopment.replace(re, aux1Str)

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
                    STR.removeLast()

                    let auxStr = S[S.length-1] === undefined ? "÷": S.pop()
                    let aux1Str=S[S.length-1] === undefined ? "÷": S.pop()
                    let band = true
                    let re = new RegExp("+", 'g');
                    auxStr=auxStr.replace(re, "")
                    aux1Str=aux1Str.replace(re, "")

                    if (isNumber(auxStr) && isNumber(aux1Str)){

                        str2=aux1Str+"/"+auxStr
                        re = new RegExp("("+aux1Str+")", 'g');
                        strDevelopment=strDevelopment.replace(re, aux1Str)
                        re = new RegExp("("+auxStr+")", 'g');
                        strDevelopment=strDevelopment.replace(re, auxStr)

                        auxStr=DoubleStr(auxStr)
                        aux1Str=DoubleStr(aux1Str)
                        re = new RegExp("pi", 'g');
                        auxStr=auxStr.replace(re, Math.PI.toString())
                        aux1Str=aux1Str.replace(re, Math.PI.toString())
                        if (toDecimalVal === 1) {
                            if (MoreDVal !== 1) {
                                if (aux1Str.includes("e")) {
                                    re = new RegExp(aux1Str, 'g');
                                    strDevelopment=strDevelopment.replace(re, "("+aux1Str+")")
                                    aux1Str="("+aux1Str+")"
                                    str2=aux1Str+"/"+auxStr
                                }
                                if (auxStr.includes("e")) {
                                    re = new RegExp(auxStr, 'g');
                                    strDevelopment=strDevelopment.replace(re, "("+auxStr+")")
                                    auxStr="("+auxStr+")"
                                    str2=aux1Str+"/"+auxStr
                                }
                                let auxStrD=auxStr
                                re = new RegExp('(', 'g');
                                auxStrD=auxStrD.replace(re, "")
                                let aux1StrD=aux1Str
                                aux1StrD=aux1Str.replace(re, "")
                                re = new RegExp(')', 'g');
                                auxStrD=auxStrD.replace(re, "")
                                aux1StrD = aux1Str.replace(re, "")

                                let aux = (Number(auxStr) ? Number(auxStr) : 0.0)
                                let aux1 = (Number(aux1Str) ? Number(aux1Str) : 0.0)

                                res = (aux1 / aux).toString()
                                if (res.length > 16) {
                                    let nD = pow(10.0, 14.0)
                                    res = (round((aux1 / aux)*nD)/nD).toString()
                                }
                                re = new RegExp('e+', 'g');
                                res = res.replace(re, "e")
                            } else {
                                res = dividestr(aux1Str, auxStr, 128)
                            }
                            if (aux1Str.startsWith("-") && LessThan(auxStr, "0.0")) {
                                res = "+"+res
                            }

                            res=cleanR(res)
                            re = new RegExp('--', 'g');
                            strDevelopment=strDevelopment.replace(re, "+")

                        }else{

                            if (aux1Str.includes(".") || auxStr.includes(".")){
                                aux1Str="("+tofrac(aux1Str)+")"
                                auxStr="("+tofrac(auxStr)+")"
                                res=EvaluateFrac(aux1Str+"÷"+auxStr)
                            }else{
                                res="("+aux1Str+"/"+auxStr+")"
                            }

                            //  res =  MthS.ShaveStr( (MthS.dividestr(aux1Str, auxStr,22)),17 )
                        }

                        band = str2.includes(".") || toDecimalVal === 1

                        if (band) {
                            StepsC += 1
                        }

                        //if str2.contains(".") || V.todecimal.state == 1 {
                        str1=strToLang("Paso")+StepsC+": quad"

                        re = new RegExp('-+', 'g');
                        strDevelopment=strDevelopment.replace(re, "-")

                        StepLatex(str1, strDevelopment, str2, str2, res, false,band)
                        re = new RegExp('+', 'g');
                        res=res.replace(re, "")
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
                            re = new RegExp('÷', 'g');
                            str2=str2.replace(re, "/")

                            str1=str1+str2+" = "+tofrac(DoubleStr(res))


                        }
                        re = new RegExp('pi', 'g');
                        str1=str1.replace(re, Math.PI.toString())

                        if (band) {
                            strltx+="<p style='text-align:center' >`"+str1+"`</p>"
                        }
                        // }
                    }
                    else if (isFrac(auxStr) && isFrac(aux1Str)){
                        re = new RegExp('(', 'g');
                        aux1Str=aux1Str.replace(re, "")
                        auxStr=auxStr.replace(re, "")
                        re = new RegExp(')', 'g');
                        aux1Str=aux1Str.replace(re, "")
                        auxStr=auxStr.replace(re, "")

                        str2=aux1Str+"/"+auxStr
                        StepsC += 1
                        re = new RegExp("("+auxStr+")", 'g');
                        strDevelopment=strDevelopment.replace(re, auxStr)
                        re = new RegExp("("+aux1Str+")", 'g');
                        strDevelopment=strDevelopment.replace(re, aux1Str)
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

                    let auxStr = S[S.length-1] === undefined ? "%": S.pop()
                    let aux1Str=S[S.length-1] === undefined ? "%": S.pop()
                    let band = true
                    let re = new RegExp("+", 'g');
                    auxStr=auxStr.replace(re, "")
                    aux1Str=aux1Str.replace(re, "")
                    if (isNumber(auxStr) && isNumber(aux1Str)) {
                        str2=aux1Str+"%"+auxStr
                        re = new RegExp("("+aux1Str+")", 'g');
                        strDevelopment=strDevelopment.replace(re, aux1Str)
                        re = new RegExp("("+auxStr+")", 'g');
                        strDevelopment=strDevelopment.replace(re, auxStr)

                        auxStr=DoubleStr(auxStr)
                        aux1Str=DoubleStr(aux1Str)
                        re = new RegExp("pi", 'g');
                        auxStr=auxStr.replace(re, Math.PI.toString())
                        aux1Str=aux1Str.replace(re, Math.PI.toString())
                        if (toDecimalVal === 1) {
                            if (MoreDVal !== 1) {
                                if (aux1Str.includes("e")) {
                                    re = new RegExp(aux1Str, 'g');
                                    strDevelopment=strDevelopment.replace(re, "("+aux1Str+")")
                                    aux1Str="("+aux1Str+")"
                                    str2=aux1Str+"%"+auxStr
                                }
                                if (auxStr.includes("e")) {
                                    re = new RegExp(auxStr, 'g');
                                    strDevelopment=strDevelopment.replace(re, "("+auxStr+")")
                                    auxStr="("+auxStr+")"
                                    str2=aux1Str+"%"+auxStr

                                }
                                re = new RegExp('(', 'g');
                                var auxStrD=auxStr
                                auxStrD=auxStrD.replace(re, "")
                                //auxStrD=auxStrD.replacingOccurrences(of: ")", with: "")
                                var aux1StrD=aux1Str
                                aux1StrD=aux1StrD.replace(re, "")
                                re = new RegExp(')', 'g');
                                auxStrD=auxStrD.replace(re, "")
                                aux1StrD = aux1StrD.replace(re, "")

                                let aux = (Number(auxStr) ? Number(auxStr) : 1)
                                let aux1 = (Number(aux1Str) ? Number(aux1Str) : 0)
                                res = (aux1 % aux).toString()
                                re = new RegExp('e+', 'g');
                                res = res.replace(re, "e")
                            } else {
                                res = residuo(aux1Str, auxStr)
                            }


                            if (aux1Str.startsWith("-") && LessThan(auxStr,"0.0")) {
                                res = "+"+res
                            }

                            res=cleanR(res)
                            re = new RegExp('--', 'g');
                            strDevelopment=strDevelopment.replace(re, "+")

                        }

                        band = str2.includes(".") || toDecimalVal == 1

                        if (band) {
                            StepsC += 1
                        }

                        str1=strToLang("Paso")+StepsC+": quad"
                        re = new RegExp('-+', 'g');
                        strDevelopment=strDevelopment.replace(re, "-")

                        StepLatex(str1, strDevelopment, str2, str2, res, false, band)
                        re = new RegExp('+', 'g');
                        res=res.replace(re, "")
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
                        re = new RegExp('pi', 'g');
                        str1=str1.replace(re, Math.PI.toString())

                        if (band) {
                            strltx+="<p style='text-align:center' >`"+str1+"`</p>"
                        }

                    }
                    else if (isFrac(auxStr) && isFrac(aux1Str)) {
                        re = new RegExp('(', 'g');
                        aux1Str=aux1Str.replace(re, "")
                        auxStr=auxStr.replace(re, "")
                        re = new RegExp(')', 'g');
                        aux1Str=aux1Str.replace(re, "")
                        auxStr=auxStr.replace(re, "")

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
                }
            }
        }catch(e){
            
        }
        if(S[S.length-1]===undefined){
            S.push(strToLang("DigitEx"))
        }
            const re = new RegExp('pi', 'g');
            return S[S.length-1].replace(re, Math.PI.toString());
        
     }