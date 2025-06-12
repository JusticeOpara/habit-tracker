import { useAuth } from "@/lib/auth-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, View, StyleSheet } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";



export default function AuthScreen() {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>("");

  const router = useRouter();
  const theme = useTheme();
  const { signIn, signUp } = useAuth();


  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleAuth = async () => {
  
    setError(null);

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      if (isSignUp) {
        const error = await signUp(email.trim().toLowerCase(), password);
        if (error) {
          setError(error);
          return;
        }
        // Handle successful sign up (maybe redirect or show success message)
      } else {
        const error = await signIn(email.trim().toLowerCase(), password);
        if (error) {
          setError(error);
          return;
        }
        router.replace("/");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Auth error:", err);
    }
  };

  const handleSwitchMode = () => {
    setIsSignUp((prev) => !prev);
    setError(null); // Clear errors when switching modes
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title} variant="headlineMedium">
          {isSignUp ? "Create Account" : "Welcome Back"}
        </Text>
        
        <TextInput
          label="Email"
          value={email}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="example@gmail.com"
          mode="outlined"
          style={styles.input}
          onChangeText={(text) => setEmail(text.trim())}
        />
        
        <TextInput
          label="Password"
          value={password}
          autoCapitalize="none"
          secureTextEntry
          onChangeText={setPassword}
          mode="outlined"
          style={styles.input}
        />
        
        {error && (
          <Text style={{ color: theme.colors.error, marginBottom: 10 }}>
            {error}
          </Text>
        )}

        <Button mode="contained" onPress={handleAuth} style={styles.button}>
          {isSignUp ? "Sign Up" : "Sign In"}
        </Button>
        
        <Button
          mode="text"
          style={styles.switchModeButton}
          onPress={handleSwitchMode}
        >
          {isSignUp
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "f5f5f5",
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
  },
  input: { marginBottom: 16 },
  button: { marginTop: 8 },
  switchModeButton: {
    marginTop: 16,
  },
});
