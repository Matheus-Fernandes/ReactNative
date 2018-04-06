import React from 'react';
import { StyleSheet, Modal, TextInput} from 'react-native';
import {Container, Content, Form, Item, Input, Text, Label, Button} from 'native-base';
import { MapView } from 'expo';

const MARGIN = 30;

export default class ModalLugar extends React.Component{
    
    state = {
        lugar: ""
    };

    constructor(props){
        super(props);
        console.log(props);
    }

    componentWillReceiveProps(props){
        this.setState({
            lugar : props.lugar
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
                <Container style={styles.container}>
                     {this.renderMapa(lugar)}
                     <Content  style={{ margin: 15}}>
                        <Text>
                            Latitude:{lugar.latitude + "  "}
                            Longitude:{lugar.longitude}
                        </Text>
                    </Content>
                    <Content style={{ margin: 15}}>
                        <Label>Descrição</Label>
                        <TextInput
                            style={{padding:10, paddingTop: 2, paddingBottom:16, fontSize:17, color:'#333333'}}
                            multiline = {true}
                        
                            onChangeText={(text) => this.setState({descricao: text})}
                            value={lugar.descricao}
                        />
                    </Content>     
                </Container>
            </Modal>
        );
    }
}  

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#ecf0f1",
    }
  });
  