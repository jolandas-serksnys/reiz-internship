import { Component, OnInit } from '@angular/core';
import { Country } from '@app/models';
import { CountryService } from '@app/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  countries: Country[] = [];

  page: number = 1;
  pageMax: number = 1;
  pageLength: number = 10;
  pageCountries: Country[] = [];

  constructor(
    private countryService: CountryService
  ) {
    countryService.getAll().subscribe({
      next: (res: Country[]) => {
        this.countries = res;
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
    if(this.countries) {
      this.page = page;
      this.pageCountries = this.countries.slice((page - 1) * this.pageLength, page * this.pageLength);
    }
  }

}