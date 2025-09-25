import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function AgendaApp() {
  const [pessoas, setPessoas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const obterPessoas = async () => {
    try {
      const resposta = await axios.get('https://jsonplaceholder.typicode.com/users');
      const listaComAvatares = resposta.data.map((usuario) => ({
        ...usuario,
        imagem: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`,
      }));
      setPessoas(listaComAvatares);
    } catch (erro) {
      console.error('Erro ao carregar dados:', erro);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    obterPessoas();
  }, []);

  const exibirItem = ({ item }) => (
    <View style={estilos.cartao}>
      <Image source={{ uri: item.imagem }} style={estilos.foto} />
      <View style={estilos.detalhes}>
        <Text style={estilos.nome}>{item.name}</Text>
        <Text style={estilos.contato}>{item.email}</Text>
      </View>
    </View>
  );

  return (
    <View style={estilos.tela}>
      <Text style={estilos.titulo}>Agenda de Pessoas</Text>
      {carregando ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <FlatList
          data={pessoas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={exibirItem}
          contentContainerStyle={estilos.lista}
        />
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    paddingTop: 50,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
    color: '#FFFFFF',
  },
  lista: {
    paddingHorizontal: 16,
  },
  cartao: {
    flexDirection: 'row',
    backgroundColor: '#2c2c2c',
    marginBottom: 12,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  foto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  detalhes: {
    flex: 1,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#87CEFA',
  },
  contato: {
    fontSize: 14,
    color: '#B0C4DE',
    marginTop: 4,
  },
});
