import React from 'react';
import { StyleSheet, Modal, TextInput, Image, View, ToastAndroid} from 'react-native';
import {Container, Content, Form, Item, Input, Text, Label, Button, Header, Tab, Tabs, Right } from 'native-base';
import { MapView, ImagePicker,Permissions, Location } from 'expo';
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
            exif: true
        });
    
        if (!result.cancelled) {
            lugar.base64 =  result.base64;
            let l = this.getLocation(); 
            lugar.latitude = l.latitude;
            lugar.longitude = l.longitude;
        }

       

        this.setState({
            lugar: lugar,
            atualizado : true
        });
    }

    async getLocation() {
       let localizacao = await this._getLocationAsync();
       return localizacao;
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
            errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        return location;
    };

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

    async salvar(){
        await Armazenamento.salvar(this.state.lugar);
        ToastAndroid.show('Salvo com sucesso !', ToastAndroid.SHORT);
        this.setState({atualizado : false });
    }

    renderMapa(lugar) {
        if (!lugar.longitude || ! lugar.latitude){
            return (
                <View style={styles.container}>
                    <Text>
                        Sem Localização
                    </Text>
                </View>
            )
        }
        return (
            <Container style={styles.container}>
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
                <Content  style={{ margin: 15}}>
                    <Text>
                        Latitude:{lugar.latitude + "  "}
                        Longitude:{lugar.longitude}
                    </Text>
                </Content>
            </Container>
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
                            <Button transparent onPress={() => this.salvar.bind(this)()}>
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
  