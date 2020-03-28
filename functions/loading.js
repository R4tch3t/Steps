import RNFetchBlob from 'react-native-fetch-blob';
export default () => {
let RNFS = require('react-native-fs');
const langLoad = 'EVALUATING'
dirCss = `${RNFS.ExternalDirectoryPath}/css`
dirJQuery = `${RNFS.ExternalDirectoryPath}/jQuery`
let rotateURI = `file://${dirCss}/rotate.css`
let jqueryURI = `file://${dirJQuery}/jquery.js`
let jqueryKeyURI = `file://${dirJQuery}/jquery.keyframes.js`
let jqueryKeyMinURI = `file://${dirJQuery}/jquery.keyframes.min.js`
let jquerySvgURI = `file://${dirJQuery}/svg.js`
let jquerySvgFilterURI = `file://${dirJQuery}/svg.filter.js`
let jqueryLoopsURI = `file://${dirJQuery}/loops.js`
let jqueryCreateLSVGURI = `file://${dirJQuery}/createLSVG.js`

let html = `<!DOCTYPE html>
<html>

<head>
  <!--<link rel="stylesheet" href="${rotateURI}" type="text/css" media="screen" /> -->
  <script src='${jqueryURI}'></script>
  <script src='${jqueryKeyURI}'></script>
  <script src='${jqueryKeyMinURI}'></script>
  <script src='${jquerySvgURI}'></script>
  <script src='${jquerySvgFilterURI}'></script>
  <script src='${jqueryLoopsURI}'></script>
  <script src='${jqueryCreateLSVGURI}'></script>

  <script type='text/javascript'>
    jQuery.noConflict();
    (function($) {
      $(document).ready(function() {
      /*
        $.keyframe.define([{
                name: 'alertFS',
                '0%': {'width': '0px', 'height': '0px', 'opacity': '0', 'left': '5px'},
                '25%': {'width': '25px', 'height': '25px', 'opacity': '0.4', 'left': '4px'},
                '30%': {'width': '40px', 'height': '40px', 'opacity': '0.6', 'left': '2px'},
                '50%': {'width': '65px', 'height': '65px', 'opacity': '0.8', 'left': '1px'},
                '70%': {'width': '70px', 'height': '70px', 'opacity': '1'},
                '71%': {'width': '90px', 'height': '90px', 'opacity': '0.7'},
                '72%': {'width': '125px', 'height': '125px', 'opacity': '1'},
                '73%': {'width': '150px', 'height': '150px', 'opacity': '0.8'},
                '74%': {'width': '170px', 'height': '170px', 'opacity': '1'},
                '75%': {'width': '190px', 'height': '190px', 'opacity': '0.8'},
                '100%': {'width': '200px', 'height': '200px', 'opacity': '1'}
        }]);*/

    function GetURLParameter(sParam)
    {
            var sPageURL = window.location.search.substring(1);
            var sURLVariables = sPageURL.split('&');
            for (var i = 0; i < sURLVariables.length; i++)
            {
                var sParameterName = sURLVariables[i].split('=');
                    if (sParameterName[0] == sParam) {
                            return sParameterName[1];
                        }
            }
    }
       // var lang = GetURLParameter("lang");

        function initLoops(){
          $p = $path.pointAt($length);
          $eased0 = 1.0;
          $eased1 = 0.0;
          loop1();
        }

        $("body").height(window.innerHeight);
        $("body").width(window.innerWidth);

        $(window).resize(function(){
          $("body").height(window.innerHeight);
          $("body").width(window.innerWidth);
        });

        createLoading();
        createText('${langLoad}');
        initLoops();
      });
    })(jQuery);
  </script>
</head>

<body style='overflow-x: hidden; overflow-y: hidden;'>

<div id="divSVG" style='opacity: 0; position: absolute; width: 100%; height: 100%; top: 0px; left: 0px;' >
    <svg id="bodySVG" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet" viewBox="0 0 100 100" width="100%" height="100%" style=" position: relative; top: 0px; left: 0px;" >
    </svg>
</div>

  <div style='display: table; height: 100%; width: 100%; text-align:center;' >
    <div id='lDiv' style='position: relative; width: 100%; height: 100%; display: table-cell; vertical-align: middle;'>

     <svg id="drawing" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet" viewBox="0 0 640 640" width="400" height="400" style=" position: relative;" >
     </svg>

  </div>
  </div>
</body>

</html>`;
         
                      return html
                     };