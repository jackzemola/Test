import React from 'react';
import Modal from '../components/modal/modal';

export default class Test extends React.Component {
	constructor(props) {
		super(props)
		this.state = { 
		gameState:0,
		showModal:false,
		currStatus: false ,
		userList:[],
		winners:[]
		}

	}

	unitTest(){
      // console.log("list.push OK",count)
      // this.setState({ currStatus: 'success' })

      //  var waitTime  = 70
      //  var minutes = waitTime / 60
      //  var seconds = waitTime % 60

      // console.log("time %d-%d",minutes,seconds)

      // let s = 3
      // let v = false

      // if (v || s == 3) {
      //   console.log("v || s == 3 OK")
      // }else{
      //   console.log("v || s == 3 error")
      // }

      // this.setState({ currUserCount: this.state.currUserCount+1})

      
      var wlist = this.state.winners;
      wlist.push("player1")
      wlist.push("player2")
      wlist.push("player3")
      console.log(wlist);
      // var array = new Array(); // empty array
      // array.push({time: '2018-10-11 20:10:10',name:'player1', balance: '0.2'});
      // array.push({time: '2018-10-11 20:10:20',name:'player2', balance: '0.3'});
      // array.push({time: '2018-10-11 20:10:30',name:'player3', balance: '0.4'});
      // console.log(array);


      // var list = this.state.userList;
      // list.push({time: '2018-10-11T20:10:10',name:'player1', balance: '0.2'});
      // list.push({time: '2018-10-11T20:10:20',name:'player2', balance: '0.3'});
      // list.push({time: '2018-10-11T20:10:30',name:'player3', balance: '0.4'});
      // console.log(list);

      // list[0] = nw1
      // list[1] = nw2

      // shapes[0].time = "2018-10-11 20:10:30"
      // shapes[0].name = "player1"
      // shapes[0].balance = 0.2;


      // shapes[1].time = "2018-10-11 20:10:10"
      // shapes[1].name = "player2"
      // shapes[1].balance = 0.1;

      // var htm = this.createUserBet()
       this.setState({ currStatus: 'success' })

      // var name1 = 'Player1'
      // var isw = 1
      // var wstr = isw ? 'winner':'lose'
      // var nw1 = isw+'the'+name1+':'+wstr
      // console.log("res1:",nw1)
      // var name2 = 'Player2'
      // var isw2 = 0
      // var wstr2 = isw2 ? 'winner':'lose'
      // var nw2 = isw2+'the'+name2+':'+wstr2
      // console.log("res2:",nw2)

      // var list = this.state.userList; 
      // list[0] = nw1
      // list[1] = nw2
      // //randomRange(1,100)
      // this.setState({ userList: list})
      // console.log("userList.length",this.state.userList.length)

      // this.createRecord()
      // // count++

      // var a = this.state.userList
      // let arry = []
      // for (var i in a) {
      //   console.log(a[i])
      //   arry.push(<p key={i}>{a[i]}</p>)
      //   console.log(arry[i])
      // }
      // let arry = []
      // if(this.state.userList.length>0){
      //   this.state.userList.map((item)=>{
      //     console.log("key",item.key,item.content)
      //     arry.push(<p key={item.key}>{item.content}</p>)
      //   })
      // }

  	}
	openModal() {
	this.setState({showModal: true })
	}

	closeModal() {
	this.setState({showModal: false })
	}

	confirmModal() {
	this.setState({showModal: false })
	}
	render() {
		return (
	      <div>
	        <div>
	          <span>test: </span>
	          <button onClick={this.unitTest.bind(this)}>NeedTest</button>      
	          <button onClick={this.openModal.bind(this)}>Modal</button>
	           <Modal
	            visible={this.state.showModal}
	            title="Bonus"
	            bonus="0.5 EOS"
	            winners="2 winners"
	            confirm={this.confirmModal.bind(this)}
	            onClose={this.closeModal.bind(this)}
	          >
	          {this.state.winners.map((m, i)=> <span key={`userList-${i}`}>{m}<br/></span>)}
	          </Modal>
	          
	        </div>
	        
	        <div style={{ color: "red" }}>
	            {this.state.winners.map((m, i)=> <span key={`userList-${i}`}>{m}<br/></span>)}
	        </div>
	      
	      </div>
	    )
	}
}