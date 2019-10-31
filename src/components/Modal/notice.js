import React from 'react';
import ReactDom from 'react-dom';

/**
 *  拆分开的提示对话框, 便于控制状态
 */
export default class Notice extends React.Component {
    constructor() {
        super();
        this.state = {
            show: true,
            autoClose: true
        }
    }

    componentDidMount() {
        const { duration, type } = this.props;
        // 确认对话框不自动关闭
       if(duration && type !== 'confirm') {
            this.setState({
                timeLeft: duration
            }, () => {
                this.setCountDown();
            });
        }
    }

    /**
     * 设置倒计时关闭
     *
     * @memberof Notice
     */
    setCountDown() {
        this.timer = window.setInterval(() => {
            this.setState({
                timeLeft: this.state.timeLeft - 1
            }, () => {
                const { timeLeft } = this.state;
                if(!timeLeft) {
                    window.clearInterval(this.timer);
                    this.close('已关闭');
                }
            });
        }, 1000);
    }

    componentWillUnmount() {
        try {
            window.clearInterval(this.timer);
        } catch(e) {
            console.log(e);
        }
    }

    /**
     *  关闭对话框
     */
    close(data) {
        const { callBack } = this.props;
        callBack && callBack(data);
        this.setState({show: false}, () => {
            // 动画完成再卸载组件
            const { elem } = this.props;
            setTimeout(() => {
                ReactDom.unmountComponentAtNode(elem);
            }, 300);
        });
    }

    /**
     * 得到底部button
     * @param { } type 
     */
    getFooter(type) {
        switch (type) {
            case 'info':
                return null;
            case 'confirm':
                return <div className="modal-footer">
                    <button className="modal-footer-button" onClick={(e) => this.onCancel(e)}>取消</button>
                    <button className="modal-footer-button" onClick={(e) => this.onConfirm(e) }>确定</button>
                </div>;
            default:
                return null;
        }
    }

    /**
     * 点击确定
     * @param { } e 
     */
    onConfirm(e) {
        const { onConfirm } = this.props;
        this.close('您点击了确定');
        onConfirm && onConfirm(e);
    }

    /**
     * 点击取消
     * @param { } e 
     */
    onCancel(e) {
        const { onCancel } = this.props;
        this.close('您点击了取消');
        onCancel && onCancel(e);
    }
    

    render() {
        let { type, content, mask, title, maskClosable, footer } = this.props;
        const { show } = this.state;
        const footers = footer || this.getFooter(type);

        return <div className={`modal-overlay ${show ? '':'closed-overlay'} ${mask ? 'mask': ''}`} 
                onClick={() => maskClosable && this.close('您点击了蒙层关闭')} >
                <div className={`modal modal-${type} ${mask ? '': 'no-mask-modal'}`} onClick={(e) =>  e.stopPropagation()}>
                <div className={`modal-content ${show ? '' : 'closed-content'}`}>
                {title ? <div className="modal-title">{title}</div> : null}
                {content ? <div className="modal-text">{content}</div>:null}
                {footers}
                </div>
            </div>
        </div>
    }
}