import React from 'react';
import { TouchableOpacity , StyleSheet, FlatList, Text, ScrollView} from 'react-native';
import Armazenamento from '../Armazenamento.js';

const extractKey = ({id}) => id
export default class ListaLugares extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            lugares: [],
            carregando: false,
        }
    }

    componentDidMount = async () => {
        this.setState({carregando: true});
        this.setState({
            lugares: await Armazenamento.carregarLugares()
        });
        this.setState({carregando: false});
    }

    renderItem = ({item}) => {
        let cor = this.state.carregando ? "#2c3e50" : "#ecf0f1";
        return (
            <TouchableOpacity style={[styles.row, {backgroundColor: cor}]}>
                <Text>{item.descricao}</Text>
            </TouchableOpacity >
        );
    }

    render() {
      let data = this.state.lugares;
    //  alert(Armazenamento.listaLugares);
      return (
        <ScrollView>
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

  },
  row: {
    flex: 1,
    padding: 15,
    borderBottomWidth:1,
    borderColor:'rgba(0, 0, 0, 0.2)',
    backgroundColor: '#ecf0f1',
  },
});
