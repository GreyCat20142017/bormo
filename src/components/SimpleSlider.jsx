import React from 'react';
import PropTypes from 'prop-types';
import {Typography, withStyles} from '@material-ui/core';
import {Slider} from '@material-ui/lab';

const styles = theme => ({
  sliderWrapper: {
    width: '100%',
    padding: 0,
    margin: 0
  },
  slider: {
    padding: theme.spacing.unit / 2,
    margin: theme.spacing.unit / 2
  }
});


const getRefinedValue = (currentValue, currentParams) => (
  (currentValue >= currentParams.min) && (currentValue <= currentParams.max) ?
    currentValue :
    currentParams.default
);

class SimpleSlider extends React.Component {
  static defaultProps = {
    noTitle: false,
    verticalOnMobile: false
  }

  constructor (props) {
    super(props);
    this.state = {value: getRefinedValue(this.props.value, this.props.params)};
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    this.setState({value: getRefinedValue(nextProps.value, nextProps.params)});
  }

  handleChange = (event, value) => {
    this.props.onSliderChange(this.props.name, value);
    this.setState({value: value});
  };

  render () {
    const {classes, params, noTitle, verticalOnMobile} = this.props;
    const {value} = this.state;

    return (
      <div className={verticalOnMobile ? classes.sliderWrapperVertical : classes.sliderWrapper}>
        {noTitle ? null : <Typography id='Slider'>{params.title + ': ' + Math.round(10 * value) / 10}</Typography>}
        <Slider
          classes={{container: classes.slider}}
          value={value}
          disabled={parseInt(params.min, 10) >= parseInt(params.max, 10)}
          min={parseInt(params.min, 10)}
          max={parseInt(params.max, 10)}
          step={params.step}
          vertical={verticalOnMobile}
          aria-labelledby='Slider'
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

SimpleSlider.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSlider);
