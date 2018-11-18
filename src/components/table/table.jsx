import React from 'react';
import './table.css';

export default class Table extends React.Component{
     constructor(props) {
        super(props)
        this.state = {
            visible: false
        };
    }
    /*
              html += '<table>'
          html += ' <tr> <th>Time</th><th>Account</th><th>Bouns</th></tr>'
          for (var i in this.state.userList) {
            html+= '<tr>'
            html+= '<td>'+this.state.userList[i].time+'</td>'
            html+= '<td>'+this.state.userList[i].name+'</td>'
            html+= '<td>'+this.state.userList[i].balance+'</td>'
            html+= '</tr>' 
          }
          html += '</table>'
    */
  componentDidMount() {
    this.setState({ visible: this.props.visible})
        
  }
  componentWillReceiveProps(props) {
        this.setState({visible: props.visible})
      //  console.log("componentWillReceiveProps",this.state.visible)
  }
  /*
  var btnType=Object.keys(obj).map((key,i)=>{
    var item=obj[key].map((s,index)=>{
      return (
        <button className={styles.btnType} key={index}>{obj[key][index]}</button>
      )
    })
    return(
      <Card title={key} className={styles.marginB10} key={i}>
        {item}
      </Card> 
    )
  })
  */
  render(){
    if(this.state.visible){
      return (
       <div>
          <table>
            <thead >
              <tr>
                {
                 this.props.headers.map((head,index)=>
                  <th key={index}>{head}</th> ) 
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