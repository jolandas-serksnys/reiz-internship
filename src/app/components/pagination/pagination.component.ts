import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html'
})
export class PaginationComponent {
  @Input() page: number = 1;
  @Input() pageMax: number = 1;
  @Output() goToPageEvent = new EventEmitter<number>();

  selectedPageGroup = new FormGroup({
    selectedPage: new FormControl()
  });

  constructor() { }

  goToPage(page: number) {
    if(page > 0 && page < this.pageMax + 1) {
      this.goToPageEvent.emit(page);
    }
  }

  goToPageSelect() {
    let selectedPage = this.selectedPageGroup.get('selectedPage') as FormControl;
    this.goToPage(selectedPage.value);
  }

}
