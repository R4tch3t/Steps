
export default (t,setHtml) => {
    txtGExp = t
    heightFix = 185
    let c = 0
    while(c<t.length){
        if (t[c].charCodeAt(0)===10){
            heightFix += 15
        }
        c++
    }
    Preprocess(t,setHtml)
}