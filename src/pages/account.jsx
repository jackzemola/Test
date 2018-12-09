import React from 'react';
import EOS from 'eosjs';
import EOSConfig from'../config.js';

import '../css/account.css';

export default class Account extends React.Component {
	constructor(props) {
		super(props)
		this.state = { 
			accout:0,
			balance:0
		}

	}
	componentWillReceiveProps(props) {
        this.setState({accout: props.visible})
        
      //  console.log("componentWillReceiveProps",this.state.visible)
    }
	getUserAccount(){
		console.log("getUserAccount:")
		let eosClient = EOS(EOSConfig.clientConfig)
		eosClient.contract(EOSConfig.contractName)
		.then((contract) => {
		  eosClient.getTableRows({"scope":EOSConfig.contractName, "code":EOSConfig.contractName, "user":"record", "json": true})
		  .then((result) => { 
		    let rows = result.rows
		    let len = rows.length
		    console.log('getTableRows ok',rows,len)
		    for(let i = 0; i < len; i++){
		      let name = result.rows[i].name
		      let balance = result.rows[i].balance
		      if(this.state.accout === name){
		      	this.setState({balance:balance})
		      	break;
		      }  
		    }
		  })
		  .catch((err) => { console.log(err) })
		})
	}
	render() {
		return (
		<div className="account">
			<div className="account_title">我的账户</div>
			<hr/>			
			<div className="account_name">wjzeostreecx</div>		
			<div className="account-info account_balance clearfix">
				<div className="account_balance_title">账户余额</div>
				<div className="account_balance_num">2.06 EOS</div>
			</div>
				<div className="account-info bet_num clearfix">
					<div className="bet_num_title">投注数量</div>
					<div className="bet_num_num">26</div>
				</div>
				<div className="account-info win_num clearfix">
					<div className="win_num_title">获胜局数</div>
					<div className="win_num_num">8</div>
				</div>
			<div className="account-info bet_price clearfix">
				<div className="bet_price_title">投注总额</div>
				<div className="bet_price_num">23.05</div>
			</div>
			<div className="account-info bonus_price clearfix">
				<div className="bonus_price_title">奖金总额</div>
				<div className="bonus_price_num">107.65</div>
			</div>
			
			<div className="account_details_title">账户明细</div>
			<hr/>
			<div className="account_details_type">
				<div className="account_details_type_time">时间</div>
				<div className="account_details_type_event">事件</div>
				<div className="account_details_type_price">金额</div>
			</div>
			<hr/>	
			<div className="account_details_list">
				<div className="account_details_type_time">10.28 10:00:00</div>
				<div className="account_details_type_event">slfsldj</div>
				<div className="account_details_type_price">1.85 EOS</div>
			</div>
		</div>
		);
	}
}