import Button from '@/components/Button';
import { Link, Redirect } from 'expo-router';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from './providers/AuthProvider';
import { supabase } from '@/lib/supabase';

const index = () => {
  const {session,loading,isAdmin} = useAuth();
  if(loading) {
    return <ActivityIndicator />
  }
  if(!session) {
    return <Redirect href='/signin' />
  }
  if(!isAdmin) {
    return <Redirect href='/(user)' />
  }
  return ( 
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      <Link href={'/(user)'} asChild>
        <Button text="User" />
      </Link>
      <Link href={'/(admin)'} asChild>
        <Button text="Admin" disabled={!isAdmin}/>
      </Link>
      {/*<Link href={'/signin'} asChild disabled={!!session}>
        <Button text="Sign in" />
      </Link>*/}
      <Button onPress={() => supabase.auth.signOut()} disabled={!session} text="Sign out"/>
    </View>
  );
};

export default index;