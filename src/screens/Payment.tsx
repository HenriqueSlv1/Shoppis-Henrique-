import React, { useContext } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { CartContext } from "../contexts/CartContext";

const Payment = () => {
  const { checkout } = useContext(CartContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pagamento</Text>
      <Text style={styles.instructions}>
        Por favor, selecione um método de pagamento:
      </Text>
      <View style={styles.button}>
        <Button title="Cartão de Crédito" onPress={checkout} />
      </View>
      <View style={styles.button}>
        <Button title="PayPal" onPress={checkout} />
      </View>
      <View style={styles.button}>
        <Button title="Boleto Bancário" onPress={checkout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  instructions: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    marginVertical: 10,
    width: "80%",
  },
});

export default Payment;
