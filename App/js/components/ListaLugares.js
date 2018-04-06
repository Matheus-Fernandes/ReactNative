import React from 'react';
import { TouchableOpacity , StyleSheet, FlatList, ScrollView} from 'react-native';
import { Text } from 'native-base';
import Armazenamento from '../Armazenamento.js';
import ModalLugar from './ModalLugar.js';

const extractKey = ({id}) => id
export default class ListaLugares extends React.Component {
    state = {
        modalVisible: false,
        lugar: {}
    };

    setModal(item, visible) {
        
        this.setState({
            modalVisible: visible,
            lugar: item
        });
    }

    renderItem = ({item}) => {
        return (
            <TouchableOpacity 
                style={[styles.row]} 
                onPress={ () =>  this.setModal(item, true)}
            >
                <Text>{item.descricao}</Text>
            </TouchableOpacity >
        );
    }

    render() {
      let data = this.props.lugares;
      console.log(this.state.lugar);

      return (
        <ScrollView>
            <ModalLugar 
                visible={this.state.modalVisible} 
                onClose={() => this.setModal(null, false)}
                lugar={this.state.lugar}
            />
            <FlatList 
                style={styles.container}
                data={data}
                renderItem={this.renderItem}
                keyExtractor={extractKey}/>   
        </ScrollView>
      );
      
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aaaaaa',
  },
  row: {
    flex: 1,
    padding: 15,
    borderBottomWidth:1,
    borderColor:'rgba(0, 0, 0, 0.2)',
    backgroundColor: '#ecf0f1',
  },
});
