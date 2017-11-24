import Cropper = require("cropperjs");
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

export const model = (actions: Actions): Stream<State> => {
    return actions.onImageElementLoaded$
        .compose(sampleCombine(actions.onPropsLoaded$))
        .map(([element, props]) => {
            const crop$ = Stream.empty();
            const cropEnd$ = Stream.empty();
            const cropMove$ = Stream.empty();
            const cropStart$ = Stream.empty();
            const zoom$ = Stream.empty();

            const crop = (e) => crop$.shamefullySendNext(e);
            const cropEnd = (e) => cropEnd$.shamefullySendNext(e);
            const cropMove = (e) => cropMove$.shamefullySendNext(e);
            const cropStart = (e) => cropStart$.shamefullySendNext(e);
            const zoom = (e) => zoom$.shamefullySendNext(e);

            const cropper = new Cropper(element, {
                ...props,
                crop,
                cropEnd,
                cropMove,
                cropStart,
                zoom
            });

            return { cropper, crop$, cropEnd$, cropMove$, cropStart$, zoom$ };
        })
        .startWith({
            crop$: Stream.empty(),
            cropEnd$: Stream.empty(),
            cropMove$: Stream.empty(),
            cropStart$: Stream.empty(),
            cropper: undefined,
            zoom$: Stream.empty()
        });
};
