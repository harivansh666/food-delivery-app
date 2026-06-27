import { View, Text, StyleSheet, Pressable } from "react-native";
import { useAuth } from "@/context/auth-context";

export default function AdminHomeScreen() {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛠️ Admin Dashboard</Text>

      <Text style={styles.subtitle}>Welcome {user?.name ?? "Admin"}</Text>

      <Pressable style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 30,
  },

  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
