import React from 'react';
import { StyleSheet, Text, View, Button, Image} from 'react-native';
import Armazenamento from './js/Armazenamento.js';
import Camera from './js/components/Camera.js';
import Expo from 'expo';

export default class App extends React.Component {
  state = {
    verCamera : true,
    lugar : null
  };

  constructor (props){
    super(props);
    Armazenamento.addChangeListener(this.onChangeLugar.bind(this));
  }

  render() {
      const lugar = this.state.lugar;
      const imagem = lugar ? lugar.imagem : null;
      return (
        <View style={styles.container}>    
          {imagem && <Image source={{ uri: lugar.imagem.uri }}  style={{ width: 100, height: 100}}/>}
          <Button title="Camera" onPress={Camera.tirarFoto}/>
        </View>
      );
    
    return renderContent;
  }

  voltar(){
    this.setState({verCamera : false});
  }

  onChangeLugar(){
    this.setState({lugar : Armazenamento.lugar});
    alert(this.state.lugar && this.state.lugar.imagem.uri);
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center', 
  },
});
