
import RNFetchBlob from 'react-native-fetch-blob';
label = 'CARGANDO...'
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
  RNFS.exists(dirJQuery).then(e1 => {

    if(!e||!e1){
        label = 'INSTALANDO ARCHIVOS...'
      
      RNFS.mkdir(dirCss).finally(() => {
        let i = 1
        RNFS.readDirAssets('css')
          .then(result => {
              //console.log('GOT RESULT', result);
            console.log(result.length)
            console.log(i)
            result.forEach(e=>{
              const n = `${dirCss}/${e.name}`
              const c = i
              RNFS.copyFileAssets(e.path,n).then(()=>{
                console.log(`c: ${c}`)
                if (c === result.length){

                  let i = 1
                  RNFS.mkdir(dirJQuery).finally(() => {
                    RNFS.readDirAssets('jQuery')
                      .then(result => {
                        result.forEach(e => {
                          const n = `${dirJQuery}/${e.name}`
                          const c = i
                          RNFS.copyFileAssets(e.path, n).then(()=>{
                            if (c === result.length) {
                              resolve(true)
                            }
                          })
                          i++;
                        })
                      })
                  })

                }
              })
              i++
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

    }else{
      resolve(true)
    }

  })
})


});