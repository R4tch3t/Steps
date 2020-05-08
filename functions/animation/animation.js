printBackgroundSVG = () => {
    let bodySVG = "<svg id='bodySVG' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' preserveAspectRatio='xMidYMid meet' viewBox='0 0 100 100' width='100%' height='100%' style=' position: relative; top: 0px; left: 0px;' > </svg>";
    let divSVG = "<div id='divSVG' style='opacity: 0; position: absolute; width: 100%; height: 100%; top: 0px; left: 0px;' > "+bodySVG+" </div>";
    return divSVG
}
/*
setBackgroundSVG = () => {
    let script = "function setBackgroundSVG(){"
    script+="(function ($) {"
    script+="$('body').append('wtf??'); "
    script+="$bodySVG = SVG('bodySVG').size('100%', '100%').viewbox(0,0,'100%','100%'); "
    script+="$rectBody = $bodySVG.rect('100%','100%'); "
    script+="$stopR0=16517; "
    script+="$stopR1=3328; "
    script+="$stopStr0=$stopR0.toString(16).toUpperCase(); "
    script+="$stopStr1=$stopR1.toString(16).toUpperCase(); "
    script+="if($stopStr0.length>3){ "
    script+="$stopStr0='00'+$stopStr0; "
    script+="} "
    script+="if($stopStr1.length>3){ "
        script+="$stopStr1='00'+$stopStr1;"
    script+="}"
    script+="$stopStr0='#'+$stopStr0; "
    script+="$stopStr1='#'+$stopStr1; "

    script+="$linearRect = $bodySVG.gradient('linear', function(stop) {"
        script+="stop.at(0, $stopStr0);"
        script+="stop.at(1, $stopStr1)"
    script+="}); "
    script+="$rectBody.fill($linearRect); "

    script+="})(jQuery);"
    script+="}"

    return script
}*/

FadeInLatex = () => {
    let ready="jQuery.noConflict();"
    ready+="(function($){"
    ready+="$(document).ready(function(){ "
    let loopFunc="function cicloReady(){ "
    loopFunc+="if(document.readyState === 'interactive') { setTimeout(cicloReady, 5000); }else{"
    loopFunc+="try{$('body').append(document.readyState); setBackgroundSVG(); }catch(e){$('body').append(e); }} "
    loopFunc+="} function ciclo(){"
    loopFunc+="$('body').animate({opacity:1},'slow',function(){"
    loopFunc+="cicloReady(); });"
    loopFunc+="}"
    ready+=loopFunc
    ready+="ciclo();"
    ready+="});"
    ready+="})(jQuery);"

    return ready
}