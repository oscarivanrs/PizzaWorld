import { View, Text, Button, StyleSheet } from 'react-native';
import React from 'react';
import { useAuth } from '../providers/AuthProvider';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';

const ProfileScreen = () => {

  const { profile, dologout, isAdmin } = useAuth();
  const router = useRouter();

  const goBack = () => {
    router.push('/');
  }

  const logout = async () => {
      dologout();
    }
  
  return (
    <View style={styles.container}>
      <Text style={styles.username}>{profile?.full_name}</Text>
      {isAdmin ? 
      <Button onPress={goBack} title="Main"/> : null}
      <Button onPress={logout} title="Sign out"/>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    padding: 10,
    borderRadius: 20,
    flex: 1,
    margin: 2,
    flexDirection: 'column',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 5,
    color: Colors.light.tint
  }
  });