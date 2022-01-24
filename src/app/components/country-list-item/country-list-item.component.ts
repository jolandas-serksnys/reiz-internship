import { Component, Input, OnInit } from '@angular/core';
import { Country } from '@app/models';

@Component({
  selector: 'app-country-list-item',
  templateUrl: './country-list-item.component.html'
})
export class CountryListItemComponent implements OnInit {
  @Input() country: Country = new Country();

  regionColours = [
    ['Africa', 'bg-primary'],
    ['Americas', 'bg-success'],
    ['Asia', 'bg-info'],
    ['Europe', 'bg-warning'],
    ['Oceania', 'bg-danger']
  ]

  constructor() { }

  ngOnInit(): void {
  }

  getRegionColour(region: string) {
    let colour = this.regionColours.filter(c => c[0] == region);
    return colour.length > 0 ? colour[0][1] : 'bg-dark';
  }

}
