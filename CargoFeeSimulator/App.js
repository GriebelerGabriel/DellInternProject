// COMPONENTS
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// PAGES (STACKS)
import Home from './src/pages/Home'
import VerifyRoutesAndModality from './src/pages/VerifyRoutesAndModality';
import StatisticData from './src/pages/StatisticData';
import CreateNewTransport from './src/pages/CreateNewTransport';

export default function App() {
  const Stack = createStackNavigator();
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>

        <Stack.Screen name='VerifyRoutesAndModality' component={VerifyRoutesAndModality} 
        options={{ title: 'Rotas e Modalidades' }}/>

        <Stack.Screen name='CreateNewTransport' component={CreateNewTransport}
        options={{ title: 'Novo Transporte' }}/>

        <Stack.Screen name='StatisticData' component={StatisticData}
        options={{ title: 'Dados estatisticos' }}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}
