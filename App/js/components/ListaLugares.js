import React from 'react';
import { TouchableOpacity , StyleSheet, FlatList, ScrollView, View} from 'react-native';
import { Text, Header, Footer, FooterTab, Button, Icon} from 'native-base';
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

    adicionar(){
        let item = {
            nome: "",
            descricao : "",
            longitude : "",
            latitude : "",
            base64 : "",
            imagem : ""
        }

        this.setModal(item, true);
    }

    renderItem = ({item}) => {
        const nome = item.nome;
        const descricao = item.descricao;
        const tam = 70;
        const abreviado = descricao.length > tam ;
        return (
            <TouchableOpacity 
                style={[styles.row]} 
                onPress={ () =>  this.setModal(item, true)}
            >
                <Text style={{fontWeight: "bold"}}>{nome}</Text>
                <Text>{
                    descricao.substr(0, abreviado ? tam : descricao.length) + 
                    (abreviado ? "..." : "")
                }</Text>
            </TouchableOpacity >
        );
    }

    render() {
      let data = this.props.lugares;
      
      return (
        this.state.modalVisible ?
        <ModalLugar 
            onClose={() => this.setModal(null, false)}
            lugar={this.state.lugar}
        /> 
        :
        <View style={{flex:1}}>
            <Header/>
            <ScrollView>
                <FlatList 
                    style={styles.container}
                    data={data}
                    renderItem={this.renderItem}
                    keyExtractor={extractKey}/>   
            </ScrollView>
            <Footer>
                <FooterTab>
                    <Button primary onPress={() => this.adicionar.bind(this)()}>
                        <Text style={{fontSize: 15, fontWeight: 'bold'}}>Adicionar Lugar</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </View>
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
