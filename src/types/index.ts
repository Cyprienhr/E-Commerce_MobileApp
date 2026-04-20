export interface User {
  id: number;
  email: string;
  username: string;
  name: {
    firstname: string;
    lastname: string;
  };
  phone?: string;
  address?: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
    geolocation: {
      lat: string;
      long: string;
    };
  };
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  id: number;
  userId: number;
  date: string;
  products: {
    productId: number;
    quantity: number;
  }[];
}

export interface AuthUser {
  user: User;
  token: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface SignupData {
  email: string;
  username: string;
  password: string;
  name: {
    firstname: string;
    lastname: string;
  };
}
