import Cropper = require("cropperjs");
import {CropperCropEvent, CropperCropStepEvent, CropperZoomEvent} from "cropperjs";
import Stream from "xstream";
import sampleCombine from "xstream/extra/sampleCombine";
import {Actions} from "./intent";

export interface State {
    cropper?: object;
    crop$: Stream<object>;
    cropEnd$: Stream<object>;
    cropMove$: Stream<object>;
    cropStart$: Stream<object>;
    zoom$: Stream<object>;
}

export const model = (actions: Actions): Stream<State> =>
    actions.onImageElementLoaded$
        .take(1)
        .compose(sampleCombine(actions.onPropsLoaded$))
        .map(([element, props]) => {
            const crop$ = Stream.never();
            const cropEnd$ = Stream.never();
            const cropMove$ = Stream.never();
            const cropStart$ = Stream.never();
            const zoom$ = Stream.never();

            const crop = (e: CropperCropEvent) => crop$.shamefullySendNext(e);
            const cropend = (e: CropperCropStepEvent) => cropEnd$.shamefullySendNext(e);
            const cropmove = (e: CropperCropStepEvent) => cropMove$.shamefullySendNext(e);
            const cropstart = (e: CropperCropStepEvent) => cropStart$.shamefullySendNext(e);
            const zoom = (e: CropperZoomEvent) => zoom$.shamefullySendNext(e);

            const cropper = new Cropper(element, {
                ...props,
                crop,
                cropend,
                cropmove,
                cropstart,
                zoom
            });

            return { cropper, crop$, cropEnd$, cropMove$, cropStart$, zoom$ };
        })
        .startWith({
            crop$: Stream.never(),
            cropEnd$: Stream.never(),
            cropMove$: Stream.never(),
            cropStart$: Stream.never(),
            cropper: undefined,
            zoom$: Stream.never()
        });
