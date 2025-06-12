// import { Redirect } from "expo-router";

// export default function Index() {
//   const isAuth = false; // Your auth logic here
  
//   if (isAuth) {
//     return <Redirect href="/(tabs)" />;
//   }
  
//   return <Redirect href="/auth" />;
// }


import { useAuth } from "@/lib/auth-context";
import { Redirect } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';

export default function Index() {
  const { user, isLoadingUser } = useAuth();
  
  // Show loading while checking auth status
  if (isLoadingUser) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  
  // Redirect based on auth status
  if (user) {
    return <Redirect href="/(tabs)" />;
  }
  
  return <Redirect href="/auth" />;
}
