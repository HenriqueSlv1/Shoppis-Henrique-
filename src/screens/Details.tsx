import { SafeAreaView, StyleSheet, Text, Image, Button, Alert } from "react-native";
import React, { useContext } from "react";
import { ProductDTO } from "../types/Products";
import { CartContext } from "../contexts/CartContext";
import { useRoute } from "@react-navigation/native";

const Details = () => {
  const route = useRoute();
  const { title, description, price, images } = route.params as ProductDTO;
  const { addProduct } = useContext(CartContext);

  const handleAddToCart = () => {
    addProduct(route.params as ProductDTO);
    Alert.alert("Produto Adicionado", `${title} foi adicionado ao carrinho!`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={{ uri: images[0] }} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.price}>Preço: R$ {price}</Text>
      <Button title="Adicionar ao Carrinho" onPress={() => addProduct(route.params as ProductDTO)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default Details;
