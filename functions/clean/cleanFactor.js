genStepsSumFactor = (STRR, factorStack, lastMCD, aux1Char, lastPow, maxPow) => {
    if (factorStack.length < 2) {
        return
    }
    StepsC += 1;
    str1 = strToLang("Paso") + StepsC.toString() + ": quad"
    //const sign = STR[STR.length - 1]

    //const factorMCD = factorStack[factorStack.length-1]
    let baseFactor = (lastMCD > 1 ? lastMCD : "") + "" + aux1Char
    let factorSTR = ""
    //str2 = factorSTR
    let str2Aux = aux1Char
    if (lastPow > 1) {
        baseFactor += "^" + lastPow
        str2Aux += "^" + lastPow
    }
    let sumFactor = 0
    //factorSTR = factorSTR + "("
    //factorSTR = "("
    str2 = ""
    while (factorStack.length > 1) {
        const f = factorStack.pop()
        const fbyMCD = f[0] * lastMCD
        if (f[1] === "-") {
            sumFactor -= f[0]
        } else {
            sumFactor += f[0]
        }
        factorSTR = "" + f[1] + f[0] + factorSTR
        str2 = "" + f[1] + ((fbyMCD > 1 || fbyMCD < -1) ? fbyMCD : ((aux1Char === "") ? fbyMCD : "")) + str2Aux + str2
    }
    const f = factorStack.pop()
    const fbyMCD = f * lastMCD
    factorSTR = "(" + f + factorSTR + ")"
    if (aux1Char === "") {
        str2 = "" + fbyMCD + str2Aux + str2
    } else {
        str2 = (fbyMCD > 1 || fbyMCD < -1 ? fbyMCD : fbyMCD === -1 ? "-" : "") + str2Aux + str2
    }
    sumFactor += f
    res = (fbyMCD < 0 /*&&lastPow===1*/ ? "+" : "") + baseFactor + factorSTR;
    //res += sumFactor[1].pop()

    //res = "(" + res
    StepLatex(str1, strDevelopment, str2, str3, res, change, true)
    str1 = "-> "
    str2 = "[ " + str2 + " ]"
    str1 = str1 + str2 + " = " + res
    Pstrltx(str1)
    strltx += "</div>"
    strltx += "</div>"

    StepsC += 1;
    str1 = strToLang("Paso") + StepsC.toString() + ": quad"
    //const sign = STR[STR.length - 1]

    str2 = "" + factorSTR

    res = "(" + sumFactor + ")";
    //res += sumFactor[1].pop()

    //res = "(" + res
    StepLatex(str1, strDevelopment, str2, str3, res, change, true)
    str1 = "-> "
    str2 = "[ " + str2 + " ]"
    str1 = str1 + str2 + " = " + res
    Pstrltx(str1)
    strltx += "</div>"
    strltx += "</div>"

    StepsC += 1;
    str1 = strToLang("Paso") + StepsC.toString() + ": quad"
    //const sign = STR[STR.length - 1]

    str2 = baseFactor + "" + res
    const mulFactor = (sumFactor * lastMCD)
    const appendRes = ((mulFactor > 1 || mulFactor < -1 || mulFactor === 0) ? mulFactor : (mulFactor === -1) ? (aux1Char === "" ? mulFactor : "-") : (aux1Char === "" ? mulFactor : "")) + aux1Char + ""
    res = "" + appendRes
    if (lastPow > 1) {
        res += "^" + lastPow;
    }

    if (lastPow === maxPow) {
        STRR.push(appendRes /*.split("-").join("")*/ )
    } else {
        STRR.push(appendRes.split("-").join(""))
    }

    if (lastPow > 1) {
        STRR.push(lastPow + "")
        STRR.push("^")
    } //else{
    STRR.push(mulFactor < 0 ? "-" : "+")
    //}
    //res += sumFactor[1].pop()

    //res = "(" + res
    StepLatex(str1, strDevelopment, str2, str3, res, change, true)
    str1 = "-> "
    str2 = "[ " + str2 + " ]"
    str1 = str1 + str2 + " = " + res
    Pstrltx(str1)
    strltx += "</div>"
    strltx += "</div>"
}

