import React from 'react';
import ReactDOM from 'react-dom';
import /* @echo ModuleReactName */ from './index.js';
import '../core/core.scss';

ReactDOM.render(
    </* @echo ModuleReactName */
        prop="string"
    >
    component content here
    <//* @echo ModuleReactName */>,
    document.getElementById('root')
);