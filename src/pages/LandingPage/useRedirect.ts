import { useCallback, useEffect, useState } from 'react';

import { getRegionName } from '../../api/reservation';
import { getRegionId } from '../../util/utils';

const SERVICE_REGION = ['서초구', '관악구'];

export const useRedirect = () => {
  const [redirectUrl, setRedirectUrl] = useState<string | undefined>();
  const regionId = getRegionId(location.search);

  // 온보딩이 필요한지
  const onBoardHandler = () => {
    if (!localStorage.getItem('onboard')) {
      setRedirectUrl('/guide');
    }
  };

  // 서비스 지역인지
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
    onBoardHandler();
  }, [regionId]);

  useEffect(() => {
    if (!regionId) return;
    regionHandler();
  }, [regionHandler, regionId]);

  return redirectUrl;
};
