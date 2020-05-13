EvalCos = (auxStr) => {
    console.log(`cos: ${strDevelopment}`)

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
    
    //strDevelopment = strDevelopment.split("c"+auxStr).join("c(" + auxStr + ")")
    str2 = "c" + auxStr + ""
    auxStr = DoubleStr(auxStr)

    if (isNumber(auxStr)) {
        StepsC += 1
        auxStr = auxStr.split('pi').join(Math.PI.toString())
        if (MoreDVal !== 1 && toDecimalVal === 1) {
            res = ShaveStr((cosStr(auxStr, DegRad)), 16)
            res = res.split('e+').join("e")
        } else {
            res = cosStr(auxStr, DegRad)
        }

        res = cleanR(res)
        str2 = str2.split('c+').join("c")
        str1 = strToLang("Paso") + StepsC + ": quad"

        strDevelopment = strDevelopment.split("c(" + auxStr + ")").join("c"+auxStr)
        strDevelopment = strDevelopment.split("--").join("+")
        strDevelopment = strDevelopment.split("-+").join("-")
        StepLatex(str1, strDevelopment, str2, str2, res, false, true)

        str1 = "-> "
        str2 = "C O S(" + auxStr + ")"
        if (toDecimalVal === 1) {
            str1 = str1 + str2 + " = " + res.split("+").join("")
        } else {
            if (str2.includes(".")) {
                str2 = scanNumbers("c" + auxStr, false)
                str2 = str2.split("c").join("C O S(") + ")"
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