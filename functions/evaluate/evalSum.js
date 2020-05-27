EvalSum = (auxStr, aux1Str) => {
    let aux2Str = ""
    if (isNumber(auxStr) && isNumber(aux1Str)) {
        strDevelopment = strDevelopment.split("(" + aux1Str + ")").join(aux1Str)
        strDevelopment = strDevelopment.split("(" + auxStr + ")").join(auxStr)
        auxStr = auxStr.split("(").join("")
        aux1Str = aux1Str.split("(").join("")
        auxStr = auxStr.split(")").join("")
        aux1Str = aux1Str.split(")").join("")
        strDevelopment = strDevelopment.split("(" + aux1Str + ")").join(aux1Str)
        strDevelopment = strDevelopment.split("(" + auxStr + ")").join(auxStr)

        strDevelopment = strDevelopment.split("log_10" + auxStr).join("log_10(" + auxStr +")")
        strDevelopment = strDevelopment.split("log_10" + aux1Str).join("log_10(" + aux1Str + ")")
        strDevelopment = strDevelopment.split("log_2" + auxStr).join("log_2(" + auxStr +")")
        strDevelopment = strDevelopment.split("log_2" + aux1Str).join("log_2(" + aux1Str + ")")

        //V.strDevelopment=V.strDevelopment.replacingOccurrences(of: "("+aux1Str+")", with: aux1Str)
        //V.strDevelopment=V.strDevelopment.replacingOccurrences(of: "("+auxStr+")", with: auxStr)
        str2 = aux1Str + "+" + auxStr

        auxStr = DoubleStr(auxStr)
        aux1Str = DoubleStr(aux1Str)
        StepsC += 1
        auxStr = auxStr.split("pi").join(Math.PI.toString())
        aux1Str = aux1Str.split("pi").join(Math.PI.toString())
        auxStr = auxStr.split("I n f i n i t y").join("Infinity")
        aux1Str = aux1Str.split("I n f i n i t y").join("Infinity")
        if (MoreDVal !== 1 && toDecimalVal === 1) {
            let aux = (isNumber(auxStr) ? Number(auxStr) : 0.0)
            let aux1 = (isNumber(aux1Str) ? Number(aux1Str) : 0.0)
            let nD = nDigits(auxStr, aux1Str)

            res = (Math.round((aux + aux1) * nD) / nD).toString()
            res = res.split("e+").join('e')
        } else {
            res = plusstr(auxStr, aux1Str)
        }
        
        res = cleanR(res)
        
        auxStr = auxStr.split("Infinity").join("I n f i n i t y")
        aux1Str = aux1Str.split("Infinity").join("I n f i n i t y")

        if ((aux1Str.startsWith("-") && (BiggerThan(auxStr, "0.0") || auxStr === "0.0")) && (auxStr !== "oo" && aux1Str !== "oo")) {
            
            aux2Str = auxStr
            auxStr = aux1Str
            aux1Str = aux2Str
            //aux1Str=aux1Str.replacingOccurrences(of: "+", with: "")
            aux1Str = aux1Str.split("+").join('')
            str3 = aux1Str + auxStr
            strDevelopment = strDevelopment.split("--").join('+')
            strDevelopment = strDevelopment.split("+-").join('+ -')
            strDevelopment = strDevelopment.split("-+").join('-')
            change = true

        } else {
            change = false
            aux1Str = aux1Str.split("+").join('')
        }
        if (BBS) {
            //if (strDevelopment.includes("√")){
                if(auxStr.startsWith("-")){// or 
                    str2 = str2.split("+-").join('-')
                    str3 = str3.split("+-").join('-')
                    strDevelopment = strDevelopment.split("+ -").join("-")
                }else{
                    str2 = str2.split("+-").join('+ -')
                    str3 = str3.split("+-").join('+ -')
                }
            /*}else{
                str2 = str2.split("+-").join('-')
                str3 = str3.split("+-").join('-')
            }*/
        }else{
            str2 = str2.split("+-").join('-')
            str3 = str3.split("+-").join('-')
        }
        str1 = strToLang("Paso") + StepsC.toString() + ": quad"
        strDevelopment = strDevelopment.split("--").join('+')
        strDevelopment = strDevelopment.split("+-").join('+ -')
        strDevelopment = strDevelopment.split("-+").join('-')

        str2 = str2.split("++").join("+")
        str3 = str3.split("++").join('+')
        str2 = str2.split("+ +").join("+")
        str3 = str3.split("+ +").join('+')
        StepLatex(str1, strDevelopment, str2, str3, res, change, true)
        str1 = "-> "
        if (change) {
            if (toDecimalVal === 1) {
                str2 = "[ " + str3 + " ]"
            } else {
                if (str3.includes(".")) {
                    str3 = scanNumbers(str3, false)
                    str3 = "[" + str3 + "]=" + StepsFrac(str3)
                    str2 = str3
                }else{
                    str2 = "[" + str3 + "]"
                }
                
            }
        } else {
            if (toDecimalVal === 1) {
                str2 = "[ " + str2 + " ]"
            } else {

                if (str2.includes(".")) {
                    str2 = scanNumbers(str2, false)
                    str2 = "[" + str2 + "]=" + StepsFrac(str2)
                    str2 = " " + str2 + " "
                }else{
                    str2 = "[" + str2 + "]"
                }

                

            }
        }
        
        if (toDecimalVal === 1) {
            str1 = str1 + str2 + " = " + res.split("+").join("")
            //str1=str1+str2+" = "+res.replacingOccurrences(of: "+", with: "")
        } else {
            str1 = str1 + str2 + " = " + scanNumbers(res.split("+").join(""), false)
            //str1=str1+str2+" = "+scanNumbers(res.replacingOccurrences(of: "+", with: ""),false)
        }
        //str1 = str1.split(" + -").join(' - ');
        str1 = str1.split("pi").join(Math.PI.toString());
        //str1=str1.replacingOccurrences(of: " + -", with: " - ")
        //str1=str1.replacingOccurrences(of: "pi", with: String(Double.pi))
        //strltx += "<p style='text-align:center' >`" + str1 + "`</p>"
        Pstrltx(str1)

    } else if (isFrac(auxStr) && isFrac(aux1Str)) {
        auxStr = auxStr.split("(").join('');
        aux1Str = aux1Str.split("(").join('');
        auxStr = auxStr.split(")").join('');
        aux1Str = aux1Str.split(")").join('');
        /*aux1Str=aux1Str.replacingOccurrences(of: "(", with: "")
        aux1Str=aux1Str.replacingOccurrences(of: ")", with: "")
        auxStr=auxStr.replacingOccurrences(of: "(", with: "")
        auxStr=auxStr.replacingOccurrences(of: ")", with: "")*/
        str2 = aux1Str + "+" + auxStr
        StepsC += 1
        strDevelopment = strDevelopment.split("(" + auxStr + ")").join(auxStr);
        strDevelopment = strDevelopment.split("(" + aux1Str + ")").join(aux1Str);
        //V.strDevelopment=V.strDevelopment.replacingOccurrences(of: "("+auxStr+")", with: auxStr)
        //V.strDevelopment=V.strDevelopment.replacingOccurrences(of: "("+aux1Str+")", with: aux1Str)
        if (auxStr.includes(".")) {
            auxStr = tofrac(auxStr)
        }

        if (aux1Str.includes(".")) {
            aux1Str = tofrac(aux1Str)
        }
        res = EvaluateFrac((aux1Str + "+" + auxStr).split("+-").join("-"))

        str2 = str2.split("+-").join("-")
        str1 = strToLang("Paso") + StepsC.toString() + ": quad"
        StepLatex(str1, strDevelopment, str2, str3, res, false, true)
        str2 = aux1Str + "+" + auxStr
        str2 = str2.split("+-").join("-")
        str1 = "-> [" + str2 + "]=" + StepsFrac(str2) + "=" + res

        //strltx += "<p style='text-align:center' >`" + str1 + "`</p>"
        Pstrltx(str1)

    } else {
        res = strToLang("WrongEx")
    }
    strltx += "</div>"
    strltx += "</div>"
}