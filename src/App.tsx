import React from 'react';
import ReservationPage from './pages/ReservationPage/ReservationPage';
import { Navigator, Screen } from 'karrotframe';

const App = () => (
  <Navigator
    onClose={() => {
      console.log('닫기버튼이 눌렸습니다');
    }}
  >
    <Screen path="/" component={ReservationPage} />
    <Screen path="/reservation" component={ReservationPage} />
  </Navigator>
);

export default App;
