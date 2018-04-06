import React from 'react';
import { StyleSheet, Text, View, Button, Image} from 'react-native';
import Armazenamento from './js/Armazenamento.js';
import Camera from './js/components/Camera.js';
import ListaLugares from './js/components/ListaLugares.js';
import Expo from 'expo';

export default class App extends React.Component {
  state = {
    lugares: [],
    carregando: false,
  }

  componentWillMount = async () => {
    this.setState({carregando: true});
    this.setState({
        lugares: await Armazenamento.carregarLugares()
    });
    await Expo.Font.loadAsync({
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({carregando: false});
  }

  render() {
      if (this.state.carregando){
        return (
          <View style={styles.carregamento}>    
            <Text style={styles.textoCarregamento}>
              Carregando ...
            </Text>
          </View>
        );
      }

      return (
        <View style={styles.container}>    
          <ListaLugares lugares={this.state.lugares} />
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    alignItems: 'center',
    justifyContent: 'center', 
    paddingTop:40,
    padding:0,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  carregamento:{
    flex: 1,
    backgroundColor: '#2c3e50',
    alignItems: 'center',
    justifyContent: 'center', 
    padding:0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textoCarregamento:{
    color: 'white',
  }
});
