removeSteps = () => {
    strltx = "";
    StepsC = 0
}
Preprocess = (s, setHtml) => {
    //try {
        //if !V.ThreadActive && !V.isEditing {
            //let re = new RegExp(' ','g')
            //let bandPows = {}
            //s=DevPow(s);
            strOrigin = s.split(' ').join("")
            strDevelopment = ""
            //re = new RegExp('cos', 'g')
            strOrigin = strOrigin.toLowerCase().split('cos').join("c")
            //re = new RegExp('sen', 'g')
            strOrigin = strOrigin.split('sen').join("s")
            //re = new RegExp('tan', 'g')
            strOrigin = strOrigin.split('tan').join("t")
           // strOrigin = strOrigin.split('–').join("-");
            cleanstrD(strOrigin)
            //re = new RegExp("\\)\\(", 'g')
            strDevelopment = strDevelopment.split(')(').join(")*(")
            removeSteps()
            //let rangselec = self.V.AsciiTab.selectedRange()

            //self.V.AsciiTab.string = (self.V.AsciiTab.string.replacingOccurrences( of: "..", with: "."))

            //let asciiV=self.V.AsciiTab.string
            //self.V.AsciiTab.setSelectedRange(rangselec)
            var ev = ''
            //if (s.includes(/x/i)) {
            if (s.match(/[A-Z]/gi)){
                s=DevPow(s);
                strOrigin = s.split(' ').join("");
                strDevelopment = ""
                strOrigin = strOrigin.toLowerCase().split('cos').join("c")
                strOrigin = strOrigin.split('sen').join("s")
                strOrigin = strOrigin.split('tan').join("t")
                cleanstrD(strOrigin)
                strDevelopment = strDevelopment.split(')(').join(")*(")
            
                console.log(s.match(/[A-Z]/gi));
                const a = s.match(/[A-Z]/gi)
                let bandEv = true;
                let lastE = a[0];
                a.map((e)=>{
                    if(lastE!==e){
                        bandEv = false;
                    }
                    lastE=e;
                });

                if(bandEv){
                  /*  const strD = strDevelopment.split(')^');
                    console.log("strD");
                    console.log(strD);
                    */
                    
                    ev = StepsFactor(s);
                }else{
                    ev=strToLang("WrongEx");
                   // ev = Evaluate(s)
                }
            }else{
                ev = Evaluate(s)
            }

            if (toDecimalVal !== 1) {
                if (isNumber(ev)) {
                    ev = tofrac(DoubleStr(ev))

                }
            }

            strltx += "<br><br><p style='text-align:center; font-size: 32px' >`color(green)(RR = " + ev + ")`</p>"
            createHtmlatex(setHtml)
            //process()

       // }
   /* } catch(e) {
        console.log(e)
    }*/   
}