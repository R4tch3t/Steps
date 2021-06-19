cleanstrDF = (s) => {
    let previusUnichar = 0
    let changePolarid=false
    let str=s.split('')
   // var s=""
    //let OP=[]
    let match = s.match(/[^],[0-9],[0-9][A-Z]/gi)
    console.log(s)
    console.log(`cleanstrDF: ${match}`)
    while(match.length>0){
        const c = match.pop();
        const cs = c.split(",")
        const r = cs[2]+cs[0]+cs[1]
        s=s.split(c).join(r);        
    }
    /*while (str.length>0) {
        var char = str.shift();
        var uniChar = char.charCodeAt(0)
        var nextUnichar = 0

        if (str.length>0) {
            nextUnichar = str[0].charCodeAt(0)
        }
   
    }*/
    console.log(s)
    return s.split(",")
}