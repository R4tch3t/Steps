//
//  Lang.swift
//  Calculus Lite
//
//  Created by Victor Manuel Santamaria on 09/11/16.
//  Copyright © 2016 Victor Manuel Santamaria. All rights reserved.
//

//export default class Lang {
    
WrongExpresion = () => {
    // Calculated.stringValue="Expresion mal excrita..."
    return strToLang("WrongEx")
}

    strToLang=(str)=>{
        let ToLang=str+" "
        const langCode = locaLang[0].languageCode
        
        if (langCode === "en") {
            
            switch (str) {
                case "Step":
                case "Paso":
                    ToLang="Step quad"
                    break;
                case "WrongEx":
                    ToLang="Bad quad Wri t t en."
                    break;
                case "DigitEx":
                    ToLang="Write quad an quad e x pression."
                    break;
                case "err00":
                    ToLang="ERROR TO INSTALL FILES..."
                    break;
                case "evalLang":
                    ToLang="EVALUATING"
                    break
                case "typeAnPH":
                    ToLang="Type an expression"
                    break
                case "configLabel":
                    ToLang="Settings"
                    break
                case "configText00":
                    ToLang="Preprocess"
                    break
                case "configCheck00":
                    ToLang="Braket solved"
                    break
                case "configCheck01":
                    ToLang="Sign changed"
                    break
                case "configText01":
                    ToLang="Preferences"
                    break
                case "configCheck02":
                    ToLang="To decimals"
                    break    
                case "configCheck03":
                    ToLang="More digits"
                    break
                case "configCheck04":
                    ToLang="Radians"
                    break
                case "configText02":
                    ToLang="Equations"
                    break    
                case "configCheck05":
                    ToLang="Factorization"
                    break          
                case "camBtn00":
                    ToLang="Show Steps"
                    break
                case "newStack":
                    ToLang = "Add stack"
                    break
                case "delStack":
                    ToLang = "Delete stack"
                    break    
                default:
                    break; //ToLang=(V?.EqualTo.stringValue)!
            }
            
        }
        else if (langCode === "es") 
        {
            
            switch (str) {
                case "Step":
                case "Paso":
                    ToLang="Paso quad"
                    break;
                case "WrongEx":
                    ToLang="E x presión quad mal quad escrita."
                    break;
                case "DigitEx":
                    ToLang="Digita quad una quad e x presión."
                    break;
                case "err00":
                    ToLang="ERROR AL INSTALAR ARCHIVOS..."
                    break;    
                case "evalLang":
                    ToLang="EVALUANDO"
                    break
                case "typeAnPH":
                    ToLang="Escribe una expresión"
                    break
                case "configLabel":
                    ToLang="Configuración"
                    break
                case "configText00":
                    ToLang="Preproceso"
                    break
                case "configCheck00":
                    ToLang="Resolver paréntesis"
                    break
                case "configCheck01":
                    ToLang="Cambio de signo"
                    break
                case "configText01":
                    ToLang="Preferencias"
                    break
                case "configCheck02":
                    ToLang="A decimales"
                    break
                case "configCheck03":
                    ToLang="Más dígitos"
                    break
                case "configCheck04":
                    ToLang="Radianes"
                    break  
                case "configText02":
                    ToLang="Ecuaciones"
                    break
                case "configCheck05":
                    ToLang="Factorización"
                    break        
                case "camBtn00":
                    ToLang="Ver Pasos"
                    break
                case "newStack":
                    ToLang = "Nueva pestaña"
                    break
                case "delStack":
                    ToLang = "Eliminar pestaña"
                    break    
                default:
                    break;
                //  ToLang=(V?.EqualTo.stringValue)!
            }
            
        }
        
        return ToLang+" ";
    }
    
//}
