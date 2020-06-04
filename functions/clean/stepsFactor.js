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
                    let auxStr = S[S.length - 1] === undefined ? "+" : S.pop();
                    let aux1Str = S[S.length - 1] === undefined ? "+" : S.pop();
                    let auxChar = auxStr.match(/[A-Z]/gi);
                    const aux1Char = aux1Str.match(/[A-Z]/gi);
                    STR.pop();
                    console.log(`auxStr: ${auxStr}`);
                    console.log(`aux1Str: ${aux1Str}`);
                    console.log(`auxChar: ${auxChar}`);
                    console.log(`aux1Char: ${aux1Char}`);
                    str2 = aux1Str + "+" + auxStr;
                    if (auxStr.includes(auxChar) && !aux1Str.includes(aux1Char)) {
                        const auxTemp = aux1Str;
                        strDevelopment = strDevelopment.split(str2);
                        str2 = auxStr + "+" + aux1Str;
                        //change = true
                        aux1Str = auxStr;
                        auxStr = auxTemp;
                        strDevelopment = strDevelopment.join(str2);

                    }
                    if (aux1Str.includes(aux1Char) && auxStr.includes(aux1Char)) {
                        auxStr = auxStr.split(aux1Char).join('');
                        aux1Str = aux1Str.split(aux1Char).join('');
                        res = plusstr(auxStr, aux1Str);
                        res += aux1Char;
                        StepsC += 1
                        str1 = strToLang("Paso") + StepsC.toString() + ": quad"
                        StepLatex(str1, strDevelopment, str2, str3, res, change, true)
                        str1 = "-> "
                        str2 = "[ " + str2 + " ]"// + "(color(red)(" + aux1Str + "/" + mcd + ")x+color(red)(" + auxStr + "/" + mcd + "))"
                        str1 = str1 + str2 + " = " + res
                        Pstrltx(str1)
                        strltx += "</div>"
                        strltx += "</div>"
                        S.push(res)
                    } else if (aux1Str.includes(aux1Char)) {
                        
                        if (STR[0] === '+' && !auxStr.includes(auxChar)) {
                            let nextStr = STR[1] === undefined ? "+" : STR.pop()
                            
                            console.log(STR)
                            if (!nextStr.includes(aux1Char)) {
                                str2 = auxStr + "+" + nextStr;
                                //auxStr = auxStr.split('x').join('');
                                //nextStr = aux1Str.split('x').join('');
                                res = plusstr(auxStr, nextStr);
                                //res += "x";
                                StepsC += 1
                                str1 = strToLang("Paso") + StepsC.toString() + ": quad"
                                StepLatex(str1, strDevelopment, str2, str3, res, change, true)
                                str1 = "-> "
                                str2 = "[ " + str2 + " ]" // + "(color(red)(" + aux1Str + "/" + mcd + ")x+color(red)(" + auxStr + "/" + mcd + "))"
                                str1 = str1 + str2 + " = " + res
                                Pstrltx(str1)
                                strltx += "</div>"
                                strltx += "</div>"
                                S.push(aux1Str)
                                S.push(res)
                                
                            }else{
                                strDevelopment = strDevelopment.split(str2 + "+" + nextStr);
                                str2 = aux1Str + "+" + nextStr
                                strDevelopment = strDevelopment.join(str2 + "+" + auxStr);
                                aux1Str = aux1Str.split(aux1Char).join('');
                                nextStr = nextStr.split(aux1Char).join('');
                                res = plusstr(aux1Str, nextStr);
                                res += aux1Char;
                                StepsC += 1;
                                str1 = strToLang("Paso") + StepsC.toString() + ": quad";
                                StepLatex(str1, strDevelopment, str2, str3, res, change, true);
                                str1 = "-> "
                                str2 = "[ " + str2 + " ]" // + "(color(red)(" + aux1Str + "/" + mcd + ")x+color(red)(" + auxStr + "/" + mcd + "))"
                                str1 = str1 + str2 + " = " + res
                                Pstrltx(str1)
                                strltx += "</div>"
                                strltx += "</div>"
                                S.push(res)
                                S.push(auxStr)
                            }
                        }else{
                            aux1Str = aux1Str.split(aux1Char).join("");
                            if (auxChar) {
                                auxStr = auxStr.split(auxChar).join("");
                            }else{
                                auxChar="";
                            }
                            if (isNumber(auxStr) && isNumber(aux1Str)) {
                                const mcd = MCDStr(auxStr, aux1Str);
                                let aux = dividestr(auxStr, mcd, 128);
                                let aux1 = dividestr(aux1Str, mcd, 128);
                                res = mcd + "(" + aux1 + aux1Char + "+" + aux + auxChar + ")";
                                res = res.split('1' + aux1Char).join(aux1Char);
                                res = res.split('1' + auxChar).join(auxChar);
                                console.log(mcd);
                                
                                    StepsC += 1
                                    str1 = strToLang("Paso") + StepsC.toString() + ": quad"
                                    StepLatex(str1, strDevelopment, str2, str3, res, change, true)
                                    str1 = "-> "
                                    if (BiggerThan(mcd, "1")) {
                                        str2 = "[ " + str2 + " ]="+mcd+"(color(red)("+aux1Str+"/"+mcd+")"+aux1Char+"+color(red)("+auxStr+"/"+mcd+")"+auxChar+")"
                                    }else{
                                        str2 = "[ " + str2 + " ]"
                                        res = aux1 + aux1Char + "+" + aux + auxChar;
                                    }
                                    str1 = str1 + str2 + " = " + res
                                    Pstrltx(str1)
                                    strltx += "</div>"
                                    strltx += "</div>"
                                
                                S.push(res)
                            }
                        }
                    }
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