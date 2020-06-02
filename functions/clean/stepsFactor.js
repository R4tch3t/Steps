StepsFactor = (str) => {
    console.log('StepsFactor')
    
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
            console.log(`STR steps: ${STR}`);
            while (STR.length>0) {
                
                switch (STR[STR.length-1]) {
                case "+":
                    STR.pop()
                    break
                case "-":
                    STR.pop()
                    break
                case "·":
                case "⋅":
                case "×":
                case "*":
                    STR.pop()
                    break
                case "/":
                    STR.pop()
                    break
                case "√":
                    STR.pop()
                    break
                case "^":
                    STR.pop()
                    break
                case 'log':
                case "ln":
                    STR.pop()
                    break
                case "log10":
                    STR.pop()
                    break
                case "log2":
                    STR.pop()

                    break
                case "c":
                    STR.pop()

                    break
                case "s":
                    STR.pop()

                    break
                case "t":
                    STR.pop()

                    break
                case "%":
                    STR.pop()

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