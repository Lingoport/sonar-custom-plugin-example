/*
 * Copyright (C) 2011-2019 Lingoport Inc
 * All rights reserved
 * info AT lingoport DOT com
 */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ControlApp from './components/ControlApp';

window.registerExtension('lingoport/control_page', options => {

  const { el } = options;

  render(
          <ControlApp
            project={options.component}
          />, el
  );

  return () => unmountComponentAtNode(el);
});
