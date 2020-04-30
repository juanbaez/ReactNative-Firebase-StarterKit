import {Stitch} from 'mongodb-stitch-react-native-sdk';

const APP_ID = 'deliveryapp-pmoql';

const app = Stitch.hasAppClient(APP_ID)
  ? Stitch.getAppClient(APP_ID)
  : Stitch.initializeAppClient(APP_ID);

console.log(APP_ID);

export {app};
