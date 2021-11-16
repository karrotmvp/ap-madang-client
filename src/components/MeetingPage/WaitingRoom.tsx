import React, { ReactElement } from 'react';

function WaitingRoom({
  setInCall,
}: {
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
}): ReactElement {
  return (
    <div className="join WaitingRoom">
      <button
        onClick={e => {
          e.preventDefault();
          setInCall(true);
        }}
      >
        모임으로 이동중입니다.
      </button>
    </div>
  );
}

export default WaitingRoom;
