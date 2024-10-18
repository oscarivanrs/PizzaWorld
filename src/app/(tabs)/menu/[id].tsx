import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';

export default function productDetails() {
    const { id } = useLocalSearchParams();

    return (
        <Text>Product Details: {id}</Text>
    );
}