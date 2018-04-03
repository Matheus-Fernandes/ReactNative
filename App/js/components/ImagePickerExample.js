import React from 'react';
import { Button, Image, View, Dimensions } from 'react-native';
import { ImagePicker } from 'expo';
import StoreFoto from './StoreFoto.js';

export default class ImagePickerExample extends React.Component {
  state = {
    image: null,
  };

  constructor (props){
      super(props);
      if (props.onFoto != undefined){
          props.onFoto(this._pickImage);
      }
  }
  render() {
    let { image } = this.state;
    let size = Dimensions.get('window');
    
    return (
      <View style={{ flex: 1 , justifyContent: 'center', alignItems:'center'}}>
         {image &&
          <Image source={{ uri: image.uri }}  style={{ width: size.width, height: size.height}}/>}
      </View>
    );
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
        base64: true,
    });

    result.base64 = "data:image/png;base64," + result.base64;
    
    if (!result.cancelled) {
      this.setState({ image: result });
      StoreFoto.foto.image = result;
    }
  };
}