import React from 'react';
import deepCompare from 'react-addons-deep-compare';
import './slider.css';

//import styles from './sc.css'

//import PropTypes from 'prop-types';

const isFunc = obj => typeof obj === 'function';

const calcValue = ({state,props}) => {

  return parseInt(state.left / props.width * props.max);
}
//let isDrag = false
export default class Slider extends React.Component {
  // static get PropTypes() {
  //   return {
  //     max: PropType.number.isRequired,
  //     width: PropType.number.isRequired,
  //     onChange: PropType.func,
  //   };
  // }

  constructor(props) {
    super(props);
    
    //const value = 0//this.props.default || 50; drag: false,
    const step = parseInt(this.props.width/this.props.max)*2
    this.state = {left:0,value:0,drag: false,prevX:0,step:step};
    this.setValue = this.setValue.bind(this);
    this.getValue = this.getValue.bind(this);
  }

  componentDidMount() {
  }
 componentWillUnMount() {
  }
  componentDidUpdate() {
    const value = calcValue(this);
    this.setState({value});
    if (isFunc(this.props.onChange)) 
      this.props.onChange(event, value);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.value === nextState.value) return false;
    return deepCompare(this, nextProps, nextState);
  }

  rangeOffset(offset){
      if(offset >this.state.step)offset = this.state.step
      if(offset <-this.state.step)offset = -this.state.step
      return offset
  }
  rangeLeft(left, max){
    if (left >= max) return max;
    if (left <= 0) return 0;
    return left;
  }
  onTouchStart(event) {
    if(event.target.id == 'sbnt') {
      this.setState({drag: true});
      var ox = event.targetTouches[0].clientX
      this.setState({prevX: ox});
      
      return
    }

  }
  onTouchMove(event) {
   
    if (this.state.drag)
    {

      var ox = event.targetTouches[0].clientX
      var offset = ox - this.state.prevX
     // offset = this.rangeOffset(offset)
      const left = this.rangeLeft(this.state.left + offset,this.props.width)
  
      const value = calcValue(this)

      this.setState({left,value})

      this.setState({prevX: ox})
    }

  }

  onTouchEnd() {
    if (this.state.drag) this.setState({drag: false});
  }

  setValue(value) {
    if (isNaN(value)) throw new TypeError('arguments of setValue should be number type.');
    const left = parseInt(value / this.props.max * this.props.width);
    this.setState({left,value});
  }

  getValue() {
    return this.state.value;
  }

  render() {
    const wrapperStyle = { 
        width: this.props.width,
        height: this.props.height
    }
    const sliderStyle = {
      WebkitTransform: `translateX(${this.state.left}px)`
    }
    const fillStyle = {
      width:  this.state.left
    }
    return (
      <div>
        <div id= "sbk" className="wrapper" style={wrapperStyle} >
          <div id= "sfill" className="fill" style={fillStyle} ></div>
            <div id="sbnt" className="slider" style = {sliderStyle} onTouchStart={this.onTouchStart.bind(this)}  onTouchMove={this.onTouchMove.bind(this)}  onTouchEnd={this.onTouchEnd.bind(this)}></div>
          </div>
      </div>
    );
  }
}