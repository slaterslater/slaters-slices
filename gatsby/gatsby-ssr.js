import React from 'react';
import Layout from './src/components/Layout';
import { OrderProvider } from './src/components/OrderContext';

export function wrapPageElement({ element, props }) {
  return <Layout>{element}</Layout>;
}

// should the Layout component have a prop spread {...props}

export function wrapRootElement({ element }) {
  return <OrderProvider>{element}</OrderProvider>;
}
