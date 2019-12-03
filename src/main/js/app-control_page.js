/*
 * Copyright (C) 2011-2019 Lingoport Inc
 * All rights reserved
 * info AT lingoport DOT com
 */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import OverviewApp from './components/OverviewApp';

window.registerExtension('lingoport/control_page', options => {

  const { el } = options;

  render(
          <OverviewApp
            project={options.component}
          />, el
  );

  return () => unmountComponentAtNode(el);
});
