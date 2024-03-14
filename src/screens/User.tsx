import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from "react-native";
import { UserContext } from "../contexts/UserContext";

const User = () => {
  const { getUser, user, logout } = useContext(UserContext);
  const [showLogoutButton, setShowLogoutButton] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={styles.container}>
      {user && (
        <>
          <Image
            source={{ uri: user.image }}
            style={styles.profileImage}
          />
          <Text style={styles.userName}>{user.firstName}</Text>
          <TouchableOpacity onPress={() => setShowLogoutButton(true)}>
            <Text style={styles.logoutButton}>Logout</Text>
          </TouchableOpacity>
        </>
      )}

      {showLogoutButton && (
        <View style={styles.logoutContainer}>
          <Button title="Logout" onPress={() => { logout(); setShowLogoutButton(false); }} />
        </View>
      )}
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  logoutButton: {
    color: "blue",
    marginBottom: 20,
  },
  logoutContainer: {
    marginTop: 20,
  },
});
