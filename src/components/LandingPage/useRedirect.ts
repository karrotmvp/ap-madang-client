import { useCallback, useEffect, useState } from 'react';

import { getRegionId } from '../../util/utils';

export const useRedirect = () => {
  const [redirectUrl, setRedirectUrl] = useState<string | undefined>();
  const regionId = getRegionId(location.search);

  /* 서비스 지역인지
   const regionHandler = useCallback(async () => {
     const result = await getRegionName({
       region_id: regionId,
     });
     if (result.success && result.data) {
       if (!SERVICE_REGION.includes(result.data.region)) {
         setRedirectUrl(`/not-service-region?region=${result.data.region}`);
         return;
       }
     }
   }, [regionId]);
  */

  // 홈 진입시 음성 모임 링크 생성 페이지로 redirect
  const linkGeneratorHandler = useCallback(async () => {
    setRedirectUrl(`/generator`);
  }, []);

  useEffect(() => {
    if (!regionId) return;
    linkGeneratorHandler();
  }, [linkGeneratorHandler, regionId]);

  return redirectUrl;
};
