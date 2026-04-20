import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { COLORS } from '../constants';
import { productService } from '../services/api';
import { Product } from '../types';

type RootStackParamList = {
  Main: undefined;
  ProductDetail: { product: Product };
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

const HomeScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [productsData, categoriesData] = await Promise.all([
        productService.getAllProducts(),
        productService.getCategories(),
      ]);
      setProducts(productsData);
      setCategories(['all', ...categoriesData]);
    } catch {
      // Handle error silently for now
    } finally {
      setLoading(false);
    }
  };

  const loadProducts = useCallback(async () => {
    try {
      if (selectedCategory === 'all') {
        const productsData = await productService.getAllProducts();
        setProducts(productsData);
      } else {
        const productsData = await productService.getProductsByCategory(selectedCategory);
        setProducts(productsData);
      }
    } catch {
      // Handle error silently for now
    }
  }, [selectedCategory]);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const navigateToProductDetail = (product: Product) => {
    navigation.navigate('ProductDetail', { product });
  };

  const renderProductItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigateToProductDetail(item)}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.productCategory}>{item.category}</Text>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>⭐ {item.rating.rate}</Text>
          <Text style={styles.ratingCount}>({item.rating.count})</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderCategoryItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item && styles.selectedCategory,
      ]}
      onPress={() => setSelectedCategory(item)}
    >
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item && styles.selectedCategoryText,
        ]}
      >
        {item.charAt(0).toUpperCase() + item.slice(1)}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.ACCENT} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>E-Commerce Store</Text>
      </View>

      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesList}
        contentContainerStyle={styles.categoriesContent}
      />

      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.productsList}
        columnWrapperStyle={styles.productsRow}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  categoriesList: {
    flexGrow: 0,
    backgroundColor: COLORS.WHITE,
  },
  categoriesContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  categoryItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor: COLORS.BLACK,
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCategory: {
    backgroundColor: COLORS.ACCENT,
    borderColor: COLORS.ACCENT,
  },
  categoryText: {
    color: COLORS.BLACK,
    fontSize: 14,
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: COLORS.WHITE,
  },
  productsList: {
    padding: 16,
  },
  productsRow: {
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    backgroundColor: COLORS.WHITE,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.BLACK,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    backgroundColor: COLORS.WHITE,
  },
  productInfo: {
    padding: 12,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.BLACK,
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  productPrice: {
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

export default HomeScreen;
