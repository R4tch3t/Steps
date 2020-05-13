res = ""
str1 = ""
str2 = ""
str3 = ""
change = false
Evaluate=(str)=>{
        //Entrada de datos
        let STR=[]
        let OP=[]
        let S=[]
        res = ""
        str1 = ""
        str2 = ""
        str3 = ""
        change = false
        
        try{
            res=strToLang("DigitEx")
            
            //Data clean
            if (BSC){
                STR=DepurarI(str)
            }
            else{
                STR=DepurarR(str)
            }
            
            
            while (STR.length>0) {
                switch (Pref(STR[STR.length-1])) {
                    case 1:
                        OP.push(STR.pop())
                    break
                        
                    case 2:
                        while (OP.length > 0 && OP[OP.length-1] !== "(") {
                            S.push(OP.pop())
                        }
                        
                        OP.pop()
                        
                        STR.pop()
                        break
                    case 3:
                    case 4:
                    case 5:
                        while (OP.length > 0 && Pref(OP[OP.length-1]) >= Pref(STR[STR.length-1])) {
                            S.push(OP.pop())
                        }
                        
                        OP.push(STR.pop())
                        break
                        
                    default:
                        S.push(STR.pop())
                } 
            }
            //STR.removeAll()
            STR.splice(0)
            while (S.length>0) {
                STR.push(S.pop())
            }
            S.splice(0)
            console.log(STR)
            while (STR.length>0) {
                
                switch (STR[STR.length-1]) {
                case "+":
                    STR.pop()
                    
                    let auxStr = S[S.length-1] === undefined ? "+": S.pop()
                    let aux1Str = S[S.length-1] === undefined ? "+": S.pop()
                    EvalSum(auxStr, aux1Str)

                    S.push( res )
                    
                    break
                case "-":
                    STR.pop()
                    
                    auxStr = S[S.length-1] === undefined ? "-": S.pop()
                    aux1Str=S[S.length-1] === undefined ? "-": S.pop()
                    EvalMinus(auxStr, aux1Str)
                    
                    S.push( res )
                    
                    break
                case "·":
                case "⋅":
                case "×":
                case "*":
                    const sm = STR.pop()
                    
                    auxStr = S[S.length-1] === undefined ? sm: S.pop()
                    aux1Str=S[S.length-1] === undefined ? sm: S.pop()
                    EvalPlux(auxStr, aux1Str, sm)

                    S.push( res )
                    
                    break
                case "/":
                    STR.pop()

                    auxStr = S[S.length-1] === undefined ? "÷": S.pop()
                    aux1Str=S[S.length-1] === undefined ? "÷": S.pop()
                    EvalDiv(auxStr, aux1Str)
                    
                    S.push( res )

                    break
                case "√":
                    STR.pop()
                    auxStr = S[S.length-1] === undefined ? "": S.pop()
                    aux1Str=S[S.length-1] === undefined ? "": S.pop()
                    const replaceB = (S.length > 0 && STR.length > 0 && Pref(STR[0]) !== 99)
                    EvalSqrt(auxStr, aux1Str, replaceB)
                    
                    S.push( res )

                    break
                case "^":
                    STR.pop()
                    auxStr = S[S.length-1] === undefined ? "0":S.pop()
                    aux1Str=S[S.length-1] === undefined ? "0": S.pop()
                    EvalPow(auxStr, aux1Str)
                    
                    S.push( res )

                    break
                case 'log':
                case "ln":
                    const smL = STR.pop()

                    auxStr = S[S.length-1] === undefined ? "0": S.pop()
                    EvalLn(auxStr,smL)

                    S.push( res )

                    break
                case "log10":
                    STR.pop()

                    auxStr = S[S.length-1] === undefined ? "0": S.pop()
                    EvalLog10(auxStr)

                    S.push( res )

                    break
                case "log2":
                    STR.pop()
                    auxStr = S[S.length-1] === undefined ? "0": S.pop()
                    EvalLog2(auxStr)

                    S.push( res )

                    break
                case "c":
                    STR.pop()

                    auxStr = S[S.length-1] === undefined ? "c" : S.pop()
                    EvalCos(auxStr)

                    S.push( res )

                    break
                case "s":
                    STR.pop()

                    auxStr = S[S.length-1] === undefined ? "s" : S.pop()
                    EvalSen(auxStr)

                    S.push( res )

                    break
                case "t":
                    STR.pop()

                    auxStr = S[S.length-1] === undefined ? "t" : S.pop()
                    EvalTan(auxStr)

                    S.push( res )

                    break
               /* case "·":
                case "⋅":
                    auxStr = S[S.length-1] === undefined ? STR[STR.length-1] : S.pop()
                    aux1Str=S[S.length-1] === undefined ? STR[STR.length-1] : S.pop()
                    auxStr=auxStr.split("(").join("")
                    aux1Str = aux1Str.split("(").join("")
                    auxStr = auxStr.split(")").join("")
                    aux1Str = aux1Str.split(")").join("")
                    if (isNumber(auxStr) && isNumber(aux1Str)) {
                        StepsC += 1
                        str2=aux1Str+''+STR[STR.length-1]+''+auxStr
                        strDevelopment=strDevelopment.split("("+aux1Str+")").join(aux1Str)
                        strDevelopment=strDevelopment.split("("+auxStr+")").join(auxStr)

                        auxStr=DoubleStr(auxStr)
                        aux1Str=DoubleStr(aux1Str)
                        auxStr=auxStr.split("pi").join(Math.PI.toString())
                        aux1Str = aux1Str.split("pi").join(Math.PI.toString())

                        if (MoreDVal !== 1&&toDecimalVal === 1){
                            let aux = (isNumber(auxStr) ? Number(auxStr) : 0.0)
                            let aux1 = (isNumber(aux1Str) ? Number(aux1Str) : 0.0)
                            let nD = place(auxStr, aux1Str)

                            res = (Math.round((aux * aux1) * nD) / nD).toString()
                            res = res.split("+").join("")

                        }else{
                            res =  forstr(auxStr, aux1Str)
                        }

                        res=cleanR(res)
                        str2=str2.split(STR[STR.length-1]+"+").join(STR[STR.length-1])
                        str1=strToLang("Paso")+StepsC+": quad"

                        strDevelopment=strDevelopment.split("--").join("+")
                        strDevelopment=strDevelopment.split("-+").join("-")

                        if (LessThan(aux1Str,"0.0") && LessThan(auxStr,"0.0")) {
                            StepLatex(str1, strDevelopment, str2, str2, "+"+res, false, true)
                        }else{
                            StepLatex(str1, strDevelopment, str2, str2, res, false, true)
                        }


                        str1="-> "
                        if (toDecimalVal===1){
                            str2="[ "+String(aux1Str)+" · "+String(auxStr)+" ]"
                            str1=str1+str2+" = "+res.split("+").join("")
                        }else{
                            if (str2.includes(STR[STR.length-1])) {

                                str2=scanNumbers(aux1Str+"·"+auxStr,false)
                                str2="["+str2+"]="+StepsFrac(str2)
                            }
                            str1=str1+str2+" = "+DoubleStr(tofrac(res.split("+").join("")))
                        }
                        str1=str1.split("pi").join(Math.PI.toString())
                        strltx+="<p style='text-align:center' >`"+str1+"`</p>"
                    }
                    else if (isFrac(auxStr) && isFrac(aux1Str)) {
                        aux1Str=aux1Str.split("(").join("")
                        auxStr = auxStr.split("(").join("")
                        aux1Str = aux1Str.split(")").join("")
                        auxStr = auxStr.split(")").join("")
                        str2=aux1Str+"·"+auxStr
                        StepsC += 1

                        strDevelopment=strDevelopment.split("("+auxStr+")").join(auxStr)
                        strDevelopment=strDevelopment.split("("+aux1Str+")").join(aux1Str)

                        if (auxStr.includes(".")) {
                            auxStr=tofrac(auxStr)
                        }

                        if (aux1Str.includes(".")){
                            aux1Str=tofrac(aux1Str)
                        }

                        res=EvaluateFrac(aux1Str+STR[STR.length-1]+auxStr)

                        str1=strToLang("Paso")+StepsC+": quad"
                        StepLatex(str1, strDevelopment, str2, str3, res, false, true)
                        str2=aux1Str+STR[STR.length-1]+auxStr
                        str1 = "-> ["+str2+"]="+StepsFrac(str2)+"="+res

                        strltx+="<p style='text-align:center' >`"+str1+"`</p>"
                    }else{
                        res=WrongExpresion()
                    }

                    strltx+="</div>"
                    strltx+="</div>"

                    S.push( res )
                    STR.pop()
                    
                    break*/
                case "%":
                    STR.pop()

                    auxStr = S[S.length-1] === undefined ? "%": S.pop()
                    aux1Str=S[S.length-1] === undefined ? "%": S.pop()
                    EvalPercent(auxStr, aux1Str)

                    S.push( res )

                break
                default:
                    S.push(STR.pop())
                //break
                }
            }
        }catch(e){
            console.log(e)
        }
        if(S[S.length-1]===undefined){
            S.push(strToLang("DigitEx"))
        }
            return S[S.length-1].split('pi').join(Math.PI.toString());
        
     }