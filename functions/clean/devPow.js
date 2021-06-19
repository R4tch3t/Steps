DevPow = (str) => {
    console.log('devPow ')
    
    try{
    
    let revStr = str.split(')^')//everse();
    let i = 0;    
    //bandMatchFactor=false
    //con
    console.log(revStr)
    if(revStr.length>1){
        revStr.map( e => {
            let match1Str = e.match(/[-+*/]/gi);
            let match2Str = e.match(/[^]/gi);
            
            i++;
            if(i<revStr.length){
                let numbPow = parseInt(revStr[i])
                console.log("DevPow: ");
                console.log(match1Str);
                console.log(numbPow);
                //bandMatchFactor=match2Str.length>1?true:false
                bandMatchFactor=match2Str?true:false
                if(match1Str&&numbPow&&!match2Str){
                    console.log(e+"^"+revStr[i]);
                    if(numbPow<16){
                        e+=")"
                        str=e;
                        while(numbPow>1){
                            str+="*"+e
                            numbPow--;
                        }
                    }
                    
                }
            }
                    
        });
    }else{
        revStr = str.split(')*')
        let matchStr = (revStr[0]+"").match(/[A-Z]/gi)[0];
        console.log(`maTCH: ${matchStr} ${revStr[0]}`)
        //bandMatchFactor=matchStr?true:false
        bandMatchFactor=revStr[0].includes(matchStr+"^")
    }
    }catch(e){
        console.log(e)
    }
    
    return str
}