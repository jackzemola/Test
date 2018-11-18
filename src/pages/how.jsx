import React from 'react';
import '../css/how.css';
export default class How extends React.Component {
	constructor(props) {
		super(props)

	}
	render() {
		return (
		<div className="how">
			<div className="how_title">如何游戏</div>	
			<hr></hr>	
			<div className="how_content">
				<p>1.请确保您拥有EOS账户。如果还没有，请参考教程创建EOS账户。</p>
				<p>2.请确保您的设备已安装Scatter，如没有请参考教程进行安装（如您在TP等钱包客户端中进行游戏请忽略此项）。</p>
				<p>3.按下登入按钮登入游戏。</p>
				<p>4.通过拉动滑块来选择数字，然后点击投注按钮。</p>
				<p>5.按照提示进行钱包授权支付eos。</p>
				<p>6.提示成功即完成单次投注。</p>
				<p>7.等待倒计时结束进行开奖，中奖情况会显示在获奖名单中。</p>
				<p>8.如果收到交易失败通知，请检查您的账户是否有足够的CPU和NET资源，如资源不足请参考教程进行抵押。</p>
			</div>
		</div>
		);
	}
}