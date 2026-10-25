import Cropper from "cropperjs";
import {Props} from "./interfaces";

export const toCropperOptions = (props: Props | null | undefined): Cropper.Options => {
    const { wheelZoomRation, ...options } = props || {};

    return { ...legacyWheelZoomRatio(wheelZoomRation), ...options };
};

const legacyWheelZoomRatio = (wheelZoomRation?: number): Cropper.Options =>
    wheelZoomRation === undefined ? {} : { wheelZoomRatio: wheelZoomRation };
