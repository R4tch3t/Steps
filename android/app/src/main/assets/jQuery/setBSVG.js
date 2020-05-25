
function setBackgroundSVG(){
 jQuery.noConflict();
 (function ($) {
    var Wwidth=$("body").prop("scrollWidth");
    var Wheight=$("body").prop("scrollHeight");
    var windowW = $(window).width();
    var windowH = $(window).height();
    
    if (Wwidth < windowW) {
        Wwidth = windowW;
    }else{
        $('.divSteps').width(Wwidth);
        $(".pProcess").width(windowW-30);
    }

    if (Wheight < windowH) {
        Wheight = windowH;
    }

    if(Wwidth>1800){
      //  $(".pProcess").width($(window).width());
        Wwidth+=Wwidth*0.20;
        $('.divSteps').width(Wwidth);
    }
    
    $originWidth=Wwidth;
    $originHeight=Wheight;
    $bodySVG = SVG('bodySVG').size(Wwidth,Wheight).viewbox(0,0,Wwidth,Wheight);
    $rectBody = $bodySVG.rect(Wwidth,Wheight);
    
    //$('.divSteps').width(Wwidth);

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
                                    stop.at(0, $stopStr0);
                                    stop.at(1, $stopStr1);
    });
    $pattern = $bodySVG.pattern(40, 40, function(add) {
                            //add.rect(40,40).fill('#fff');
                            add.circle(40).fill('#fff');
                            // add.rect(20,20).fill('#34ce57')
                                //add.rect(20,20).fill('#007bff');
                            add.circle(20).fill('#007bff');    
                            //   add.rect(20,20).fill('#ff0')
                            //add.rect(10,10).move(5,5).fill('#fff');
                            add.circle(10).move(5,5).fill('#fff');
    });

    $("#divSVG").animate({opacity: 0}, "fast", function () {

            $rectBody.fill($pattern);
            //$("#divSVG").css("-webkit-filter", 'blur(8px)').css("-moz-filter", "blur(8px)").css("-o-filter", "blur(8px)").css("-ms-filter", "blur(8px)").css("filter", "blur(8px)");
            // $('p').css('color','yellow');
            
            var device = navigator.userAgent;
            var agentID = device.match(/Android\s+([\d\.]+)/);
            var opacidad=1;
            if(agentID.length>1){
                agentID = agentID[1];
                if(parseFloat(agentID)<5){
                    opacidad=0.2;
                }
            }
            $("#divSVG").animate({opacity: opacidad}, "slow", function () {
                                    //     print($('body'));
            });
    });


 })(jQuery);
}

function resizeB(){
    jQuery.noConflict();
    (function ($) {

        var Wwidth=$("body").prop("scrollWidth");
        var Wheight=$("body").prop("scrollHeight");
        var windowW = $(window).width();
        var windowH = $(window).height();
        if (Wwidth < windowW) {
            Wwidth = windowW;
        }
        if (Wheight < windowH) {
            Wheight = windowH;
        }

        $bodySVG.size(Wwidth,Wheight).viewbox(0,0,Wwidth,Wheight);
        $rectBody.size(Wwidth,Wheight);

    })(jQuery);
}

function resizeW(){
    jQuery.noConflict();
    (function ($) {

     $bodySVG.size($originWidth,$originHeight).viewbox(0,0,$originWidth,$originHeight);
     $rectBody.size($originWidth,$originHeight);

     })(jQuery);
}
