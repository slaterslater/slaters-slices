import React from 'react';
import Layout from './src/components/Layout';

export function wrapPageElement({ element, props }) {
  return <Layout>{element}</Layout>;
}

// should the Layout component have a prop spread {...props}
