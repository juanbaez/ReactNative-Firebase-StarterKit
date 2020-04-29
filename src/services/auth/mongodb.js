import {RemoteMongoClient} from 'mongodb-stitch-react-native-sdk';

import {app} from './app';

//Inicializa el servicio de cliente del Mongodb
const mongoClient = app.getServiceClient(
  RemoteMongoClient.factory,
  'mongodb-atlas',
);

const items = mongoClient.db('todo').collection('items');

export {items};
