import RNFetchBlob from 'react-native-fetch-blob';
import RNFS from 'react-native-fs';

export default () => new Promise((resolve, reject) => {
  const dirs = RNFetchBlob.fs.dirs
  let dirCss = `${dirs.SDCardApplicationDir}/files/css`
  let dirJQuery = `${dirs.SDCardApplicationDir}/files/jQuery`
  
  dirCss = `${RNFS.ExternalDirectoryPath}/css`
  dirJQuery = `${RNFS.ExternalDirectoryPath}/jQuery`
  //let dirMathJax = `${RNFS.ExternalDirectoryPath}/MathJax-master`;

/*RNFS.exists(dirCss).then(e=>{
  RNFS.exists(dirJQuery).then(e1 => {

    if(!e||!e1){*/
      
      RNFS.mkdir(dirCss).finally(() => {
        let i = 0
        let bandCopy = false
        RNFS.readDirAssets('css')
          .then(async (r) => {
            while(i<r.length) {
              await sleep(50)
             // sleep(5000).then(() => {
              if(!bandCopy){
              bandCopy=true
              const n = `${dirCss}/${r[i].name}`
              const c = i+1
              
              RNFS.copyFileAssets(r[i].path, n).then(() => {
                bandCopy=false
                if (c === r.length){

                  let i = 0
                  let bandCopy = false
                  RNFS.mkdir(dirJQuery).finally(() => {
                    RNFS.readDirAssets('jQuery')
                      .then(async (r) => {

                        while(i<r.length) {
                          await sleep(50)
                          if(!bandCopy){
                            bandCopy=true
                            const n = `${dirJQuery}/${r[i].name}`
                            const c = i+1
                            RNFS.copyFileAssets(r[i].path, n).then(() => {
                              bandCopy=false
                              if (c === r.length) {
                                resolve(true);
                                /*let i = 1
                                RNFS.mkdir(dirMathJax).finally(() => {
                                  RNFS.readDirAssets('MathJax-master')
                                    .then(result => {
                                      result.forEach(e => {
                                        const n = `${dirMathJax}/${e.name}`
                                        const c = i
                                        if(e.isDirectory()){
                                          
                                          copyFolder(e, 'MathJax-master', `${dirMathJax}`)

                                        }else{

                                          RNFS.copyFileAssets(e.path, n).then(()=>{
                                            if (c === result.length) {
                                              resolve(true)
                                              //RNFS.
                                            }
                                          })

                                        }

                                        i++;
                                      })
                                    })
                                })*/
                                
                              }
                            })
                            i++;
                          }
                        }

                      })
                  })

                }
              })
              i++
            }
           // })

            }
            
          })
          
      })


});

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

copyFolder = (e, dirAssets, dirMathJax) => {
  //let i = 1;
  const nameDir = e.name
  dirAssets = `${dirAssets}/${e.name}`;
  RNFS.mkdir(`${dirMathJax}/${e.name}`).finally(() => {
    RNFS.readDirAssets(dirAssets).then(result => {
      result.forEach(e => {
        const n = `${dirMathJax}/${nameDir}/${e.name}`;
        //const c = i;
        if (e.isDirectory()) {
          copyFolder(e, dirAssets, `${dirMathJax}/${nameDir}`);
        } else {
          RNFS.copyFileAssets(e.path, n).then(() => {
            //resolve
          });
        }
        //i++;
      });
    });
    // resolve(true);
  });

}