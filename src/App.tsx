import React from 'react';
import ReservationPage from './pages/ReservationPage/ReservationPage';
import { Navigator, Screen } from '@karrotframe/navigator';
import Mini from '@karrotmarket/mini';

export const mini = new Mini();

const App: React.FC = () => {
  return (
    <Navigator theme="Cupertino" onClose={() => mini.close()}>
      <Screen path="/" component={ReservationPage} />
    </Navigator>
  );
};

export default App;
