import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, View, Text, Keyboard, ActivityIndicator } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import User from '../User/index'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container,Form,Input, SubmitButton, List, Users,Avatar, Name, Bio, ProfileButton, ProfileButtonText } from './styles'
import api from '../../services/api';
export default class Main extends Component{
    static navigationOptions ={
        title: 'Usuarios',
    };
    static PropTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func,
        })
    }
    state ={
        newUser: '',
        users: [],
        loading: false,
    };
    //toda vez que a pagina é iniciada a funcao componentDidMount é chamada
    async componentDidMount(){
        //Forma de deixar os usuarios "armazenados" na aplicação sem que sejam excluidos toda vez que tal for reniciada
        const users = await AsyncStorage.getItem('users');
        if(users){
            this.setState({ users: JSON.parse(users) });
        }
    }
    //toda vez que algum componente da pagina é modificado a funcao componentDidUpdate é chamada
    componentDidUpdate(prevProps, prevState){
        const { users } = this.state; 
        if(prevState.users != users){
            //Atualiza o armazenamento dos usuários da aplicação
            AsyncStorage.setItem('users', JSON.stringify(users));
        }
    }
    handleAddUser = async () =>{
        const { newUser,users } = this.state;
        this.setState({ loading: true });
        //Pega os dados do usuario da API do Github
        const response = await api.get(`/users/${newUser}`)
        const data = {
            name: response.data.name,
            login: response.data.login,
            bio: response.data.bio,
            avatar: response.data.avatar_url,
        };
        this.setState({
            //Atualiza os dados de usuarios da aplicacao
            users: [...users, data],
            newUser: '',
            loading: false,
        })
        //Teclado é retirado
        Keyboard.dismiss();
    }
    handleNavigate = ( user ) => {
        const { navigation } = this.props;
        //Vai para a pagina de usuarios da aplicação
        navigation.navigate('User', { user });
    };
    render(){
        const { users, newUser, loading } = this.state;
        return(
            <Container>
                <Form>
                    <Input
                        //nao corrige os textos que o usuario digitar (nome de usuario do GitHub)
                        autoCorrect={false}
                        //nao coloca a primeira letra do texto em letra maiuscula (nome de usuario do GitHub)
                        autoCapitalize="none"
                        placeholder="Adicionar usuario"
                        value = {newUser}
                        //"Coloca" o texto que o usuario digitou na variavel newUser  (nome de usuario do GitHub)
                        onChangeText={text=> this.setState({newUser : text})}
                        //Modifica o botao do teclado de return para send
                        returnKeyType = "send"
                        //a funcao handleAddUser é chamada quando o botao SubmitButton é pressionado
                        onSubmitEditing ={this.handleAddUser} 
                    />
                    <SubmitButton loading= {loading} onPress ={this.handleAddUser}>
                       { loading ? (<ActivityIndicator color="#FFF"/> ): 
                        (<Icon name="add" size={20} color ="#FFF" />)
                        }
                    </SubmitButton>
                </Form>
                <List 
                    data= {users}
                    keyExtractor= { user => user.login}
                    renderItem= { ({ item }) => (
                        <Users>
                            <Avatar source= {{ uri: item.avatar }} /> 
                            <Name>{item.bio}</Name>
                            <Bio>{item.bio}</Bio>
                            <ProfileButton onPress={() => this.handleNavigate(item)}>
                                <ProfileButtonText>Ver perfil</ProfileButtonText>
                            </ProfileButton>
                        </Users>
                    )}
                />
            </Container>
        )
    }
}