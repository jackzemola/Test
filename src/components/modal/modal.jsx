import React, { Component } from 'react';
import NewPortal from './newPortal.jsx';
import Transition from './transition.jsx';
import './modal.css';
class Modal extends Component {
  constructor(props) {
    super(props)
    this.confirm = this.confirm.bind(this)
    this.maskClick = this.maskClick.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.state = {
      visible: false,
    }
  }

  componentDidMount() {
    this.setState({ visible: this.props.visible })
  }

  componentWillReceiveProps(props) {
    this.setState({ visible: props.visible })
  }

  closeModal() {
    console.log('closeModal')
    const { onClose } = this.props
    onClose && onClose()
    this.setState({ visible: false })
  }

  confirm() {
    console.log('confirm')
    const { confirm } = this.props
    confirm && confirm()
    this.setState({ visible: false })
  }

  maskClick() {
    console.log('maskClick')
    this.setState({ visible: false })
  }
  //  <button onClick={this.closeModal} className="modal-operator-close">Cancal</button>
  render() {
    const { visible } = this.state;
    const { title,bonus,winners,children } = this.props;
    return <NewPortal>
      <Transition
        visible={visible}
        transitionName="modal"
        enterActiveTimeout={200}
        enterEndTimeout={100}
        leaveActiveTimeout={100}
        leaveEndTimeout={200}
      >
        <div className="modal">
          <div className="modal-main_bg1">
            <div className="modal-title">{title}</div>
          </div>
          <div className="modal-main_bg2">
            <div className="modal-bonus">{bonus}</div>
          </div>
          <div className="modal-main_bg3">
            <div className="modal-winners">{winners}</div>
          </div>
          <div className="modal-main_bg4">
            <div className="modal-content">{children}</div>
          </div>
          <div className="modal-operator">        
            <div className="modal-operator-confirm" onClick={this.confirm} >OK</div>
          </div>
        </div>
        {/* <div
          className="mask"
          onClick={this.maskClick}
        ></div> */}
      </Transition>
    </NewPortal>
  }
}
export default Modal;