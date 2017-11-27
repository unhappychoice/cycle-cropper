import {DOMSource, VNode} from "@cycle/dom";
import Stream from "xstream";

export interface Sources {
    DOM: DOMSource;
    props$: Stream<Props|null|undefined>;
    image$: Stream<string>;
}

export interface Sinks {
    DOM: Stream<VNode>;
    cropper$: Stream<Cropper>;
    crop$: Stream<object>;
    cropEnd$: Stream<object>;
    cropMove$: Stream<object>;
    cropStart$: Stream<object>;
    zoom$: Stream<object>;
}

export interface Props {
    autoCrop?: boolean;
    autoCropArea?: number;
    background?: boolean;
    cropBoxMovable?: boolean;
    cropBoxResizable?: boolean;
    checkCrossOrigin?: boolean;
    checkOrientation?: boolean;
    center?: boolean;
    guides?: boolean;
    highlight?: boolean;
    minContainerWidth?: number;
    minContainerHeight?: number;
    minCanvasWidth?: number;
    minCanvasHeight?: number;
    minCropBoxWidth?: number;
    minCropBoxHeight?: number;
    modal?: boolean;
    movable?: boolean;
    preview?: string;
    responsive?: boolean;
    restore?: boolean;
    rotatable?: boolean;
    scalable?: boolean;
    toggleDragModeOnDblclick?: boolean;
    viewMode?: number;
    wheelZoomRation?: number;
    zoomable?: boolean;
    zoomOnTouch?: boolean;
    zoomOnWheel?: boolean;
}
