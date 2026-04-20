// Mock AsyncStorage implementation for now
const AsyncStorage = {
  getItem: async (_key: string) => {
    // Mock implementation - return null for now
    return Promise.resolve(null);
  },
  setItem: async (_key: string, _value: string) => {
    // Mock implementation - do nothing for now
    return Promise.resolve();
  },
  removeItem: async (_key: string) => {
    // Mock implementation - do nothing for now
    return Promise.resolve();
  },
};
import { AuthUser, User, SignupData } from '../types';
import { userService } from './api';

const STORAGE_KEYS = {
  USER: 'user',
  TOKEN: 'token',
};

class AuthService {
  private tempUsers: User[] = [];
  private currentUser: AuthUser | null = null;

  constructor() {
    this.loadStoredUser();
  }

  private async loadStoredUser() {
    try {
      const userStr = await AsyncStorage.getItem(STORAGE_KEYS.USER);
      const token = await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
      
      if (userStr && token) {
        this.currentUser = {
          user: JSON.parse(userStr),
          token,
        };
      }
    } catch (error) {
      console.error('Error loading stored user:', error);
    }
  }

  async login(username: string, password: string): Promise<AuthUser> {
    try {
      // Try login with FakeStoreAPI first
      const response = await userService.loginUser(username, password);
      
      const authUser: AuthUser = {
        user: {
          id: 1, // Mock user ID since API doesn't return full user
          email: `${username}@example.com`,
          username,
          name: {
            firstname: 'John',
            lastname: 'Doe',
          },
        },
        token: response.token,
      };

      this.currentUser = authUser;
      await this.storeUser(authUser);
      
      return authUser;
    } catch {
      // Fallback to temp users
      const user = this.tempUsers.find(u => u.username === username);
      if (user) {
        const authUser: AuthUser = {
          user,
          token: 'temp-token-' + Date.now(),
        };
        
        this.currentUser = authUser;
        await this.storeUser(authUser);
        
        return authUser;
      }
      throw new Error('Invalid credentials');
    }
  }

  async signup(userData: SignupData): Promise<AuthUser> {
    const newUser: User = {
      id: this.tempUsers.length + 2, // Start from 2 to avoid conflicts
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

    this.tempUsers.push(newUser);

    const authUser: AuthUser = {
      user: newUser,
      token: 'temp-token-' + Date.now(),
    };

    this.currentUser = authUser;
    await this.storeUser(authUser);

    return authUser;
  }

  async logout(): Promise<void> {
    this.currentUser = null;
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.USER);
      await AsyncStorage.removeItem(STORAGE_KEYS.TOKEN);
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }

  getCurrentUser(): AuthUser | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  private async storeUser(authUser: AuthUser): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(authUser.user));
      await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, authUser.token);
    } catch (error) {
      console.error('Error storing user:', error);
    }
  }

  // Google Sign-In placeholder
  async signInWithGoogle(): Promise<AuthUser> {
    // This would integrate with @react-native-google-signin/google-signin
    // For now, return a mock user
    const mockUser: User = {
      id: Date.now(),
      email: 'googleuser@gmail.com',
      username: 'googleuser',
      name: {
        firstname: 'Google',
        lastname: 'User',
      },
    };

    const authUser: AuthUser = {
      user: mockUser,
      token: 'google-token-' + Date.now(),
    };

    this.currentUser = authUser;
    await this.storeUser(authUser);

    return authUser;
  }
}

export default new AuthService();
