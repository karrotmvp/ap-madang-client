import React from 'react';

export default function CompanyBubble() {
  return (
    <div className={'outer'}>
      <div className={'companyBubble'}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            transition: 'opacity 0.1s ease',
            opacity: 1,
            pointerEvents: 'none',
          }}
        >
          <div>image</div>
          <p
            style={{
              color: 'black',
              fontSize: 14,
              marginBottom: 6,
              fontWeight: 1000,
              maxWidth: 150,
              textAlign: 'center',
            }}
          >
            text
          </p>
          <p
            style={{
              color: 'black',
              fontSize: 14,
              marginBottom: 5,
              maxWidth: 100,
              opacity: 0.5,
            }}
          >
            text222
          </p>
        </div>
        <span className="text">서초</span>
      </div>
      <span className="text">서초</span>
    </div>
  );
}
