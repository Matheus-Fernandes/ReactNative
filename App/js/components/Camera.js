import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';

export default class Camera extends React.Component{
	render(){
		return (
			<View style={{backgroundColor:'black', flex: 1}}>
				<Text>
					çlakjs
				</Text>
				<Button title="Voltar" onPress={this.props.voltar}/>
			</View>
		)	
	} 
}
