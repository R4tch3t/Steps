EvalPlux = (auxStr, aux1Str, sm) => {
    auxStr = auxStr.split("(").join("")
    aux1Str = aux1Str.split("(").join("")
    auxStr = auxStr.split(")").join("")
    aux1Str = aux1Str.split(")").join("")
    if (isNumber(auxStr) && isNumber(aux1Str)) {
        StepsC += 1
        str2 = aux1Str + sm + auxStr
        strDevelopment = strDevelopment.split("(" + aux1Str + ")").join(aux1Str)
        strDevelopment = strDevelopment.split("(" + auxStr + ")").join(auxStr)

        strDevelopment = strDevelopment.split("log_10" + auxStr).join("log_10(" + auxStr + ")")
        strDevelopment = strDevelopment.split("log_10" + aux1Str).join("log_10(" + aux1Str + ")")
        strDevelopment = strDevelopment.split("log_2" + auxStr).join("log_2(" + auxStr + ")")
        strDevelopment = strDevelopment.split("log_2" + aux1Str).join("log_2(" + aux1Str + ")")
        strDevelopment = strDevelopment.split("Infinity").join("I n f i n i t y")

        auxStr = DoubleStr(auxStr)
        aux1Str = DoubleStr(aux1Str)
        auxStr = auxStr.split("pi").join(Math.PI.toString())
        aux1Str = aux1Str.split("pi").join(Math.PI.toString())
        
        auxStr = auxStr.split("I n f i n i t y").join("Infinity")
        aux1Str = aux1Str.split("I n f i n i t y").join("Infinity")

        if (MoreDVal !== 1 && toDecimalVal === 1) {
            let aux = (isNumber(auxStr) ? Number(auxStr) : 0.0)
            let aux1 = (isNumber(aux1Str) ? Number(aux1Str) : 0.0)
            let nD = place(auxStr, aux1Str)
            res = (Math.round(aux * aux1 * nD) / nD).toString()
            res = res.split("+").join("")

        } else {
            res = forstr(auxStr, aux1Str)
        }

        res = cleanR(res)
        auxStr = auxStr.split("Infinity").join("I n f i n i t y")
        aux1Str = aux1Str.split("Infinity").join("I n f i n i t y")
         
        str2 = str2.split(`${sm}+`).join(sm)
        str1 = strToLang("Paso") + StepsC.toString() + ": quad"

        strDevelopment = strDevelopment.split("--").join("+")
        strDevelopment = strDevelopment.split("-+").join("-")

        if (LessThan(aux1Str, "0.0") && LessThan(auxStr, "0.0")) {
            StepLatex(str1, strDevelopment, str2, str2, "+" + res, false, true)
        } else {
            StepLatex(str1, strDevelopment, str2, str2, res, false, true)
        }
        
        str1 = "-> "
        if (toDecimalVal === 1) {
            str2 = "[ " + aux1Str + ` ${sm} ` + auxStr + " ]"
            str1 = str1 + str2 + " = " + res.split("+").join("")
        } else {
            if (str2.includes(".")) {
                str2 = scanNumbers(aux1Str + sm + auxStr, false)
                str2 = "[" + str2 + "]=" + StepsFrac(str2)
            }
            str1 = str1 + str2 + " = " + DoubleStr(tofrac(res.split("+").join("")))
        }
        str1 = str1.split("pi").join(Math.PI.toString())
        strltx += "<p style='text-align:center' >`" + str1 + "`</p>"

    } else if (isFrac(auxStr) && isFrac(aux1Str)) {
        aux1Str = aux1Str.split("(").join("")
        auxStr = auxStr.split("(").join("")
        aux1Str = aux1Str.split(")").join("")
        auxStr = auxStr.split(")").join("")
        str2 = aux1Str + sm + auxStr
        StepsC += 1

        strDevelopment = strDevelopment.split("(" + auxStr + ")").join(auxStr)
        strDevelopment = strDevelopment.split("(" + aux1Str + ")").join(aux1Str)

        if (auxStr.includes(".")) {
            auxStr = tofrac(auxStr)
        }

        if (aux1Str.includes(".")) {
            aux1Str = tofrac(aux1Str)
        }

        res = EvaluateFrac((aux1Str + sm + auxStr))

        str1 = strToLang("Paso") + StepsC + ": quad"
        StepLatex(str1, strDevelopment, str2, str3, res, false, true)
        str2 = aux1Str + sm + auxStr
        str1 = "-> [" + str2 + "]=" + StepsFrac(str2) + "=" + res

        strltx += "<p style='text-align:center' >`" + str1 + "`</p>"
    } else {
        res = WrongExpresion()
    }

    strltx += "</div>"
    strltx += "</div>"
}