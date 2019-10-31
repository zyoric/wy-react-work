import React from 'react';
import ReactDom from 'react-dom';
import './index.css';
import Notice from './notice';

const config = {
    title: '',
    content: '', // 可以是字符串 或者react dom
    type: "comfirm", // 可以是confirm，info,success,loading等
    onCancel: null, // 取消回调
    onConfirm: null, // 确认回调
    duration: 3, // 自动消失时间（可调用Modal.info体验）
    maskClosable: true, // 点击蒙层是否可关闭
    footer: null // 底部内容
};

/**
 * 对话框的内层封装，可以是confirm，info,success,loading等
 * @param {*} obj 配置信息
 * @param {*} callBack 为了拿到用户点击的结果的回调函数
 */
function notice(obj={}, callBack = null) {
    const options = {
        ...config,
        ...obj
    };
    const { container } = options;
    // 如果传入了容器就挂载到容器上，否则挂载到body
    const div = document.createElement('div');
    container ? container.appendChild(div) : document.body.appendChild(div);
    // 为了销毁时引用
    options.elem = div;
    ReactDom.render(<Notice {...options} callBack={callBack}/> , div);
}


/**
 *  对话框
 */
export class Modal {

    /**
     * 外面 await 要拿到结果，得返回一个promise 
     *
     * @static
     * @memberof Modal
     */
    static confirm = (
        content = '',
        title = '我是标题',
        type = 'confirm',
        duration = 3,
        onClose = null, 
        onCancel= null,
        onConfirm=null,
        maskClosable = true,
        footer = null,
        mask = true) => new Promise(resolve => 
            notice({
                title,
                content, 
                type, 
                duration,
                onClose, 
                onCancel, 
                onConfirm,
                mask,
                maskClosable,
                footer
            }, (res) => {
                resolve(res);
            })
        );

        static info = (
            content = '',
            title,
            type = 'info',
            duration = 3,
            onClose = null, 
            onCancel= null,
            onConfirm=null,
            maskClosable = false,
            footer = null,
            mask = true) => new Promise(resolve => 
                notice({
                    title,
                    content, 
                    type, 
                    duration,
                    onClose, 
                    onCancel, 
                    onConfirm,
                    mask,
                    maskClosable,
                    footer
                }, (res) => {
                    resolve(res);
                })
            );
}

export default {
    Modal,
    Notice,
    Comfirm: Modal.comfirm
}