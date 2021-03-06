import React from "react";
import Amplify, { Auth } from "aws-amplify";
import aws_exports from "./aws-exports";
import TopNavbar from "./components/TopNavbar";
import Routes from "./Routes";
import "./App.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
require("typeface-quicksand");

Amplify.configure(aws_exports);

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
        fontSize: 16,
        fontFamily: "'Quicksand', sans-serif;"
    }
});

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userToken: null,
            object: {}
        };
    }

    componentDidMount() {
        Auth.currentAuthenticatedUser()
            .then(user => {
                const token = user.signInUserSession.idToken;
                this.loginUser(token);
            })
            .catch(err => console.log(err));
    }

    render() {
        const childProps = {
            object: this.state.object,
            loginUser: this.loginUser.bind(this)
        };
        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline>
                    <TopNavbar childProps={childProps} />
                    <Routes childProps={childProps} />
                </CssBaseline>
            </MuiThemeProvider>
        );
    }

    loginUser = userToken => {
        this.setState({
            userToken: userToken
        });
    };

    handleLogout = () => {
        Auth.signOut()
            .then(() => {
                this.setState({
                    userToken: null
                });
                alert("Logged out!");
            })
            .catch(err => console.log(err));
    };
}

export default App;
