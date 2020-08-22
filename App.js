import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';;
import Details from './src/Details';
import Edit from './src/Edit';
import List from './src/List';
import CreateNews from './src/CreateNews';

import { NewsContext } from './src/contexts/NewsContext'

const Stack = createStackNavigator();

const App = () => {
  const [news, setNews] = useState(null)

  const styles ={
    headerStyle: {
      backgroundColor: '#7959eb',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }

  return (
    <NavigationContainer>
       <NewsContext.Provider value={{news: news, setNews:setNews}}>
          <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="Code7 Notícias"  options={{ headerShown: false }}
             component={List} />
            <Stack.Screen name="Detalhes" options={{
               title: news?.title || 'Detalhes',
               ...styles
              }} component={Details} />
            <Stack.Screen name="Code7 Editar" options={{
                title: news?.title || 'Editar',
                ...styles
              }}
              component={Edit} />
            <Stack.Screen name="Criar Notícia" options={{...styles}} 
              component={CreateNews} />
          </Stack.Navigator>
        </NewsContext.Provider>
    </NavigationContainer>
  );
}

export default App;
