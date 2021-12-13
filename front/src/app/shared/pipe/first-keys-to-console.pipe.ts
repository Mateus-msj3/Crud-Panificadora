import {NgModule, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'firstKeysToConsole'
})
export class FirstKeysToConsolePipe implements PipeTransform {

  transform(object: any): any {
    if (object) {
      console.log('------ Imprimir Chaves -------');
      for (let x in object) {
        console.log("Chave: ", x, ", Valor:", object[x]);
      }
    }
    return null;
  }

}



@NgModule({
  imports: [
  ],
  declarations: [ FirstKeysToConsolePipe ],
  exports: [ FirstKeysToConsolePipe ]
})
export class FirstKeysToConsoleModule { }
