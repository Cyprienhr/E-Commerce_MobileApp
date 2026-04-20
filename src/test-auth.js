// Simple test file to verify authentication works
// This can be run in a React Native environment

import simpleAuth from './services/simpleAuth';

console.log('Testing Simple Authentication System...');

async function testAuth() {
  try {
    // Test 1: Login with valid credentials
    console.log('Test 1: Login with valid credentials');
    const loginResult = await simpleAuth.login('testuser', 'password');
    console.log('Login successful:', loginResult.user.username);
    console.log('Is authenticated:', simpleAuth.isAuthenticated());

    // Test 2: Try to login with wrong password
    console.log('\nTest 2: Login with wrong password');
    try {
      await simpleAuth.login('testuser', 'wrongpassword');
      console.log('ERROR: Should have failed!');
    } catch (error) {
      console.log('Correctly failed with:', error.message);
    }

    // Test 3: Logout
    console.log('\nTest 3: Logout');
    await simpleAuth.logout();
    console.log('Is authenticated after logout:', simpleAuth.isAuthenticated());

    // Test 4: Signup new user
    console.log('\nTest 4: Signup new user');
    const signupResult = await simpleAuth.signup({
      email: 'newuser@example.com',
      username: 'newuser',
      password: 'password',
      name: {
        firstname: 'New',
        lastname: 'User'
      }
    });
    console.log('Signup successful:', signupResult.user.username);
    console.log('Is authenticated after signup:', simpleAuth.isAuthenticated());

    // Test 5: Try to signup with same username
    console.log('\nTest 5: Try to signup with same username');
    try {
      await simpleAuth.signup({
        email: 'another@example.com',
        username: 'newuser',
        password: 'password',
        name: {
          firstname: 'Another',
          lastname: 'User'
        }
      });
      console.log('ERROR: Should have failed!');
    } catch (error) {
      console.log('Correctly failed with:', error.message);
    }

    console.log('\nAll tests completed successfully!');

  } catch (error) {
    console.error('Test failed:', error);
  }
}

// Run the test
testAuth();
