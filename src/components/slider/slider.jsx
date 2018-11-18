import React from 'react';
import deepCompare from 'react-addons-deep-compare';

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
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    //this.onMouseFillDown = this.onMouseFillDown.bind(this);
    
    this.onMouseUp = this.onMouseUp.bind(this);
    this.setValue = this.setValue.bind(this);
    this.getValue = this.getValue.bind(this);
  }

  componentDidMount() {
    //window.addEventListener('mousemove', this.onMouseFillDown);
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);
  }
 componentWillUnMount() {
   // window.removeEventListener('mousemove', this.onMouseFillDown);
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
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

  // onMouseFillDown(event) {
 //    var offsetLeft = event.target.offsetLeft   
 //    const width = calcWidth(event.clientX,offsetLeft, this.props.width);
 //    const value = calcValue(this);
 //    this.setState({width,value,drag: true,});
 //    //console.log("event.target",event.target)
 //    //console.log("event.currentTarget",event.currentTarget)
 //    console.log("FillDown:cx[%d]-offs[%f]-w[%d]-v[%d]",event.clientX,offsetLeft,width,value)
   
 //  }

  onMouseDown(event) {
    
   // console.log("Down",event.target.id)
    if(event.target.id == 'sbnt') {
      this.setState({drag: true});
      var ox = event.clientX
      this.setState({prevX: ox});
      //console.log("Down",ox,event.clientX)
      //isDrag = true
      return
    }
 
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
  // calcValue({state,props}){

  //   return parseInt(state.left / props.width * props.max);
  // }
  onMouseMove(event) {
   
    if (this.state.drag)
    {

      var ox = event.clientX
      var offset = ox - this.state.prevX
     // offset = this.rangeOffset(offset)
      const left = this.rangeLeft(this.state.left + offset,this.props.width)
  
      const value = calcValue(this)

      this.setState({left,value})
      //console.log("Move[%s]:cx[%d]ox[%d]left[%d]-ofs[%d]",event.target.id,event.clientX,ox,left,offset)
      this.setState({prevX: ox})
    }

  }

  onMouseUp() {

    //isDrag = false
    if (this.state.drag) this.setState({drag: false});
   // console.log("Up")

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
  
  /*
    display: 'inline-block',
  */
    const wrapperStyle = {
        position: 'relative', 
        marginLeft: '150px',   
        width: this.props.width,
        height: this.props.height,
        backgroundColor: '#0e0e1b',
        border: '1px solid darkgray',
    }
    const sliderStyle = {
      position: 'absolute', 
      marginTop: '-30px',
      marginLeft: '-30px',
      left: this.state.left,
      width: '79px',
      height: '79px',
      display: 'inline-block',
      backgroundImage:"url(" + require("../../img/slider.png") + ")",
      cursor: 'pointer',
    }
    const fillStyle = {
      display: 'inline-block',
      width:  this.state.left,
      height: '16px',
      background: '#f7b700',
    }
    return (
      <div>
        <div id= "sbk" style={wrapperStyle} >
          <div id= "sfill" style={fillStyle} ></div>
            <div id="sbnt" style = {sliderStyle} onMouseDown={this.onMouseDown}></div>
          </div>
      </div>
     
    );
  }
}