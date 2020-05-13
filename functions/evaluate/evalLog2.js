EvalLog2 = (auxStr) => {
    auxStr = auxStr.split("(").join("")
    auxStr = auxStr.split(")").join("")

    if (auxStr.includes("/")) {
        auxStr = auxStr.slice(1, auxStr.length - 1)
        let strArr = auxStr.split("/")
        let n1 = strArr[0]
        let n2 = strArr[1]
        let aux1S = auxStr

        auxStr = dividestr(n1, n2, 8)
        strDevelopment = strDevelopment.split(aux1S).join(auxStr)
    }

    str2 = "log_2(" + auxStr + ")"
    auxStr = DoubleStr(auxStr)
    strDevelopment = strDevelopment.split("log_2" + auxStr).join(str2)

    if (isNumber(auxStr)) {
        StepsC += 1
        auxStr = auxStr.split("pi").join(Math.PI.toString())
        if (MoreDVal !== 1 && toDecimalVal === 1) {
            res = ShaveStr(log2Str(auxStr), 16)
            res = res.split("e+").join("e")
        } else {
            res = log2Str(auxStr)
        }

        res = cleanR(res)

        str1 = strToLang("Paso") + StepsC + ": quad"
        strDevelopment = strDevelopment.split("log2" + auxStr).join("log_2(" + auxStr + ")")
        strDevelopment = strDevelopment.split("--").join("+")
        strDevelopment = strDevelopment.split("-+").join("-")
        StepLatex(str1, strDevelopment, str2, str2, res, false, true)

        str1 = "-> "
        str2 = "log_2(" + auxStr + ")"
        if (toDecimalVal === 1) {
            str1 = str1 + str2 + " = " + res.split("+").join("")
        } else {
            if (str2.includes(".")) {
                str2 = scanNumbers("log_2(" + auxStr + ")", false)
                str2 = str2.split("log_2").join("log_2(") + ")"
                str2 = str2 + StepsFrac(str2)
            }
            str1 = str1 + str2 + " = " + tofrac(DoubleStr(res.split("+").join("")))
        }
        str1 = str1.split("pi").join(Math.PI.toString())

        strltx += "<p style='text-align:center' >`" + str1 + "`</p>"

    } else {
        res = WrongExpresion()
    }

    strltx += "</div>"
    strltx += "</div>"
}