import { ImagePicker } from 'expo';
import Armazenamento from '../Armazenamento.js';

export default class Camera {
  static tirarFoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
        base64: true,
    });

    if (!result.cancelled) {
      return result;
    }
  }
}