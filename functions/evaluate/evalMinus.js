EvalMinus = (auxStr, aux1Str) => {
    auxStr = auxStr.split("(").join("");
    aux1Str = aux1Str.split("(").join("");
    auxStr = auxStr.split(")").join("");
    aux1Str = aux1Str.split(")").join("");
    aux1Str = aux1Str.split("+").join("");
    str2 = aux1Str + "-" + auxStr

    if (isNumber(auxStr) && isNumber(aux1Str)) {

        auxStr = DoubleStr(auxStr)
        aux1Str = DoubleStr(aux1Str)
        StepsC += 1
        auxStr = auxStr.split("pi").join(Math.PI.toString())
        aux1Str = aux1Str.split("pi").join(Math.PI.toString())
        auxStr = auxStr.split("I n f i n i t y").join("Infinity")
        aux1Str = aux1Str.split("I n f i n i t y").join("Infinity")
        if (MoreDVal !== 1 && toDecimalVal === 1) {
            if (auxStr === 'Infinity' && aux1Str==='Infinity'){
                res = '0'
            }else{
                let aux = (isNumber(auxStr) ? Number(auxStr) : 0.0)
                let aux1 = (isNumber(aux1Str) ? Number(aux1Str) : 0.0)
                let nD = nDigits(auxStr, aux1Str)

                res = (Math.round((aux1 - aux) * nD) / nD).toString()
                res = res.split('+').join("")
            }
        } else {
            res = minusstr(aux1Str, auxStr)
        }

        /*if (BiggerThan(auxStr, aux1Str)) {
            res = '-' + res
        }*/
        res = cleanR(res)
        auxStr = auxStr.split("Infinity").join("I n f i n i t y")
        aux1Str = aux1Str.split("Infinity").join("I n f i n i t y")

        str2 = str2.split("--").join("+")
        str1 = strToLang("Paso") + StepsC.toString() + ": quad"

        strDevelopment = strDevelopment.split("(" + aux1Str + ")").join(aux1Str)
        strDevelopment = strDevelopment.split("(" + auxStr + ")").join(auxStr)
        
        strDevelopment = strDevelopment.split("log_10" + auxStr).join("log_10(" + auxStr + ")")
        strDevelopment = strDevelopment.split("log_10" + aux1Str).join("log_10(" + aux1Str + ")")
        strDevelopment = strDevelopment.split("log_2" + auxStr).join("log_2(" + auxStr + ")")
        strDevelopment = strDevelopment.split("log_2" + aux1Str).join("log_2(" + aux1Str + ")")

        strDevelopment = strDevelopment.split(auxStr + aux1Str).join(aux1Str + auxStr)
        strDevelopment = strDevelopment.split(aux1Str + auxStr).join(auxStr + aux1Str)        
        

        strDevelopment = strDevelopment.split("--").join("+")
        strDevelopment = strDevelopment.split("+-").join("-")
        strDevelopment = strDevelopment.split("-+").join("-")
        StepLatex(str1, strDevelopment, str2, str2, res, false, true)
        str1 = "-> "
        if (toDecimalVal === 1) {
            str2 = "[ " + str2 + " ]"
            str1 = str1 + str2 + " = " + res
        } else {
            str2 = "[ " + scanNumbers(str2, false) + " ]"
            str1 = str1 + str2 + " = " + tofrac(DoubleStr(res))
        }
        str1 = str1.split("pi").join(Math.PI.toString())
        //strltx += "<p style='text-align:center; width: " + wMobil + "px' >`" + str1 + "`</p>"
        Pstrltx(str1)

    } else if (isFrac(auxStr) && isFrac(aux1Str)) {
        str2 = aux1Str + "-" + auxStr
        StepsC += 1
        if (auxStr.includes(".")) {
            auxStr = tofrac(auxStr)
        }

        if (aux1Str.includes(".")) {
            aux1Str = tofrac(aux1Str)
        }
        res = EvaluateFrac((aux1Str + "-" + auxStr).split("+-").join("-"))

        str2 = str2.split("+-").join("-")
        str1 = strToLang("Paso") + StepsC.toString() + ": quad"
        StepLatex(str1, strDevelopment, str2, str3, res, false, true)
        str2 = aux1Str + "-" + auxStr
        str2 = str2.split("+-").join("-")
        str1 = "-> [" + str2 + "]=" + StepsFrac(str2) + "=" + res

        //strltx += "<p style='text-align:center; width: " + wMobil + "px' >`" + str1 + "`</p>"
        Pstrltx(str1)
    } else {
        res = WrongExpresion()
    }
    strltx += "</div>"
    strltx += "</div>"
}