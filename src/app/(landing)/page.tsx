'use client';

import disableScroll from 'disable-scroll';
import React from 'react';

// import { button } from '@/components/ui/button';
import FilePopover from '@/components/file-popover';
// mock  responses  from axios both for ok and error
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

//mock ok response from axios
const axiosOK = {
  data: {},
  status: 200,
  statusText: 'OK',
  headers: {
    allow: 'GET, HEAD, OPTIONS',
    connection: 'close',
    'content-disposition': 'attachment; filename="statistics.xls"',
    'content-length': '5080',
    'content-type': 'application/vnd.ms-excel',
    'cross-origin-opener-policy': 'same-origin',
    date: 'Fri, 10 Nov 2023 19:41:44 GMT',
    'referrer-policy': 'same-origin',
    server: 'gunicorn',
    vary: 'RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Url, Accept, origin',
    'x-content-type-options': 'nosniff',
    'x-frame-options': 'DENY',
  },
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
      filename: 'stat.xlsx',
    },
    responseType: 'blob',
    method: 'get',
    url: 'http://localhost:3000/api/download/statfile.xlsx',
  },
  request: {},
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
  const [downloadOK, setDownloadOK] = React.useState<{}>({});
  const [fileSize, setFileSize] = React.useState<number>(0); // from axiosOK 'content-length' get the file size

  const handleClickOK = () => {
    setDownloadOK(axiosOK);
    setFileSize(Number(axiosOK.headers['content-length']));
  };

  const handleClickClear = () => {
    setDownloadError({});
    setDownloadOK({});
  };

  const handleClickErr = () => {
    setDownloadError(axioserr);
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="card flex w-96 items-center justify-center bg-neutral text-neutral-content">
          <div className="card-body items-center text-center">
            <h2 className="card-title">
              Example of show popover for three states of file download
            </h2>
            <p>for error, progress and complete state</p>
            {Object.keys(downloadError).length > 0 ? (
              <div className="card-actions justify-end">
                <button onClick={handleClickClear} className="btn btn-primary">
                  Clear up
                </button>
              </div>
            ) : (
              <div className="card-actions justify-end">
                <button onClick={handleClickErr} className="btn btn-primary">
                  Do download, error
                </button>
              </div>
            )}
            {Object.keys(downloadOK).length > 0 ? (
              <button onClick={handleClickClear} className="btn btn-primary">
                Clear up data
              </button>
            ) : (
              <button onClick={handleClickOK} className="btn btn-primary">
                Do download, state ok
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center">
        {Object.keys(downloadError).length > 0 && (
          <FilePopover cb={callback} arg={downloadError} fileSize={fileSize} />
        )}
        {Object.keys(downloadOK).length > 0 && (
          <FilePopover cb={callback} arg={downloadOK} fileSize={fileSize} />
        )}
      </div>
    </>
  );
}
