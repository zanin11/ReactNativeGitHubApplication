import React, { Component } from 'react'
import { View, Text, ActivityIndicator,TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types';
import api from "../../services/api";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, Header, Avatar, Name, Bio, Stars, Starred, OwnerAvatar, Info, Title, Author  } from './styles'
import { WebView } from 'react-native-webview';
export default class User extends Component{
    state = {
        stars: [],
        loading: true,
        page: 1,
        refreshing: false,
    }
    navigationOptions =  ({ navigation , route }) => {
        //Atualiza o nome da página para o nome do Usuário pressionado
        navigation.setOptions({ title: route.params.user.name})
    };
    componentDidMount = async () => {
        const { navigation, route } = this.props;
        const user = route.params.user;
        //Requisição que pega todos os repositórios favoritados do usuário pressionado
        const response = await api.get(`/users/${user.login}/starred`);
        this.setState({ 
            stars: response.data,
            loading: false,
        })
    };

    load = async (/*caso nao seja passado nenhum parametro page assume valor 1*/page = 1) => {
        const { stars } = this.state;
        const { route } = this.props;
        const user = route.params.user;
        this.setState({
            loading: true,
        })
        const response = await api.get(`/users/${user.login}/starred`, {
          params: { page },
        });
        this.setState({
            //Caso o numero da pagina for >=2 é colocado no vetor stars os novos repositorios 
          stars: page >= 2 ? [...stars, ...response.data] : response.data,
          page,
          loading: false,
          refreshing: false,
        });
    };
    
    loadMore = () => {
        const { page } = this.state;
        const nextPage = page + 1;
        //Atualiza o numero da pagina acessada dos repositorios favoritados
        this.load(nextPage);
    };
    refreshList = () =>{
        //Limpa o vetor dos repositorios favoritados
        this.setState({
            stars: [],
            refreshing: true,
        },
        this.load
        )
    }
    acessNewPage = (item, navigation)=>{
        console.tron.log('cliquei no repository');
        //Acessa a pagina de Repository para saber caracteristicas do repository pressionado pelo usuario
        navigation.navigate('Repository', { item });
       
    }
    render(){
        this.navigationOptions(this.props);
        const { route, navigation } = this.props;
        const user = route.params.user;
        const { stars, loading } = this.state;
        return(
            <Container>
                <Header>
                    <Avatar source = {{ uri: user.avatar }} />
                    <Name>{user.name}</Name>
                    <Bio>{user.bio}</Bio>
                </Header>
                {loading ? (<ActivityIndicator />) : 
                (<Stars data = {stars}
                        onRefresh={this.refreshList} // Função dispara quando o usuário arrasta a lista pra baixo
                        refreshing={this.state.refreshing} // Variável que armazena um estado true/false que representa se a lista está atualizando
                        onEndReachedThreshold={0.2}  // Carrega mais itens quando chegar em 20% do fim
                        onEndReached={this.loadMore}  // Função que carrega mais itens
                        keyExtractor = {star => String(star.id)}
                        renderItem = { ({ item }) => (
                            <TouchableOpacity onPress= {()=>this.acessNewPage(item, navigation)}>
                                <Starred>
                                    <OwnerAvatar source = {{ uri: item.owner.avatar_url }} />
                                    <Info>
                                        <Title>{item.name}</Title>
                                        <Author>{item.owner.login}</Author>
                                    </Info>
                                </Starred>
                            </TouchableOpacity>
                        )
                    }
                />)}
            </Container>
        )
    };
}