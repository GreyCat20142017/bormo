import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';

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


class SimpleSlider extends React.Component {
  static defaultProps = {
    noTitle: false,
    verticalOnMobile: false
  }

  constructor(props) {
    super(props);
    this.state = {value: this.props.params.default};
  }

  componentWillReceiveProps(nextProps) {
    this.setState({value: nextProps.params.default});
  }

  handleChange = (event, newValue) => {
    this.props.onSliderChange(this.props.name, newValue);
    this.setState({value: newValue});
  };

  render() {
    const {classes, params, noTitle, verticalOnMobile} = this.props;
    const {value} = this.state;

    return (
      <div className={verticalOnMobile ? classes.sliderWrapperVertical : classes.sliderWrapper}>
        {noTitle ? null : <Typography id='Slider'>{params.title + ': ' + Math.round(10 * value) / 10}</Typography>}
        <Slider
          classes={{container: classes.slider}}
          value={value}
          disabled={params.min >= params.max}
          min={params.min}
          max={params.max}
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
