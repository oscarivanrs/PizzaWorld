import Button from "@/components/Button";
import { Colors } from "@/constants/Colors";
import { supabase } from "@/lib/supabase";
import { Link, Stack } from "expo-router";
import { useState } from "react";
import { View, StyleSheet, Text, TextInput, Pressable } from "react-native";

const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');
    const [loading, setLoading] = useState(false);

    async function signInWithEmail() {
      if(!validateInput()) {
        return;
      }
      setLoading(true)
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })
  
      if (error) setErrors(error.message)
      setLoading(false);
      resetFields();
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
        }
        return true;
      };

    const resetFields = () => {
      setEmail('');
      setPassword('');
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: `Sign in` }} />

            <Text style={styles.label}>Username</Text>
            <TextInput value={email} onChangeText={setEmail} placeholder="username" style={styles.input} />

            <Text style={styles.label}>Password</Text>
            <TextInput value={password} onChangeText={setPassword} placeholder="password" style={styles.input} secureTextEntry={true}/>

            <Text style={styles.error}>{errors}</Text>
            <Button onPress={signInWithEmail} disabled={loading} text={loading ? "Signin in..." : "Sign in"} />
            <Link href="/signup" style={styles.textButton}>Create an account</Link>
        </View>
    );
}

export default SignIn;

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