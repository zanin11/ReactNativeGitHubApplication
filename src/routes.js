import React, {Component} from 'react';
import { Text } from 'react-native'
import Main from './pages/Main/index'
import User from './pages/User/index'
import Repository from './pages/Repository/index'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
const Stack = createNativeStackNavigator();
export default function Routes(){
    return(
        //Para que nossa aplicação consiga acessar diferentes rotas necessitamos dos componentes:
        //NavigationContainer
        //Stack.Navigator -> cria um pilha de paginas tornando possivel retornar a página anterior da aplicação
        //Stack.Screen -> determina de fato quais sao as rotas/pages da aplicação
        //                É necessário sempre determinar ->name<- da page e o ->component<- (component deve ter a pagina "nova" a ser acessada)
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Usuarios" component={Main} 
                options={{
                    headerStyle:{
                        backgroundColor : "#7159c1",
                    },
                    headerTitleStyle: {
                        color: "white",
                    }
                }}
                />
                <Stack.Screen name="User" component={User}
                options={{
                    headerStyle:{
                        backgroundColor : "#7159c1",
                    },
                    headerTitleStyle: {
                        color: "white",
                    }
                }}
                />
                <Stack.Screen name ="Repository" component={Repository} />
             </Stack.Navigator>
        </NavigationContainer>
    )
};