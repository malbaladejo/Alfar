import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringService {

  constructor() { }

  public removeUnauthorizedCharacters(value: string) {
    const result = this.removeAccentCharacters(value)
      .trim()
      .replace(/\r/g, '');

    return this.removeNonAlphaNumericCharacters(result);
  }

  private removeAccentCharacters(value: string) {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  private removeNonAlphaNumericCharacters(value: string) {
    return value.replace(/[^a-zA-Z0-9]/g, '-');
  }

  public removeDuplicateString(value: string, search: string, replace: string): string {
    while (value.indexOf(search) >= 0) {
      value = value.replace(search, replace);
    }
    return value;
  }
}
