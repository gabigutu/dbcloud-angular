import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'writeascheck'
})
export class WriteascheckPipe implements PipeTransform {

  transform(value: boolean, ...args: string[]): string {    
    return (value ? 'v': 'x') + ' ' + (parseInt(args[0]) % 2 ? 'impar' : 'par') + ' ' + args[1];

  }

}
