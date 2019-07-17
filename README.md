# cycle-cropper
[![npm version](https://badge.fury.io/js/cycle-cropper.svg)](https://badge.fury.io/js/cycle-cropper)
![Libraries.io dependency status for GitHub repo](https://img.shields.io/librariesio/github/unhappychoice/cycle-cropper.svg)
![npm bundle size](https://img.shields.io/bundlephobia/min/cycle-cropper.svg)
![npm](https://img.shields.io/npm/dt/cycle-cropper.svg)
![GitHub](https://img.shields.io/github/license/unhappychoice/cycle-cropper.svg)

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
