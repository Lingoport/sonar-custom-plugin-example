/*
 * Copyright (C) 2017-2017 SonarSource SA
 * All rights reserved
 * mailto:info AT sonarsource DOT com
 */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import LRMApp from './components/LRMApp';
import './style.css';

window.registerExtension('lingoport/lrm_page', options => {

  const { el } = options;

  render(
          <LRMApp
            project={options.component}
          />, el
  );

  return () => unmountComponentAtNode(el);
});
