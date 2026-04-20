import { AuthUser, User, SignupData } from '../types';

// Simple in-memory authentication service
class SimpleAuthService {
  private currentUser: AuthUser | null = null;
  private users: User[] = [
    // Add a default test user for easy login
    {
      id: 1,
      email: 'test@example.com',
      username: 'test',
      name: {
        firstname: 'Test',
        lastname: 'User',
      },
      phone: '',
      address: {
        city: '',
        street: '',
        number: 0,
        zipcode: '',
        geolocation: {
          lat: '0',
          long: '0',
        },
      },
    },
  ];

  async login(username: string, password: string): Promise<AuthUser> {

    if (password !== '123456') {
      throw new Error('Invalid credentials. Use any username with password "123456"');
    }

  
    let user = this.users.find(u => u.username === username);
    
    if (!user) {
  
      user = {
        id: this.users.length + 1,
        email: `${username}@example.com`,
        username,
        name: {
          firstname: username.charAt(0).toUpperCase() + username.slice(1),
          lastname: 'User',
        },
        phone: '',
        address: {
          city: '',
          street: '',
          number: 0,
          zipcode: '',
          geolocation: {
            lat: '0',
            long: '0',
          },
        },
      };
      this.users.push(user);
    }

    const authUser: AuthUser = {
      user,
      token: `token-${Date.now()}`,
    };

    this.currentUser = authUser;
    return authUser;
  }

  async signup(userData: SignupData): Promise<AuthUser> {
    if (this.users.some(u => u.username === userData.username)) {
      throw new Error('Username already exists');
    }

    if (this.users.some(u => u.email === userData.email)) {
      throw new Error('Email already exists');
    }

    const newUser: User = {
      id: this.users.length + 1,
      email: userData.email,
      username: userData.username,
      name: userData.name,
      phone: '',
      address: {
        city: '',
        street: '',
        number: 0,
        zipcode: '',
        geolocation: {
          lat: '0',
          long: '0',
        },
      },
    };

    this.users.push(newUser);

    const authUser: AuthUser = {
      user: newUser,
      token: `token-${Date.now()}`,
    };

    this.currentUser = authUser;
    return authUser;
  }

  async logout(): Promise<void> {
    this.currentUser = null;
  }

  getCurrentUser(): AuthUser | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }


  async signInWithGoogle(): Promise<AuthUser> {
    const mockUser: User = {
      id: Date.now(),
      email: 'googleuser@gmail.com',
      username: 'googleuser',
      name: {
        firstname: 'Google',
        lastname: 'User',
      },
      phone: '',
      address: {
        city: '',
        street: '',
        number: 0,
        zipcode: '',
        geolocation: {
          lat: '0',
          long: '0',
        },
      },
    };

    const authUser: AuthUser = {
      user: mockUser,
      token: `google-token-${Date.now()}`,
    };

    this.currentUser = authUser;
    return authUser;
  }

  // Get all registered users
  getAllUsers(): User[] {
    return this.users;
  }
}

export default new SimpleAuthService();
