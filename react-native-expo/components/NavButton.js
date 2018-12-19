import React from 'react';
import { Button } from 'react-native';
import { withNavigation } from 'react-navigation';

class NavButton extends React.Component {
  render() {
    return <Button title="View" onPress={() => this.props.navigation.navigate(this.props.route, {
        schema: this.props.schema
    }) } />;
  }
}

// withNavigation returns a component that wraps NavButton and passes in the navigation prop
export default withNavigation(NavButton);