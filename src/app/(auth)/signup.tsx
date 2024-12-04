import Button from "@/components/Button";
import { Colors } from "@/constants/Colors";
import { supabase } from "@/lib/supabase";
import { useNavigation } from "@react-navigation/native";
import { Link, Stack } from "expo-router";
import { useState } from "react";
import { View, StyleSheet, Text, TextInput, Alert } from "react-native";

const SignUp = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [errors, setErrors] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    async function signUpWithEmail() {
      if(!validateInput()) {
        return;
      }
      setLoading(true)
      const {
        data: { session },
        error,
      } = await supabase.auth.signUp({
        email: email,
        password: password,
      })
  
      if (error) setErrors(error.message)
      if (!session) { 
        Alert.alert('Please check your inbox for email verification!')
      } else {
        Alert.alert('Reg OK!')
        resetFields();
        navigation.navigate('signin');
      }
      setLoading(false)
    }

    const validateInput = () => {
        setErrors('');
        if (!email) {
          setErrors('Email is required');
          return false;
        }
        if (!password) {
          setErrors('Password is required');
          return false;
        } else {
            if(!confPassword || confPassword!=password) {
                setErrors('Confirm password does not match');
                return false;
            }
        }
        return true;
      };

    const resetFields = () => {
        setEmail('');
        setPassword('');
        setConfPassword('');
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: `Sign in` }} />

            <Text style={styles.label}>Email</Text>
            <TextInput value={email} onChangeText={setEmail} placeholder="email@address.com" style={styles.input} />

            <Text style={styles.label}>Password</Text>
            <TextInput value={password} onChangeText={setPassword} placeholder="password" style={styles.input} secureTextEntry={true}/>

            <Text style={styles.label}>Confirm Password</Text>
            <TextInput value={confPassword} onChangeText={setConfPassword} style={styles.input} secureTextEntry={true}/>

            <Text style={styles.error}>{errors}</Text>
            <Button onPress={signUpWithEmail} disabled={loading} text={loading ? "Signin up..." : "Sign up"} />
            <Link href="/signin" style={styles.textButton}>Already have an account</Link>
        </View>
    );
}

export default SignUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 10
      },
      label: {
        color: 'gray',
        fontSize: 16
      },
      input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20
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