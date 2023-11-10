import * as React from 'react';
import { CSSProperties, MouseEventHandler, ReactNode, FunctionComponent, ReactElement } from 'react';
import { RequireExactlyOne, PartialDeep } from 'type-fest';
import { Instance, Placement as Placement$1 } from '@popperjs/core';
import { ApplyStylesModifier } from '@popperjs/core/lib/modifiers/applyStyles';
import { ArrowModifier } from '@popperjs/core/lib/modifiers/arrow';
import { ComputeStylesModifier } from '@popperjs/core/lib/modifiers/computeStyles';
import { EventListenersModifier } from '@popperjs/core/lib/modifiers/eventListeners';
import { FlipModifier } from '@popperjs/core/lib/modifiers/flip';
import { HideModifier } from '@popperjs/core/lib/modifiers/hide';
import { OffsetModifier } from '@popperjs/core/lib/modifiers/offset';
import { PopperOffsetsModifier } from '@popperjs/core/lib/modifiers/popperOffsets';
import { PreventOverflowModifier } from '@popperjs/core/lib/modifiers/preventOverflow';

type PopperInstance = Instance;
type PopperPlacement = Placement$1;
interface PopperModifiers {
    applyStyles?: Partial<ApplyStylesModifier>;
    arrow?: Partial<ArrowModifier>;
    computeStyles?: Partial<ComputeStylesModifier>;
    eventListeners?: Partial<EventListenersModifier>;
    flip?: Partial<FlipModifier>;
    hide?: Partial<HideModifier>;
    offset?: Partial<OffsetModifier>;
    popperOffsets?: Partial<PopperOffsetsModifier>;
    preventOverflow?: Partial<PreventOverflowModifier>;
}

type Action = 'open' | 'close';
type CloseFunction<T = HTMLElement> = MouseEventHandler<T>;
type Placement = PopperPlacement | 'center';
type SelectorOrElement = string | null | HTMLElement;
interface CustomComponentProps {
    closeFn: CloseFunction;
}
type FloaterComponent<T = CustomComponentProps> = FunctionComponent<T> | ReactElement<T>;
interface BaseProps {
    /**
     * Open the Floater automatically.
     * @default false
     */
    autoOpen?: boolean;
    callback?: (action: Action, props: Props) => void;
    children?: ReactNode;
    /**
     * A React element or function to be used as the custom UI for the Floater.
     * The prop closeFloater will be available in your component.
     */
    component: FloaterComponent;
    content: ReactNode;
    /**
     * Log some actions.
     * @default false
     */
    debug?: boolean;
    /**
     * Disable placement adjustments on scroll/resize.
     * @default false
     */
    disableFlip?: boolean;
    /**
     * Disable the conversion of hover to click on mobile.
     * @default false
     */
    disableHoverToClick?: boolean;
    /**
     * The event type that will trigger the Floater.
     * Unused in controlled mode.
     * @default click
     */
    event?: 'click' | 'hover';
    /**
     *  The amount of time (in seconds) that the floater should wait after a mouseLeave event before hiding.
     *  Only valid for event type hover.
     *  @default 0.4
     *  */
    eventDelay?: number;
    footer?: ReactNode;
    getPopper?: (popper: PopperInstance, origin: 'floater' | 'wrapper') => void;
    /**
     * Hide the arrow.
     * @default false
     */
    hideArrow?: boolean;
    id?: string;
    modifiers?: PopperModifiers;
    /**
     * The distance between the target and the Floater in pixels.
     * @default 15
     */
    offset?: number;
    open?: boolean;
    /**
     * The placement of the Floater
     * This will be updated automatically if there's no space available unless the "disableFlip" is set to true
     * @default bottom
     */
    placement?: Placement;
    portalElement?: SelectorOrElement;
    /**
     * Show a button to close the Floater.
     * @default false
     */
    showCloseButton?: boolean;
    style?: CSSProperties;
    styles?: PartialDeep<Styles>;
    target?: SelectorOrElement;
    title?: ReactNode;
    wrapperOptions?: {
        offset?: number;
        placement?: PopperPlacement;
        position?: boolean;
    };
}
type Props = RequireExactlyOne<BaseProps, 'content' | 'component'>;
interface Styles {
    arrow: CSSProperties & {
        length: number;
        spread: number;
    };
    close: CSSProperties;
    container: CSSProperties;
    content: CSSProperties;
    floater: CSSProperties;
    floaterCentered: CSSProperties;
    floaterClosing: CSSProperties;
    floaterOpening: CSSProperties;
    floaterWithAnimation: CSSProperties;
    floaterWithComponent: CSSProperties;
    footer: CSSProperties;
    options: {
        zIndex: number;
    };
    title: CSSProperties;
    wrapper: CSSProperties;
    wrapperPosition: CSSProperties;
}
declare global {
    interface Window {
        ReactFloaterDebug?: boolean;
    }
}

declare function ReactFloater(props: Props): React.JSX.Element;
declare namespace ReactFloater {
    var defaultProps: {
        autoOpen: boolean;
        debug: boolean;
        disableFlip: boolean;
        disableHoverToClick: boolean;
        event: string;
        eventDelay: number;
        hideArrow: boolean;
        offset: number;
        placement: string;
        showCloseButton: boolean;
    };
}

export { Action, CustomComponentProps, Placement, PopperInstance, Props, Styles, ReactFloater as default };
export = ReactFloater