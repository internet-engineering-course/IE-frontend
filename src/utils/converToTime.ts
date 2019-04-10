import {ToPersian} from "src/utils/converNumberToPersian";
import { number } from "prop-types";

export const ToTimeComplete = (time:Date) =>{
    var result:string = " ";

    if(time.getMonth()>0){
        result += ToPersian(time.getMonth()) + " ماه و ";
    }
    
    if(time.getDay()>0){
        result += ToPersian(time.getDay()) + " روز ";
    }

    if(time.getHours()>0){
        result += "و " + ToPersian(time.getHours()) + " ساعت ";
    }

    if(time.getMinutes()>0){
        result += "و " + ToPersian(time.getMinutes()) + " دقیقه ";
    }

    if(time.getSeconds()>0){
        result += "و " + ToPersian(time.getSeconds()) + " ثانیه ";
    }
    return result;
}

export const ToTimeShort = (time:Date) =>{
    var result:string = " ";
    var count:number = 0;
    if(time.getMonth()>0){
        count++;
        result += ToPersian(time.getMonth()) + " ماه و ";
    }
    
    if(time.getDay()>0){
        count++;
        result += ToPersian(time.getDay()) + " روز ";
    }

    if(time.getHours()>0){
        count++;
        if(count < 3){
            result += "و " + ToPersian(time.getHours()) + " ساعت ";
        } 
    }

    if(time.getMinutes()>0){
        count++;
        if(count < 3){
            result += "و " + ToPersian(time.getMinutes()) + " دقیقه ";
        }
    }

    if(time.getSeconds()>0){
        count++;
        if(count < 3){
            result += "و " + ToPersian(time.getSeconds()) + " ثانیه ";
        }
    }
    return result;
}