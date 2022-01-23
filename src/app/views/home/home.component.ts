import { Component, OnInit } from '@angular/core';
import { Country } from '@app/models';
import { CountryService } from '@app/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  countries: Country[] = [];
  filteredCountries: Country[] = [];

  page: number = 1;
  pageMax: number = 1;
  pageLength: number = 10;
  pageCountries: Country[] = [];

  sortAscending: boolean = true;
  filterCountryAreaCeil: string = '';
  filterRegion: string = '';

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

  ngOnInit(): void {
  }

  goToPage(page: number) {
    if(this.filteredCountries) {
      this.page = page;
      let areaCeil = this.countries.find(c => c.name == this.filterCountryAreaCeil)?.area;
      this.pageCountries = this.filteredCountries
      .filter(c => (this.filterRegion.length == 0 ? true : c.region == this.filterRegion) && (areaCeil ? c.area <= areaCeil : true))
      .slice((page - 1) * this.pageLength, page * this.pageLength);

      this.pageMax = Math.ceil(this.filteredCountries.length / this.pageLength);
    }
  }

  toggleSorting() {
    this.sortAscending = !this.sortAscending;

    if(this.sortAscending) {
      this.filteredCountries = this.countries.sort((c1, c2) => c1.name.localeCompare(c2.name));
      this.goToPage(1);
    } else {
      this.filteredCountries = this.countries.sort((c1, c2) => c2.name.localeCompare(c1.name));
      this.goToPage(1);
    }
  }

  setFilterRegion(region: string) {
    this.filterRegion = (this.filterRegion == region ? '' : region);
    this.goToPage(1);
  }

  setFilterSizeCountry(country: string) {
    this.filterCountryAreaCeil = (this.filterCountryAreaCeil == country ? '' : country);
    this.goToPage(1);
  }

}
