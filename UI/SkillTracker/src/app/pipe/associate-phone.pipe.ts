import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'associatePhone'
})
export class AssociatePhonePipe implements PipeTransform {

  transform(items: any[], searchText: any): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(it => {
      return it.mobile.toLowerCase().includes(searchText);
    });
  }

}
