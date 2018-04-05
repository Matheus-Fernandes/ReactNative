import React from 'react';
import { StyleSheet, Text, View, Button, Image} from 'react-native';
import Armazenamento from './js/Armazenamento.js';
import Camera from './js/components/Camera.js';
import ListaLugares from './js/components/ListaLugares.js';

export default class App extends React.Component {
  constructor (props){
    super(props);
  }

  render() {
      return (
        <View style={styles.container}>    
          <ListaLugares />
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2980b9',
    alignItems: 'center',
    justifyContent: 'center', 
    paddingTop:60,
    padding:0,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
});
