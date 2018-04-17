import React from 'react';
import { StyleSheet, Modal, TextInput, Image, View} from 'react-native';
import {Container, Content, Form, Item, Input, Text, Label, Button, Header, Tab, Tabs, Right } from 'native-base';
import { MapView, ImagePicker } from 'expo';
import Armazenamento from '../Armazenamento.js';
import Camera from './Camera.js';

const MARGIN = 30;

export default class ModalLugar extends React.Component{
    constructor(props){
        super(props);

        this.state ={
            lugar: props.lugar,
            carregando: false,
            atualizado: false,
        };
    }

    mudarFoto = async() =>{
        let lugar = this.state.lugar;
        let result = await ImagePicker.launchCameraAsync({
            base64: true,
        });
    
        if (!result.cancelled) {
            lugar.base64 =  result.base64;
        }

        this.setState({
            lugar: lugar,
            atualizado : true
        });
    }

    componentDidMount= async () =>  {
        console.log("aqui");
        console.log()
       await this.consultarFoto();
    }

    consultarFoto = async () => {
        this.setState({carregando : true});
        let lugar = this.state.lugar;
        lugar.base64 = await Armazenamento.getFoto(lugar.imagem);
        this.setState({
            lugar: lugar,
            carregando: false,
        });
    }

    renderMapa(lugar) {
        return (
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: parseFloat(lugar.latitude),
              longitude: parseFloat(lugar.longitude),
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            }}
            onRegionChange={region => console.log(region)}
          >
            <MapView.Marker draggable
                coordinate={{
                    latitude: parseFloat(lugar.latitude),
                    longitude: parseFloat(lugar.longitude),
                }}
            />
          </MapView>
        );
      }

    render(){
        const lugar = this.state.lugar ? this.state.lugar : {
            descricao : "",
            latitute: "",
            longitude: "",
        }

        return (
            <Modal 
                visible={this.props.visible} 
                onRequestClose={() => this.props.onClose()}
                animationType="slide"
            >
                <Header hasTabs >
                    <Right>
                        {
                            this.state.atualizado ?
                            <Button transparent onPress={() => Armazenamento.salvar(this.state.lugar)}>
                                <Text>Salvar</Text>
                            </Button>:
                            null
                        }
                    </Right>
                </Header>
                <Tabs>
                  <Tab heading="Geral">
                        <Content style={{ margin: 15}}>
                            <Label>Nome</Label>
                            <TextInput
                                style={{padding:10, paddingTop: 2, paddingBottom:16, fontSize:17, color:'#333333'}}
                                value={lugar.nome}
                                onChangeText={(value) => {
                                    let lugar = this.state.lugar;
                                    lugar.nome = value;
                                    this.setState({lugar : lugar, atualizado : true})
                                }}
                            />
                            <Label>Descrição</Label>
                            <TextInput
                                style={{padding:10, paddingTop: 2, paddingBottom:16, fontSize:17, color:'#333333'}}
                                multiline = {true}
                                value={lugar.descricao}
                                onChangeText={(value) => {
                                    let lugar = this.state.lugar;
                                    lugar.descricao = value;
                                    this.setState({lugar : lugar, atualizado : true})
                                }}
                            />
                        </Content>     
                    </Tab>
                    <Tab heading="Localização">
                    <Container style={styles.container}>
                        {this.renderMapa(lugar)}
                        <Content  style={{ margin: 15}}>
                            <Text>
                                Latitude:{lugar.latitude + "  "}
                                Longitude:{lugar.longitude}
                            </Text>
                        </Content>
                    </Container>
                    </Tab>
                    
                    <Tab heading="Foto">
                        {
                            this.state.carregando ? 
                            <Text>carregando ...</Text> :
                            <Image  source={{uri: "data:image/png;base64," + lugar.base64}} style={{height: null, width: null, flex: 1}}/>
                             
                        }
                        <Button  full primary onPress={this.mudarFoto}>
                             <Text>Tirar Foto</Text>
                        </Button>
                    </Tab>
                </Tabs>
            </Modal>
        );
    }
}  

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#ecf0f1",
    }
  });
  