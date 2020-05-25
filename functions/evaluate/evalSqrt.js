EvalSqrt = (auxStr, aux1Str, replace) => {
    auxStr = auxStr.split("(").join("")
    aux1Str = aux1Str.split("(").join("")
    auxStr = auxStr.split(")").join("")
    aux1Str = aux1Str.split(")").join("")
    

    if ((isNumber(auxStr) && isNumber(aux1Str)) || (auxStr === "" || aux1Str === "")) {
                
        if (aux1Str.startsWith("-")&&replace){
            strDevelopment = strDevelopment.split(aux1Str).join("+"+aux1Str)
            strDevelopment = strDevelopment.split("+ +").join('+')
            strDevelopment = strDevelopment.split("++").join("+")
            strDevelopment = strDevelopment.split("×+").join("×")
            strDevelopment = strDevelopment.split("*+").join("*")
            strDevelopment = strDevelopment.split("/+").join("/")
        }
        

        str2 = aux1Str + "√" + auxStr;
        strDevelopment = strDevelopment.split("(" + aux1Str + ")").join(aux1Str)
        strDevelopment = strDevelopment.split("(" + auxStr + ")").join(auxStr)

        if (!strDevelopment.includes("√" + auxStr)) {
            aux1Str = auxStr
            auxStr = ""
            str2 = aux1Str + "√" + auxStr
        } else {
            auxStr = DoubleStr(auxStr)
        }
        StepsC += 1
        auxStr = auxStr.split("pi").join(Math.PI.toString())
        aux1Str = aux1Str.split("pi").join(Math.PI.toString())

        if (MoreDVal !== 1 && toDecimalVal === 1) {
            res = sqrtStr(auxStr, aux1Str)
            res = res.split("e+").join("e")
        } else {
            res = sqrtStr(auxStr, aux1Str)
            res = moreDStr(res)
        }

        res = cleanR(res)

        str1 = strToLang("Paso") + StepsC + ": quad"

        StepLatex(str1, strDevelopment, str2, str3, res, change, true)

        str2 = "root(" + aux1Str + ")(" + auxStr + ")"

        strltx = strltx.split(aux1Str + "√" + auxStr).join(str2)

        str1 = "-> "
        if (change) {
            if (toDecimalVal === 1) {
                str2 = "[ " + str3 + " ]"
            } else {
                if (str3.includes(".")) {
                    str3 = scanNumbers(str3, false)
                    str3 = "[" + str3 + "]=" + StepsFrac(str3)
                }
                str2 = str3
            }

        } else {
            if (toDecimalVal === 1) {
                str2 = "[ " + str2 + " ]"
            } else {
                if (str2.includes(".")) {
                    str2 = scanNumbers(str2, false)
                    str2 = "[" + str2 + "]=" + StepsFrac(str2)
                }
                str2 = " " + str2 + " "
            }
        }
        if (toDecimalVal === 1) {
            str1 = str1 + str2 + " = " + res
        } else {
            str1 = str1 + str2 + " = " + scanNumbers(res, false)
        }
        str1 = str1.split(' + -').join(" - ")
        str1 = str1.split('pi').join(Math.PI.toString())

        //strltx += "<p style='text-align:center; width: " + wMobil + "px' >`" + str1 + "`</p>"
        Pstrltx(str1)


    } else if (isFrac(auxStr) && isFrac(aux1Str)) {
        aux1Str = aux1Str.split('(').join("")
        auxStr = auxStr.split('(').join("")
        aux1Str = aux1Str.split(')').join("")
        auxStr = auxStr.split(')').join("")
        str2 = aux1Str + "+" + auxStr
        StepsC += 1
        strDevelopment = strDevelopment.split("(" + auxStr + ")").join(auxStr)
        strDevelopment = strDevelopment.split("(" + aux1Str + ")", aux1Str)
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