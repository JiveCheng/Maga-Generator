import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import classNames from 'classnames';
import styles from '../css.scss';

let Module = (props) => {
    const classes = classNames('/* @echo ModuleName */');
    return (
        <div styleName={classes} >
            {props.children}
        </div>
    );
};
/**
 * Props default value write here
 */
Module.defaultProps = {
    prop: 'string'
};
/**
 * Typechecking with proptypes, is a place to define prop api. [Typechecking With PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html)
 */
Module.propTypes = {
    prop: PropTypes.string.isRequired
};

export default CSSModules(Module, styles, { allowMultiple: true });
