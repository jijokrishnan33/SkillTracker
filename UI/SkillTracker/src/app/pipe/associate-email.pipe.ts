import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'associateEmail'
})
export class AssociateEmailPipe implements PipeTransform {

  transform(items: any[], searchText: any): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(it => {
      return it.email.toLowerCase().includes(searchText);
    });
  }

}
