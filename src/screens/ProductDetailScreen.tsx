import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { COLORS } from '../constants';
import cartService from '../services/cart';
import { Product } from '../types';

type RootStackParamList = {
  ProductDetail: { product: Product };
};

type ProductDetailRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;

interface Props {
  route: ProductDetailRouteProp;
}

const ProductDetailScreen: React.FC<Props> = ({ route }) => {
  const { product } = route.params;

  const addToCart = () => {
    cartService.addToCart(product, 1);
    Alert.alert(
      'Added to Cart',
      `${product.title} has been added to your cart.`,
      [{ text: 'OK', style: 'default' }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.category}>{product.category}</Text>
        
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>⭐ {product.rating.rate}</Text>
          <Text style={styles.ratingCount}>({product.rating.count} reviews)</Text>
        </View>

        <Text style={styles.price}>${product.price.toFixed(2)}</Text>

        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>

        <TouchableOpacity style={styles.addToCartButton} onPress={addToCart}>
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  imageContainer: {
    backgroundColor: COLORS.WHITE,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BLACK,
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    backgroundColor: COLORS.WHITE,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.BLACK,
    marginBottom: 8,
  },
  category: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  rating: {
    fontSize: 16,
    color: COLORS.BLACK,
    fontWeight: '600',
  },
  ratingCount: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.ACCENT,
    marginBottom: 24,
  },
  descriptionContainer: {
    marginBottom: 32,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.BLACK,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.BLACK,
  },
  addToCartButton: {
    backgroundColor: COLORS.ACCENT,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  addToCartButtonText: {
    color: COLORS.WHITE,
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ProductDetailScreen;
