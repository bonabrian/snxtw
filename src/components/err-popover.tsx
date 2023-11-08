import React, { useState } from 'react';
import Floater from 'react-floater';

import Icons from '@/components/icons'; // cross used for the close button as backgroundImage and this does not work
// eslint-disable-next-line unused-imports/no-unused-imports
import { cn } from '@/lib/utils';

type Props = {
  err: object;
  // callback: (action: Action, data: Step) => void;
  cb: (action: Floater.Action, data: any) => void;
};

export default function ErrPopover({ cb = () => {}, err = {} }: Props) {
  console.group('ErrPopover');
  //  console.log(err);

  // func accept array of steps {object of  string values} and a boolean value to run the tour
  const [isOpen, setOpen] = useState(true);
  const [errObj, setErrObj] = useState(err);

  console.log(Object.keys(errObj).length);
  const handleClick = () => {
    setOpen((s) => !s);
  };
  const title = (
    <div className="flex justify-between">
      <div className="object-left">
        <h1 className="object-left  text-start text-[24px] text-stone-950">
          Load error
        </h1>{' '}
      </div>
      <div className="cursor-pointer object-right" onClick={handleClick}>
        {/* this is a hack to show the close button as an inline svg instead of using backgroundImage */}{' '}
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
              stroke-width="8px"
              fill="#EF4545"
              stroke="white"
            />
          </g>
        </svg>
      </div>
    </div>
  );
  const content = (
    <div>
      <h2 className="left-0 object-left  text-start text-stone-950">
        Load error
      </h2>
      <p className="text-[12px] text-gray-400">
        {String((errObj as any)?.downloadError?.config?.params?.filename) || ''}
      </p>
      <progress
        className="w-168 progress progress-error left-0 object-left"
        value="100"
        max="100"
      ></progress>
    </div>
  );
  const footer = (
    <div className="join flex justify-start space-x-4">
      <button
        className="link no-underline"
        onClick={() => {
          setErrObj({});
        }}
      >
        Clear(err=undefined)
      </button>
      <button className="link no-underline" onClick={handleClick}>
        Close
      </button>
    </div>
  );
  console.groupEnd();
  return (
    <>
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
            borderRadius: 8,
          },
        }}
      />
    </>
  );
}
