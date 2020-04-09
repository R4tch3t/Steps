//
//  Lang.swift
//  Calculus Lite
//
//  Created by Victor Manuel Santamaria on 09/11/16.
//  Copyright © 2016 Victor Manuel Santamaria. All rights reserved.
//

//export default class Lang {
    

  strToLang=(str)=>{
        let ToLang=str+" "

        
       // if (UserDefaults.standard.object(forKey: "AppleLanguages") as! NSArray)[0] as! String=="en" {
            
            switch (str) {
            case "Step":
            case "Paso" :
                ToLang="Step quad"
                break;
            case "WrongEx":
                ToLang="Bad quad Wri t t en."
                break;
            case "DigitEx":
                ToLang="Write quad an quad e x pression."
                break;
            default:
                break; //ToLang=(V?.EqualTo.stringValue)!
            }
            
       // }
        /*else
        {
            
            switch str {
                
            case "Step","Paso":
                ToLang="Paso quad"
                break;
            case "WrongEx":
                ToLang="E x presión quad mal quad escrita."
                break;
            case "DigitEx":
                ToLang="Digita quad una quad e x presión."
                break;
            default:
                break;
              //  ToLang=(V?.EqualTo.stringValue)!
            }
            
        }*/
        
        return ToLang+" ";
    }
    
//}
