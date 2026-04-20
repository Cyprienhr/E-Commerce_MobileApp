
import { CartItem, Product } from '../types';

class CartService {
  private cartItems: CartItem[] = [];

  constructor() {
    this.loadCart();
  }

  private loadCart() {
    try {
      
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  }

  private saveCart() {
    try {
     
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  addToCart(product: Product, quantity: number = 1): void {
    const existingItem = this.cartItems.find(item => item.product.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({ product, quantity });
    }
    
    this.saveCart();
  }

  updateQuantity(productId: number, quantity: number): void {
    const cartItem = this.cartItems.find(item => item.product.id === productId);
    
    if (cartItem) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        cartItem.quantity = quantity;
        this.saveCart();
      }
    }
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    this.saveCart();
  }

  clearCart(): void {
    this.cartItems = [];
    this.saveCart();
  }

  getCartTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  getCartItemCount(): number {
    return this.cartItems.reduce((count, item) => count + item.quantity, 0);
  }
}

export default new CartService();
