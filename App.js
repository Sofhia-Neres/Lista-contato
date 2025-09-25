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
        // Imagem usando DiceBear Avatars, que cria avatares únicos baseados no nome
        imagem: `https://avatars.dicebear.com/api/avataaars/${encodeURIComponent(usuario.username)}.png?background=%23${Math.floor(Math.random()*16777215).toString(16)}`,
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
      <Text style={estilos.titulo}>Minha Agenda Colorida</Text>
      {carregando ? (
        <ActivityIndicator size="large" color="#ff6347" />
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
    backgroundColor: '#121212',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 32,
    fontWeight: '900',
    color: '#ff6347', // tomate vibrante
    textAlign: 'center',
    marginBottom: 30,
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontFamily: 'Courier New',
  },
  lista: {
    paddingBottom: 40,
  },
  cartao: {
    flexDirection: 'row',
    backgroundColor: '#1e1e1e',
    borderLeftWidth: 8,
    borderLeftColor: '#ff6347',
    marginBottom: 20,
    paddingVertical: 20,
    paddingHorizontal: 18,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#ff6347',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  foto: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 24,
    borderWidth: 2,
    borderColor: '#ff6347',
  },
  detalhes: {
    flex: 1,
  },
  nome: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 6,
    fontFamily: 'Verdana',
  },
  contato: {
    fontSize: 16,
    color: '#bbb',
    fontStyle: 'italic',
    letterSpacing: 0.5,
  },
});
