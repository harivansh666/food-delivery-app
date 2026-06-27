import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";
import { UserRole } from "@food-delivery-app/types";
import { useAuth } from "@/context/auth-context";
import { COLORS } from "@/constants/constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    paddingBottom: 40,
    paddingHorizontal: 24,
    paddingTop: 64,
  },
  headerSection: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: COLORS.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.text.muted,
  },
  formSection: {
    gap: 20,
  },
  // Name Fields Row
  nameRow: {
    flexDirection: "row",
    gap: 12,
  },
  nameField: {
    flex: 1,
    gap: 8,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text.secondary,
    marginLeft: 4,
  },
  input: {
    height: 56,
    backgroundColor: COLORS.bg,
    borderRadius: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    color: COLORS.text.primary,
    borderWidth: 1,
    borderColor: COLORS.border.default,
  },
  fieldContainer: {
    gap: 8,
  },
  // Role Selection
  roleSection: {
    gap: 12,
    marginTop: 4,
  },
  roleContainer: {
    flexDirection: "row",
    gap: 12,
  },
  roleButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.bg,
    borderColor: COLORS.border.default,
  },
  roleButtonActive: {
    backgroundColor: `${COLORS.primary}15`, // 15% opacity
    borderColor: COLORS.primary,
  },
  roleButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text.muted,
  },
  roleButtonTextActive: {
    color: COLORS.primary,
  },
  // Submit Button
  submitButton: {
    height: 56,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  submitButtonDisabled: {
    opacity: 0.8,
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "700",
  },
  // Footer
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 32,
  },
  footerText: {
    color: COLORS.text.muted,
    fontSize: 16,
  },
  footerLink: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "700",
  },
});

export default function RegisterScreen() {
  const { register } = useAuth();

  const [registerState, setRegisterState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: UserRole.CUSTOMER,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    const { firstName, lastName, email, password } = registerState;
    if (!firstName || !lastName || !email || !password) {
      return Alert.alert("Required", "Please fill all fields");
    }

    setIsLoading(true);
    try {
      await register(registerState);
      Alert.alert("Success", "Account created successfully!");
    } catch (error) {
      Alert.alert(
        "Registration Error",
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.headerSection}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>
              Join our food delivery community
            </Text>
          </View>

          {/* Form */}
          <View style={styles.formSection}>
            {/* Name Fields */}
            <View style={styles.nameRow}>
              <View style={styles.nameField}>
                <Text style={styles.fieldLabel}>First Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="John"
                  placeholderTextColor={COLORS.text.muted}
                  onChangeText={(text) =>
                    setRegisterState({ ...registerState, firstName: text })
                  }
                  value={registerState.firstName}
                  editable={!isLoading}
                />
              </View>
              <View style={styles.nameField}>
                <Text style={styles.fieldLabel}>Last Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Doe"
                  placeholderTextColor={COLORS.text.muted}
                  onChangeText={(text) =>
                    setRegisterState({ ...registerState, lastName: text })
                  }
                  value={registerState.lastName}
                  editable={!isLoading}
                />
              </View>
            </View>

            {/* Email */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="example@mail.com"
                placeholderTextColor={COLORS.text.muted}
                onChangeText={(text) =>
                  setRegisterState({ ...registerState, email: text })
                }
                value={registerState.email}
                autoCapitalize="none"
                keyboardType="email-address"
                editable={!isLoading}
              />
            </View>

            {/* Password */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor={COLORS.text.muted}
                onChangeText={(text) =>
                  setRegisterState({ ...registerState, password: text })
                }
                value={registerState.password}
                secureTextEntry
                editable={!isLoading}
              />
            </View>

            {/* Role Selection */}
            <View style={styles.roleSection}>
              <Text style={styles.fieldLabel}>Register as:</Text>
              <View style={styles.roleContainer}>
                <Pressable
                  style={[
                    styles.roleButton,
                    registerState.role === UserRole.CUSTOMER &&
                      styles.roleButtonActive,
                  ]}
                  onPress={() =>
                    setRegisterState({
                      ...registerState,
                      role: UserRole.CUSTOMER,
                    })
                  }
                  disabled={isLoading}
                >
                  <Text
                    style={[
                      styles.roleButtonText,
                      registerState.role === UserRole.CUSTOMER &&
                        styles.roleButtonTextActive,
                    ]}
                  >
                    Customer
                  </Text>
                </Pressable>

                {/* Uncomment when ready */}
                {/* <Pressable
                  style={[
                    styles.roleButton,
                    registerState.role === UserRole.RESTAURANT_OWNER &&
                      styles.roleButtonActive,
                  ]}
                  onPress={() =>
                    setRegisterState({
                      ...registerState,
                      role: UserRole.RESTAURANT_OWNER,
                    })
                  }
                  disabled={isLoading}
                >
                  <Text
                    style={[
                      styles.roleButtonText,
                      registerState.role === UserRole.RESTAURANT_OWNER &&
                        styles.roleButtonTextActive,
                    ]}
                  >
                    Restaurant
                  </Text>
                </Pressable> */}
              </View>
            </View>

            {/* Submit Button */}
            <Pressable
              onPress={handleRegister}
              disabled={isLoading}
              style={[
                styles.submitButton,
                isLoading && styles.submitButtonDisabled,
              ]}
            >
              {isLoading ? (
                <ActivityIndicator color={COLORS.white} size="large" />
              ) : (
                <Text style={styles.submitButtonText}>Sign Up</Text>
              )}
            </Pressable>
          </View>

          {/* Footer */}
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <Pressable
              onPress={() => router.push("/login")}
              disabled={isLoading}
            >
              <Text style={styles.footerLink}>Login</Text>
            </Pressable>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
