import {DOMSource, VNode} from "@cycle/dom";
import Cropper from "cropperjs";
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

type HandledEvents = "crop" | "cropend" | "cropmove" | "cropstart" | "zoom";

export interface Props extends Omit<Cropper.Options, HandledEvents> {
    /** @deprecated Misspelled alias of `wheelZoomRatio`, kept for backward compatibility. */
    wheelZoomRation?: number;
}
