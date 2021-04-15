HandleRotate = () => { return new Promise((resolve, reject) => {
    if (bandRotate) {
    
       
            
            boundsStep = {width: boundsStep.height, height: boundsStep.width}
            
           

       
      //  bandRotate=false
    }else{
        bandRotate=true
      //  bandChange=false
    }
    console.log(`_onLayoutSteps: boundsStep.width: ${boundsStep.width} `);
    resolve(1)
})
}

rotateAllStacks = () => {
    //stacksetGHtml[stackName].setGHtml('')
    /*Object.keys(stacksetGHtml).map((index,value) => {
        console.log(`index: ${index}`)
    })*/
    var result = Object.keys(stacksetGHtml).map((key) => [Number(key), stacksetGHtml[key]]);
    console.log(`rotates: `)
    console.log(result)

}

ChangeBounds = () => { return new Promise((resolve, reject) => {
    console.log(`stateRotated2 ${stateRotated2} bandChange: ${bandChangeOut} stateRotated2:${stateRotated2}`)
    //rotateAllStacks()
    if (bandChangeOut) {
    
        if (stateRotated2<1){
            boundsStep = {width: boundsStep.height, height: boundsStep.width}
            stateRotated2++;
            //if(bandRotate)
         //   rotateOut = !rotateOut
        } else if (stateRotated2>0) {
            stateRotated2=0
        }/*else{
            stateRotated2=0
        }*/
       // bandRotate = false
    }else{
        bandChangeOut = true
    }
    console.log(`_onLayoutConfig: bandChange: ${bandChangeOut}  rotateOut: ${rotateOut}`);
    
    resolve(1)
})
}