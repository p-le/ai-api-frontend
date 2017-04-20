
const features = 'scrollbars=no,toolbar=no,location=no,titlebar=no,directories=no,status=no,menubar=no';

export default class Popup {
  static calcPos(width, height) {
    const wLeft = window.screenLeft ? window.screenLeft : window.screenX;
    const wTop = window.screenTop ? window.screenTop : window.screenY;

    const left = wLeft + (window.innerWidth / 2) - (width / 2);
    const top = wTop + (window.innerHeight / 2) - (height / 2);

    return `width=${width}, height=${height}, top=${top}, left=${left}`;
  }

  static getFeatures() {
    return features;
  }
}