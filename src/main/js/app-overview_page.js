/*
 * Copyright (C) 2017-2017 SonarSource SA
 * All rights reserved
 * mailto:info AT sonarsource DOT com
 */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import OverviewApp from './components/OverviewApp';
import './style.css';

window.registerExtension('lingoport/overview_page', options => {

  const { el } = options;

  render(
          <OverviewApp
            project={options.component}
          />, el
  );

  return () => unmountComponentAtNode(el);
});
