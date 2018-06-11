import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'associateSkill'
})
export class AssociateSkillPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