SumExpFactor = (STR, auxStr, aux1SStr, aux1Char) => {
    var STR = STR
    let bandEnd = false
    let STRR = []
    let OPR = []
    let lastPow = parseInt(auxStr)
    const maxPow = parseInt(auxStr)
    //let lastB = parseInt(aux1Str)
    let aux1Str = aux1SStr[0]
    let lastB = aux1Str.split(aux1Char).join("")
    if (lastB === "") {
        lastB = 1
    } else if (lastB === "-") {
        lastB = -1
    } else {
        lastB = parseInt(lastB)
    }
    let lastMCD = lastB < 0 ? lastB * -1 : lastB
    const factorStack = []
    //console.log("lastB % lastMCD: " + lastB % lastMCD)
    //console.log("lastB: " + aux1Str)
    if (STR[STR.length - 3] === "^" && STR[STR.length - 2] === auxStr) {
        if (lastB % lastMCD > 0) {
            factorStack.push(lastB)
        } else {
            factorStack.push(lastB / lastMCD)
        }
    }
    console.log("factorS: " + factorStack)
    while (STR.length) {
        switch (STR[STR.length - 1]) {
            case "-":
            case "+":
                const sign = STR.pop()
                let a = OPR.length > 0 ? OPR.pop() : null
                let b = OPR.length > 0 ? OPR.pop() : null
                console.log(`+a: ${a}`)
                console.log(`+b: ${b}`)
                //console.log(`STR.length: ${STR.length}`)
                //console.log(`STR.length: ${factorStack.length}`)
                if (STR.length === 0 && bandEnd) {
                    if (FCT) {
                        genStepsSumFactor(STRR, factorStack, lastMCD, aux1Char, lastPow, maxPow)
                    }
                    console.log(`STRR: ${STRR}`)
                    /*if(STRR[2]==="^"){
                        aux1SStr[0]=STRR.shift()+""
                        STRR.shift()
                        STRR.shift()
                    }*/
                    //STRR.push(lastB+aux1Char)
                } else if (STR.length === 0 && !bandEnd) {
                    console.log(`STRR: ${STRR}`)

                }
                bandEnd = false
                if (a !== null) {
                    let auxA = (a + "")
                    if (!factorStack.length && STR.length) {
                        if (STR[STR.length - 1].includes(aux1Char)) {
                            auxA = auxA.split(aux1Char).join("")
                            if (auxA === "") {
                                auxA = "1"
                            }
                            if (sign === "-") {
                                auxA = "-" + auxA
                            }
                            auxA = parseInt(auxA)
                            lastB = auxA
                            lastMCD = lastB
                            if (lastMCD < 0) {
                                lastMCD = lastMCD * -1
                            }
                            lastPow = 1
                            factorStack.push(lastB / lastMCD)

                        } else {
                            /*if (STR.length<3){
                                STRR.push(a)
                                STRR.push(sign)
                            }else{
                                auxA = auxA.split(aux1Char).join("")
                                if (auxA === "") {
                                    auxA = "1"
                                }*/
                            //aux1Char=""
                            //auxA = auxA.split(aux1Char).join("")
                            if (auxA.includes(aux1Char)) {
                                console.log(`factorStackLength: ${factorStack}`)
                                if (STR.length > 1) {
                                    //genStepsSumFactor(STRR, factorStack, lastMCD, aux1Char, lastPow)

                                    if (STR.length === 2) {
                                        console.log(`STRR: ${STRR}`)
                                        /*if (STRR[2] === "^") {
                                            aux1SStr[0] = STRR.shift() + ""
                                            STRR.shift()
                                            STRR.shift()
                                        }*/
                                    }
                                    if (!factorStack.length) {
                                        STRR.push(auxA)
                                        STRR.push(sign)
                                    }
                                }
                            } else {
                                if (sign === "-") {
                                    auxA = parseInt(auxA) * -1
                                } else {
                                    auxA = parseInt(auxA)
                                }
                                lastB = auxA
                                lastMCD = lastB
                                if (lastMCD < 0) {
                                    lastMCD = lastMCD * -1
                                }
                                lastPow = 1
                                factorStack.push(lastB / lastMCD)
                                
                            }


                            //}
                        }
                        /**/
                    } else {
                        
                        if (auxA.includes(aux1Char)) {
                            auxA = auxA.split(aux1Char).join("")
                            if (auxA === "") {
                                auxA = "1"
                            }
                            auxA = parseInt(auxA)
                            if (factorStack.length) {
                                if (auxA % lastMCD > 0) {
                                    factorStack[0] = (factorStack[0] * lastMCD)
                                    for (let i = 1; i < factorStack.length; i++) {
                                        console.log(factorStack[i])
                                        factorStack[i] = [(factorStack[i][0] * lastMCD), factorStack[i][1]]
                                    }
                                    lastMCD = 1
                                    factorStack.push([auxA, sign])
                                } else {
                                    factorStack.push([(auxA / lastMCD), sign])
                                }
                            }
                            //factorStack.push([auxA,"+"])
                            console.log(`auxA.includes(aux1Char): ${factorStack}`)
                            if (STR.length > 1) {
                                const nextNum = STR[STR.length - 1]
                                if (!nextNum.includes(aux1Char)) {
                                    genStepsSumFactor(STRR, factorStack, lastMCD, aux1Char, lastPow, maxPow)

                                    if (STR.length === 2) {
                                        /*if (STRR[2] === "^") {
                                            aux1SStr[0] = STRR.shift() + ""
                                            STRR.shift()
                                            STRR.shift()
                                        }*/
                                        STRR.push(STR.pop())
                                        STRR.push(STR.pop())
                                    }
                                }
                            } else if (STR.length === 0) {
                                if (factorStack.length > 1) {
                                    genStepsSumFactor(STRR, factorStack, lastMCD, aux1Char, lastPow, maxPow)
                                } else {
                                    while (factorStack.length) {
                                        factorStack.pop()
                                    }
                                    STRR.push(a + "")
                                    STRR.push(sign)
                                }
                            }
                        } else {
                            console.log(`noIncludes`)
                            /*if (STR.length === 0) {
                                genStepsSumFactor(STRR, factorStack, lastMCD, aux1Char, lastPow)
                                if (aux1Char!==""){
                                    STRR.push(a)
                                    STRR.push(sign)
                                }
                            }else{*/
                            console.log(`nextSTR: ${factorStack}`)
                            //aux1Char = ""
                            auxA = parseInt(auxA)
                            if (!factorStack.length) {
                                lastMCD = auxA < 0 ? auxA * -1 : auxA
                            }
                            if (auxA % lastMCD > 0) {
                                factorStack[0] = (factorStack[0] * lastMCD)
                                for (let i = 1; i < factorStack.length; i++) {
                                    console.log(factorStack[i])
                                    factorStack[i] = [(factorStack[i][0] * lastMCD), factorStack[i][1]]
                                }
                                lastMCD = 1
                                factorStack.push([auxA, sign])
                            } else {
                                factorStack.push([(auxA / lastMCD), sign])
                            }
                            console.log(`sign: ${sign}`)
                            console.log(`lastFactorS: ${factorStack}`)
                            //}
                            if (STR.length === 0) {
                                if (FCT) {
                                    genStepsSumFactor(STRR, factorStack, lastMCD, "", lastPow, maxPow)
                                    /*if (STRR[2] === "^") {
                                        aux1SStr[0] = STRR.shift() + ""
                                        STRR.shift()
                                        STRR.shift()
                                    }*/
                                    if (factorStack.length === 1) {
                                        const f = factorStack.pop()
                                        STRR.push((f[0] * lastMCD) + "")
                                        STRR.push(f[1])

                                    }
                                    //STRR.push(sign)
                                }
                            }
                        }
                        if (STR.length === 0) {
                            if (FCT) {
                                genStepsSumFactor(STRR, factorStack, lastMCD, aux1Char, lastPow, maxPow)
                                //STRR.push(sign)
                            }
                        }
                    }
                }
                break;
            case "^":
                STR.pop()
                a = parseInt(OPR.pop())
                b = OPR.pop().split(aux1Char).join("")
                if (b === "") {
                    b = "1"
                }
                b = parseInt(b)
                console.log(`a: ${a} b: ${b}`)
                if (lastPow === null) {
                    lastPow = a
                } else if (lastPow !== a) {
                    if (!FCT) {
                        STRR.push(lastB)
                        lastB += b
                    } else {
                        if (factorStack.length) {
                            genStepsSumFactor(STRR, factorStack, lastMCD, aux1Char, lastPow, maxPow)
                        }
                        
                        lastPow = a
                        lastB = b
                        if (STR[STR.length - 1] === "-") {
                            lastB = lastB * -1
                        }
                        lastMCD = lastB < 0 ? lastB * -1 : lastB
                        //if (lastB % lastMCD > 0) {
                        factorStack.push(lastB / lastMCD)
                        console.log(`STR[STR.length-4 ${STR[STR.length-4]}`)
                        if(STR[STR.length-4]==="^"){
                            if ((STR[STR.length - 3]+"") === ((lastPow-1)+"")) {
                                factorStack.pop()
                                STRR.push(b+""+aux1Char)
                                STRR.push(lastPow)
                                STRR.push(`^`)
                                STRR.push(STR[STR.length - 1])
                            }
                        }
                        console.log(`facotrStack !!??lastPow: ${factorStack}`)
                        //if(STR[STR.length-3]==="")
                        /*} else {
                            factorStack.push(lastB / lastMCD)
                        }*/

                        /*STR.push("^")
                        OPR.push(b+"")
                        OPR.push(a+"")*/
                    }
                } else {
                    if (!FCT) {
                        StepsC += 1;
                        str1 = strToLang("Paso") + StepsC.toString() + ": quad"
                        const sign = STR[STR.length - 1]
                        str2 = lastB + "" + aux1Char + "^" + lastPow + sign + b + "" + aux1Char + "^" + lastPow
                        if (sign === "+") {
                            lastB += b
                        } else if (sign === "-") {
                            lastB -= b
                        }

                        res = lastB + "" + aux1Char + "^" + lastPow;
                        //res += sumFactor[1].pop()

                        //res = "(" + res
                        StepLatex(str1, strDevelopment, str2, str3, res, change, true)
                        str1 = "-> "
                        str2 = "[ " + str2 + " ]"
                        str1 = str1 + str2 + " = " + res
                        Pstrltx(str1)
                        strltx += "</div>"
                        strltx += "</div>"
                    } else {
                        const sign = STR[STR.length - 1]
                        if (b % lastMCD > 0) {
                            factorStack[0] = (factorStack[0] * lastMCD)
                            for (let i = 1; i < factorStack.length; i++) {
                                console.log(factorStack[i])
                                factorStack[i] = [(factorStack[i][0] * lastMCD), factorStack[i][1]]
                            }
                            lastMCD = 1
                            factorStack.push([b, sign])
                        } else {
                            factorStack.push([(b / lastMCD), sign])
                        }
                    }
                }
                bandEnd = true
                if (STR[STR.length - 3] === "+" || STR[STR.length - 3] === "-") {
                    if (!FCT) {
                        STRR.push(lastB + aux1Char)
                        STRR.push(lastPow + "")
                        STRR.push("^")
                    } else {
                        if (factorStack.length === 1) {
                            STRR.push(b + "" + aux1Char)
                            STRR.push(a + "")
                            STRR.push("^")
                            if (STR[STR.length - 1] === "+" || STR[STR.length - 1] === "-") {
                                STRR.push(STR[STR.length - 1])
                            }
                            factorStack.pop()
                            console.log(`factorStackL^^: ${factorStack}`)
                        } else {
                            genStepsSumFactor(STRR, factorStack, lastMCD, aux1Char, lastPow, maxPow)
                        }
                    }
                }
                break;
            default:
                OPR.push(STR.pop())
        }
    }
    console.log(STRR)
    if (STRR[2] === "^" && (STRR[1] + "") === (maxPow + "")) {
        aux1SStr[0] = STRR.shift() + ""
        STRR.shift()
        STRR.shift()
    }
    //console.log(aux1Char)
    return STRR.reverse()
}