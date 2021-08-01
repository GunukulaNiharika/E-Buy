import Header from "./HeaderComponent";
import { Switch, Route, withRouter} from 'react-router-dom';
import Home from '../Containers/Home';
import Login from '../Containers/Login';
import Register from '../Containers/Register'
import PrivateRoute from "./privateRoute";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { IsUserLoggedIn } from "../actions/auth_actions";

function Main(){
    const dispatch =useDispatch();
    const auth= useSelector(state=> state.auth);

    useEffect(()=>{
        if(!auth.authenticate){
          dispatch(IsUserLoggedIn())
        }
    },[])
      
    return(
        <>
            <Header/>
            <Switch>
                <PrivateRoute path="/" exact component={Home}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
            </Switch>
        </>
    );
}
export default withRouter(Main);
