import React, { useCallback, useEffect, useRef } from 'react';

import styled from '@emotion/styled';
// import { collection, query, where } from 'firebase/firestore';
import {
  addDoc,
  collection,
  limit,
  onSnapshot,
  orderBy,
  //   orderBy,
  query,
  where,
} from 'firebase/firestore';
import { useThrottledCallback } from 'use-debounce';

import heart_emoji from '../../../assets/icon/agora/heart_emoji.svg';
// import { db } from '../../../util/firebase';
import { db } from '../../../util/firebase';
import ClickAnimation from '../util/ClickAnimation';
import { useClickAnimation } from '../util/useClickAnimation';

const EMOJI_SIZE = 25; //px 단위

type props = {
  meetingId: number;
  sendInteraction?: () => void;
  userId: number;
};

function EmojiInteraction({ sendInteraction, meetingId, userId }: props) {
  const { state, handleParticleSpawn, handleParticleDestroy } =
    useClickAnimation();
  const buttonRef = useRef<HTMLImageElement>(null);
  const timeStampRef = useRef(null);

  const emotionCollectionRef = collection(db, 'hello');
  const q = query(
    emotionCollectionRef,
    orderBy('createdAt', 'desc'),
    where('meetingId', '==', meetingId),
    limit(1),
  );

  const addEmotionDBHandler = async () => {
    await addDoc(emotionCollectionRef, {
      meetingId,
      type: 0,
      createdAt: new Date(),
      userId,
    });
  };

  const activateAnimation = useCallback(
    (e?: React.PointerEvent) => {
      if (buttonRef.current) {
        const clientX = e?.clientX ?? buttonRef.current.offsetLeft;
        const posX = clientX - EMOJI_SIZE,
          posY = 0;

        handleParticleSpawn(posX, posY);
      }
    },
    [handleParticleSpawn],
  );

  // db update throttle
  const throttledHandleSendInteraction = useThrottledCallback(() => {
    sendInteraction && sendInteraction();
    addEmotionDBHandler();
  }, 2000);

  // emoj button click event handler
  const handleOnPointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    activateAnimation(e);
    throttledHandleSendInteraction();
  };

  // emoji animation handler
  const throttledHandleOnPointerDown = useThrottledCallback(
    handleOnPointerDown,
    100,
  );

  useEffect(() => {
    const unsub = onSnapshot(q, snapshot => {
      const { docs } = snapshot;

      docs.forEach(doc => {
        const source = doc.metadata.hasPendingWrites ? 'Local' : 'Server';
        if (source === 'Local') return;

        const data = doc.data();
        if (timeStampRef.current === null) {
          timeStampRef.current = data.createdAt.seconds;
        } else if (data.createdAt.seconds === timeStampRef.current) {
          return;
        } else if (data.userId !== userId) {
          timeStampRef.current = data.createdAt.seconds;
          activateAnimation();
        }
      });
    });
    return () => {
      unsub();
    };
  }, [activateAnimation, meetingId, q, throttledHandleSendInteraction, userId]);

  return (
    <>
      <HeartBtn
        src={heart_emoji}
        ref={buttonRef}
        onPointerDown={throttledHandleOnPointerDown}
      />
      {state.particles.map(item => (
        <ClickAnimation
          key={item.id}
          size={EMOJI_SIZE}
          {...item}
          onDestroy={handleParticleDestroy}
        />
      ))}
    </>
  );
}

const HeartBtn = styled.img`
  width: 3rem;
  height: 3rem;
`;

export default EmojiInteraction;
