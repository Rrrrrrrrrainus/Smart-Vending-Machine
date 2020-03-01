
import jwt from 'jsonwebtoken'


export function decode(){
    var code = jwt.decode(localStorage.jtwToken)
    return code
}

export function checkExpired(exp){
    var dateNow = new Date();
    if(exp < (dateNow.getTime()/1000)){
        delete localStorage.jtwToken
        delete localStorage.auth
        return false
    }
    else{
        return true
    }
    
}