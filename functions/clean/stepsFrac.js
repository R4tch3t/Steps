StepsFrac=(Str) => {
        let numbers = ""
        let numbersP = []
        let simbols = []
        let Steps = ""
        let Precode = 0
        let codes=Str.split('')
        
       while (codes.length>0) {
        let char = codes.shift()
        let uniChar = char.charCodeAt(0)

            //si es numero
            if ((uniChar > 47 && uniChar < 58 ) || uniChar == 46) {
                
                numbers+=char
                
            }else {
                if (isNumber(numbers)) {
                    numbersP.push(numbers)
                    if (uniChar !== 40 && uniChar !== 41) {
                        simbols.push(char)
                    }
                    numbers=""
                }else if (uniChar === 45) {
                    if ((Precode > 38 && Precode<46 || Precode===47||Precode===183||Precode===0||Precode===247) && Precode !== 44) {
                        simbols.push(char)                        
                    }else{
                        numbers+=char
                    }
                }else if (uniChar !== 40 && uniChar !== 41) {
                        simbols.push(char)
                }
              
        }
            Precode=uniChar;
        }
        
        if (isNumber(numbers)){
            numbersP.push(numbers)
        }
        
        if (numbersP.length === 3) {

            if (simbols[0] === "-" && simbols[1] !== "/") {
                numbersP[0]=simbols.shift()+numbersP[0]
            }
            if (simbols.length > 2) {
            
                if (((simbols[1] === "*" || simbols[1] === "÷" ) && simbols[2] === "-")) {
                    //simbols=simbols.join('').removeAt(2);
                    numbersP[2] = simbols.splice(2,1)+numbersP[2];
                    //simbols = simbols.split('');
                }
            }
            
            if (simbols.length > 0) {
                if (((simbols[0] === "*" || simbols[0] === "÷" ) && simbols[1] === "-")) {
                    //simbols=simbols.join('').removeAt(1);
                    numbersP[2] = simbols.splice(1,1)+numbersP[2]
                    //simbols = simbols.split('');
                }
            }
            if (simbols.count === 4) {
                if (simbols[0] === "-" && simbols[2] === "-") {
                    //simbols.shift()
                    //simbols = simbols.join('').removeAt(1).split('');
                    simbols.splice(1,1)
                }
            }
            
            if  (simbols[0] === "/") {
                
                if (simbols[1] !== "÷") {
                 if (simbols[1] === "*") {
                    Steps+="[color(red)("+numbersP[0]
                    
                    Steps+=simbols[1]
                    Steps+=numbersP[2]+")"
                    Steps+="/"+numbersP[1]+"]"
                 }else{
                    Steps+="[("+numbersP[0]
                    Steps+=simbols[1]
                    Steps+="color(red)("+numbersP[2]+"*"+numbersP[1]+")"
                    Steps+=")/"+numbersP[1]+"]"

                    Steps+="=[color(red)("+numbersP[0]
                    Steps+=simbols[1]
                    Steps+=forstr(numbersP[2],numbersP[1])+")"
                    Steps+="/"+numbersP[1]+"]"
                }
            
            }else if (BiggerThan(absstr(numbersP[2]), "0")) {
                let mcd = absstr(MCD(numbersP[0], numbersP[2]))
                    
                if (LessThan(mcd, "2")) {
                    Steps+="["+numbersP[0]+"/"
                
                    Steps+="color(red)("+numbersP[1]+"*"+numbersP[2]+")]"
                }else{
                    let mcd = absstr(MCD(numbersP[0], numbersP[2]))
                    Steps+="[color(red)("+numbersP[0]+")/("
                    
                    Steps+=numbersP[1]+"*color(red)("+numbersP[2]+"))]=["
                    
                    Steps+=dividestr(numbersP[0],mcd,128)+"/("
                    
                    Steps+="color(red)("+numbersP[1]+"*"
                    
                    Steps+=dividestr(numbersP[2],mcd,128)+"))]"
                }
            }else{
                let re = new RegExp('=', 'g');
                Steps = Steps.replace(re, '');
                //Steps=Steps.replacingOccurrences(of: "=", with: "")    
            }
               
            }else if (simbols[0] === "+" || simbols[0] === "-") {

                if (simbols.length === 3) {
                    let s = simbols[simbols.length-1]
                    Steps+="[(-"+numbersP[0]
                    Steps+=s
                    Steps+="color(red)("+numbersP[1]+"*"+numbersP[2]+")"
                    Steps+=")/"+numbersP[1]+"]="
                    Steps+="[color(red)(-"+numbersP[0]
                    Steps+=s
                    Steps+=forstr(numbersP[1],numbersP[2])+")"
                    Steps+="/"+numbersP[1]+"]"
                }else{
                    Steps+="[(color(red)("+numbersP[2]+"*"+numbersP[0]+")"
                    Steps+=simbols[0]
                    Steps+=numbersP[1]
                    Steps+=")/"+numbersP[2]+"]="
                    Steps+="[color(red)("+forstr(numbersP[2],numbersP[0])
                    Steps+=simbols[0]
                    Steps+=numbersP[1]+")"
                    Steps+="/"+numbersP[2]+"]"
                }
                
            }else if (simbols[0] === "÷") {
                let mcd = absstr(MCD(numbersP[1], numbersP[0]))
                
                if (LessThan(mcd, "2")) {
                    Steps+="[color(red)("+numbersP[0]+"*"+numbersP[2]+")"
                    Steps+="/"+numbersP[1]+"]"
                }else{
                    let mcd = absstr(MCD(numbersP[0], numbersP[1]))
                    
                    Steps+="[(color(red)("+numbersP[0]+")*"+numbersP[2]
                    Steps+=")/color(red)("+numbersP[1]+")]=["
                    
                Steps+="color(red)("+dividestr(numbersP[0], mcd, 128)
                Steps+="*"+numbersP[2]+")"
                Steps+="/"+dividestr(numbersP[1], mcd,128)+"]"
                    
                }
                
            }else if (simbols[0] === "*") {
                Steps+="[color(red)("+numbersP[0]+"*"+numbersP[1]
                Steps+=")/"+numbersP[2]+"]"
            }
        
        }
        else if (numbersP.length > 0 && numbersP[0] !== "0"){
            if (simbols.length > 2 && ((simbols[2] === "*" || simbols[2] === "÷") && simbols[3] === "-")) {
                
                numbersP[2] = simbols.splice(3,1)+numbersP[2]
            
            }
            if (simbols.length > 2) {
           if ((simbols[1] === "*" || simbols[1] === "÷") && simbols[2] === "-"){
                
                numbersP[2] = simbols.splice(2,1) + numbersP[2]
                
            }
            }

            if (simbols[0] === "-") {
                numbersP[0] = simbols.shift()+numbersP[0]
            }
            
            if (simbols.length > 1 && numbersP.length > 3) {
            if (simbols[1] === "+" || simbols[1] === "-"){
                Steps+="[(color(red)("+numbersP[0]+"*"+numbersP[3]
                Steps+=")"+simbols[1]+"color(red)("
                Steps+=numbersP[1]+"*"+numbersP[2]
                Steps+="))/(color(red)("
                Steps+=numbersP[1]+"*"+numbersP[3]
                Steps+="))]="
                
                if (numbersP[1] === numbersP[3]) {
                    Steps+="[(color(red)("+numbersP[3]+")*("+numbersP[0]
                    Steps+=simbols[1]+""+numbersP[2]+")"
                    Steps+=")/(color(red)("
                    Steps+=numbersP[1]+")*"+numbersP[3]
                    Steps+=")]="
                        
                    Steps+="[((color(red)("+numbersP[0]
                    Steps+=")"+simbols[1]+"color(red)("+numbersP[2]+"))"
                    Steps+=")/"
                    Steps+=numbersP[3]
                    Steps+="]"
                    
                if (simbols[1]==="-"){
                    let mcd = absstr(MCD(minusstr(numbersP[0], numbersP[2]), numbersP[3]))
                    
                    if (BiggerThan(mcd, "1")) {
                        Steps+="=[(color(red)("+minusstr(numbersP[0],numbersP[2])
                        Steps+=")/color(red)("+mcd+"))/(color(red)("
                        Steps+=numbersP[3]
                        Steps+=")/color(red)("+mcd+"))]"
                    }
                } else if (simbols[1]==="+") {
                     let mcd = absstr(MCD(plusstr(numbersP[0], numbersP[2]) , numbersP[3]))
                    if (BiggerThan(mcd, "1")) {
                        Steps+="=[(color(red)("+plusstr(numbersP[0],numbersP[2])
                        Steps+=")/color(red)("+mcd+"))/(color(red)("
                        Steps+=numbersP[3]
                        Steps+=")/color(red)("+mcd+"))]"
                    }
                    
                    }
                }else{
                    let a=forstr(numbersP[0], numbersP[3])
                    let b=forstr(numbersP[1], numbersP[2])
                    let c=forstr(numbersP[1], numbersP[3])
                    
                    Steps+="[(color(red)("+a+")"
                    Steps+=simbols[1]+"color(red)("+b+")"
                    Steps+=")/color(red)("
                    Steps+=c
                    Steps+=")]"
                    
                    if (simbols[1] === "+") {
                        a=plusstr(a,b)
                        let mcd = absstr(MCD(a, c))
                        
                        if (BiggerThan(mcd, "1")) {
                            Steps+="=[(color(red)("+a+")/color(red)("+mcd+")"
                            Steps+=")/(color(red)("
                            Steps+=c
                            Steps+=")/color(red)("+mcd+"))]"
                        }
                        
                    }else{
                        a=minusstr(a, b)
                        let mcd = absstr(MCD(a, c))
                        
                        if (BiggerThan(mcd, "1")){
                            Steps+="=[(color(red)("+a+")/color(red)("+mcd+")"
                            Steps+=")/(color(red)("
                            Steps+=c
                            Steps+=")/color(red)("+mcd+"))]"
                        }
                    }
                }
            
            }
            else if (simbols[1] === "*") {
                let a=forstr(numbersP[0], numbersP[2])
                let b=forstr(numbersP[1], numbersP[3])
                let mcd=absstr(MCD(a, b))
                Steps+="[(color(red)("+numbersP[0]+"*"+numbersP[2]
                Steps+="))/(color(red)("
                Steps+=numbersP[1]+"*"+numbersP[3]
                Steps+="))]"
                
                if (BiggerThan(mcd, "1")) {
                    
                    Steps+="=[(color(red)("+a+")/color(red)("+mcd+")"
                    Steps+=")/(color(red)("+b+")/color(red)("+mcd+"))]"
                    
                }
            }
            else if (simbols[1] === "÷") {
                let a=forstr(numbersP[0], numbersP[3])
                let b=forstr(numbersP[1], numbersP[2])
                let mcd=absstr(MCD(a, b))
                
                Steps+="[(color(red)("+numbersP[0]+"*"+numbersP[3]
                Steps+="))/(color(red)("
                Steps+=numbersP[1]+"*"+numbersP[2]
                Steps+="))]"
                if (BiggerThan(mcd, "1")){
                    
                    Steps+="=[(color(red)("+a+")/color(red)("+mcd+")"
                    Steps+=")/(color(red)("+b+")/color(red)("+mcd+"))]"
                    
                }
            }
        
            }
            
        }
        
        return Steps
    }