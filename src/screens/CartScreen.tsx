import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import { COLORS } from '../constants';
import cartService from '../services/cart';
import { CartItem } from '../types';

const CartScreen = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = () => {
    const items = cartService.getCartItems();
    setCartItems(items);
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    // Optimistic UI update - update state immediately
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.product.id === productId 
          ? { ...item, quantity }
          : item
      )
    );
    
    // Then update the service
    cartService.updateQuantity(productId, quantity);
  };

  const removeFromCart = (productId: number) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            // Optimistic UI update - remove from state immediately
            setCartItems(prevItems => 
              prevItems.filter(item => item.product.id !== productId)
            );
            
            // Then update the service
            cartService.removeFromCart(productId);
          },
        },
      ]
    );
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    Alert.alert(
      'Checkout',
      `Total: $${getTotalPrice().toFixed(2)}\n\nProceed to checkout?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Checkout',
          style: 'default',
          onPress: () => {
            Alert.alert('Success', 'Order placed successfully!');
            cartService.clearCart();
            loadCartItems();
          },
        },
      ]
    );
  };

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.product.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle} numberOfLines={2}>
          {item.product.title}
        </Text>
        <Text style={styles.productPrice}>${item.product.price.toFixed(2)}</Text>
        <View style={styles.quantityControls}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.product.id, item.quantity - 1)}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.product.id, item.quantity + 1)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeFromCart(item.product.id)}
      >
        <Text style={styles.removeButtonText}>×</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shopping Cart</Text>
        <Text style={styles.itemCount}>{cartItems.length} items</Text>
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyCart}>
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
          <Text style={styles.emptyCartSubtext}>Add some products to get started</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.product.id.toString()}
            contentContainerStyle={styles.cartList}
          />
          <View style={styles.footer}>
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalAmount}>${getTotalPrice().toFixed(2)}</Text>
            </View>
            <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
              <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BLACK,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.BLACK,
  },
  itemCount: {
    fontSize: 16,
    color: '#666',
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyCartText: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.BLACK,
    marginBottom: 8,
  },
  emptyCartSubtext: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  cartList: {
    padding: 16,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: COLORS.WHITE,
    borderRadius: 8,
    marginBottom: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.BLACK,
  },
  productImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    backgroundColor: COLORS.WHITE,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.BLACK,
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.ACCENT,
    marginBottom: 8,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.BLACK,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  quantityButtonText: {
    color: COLORS.WHITE,
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    marginHorizontal: 16,
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.BLACK,
  },
  removeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ff4444',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  removeButtonText: {
    color: COLORS.WHITE,
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.BLACK,
    backgroundColor: COLORS.WHITE,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.BLACK,
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.ACCENT,
  },
  checkoutButton: {
    backgroundColor: COLORS.ACCENT,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: COLORS.WHITE,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CartScreen;
