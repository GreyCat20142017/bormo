import React from 'react';


function bormoWrapper(Component) {
  class BormoWrapper extends Component {

    onGlobalKeyPress = (evt) => {
      const charCode = String.fromCharCode(evt.which).toLowerCase();
      if (evt.altKey) {
        switch (charCode) {
          case 'p':
          case 'з': {
            evt.preventDefault();
            this.props.onPreviousClick();
            break;
          }
          case 'n':
          case 'т': {
            evt.preventDefault();
            this.props.onNextClick();
            break;
          }
          case 'r':
          case 'к': {
            evt.preventDefault();
            this.props.onNextClick();
            break;
          }
          default:
        }
      }
    };

    componentDidMount() {
      document.addEventListener('keyup', this.onGlobalKeyPress);
    }

    componentWillUnmount() {
      document.removeEventListener('keyup', this.onGlobalKeyPress);
    }

    render() {
      return <Component {...this.props}/>;
    }
  };
  BormoWrapper.displayName = `BormoWrapper (${Component.displayName || Component.name || 'Component'})`;
  return BormoWrapper;
};


export default bormoWrapper;
