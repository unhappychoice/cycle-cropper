import {intent} from "./intent";
import {Sinks, Sources} from "./interfaces";
import {model} from "./model";
import {view} from "./view";
import sampleCombine from "xstream/extra/sampleCombine";

export const CropperComponent = (sources: Sources): Sinks => {
    const actions = intent(sources);
    const state$ = model(actions);
    const vdom$ = view();

    const cropper$ = state$.map(state => state.cropper);
    const crop$ = state$.map(state => state.crop$).flatten();
    const cropEnd$ = state$.map(state => state.cropEnd$).flatten();
    const cropMove$ = state$.map(state => state.cropMove$).flatten();
    const cropStart$ = state$.map(state => state.cropStart$).flatten();
    const zoom$ = state$.map(state => state.zoom$).flatten();

    actions.onImageChanged$
        .compose(sampleCombine(state$))
        .addListener({ next: ([image, state]) => state.cropper && state.cropper.replace(image) });

    return { DOM: vdom$, cropper$, crop$, cropEnd$, cropMove$, cropStart$, zoom$};
};
