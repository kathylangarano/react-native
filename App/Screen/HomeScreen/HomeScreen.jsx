import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  VirtualizedList,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../LoginScreen/Utils/Colors';

const getItem = (_data, index) => ({
  id: Math.random().toString(12).substring(0),
  title: `Product ${index + 1}`,
  price: (Math.random() * 100).toFixed(2),
  description: `Description for Product ${index + 1}`,
  image: `https://via.placeholder.com/150?text=Product${index + 1}`, // Replace with actual image URLs
});

const getItemCount = _data => 50;

const Item = ({ title, price, description, image, onSelect }) => (
  <TouchableOpacity onPress={onSelect} style={styles.item}>
    <Image source={{ uri: image }} style={styles.image} />
    <View style={styles.textContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>${price}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
    <MaterialCommunityIcons
      name="cart-plus"
      size={30}
      color={Colors.PRIMARY}
    />
  </TouchableOpacity>
);

export default function HomeScreen() {
  const [cart, setCart] = useState([]);
  const [isCartVisible, setCartVisible] = useState(false);

  const addToCart = product => {
    setCart(prevCart => [...prevCart, product]);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);
  };

  const clearCart = () => {
    setCart([]);
    setCartVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('./../../../assets/images/bills.png')} style={styles.logoImage} />
      <VirtualizedList
        initialNumToRender={4}
        renderItem={({ item }) => (
          <Item {...item} onSelect={() => addToCart(item)} />
        )}
        keyExtractor={item => item.id}
        getItemCount={getItemCount}
        getItem={getItem}
      />

      <TouchableOpacity
        style={styles.cartContainer}
        onPress={() => setCartVisible(true)}
      >
        <MaterialCommunityIcons
          name="cart"
          size={30}
          color={Colors.PRIMARY}
        />
        <Text style={styles.cartText}>Cart: {cart.length} items</Text>
      </TouchableOpacity>

      <Modal
        visible={isCartVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setCartVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Cart Items</Text>
          <FlatList
            data={cart}
            renderItem={({ item }) => (
              <Text style={styles.cartItem}>{item.title} - ${item.price}</Text>
            )}
            keyExtractor={item => item.id}
          />
          <Text style={styles.totalPrice}>Total: ${getTotalPrice()}</Text>
          <TouchableOpacity
            style={styles.clearButton}
            onPress={clearCart}
          >
            <Text style={styles.clearButtonText}>Clear Cart</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  item: {
    backgroundColor: Colors.PRIMARY,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 150,
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 12, // Add rounded corners
    overflow: 'hidden', // Clip the contents to the rounded shape
    marginTop: 20,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  logoImage: {
    width: '100%',
    height: 240,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: 'green',
  },
  description: {
    fontSize: 14,
    color: 'gray',
  },
  cartContainer: {
    borderTopWidth: 1,
    borderColor: 'gray',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  cartText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: StatusBar.currentHeight || 0,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cartItem: {
    fontSize: 16,
    marginBottom: 10,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  clearButton: {
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
