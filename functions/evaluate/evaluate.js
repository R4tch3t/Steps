res = ""
str1 = ""
str2 = ""
str3 = ""
change = false
Pstrltx = (s) => {
    strltx += "<p class='pProcess' style='text-align:center;' >`" + s + "`</p>"
}
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