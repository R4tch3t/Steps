EvalDiv = (auxStr, aux1Str) => {
     let band = true
     auxStr = auxStr.split("+").join("")
     aux1Str = aux1Str.split("+").join("")
     if (isNumber(auxStr) && isNumber(aux1Str)) {

         str2 = aux1Str + "/" + auxStr
         strDevelopment = strDevelopment.split("(" + aux1Str + ")").join(aux1Str)
         strDevelopment = strDevelopment.split("(" + auxStr + ")").join(auxStr)
        
         strDevelopment = strDevelopment.split("log_10" + auxStr).join("log_10(" + auxStr + ")")
         strDevelopment = strDevelopment.split("log_10" + aux1Str).join("log_10(" + aux1Str + ")")
         strDevelopment = strDevelopment.split("log_2" + auxStr).join("log_2(" + auxStr + ")")
         strDevelopment = strDevelopment.split("log_2" + aux1Str).join("log_2(" + aux1Str + ")")

         auxStr = DoubleStr(auxStr)
         aux1Str = DoubleStr(aux1Str)
         auxStr = auxStr.split("pi").join(Math.PI.toString())
         aux1Str = aux1Str.split("pi").join(Math.PI.toString())
         auxStr = auxStr.split("I n f i n i t y").join("Infinity")
         aux1Str = aux1Str.split("I n f i n i t y").join("Infinity")

         if (toDecimalVal === 1) {
             if (MoreDVal !== 1) {
                 if (aux1Str.includes("e")) {
                     strDevelopment = strDevelopment.split(aux1Str).join("(" + aux1Str + ")")
                     aux1Str = "(" + aux1Str + ")"
                     str2 = aux1Str + "/" + auxStr
                 }
                 if (auxStr.includes("e")) {
                     strDevelopment = strDevelopment.split(auxStr).join("(" + auxStr + ")")
                     auxStr = "(" + auxStr + ")"
                     str2 = aux1Str + "/" + auxStr
                 }
                 let auxStrD = auxStr
                 auxStrD = auxStrD.split('(').join("")
                 let aux1StrD = aux1Str
                 aux1StrD = aux1Str.split('(').join("")
                 auxStrD = auxStrD.split(')').join("")
                 aux1StrD = aux1Str.split(')').join("")

                 let aux = (isNumber(auxStr) ? Number(auxStr) : 0.0)
                 let aux1 = (isNumber(aux1Str) ? Number(aux1Str) : 0.0)

                 res = (aux1 / aux).toString()
                 if (res.length > 16) {
                     let nD = Math.pow(10.0, 14.0)
                     res = (Math.round((aux1 / aux) * nD) / nD).toString()
                 }
                 res = res.split('e+').join("e")
             } else {
                 res = dividestr(aux1Str, auxStr, 128)
             }
             if (aux1Str.startsWith("-") && LessThan(auxStr, "0.0")) {
                 res = "+" + res
             }

             res = cleanR(res)
             strDevelopment = strDevelopment.split('--').join("+")

         } else {

             if (aux1Str.includes(".") || auxStr.includes(".")) {
                 aux1Str = "(" + tofrac(aux1Str) + ")"
                 auxStr = "(" + tofrac(auxStr) + ")"
                 res = EvaluateFrac(aux1Str + "÷" + auxStr)
             } else {
                 res = "(" + aux1Str + "/" + auxStr + ")"
             }

         }

         auxStr = auxStr.split("Infinity").join("I n f i n i t y")
         aux1Str = aux1Str.split("Infinity").join("I n f i n i t y")

         band = str2.includes(".") || toDecimalVal === 1

         if (band) {
             StepsC += 1
         }

         str1 = strToLang("Paso") + StepsC + ": quad"

         strDevelopment = strDevelopment.split('-+').join("-")
         console.log(`evalDiv: ${auxStr}`)
         console.log(`evalDiv1: ${aux1Str}`)
         console.log(`evalDivStr: ${str2}`)
         if (auxStr.includes('I n f') || aux1Str.includes('I n f')) {
             if (auxStr.includes('-')) {
                str2=str2.split("-I n f i n i t y").join("(-I n f i n i t y)")
             }else{
                str2=str2.split("I n f i n i t y").join("(I n f i n i t y)")
             }
             strDevelopment = strDevelopment.split(aux1Str + "/" + auxStr).join(str2)
         }
         console.log(`evalDivStrAf: ${str2}`)

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
             str2 = str2.split('÷').join("/")

             str1 = str1 + str2 + " = " + tofrac(DoubleStr(res))


         }
         str1 = str1.split('pi').join(Math.PI.toString())

         if (band) {
             strltx += "<p style='text-align:center' >`" + str1 + "`</p>"
         }
     } else if (isFrac(auxStr) && isFrac(aux1Str)) {
         aux1Str = aux1Str.split('(').join("")
         auxStr = auxStr.split('(').join("")
         aux1Str = aux1Str.split(')').join("")
         auxStr = auxStr.split(')').join("")

         str2 = aux1Str + "/" + auxStr
         StepsC += 1
         strDevelopment = strDevelopment.split("(" + auxStr + ")").join(auxStr)
         strDevelopment = strDevelopment.split("(" + aux1Str + ")").join(aux1Str)
         if (auxStr.includes(".")) {
             auxStr = tofrac(auxStr)
         }
         if (aux1Str.includes(".")) {
             aux1Str = tofrac(aux1Str)
         }

         res = EvaluateFrac(aux1Str + "÷" + auxStr)

         str1 = strToLang("Paso") + StepsC + ": quad"
         StepLatex(str1, strDevelopment, str2, str3, res, false, true)
         str2 = aux1Str + "÷" + auxStr
         str1 = "-> [(" + aux1Str + ")/(" + auxStr + ")]=" + StepsFrac(str2) + "=" + res

         strltx += "<p style='text-align:center' >`" + str1 + "`</p>"

     } else {
         res = WrongExpresion()
     }

     strltx += "</div>"
     strltx += "</div>"
}