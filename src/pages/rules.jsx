import React from 'react';
import '../css/rules.css';

export default class Rules extends React.Component {
	constructor(props) {
		super(props)

	}
	render() {
		return (		
      	<div className="rules">
			<div className="rules_title">游戏规则</div>	
			<hr></hr>
			<div className="rules_content">
				<p>1.每次投注金额为0.05EOS。</p>
				<p>2.每局结束后，系统将随机抽取20%用户平分80%奖金。</p>
				<p>3.当游戏人数达到10，将启动倒计时，30分钟后结束，不设置人数上限。</p>
				<p>4.游戏不足10人参加，会结束并将已投注的EOS返回玩家账户。</p>
				<div className="empty01"></div>
				<p>EOSXXX是一款公开透明的EOS链上游戏，因其是开源的且都在智能合约上执行，保证游戏的公平，不可作弊。抽取获奖用户的随机算法利用XXX作为种子来保证其随机性。</p>				
			</div>		
		</div>
      		
		);
	}
}