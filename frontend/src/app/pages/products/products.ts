import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../services/product';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class Products implements OnInit {
  products: Product[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService.getAll().subscribe({
      next: (data: Product[]) => {
        this.products = data;
        this.isLoading = false;
      },
      error: (err: any) => {
        this.errorMessage = 'Hiba történt a termékek betöltésekor!';
        this.isLoading = false;
        console.error(err);
      }
    });
  }
}