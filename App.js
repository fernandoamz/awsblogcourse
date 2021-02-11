import React from 'react';
import Amplify, {Auth} from 'aws-amplify';
import {withAuthenticator} from 'aws-amplify-react-native';
import {Text, TouchableOpacity} from 'react-native';
import config from './src/aws-exports';

Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

function App() {
  function SignOut() {
    try {
      Auth.signOut();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Text>App</Text>

      <TouchableOpacity onPress={() => SignOut()}>
        <Text>Cerrar sesion</Text>
      </TouchableOpacity>
    </>
  );
}

export default withAuthenticator(App);
