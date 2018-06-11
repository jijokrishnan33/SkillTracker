import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'associateId'
})
export class AssociateIdPipe implements PipeTransform {

  transform(items: any[], searchText: any): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(it => {
      return it.associateId.toString().toLowerCase().includes(searchText);
    });
  }

}
