'use client';

import disableScroll from 'disable-scroll';
import React from 'react';

// import { button } from '@/components/ui/button';
import ErrPopover from '../../components/err-popover';

const axioserr = {
  downloadError: {
    message: 'Request failed with status code 401',
    name: 'AxiosError',
    stack:
      'AxiosError: Request failed with status code 401\n    at settle (webpack-internal:///)\n    at XMLHttpRequest.onloadend (webpack-internal:///)',
    config: {
      transitional: {
        silentJSONParsing: true,
        forcedJSONParsing: true,
        clarifyTimeoutError: false,
      },
      adapter: ['xhr', 'http'],
      transformRequest: [null],
      transformResponse: [null],
      timeout: 0,
      xsrfCookieName: 'XSRF-TOKEN',
      xsrfHeaderName: 'X-XSRF-TOKEN',
      maxContentLength: -1,
      maxBodyLength: -1,
      env: {},
      headers: {
        Accept: 'application/json, text/plain, */*',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
      params: {
        filename: 'file.xlsx',
      },
      responseType: 'blob',
      method: 'get',
      url: 'http://localhost:3000/api/download/file.xlsx',
    },
    code: 'ERR_BAD_REQUEST',
    status: 401,
  },
};

function callback(action: any, data: any) {
  // eslint-disable-next-line no-console
  console.log(action, data);

  if (data.placement === 'center') {
    disableScroll[action === 'open' ? 'on' : 'off']();
  }
}

export default function Home() {
  const [downloadError, setDownloadError] = React.useState<{}>({});

  const handleClick1 = () => {
    setDownloadError({});
  };

  const handleClick2 = () => {
    setDownloadError(axioserr);
  };

  return (
    <>
      <div className="flex items-center justify-center">
        {Object.keys(downloadError).length > 0 ? (
          <button onClick={handleClick1} className="object-center">
            Clear up downloadError
          </button>
        ) : (
          <button onClick={handleClick2}>
            Do set downloadError - show popover{' '}
          </button>
        )}
        {Object.keys(downloadError).length > 0 && (
          <ErrPopover cb={callback} err={downloadError} />
        )}
      </div>
    </>
  );
}
