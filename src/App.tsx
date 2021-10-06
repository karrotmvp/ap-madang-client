import React from 'react';
import ReservationPage from './pages/ReservationPage/ReservationPage';
import { Navigator, Screen } from 'karrotframe';
import Mini from '@karrotmarket/mini';

const App = () => {
  const mini = new Mini();
  return (
    <Navigator
      onClose={() => {
        mini.close();
      }}
    >
      <Screen path="/" component={ReservationPage} />
      <Screen path="/reservation" component={ReservationPage} />
    </Navigator>
  );
};

export default App;
