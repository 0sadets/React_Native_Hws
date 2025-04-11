import { View, Text, Button, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { router } from 'expo-router';


export default function StartScreen() {
  return (
    <ImageBackground source={{ uri: 'https://media.istockphoto.com/id/2172581181/photo/delicate-background-with-pink-flowers.jpg?s=612x612&w=0&k=20&c=HEKB3e7MP1do6AA_vj180YVJvrD9vcYh3sP97zgZgy4=' }}
    resizeMode="cover"
    style={styles.background}
    blurRadius={3}
  >
    <View style={styles.container}>
      <Text style={styles.title}>Визначення темпераменту</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/quiz')} >
        <Text style={styles.buttonText}>Старт</Text>
      </TouchableOpacity>
      
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: { 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: "white",
    padding: 12,
    borderRadius:15 },
  title: { fontSize: 24, marginBottom: 20 },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
});

