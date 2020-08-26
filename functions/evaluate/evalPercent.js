EvalPercent = (auxStr, aux1Str) => {
    band = true
    auxStr = auxStr.split("+").join("")
    aux1Str = aux1Str.split("+").join("")
    if (isNumber(auxStr) && isNumber(aux1Str)) {
        str2 = aux1Str + "%" + auxStr
        strDevelopment = strDevelopment.split("(" + aux1Str + ")").join(aux1Str)
        strDevelopment = strDevelopment.split("(" + auxStr + ")").join(auxStr)

        auxStr = DoubleStr(auxStr)
        aux1Str = DoubleStr(aux1Str)
        auxStr = auxStr.split("pi").join(Math.PI.toString())
        aux1Str = aux1Str.split("pi").join(Math.PI.toString())
        if (toDecimalVal === 1) {
            if (MoreDVal !== 1) {
                if (aux1Str.includes("e")) {
                    strDevelopment = strDevelopment.split(aux1Str).join("(" + aux1Str + ")")
                    aux1Str = "(" + aux1Str + ")"
                    str2 = aux1Str + "%" + auxStr
                }
                if (auxStr.includes("e")) {
                    strDevelopment = strDevelopment.split(auxStr).join("(" + auxStr + ")")
                    auxStr = "(" + auxStr + ")"
                    str2 = aux1Str + "%" + auxStr

                }
                var auxStrD = auxStr
                auxStrD = auxStrD.split('(').join("")
                //auxStrD=auxStrD.replacingOccurrences(of: ")", with: "")
                var aux1StrD = aux1Str
                aux1StrD = aux1StrD.split('(').join("")
                auxStrD = auxStrD.split(')').join("")
                aux1StrD = aux1StrD.split(')').join("")

                let aux = (isNumber(auxStr) ? Number(auxStr) : 1)
                let aux1 = (isNumber(aux1Str) ? Number(aux1Str) : 0)
                res = (aux1 % aux).toString()
                res = res.split('e+').join("e")
            } else {
                res = residuo(aux1Str, auxStr)
            }


            if (aux1Str.startsWith("-") && LessThan(auxStr, "0.0")) {
                res = "+" + res
            }

            res = cleanR(res)
            strDevelopment = strDevelopment.split('--').join("+")

        }

        band = str2.includes(".") || toDecimalVal === 1

        if (band) {
            StepsC += 1
        }

        str1 = strToLang("Paso") + StepsC + ": quad"
        strDevelopment = strDevelopment.split('-+').join("-")

        StepLatex(str1, strDevelopment, str2, str2, res, false, band)
        res = res.split('+').join("")
        str1 = "-> "

        if (toDecimalVal === 1) {
            str2 = "[ " + str2 + " ]"
            str1 = str1 + str2 + " = " + res
        } else {

            if (str2.includes(".")) {
                str2 = aux1Str + "÷" + auxStr

                str2 = scanNumbers(str2, false)

                str2 = "[" + str2 + "]=" + StepsFrac(str2)
            }

            str1 = str1 + str2 + " = " + tofrac(DoubleStr(res))


        }
        str1 = str1.split('pi').join(Math.PI.toString())

        if (band) {
            //strltx += "<p style='text-align:center; width: " + wMobil + "px' >`" + str1 + "`</p>"
            Pstrltx(str1)
        }

    } else if (isFrac(auxStr) && isFrac(aux1Str)) {
        aux1Str = aux1Str.split('(').join("")
        auxStr = auxStr.split('(').join("")
        aux1Str = aux1Str.split(')').join("")
        auxStr = auxStr.split(')').join("")

    } else {
        res = WrongExpresion()
    }

    strltx += "</div>"
    strltx += "</div>"
}