import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telefoneFormat'
})
export class TelefoneFormatPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;
    const cleanedValue = value.replace(/\D/g, '');
    const digitCount = cleanedValue.length;
    const hasNineDigits = digitCount === 9;
    let formattedTelefone = '(' + cleanedValue.substring(0, 2) + ') ';
    formattedTelefone += cleanedValue.substring(2, hasNineDigits ? 7 : 6) + '-';
    formattedTelefone += cleanedValue.substring(hasNineDigits ? 7 : 6, digitCount);

    return formattedTelefone;
  }

}
