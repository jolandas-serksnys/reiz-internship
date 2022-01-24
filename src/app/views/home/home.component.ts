import { Component } from '@angular/core';
import { Country } from '@app/models';
import { CountryService } from '@app/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  countries: Country[] = [];
  filteredCountries: Country[] = [];

  page: number = 1;
  pageMax: number = 1;
  pageLength: number = 10;
  pageCountries: Country[] = [];

  sortAscending: boolean = true;
  filterCountryAreaCeil: string = '';
  filterRegion: string = '';
  regionColours = [
    ['Africa', 'bg-primary'],
    ['Americas', 'bg-success'],
    ['Asia', 'bg-info'],
    ['Europe', 'bg-warning'],
    ['Oceania', 'bg-danger']
  ]

  constructor(
    private countryService: CountryService
  ) {
    countryService.getAll().subscribe({
      next: (res: Country[]) => {
        this.countries = res;
        this.filteredCountries = res;
        this.pageMax = Math.ceil(res.length / this.pageLength);
        this.goToPage(this.page);
      },
      error: (err: Error) => {
        console.log(err);
      }
    })
  }

  goToPage(page: number) {
    if(this.countries) {
      this.page = page;

      this.pageCountries = this.filteredCountries
      .slice((page - 1) * this.pageLength, page * this.pageLength);

      this.pageMax = Math.ceil(this.filteredCountries.length / this.pageLength);
    }
  }

  toggleSorting() {
    this.sortAscending = !this.sortAscending;
    this.applyFilter();
  }

  setFilterRegion(region: string) {
    this.filterRegion = (this.filterRegion == region ? '' : region);
    this.applyFilter();
  }

  setFilterSizeCountry(country: string) {
    this.filterCountryAreaCeil = (this.filterCountryAreaCeil == country ? '' : country);
    this.applyFilter();
  }

  applyFilter() {
    let areaCeil = this.countries.find(c => c.name == this.filterCountryAreaCeil)?.area;

    this.filteredCountries = this.countries
    .filter(c => (this.filterRegion.length == 0 ? true : c.region == this.filterRegion) && (areaCeil ? c.area < areaCeil : true))
    .sort((c1, c2) => this.sortAscending ? c1.name.localeCompare(c2.name) : c2.name.localeCompare(c1.name));

    this.goToPage(1);
  }

  getRegionColour(region: string) {
    let colour = this.regionColours.find(c => c[0] == region);
    return colour ? colour[0][1] : 'bg-dark';
  }
}
