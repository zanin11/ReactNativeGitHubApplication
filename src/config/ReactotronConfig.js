import Reactotron from 'reactotron-react-native';
if(__DEV__){
    const tron = Reactotron.configure().useReactNative().connect();
    console.tron = tron;
    tron.clear(); 
}
//É importante utilizarmos o Reactotron como forma de verificarmos o andamento da aplicação bem como suas requisições feitas