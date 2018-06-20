import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'associateSkill'
})
export class AssociateSkillPipe implements PipeTransform {

  transform(items: any[], searchText: any): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(it => {
      return it.strongSkills.toLowerCase().includes(searchText);
    });
  }

}
