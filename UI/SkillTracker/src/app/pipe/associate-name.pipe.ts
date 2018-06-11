import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'associateName'
})
export class AssociateNamePipe implements PipeTransform {

  transform(items: any[], searchText: any): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(it => {
      return it.name.toLowerCase().includes(searchText);
    });
  }

}
