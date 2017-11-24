import Stream from "xstream";
import {Props, Sources} from "./interfaces";

export interface Actions {
    onImageChanged$: Stream<string>;
    onImageElementLoaded$: Stream<any>;
    onPropsLoaded$: Stream<Props>;
}

export const intent = (sources: Sources): Actions => {
    const onImageChanged$ = sources.image$;
    const onImageElementLoaded$ = sources.DOM.select("#cropper-image").element();
    const onPropsLoaded$ = sources.props$;

    return { onImageChanged$, onImageElementLoaded$, onPropsLoaded$ };
};
