import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RickAndMortyService, Character } from '../../services/rick-and-morty';

@Component({
  selector: 'app-rick-and-morty',
  imports: [CommonModule],
  templateUrl: './rick-and-morty.html',
  styleUrl: './rick-and-morty.scss'
})
export class RickAndMorty implements OnInit {
  characters: Character[] = [];
  isLoading = true;
  errorMessage = '';
  
  // Pagination változók
  currentPage = 1;
  totalPages = 1;

  constructor(private rickAndMortyService: RickAndMortyService) {}

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(): void {
    this.isLoading = true;
    this.rickAndMortyService.getCharacters(this.currentPage).subscribe({
      next: (data) => {
        this.characters = data.results;
        this.totalPages = data.info.pages;
        this.isLoading = false;
      },
      error: (err: any) => {
        this.errorMessage = 'Hiba történt a karakterek betöltésekor!';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  // Következő oldal
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadCharacters();
    }
  }

  // Előző oldal
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadCharacters();
    }
  }

  // Státusz badge színe
  getStatusClass(status: string): string {
    switch (status) {
      case 'Alive': return 'bg-success';
      case 'Dead': return 'bg-danger';
      default: return 'bg-secondary';
    }
  }
}
