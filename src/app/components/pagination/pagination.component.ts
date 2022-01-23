import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html'
})
export class PaginationComponent implements OnInit {
  @Input() page: number = 1;
  @Input() pageMax: number = 1;
  @Output() goToPageEvent = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  goToPage(page: number) {
    if(page > 0 && page < this.pageMax + 1) {
      this.goToPageEvent.emit(page);
    }
  }

}
