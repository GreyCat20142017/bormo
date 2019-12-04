import React from 'react';
import {debounce} from 'lodash';
import ContentMissingMessage from '../components/ContentMissingMessage';
import {DEBOUNCE_INTERVAL} from '../constants';

function bormoWrapper(Component) {
  class BormoWrapper extends Component {

    constructor(props) {
      super(props);
      this.onDebouncedClick = debounce(this.onDebouncedClick.bind(this), DEBOUNCE_INTERVAL);
    }

    onDebouncedClick(callbackName) {
      this.props[callbackName]();
    }

    onGlobalKeyPress = (evt) => {
      const charCode = String.fromCharCode(evt.which).toLowerCase();
      if (evt.altKey) {
        switch (charCode) {
          case 'p':
          case 'з': {
            evt.preventDefault();
            this.onDebouncedClick('onPreviousClick');
            break;
          }
          case 'n':
          case 'т': {
            evt.preventDefault();
            this.onDebouncedClick('onNextClick');
            break;
          }
          case 'r':
          case 'к': {
            evt.preventDefault();
            this.onDebouncedClick('onRestartClick');
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
      return this.props.content.length === 0 ? <ContentMissingMessage/> : <Component {...this.props}/>;
    }
  };
  BormoWrapper.displayName = `BormoWrapper (${Component.displayName || Component.name || 'Component'})`;
  return BormoWrapper;
};


export default bormoWrapper;
