import { Pipe, PipeTransform } from '@angular/core';
import {Candidate, ICandidate} from "app/shared/model/userapp/candidate.model";

@Pipe({ name: 'appFilter' })
export class FilterPipe implements PipeTransform {
  /**
   * Transform
   *
   * @param {any[]} items
   * @param {string} searchText
   * @returns {any[]}
   */
  transform(items: ICandidate[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(it => {

      return it.firstName!.toLocaleLowerCase().includes(searchText)
              ||it.lastName!.toLocaleLowerCase().includes(searchText)
        || it.degreeName!.toLocaleLowerCase().includes(searchText)
       || it.email!.toLocaleLowerCase().includes(searchText) ;

    });
  }
}
