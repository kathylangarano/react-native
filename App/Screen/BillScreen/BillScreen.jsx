import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, FlatList, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import Colors from '../LoginScreen/Utils/Colors';
import { useOAuth } from "@clerk/clerk-expo";

export default function BillScreen() {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const [isModalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const onPress = async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }

  const screenWidth = Dimensions.get('window').width;

  const carouselData = [
    {
      id: '01',
      image: require("./../../../assets/images/factura1.png")
    },
    {
      id: '02',
      image: require("./../../../assets/images/factura2.jpeg")
    },
    {
      id: '03',
      image: require("./../../../assets/images/factura3.webp")
    },
    {
      id: '04',
      image: require("./../../../assets/images/factura1.png")
    },
    {
      id: '05',
      image: require("./../../../assets/images/factura2.jpeg")
    },
  ];

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.container}>
        <Image source={require('./../../../assets/images/home.png')} style={styles.logoImage} />
        <Image
          source={item.image}
          style={{ height: 200, width: screenWidth, marginTop:50 }}
        />
        <View style={styles.content}>
          <Text style={styles.heading}>Revisa tus facturas y genera tus informes</Text>
          <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>Ingresa tu ID Administrativo</Text>
          </TouchableOpacity>
        </View>

        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalHeading}>Ingresa tu ID y Contraseña</Text>
              <TextInput
                style={styles.input}
                placeholder="ID"
                value={id}
                onChangeText={setId}
              />
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
              />
              <Button title="Ingresar" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={carouselData}
        renderItem={renderItem}
        horizontal={true}
        pagingEnabled={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  logoImage: {
    width: '100%',
    height: 240,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: 25,
    fontFamily: 'outfit-bold',
    textAlign: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: Colors.SECONDARY,
    padding: 10,
    marginTop: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: Colors.WHITE,
    textAlign: 'center',
    fontFamily: 'outfit',
    fontSize: 17,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: Colors.WHITE,
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalHeading: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
});
