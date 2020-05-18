createHtmlatex = (setHtml) => {
        let RNFS = require('react-native-fs');
        let dirCss = `${RNFS.ExternalDirectoryPath}/css`
        let dirJQuery = `${RNFS.ExternalDirectoryPath}/jQuery`
        let dirMathJax = `${RNFS.ExternalDirectoryPath}/MathJax-master`;
        let bootstrapPath = `file://${dirCss}/bootstrap.css`
        let jqueryPath = `file://${dirJQuery}/jquery-3.5.0.min.js`
        let svgPath = `file://${dirJQuery}/svg.js`
        let svgFilterPath = `file://${dirJQuery}/svg.filter.js`
        let mathJaxPath = `file://${dirMathJax}/MathJax.js`;
        let svgBPath = `file://${dirJQuery}/setBSVG.js`;
        let showCardDivPath = `file://${dirJQuery}/showCardDiv.js`;
        let showCardForPath = `file://${dirJQuery}/showCardFor.js`;
        let evalMatrixPath = `file://${dirJQuery}/evalMatrix.js`;
        let matrixModalPath = `file://${dirJQuery}/matrixModal.js`;

        
        /*let bootstrapPath=Bundle.main.path(forResource: "bootstrap", ofType: "css", inDirectory: "css")!
        let jqueryPath=Bundle.main.path(forResource: "jquery", ofType: "js", inDirectory: "jQuery")!
        let svgPath=Bundle.main.path(forResource: "svg", ofType: "js", inDirectory: "jQuery")!
        let svgFilterPath=Bundle.main.path(forResource: "svg.filter", ofType: "js", inDirectory: "jQuery")!
        let mathJaxPath=Bundle.main.path(forResource: "MathJax", ofType: "js", inDirectory: "MathJax-master")!
        let svgBPath=Bundle.main.path(forResource: "setBSVG", ofType: "js", inDirectory: "jQuery")!
        let showCardDivPath=Bundle.main.path(forResource: "showCardDiv", ofType: "js", inDirectory: "jQuery")!
        let showCardForPath=Bundle.main.path(forResource: "showCardFor", ofType: "js", inDirectory: "jQuery")!
        let evalMatrixPath=Bundle.main.path(forResource: "evalMatrix", ofType: "js", inDirectory: "jQuery")!
        let matrixModalPath=Bundle.main.path(forResource: "matrixModal", ofType: "js", inDirectory: "jQuery")!*/
        

        var head="<!DOCTYPE html><html><head><meta charset='UTF-8'>"
        head+="<title>Steps</title>"
        head+="<meta name='viewport' content='width=device-width, initial-scale=1.0'>"
        head+="<link href='"+bootstrapPath+"' rel='stylesheet' />"
        //head+="<script src='"+mathJaxPath+"?config=AM_HTMLorMML'></script>"
        //head+="<script src='https://polyfill.io/v3/polyfill.min.js?features=es6'></script>"
        //head+="<script> MathJax = {loader: {load: ['input/asciimath', 'output/chtml', 'ui/menu']},}; </script>"
        //head+="<script type='text/javascript' id='MathJax-script' async src='https://cdn.jsdelivr.net/npm/mathjax@3/es5/startup.js'></script>"
        head+="<script type='text/javascript' async src='https://cdn.jsdelivr.net/npm/mathjax@2/MathJax.js?config=AM_HTMLorMML'></script>"
        head+="<script type='text/javascript' src='"+jqueryPath+"'></script>"
        head+="<script type='text/javascript' src='"+svgPath+"'></script>"
        head+="<script type='text/javascript' src='"+svgFilterPath+"'></script>"
        head+="<script type='text/javascript' src='"+svgBPath+"'></script>"
        head+="<script type='text/javascript' src='"+showCardDivPath+"'></script>"
        head+="<script type='text/javascript' src='"+showCardForPath+"'></script>"
        head+="<script type='text/javascript' src='"+evalMatrixPath+"'></script>"
        head+="<script type='text/javascript' src='"+matrixModalPath+"'></script>"
       // head+="<script type='text/javascript'>"+FadeInLatex()+"</script>"
        head+="</head>"
        var body="<body style='opacity: 0' >"+printBackgroundSVG()
        body+=strltx
        /*body+="<script type='text/javascript' async src='https://cdn.jsdelivr.net/npm/mathjax@2/MathJax.js?config=AM_HTMLorMML'></script>"
        body+="<script type='text/javascript' src='"+jqueryPath+"'></script>"
        body+="<script type='text/javascript' src='"+svgPath+"'></script>"
        body+="<script type='text/javascript' src='"+svgFilterPath+"'></script>"
        body+="<script type='text/javascript' src='"+svgBPath+"'></script>"
        body+="<script type='text/javascript' src='"+showCardDivPath+"'></script>"
        body+="<script type='text/javascript' src='"+showCardForPath+"'></script>"
        body+="<script type='text/javascript' src='"+evalMatrixPath+"'></script>"
        body+="<script type='text/javascript' src='"+matrixModalPath+"'></script>"
        body+="<script type='text/javascript'>"+FadeInLatex()+"</script>"*/
        body+="</body></html>"
        console.log(head+body)
        setHtml(head+body)
        //changeRangeSelG()
       // print(pathHtml)
        //_ = webLayer.init(pathHtml, head, body, Latex)
    }