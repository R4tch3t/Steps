EvalPow=(auxStr, aux1Str)=>{
    if (isNumber(auxStr) && isNumber(aux1Str)) {
        str2 = aux1Str + "^" + auxStr
        strDevelopment = strDevelopment.split("(" + aux1Str + ")").join(aux1Str)
        strDevelopment = strDevelopment.split("(" + auxStr + ")").join(auxStr)
        auxStr = DoubleStr(auxStr)
        aux1Str = DoubleStr(aux1Str)
        StepsC += 1
        aux1Str = aux1Str.split("pi").join(Math.PI.toString())
        auxStr = auxStr.split("pi").join(Math.PI.toString())

        if (MoreDVal !== 1 && toDecimalVal === 1) {
            res = powStr(aux1Str, auxStr)
            res = res.split("e+").join("e")
            res = "(" + res + ")"
        } else {
            res = powStr(aux1Str, auxStr)
            res = moreDStr(res)
        }

        res = cleanR(res)

        change = false
        aux1Str = aux1Str.split("+").join("")

        str1 = strToLang("Paso") + StepsC + ": quad"

        StepLatex(str1, strDevelopment, str2, str3, res, change, true)
        str1 = "-> "

        if (toDecimalVal === 1) {
            str2 = "[ " + str2 + " ]"
        } else {

            if (str2.includes(".")) {
                str2 = scanNumbers(str2, false)
                str2 = "[" + str2 + "]=" + StepsFrac(str2)
            }

            str2 = " " + str2 + " "
        }

        if (toDecimalVal === 1) {
            str1 = str1 + str2 + " = " + res
        } else {
            str1 = str1 + str2 + " = " + scanNumbers(res, false)
        }
        str1 = str1.split("pi").join(Math.PI.toString())
        //strltx += "<p style='text-align:center; width: " + wMobil + "px' >`" + str1 + "`</p>"
        Pstrltx(str1)


    } else if (isFrac(auxStr) && isFrac(aux1Str)) {
        aux1Str = aux1Str.split("(").join("")
        auxStr = auxStr.split("(").join("")
        aux1Str = aux1Str.split(")").join("")
        auxStr = auxStr.split(")").join("")
        str2 = aux1Str + "+" + auxStr
        StepsC += 1
        strDevelopment = strDevelopment.split("(" + auxStr + ")").join(auxStr)
        strDevelopment = strDevelopment.split("(" + aux1Str + ")").join(aux1Str)
        if (auxStr.includes(".")) {
            auxStr = tofrac(auxStr)
        }

        if (aux1Str.includes(".")) {
            aux1Str = tofrac(aux1Str)
        }
        res = EvaluateFrac((aux1Str + "+" + auxStr).split("+-").join("-"))

        str2 = str2.split("+-").join("-")
        str1 = strToLang("Paso") + StepsC + ": quad"
        StepLatex(str1, strDevelopment, str2, str3, res, false, true)
        str2 = aux1Str + "+" + auxStr
        str2 = str2.split("+-").join("-")
        str1 = "-> [" + str2 + "]=" + StepsFrac(str2) + "=" + res

        //strltx += "<p style='text-align:center; width: " + wMobil + "px' >`" + str1 + "`</p>"
        Pstrltx(str1)

    } else {
        res = strToLang("WrongEx")
    }

    strltx += "</div>"
    strltx += "</div>"
}