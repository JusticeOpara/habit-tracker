import AuthProvider from "@/lib/auth-context";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

// const RouteGuard = ({ children }: { children: ReactNode }) => {
//   const router = useRouter();
//   const { user, isLoadingUser } = useAuth();
//   const segments = useSegments();

//   useEffect(() => {
//     const inAuthGroup = segments[0] === "auth";
//     if (!user && !inAuthGroup && isLoadingUser) {
//       router.replace("/auth");
//     } else if (user && inAuthGroup && isLoadingUser) {
//       router.replace("/");
//     }
//   });

//   return <>{children}</>;
// };

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{flex:1}}>
      <AuthProvider>
        <PaperProvider>
          <SafeAreaProvider>
            {/* <RouteGuard> */}
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="auth" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
            {/* </RouteGuard> */}
          </SafeAreaProvider>
        </PaperProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
