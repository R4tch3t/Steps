removeSteps = () => {
    strltx = "";
    StepsC = 0
}
Preprocess = (s, setHtml) => {
    //try {
        //if !V.ThreadActive && !V.isEditing {
            //let re = new RegExp(' ','g')
            strOrigin = s.split(' ').join("")
            strDevelopment = ""
            //re = new RegExp('cos', 'g')
            let strOrigin = strOrigin.toLowerCase().split('cos').join("c")
            //re = new RegExp('sen', 'g')
            strOrigin = strOrigin.split('sen').join("s")
            //re = new RegExp('tan', 'g')
            strOrigin = strOrigin.split('tan').join("t")
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
                ev = StepsFactor(s);
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