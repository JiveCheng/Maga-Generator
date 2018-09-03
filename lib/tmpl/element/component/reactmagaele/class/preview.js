import React from 'react';
import /* @echo ModuleReactName */ from './index.js';
import { storiesOf } from '@storybook/react';

/**
 * ## [Storybook Tutorial](https://www.learnstorybook.com/)
 */
storiesOf('/* @echo CategoryName */', module)
    .add('/* @echo ModuleName */', () => (
        <div>
            開始寫preview!
        </div>
    ));
