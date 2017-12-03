import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Homepage from '../../app/components/homepage/Homepage';

export default function(req, res) {
  const element = React.createElement(Homepage);
  const html = ReactDOMServer.renderToString(element);

  res.render('homepage', {
    sourceName: 'homepage',
    pageTitle: 'Trump Taxes',
    reactHTML: html,
  });
}
