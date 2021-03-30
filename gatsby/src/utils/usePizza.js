import { useContext, useState } from 'react';
import OrderContext from '../components/OrderContext';

export default function usePizza({ pizzas, inputs }) {
  // const [order, setOrder] = useState([]);
  // moving useState up to the provider
  const [order, setOrder] = useContext(OrderContext);
  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }

  function removeFromOrder(index) {
    setOrder([...order.slice(0, index), ...order.slice(index + 1)]);
  }
  // TODO send this data to serverless function
  //
  return {
    order,
    addToOrder,
    removeFromOrder,
  };
}
