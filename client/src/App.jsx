import React, { useState, useEffect } from "react";
import { Appnavbar } from "./components/AppNavbar/Appnavbar";
import MainApp from "./components/MainApp/MainApp";
import * as actions from "./store/actions/index";
import { connect } from "react-redux";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import LoadingOverlay from "react-loading-overlay";

function App(props) {
  const { onLoadUser, authLoading, goalLoading, tasksLoading } = props;
  const [loading, setLoading] = useState(false);

  useEffect(() => onLoadUser(), [onLoadUser]);

  useEffect(() => {
    if (authLoading || tasksLoading || goalLoading) {
      setLoading(true);
    } else if (!authLoading && !tasksLoading && !goalLoading) {
      setLoading(false);
    }
  }, [authLoading, tasksLoading, goalLoading]);

  return (
    <div>
      <LoadingOverlay
        active={loading}
        styles={{
          overlay: (base) => ({
            ...base,
            background: "none",
            top: "-5%",
            zIndex: 3000,
          }),
        }}
        spinner={
          <Loader type="Oval" color="#3F51B5" height={150} width={150} />
        }
      >
        <Appnavbar />
        <MainApp />
      </LoadingOverlay>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    authLoading: state.auth.isLoading,
    goalLoading: state.goals.isLoading,
    tasksLoading: state.tasks.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadUser: () => dispatch(actions.loadUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
