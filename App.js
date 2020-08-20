import React, { useContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';;
import Details from './src/Details';
import Edit from './src/Edit';
import List from './src/List';
import CreateNews from './src/CreateNews';

import {NewsContext} from './src/contexts/NewsContext'

const Stack = createStackNavigator();

const App = () => {
  const [news, setNews] = useState(null)

  return (
    <NavigationContainer>
       <NewsContext.Provider value={{news: news, setNews:setNews}}>
          <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="Code7 Notícias" component={List} />
            <Stack.Screen name="Detalhes" component={Details} />
            <Stack.Screen name="Code7 Editar" component={Edit} />
            <Stack.Screen name="Criar Notícia" component={CreateNews} />
          </Stack.Navigator>
        </NewsContext.Provider>
    </NavigationContainer>
  );
}

export default App;
