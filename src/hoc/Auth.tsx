import React, { useCallback, useEffect, useState } from "react";

import { logEvent } from "@firebase/analytics";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { useRecoilState } from "recoil";

import { login } from "../api/user";
import { analytics } from "../App";
import { codeAtom, userInfoAtom } from "../store/user";
import mini from "../util/mini";
import { getRegionId } from "../util/utils";

type TokenPayloadType = {
  code: string;
  nickname: string;
  region: string;
} & JwtPayload;

const Auth = (SpecialComponent: React.FC) => {
  const AuthenticateCheck = (
    props: JSX.IntrinsicAttributes & {
      children?: React.ReactNode;
    }
  ) => {
    const [code, setCode] = useRecoilState(codeAtom);
    const [presetClosed, setPresetClosed] = useState(false);
    const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
    const storage = window.localStorage;

    // userInfo Atom에 유저정보 store
    const setUserNewInfoHandler = useCallback(async () => {
      const regionId = getRegionId(location.search);
      const regionIdHash = getRegionId(location.hash);
      if (code && (regionId || regionIdHash)) {
        const result = await login({
          code,
          regionId: regionId || regionIdHash,
        });
        if (result.success && result.data?.token) {
          storage.setItem("Authorization", result.data.token);
          const decodeToken: TokenPayloadType = jwt_decode(result.data.token);
          setUserInfo({
            nickname: decodeToken.nickname,
            region: decodeToken.region,
          });
        }
      }
    }, [code, setUserInfo, storage]);

    // url code param 가져오기 or mini로 code gererate
    const getCodeHandler = useCallback(() => {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const codeParams = urlSearchParams.get("code");
      const isPreload = urlSearchParams.get("preload");

      if (codeParams && !code) setCode(codeParams);
      else if (isPreload !== "true" && !code) {
        mini.startPreset({
          preset: process.env.REACT_APP_MINI_PRESET_URL || "",
          params: { appId: process.env.REACT_APP_APP_ID || "" },
          onSuccess(result: { code: string }) {
            if (result && result.code) {
              setCode(result.code);
            }
          },
          onClose() {
            setPresetClosed(true);
          },
        });
      }
    }, [code, setCode]);

    // 이미 jwt가 있는 경우 해당 jwt 발급 code가 현재 코드와 일치하는지 확인
    const checkAuth = useCallback(() => {
      const jwtToken = localStorage.getItem("Authorization");

      if (jwtToken) {
        const decodeToken: TokenPayloadType = jwt_decode(jwtToken);
        if (decodeToken.code === code) {
          setUserInfo({
            nickname: decodeToken.nickname,
            region: decodeToken.region,
          });
          return;
        }
      }
      setUserNewInfoHandler();
    }, [code, setUserNewInfoHandler, setUserInfo]);

    useEffect(() => {
      if (!code) {
        logEvent(analytics, "new_user_enter");
        getCodeHandler();
      }
      if (code && !userInfo) checkAuth();
    }, [checkAuth, code, getCodeHandler, userInfo]);

    useEffect(() => {
      if (presetClosed && !code) {
        logEvent(analytics, "close_preset");
        mini.close();
      }
    }, [code, presetClosed]);

    return <SpecialComponent {...props} />;
  };

  return AuthenticateCheck;
};

export default Auth;
