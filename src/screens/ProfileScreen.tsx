import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { COLORS } from '../constants';
import { useAuth } from '../context/AuthContext';

const ProfileScreen = () => {
  const { user: currentUser, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
            // Navigation will be handled by the root navigator
          },
        },
      ]
    );
  };

  const renderProfileItem = (title: string, value: string) => (
    <View style={styles.profileItem}>
      <Text style={styles.profileLabel}>{title}</Text>
      <Text style={styles.profileValue}>{value}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <View style={styles.profileSection}>
        <Text style={styles.sectionTitle}>Account Information</Text>
        
        {currentUser ? (
          <>
            {renderProfileItem('Name', `${currentUser.user.name.firstname} ${currentUser.user.name.lastname}`)}
            {renderProfileItem('Username', currentUser.user.username)}
            {renderProfileItem('Email', currentUser.user.email)}
            {currentUser.user.phone && renderProfileItem('Phone', currentUser.user.phone)}
          </>
        ) : (
          <Text style={styles.noDataText}>No user data available</Text>
        )}
      </View>

      <View style={styles.menuSection}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>Order History</Text>
          <Text style={styles.menuItemArrow}>{'>'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>Shipping Address</Text>
          <Text style={styles.menuItemArrow}>{'>'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>Payment Methods</Text>
          <Text style={styles.menuItemArrow}>{'>'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>Settings</Text>
          <Text style={styles.menuItemArrow}>{'>'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>Help & Support</Text>
          <Text style={styles.menuItemArrow}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BLACK,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.BLACK,
  },
  profileSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.BLACK,
    marginBottom: 16,
  },
  profileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  profileLabel: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  profileValue: {
    fontSize: 16,
    color: COLORS.BLACK,
    fontWeight: '600',
  },
  noDataText: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 20,
  },
  menuSection: {
    padding: 16,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemText: {
    fontSize: 16,
    color: COLORS.BLACK,
    fontWeight: '500',
  },
  menuItemArrow: {
    fontSize: 18,
    color: COLORS.BLACK,
    fontWeight: 'bold',
  },
  logoutButton: {
    margin: 16,
    backgroundColor: '#ff4444',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: COLORS.WHITE,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen;
