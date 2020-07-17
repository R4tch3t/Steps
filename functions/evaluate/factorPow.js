factorPow = (STR, S, OP) => {
     STR.pop();
     console.log(`STR factorPow^: ${STR}`);
     auxStr = S[S.length - 1] === undefined ? "+" : S.pop();
     aux1Str = S[S.length - 1] === undefined ? "+" : S.pop();
     auxChar = auxStr.match(/[A-Z]/gi);
     aux1Char = aux1Str.match(/[A-Z]/gi);
     if (aux1Char) {

         //factoring Ruffini poly's
         let c = 0;
         let c2 = 0;
         let poliArr = [];
         let poli2 = [];
         let xs = []
         let x = 0;
         let bandF = true;
         let bandG = false;
         let bandN = false;
         let xStr = "";
         let prevFactor = "";
         let charNumber = ' ';
         let minusFactor = '';
         let minPow = 1;
         let lastPow = 0;
         let aux1SStr = [aux1Str]
         STR = SumExpFactor(STR, auxStr, aux1SStr, aux1Char)
         aux1Str = aux1SStr[0]
         console.log(`STR ${STR}`)
         console.log(`aux1StrAft ${aux1SStr}`)
         console.log(`auxStr ${auxStr}`)
         //console.log(`aux1Char ${aux1Char}`)

         //STR=[]
         let mcdAux = aux1Str.split(aux1Char).join('');
         bandN = mcdAux.includes("-")

         //minus factoring -(f(x)) 
         if (bandN && FCT) {
             const minusArr = [] //.concat(STR)
             c = 0
             while (c < STR.length) {
                 charNumber = STR[c]
                 if (charNumber.includes("-")) {
                     charNumber = charNumber.split("-").join("+")
                 } else if (charNumber.includes("+")) {
                     //bandN = !charNumber.includes("+")
                     bandN = false
                     break;
                 }
                 //minusArr[c]=charNumber
                 minusArr.push(charNumber)
                 c++
             }
             if (bandN) {
                 aux1Str = aux1Str.split("-").join('');
                 console.log(`minusFactorLog: ${aux1Str}`)
                 minusFactor = "-"
                 STR = [].concat(minusArr)
                 StepsC += 1;
                 str1 = strToLang("Paso") + StepsC.toString() + ": quad"
                 str2 = strDevelopment
                 res = strDevelopment.split("-").join("+");
                 res = "-(" + res + ")"
                 //res = "(" + res
                 StepLatex(str1, strDevelopment, str2, str3, res, change, true)
                 str1 = "-> "
                 str2 = "[ " + str2 + " ]"
                 str1 = str1 + str2 + " = " + res
                 Pstrltx(str1)
                 strltx += "</div>"
                 strltx += "</div>"
             }
             console.log(`minusFactor: ${minusArr}`)
             c = 0
         }

         //maximo factor comun
         if (mcdAux === "" || mcdAux === "-") {
             mcdAux = 1;
         } else if (STR.length > 1) {
             mcdAux = parseInt(mcdAux);
             //STR = []
             console.log(`mcdAux ${mcdAux}`)
             if (STR[1].includes("x")) {
                 let strB = STR[1].split(aux1Char).join("")
                 if (strB === "" || strB === "-") {
                     strB = "1"
                 }
                 mcdAux = parseInt(MCDStr(mcdAux + "", strB));
             } else if (STR[1].includes("^")) {
                 if (STR[3].includes("x")) {
                     charNumber = STR[3].split(aux1Char).join("")
                     if (charNumber === "") {
                         charNumber = "1"
                     }
                     mcdAux = parseInt(MCDStr(mcdAux + "", charNumber));
                 } else {
                     mcdAux = 1
                 }
             }
             console.log(`mcdAux ${mcdAux}`)
         }

         charNumber = ' ';
         //factoring x's
         while (c < STR.length && (charNumber !== "" && charNumber !== "^")) {
             charNumber = parseInt(charNumber);
             if (charNumber >= 0 || charNumber < 0) {
                 break;
             }
             charNumber = STR[c].split(aux1Char).join('');
             //console.log(STR[c])
             //console.log(aux1Char)  
             if (STR[c] === ("" + aux1Char)) {
                 poliArr.push("1");
             } else if (STR[c].includes("" + aux1Char)) {

                 // poliArr.push(charNumber);
                 if ((parseInt(charNumber) % mcdAux) > 0) {
                     poliArr.push(charNumber);
                     bandF = false;
                 } else {
                     poliArr.push((parseInt(charNumber) / mcdAux) + "");
                     //bandG=true;
                 }
                 charNumber = "";
             } else if (STR[c] !== "^") {
                 poliArr.push(STR[c]);
             }
             //poliArr.push(STR[c].includes() ===  ? "1" : STR[c]);
             c++
         }

         console.log(`charNumber: ${charNumber}`)
         console.log(`poliArr: ${poliArr}`)

         //no contains constant, pure x's
         if ((charNumber === "" || charNumber === "^") && FCT) {

             console.log(`mcdAux: ${mcdAux}`)
             prevFactor = minusFactor + aux1Char
             //get minPow
             if (charNumber === "^") {
                 minPow = parseInt(STR[c]);

                 prevFactor = minusFactor + aux1Char + "^" + minPow;
                 c++;
                 charNumber = STR[c].split(aux1Char).join('');

                 if (charNumber === "") {
                     poliArr.push("1");
                 } else {
                     if (parseInt(charNumber) % mcdAux > 0) {
                         poliArr.push(charNumber);
                         bandF = false;
                     } else {
                         poliArr.push((parseInt(charNumber) / mcdAux) + "");
                     }
                     //bandF = parseInt()
                 }
                 c++;
                 charNumber = "";
             }
             console.log(`minPow ${minPow}`)
             console.log(`poliArr ${poliArr}`)
             console.log(STR)
             auxStr -= minPow;
             //poliArr.push(1);
             res = ""
             while (c < STR.length) {
                 if (charNumber === "^") {
                     const difPow = parseInt(STR[c]) - minPow
                     if (difPow > 1) {
                         poliArr.push(difPow);
                     } else {
                         poliArr.pop();
                     }
                 } else {
                     if ((STR[c] + "").includes(aux1Char)) {
                         charNumber = STR[c].split(aux1Char).join('');
                         if (charNumber === "") {
                             charNumber = "1"
                         }
                         console.log(`char%mcdAux:  ${parseInt(charNumber) % mcdAux}`)
                         if (parseInt(charNumber) % mcdAux > 0) {
                             //let iPoli = 0;
                             for (let i = 0; i < poliArr.length; i++) {
                                 const nPoli = parseInt(poliArr[i])
                                 if (nPoli > 0 || nPoli < 1) {
                                     poliArr[i] = (nPoli * mcdAux) + ""
                                 }
                                 //iPoli++;
                             }
                             mcdAux = 1
                             poliArr.push(charNumber);
                             bandF = false;
                         } else {
                             if ((parseInt(charNumber) / mcdAux) > 1) {
                                 if ((parseInt(STR[c - 1]) - minPow) > 0) {
                                     poliArr.push((parseInt(charNumber) / mcdAux) + aux1Char + "");
                                 } else {
                                     poliArr.push((parseInt(charNumber) / mcdAux) + "");
                                 }
                             } else {
                                 if (auxStr === 0) {
                                     poliArr.push("1");
                                 } else {
                                     poliArr.push(aux1Char + "");
                                 }
                             }
                         }
                     } else {
                         poliArr.push(STR[c]);
                     }

                     //                                       
                 }

                 charNumber = STR[c] //.split(aux1Char).join('');
                 c++
             }
             console.log(`poliArr: ${poliArr}`)
             //builded res
             c = 0;
             charNumber = "";
             //let sumFactor = [[],[]];
             //sumFactor[0]=[];
             //sumFactor[1]=[];
             while (c < poliArr.length) {
                 if (charNumber === "-") {
                     //res = "-" + poliArr[c] + res;       
                     if (poliArr[c] === "^") {
                         res = "-" + poliArr[c + 2] + poliArr[c] + poliArr[c + 1] + res;
                     } else {
                         res = "-" + poliArr[c] + res;
                         // sumFactor[1].push(parseInt(poliArr[c])*-1);
                     }
                 } else if (charNumber === "+") {
                     if (poliArr[c] === "^") {
                         res = "+" + poliArr[c + 2] + poliArr[c] + poliArr[c + 1] + res;
                     } else {
                         res = "+" + poliArr[c] + res;
                         //sumFactor[1].push(parseInt(poliArr[c]));
                     }
                 }
                 charNumber = poliArr[c];
                 c++;
             }
             if (auxStr > 1) {
                 if (bandF) {
                     if (mcdAux === 1) {

                         prevFactor = minusFactor + aux1Char;
                         aux1Str = aux1Str.split(aux1Char).join("");
                     } else {
                         prevFactor = minusFactor + mcdAux + "" + aux1Char;
                         aux1Str = (parseInt(aux1Str) / parseInt(mcdAux)) + "";
                     }

                     if (minPow > 1) {
                         prevFactor += "^" + minPow;
                     }
                     //prevFactor +=
                     console.log(`bandFRes: ${res} aux1Str: ${aux1Str} `)
                     if(aux1Str==="1"){
                         aux1Str=""
                     }
                     //if(!bandN){
                     res = prevFactor + "(" + aux1Str + aux1Char + "^" + auxStr + res + ")";
                     /*}else{
                         res = prevFactor + "(" + aux1Str + aux1Char + "^" + auxStr + res + ")";
                     }*/

                 } else {
                     res = prevFactor + "(" + aux1Str + "^" + auxStr + res + ")";
                 }

             } else {
                 if (bandF) {
                     prevFactor = minusFactor + (mcdAux === 1 ? "" : mcdAux) + "" + aux1Char;
                     if (minPow > 1) {
                         prevFactor += "^" + minPow;
                     }
                 }
                 console.log(`res: ${res} auxStr: ${auxStr}`)
                 if (auxStr === 0) {
                     //let resAux1 = parseInt(aux1Str.split(aux1Char).join(""))/mcdAux
                     let resAux1 = aux1Str.split(aux1Char).join("")
                     if (resAux1 === "") {
                         resAux1 = "1"
                     }
                     resAux1 = parseInt(resAux1) / mcdAux
                     console.log(`resAux1: ${resAux1}`)
                     //sumFactor[1].push(parseInt(resAux1));
                     //sumFactor[0].push("(" + resAux1 + res + ")");
                     res = prevFactor + "(" + resAux1 + res + ")";
                 } else {
                     charNumber = aux1Str.split(aux1Char).join("")
                     if ((parseInt(charNumber) / mcdAux) === 1) {
                         //charNumber = parseInt(charNumber) / mcdAux
                         res = prevFactor + "(" + aux1Char + res + ")";
                     } else {
                         //charNumber = parseInt(charNumber) / mcdAux
                         res = prevFactor + "(" + aux1Str + res + ")";
                     }
                 }
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
             /*if (auxStr === 0) {
                 StepsC += 1;
                 str1 = strToLang("Paso") + StepsC.toString() + ": quad"
                 str2 = sumFactor[0][0]
                 res = 0;
                 while(sumFactor[1].length){
                     res+=sumFactor[1].pop()
                 }
                 //res = "(" + res
                 StepLatex(str1, strDevelopment, str2, str3, "(" + res + ")", change, true)
                 str1 = "-> "
                 str2 = "[ " + str2 + " ]"
                 str1 = str1 + str2 + " = " + res
                 Pstrltx(str1)
                 strltx += "</div>"
                 strltx += "</div>"

                 StepsC += 1;
                 str1 = strToLang("Paso") + StepsC.toString() + ": quad"
                 str2 = strDevelopment
                 //res = 0;
                 console.log(`auxStr: ${auxStr}`)
                 const mulMcd = parseInt(mcdAux) * res
                 if (mulMcd > 1 || mulMcd < -1 ){
                     res = "" + mulMcd + "" + aux1Char + (minPow > 1 ? "^" + minPow : "")
                 } else if (mulMcd === -1){
                     res = "-" + aux1Char + (minPow > 1 ? "^" + minPow : "")
                 }else{
                     res = "" + aux1Char + (minPow > 1 ? "^" + minPow : "")
                 }
                 StepLatex(str1, strDevelopment, str2, str3, res, change, true)
                 str1 = "-> "
                 str2 = "[ " + str2 + " ]"
                 str1 = str1 + str2 + " = " + res
                 Pstrltx(str1)
                 strltx += "</div>"
                 strltx += "</div>"

             }*/
             //STR = [];
             console.log(`minPow: ${minPow}`);
             STR = poliArr.splice(0, poliArr.length);
             console.log(`pureXS: ${poliArr}`);
             console.log(`pureSTR: ${STR}`);
             console.log(`pureRes?: ${res}`);
         }
         if (prevFactor === "") {
             prevFactor = minusFactor + ""
         }


         poliArr = [];
         c = 2;
         charNumber = ''
         bandF = true;
         bandG = false;
         let divFactor = [];
         aux1Str = aux1Str.split(aux1Char).join('');
         console.log(`aux1Str: ${aux1Str}`);
         lastPow = parseInt(auxStr) - 1;
         if (aux1Str === "") {
             poliArr.push(1);
             poli2.push(1);
             c2 = 1;
             divFactor.push(1);
         } else if (aux1Str === "-") {
             poliArr.push(-1);
             poli2.push(-1);
             c2 = -1;
             divFactor.push(-1);
         } else {
             bandG = true;
             console.log(`a%b ${parseInt(aux1Str)%2}`);
             const divFAux = parseInt(aux1Str) < 0 ? parseInt(aux1Str) * -1 : parseInt(aux1Str)
             if ((divFAux % 2) === 0) {
                 const parseAux = divFAux;
                 if (parseAux === 2) {
                     divFactor.push(2);
                 }
                 while (c < parseAux) {
                     console.log((parseAux % c))
                     if ((parseAux % c) === 0) {
                         divFactor.push(c);
                     }
                     c++;
                 }
             } else if ((divFAux % 2) > 0 || (divFAux % 2) < 0) {
                 divFactor.push(1);
                 divFactor.push(divFAux);
             }
             c2 = 1 / divFactor[0];
             poliArr.push(parseInt(aux1Str));
             poli2.push(parseInt(aux1Str));
         }
         console.log(`divFactor: ${divFactor}`);
         c = STR.length - 1;
         //let nStr='';
         console.log(`STR: ${STR}`);
         console.log(`poliArr: ${poliArr}`);

         let lastNumber = '';
         while (c >= 0) {
             charNumber = (STR[c] + "").split(aux1Char).join('');
             console.log(STR[c] + " " + c + " " + charNumber)
             if (charNumber === "") {
                 poliArr.push(1);
                 poli2.push(1);
             } else if (charNumber !== "+" && charNumber !== "-" && charNumber !== "^") {

                 poliArr.push(parseInt(charNumber));
                 poli2.push(parseInt(charNumber));
             } else if (charNumber === "^") {
                 const nextPow = parseInt(poliArr.pop());
                 poli2.pop();
                 console.log(`lastPow === nextPow ${lastPow} ${nextPow}`)
                 if ((lastPow + 1) === nextPow) {
                     const a = parseInt(poliArr.pop());
                     const b = parseInt(poliArr.pop());
                     poli2.pop();
                     poli2.pop();
                     const suma = a + b
                     poliArr.push(suma)
                     poli2.push(suma)
                     StepsC += 1;
                     str1 = strToLang("Paso") + StepsC.toString() + ": quad"
                     str2 = "" + a + aux1Char + "^" + nextPow + "+" + b + aux1Char + "^" + nextPow
                     res = "" + suma + aux1Char + "^" + nextPow;

                     StepLatex(str1, strDevelopment, str2, str3, res, change, true)
                     str1 = "-> "
                     str2 = "[ " + str2 + " ]"
                     str1 = str1 + str2 + " = " + res
                     Pstrltx(str1)
                     strltx += "</div>"
                     strltx += "</div>"

                 }

                 while (lastPow > nextPow) {
                     console.log(`lastPow: ${lastPow}`);
                     poliArr.push(0)
                     lastPow--;
                 }
                 lastPow = nextPow - 1;
             } else if (charNumber === "-") {
                 const i = poliArr.length - 1
                 if (poliArr[i] > 0) {
                     poliArr[i] = poliArr[i] * -1;
                     poli2[i] = poli2[i] * -1;
                 } else {
                     if (poliArr[i - 1] > 0) {
                         poliArr[i - 1] = poliArr[i - 1] * -1;
                         poli2[i - 1] = poli2[i - 1] * -1;
                     }
                 }
             }

             //prevNumber=   
             c -= 1;
         }
         console.log(`lastPow: ${lastPow}`)
         console.log(`auxStr: ${auxStr}`)
         console.log(`poliArrBef ${poliArr}`);
         //if (lastPow>0&&(lastPow + 1) === parseInt(auxStr)) {
         if ((poliArr.length - 1) < parseInt(auxStr) && (lastPow + 1) === parseInt(auxStr)) {
             const poliArrAux = [];
             poliArrAux.push(poliArr[0]);
             while (lastPow > 0) {
                 poliArrAux.push(0);
                 lastPow--;
             }
             poliArrAux.push(poliArr[poliArr.length - 1]);
             poliArr = [].concat(poliArrAux);
             poli2 = [].concat(poliArr);
             //poli2.concat(poliArr);
         }
         console.log(`poliArr ${poliArr}`);
         //c2 = poliArr[poliArr.length-1];

         /*while(c2>1){
             c2--;
         }*/
         let countB = 0;
         let countC = 0;
         // let countI = 0;
         let divisor = 1;
         bandF = divFactor.length > 0 && lastPow < 2;
         /*if (lastPow>1){
             bandF = false;
             res = str;
             console.log(`res: ${res}`)
         }*/

         while (bandF) {
             // bandF = c2 !== -1
             c = 1;
             const poliAux = [poliArr[0]]
             while (c < poli2.length) {
                 const a = poli2[c];
                 poliAux.push(c2 * poliAux[c - 1] + a);
                 c++;
             }
             console.log(`poliAux: ${poliAux}`)
             console.log(`c22: ${c2}`)
             console.log(`poliArr ${poliArr}`);
             console.log(`poli2 ${poli2}`);
             console.log(`divFactor[countC]: ${divFactor}`)
             console.log(`divisor: ${divisor}`)
             if ( /*(poliAux[poliAux.length - 1] > 0 || poliAux[poliAux.length - 1] < 0)*/
                 poliAux[poliAux.length - 1] !== 0 && poliAux.length > 1) {
                 if (c2 < 0) {
                     c2 *= -1;
                     const poliL = poli2[poli2.length - 1] < 0 ? (poli2[poli2.length - 1] * -1) : poli2[poli2.length - 1];

                     if (c2 < poliL) {

                         if (bandG) {
                             if (countC < divFactor.length - 1) {
                                 countC++;
                             } else {
                                 countC = 0;
                                 if (poliArr[poliArr.length - 1] < divisor) {
                                     divisor++;
                                 } else {
                                     countB++;
                                 }
                             }
                             c2 = divisor / divFactor[countC];
                         } else {
                             c2++;
                         }

                     } else {
                         c2 = 1;
                         countB++;
                     }

                     /*else if (c2 > poli2[poli2.length - 1]) {
                         c2 = poli2[poli2.length - 1];
                     }*/
                 } else {
                     c2 *= -1;
                     // countB++;
                     bandF = countB < 3;
                 }
             } else if (poliAux.length === 1) {
                 bandF = false;
             } else {
                 console.log(`afTPushc2: ${c2}`)
                 xs.push(c2 * -1);
                 // bandG=true;
                 countB = 0;
                 StepsC += 1;
                 str1 = strToLang("Paso") + StepsC.toString() + ": quad"
                 str2 = strDevelopment
                 //x=c2*-1;

                 if (poliAux.length > 2) {
                     res = "(";
                     let cAux = 0;
                     let pw = poliAux.length - 2;
                     x = xs[xs.length - 1];
                     while (cAux < (poliAux.length - 2)) {
                         //if(pw>1){
                         if (poliAux[cAux] === 1) {
                             res += (aux1Char + (pw > 1 ? "^" + pw : ""));
                         } else if (poliAux[cAux] === -1) {
                             res += ("-" + aux1Char + (pw > 1 ? "^" + pw : ""));
                         } else if (poliAux[cAux] > 1) {
                             if (bandG) {
                                 res += ((cAux > 0 ? "+" : "") + (poliAux[cAux] * x) + (aux1Char + (pw > 1 ? "^" + pw : "")));
                             } else {
                                 res += ((cAux > 0 ? "+" : "") + (poliAux[cAux]) + (aux1Char + (pw > 1 ? "^" + pw : "")));
                             }
                         } else if (poliAux[cAux] < -1) {
                             if (bandG) {
                                 res += ((poliAux[cAux] * x) + (aux1Char + (pw > 1 ? "^" + pw : "")));
                             } else {
                                 res += ((poliAux[cAux]) + (aux1Char + (pw > 1 ? "^" + pw : "")));
                             }
                         }

                         //res += (poliAux[cAux] === 1 ? (aux1Char + "^" + pw) : poliAux[cAux] + (aux1Char + "^" + pw)); 
                         // }
                         cAux++;
                         pw--;
                     }
                     //console.log(`resFactoring: ${res} auxChar: ${aux1Char} `);
                     res = res.split("1x").join("x");
                     //res = "(" + (poliAux[0] === 1 ? aux1Char : poliAux[0] + aux1Char) + (poliAux[1] < 0 ? poliAux[1] : "+" + poliAux[1])+")"    
                     if (bandG) {
                         res += (poliAux[cAux] < 0 ? (poliAux[cAux] * x) : "+" + (poliAux[cAux] * x)) + ")"
                     } else {
                         res += (poliAux[cAux] < 0 ? (poliAux[cAux]) : "+" + (poliAux[cAux])) + ")"
                     }
                     if (xStr !== "") {
                         //str2 = prevStep
                         console.log(`str2: ${str2}`);
                     }

                     // prevStep = res
                     if (bandG) {
                         if (divFactor[countC] === 1) {
                             res = xStr + "(" + aux1Char + (x < 0 ? divisor + ")" : '+' + divisor + ")") + res;
                             xStr += "(" + aux1Char + (x < 0 ? divisor + ")" : '+' + divisor + ")");
                         } else {
                             res = xStr + "(" + divFactor[countC] + aux1Char + (x < 0 ? divisor + ")" : '+' + divisor + ")") + res;
                             xStr += "(" + divFactor[countC] + aux1Char + (x < 0 ? divisor + ")" : '+' + divisor + ")");
                         }

                     } else {
                         res = xStr + "(" + aux1Char + (x < 0 ? x + ")" : '+' + x + ")") + res;
                         xStr += "(" + aux1Char + (x < 0 ? x + ")" : '+' + x + ")");
                     }
                     if (prevFactor !== "") {
                         res = prevFactor + "(" + res + ")";
                         // prevFactor = "";
                     }
                     if (poliAux.length === 3) {
                         STR = [];
                     }

                 } else {
                     let xPows = 1;
                     let c3 = 0;
                     let prevC = "";
                     xs = xs.sort();
                     console.log(`xs: ${xs}`)
                     while (c3 < xs.length) {
                         if (xs[c3] === prevC) {
                             xPows++;
                         }
                         if (xs[c3] !== prevC || c3 === (xs.length - 1)) {
                             if (xPows > 1) {
                                 const auxX = xs[c3 - 1];
                                 let fPow = "";
                                 let sPow = "";
                                 let c4 = 0;
                                 if (bandG) {
                                     sPow = "(" + divFactor[countC] + aux1Char + (auxX < 0 ? divisor : "+" + divisor) + ")";
                                 } else {
                                     sPow = "(" + aux1Char + (auxX < 0 ? auxX : "+" + auxX) + ")";
                                 }
                                 //xPows--;
                                 while (c4 < xPows) {
                                     fPow += sPow
                                     c4++;
                                 }
                                 //xPows++;
                                 console.log(`fPow: ${fPow}`);
                                 console.log(`fSplit: ${res.split(sPow)}`);
                                 const resSplit = res.split(sPow)
                                 if (resSplit.length > 2) {
                                     res = resSplit.join("");
                                     res = sPow + "^" + xPows + res;
                                     if (prevFactor !== "") {
                                         res = res.split(sPow + "^" + xPows + prevFactor + "(").join(prevFactor + "(" + sPow + "^" + xPows);
                                     }
                                 }
                                 //res = res.split(fPow).join(sPow + "^" + xPows);
                                 xPows = 1;
                             }
                         }
                         prevC = xs[c3];
                         c3++;
                     }
                     console.log(`xPows: ${xPows}`);
                     console.log(`xs: ${xs}`);
                     //if(x===c2*-1){
                     /*if (xPows>1){
                        // res = "(" + aux1Char + (x < 0 ? x + ")" : '+' + x + ")^" + xPows);
                        */
                     if (prevFactor !== "") {
                         //  res = prevFactor + "(" + res + ")";
                         // prevFactor = "";
                     }
                     /*}else{
                         x=c2*-1;//other res 
                         //res = "(x" + (x < 0 ? x + ")" : '+' + x + ")")
                     }*/

                 }

                 StepLatex(str1, strDevelopment, str2, str3, res, change, true)
                 str1 = "-> "
                 str2 = "[ " + str2 + " ]"
                 str1 = str1 + str2 + " = " + res
                 Pstrltx(str1)
                 strltx += "</div>"
                 strltx += "</div>"

                 if (poliArr[poliArr.length - 1] === c2) {
                     if (poliAux.length === 1 /*&& poliAux[0]===0*/ ) {
                         bandF = false;
                     } else {
                         c2 *= -1;
                     }
                 } else {
                     c2 = c2 < 0 ? c2 * -1 : c2
                     if (bandG) {
                         if (countC < divFactor.length - 1) {
                             countC++;
                         } else {
                             countC = 0;
                             if (poliArr[poliArr.length - 1] < divisor) {
                                 divisor++;
                             }
                         }
                         c2 = divisor / divFactor[countC];
                     } else {
                         if (c2 < poliAux[poliAux.length - 2]) {
                             c2++;
                         } else if (c2 > poliAux[poliAux.length - 2]) {
                             c2 = poliAux[poliAux.length - 2];
                         }
                     }

                     /*if (0 > poliAux[poliAux.length - 2]){
                         c2 = poliAux[poliAux.length - 2] * -1
                     }*/
                 }

                 poli2 = poliAux.splice(0, poliAux.length - 1);

                 console.log(`c2: ${c2}`)
                 console.log(`poli2: ${poli2}`)
             }

         }
         console.log(`resLast: ${res}`);
         console.log(`STRLast: ${STR}`);

         /* if (!bandG && poliArr.length > 2) {
              //comprobate if a^2 + 2ab + b^2 = (a+b)^2
              const a = Math.sqrt(poliArr[0]);
              const b = Math.sqrt(poliArr[2]);
              if ((2 * a * b) === poliArr[1]) {
                  STR = [];
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
          }*/
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
}