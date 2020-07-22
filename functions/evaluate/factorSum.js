factorSum = (STR, S, OP) => {
    let auxStr = S[S.length - 1] === undefined ? "+" : S.pop();
    let aux1Str = S[S.length - 1] === undefined ? "+" : S.pop();
    let auxChar = auxStr.match(/[A-Z]/gi);
    let aux1Char = aux1Str.match(/[A-Z]/gi);
    let auxStrPow = auxStr + ""
    let aux1StrPow = aux1Str + ""
    let aux1CharPow = aux1Str.match(/[A-Z]/gi);
    let strSplit = aux1StrPow.split(aux1CharPow).join("")
    console.log(`STR +: ${STR}`);
    let sign = STR.pop();
    
    if (strSplit === "") {
        strSplit = "1"
    } else if (strSplit === "-") {
        strSplit = "-1"
    }

    console.log(`auxStr: ${auxStr}`);
    console.log(`aux1Str: ${aux1Str}`);
    console.log(`auxChar: ${auxChar}`);
    console.log(`aux1Char: ${aux1Char}`);
    str2 = aux1Str + "+" + auxStr;
    //console.log(`str2+: ${strDevelopment}`)
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
        if (auxStr === "") {
            auxStr = '1';
        }
        if (aux1Str === "") {
            aux1Str = '1';
        }
        res = plusstr(auxStr, aux1Str);
        res += aux1Char;
        StepsC += 1
        str1 = strToLang("Paso") + StepsC.toString() + ": quad"
        StepLatex(str1, strDevelopment, str2, str3, res, change, true)
        str1 = "-> "
        str2 = "[ " + str2 + " ]" // + "(color(red)(" + aux1Str + "/" + mcd + ")x+color(red)(" + auxStr + "/" + mcd + "))"
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
                

            } else {
                strDevelopment = strDevelopment.split(str2 + "+" + nextStr);
                str2 = aux1Str + "+" + nextStr
                strDevelopment = strDevelopment.join(str2 + "+" + auxStr);
                aux1Str = aux1Str.split(aux1Char).join('');
                nextStr = nextStr.split(aux1Char).join('');
                if (nextStr === "") {
                    nextStr = '1';
                }
                if (aux1Str === "") {
                    aux1Str = '1';
                }
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
        } else {
            aux1Str = aux1Str.split(aux1Char).join("");
            if (aux1Str === "") {
                aux1Str = '1';
            }
            if (auxChar) {
                auxStr = auxStr.split(auxChar).join("");
            } else {
                auxChar = "";
            }
            if (isNumber(auxStr) && isNumber(aux1Str)) {
                const mcd = MCDStr(auxStr, aux1Str);
                let aux = dividestr(auxStr, mcd, 128);
                let aux1 = dividestr(aux1Str, mcd, 128);
                res = mcd>1?mcd:"" 
                res += "(" + aux1 + aux1Char + "+" + aux + auxChar + ")";
                console.log(`str2+: ${strDevelopment} res: ${res} aux1Char: ${aux1Char}`)
                res = res.split('1' + aux1Char).join(aux1Char);
                if (auxChar !== "") {
                    res = res.split('1' + auxChar).join(auxChar);
                }
                console.log(mcd);
                
                StepsC += 1
                str1 = strToLang("Paso") + StepsC.toString() + ": quad"
                StepLatex(str1, strDevelopment, str2, str3, res, change, true)
                str1 = "-> "
                
                if (BiggerThan(mcd, "1")) {
                    str2 = "[ " + str2 + " ]=" + mcd + "(color(red)(" + aux1Str + "/" + mcd + ")" + aux1Char + "+color(red)(" + auxStr + "/" + mcd + ")" + auxChar + ")"
                } else {
                    str2 = "[ " + str2 + " ]"

                    res = aux1Char !== "" && aux1 === '1' ? aux1Char : aux1 + aux1Char;
                    res += "+" + (auxChar !== "" && aux === '1' ? auxChar : aux + auxChar);
                    //res = aux1 + aux1Char + "+" + aux + auxChar;
                    //res = res.split('1' + aux1Char).join(aux1Char);
                    //res = res.split('1' + auxChar).join(auxChar);
                }
                str1 = str1 + str2 + " = " + res
                Pstrltx(str1)
                strltx += "</div>"
                strltx += "</div>"

                S.push(res)
                
            }
        }
    }
    
    
    OP.push([["" + auxStrPow,"",0],[strSplit,aux1CharPow,1]])
}