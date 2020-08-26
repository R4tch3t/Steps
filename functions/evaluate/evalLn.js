EvalLn=(auxStr, sm)=>{
    auxStr = auxStr.split(")").join("")
    auxStr = auxStr.split("(").join("")

    if (auxStr.includes("/")) {
        //auxStr.removeFirst()
        //auxStr.removeLast()
        auxStr = auxStr.slice(1, auxStr.length - 1)
        let strArr = auxStr.split("/")
        let n1 = strArr[0]
        let n2 = strArr[1]
        let aux1S = auxStr

        auxStr = dividestr(n1, n2, 8)
        strDevelopment = strDevelopment.split(aux1S).join(auxStr)
    }
    strDevelopment = strDevelopment.split(sm+auxStr).join(sm + "(" + auxStr + ")")
    str2 = sm+"(" + auxStr + ")"
    auxStr = DoubleStr(auxStr)
    
    if (isNumber(auxStr)) {
        StepsC += 1
        auxStr = auxStr.split('pi').join(Math.PI.toString())
        auxStr = auxStr.split("I n f i n i t y").join("Infinity")
        if (MoreDVal !== 1 && toDecimalVal === 1) {
            res = ShaveStr(lnStr(auxStr), 16)
            res = res.split("e+").join("e")
        } else {
            res = lnStr(auxStr)
        }

        res = cleanR(res)
        auxStr = auxStr.split("Infinity").join("I n f i n i t y")

        str1 = strToLang("Paso") + StepsC + ": quad"
        strDevelopment = strDevelopment.split(sm + auxStr).join(sm+"(" + auxStr + ")")
        strDevelopment = strDevelopment.split("--").join("+")
        strDevelopment = strDevelopment.split("-+").join("-")

        StepLatex(str1, strDevelopment, str2, str2, res, false, true)

        //strDevelopment = strDevelopment.split(sm + "("+auxStr+")").join(res)

        str1 = "-> "
        str2 = sm+"(" + auxStr + ")"
        if (toDecimalVal === 1) {
            str1 = str1 + str2 + " = " + res.split("+").join("")
        } else {
            if (str2.includes(".")) {
                str2 = scanNumbers(sm+"(" + auxStr + ")", false)
                str2 = str2.split(sm).join(sm+"(") + ")"
                str2 = str2 + StepsFrac(str2)
            }
            str1 = str1 + str2 + " = " + tofrac(DoubleStr(res.split("+").join("")))
        }
        str1 = str1.split("pi").join(Math.PI.toString())
        //strltx += "<p style='text-align:center; width: " + wMobil + "px' >`" + str1 + "`</p>"
        Pstrltx(str1)

    } else {
        res = WrongExpresion()
    }

    strltx += "</div>"
    strltx += "</div>"
}