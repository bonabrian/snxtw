/*
The file-popover.tsx is called from page.tsx with incoming arg and fileSize props and should handle and show popover floater for three different states:
1. downloaderror - in case downloaderror is passed to arg
then it should show svgErr, show the error message in the popover, as well as the repeat download and cancel buttons.
2. there is no error, OK object is passed to arg and fileSize>0 then you need to
show the progress of file downloading with
 const progressId = setTimeout(() => {
    if ((fileSize / 100) * prgress < fileSize) {
      setProgress(prgress + 1);
      setPercent(prgress + 1);
    }
  }, 50); and output to popover `w-168 progress progress-info value="${percent}" max="100"`
3. percent == 100 then we need to remove the progress of downloading the file and show `w-168 progress progress-success left-0 object-left' in the popover.
*/

/* eslint-disable unused-imports/no-unused-imports */
import React, { useEffect, useState } from 'react';
import Floater from 'react-floater';

type Props = {
  arg: object;
  fileSize: number;
  // callback: (action: Action, data: Step) => void;
  cb: (action: Floater.Action, data: any) => void;
};

const errSvg = (
  <svg
    aria-hidden="true"
    height="24px"
    preserveAspectRatio="xMidYMid"
    viewBox="0 0 96 96"
    width="24px"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path
        // simple red circle with x mark inside (inline svg) instead of using style backgroundImage so this is a dirty hack
        d="M30,30 L 66,66 M 30,66 L 66,30,M48,0C21.49,0,0,21.49,0,48s21.49,48,48,48s48-21.49,48-48S74.51 ,0,48,0z"
        strokeWidth="8px"
        fill="#EF4545"
        stroke="white"
      />
    </g>
  </svg>
);

// svg icon circle with #00BE64 background and checkmark inside
const completeSvg = (
  <svg
    aria-hidden="true"
    height="24px"
    preserveAspectRatio="xMidYMid"
    viewBox="0 0 96 96"
    width="24px"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path
        // simple green circle with checkmark inside (inline svg) instead of using style backgroundImage so this is a dirty hack
        d="M30,30 L 66,66 M 30,66 L 66,30,M48,0C21.49,0,0,21.49,0,48s21.49,48,48,48s48-21.49,48-48S74.51 ,0,48,0z"
        strokeWidth="8px"
        fill="#00BE64"
        stroke="white"
      />
    </g>
  </svg>
);

function distinguishResponse(response: any) {
  if (response.downloadError && response.downloadError.status !== 200) {
    return 'fail';
  } else if (response.status === 200) {
    return 'OK';
  } else {
    return 'unknown';
  }
}

