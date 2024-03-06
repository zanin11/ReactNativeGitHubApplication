import React, { Component } from 'react'
import { Container } from './styles'
export default class Repository extends Component{
    //Atualiza o nome da pagina para o nome do repositorio pressionado
    navigationOptions = ({ navigation, route })=>{
        navigation.setOptions({ title: route.params.item.name});
    }
    render(){
        this.navigationOptions(this.props);
        const { item } = this.props.route.params;
        console.tron.log(item);
        return(
            <Container source = { { uri: item.html_url} } />
        )
    }
}