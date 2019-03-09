# cycle-cropper
[![npm version](https://badge.fury.io/js/cycle-cropper.svg)](https://badge.fury.io/js/cycle-cropper)

cycle-cropper is component for [cropper.js](https://github.com/fengyuanchen/cropperjs)


### Usage

```typescript
import {CropperComponent} from "cycle-cropper";

const main = (sources: Sources): Sinks => {
    const imageInput$ = sources.DOM.select(".image");

    const cropperSinks = CropperComponent({
        DOM: sources.DOM,
        image$: imageInput$,
        props$: Stream.of({ aspectRatio: 1 }) // cropper options
    });

    const imageData$ = cropperSinks.crop$
        .compose(sampleCombine(cropperSinks.cropper$))
        .map(([_, cropper]) => cropper.getCroppedCanvas().toDataURL())

    const dom$ = Stream.of([p("Image Cropper")].concat(cropperSinks.DOM));

    return { DOM: dom$ };
};

run(main, {
    DOM: makeDOMDriver("#app")
});

```

### License

see [LICENSE](./LICENSE)