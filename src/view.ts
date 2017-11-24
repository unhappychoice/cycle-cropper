import {div, img, VNode} from "@cycle/dom";
import Stream from "xstream";

export const view = (): Stream<VNode> =>
    Stream.of(div(".cropper-container", [img("#cropper-image")]));
