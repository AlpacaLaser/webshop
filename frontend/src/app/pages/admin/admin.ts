import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../services/product';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.scss'
})
export class Admin implements OnInit {
  products: Product[] = [];
  isLoading = true;
  errorMessage = '';

  // Űrlap adatok
  editingProduct: Product | null = null;
  newProduct: Product = this.emptyProduct();

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  // Üres termék sablon
  emptyProduct(): Product {
    return {
      name: '',
      description: '',
      price: 0,
      category: '',
      stock: 0,
      imageUrl: ''
    };
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService.getAll().subscribe({
      next: (data: Product[]) => {
        this.products = data;
        this.isLoading = false;
      },
      error: (err: any) => {
        this.errorMessage = 'Hiba történt!';
        this.isLoading = false;
      }
    });
  }

  // Új termék mentése
  createProduct(): void {
    this.productService.create(this.newProduct).subscribe({
      next: () => {
        this.newProduct = this.emptyProduct();
        this.loadProducts();
      },
      error: (err: any) => console.error(err)
    });
  }

  // Szerkesztés megkezdése
  startEdit(product: Product): void {
    this.editingProduct = { ...product };
  }

  // Szerkesztés mentése
  saveEdit(): void {
    if (!this.editingProduct?.id) return;
    this.productService.update(this.editingProduct.id, this.editingProduct).subscribe({
      next: () => {
        this.editingProduct = null;
        this.loadProducts();
      },
      error: (err: any) => console.error(err)
    });
  }

  // Szerkesztés megszakítása
  cancelEdit(): void {
    this.editingProduct = null;
  }

  // Termék törlése
  deleteProduct(id: string): void {
    if (!confirm('Biztosan törlöd?')) return;
    this.productService.delete(id).subscribe({
      next: () => this.loadProducts(),
      error: (err: any) => console.error(err)
    });
  }
}