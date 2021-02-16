import React, {useEffect, useState} from 'react';
import Amplify, {Auth, API, graphqlOperation} from 'aws-amplify';
import {withAuthenticator} from 'aws-amplify-react-native';
import {Text, TouchableOpacity} from 'react-native';
import {createTodo, updateTodo, deleteTodo} from './src/graphql/mutations';
import {listTodos} from './src/graphql/queries';

import config from './src/aws-exports';

Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

function App() {
  const [listTasks, setListTaks] = useState([]);

  function SignOut() {
    try {
      Auth.signOut();
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    async function fetchData() {
      const todo = {name: 'My first todo', description: 'Hello world!'};
      await API.graphql(graphqlOperation(createTodo, {input: todo}));

      const listTasksData = await API.graphql(graphqlOperation(listTodos));
      console.log(listTasksData);
    }

    fetchData();
  }, []);

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
