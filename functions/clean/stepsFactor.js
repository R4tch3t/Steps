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
                    let aux1Char = aux1Str.match(/[A-Z]/gi);
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
                        if(auxStr===""){
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
                        }else{
                            aux1Str = aux1Str.split(aux1Char).join("");
                            if (aux1Str===""){
                                aux1Str='1';
                            }
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
                                if(auxChar!==""){
                                    res = res.split('1' + auxChar).join(auxChar);
                                }
                                console.log(mcd);
                                
                                    StepsC += 1
                                    str1 = strToLang("Paso") + StepsC.toString() + ": quad"
                                    StepLatex(str1, strDevelopment, str2, str3, res, change, true)
                                    str1 = "-> "
                                    if (BiggerThan(mcd, "1")) {
                                        str2 = "[ " + str2 + " ]="+mcd+"(color(red)("+aux1Str+"/"+mcd+")"+aux1Char+"+color(red)("+auxStr+"/"+mcd+")"+auxChar+")"
                                    }else{
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
                    STR.pop();
                        console.log(`STR ^: ${STR}`);
                        auxStr = S[S.length - 1] === undefined ? "+" : S.pop();
                        aux1Str = S[S.length - 1] === undefined ? "+" : S.pop();
                        auxChar = auxStr.match(/[A-Z]/gi);
                        aux1Char = aux1Str.match(/[A-Z]/gi);
                        if (aux1Char){
                            //factoring Ruffini poly's
                            let c = 0;
                            let c2 = 0;
                            let poliArr = [];
                            let poli2 = [];
                            let xs = []
                            let x = 0;
                            let bandF = true;
                            let bandG = false;
                            let xStr = "";
                            let prevStep = "";
                            let prevFactor = "";
                            let charNumber = ' ';
                            let prevNumber = '';
                            let minPow = 1;
                            let mcdAux = aux1Str.split(aux1Char).join('');
                            
                            //maximo factor comun
                            if (mcdAux === "") {
                                mcdAux = 1;
                            } else {
                                mcdAux = parseInt(mcdAux);
                            }

                            //factoring x's
                            while (c < STR.length && (charNumber !== "" && charNumber!=="^")){
                                charNumber = parseInt(charNumber);
                                if (charNumber >= 0 || charNumber < 0) {
                                    break;
                                }
                                charNumber = STR[c].split(aux1Char).join('');
                                //console.log(STR[c])
                                //console.log(aux1Char)  
                                if (STR[c] === ""+aux1Char){
                                    poliArr.push("1");    
                                } else if (STR[c].includes("" + aux1Char)){

                                   // poliArr.push(charNumber);
                                    if ((parseInt(charNumber) % mcdAux) > 0) {
                                        poliArr.push(charNumber);
                                        bandF=false;
                                    } else {
                                        poliArr.push((parseInt(charNumber) / mcdAux)+"");
                                        //bandG=true;
                                    }
                                    charNumber = "";    
                                } else if (STR[c]!=="^") {
                                    poliArr.push(STR[c]);    
                                }                              
                                //poliArr.push(STR[c].includes() ===  ? "1" : STR[c]);
                                c++
                            }
                            console.log(`charNumber: ${charNumber}`)
                            
                            //no contains constant, pure x's
                            if (charNumber === "" || charNumber === "^"){
                                

                                console.log(`mcdAux: ${1%mcdAux}`)
                                prevFactor = "" + aux1Char
                                //get minPow
                                if (charNumber==="^"){
                                    minPow = parseInt(STR[c]);
                                    prevFactor = "" + aux1Char+"^"+minPow;
                                    c++;
                                    charNumber = STR[c].split(aux1Char).join('');
                                    
                                    if (charNumber===""){
                                        poliArr.push("1");
                                    }else{
                                        if (parseInt(charNumber)%mcdAux>0){
                                            poliArr.push(charNumber);
                                            bandF=false;
                                        }else{
                                            poliArr.push((parseInt(charNumber)/mcdAux)+"");
                                        }
                                        //bandF = parseInt()
                                    }
                                    c++;
                                    charNumber="";
                                }
                                auxStr -= minPow;
                                //poliArr.push(1);
                                res=""
                                while (c < STR.length) {
                                    if (charNumber==="^"){
                                        const difPow = parseInt(STR[c]) - minPow
                                        if (difPow>1){
                                            poliArr.push(difPow);
                                        }else{
                                            poliArr.pop();
                                        }
                                    }else{
                                        if((STR[c]+"").includes(aux1Char)){
                                            charNumber = STR[c].split(aux1Char).join('');
                                            if (parseInt(charNumber) % mcdAux > 0) {
                                                poliArr.push(STR[c]);
                                                bandF = false;
                                            } else {
                                                if ((parseInt(charNumber) / mcdAux)>1){
                                                    poliArr.push((parseInt(charNumber) / mcdAux) + aux1Char + "");
                                                }else{
                                                    poliArr.push(aux1Char + "");
                                                }
                                            }
                                        }else{
                                            poliArr.push(STR[c]);
                                        }
                                        
                                        //                                       
                                    }

                                    charNumber = STR[c]//.split(aux1Char).join('');
                                    c++
                                }
                                console.log(`poliArr: ${poliArr}`)
                                //builded res
                                c=0;
                                charNumber = "";
                                while (c < poliArr.length) {
                                    if(charNumber==="-"){
                                        //res = "-" + poliArr[c] + res;       
                                        if (poliArr[c] === "^") {
                                            res = "-" + poliArr[c + 2] + poliArr[c] + poliArr[c + 1] + res;
                                        } else {
                                            res = "-" + poliArr[c] + res;
                                        }
                                    } else if (charNumber === "+"){
                                        if (poliArr[c]==="^"){
                                            res = "+" + poliArr[c+2] + poliArr[c] + poliArr[c+1] + res;       
                                        }else{
                                            res = "+" + poliArr[c] + res;
                                        }
                                    }
                                    charNumber = poliArr[c];
                                    c++;
                                }
                                if(auxStr>1){
                                    if(bandF){
                                        prevFactor = mcdAux + "" + aux1Char
                                        res = prevFactor + "(" + aux1Char + "^" + auxStr + res + ")";
                                        aux1Str = "";
                                    }else{
                                        res = prevFactor + "(" + aux1Str + "^" + auxStr + res + ")";
                                    }
                                }else{
                                    if (bandF) {
                                        prevFactor = mcdAux + "" + aux1Char
                                    }
                                    res = prevFactor + "(" + aux1Str + res + ")";
                                }
                                StepsC += 1;
                                str1 = strToLang("Paso") + StepsC.toString() + ": quad"
                                str2 = strDevelopment
                                //res = "(" + a + aux1Char + "+" + b + ")^2";

                                StepLatex(str1, strDevelopment, str2, str3, res, change, true)
                                str1 = "-> "
                                str2 = "[ " + str2 + " ]"
                                str1 = str1 + str2 + " = " + res
                                Pstrltx(str1)
                                strltx += "</div>"
                                strltx += "</div>"
                                //STR = [];
                                STR = poliArr.splice(0, poliArr.length);
                                console.log(`pureXS: ${poliArr}`);
                                console.log(`pureSTR: ${STR}`);
                                console.log(`pureRes: ${res}`);
                            }

                            poliArr = [];
                            c = STR.length - 1;
                            charNumber = ''
                            bandF = true;
                            bandG = false;

                            aux1Str = aux1Str.split(aux1Char).join('');
                            if (aux1Str===""){
                                poliArr.push(1);
                                poli2.push(1);
                            }else{
                                poliArr.push(parseInt(aux1Str));
                                poli2.push(parseInt(aux1Str));
                            }
                            
                            //let nStr='';
                            while (c >= 0){
                                console.log(STR[c]+" "+c)
                                charNumber = (STR[c]+"").split(aux1Char).join('');
                                if (charNumber === "") {
                                    poliArr.push(1);
                                    poli2.push(1);
                                } else if (charNumber !== "+" && charNumber !== "-" && charNumber !== "^") {
                                    poliArr.push(parseInt(charNumber));
                                    poli2.push(parseInt(charNumber));
                                } else if (charNumber === "^") {
                                    poliArr.pop();
                                    poli2.pop();
                                } else if (charNumber === "-") {
                                    const i = poliArr.length - 1
                                    if(poliArr[i]>0){
                                        poliArr[i] = poliArr[i] * -1;
                                        poli2[i] = poli2[i] * -1;   
                                    }else{
                                        if (poliArr[i-1] > 0) {
                                            poliArr[i - 1] = poliArr[i - 1] * -1;
                                            poli2[i - 1] = poli2[i - 1] * -1;
                                        }
                                    }
                                }

                                //prevNumber=   
                                c-=1;
                            }
                            console.log(`poliArr ${poliArr}`);
                            //c2 = poliArr[poliArr.length-1];
                            c2 = 1;
                            /*while(c2>1){
                                c2--;
                            }*/
                            let countB = 0;
                            while (bandF){
                               // bandF = c2 !== -1
                                c=1;
                                const poliAux = [poliArr[0]]
                                while (c < poli2.length){
                                    const a = poli2[c];
                                    poliAux.push(c2 * poliAux[c-1]+a);
                                    c++;
                                }
                                console.log(`poliAux: ${poliAux}`)
                                console.log(`c22: ${c2}`)
                                if (/*(poliAux[poliAux.length - 1] > 0 || poliAux[poliAux.length - 1] < 0)*/
                                    poliAux[poliAux.length - 1] !==0 && poliAux.length>1){
                                    if(c2<0){
                                        c2*=-1;
                                        const poliL = poli2[poli2.length - 1] < 0 ? (poli2[poli2.length - 1] * -1) : poli2[poli2.length - 1]; 
                                    
                                        if (c2 < poliL) {
                                            c2++;
                                        }
                                        
                                        /*else if (c2 > poli2[poli2.length - 1]) {
                                            c2 = poli2[poli2.length - 1];
                                        }*/   
                                    }else{
                                        c2*=-1;
                                        countB++;
                                        bandF=countB<3;
                                    }
                                } else if (poliAux.length === 1){
                                    bandF=false;
                                }else{ 
                                    xs.push(c2*-1);
                                    bandG=true;
                                    countB=0;
                                    StepsC += 1;
                                    str1 = strToLang("Paso") + StepsC.toString() + ": quad"
                                    str2 = strDevelopment
                                    //x=c2*-1;

                                    if (poliAux.length>2) {
                                        res = "(";
                                        let cAux = 0;
                                        let pw = poliAux.length-2;
                                        while (cAux < (poliAux.length - 2)){
                                            //if(pw>1){
                                                if (poliAux[cAux] === 1){
                                                    res += (aux1Char + (pw > 1 ? "^" + pw:""));
                                                } else if (poliAux[cAux] === -1) {
                                                    res += ("-" + aux1Char + (pw > 1 ? "^" + pw : ""));
                                                } else if (poliAux[cAux] > 1) {
                                                    res += ((cAux > 0 ? "+" : "") + poliAux[cAux] + (aux1Char + (pw > 1 ? "^" + pw : "")));
                                                } else if (poliAux[cAux] < -1) {
                                                    res += (poliAux[cAux] + (aux1Char + (pw > 1 ? "^" + pw : "")));
                                                }

                                                //res += (poliAux[cAux] === 1 ? (aux1Char + "^" + pw) : poliAux[cAux] + (aux1Char + "^" + pw)); 
                                           // }
                                            cAux++;
                                            pw--;
                                        }
                                        //res = "(" + (poliAux[0] === 1 ? aux1Char : poliAux[0] + aux1Char) + (poliAux[1] < 0 ? poliAux[1] : "+" + poliAux[1])+")"    
                                        res += (poliAux[cAux] < 0 ? poliAux[cAux] : "+" + poliAux[cAux]) + ")"
                                        
                                        if (xStr!==""){
                                            //str2 = prevStep
                                            console.log(`str2: ${str2}`);
                                        }
                                        x=xs[xs.length-1];
                                        prevStep = res
                                        res = xStr + res + "(" + aux1Char + (x < 0 ? x + ")" : '+' + x + ")");
                                        xStr += "(" + aux1Char + (x < 0 ? x + ")" : '+' + x + ")");
                                        if (prevFactor !== "") {
                                            res = prevFactor + "(" + res + ")";
                                           // prevFactor = "";
                                        }
                                    }else{
                                        STR = [];
                                        if(x===c2*-1){
                                            res = "(" + aux1Char + (x < 0 ? x + ")" : '+' + x + ")^2")
                                        }else{
                                            x=c2*-1;//other res 
                                            //res = "(x" + (x < 0 ? x + ")" : '+' + x + ")")
                                        }
                                        
                                    }
                                    
                                    StepLatex(str1, strDevelopment, str2, str3, res, change, true)
                                    str1 = "-> "
                                    str2 = "[ " + str2 + " ]"
                                    str1 = str1 + str2 + " = " + res
                                    Pstrltx(str1)
                                    strltx += "</div>"
                                    strltx += "</div>"

                                    if (poliArr[poliArr.length - 1] === c2){
                                        if (poliAux.length === 1 /*&& poliAux[0]===0*/){
                                            bandF=false;
                                        }else{
                                            c2 *= -1;  
                                        }
                                    }else{
                                        c2 = c2<0?c2*-1:c2
                                        if (c2 < poliAux[poliAux.length - 2]){
                                            c2++;
                                        } /*else if (c2 > poliAux[poliAux.length - 2]){
                                            c2 = poliAux[poliAux.length - 2];
                                        }*/
                                        /*if (0 > poliAux[poliAux.length - 2]){
                                            c2 = poliAux[poliAux.length - 2] * -1
                                        }*/
                                    }
                                    
                                    poli2 = poliAux.splice(0, poliAux.length-1);

                                    console.log(`c2: ${c2}`)
                                    console.log(`poli2: ${poli2}`)
                                }
                                
                            }

                            if (!bandG && poliArr.length > 2) {
                                //comprobate if a^2 + 2ab + b^2 = (a+b)^2
                                const a = Math.sqrt(poliArr[0]);
                                const b = Math.sqrt(poliArr[2]);
                                if ((2 * a * b) === poliArr[1]) {
                                    StepsC += 1;
                                    str1 = strToLang("Paso") + StepsC.toString() + ": quad"
                                    str2 = strDevelopment
                                    res = "(" + a + aux1Char + "+" + b + ")(" + a + aux1Char + "+" + b + ")";

                                    StepLatex(str1, strDevelopment, str2, str3, res, change, true)
                                    str1 = "-> "
                                    str2 = "[ " + str2 + " ]"
                                    str1 = str1 + str2 + " = " + res
                                    Pstrltx(str1)
                                    strltx += "</div>"
                                    strltx += "</div>"

                                    StepsC += 1;
                                    str1 = strToLang("Paso") + StepsC.toString() + ": quad"
                                    str2 = strDevelopment
                                    res = "(" + a + aux1Char + "+" + b + ")^2";

                                    StepLatex(str1, strDevelopment, str2, str3, res, change, true)
                                    str1 = "-> "
                                    str2 = "[ " + str2 + " ]"
                                    str1 = str1 + str2 + " = " + res
                                    Pstrltx(str1)
                                    strltx += "</div>"
                                    strltx += "</div>"

                                }
                            }
                            /*
                            console.log(`xs: ${xs}`)
                            StepsC += 1;
                            str1 = strToLang("Paso") + StepsC.toString() + ": quad";
                            str2 = strDevelopment;
                            c=0;
                            while(c<xs.length){

                            }
                            res = "(x" + (x < 0 ? x + ")" : '+' + x + ")");*/

                        }
                        S.push(res);
                        console.log(`pow ${auxStr}`);
                        console.log(`pow1 ${aux1Str}`);
                        
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