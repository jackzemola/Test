import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import EOS from 'eosjs';
import EOSConfig from '../config.js';



import Slider from '../components/slider/slider';
import Modal from '../components/modal/modal';
import Toast from '../components/toast/toast';
import Table from '../components/table/table';

import '../css/main.css';
import '../css/reset.css';


let userArray = [
  ["player1", "0.2000 SYS"],
  ["player2", "0.2000 SYS"],
  ["player3", "0.2000 SYS"],
  ["player4", "0.2000 SYS"],
  ["player5", "0.2000 SYS"],
]
let uindex = 0

function randomRange(n, m) {
  return Math.floor(Math.random() * (m - n + 1) + n)
}
let count = 0



export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gameState: 0,
      gameSum: 0,
      nextSum: 0,
      waitMinutes: 0,
      waitSeconds: 0,
      currUserCount: 0,
      currStatus: false,
      userNumber: 1,
      showModal: false,
      betOn: false,
      betRes: 0,
      showToast: false,
      showTable: false,
      userList: [],
      winners: []
    }

  }
  componentDidMount() {

    // this.getGameState(1)
    // this.doTimeCount()
  }
  componentWillUnmount() {
    // this.undoTimeCount()
  }
  clearState() {
    this.setState({
      userList: []
    })
    this.setState({
      gameState: 0
    })
  }
  sendTest() {
    let eosClient = EOS(EOSConfig.clientConfig)
    eosClient.contract(EOSConfig.contractName)
      .then((contract) => {
        contract.testupdate("tester", { authorization: ['tester'] })
          .then((res) => {
            this.setState({ currStatus: 'success' }); console.log("sendTest OK")
          })
          .catch((err) => { this.setState({ currStatus: 'fail' }); console.log(err) })
      })
  }
  sendUserBet() {
    if (uindex > 4) {
      //this.doTimeCount()
      console.log("sendUserBet Break")
      return
    }
    if (uindex > 0)
      this.setState({ userNumber: randomRange(1, 100) });

    let name = userArray[uindex][0]
    let asset = userArray[uindex][1]
    let number = this.state.userNumber
    console.log("sendUserBet ", uindex, name, asset, number)
    uindex++

    let eosClient = EOS(EOSConfig.clientConfig)
    eosClient.contract(EOSConfig.contractName)
      .then((contract) => {
        contract.userbet(name, asset, number, { authorization: [name] })
          .then((res) => { console.log(res) })
          .catch((err) => { console.log(err) })
      })
  }
  sendUpdate() {
    let eosClient = EOS(EOSConfig.clientConfig)
    this.setState({ currStatus: 'loading' })
    eosClient.contract(EOSConfig.contractName)
      .then((contract) => {
        contract.update("tester", { authorization: ['tester'] })
          .then((res) => { console.log("sendUpdate OK") })
          .catch((err) => { this.setState({ currStatus: 'fail' }); console.log(err) })
      })

  }
  getGameState(s) {
    //console.log("getGameState")
    let eosClient = EOS(EOSConfig.clientConfig)
    eosClient.contract(EOSConfig.contractName)
      .then((contract) => {
        eosClient.getTableRows({ "scope": EOSConfig.contractName, "code": EOSConfig.contractName, "table": "gmstate", "json": true })
          .then((result) => {

            var state = result.rows[0].state
            var sum = result.rows[0].sum;
            var userNum = result.rows[0].user_count
            var waitTime = result.rows[0].await_time
            var minutes = parseInt(waitTime / 60)
            var seconds = parseInt(waitTime % 60)
            if (s === 1) {
              this.setState({ gameSum: sum });
              console.log("First")
            }
            this.setState({ gameState: state });
            this.setState({ nextSum: sum });
            this.setState({ currUserCount: userNum });
            this.setState({ waitMinutes: minutes });
            this.setState({ waitSeconds: seconds });

            //console.log("getGameState",state,sum,userNum)

          })
          .catch((err) => { this.setState({ currStatus: 'fail' }); console.log(err) })
      })
  }//
  getResult() {
    console.log("getRecord:")
    let eosClient = EOS(EOSConfig.clientConfig)
    eosClient.contract(EOSConfig.contractName)
      .then((contract) => {
        eosClient.getTableRows({ "scope": EOSConfig.contractName, "code": EOSConfig.contractName, "table": "record", "json": true })
          .then((result) => {
            let rows = result.rows
            let len = rows.length
            console.log('getTableRows ok', rows, len)
            let list = this.state.userList
            let count = 0
            for (let i = 0; i < len; i++) {
              let name = result.rows[i].name
              let time = result.rows[i].timebet
              let balance = result.rows[i].balance
              let iswin = result.rows[i].winner
              let winner = iswin ? 'winner' : 'lose'
              let r = time + '------' + name + '-----' + balance + '----' + winner
              list[count] = r
              count++
              this.setState({ userList: list })
            }
          })
          .catch((err) => { this.setState({ currStatus: 'fail' }); console.log(err) })
      })
  }
  //time sch
  timeTick() {

    this.getGameState(0)

    console.log("gameState:%d sum%d next%d user%d", this.state.gameState, this.state.gameSum, this.state.nextSum,
      this.state.currUserCount)
    if (this.state.gameSum < this.state.nextSum && this.state.gameState !== 1) {
      console.log("game end", this.state.gameSum, this.state.nextSum)
      //
      uindex = 0
      this.setState({ gameSum: this.state.nextSum })
      this.setState({ currUserCount: 0 });
      //
      this.getResult()
      this.createRecord()

      clearInterval(this.interval);

    } else if (this.state.gameState == 1) {

      console.log("game waiting")
      this.sendUpdate()

    } else {
      console.log("game start")
    }
  }
  doTimeCount() {
    this.interval = setInterval(() => this.timeTick(), 5000);
  }
  undoTimeCount() {
    clearInterval(this.interval);
  }
  unitTest() {

    let wlist = this.state.winners;
    wlist.push("player1")
    wlist.push("player2")
    wlist.push("player3")
    wlist.push("player3")
    wlist.push("player3")

    let list = this.state.userList;
    list.push(['10.11 20:10:10', 'player1', '0.2']);
    list.push(['10.11 20:10:20', 'player2', '0.3']);
    list.push(['10.11 20:10:30', 'player3', '0.4']);

    // const data=[
    //   ['Tfd rod','J.F','English','1954-1955','150milion'],
    //   ['Td rod','E.A','English','1904-1965','250milion'],
    //   ['Tsc rod','S.F','English','1944-1987','550milion'],
    //   ['Tfg rod','J.O','English','1923-1951','190milion'],
    //   ['Txfe rod','U.P','English','1914-1947','230milion']
    // ];

    //   let str = list.map((row,i)=>{
    //             return (<tr key={i}>
    //               {
    //                  row.map((cell,index)=>{
    //                  return <td key={index}>{cell}</td>
    //                  })
    //               }
    //              </tr>)
    //     })

    // console.log(str);

    if (this.state.gameState == 0) {
      this.betOnClick()
      this.setState({ gameState: 1 })
    }
    if (this.state.gameState == 1) {
      this.openModal()
      this.setState({ gameState: 0 })
    }
    this.openTable()

    this.setState({ currStatus: 'success' })
  }
  /*
  <table>
        <tr>
          <th>Time</th>
          <th>Account</th>
          <th>Bouns</th>
        </tr>
        <tr>
          <td>Peter</td>
          <td>Griffin</td>
          <td>$100</td>
        </tr>         
    </table>
     <div dangerouslySetInnerHTML =visible={this.state.showToast} {this.createUserBet()}/>
 */
  createUserBet() {
    if (this.state.userList.length > 0) {
      console.log("createUserBet")
      var html = ""
      html += '<table>'
      html += ' <tr> <th>Time</th><th>Account</th><th>Bouns</th></tr>'
      for (var i in this.state.userList) {
        html += '<tr>'
        html += '<td>' + this.state.userList[i].time + '</td>'
        html += '<td>' + this.state.userList[i].name + '</td>'
        html += '<td>' + this.state.userList[i].balance + '</td>'
        html += '</tr>'
      }
      html += '</table>'
      console.log(html);
      return { __html: html };
    }

  }
  createRecord() {
    if (this.state.userList.length > 0) {
      console.log("createRecord")
      var html = ""
      for (var i in this.state.userList) {
        html += '<p>' + this.state.userList[i] + '</p>'
      }
      return { __html: html };
    }
  }

  onSliderChange(event, value) {
    //console.log("onSliderChange",value)
    this.setState({ userNumber: value })
  }
  openTable() {
    this.setState({ showTable: true })
  }
  closeTable() {
    this.setState({ showTable: false })
  }
  openModal() {
    this.setState({ showModal: true })
  }

  closeModal() {
    this.setState({ showModal: false })
  }

  confirmModal() {
    this.setState({ showModal: false })
  }
  openToast() {
    this.setState({ showToast: true })

  }
  onToastHandle(value) {
    console.log("onToastHandle", value)
    this.setState({ showToast: value })
  }
  betOnClick() {

    if (!this.state.betOn) {
      //  let style = this.refs['betRes'].style
      //  console.log("ref",style.height)
      //  //style.background =  '#f7b700'
      // // style.width = 1000
      //  style.display = 'block'
      this.setState({ betRes: 'Bet Success' })
      this.setState({ betOn: true })
      this.setState({ showToast: true })

    } else {
      this.setState({ betRes: 'Bet Fail' })
      this.setState({ showToast: true })
    }
    //console.log("showToast",this.state.showToast,this.state.betOn)

  }

  renderTest() {
    return (
      <div>
      </div>
    )

  }
  render() {
    if (false) {
      console.log('test ...')
      return (this.renderTest())
    } else {


      return (this.renderMain())
    }
  }
  renderMain() {

    return (
      <div>
        <div className="empty01">
        </div>
        <div className="main_mod">
          <div className="main_bg1">
            <div className="num_players_title">Num</div>
            <div className="num_price_title">Overall Price</div>
          </div>
          <div className="main_bg2">
            <div className="num_players">{this.state.currUserCount}</div>
            <div className="num_price">{this.state.currUserCount * 0.2}</div>
            <div className="num_price_EOS">EOS</div>
          </div>

          <div className="main_bg3">
            <div className="countdown_title">Countdown</div>
            <div className="countdown">0:{this.state.waitMinutes}:{this.state.waitSeconds}</div>
          </div>
          <div className="user_picknumber" >{this.state.userNumber}</div>
          <div className="main_bg4" ></div>
          <div className="main_bg5">
            <Slider height={10} width={570} max={100} onChange={this.onSliderChange.bind(this)} />
            <div className="empty01 clearfix">
              <div className="fn-left startNum">1</div>
              <div className="fn-right endNum">100</div>
            </div>
            <Toast visible={this.state.showToast} text={this.state.betRes} onChange={this.onToastHandle.bind(this)} />
          </div>

          <div className="main_bg6">
            <Modal
              visible={this.state.showModal}
              title="Bonus"
              bonus="0.5 EOS"
              winners="2 winners"
              confirm={this.confirmModal.bind(this)}
              onClose={this.closeModal.bind(this)}
            >
              {this.state.winners.map((m, i) => <span key={`winner-${i}`}>{m}<br /></span>)}
            </Modal>
            <div className="main_bet_btn" onClick={this.unitTest.bind(this)}></div>
          </div>
        </div>
        <div className="orders_mclassod">
          <div className="orders_mod_menu">
            <div className="orders_mod_menu1"><p>All Orders</p></div>
            <div className="orders_mod_menu2"><p>My Orders</p></div>
          </div>
          <Table visible={this.state.showTable} headers={['Time', 'Account', 'Bouns']} data={this.state.userList}></Table>

        </div>
        <div className="footer_mod">
        </div>
      </div>
    )
  }
}

