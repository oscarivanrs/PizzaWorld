import Button from "@/components/Button";
import { Colors } from "@/constants/Colors";
import { defaultPizzaImage } from "@/constants/Images";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Image, Alert, ActivityIndicator } from "react-native"
import * as ImagePicker from 'expo-image-picker';
import { useDeleteProduct, useInsertProduct, useProduct, useUpdateProduct } from "@/app/api/products";
import { useDownloadImage, useUploadImage } from "@/app/api/bucket";


const CreateProductScreen = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [errors, setErrors] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const { id: idString } = useLocalSearchParams();
    const id = (!!idString ? parseFloat(
      typeof idString === 'string' ? idString : idString?.[0]
    ) : 0) ;
    const [downloadedImage, setDownloadedImage] = useState<string | null>(null);
    const { imagePath, isLoading } = useDownloadImage(downloadedImage ?? defaultPizzaImage);

    const { mutate: insertProduct } = useInsertProduct();
    const { mutate: updateProduct } = useUpdateProduct();
    const { data: updatingProduct } = useProduct(id);
    const { mutate: deleteProduct } = useDeleteProduct();

    const { uploadImage, isUploading } = useUploadImage();
    
    const actionTitle: string = (!!idString ? "Update" : "Create" );

    const router = useRouter();

    useEffect(()=>{
      if(!!idString && updatingProduct) {
        setName(updatingProduct.name);
        setPrice(updatingProduct.price.toString());
        setDownloadedImage(updatingProduct.image);
      }
      if(imagePath) {
        setImage(imagePath)
      }
    },[updatingProduct,imagePath])

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

    const onCreate = async () => {

        if (!validateInput()) {
          return;
        }

        const imagepath = await uploadImage(image)

        insertProduct(
          { name, price: parseFloat(price), image: imagepath },
          {
            onSuccess: () => {
              resetFields();
              router.back();
            },
          }
        );
    }

    const onUpdate = async () => {
      if (!validateInput()) {
        return;
      }
      const imagepath = await uploadImage(image)
      updateProduct(
        { id, name, price: parseFloat(price), image: imagepath },
        {
          onSuccess: () => {
            resetFields();
            router.back();
          },
        }
      );
    };

    const onSubmit = () => {
        if(!!idString) {
          onUpdate();
        } else {
          onCreate();
        }
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };

    const onDelete = () => {
        deleteProduct(id,{
          onSuccess: () => {
            resetFields();
            router.replace('/(admin)')
          },
        });
    }

    const confirmDelete = () => {
        Alert.alert("Confirm", `Delete product id ${id}?`, [
            {
                text: "Cancel"
            },
            {
                text: "Delete",
                style: 'destructive',
                onPress: onDelete
            }
        ]);
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: `${actionTitle} Product` }} />

            {isLoading ? (
              <ActivityIndicator size="large" color={Colors.light.tint} />
            ) : (
              <Image source={{ uri: image || defaultPizzaImage }} style={styles.image} />
            )}
            <Text onPress={pickImage} style={styles.textButton}>Select image</Text>

            <Text style={styles.label}>Name:</Text>
            <TextInput value={name} onChangeText={setName} placeholder="name" style={styles.input} />

            <Text style={styles.label}>Price: ($)</Text>
            <TextInput value={price} onChangeText={setPrice} placeholder="5.99" style={styles.input} keyboardType="numeric"/>

            <Text style={styles.error}>{errors}</Text>
            { isLoading || isUploading ? (
              <ActivityIndicator size="large" color={Colors.light.tint} />
            ) : (
              <Button onPress={onSubmit} text={actionTitle}></Button>
            )}
            { (!!id && !isLoading && !isUploading) && <Text onPress={confirmDelete} style={styles.textButton}>Delete</Text> }
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
