import type { ReactNode } from 'react';
import React, { useState } from 'react';
import Joyride from 'react-joyride';

import Icons from '@/components/icons'; // cross used for the close button as backgroundImage and this does not work
import { cn } from '@/lib/utils';

type Placement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'left'
  | 'left-start'
  | 'left-end';
type Action = 'back' | 'close' | 'last' | 'next' | 'skip';

type Step = {
  // content: JSX.Element;
  content: ReactNode;
  disableBeacon?: boolean;
  locale: Record<Action, JSX.Element>;
  placement?: Placement | 'auto' | 'center';
  target: string | HTMLElement;
  title?: ReactNode;
};

type State = {
  run: boolean;
  steps: Step[];
};

type Props = {
  err: object;
};

export default function ErrPopover({ err = {} }: Props) {
  console.group('ErrPopover');
  //  console.log(err);

  // func accept array of steps {object of  string values} and a boolean value to run the tour
  const [state, setState] = useState<State>({
    run: true,
    steps: [
      {
        title: (
          <div className="flex justify-between">
            <div className="object-left">
              <h1 className="ml-2 object-left  text-start text-[24px] text-stone-950">
                Load error
              </h1>{' '}
            </div>
            <div className="object-right">
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
        ),
        content: (
          <div>
            <h2 className="left-0 object-left  text-start text-stone-950">
              Load error
            </h2>
            <p className="text-[12px] text-gray-400">
              {String((err as any).downloadError.config.params.filename)}
            </p>
            <progress
              className="progress progress-error w-168 left-0 object-left"
              value="100"
              max="100"
            ></progress>
          </div>
        ),
        locale: {
          back: <strong>Back</strong>,
          close: <strong>Close</strong>,
          last: <strong>Last</strong>,
          next: <strong>Next</strong>,
          skip: <strong>Skip</strong>,
        },
        placement: 'center',
        target: 'body',
      },
    ],
  });

  const { run: errrun, steps: errsteps } = state;

  return (
    <>
      <Joyride
        steps={errsteps}
        run={errrun}
        continuous={false}
        hideCloseButton={false}
        showProgress={false}
        showSkipButton={false}
        styles={{
          buttonClose: {
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            // this property does not work, so use the svg above coded inline
            backgroundImage: `url(${Icons.cross})`, // expected to work with joyride
            // as backgroundImage does not work so do not show the close button for, use an inline svg instead
            width: 1,
            height: 1,
          },
          buttonNext: {
            //also hide the next button
            display: 'none',
          },
          tooltipContainer: {
            textAlign: 'left',
          },
          tooltip: {
            background: '#fff',
            borderRadius: 8,
            color: '#000',
            textAlign: 'left',
            padding: '1rem',
            width: 418,
          },
        }}
      />
    </>
  );
}
