import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RickAndMortyResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  origin: { name: string };
  location: { name: string };
}

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyService {
  // Proxy-n keresztül hívjuk az API-t
  private apiUrl = '/rickandmorty/api/character';

  constructor(private http: HttpClient) {}

  getCharacters(page: number): Observable<RickAndMortyResponse> {
    return this.http.get<RickAndMortyResponse>(`${this.apiUrl}?page=${page}`);
  }
}
