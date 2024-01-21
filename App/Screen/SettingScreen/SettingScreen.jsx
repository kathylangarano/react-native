import React, { useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity, Modal, Button } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Facturas',
    icon: 'rocket', // Nombre del icono para Facturas
    description: 'Descripción de Facturas...',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Usuarios',
    icon: 'account', // Nombre del icono para Usuarios
    description: 'Descripción de Usuarios...',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Inventario',
    icon: 'book', // Nombre del icono para Inventario
    description: 'Descripción de Inventario...',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d73',
    title: 'Transacciones',
    icon: 'briefcase', // Nombre del icono para Transacciones
    description: 'Descripción de Transacciones...',
  },
  {
    id: '78694a0f-3da1-471f-bd96-145571e29d76',
    title: 'Informes',
    icon: 'chart-pie', // Nombre del icono para Informes
    description: 'Descripción de Informes...',
  },
];

const Item = ({ title, icon, description, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <View style={styles.iconContainer}>
      <MaterialCommunityIcons name={icon} size={30} color="#000000" />
    </View>
    <Text style={styles.title}>{title}</Text>
    <MaterialCommunityIcons name="chevron-down" size={30} color="#000000" />
    <Modal
      animationType="slide"
      transparent={true}
      visible={false} // Set this to true to show the modal by default
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalDescription}>{description}</Text>
          <Button title="Cerrar" onPress={onPress} />
        </View>
      </View>
    </Modal>
  </TouchableOpacity>
);

export default function SettingScreen() {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    console.log('Item clicked:', item);
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <Item
            title={item.title}
            icon={item.icon}
            description={item.description}
            onPress={() => handleItemClick(item)}
          />
        )}
        keyExtractor={(item) => item.id}
      />

      {selectedItem && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={true}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedItem.title}</Text>
              <Text style={styles.modalDescription}>{selectedItem.description}</Text>
              <Button title="Cerrar" onPress={closeModal} />
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEEEE',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  iconContainer: {
    marginRight: 10,
  },
  title: {
    fontSize: 25,
    marginLeft: 10,
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  modalDescription: {
    fontSize: 16,
    textAlign: 'center',
  },
});
