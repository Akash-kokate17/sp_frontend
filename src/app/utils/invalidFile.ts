import { AbstractControl } from "@angular/forms";


export function fileExtensionValidator(allowedExtension:string[]){
    return (control:AbstractControl)=>{
        const fileName = control.value;

        if(!fileName) return null;
        const extension  = fileName.split('.').pop().toLowerCase();
        if(allowedExtension.includes(extension)){
            return null;
        }

        return {invalidExtension:true}
    }
}