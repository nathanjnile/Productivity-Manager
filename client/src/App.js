import React, {useEffect} from 'react';
import Appnavbar from "./components/AppNavbar/Appnavbar";
import MainApp from "./components/MainApp/MainApp";
import * as actions from "./store/actions/index";
import { connect } from "react-redux";

function App(props) {

  useEffect(() => props.onLoadUser(),[props]);

  return (
    <div>
      <Appnavbar/>
      <MainApp/>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
      onLoadUser: () => dispatch(actions.loadUser()),
  }
}


export default connect(null, mapDispatchToProps)(App);

