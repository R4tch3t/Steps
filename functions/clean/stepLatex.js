removeAt=(str, char_pos) => {
    part1 = str.substring(0, char_pos);
    part2 = str.substring(char_pos + 1, str.length);
    return (part1 + part2);
}
StepLatex=(str1, str2, rstr, rstr2, res, change, band)=>{
        //let rstr=rstr
        //let rstr2=rstr2
        let tofrac=""
        let  i=0, j=rstr.length, k=str2.length, l=0, straux=""
        //var strArr=Array(str2.cString(using: String.Encoding.ascii)!)
        let strArr=str2.split('');

        var OP=[];
        if (band) {
            strltx+="<div class='card' style='background: transparent' >"
            strltx+="<div class='card-body' style='background: transparent' >"
            strltx+="<p>`"+str1+"`"
        }

        strDevelopment=""

        while (l<=k-j) {
            if ((strArr[l] === "-" && strArr[l+1] === "(" /*&& RM*/) || strArr[l] === "(" /*&& IM*/){
                OP.push("(")
            }


            if (strArr[l] === ")") {
                OP.pop()
            }

            straux=""
            i=0
            while (i<j) {
                straux += strArr[i+l]
                i+=1
            }

            if (straux === rstr) {

                if (!isEqualAfter(strArr, l+j, j, k,rstr,OP))  {
                    let re = new RegExp('inf', 'gi');
                    rstr = rstr.replace(re, '(inf)');
                    rstr2 = rstr2.replace(re, '(inf)');
                    re = new RegExp('nan', 'gi');
                    rstr = rstr.replace(re, '(nan)');
                    rstr2 = rstr2.replace(re, '(nan)');

                    if (rstr.includes("c") || rstr2.includes("c")) {
                        re = new RegExp('c', 'g');
                        rstr = rstr.replace(re, 'C O S(')+')';
                        rstr2 = rstr2.replace(re, 'C O S(')+')';
                    }

                    if (rstr.includes("s") || rstr2.includes("s")) {
                        re = new RegExp('s', 'g');
                        rstr = rstr.replace(re, 'S E N(') + ')';
                        rstr2 = rstr2.replace(re, 'S E N(') + ')';
                    }

                    if(rstr.contains("t") || rstr2.contains("t")){
                        re = new RegExp('t', 'g');
                        rstr = rstr.replace(re, 'T A N(') + ')';
                        rstr2 = rstr2.replace(re, 'T A N(') + ')';
                    }

                    if (l>0) {

                        if (strArr[l-1]==="(") {
                            if (l<(k-j)) {
                                if (strArr[l+j]===")") {
                                    strArr.splice(l - 1,1)
                                }
                                else{
                                    i=0
                                    if (band) {
                                        strltx+="`"
                                    }
                                    tofrac=""
                                    while (i<l) {
                                        tofrac+=strArr[i]
                                        strDevelopment+=strArr[i]
                                        i+=1
                                    }

                                    strDevelopment+=res

                                    //Intercambio rstr
                                    tofrac=replacestrs(tofrac)
                                    if (change) {

                                        if (toDecimalVal === 1) {
                                            if (band) {
                                                strltx+=tofrac
                                                strltx+="color(red)("+rstr2+")"
                                            }

                                        }else{
                                            if (band) {
                                                strltx+=scanNumbers(tofrac,false)
                                                strltx+="color(red)("+scanNumbers(rstr2,false)+")"
                                            }
                                        }

                                    }else{
                                        if (toDecimalVal === 1) {
                                            if (band) {
                                                strltx+=tofrac
                                                strltx+="color(red)("+rstr+")"
                                            }
                                        }else{
                                            if (band) {
                                                strltx+=scanNumbers(tofrac,false)
                                                strltx+="color(red)("+scanNumbers(rstr,false)+")"
                                            }

                                        }

                                    }

                                    i+=j
                                    tofrac=""
                                    while (i<k) {
                                        tofrac+=strArr[i]
                                        strDevelopment+=strArr[i]
                                        i+=1
                                    }

                                    tofrac=replacestrs(tofrac)

                                    if (toDecimalVal === 1) {
                                        if (band) {
                                            strltx+=tofrac
                                        }
                                    }else{
                                        if (band) {
                                            strltx+=scanNumbers(tofrac,false)
                                        }
                                    }
                                    if (band) {
                                        strltx+="`</p>"
                                    }

                                }

                            } else
                            {

                                i=0
                                tofrac=""
                                if (band) {
                                    strltx+="`"
                                }
                                while (i<l) {
                                    tofrac+=strArr[i]
                                    strDevelopment+=strArr[i]
                                    i+=1
                                }

                                strDevelopment+=res
                                tofrac=replacestrs(tofrac)
                                if (change) {
                                    if (toDecimalVal === 1) {
                                        if (band) {
                                            strltx+=tofrac
                                            strltx+="color(red)(("+rstr2+"))"
                                        }
                                    }else{
                                        if (band) {
                                            strltx+=scanNumbers(tofrac,false)
                                            strltx+="color(red)(("+scanNumbers(rstr2,true)+"))"
                                        }
                                    }
                                }else{
                                    if (toDecimalVal === 1) {
                                        if (band) {
                                            strltx+=tofrac
                                            strltx+="color(red)(("+rstr+"))"
                                        }
                                    }else{
                                        if (band) {
                                            strltx+=scanNumbers(tofrac,false)
                                            strltx+="color(red)(("+scanNumbers(rstr,true)+"))"
                                        }
                                    }
                                }

                                i=l+j
                                tofrac=""
                                while (i<k) {
                                    strDevelopment+=strArr[i]
                                    tofrac+=strArr[i]
                                    i+=1
                                }
                                tofrac=replacestrs(tofrac)
                                if (toDecimalVal === 1) {
                                    if (band) {
                                        strltx+=tofrac
                                    }
                                }else{
                                    if (band) {
                                        strltx+=scanNumbers(tofrac,false)
                                    }
                                }
                                if (band) {
                                    strltx+="`</p>"
                                }
                            }

                        }else{
                            i=0
                            tofrac=""
                            if (band) {
                                strltx+="`"
                            }
                            while (i<l) {
                                tofrac+=strArr[i]
                                strDevelopment+=strArr[i]
                                i+=1
                            }
                            strDevelopment+=res
                            i=l+j
                            tofrac=replacestrs(tofrac)
                            if (change) {
                                if (toDecimalVal === 1) {
                                    if (band) {
                                        strltx+=tofrac
                                        strltx+="color(red)("+rstr2+")"
                                    }
                                }else{
                                    if (band) {
                                        strltx+=scanNumbers(tofrac,false)
                                        strltx+="color(red)("+scanNumbers(rstr2,false)+")"
                                    }
                                }

                            }else{
                                if (toDecimalVal === 1) {
                                    if (band) {
                                        strltx+=tofrac
                                        strltx+="color(red)("+rstr+")"
                                    }
                                }else{
                                    if (band) {
                                        strltx+=scanNumbers(tofrac,false)
                                        strltx+="color(red)("+scanNumbers(rstr,false)+")"
                                    }
                                }
                            }
                            tofrac=""
                            while (i<k) {

                                strDevelopment+=strArr[i]
                                tofrac+=strArr[i]
                                i+=1

                            }
                            tofrac=replacestrs(tofrac)

                            if (toDecimalVal === 1) {
                                if (band) {
                                    strltx+=tofrac
                                }
                            }else{
                                if (band) {
                                    strltx+=scanNumbers(tofrac,false)
                                }
                            }
                            if (band) {
                                strltx+="`</p>"
                            }
                        }


                        if (l<k-j && tofrac === "") {


                            if (strArr[l+j-1]===")") {
                                //strArr=strArr.removeAt(l + j - 1)
                                strArr.splice(l + j - 1, 1)
                                k-=2
                                i=0
                                tofrac=""
                                if (band) {
                                    strltx+="`"
                                }

                                while (i<l-1) {
                                    strDevelopment+=strArr[i]
                                    tofrac+=strArr[i]
                                    i+=1
                                }
                                strDevelopment+=res
                                i=l+j-1
                                tofrac=replacestrs(tofrac)
                                if (change) {
                                    if (toDecimalVal === 1) {
                                        if (band) {
                                            strltx+=tofrac
                                            strltx+="(color(red)("+rstr2+"))"
                                        }
                                    }else{
                                        if (band) {
                                            strltx+=scanNumbers(tofrac,false)
                                            strltx+="(color(red)("+scanNumbers(rstr2,true)+"))"
                                        }
                                    }

                                }else{
                                    if (toDecimalVal === 1) {
                                        if (band) {
                                            strltx+=tofrac
                                            strltx+="(color(red)("+rstr+"))"
                                        }
                                    }else{
                                        if (band) {
                                            strltx+=scanNumbers(tofrac,false)
                                            strltx+="(color(red)("+scanNumbers(rstr,true)+"))"
                                        }
                                    }
                                }

                                tofrac=""
                                while (i<k) {
                                    strDevelopment+=strArr[i]
                                    tofrac+=strArr[i]
                                    i+=1
                                }
                                tofrac=replacestrs(tofrac)
                                if (toDecimalVal === 1) {
                                    if (band) {
                                        strltx+=tofrac
                                    }
                                }else{
                                    if (band) {
                                        strltx+=scanNumbers(tofrac,false)
                                    }
                                }
                                if (band) {
                                    strltx+="`</p>"
                                }
                            }

                        }

                    }else{

                        i=0
                        tofrac=""
                        if (band) {
                            strltx+="`"
                        }
                        while (i<l-1) {
                            strDevelopment+=strArr[i]
                            tofrac+=strArr[i]
                            i+=1
                        }

                        strDevelopment+=res
                        tofrac=replacestrs(tofrac)

                        if (change) {
                            if (toDecimalVal === 1) {
                                if (band) {
                                    strltx+=tofrac
                                    strltx+="color(red)("+rstr2+")"
                                }
                            }else{
                                if (band) {
                                    strltx+=scanNumbers(tofrac,false)
                                    strltx+="color(red)("+scanNumbers(rstr2,false)+")"
                                }
                            }

                        }else{
                            if (toDecimalVal === 1){
                                if (band) {
                                    strltx+=tofrac
                                    strltx+="color(red)("+rstr+")"
                                }
                            }else{
                                if (band) {
                                    strltx+=scanNumbers(tofrac,false)
                                    strltx+="color(red)("+scanNumbers(rstr,false)+")"
                                }
                            }
                        }

                        i=l+j
                        tofrac=""
                        while (i<k) {
                            strDevelopment+=strArr[i]
                            tofrac+=strArr[i]
                            i+=1
                        }
                        tofrac=replacestrs(tofrac)
                        if (toDecimalVal === 1) {
                            if (band) {
                                strltx+=tofrac
                            }
                        }else{
                            if (band) {
                                strltx+=scanNumbers(tofrac,false)
                            }
                        }
                        if (band) {
                            strltx+="`</p>"
                        }
                    }
                    let re = new RegExp('--', 'g');
                    strDevelopment = strDevelopment.replace(re, '+');
                    re = new RegExp('++', 'g');
                    strDevelopment = strDevelopment.replace(re, '+');
                    re = new RegExp('-+', 'g');
                    strDevelopment = strDevelopment.replace(re, '-');
                    re = new RegExp('+-', 'g');
                    strDevelopment = strDevelopment.replace(re, '-');
                    re = new RegExp('/+', 'g');
                    strDevelopment = strDevelopment.replace(re, '/');
                    re = new RegExp('*+', 'g');
                    strDevelopment = strDevelopment.replace(re, '*');
                    re = new RegExp('(+', 'g');
                    strDevelopment = strDevelopment.replace(re, '(');
                    re = new RegExp('c+', 'g');
                    strDevelopment = strDevelopment.replace(re, 'c');
                    re = new RegExp('s+', 'g');
                    strDevelopment = strDevelopment.replace(re, 's');
                    re = new RegExp('t+', 'g');
                    strDevelopment = strDevelopment.replace(re, 't');

                    break;
                }
            }

            l+=1

        }

    }