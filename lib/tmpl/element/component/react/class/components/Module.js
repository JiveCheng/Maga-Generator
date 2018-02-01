import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import styles from '../css.scss';

class Module extends Component {
    constructor (props) {
        super(props);
        this.state = {
            // you state here
            statename: 'state'
        };
        // Init run
        // ...
    }
    /**
     * Lifecycle
     * =============================================
     * ．Mounting
     * componentWillMount()
     * componentDidMount()
     * ．Updating
     * componentWillReceiveProps( nextProps )
     * shouldComponentUpdate( nextProps, nextState )
     * componentWillUpdate( nextProps, nextState )
     * componentDidUpdate( prevProps, prevState )
     * ．Unmounting
     * componentWillUnmount()
     */

    /**
     * Property functions..
     */
    func (param) {
        return this;
    }
    /**
     * Render Notice：
     * 1. render 裡 setState 會造成回圈，setState -> render -> setState -> render ...
     * 2. 在render前的setSatae 放在 componentWillMount，render後的放在componentDidMount
     * 3. Keys 不要使用
     */
    render () {
        return (
            <div styleName="/* @echo ModuleName */" >
                {this.props.children}
            </div>
        );
    }
}
// Props default value write here
Module.defaultProps = {
    prop: 'string'
};

// Typechecking with proptypes, is a place to define prop api
Module.propTypes = {
    prop: PropTypes.string.isRequired
};

export default CSSModules(Module, styles, {
    allowMultiple: true
});
