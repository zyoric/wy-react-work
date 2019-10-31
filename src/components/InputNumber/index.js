import React from 'react';
import propTypes from 'prop-types';
import classnames from 'classnames';
import './index.css';


/**
 * 数字输入组件
 */
export default class InputNumber extends React.Component {
    constructor() {
        super();
        this.state = {
            focus: false, // 是否聚焦
            value: 1, // 受控默认值
        };
        // 记录前一个值
        this.preValue = null;
    }

    static propTypes = {
        value: propTypes.number,  // 受控默认值
        size: propTypes.string,  // 输入框大小
        defaultValue: propTypes.number, // 非受控默认值
        onChange: propTypes.func,
        autoFocus: propTypes.bool // 是否自动聚焦
    }

    static defaultProps = {
        size: 'normal',
        autoFocus: true // 是否自动聚焦
    }

    componentDidMount() {
        if (this.props.defaultValue !== void 0 ) {
            this.setState({
                value:  this.props.defaultValue
            });
        }
    }

    /**
     * 是否受控
     *
     * @readonly
     * @memberof InputNumber
     */
    get isControl() {
        return 'value' in this.props;
    }

    get value() {
        return this.isControl ? this.props.value : this.state.value;
    }

    /**
     * 输入框值变化时
     *
     * @param {*} e
     * @memberof InputNumber
     */
    onChange(e) {
        const { onChange } = this.props;
        const value = this.format(e.target.value);
        if(!this.isControl) {
            this.setState({ value });
        }
        onChange && onChange(value);
    }

    /**
     * 转换输入值
     *
     * @param {*} str
     * @memberof InputNumber
     */
    format(str) {
        // 表示有小数点
        const haspot = str.indexOf('.') !== -1;
        //限制只能输入一个小数点
        if ( haspot ) {
            let _str = str.substr(str.indexOf(".") + 1);
            if ( _str.indexOf(".") !== -1 ) {
                str = str.substr(0,str.indexOf(".") + _str.indexOf(".") + 1);
            }
        }
        let last = '';
        const arr = str.split('.').filter(v => !!v);
        // 开头为空
        if(!arr.length) return '';
        if(arr[0] === '.') return '';
        if(haspot) {
            last = isNaN(parseInt(arr[1])) ? '' : parseInt(arr[1]);
        }
        let start = isNaN(parseInt(arr[0])) ? '' : parseInt(arr[0]);
        return haspot ? start + '.' + last : start;
    }

    render() {
        const { focus } = this.state;
        const { size, autoFocus } = this.props;
        this.preValue = this.value;
        const cls = classnames({
            focus,
            input: true,
            [`size-${size}`]: true,
            'react-ui__input': true
        });
        return <div className = {cls} >
            <input 
                autoFocus={autoFocus}
                value={this.value}
                onChange={(e)=>this.onChange(e)}
                onBlur={() => this.setState({ focus: false })}
                onFocus={() => this.setState({ focus: true })}/>
            </div>
    }
}