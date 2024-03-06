import React from 'react'
import { Text, View,StatusBar } from 'react-native'
import './config/ReactotronConfig';
import Routes from './routes'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
export default function App(){
    return(
        //O componente GestureHandlerRootView é obrigatorio para ter a presença de rotas na aplicação
        //O componente StatusBar cria a barra de navegação entre as páginas da aplicação
        <GestureHandlerRootView style={{flex:1}}>
            <StatusBar barStyle="light-content" backgroundColor ="#7159c1"/>
            <Routes />
        </GestureHandlerRootView>
    )   
}