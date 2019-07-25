import React from 'react';
import ContentMissingMessage from '../components/ContentMissingMessage';

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
            this.props.onRestartClick();
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
      return  this.props.content.length === 0 ? <ContentMissingMessage/> : <Component {...this.props}/>;
    }
  };
  BormoWrapper.displayName = `BormoWrapper (${Component.displayName || Component.name || 'Component'})`;
  return BormoWrapper;
};


export default bormoWrapper;
