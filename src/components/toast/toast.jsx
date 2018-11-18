import React from 'react';
import './toast.css';


export default class Toast extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            text:0
        };
    }
    componentDidMount() {
        this.setState({ visible: this.props.visible})
        this.setState({text:this.props.text})
    }
    // componentWillMount() {
    //     this.setState({ visible: this.props.visible})
    //     this.setState({text:this.props.text})
    // console.log("componentWillMount",this.state.visible)
    // }
    
    componentWillUnmount() {
      if (this.timer) {
            clearTimeout(this.timer);
        }
    }
    componentWillReceiveProps(props) {
        this.setState({visible: props.visible})
        this.setState({text:props.text})
      //  console.log("componentWillReceiveProps",this.state.visible)
    }
    closeToast(){
        this.setState({visible: false});
        this.props.onChange(self.state.visible);
    }
    showToast() {
        var self = this;
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            self.setState({visible: false});
            this.props.onChange(self.state.visible);
        }, 2000);
    }
    render() {
        //console.log("render",this.state.visible)
        if(this.state.visible){
            this.showToast()
            return (
                <div className="toast">
                    {this.state.text}
                </div>
            );
        }else{
            return null
        }
    }
}