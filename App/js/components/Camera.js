import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import Expo from 'expo';
import  ImagePickerExample  from './ImagePickerExample.js';
import StoreFoto from './StoreFoto.js';

export default class Camera extends React.Component{
	state ={
		onFoto: () => {}
	}
	render(){
		return (
			<View style={{backgroundColor:'black', flex: 1}}>
				<ImagePickerExample 
					onFoto={ev => this.setState({onFoto: ev})} 
				/>
				<Text style={{color: "white"}}>
					{
						StoreFoto.foto.imagem ?
						StoreFoto.foto.uri :
						"Nenhuma foto tirada // TODO emmiter call"
					}
				</Text>
				<Button color="#1176c1" title="Tirar Foto" onPress={this.state.onFoto} />
				<Button title="Voltar" onPress={this.props.voltar}/>
			</View>
		)	
	} 
}
