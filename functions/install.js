
import RNFetchBlob from 'react-native-fetch-blob';
export default () => new Promise((resolve, reject) => {
  let RNFS = require('react-native-fs');                     
  //let svgURI = Asset.fromModule(require('./jQuery/svg.js')).uri;
  //let svgFilterURI = Asset.fromModule(require('./jQuery/svg.filter.js')).uri;
  //let loadURI = Asset.fromModule(require('./Loading.html')).localUri;
  // get a list of files and directories in the main bundle
  const langLoad = 'EVALUATING'
  const dirs = RNFetchBlob.fs.dirs
  let dirCss = `${dirs.SDCardApplicationDir}/files/css`
  let dirJQuery = `${dirs.SDCardApplicationDir}/files/jQuery`
  console.log(`f: ${dirs.SDCardApplicationDir}`)
/*  console.log(dirs.DocumentDir)
  console.log(dirs.CacheDir)
  console.log(dirs.DCIMDir)
  console.log(dirs.SDCardApplicationDir)
  
  
  let cpRotateURI = RNFetchBlob.fs.asset('css/rotate.css');
  let cpCreateLSVGURI = RNFetchBlob.fs.asset('jQuery/createLSVG.js');
  let cpEvalMatrixURI = RNFetchBlob.fs.asset('jQuery/evalMatrix.js');
  let cpSvgURI = RNFetchBlob.fs.asset('jQuery/svg.js');
  let cpSvgFilterURI = RNFetchBlob.fs.asset('jQuery/svg.filter.js');
  console.log(cpCreateLSVGURI)
  //let path = RNFetchBlob.fs.asset('html/Loading.html');
  let rotateURI = null
  let createLSVG = null
  let evalMatrix = null
  let svgURI = null
  if(!RNFetchBlob.fs.isDir(dirCss)){
    RNFetchBlob.fs.mkdir(dirCss)
    .finally(()=>{
      RNFetchBlob.fs.cp(cpRotateURI, `${dirs.SDCardApplicationDir}/files/css/rotate.css`)
      .then(() => {  
          rotateURI = `file://${dirs.SDCardApplicationDir}/files/css/rotate.css`
      })
      .catch(() => {console.log('error cpRotateURI')  })
    })
  }

  if(!RNFetchBlob.fs.isDir(dirJQuery)){
    RNFetchBlob.fs.mkdir(dirJQuery)
    .finally(()=>{
      RNFetchBlob.fs.cp(cpSvgURI, `${dirs.SDCardApplicationDir}/files/jQuery/svg.js`)
      .then(() => {  
          svgURI = `file://${dirs.SDCardApplicationDir}/files/jQuery/svg.js`
          RNFetchBlob.fs.cp(cpCreateLSVGURI, `${dirs.SDCardApplicationDir}/files/jQuery/createLSVG.js`)
            .then(() => {
              createLSVG = `file://${dirs.SDCardApplicationDir}/files/jQuery/createLSVG.js`
              RNFetchBlob.fs.cp(cpEvalMatrixURI, `${dirs.SDCardApplicationDir}/files/jQuery/evalMatrix.js`)
                .then(() => {
                  evalMatrix = `file://${dirs.SDCardApplicationDir}/files/jQuery/evalMatrix.js`

                })
                .catch(() => {
                  console.log('error cpSvgURI')
                })
            })
            .catch(() => {
              console.log('error cpSvgURI')
            })
      })
      .catch(() => {console.log('error cpSvgURI')  })

      

    })
  }
  
  
  RNFetchBlob.fs.cp(cpSvgFilterURI, `${dirs.SDCardApplicationDir}/files/svg.filter.js`)
      .then(() => { console.log('bienSvgFilterURI') })
      .catch(() => {console.log('error')  })
  RNFetchBlob.fs.cp(l2, `${dirs.SDCardApplicationDir}/files/loops2.js`)
      .then(() => { console.log('bienLoading2') })
      .catch(() => {console.log('error')  })
  RNFetchBlob.fs.cp(path, `${dirs.SDCardApplicationDir}/files/Loading.html`)
      .then(() => { console.log('bienLoading2') })
      .catch(() => {console.log('error')  })    

  RNFetchBlob.fs
    .readStream(`${dirs.SDCardApplicationDir}/files/loops2.js`, 'utf8')
    .then(stream => {
      let data = '';
      stream.open();
      stream.onData(chunk => {
        data += chunk;
      });
      stream.onEnd(() => {
        console.log(data);
      });
    });
    console.log(svgURI)
  
  console.log(RNFS) 
  const csvFile = RNFS.readFileAssets('Loading.html').then(file => {
      console.log(file)
      
      return file;
  });*/
  /*
  */
dirCss = `${RNFS.ExternalDirectoryPath}/css`
dirJQuery = `${RNFS.ExternalDirectoryPath}/jQuery`
console.log(`f2: ${RNFS.ExternalDirectoryPath}`)

RNFS.exists(dirCss).then(e=>{
  console.log(e)
  if(!e){
    RNFS.mkdir(dirCss).finally(() => {
      RNFS.readDirAssets('css')
        .then(result => {
            //console.log('GOT RESULT', result);
          //console.log(result[0].path)
          result.forEach(e=>{
            const n = `${dirCss}/${e.name}`
            RNFS.copyFileAssets(e.path,n)
            //console.log(e)
          })
          // stat the first file
          /*return Promise.all([
            RNFS.stat(result[0].path),
            result[0].path,
          ]);*/
        })
        /*
        .then(statResult => {
          console.log(statResult)
          if (statResult[0].isFile()) {
            // if we have a file, read it
            return RNFS.readFile(statResult[1], 'utf8');
          }

          return 'no file';
        })
        .then(contents => {
          // log the file contents
          //console.log(contents);
        })
        .catch(err => {
          console.log(err.message, err.code);
        });
        */
    })
  }
})

RNFS.mkdir(dirJQuery).finally(() => {
  RNFS.readDirAssets('jQuery')
    .then(result => {
      result.forEach(e => {
        const n = `${dirJQuery}/${e.name}`
        RNFS.copyFileAssets(e.path, n)
      })
    })
})
let rotateURI = `file://${dirCss}/rotate.css`
let jqueryURI = `file://${dirJQuery}/jquery.js`
let jqueryKeyURI = `file://${dirJQuery}/jquery.keyframes.js`
let jqueryKeyMinURI = `file://${dirJQuery}/jquery.keyframes.min.js`
let jquerySvgURI = `file://${dirJQuery}/svg.js`
let jquerySvgFilterURI = `file://${dirJQuery}/svg.filter.js`
let jqueryLoopsURI = `file://${dirJQuery}/loops.js`
let jqueryCreateLSVGURI = `file://${dirJQuery}/createLSVG.js`
    
  //console.log(svgFilterURI);
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
         
                     //  console.log(html);
                       //(typeof num === 'number') ? resolve(num * 2): reject('Input must be an number');
                      resolve(true)
                       //return html
                       //return `file://${dirs.SDCardApplicationDir}/files/Loading.html`;
                     });