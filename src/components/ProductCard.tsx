import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { COLORS } from '../constants';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(product)}
    >
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>⭐ {product.rating.rate}</Text>
          <Text style={styles.ratingCount}>({product.rating.count})</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: COLORS.WHITE,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.BLACK,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    backgroundColor: COLORS.WHITE,
  },
  info: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.BLACK,
    marginBottom: 4,
  },
  category: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.ACCENT,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 12,
    color: COLORS.BLACK,
  },
  ratingCount: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
});

export default ProductCard;
