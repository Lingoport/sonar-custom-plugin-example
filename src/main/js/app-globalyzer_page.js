/*
 * Copyright (C) 2011-2019 Lingoport Inc
 * All rights reserved
 * info AT lingoport DOT com
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
