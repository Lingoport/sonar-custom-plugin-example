/*
 * Copyright (C) 2011-2019 Lingoport Inc
 * All rights reserved
 * info AT lingoport DOT com
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
