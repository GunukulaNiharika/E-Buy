import { Component } from "react";
import Header from "./HeaderComponent";
import { Switch, Route, withRouter} from 'react-router-dom';
import Home from '../Containers/Home';
import Login from '../Containers/Login';
import Register from '../Containers/Register'


class Main extends Component{
    render(){
        return(
            <>
                <Header/>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                </Switch>
            </>
        );
    }
}
export default withRouter(Main);