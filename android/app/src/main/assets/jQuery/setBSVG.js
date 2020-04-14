function setBackgroundSVG(){
 (function ($) {
    let Wwidth=$("body").prop("scrollWidth");
    let Wheight=$("body").prop("scrollHeight");
    const windowW = $(window).width()
    const windowH = $(window).height()
    if (Wwidth < windowW) {
        Wwidth = windowW;
    }
    if (Wheight < windowH) {
        Wheight = windowH;
    }

    if(Wwidth>1800){
        Wwidth+=Wwidth*0.20
    }
    
    $originWidth=Wwidth;
    $originHeight=Wheight;
    $bodySVG = SVG('bodySVG').size(Wwidth,Wheight).viewbox(0,0,Wwidth,Wheight),
    $rectBody = $bodySVG.rect(Wwidth,Wheight);

    $stopR0=16517;
    $stopR1=3328;
    $stopStr0=$stopR0.toString(16).toUpperCase();
    $stopStr1=$stopR1.toString(16).toUpperCase();

    if($stopStr0.length>3){
        $stopStr0="00"+$stopStr0;
    }
    if($stopStr1.length>3){
        $stopStr1="00"+$stopStr1;
    }
    $stopStr0="#"+$stopStr0;
    $stopStr1="#"+$stopStr1;

    $linearRect = $bodySVG.gradient('linear', function(stop) {
                                    stop.at(0, $stopStr0)
                                    stop.at(1, $stopStr1)
    });
    $pattern = $bodySVG.pattern(40, 40, function(add) {
                            add.rect(40,40).fill('#fff')
                            // add.rect(20,20).fill('#34ce57')
                                add.rect(20,20).fill('#007bff')
                            //   add.rect(20,20).fill('#ff0')
                            add.rect(10,10).move(5,5).fill('#fff')
    });

    $("#divSVG").animate({opacity: 0}, "fast", function () {

                        $rectBody.fill($pattern);
                        $("#divSVG").css("filter","blur(8px)");
                        // $('p').css('color','yellow');
                        $("#divSVG").animate({opacity: 1}, "slow", function () {
                                    //     print($('body'));
                    });
    });




 })(jQuery);
}

function resizeB(){
    (function ($) {

        let Wwidth=$("body").prop("scrollWidth");
        let Wheight=$("body").prop("scrollHeight");
        const windowW = $(window).width()
        const windowH = $(window).height()
        if (Wwidth < windowW) {
            Wwidth = windowW;
        }
        if (Wheight < windowH) {
            Wheight = windowH;
        }

        $bodySVG.size(Wwidth,Wheight).viewbox(0,0,Wwidth,Wheight),
        $rectBody.size(Wwidth,Wheight);

    })(jQuery);
}

function resizeW(){
    (function ($) {

     $bodySVG.size($originWidth,$originHeight).viewbox(0,0,$originWidth,$originHeight),
     $rectBody.size($originWidth,$originHeight);

     })(jQuery);
}