export default function FilePopover({
  cb = () => {},
  arg = {},
  fileSize = 0,
}: Props) {
  console.group('ErrPopover');
  //  console.log(err);
  console.log(distinguishResponse(arg));
  console.log(fileSize);

  //code to show progress bar for file download with percentage using fileSize props
  const [prgress, setProgress] = useState(0);
  const [percent, setPercent] = useState(0);
  // func accept array of steps {object of  string values} and a boolean value to run the tour
  const [isOpen, setOpen] = useState(true);
  const [okObj, setOkObj] = useState(arg);
  const [errObj, setErrObj] = useState(arg);

  useEffect(() => {
    if (distinguishResponse(arg) === 'OK') {
      setOkObj(arg);
    } else if (distinguishResponse(arg) === 'fail') {
      setErrObj(arg);
    }
  }, [arg]);

  useEffect(() => {
    const progressId = setTimeout(() => {
      if ((fileSize / 100) * prgress < fileSize) {
        setProgress(prgress + 1);
        setPercent(prgress + 1);
      }
    }, 50);
    return () => clearTimeout(progressId);
  }, [prgress, fileSize]);

  console.log(Object.keys(arg).length);
  const handleClick = () => {
    setOpen((s) => !s);
  };
  const title = (
    <div className="flex justify-between rounded-md">
      <div className="object-left">
        <h1 className="ml-[-0.1rem] object-left text-start text-[24px] text-stone-950">
          {/* three different states of h1 text */}
          {/* err state */}
          {distinguishResponse(arg) === 'fail' && 'Download failed'}
          {/* progress state */}
          {distinguishResponse(arg) === 'OK' &&
            percent < 100 &&
            'Downloading file'}
          {/* complete OK state */}
          {distinguishResponse(arg) === 'OK' &&
            percent === 100 &&
            'Download complete'}
        </h1>{' '}
      </div>
      <div className="cursor-pointer object-right" onClick={handleClick}>
        {/* this is a hack to show the close button as an inline svg instead of using backgroundImage */}
        {/* three different states of div svg */}
        {/* err state */}
        {distinguishResponse(arg) === 'fail' && errSvg}
        {/* progress state not needed svg for progress state should be empty*/}
        {/* complete OK state */}
        {distinguishResponse(arg) === 'OK' && percent === 100 && completeSvg}
      </div>
    </div>
  );
  const content = (
    <div>
      <h2 className="left-0 object-left  text-start text-stone-950">
        {/* three different states of h2 text */}
        {/* err state */}
        {distinguishResponse(arg) === 'fail' && 'Download failed'}
        {/* progress state */}
        {distinguishResponse(arg) === 'OK' &&
          percent < 100 &&
          'Downloading file'}
        {/* complete OK state */}
        {distinguishResponse(arg) === 'OK' &&
          percent === 100 &&
          'Download complete'}
      </h2>
      <p className="text-[12px] text-gray-400">
        {/* three different states of p text */}
        {/* err state */}
        {distinguishResponse(arg) === 'fail' &&
          'The file could not be loaded' +
            ' ' +
            (errObj as any)?.downloadError?.message +
            ' '}
        {distinguishResponse(arg) === 'fail' &&
          String((errObj as any)?.downloadError?.config?.params?.filename)}
        {/* progress state */}
        {distinguishResponse(arg) === 'OK' &&
          percent < 100 &&
          'Download in progress: ' +
            String((okObj as any)?.config?.params?.filename) +
            ' ' +
            percent +
            '%'}

        {/* complete OK state */}
        {distinguishResponse(arg) === 'OK' &&
          percent === 100 &&
          'Download complete: ' +
            String((okObj as any)?.config?.params?.filename)}
      </p>
      {/* two different states of progressbar */}
      {/* progress state and complete state */}
      <div>
        {distinguishResponse(arg) === 'OK' ? (
          <>
            {percent < 100 ? (
              <progress
                className="w-168 progress progress-info left-0 object-left"
                value={percent.toString()}
                max="100"
              />
            ) : (
              <progress
                className="w-168 progress progress-success left-0 object-left"
                value={100}
                max={100}
              />
            )}
          </>
        ) : (
          <progress
            className="w-168 progress progress-error left-0 object-left"
            value={100}
            max={100}
          />
        )}
      </div>
    </div>
  );
  const footer = (
    <div
      className={
        distinguishResponse(arg) === 'OK'
          ? 'join ml-[-0.5rem] flex justify-start space-x-2'
          : 'join ml-0 flex justify-start space-x-2'
      }
    >
      <button
        className="link no-underline"
        onClick={() => {
          setErrObj({});
          setOkObj({});
        }}
      >
        {/* three different states of p text */}
        {/* err state */}
        {distinguishResponse(arg) === 'fail' && 'Repeat download'}
        {/* progress state */}
      </button>
      <button className="link no-underline" onClick={handleClick}>
        {/* three different states of p text */}
        {/* err state */}
        {distinguishResponse(arg) === 'fail' && 'Close'}
        {/* progress state */}
        {distinguishResponse(arg) === 'OK' && percent < 100 && 'Cancel'}
        {/* complete OK state */}
        {distinguishResponse(arg) === 'OK' && percent === 100 && 'Close'}
      </button>
    </div>
  );
  console.groupEnd();
  return (
    <div className="rounded-md">
      <Floater
        callback={cb}
        title={title}
        content={content}
        footer={footer}
        open={isOpen}
        placement="center"
        styles={{
          options: {
            zIndex: 1000,
          },
          floater: {
            maxWidth: 418,
            width: '100%',
          },
        }}
      />
    </div>
  );
}
