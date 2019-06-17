import Cropper from "cropperjs";
import Stream from "xstream";
import sampleCombine from "xstream/extra/sampleCombine";
import {Actions} from "./intent";

export interface State {
    cropper?: any;
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

            const crop = (e: CustomEvent) => crop$.shamefullySendNext(e);
            const cropend = (e: CustomEvent) => cropEnd$.shamefullySendNext(e);
            const cropmove = (e: CustomEvent) => cropMove$.shamefullySendNext(e);
            const cropstart = (e: CustomEvent) => cropStart$.shamefullySendNext(e);
            const zoom = (e: CustomEvent) => zoom$.shamefullySendNext(e);

            const options = {
                ...props,
                crop,
                cropend,
                cropmove,
                cropstart,
                zoom
            };

            const cropper = new Cropper(element, options);

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
