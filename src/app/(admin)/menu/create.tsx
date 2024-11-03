import Button from "@/components/Button";
import { Colors } from "@/constants/Colors";
import { defaultPizzaImage } from "@/constants/Images";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Image } from "react-native"
import * as ImagePicker from 'expo-image-picker';


const CreateProductScreen = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [errors, setErrors] = useState('');
    const [image, setImage] = useState<string | null>(null);

    const router = useRouter();

    const resetFields = () => {
        setName('');
        setPrice('');
    }

    const validateInput = () => {
        setErrors('');
        if (!name) {
          setErrors('Name is required');
          return false;
        }
        if (!price) {
          setErrors('Price is required');
          return false;
        }
        if (isNaN(parseFloat(price))) {
          setErrors('Price should be a number');
          return false;
        }
        return true;
      };

    const onCreate = () => {

        if (!validateInput()) {
            return;
          }

        console.warn('Creating ', name);
        resetFields();
        router.back();
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: `Create Product` }} />

            <Image source={{ uri: image || defaultPizzaImage }} style={styles.image} />
            <Text onPress={pickImage} style={styles.textButton}>Select image</Text>

            <Text style={styles.label}>Name:</Text>
            <TextInput value={name} onChangeText={setName} placeholder="name" style={styles.input} />

            <Text style={styles.label}>Price: ($)</Text>
            <TextInput value={price} onChangeText={setPrice} placeholder="5.99" style={styles.input} keyboardType="numeric"/>

            <Text style={styles.error}>{errors}</Text>
            <Button onPress={onCreate} text="Create"></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 10
      },
      image: {
        width: '50%',
        aspectRatio: 1,
        alignSelf: 'center',
      },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20
    },
    label: {
        color: 'gray',
        fontSize: 16
    },
    error: {
        color: 'red',
        textAlign: 'center',
    },
    textButton: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: Colors.light.tint,
        marginVertical: 10,
    }
});

export default CreateProductScreen;
