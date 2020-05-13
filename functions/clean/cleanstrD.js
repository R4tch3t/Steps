cleanstrD = (s) => {
    let previusUnichar = 0
    let changePolarid=false
    let str=s.split('')
    var s=""
    let OP=[]
    
    while (str.length>0) {
        var char = str.shift();
        var uniChar = char.charCodeAt(0)
        var nextUnichar = 0

        if (str.length>0) {
            // nextUnichar = (String(str.first!) as NSString).character(at: str.startIndex)
            nextUnichar = str[0].charCodeAt(0)
        }
        console.log(`char: ${char}`)
        console.log(`unichar: ${uniChar}`)
        console.log(`nextUnichar: ${nextUnichar}`)
        
        if ((uniChar > 47 && uniChar<58) || uniChar===46 || uniChar===120703) {//Si es numero
            if (previusUnichar === 41 || previusUnichar===120703) {
                s+=",*,"
                strDevelopment+="*"
            }

            if (uniChar===120703) {
                s+="pi"
                strDevelopment+="pi"
            }else{
                s+=char
                strDevelopment+=char
            }

            if (nextUnichar===120703) {
                s+=",*,"
                strDevelopment+="*"
            }

            if (nextUnichar === 40) {
                s+=",*"
                strDevelopment+="*"
            }
            
            
        }
        
        if (((uniChar > 36 && uniChar<46) || uniChar===47 || uniChar===94 || uniChar===183 || uniChar===215 || uniChar===8730 || uniChar===8901 || (uniChar>94 && uniChar<123)) && uniChar !== 44) {//Si es simbolo
            
            if (uniChar === 45 && ((nextUnichar > 47 && nextUnichar < 58) || nextUnichar===46 || nextUnichar===120703) && ((previusUnichar > 47 && previusUnichar < 58) || previusUnichar === 41 || previusUnichar===46 || previusUnichar===120703))  { //Si a - b= a + -b
                if(BSC){
                    s+=","+char+","
                    strDevelopment+=char
                }else{
                    s+=",+,"+char
                    strDevelopment+=char
                }
            }
            else if (uniChar === 45 && ((nextUnichar > 47 && nextUnichar < 58 || nextUnichar===46) && !((previusUnichar > 47 && previusUnichar < 58 || previusUnichar === 41 ) || previusUnichar===46) )) {//Si a -[.-+*()..]b
                s+=","+char
                strDevelopment+=char
            }else if (previusUnichar !== 44 && uniChar === 45 && nextUnichar === 40 && BSC){
                //+-*/()-(0-9[aA-zZ])
                char = str.shift()
                uniChar = char.charCodeAt(0)
                OP.push(char)
                
                if (str.length>0) {
                    nextUnichar = str[0].charCodeAt(0)
                }
                if (((previusUnichar > 47 && previusUnichar<58 || previusUnichar===46))||previusUnichar === 41) {
                    s+=",+,"
                    strDevelopment+="+"
                }
                s+=","+char+","
                strDevelopment+=char
                if ((nextUnichar > 47 && nextUnichar<58 || nextUnichar===46)){
                    s+="-"
                    strDevelopment+="-"
                }
                var numStr="";
                changePolarid=true
                while (OP.length>0 && str.length>0) {
                    previusUnichar=uniChar
                    char = str.shift()
                    uniChar = char.charCodeAt(0)
                    if (str.length>0) {
                        nextUnichar = str[0].charCodeAt(0)
                    }
                    if (uniChar === 45 && nextUnichar === 40) {
                        if (previusUnichar !== 42 && previusUnichar !== 215 && previusUnichar !== 47) {
                            changePolarid=false
                        }
                        else{
                            changePolarid=true
                        }
                    }
                    if (uniChar === 43 && nextUnichar === 40) {
                        changePolarid=true
                    }
                    
                    if ((uniChar === 47 || uniChar === 42 || uniChar === 215) && nextUnichar === 40) {
                        changePolarid=false
                    }
                    
                    if (uniChar === 40) {
                        OP.push(char)
                        
                        s+=","+char+","
                        strDevelopment+=char
                        
                        if ((nextUnichar > 47 && nextUnichar<58 || nextUnichar===46) && changePolarid){
                            s+="-"
                            strDevelopment+="-"
                        }
                        numStr=""
                    }else
                        if (uniChar === 41) {
                            OP.pop()
                            if (isNumber(numStr)) {
                                if (numStr.includes(".")) {
                                    s+=numStr+","
                                    strDevelopment+=numStr
                                }else{
                                    s+=numStr+","
                                    strDevelopment+=numStr
                                }
                                numStr=""
                            }
                            changePolarid=true
                            s+=","+char+","
                            strDevelopment+=char
                        }else if ((uniChar > 47 && uniChar<58 || uniChar===46)){
                            numStr+=char
                        }else if (uniChar === 43) {
                            if (isNumber(numStr)) {
                                if (numStr.includes(".")) {
                                    s+=numStr+","
                                    strDevelopment+=numStr
                                }else{
                                    s+=numStr+","
                                    strDevelopment+=numStr
                                }
                                numStr=""
                            }
                            if (nextUnichar === 40 || !changePolarid) {
                                s+="+,"
                                strDevelopment+="+"
                            }else{
                                s+="+,-"
                                strDevelopment+="-"
                            }
                        }
                        else if (uniChar === 45) {
                            if (isNumber(numStr)) {
                                if (numStr.includes(".")) {
                                    s+=numStr+","
                                    strDevelopment+=numStr
                                }else{
                                    s+=numStr+","
                                    strDevelopment+=numStr
                                }
                                numStr=""
                            }
                            if ((previusUnichar !== 42 && previusUnichar !== 215 && previusUnichar !== 47) && changePolarid) {
                                if (previusUnichar !== 40) {
                                    s+="+,"
                                    strDevelopment+="+"
                                }
                            }else{
                                if (nextUnichar !== 40){
                                    if  ((previusUnichar > 47 && previusUnichar<58 || previusUnichar===46) ){
                                        s+=",+,"
                                    }
                                    s+="-"
                                    strDevelopment+="-"
                                }else{
                                    if (previusUnichar !== 40 && previusUnichar !== 47 && previusUnichar !== 42 && previusUnichar !== 215) {
                                        s+="+,"
                                        strDevelopment+="+"
                                    }
                                    else if (previusUnichar === 47 || previusUnichar === 42) {
                                        //   changePolarid=false
                                        // s+="-,"
                                        // V.strDevelopment+="-"
                                    }
                                }
                            }
                            
                        }
                        else{
                            if (isNumber(numStr)) {
                                if (numStr.includes(".")) {
                                    s+=numStr+","
                                    strDevelopment+=numStr
                                }else{
                                    s+=numStr+","
                                    strDevelopment+=numStr
                                }
                                numStr=""
                            }
                            s+=","+char+","
                            strDevelopment+=char
                    }
                    
                }
                
                    
            } else if (uniChar>94 && uniChar<123) {
                if ((nextUnichar > 47 && nextUnichar < 58) || nextUnichar === 46) {
                    s += char + ","
                } else {
                    s += char
                }
                //s+=char
                strDevelopment+=char
            } else if (uniChar === 8730 && previusUnichar !== 41 && !(previusUnichar > 47 && previusUnichar < 58)) {
                //if (previusUnichar !== 41 && !(previusUnichar > 47 && previusUnichar < 58)){
                    s+="2,"+char+","
                    strDevelopment+="2"+char
                //} else if (BSC && previusUnichar !== 41) {
                    /*let changeUni = strDevelopment[strDevelopment.length - 1].charCodeAt(0)
                    let cn = strDevelopment.length - 2
                    let charsChang = ''
                    while (cn>0 && (changeUni > 47 && changeUni < 58 )) {
                        charsChang = strDevelopment[cn] + charsChang
                        changeUni = strDevelopment[cn].charCodeAt(0)
                        cn--
                    }
                    if (cn>0 && changeUni === 45) {
                        changeUni = strDevelopment[cn].charCodeAt(0)
                        if (changeUni !== 43) {
                            strDevelopment = strDevelopment.split(charsChang).join('+' + charsChang)
                        }
                    }
                    
                    s+=","+char+","
                    strDevelopment+=char
                }
                else{
                    s+=","+char+","
                    strDevelopment+=char
                }*/
            } else {
                s+=","+char+","
                strDevelopment+=char
            }
            
        }
        
        previusUnichar=uniChar
        
    }
    console.log(`cleanstrDs: ${s}`)
    console.log(`cleanstrDev: ${strDevelopment}`)
    return s
}