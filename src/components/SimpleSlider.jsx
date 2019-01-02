import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';

const styles = theme => ({
  sliderWrapper: {
    marginTop: theme.spacing.unit * 2
  },
  slider: {
    padding: theme.spacing.unit,
    margin: theme.spacing.unit,
  }
});


class SimpleSlider extends React.Component {
  state = {
    value: this.props.value || this.props.params.default || 1
  };

  handleChange = (event, value) => {
    this.setState({ value });
    this.props.onSliderChange(this.props.name, value);
  };

  render() {
    const { classes, params } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.sliderWrapper}>
        <Typography id="Slider">{params.title + ': ' +  Math.round(10 * value) / 10}</Typography>
        <Slider
          classes={{ container: classes.slider }}
          value={value}
          min={params.min}
          max={params.max}
          step={params.step}
          aria-labelledby="Slider"
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
