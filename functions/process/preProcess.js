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
            //console.log(re)
            strDevelopment = strDevelopment.split(')(').join(")*(")
            removeSteps()
            //let rangselec = self.V.AsciiTab.selectedRange()

            //self.V.AsciiTab.string = (self.V.AsciiTab.string.replacingOccurrences( of: "..", with: "."))

            //let asciiV=self.V.AsciiTab.string
            //self.V.AsciiTab.setSelectedRange(rangselec)
            //console.log()
            var ev = Evaluate(s)
            //console.log(ev)
            if (toDecimalVal !== 1) {
                if (isNumber(ev)) {
                    ev = tofrac(DoubleStr(ev))
                }
            }

            strltx += "<br><br><p style='text-align:center; font-size: 32px' >`color(green)(RR = " + ev + ")`</p>"
            //console.log(strltx)
            createHtmlatex(setHtml)
            //process()

       // }
   /* } catch(e) {
        console.log(e)
    }*/   
}