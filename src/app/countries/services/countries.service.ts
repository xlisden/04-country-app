import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({ providedIn: 'root' })
export class CountriesService {
	private apiUrl: string = 'https://restcountries.com/v3.1';

	constructor(private httpClient: HttpClient) { }

  searchCountryByAlphaCode(code: string): Observable<Country | null> {
		return this.httpClient
			.get<Country[]>(`${ this.apiUrl }/alpha/${ code }`)
			.pipe(
        map(countries => countries.length > 0 ? countries[0] : null),
				catchError(error => of(null)) //agarra el error, y regresa un arreglo vacio
			);
	}

	searchCapital(capital: string): Observable<Country[]> {
		return this.httpClient
			.get<Country[]>(`${ this.apiUrl }/capital/${ capital }`)
			.pipe(
				catchError(error => of([])) //agarra el error, y regresa un arreglo vacio
				// catchError((error) => {
				// 	console.log(error);
				// 	return of([]);
				// })
			);
	}

	searchCountry(country: string): Observable<Country[]> {
		return this.httpClient
			.get<Country[]>(`${ this.apiUrl }/name/${ country }`)
			.pipe(
				catchError(error => of([])) //agarra el error, y regresa un arreglo vacio
			);
	}

	searchRegion(region: string): Observable<Country[]> {
		return this.httpClient
			.get<Country[]>(`${ this.apiUrl }/region/${ region }`)
			.pipe(
				catchError(error => of([])) //agarra el error, y regresa un arreglo vacio
			);
	}
}
