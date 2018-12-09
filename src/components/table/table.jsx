import React from 'react';
import './table.css';

export default class Table extends React.Component{
     constructor(props) {
        super(props)
        this.state = {
            visible: false
        };
    }
  componentDidMount() {
    this.setState({ visible: this.props.visible})
        
  }
  componentWillReceiveProps(props) {
        this.setState({visible: props.visible})
      //  console.log("componentWillReceiveProps",this.state.visible)
  }
  render(){
    if(this.state.visible){
      return (
       <div className="table-wrap">
        <div className="thead-bg"></div>
          <table>
            <thead >
              <tr>
                {
                 this.props.headers.map((head,index)=>
                  {
                    switch (index) {
                      case 0:
                        return <th style={{width: 200}} key={index}>{head}</th>
                      case 1:
                        return <th style={{width: 212}} key={index}>{head}</th>
                      default:
                        return <th key={index}>{head}</th>
                    }
                    
                  } ) 
                }
              </tr>
            </thead>
            <tbody>
              {
                this.props.data.map((row,i)=>{
                  return (<tr key={i}>
                  {
                     row.map((cell,index)=>{
                     return <td key={index}>{cell}</td>
                     })
                  }
                 </tr>)
                })
              }
            </tbody>
          </table>
       </div>
      );
    }else{
      return null
    }
  }
}