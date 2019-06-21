/*
 * Copyright (C) 2017-2017 SonarSource SA
 * All rights reserved
 * mailto:info AT sonarsource DOT com
 */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import GlobalyzerApp from './components/GlobalyzerApp';
import './style.css';

window.registerExtension('lingoport/globalyzer_page', options => {

  const { el } = options;

  render(
          <GlobalyzerApp
            project={options.component}
          />, el
  );

  return () => unmountComponentAtNode(el);
});
