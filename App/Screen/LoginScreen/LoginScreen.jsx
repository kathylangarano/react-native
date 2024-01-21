import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Colors from './Utils/Colors';
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from '../../../hooks/warmUpBrowser';
import { useOAuth } from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
    useWarmUpBrowser();
 
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const onPress=async()=>{
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
  return (
    <View style={styles.container}>
      <Image source={require('./../../../assets/images/Logo.png')} style={styles.logoImage} />
      <Image source={require('./../../../assets/images/ecommerce.png')} style={styles.bgImage} />
      <View style={styles.content}>
        <Text style={styles.heading}>Explora, Compra, Conquista</Text>
        <Text style={styles.desc}>La Plataforma Sin Fronteras</Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Login With Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  logoImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  bgImage: {
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
  desc: {
    fontSize: 20,
    fontFamily: 'outfit-medium',
    textAlign: 'center',
    color: Colors.PRIMARY,
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
});
