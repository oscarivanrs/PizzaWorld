import Button from "@/components/Button";
import { Colors } from "@/constants/Colors";
import { Link, Stack } from "expo-router";
import { useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";

const SignUp = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [errors, setErrors] = useState('');

    const validateInput = () => {
        setErrors('');
        if (!username) {
          setErrors('Username is required');
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

    const onSignUp = () => {
        if(!validateInput()) {
            return;
        }
        resetFields();
    }

    const resetFields = () => {
        setUsername('');
        setPassword('');
        setConfPassword('');
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: `Sign in` }} />

            <Text style={styles.label}>Username</Text>
            <TextInput value={username} onChangeText={setUsername} placeholder="username" style={styles.input} />

            <Text style={styles.label}>Password</Text>
            <TextInput value={password} onChangeText={setPassword} placeholder="password" style={styles.input} secureTextEntry={true}/>

            <Text style={styles.label}>Confirm Password</Text>
            <TextInput value={confPassword} onChangeText={setConfPassword} style={styles.input} secureTextEntry={true}/>

            <Text style={styles.error}>{errors}</Text>
            <Button onPress={onSignUp} text="Sign up" />
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