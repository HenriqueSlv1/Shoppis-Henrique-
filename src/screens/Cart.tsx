import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Button, TextInput } from "react-native";
import { CartContext } from "../contexts/CartContext";
import { ProductDTO } from "../types/Products";

const Cart = () => {
  const { cart, getCart, removeProduct } = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  useEffect(() => {
    getCart();
  }, []);

  const handlePay = () => {
    // Aqui você pode processar o pagamento com as informações do cartão
    // Pode enviar essas informações para um servidor para processamento do pagamento, por exemplo
    console.log("Método de pagamento:", paymentMethod);
    console.log("Número do cartão:", cardNumber);
    console.log("Data de expiração:", expiryDate);
    console.log("CVV:", cvv);
    
    // Depois de processar o pagamento, você pode limpar o carrinho
    removeCart();
  };

  const removeCart = () => {
    // Função para limpar o carrinho após o pagamento ser processado
    console.log("Carrinho limpo");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrinho</Text>
      <FlatList
        data={cart}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.product.title}</Text>
            <Text>{item.product.price}</Text>
            <Text>Quantidade: {item.quantity}</Text>
            <Button title="Excluir" onPress={() => removeProduct(item.product.id)} />
          </View>
        )}
      />
      <Text style={styles.paymentLabel}>Método de Pagamento:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o método de pagamento"
        value={paymentMethod}
        onChangeText={setPaymentMethod}
      />
      <Text style={styles.paymentLabel}>Número do Cartão:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o número do cartão"
        value={cardNumber}
        onChangeText={setCardNumber}
      />
      <Text style={styles.paymentLabel}>Data de Expiração:</Text>
      <TextInput
        style={styles.input}
        placeholder="MM/YY"
        value={expiryDate}
        onChangeText={setExpiryDate}
      />
      <Text style={styles.paymentLabel}>CVV:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o CVV"
        value={cvv}
        onChangeText={setCvv}
      />
      <Button title="Pagar" onPress={handlePay} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  paymentLabel: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default Cart;
