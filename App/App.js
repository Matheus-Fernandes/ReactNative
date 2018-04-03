import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import Camera from './js/components/Camera.js';
import Expo from 'expo';



export default class App extends React.Component {
  state = {
    verCamera : true
  };

  render() {
    let renderContent;

    if (this.state.verCamera) 
      renderContent = (
          <Camera voltar={this.voltar.bind(this)}/>
      );
    else
      renderContent = (
        <View style={styles.container}>    
          <Button title="Camera" onPress={()=>{this.setState({verCamera : true})}}/>
        </View>
      );
    
    return renderContent;
  }

  voltar(){
    this.setState({verCamera : false});
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
