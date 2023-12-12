import {
  getBaseAttributes,
  validateBoolean,
} from "./utils";

export const metadata = {
  tag: "slideshow",
  type: "WIDGET",
  description: " Displays a slideshow of images.",
  attributes: getBaseAttributes([
    {
      name: "dataset",
      description: "Specify the dataset name; It is expected that a dataset will contains the slides metadata.",
      required: false,
      mappedInputAttribute: "datasetName",
      type: "string",
      example: `<slideshow dataset="datasetName"/>`
    },
    {
      name: "slide-show-options",
      description: "Specify the configuration of a slide show.",
      required: true,
      mappedInputAttribute: "slideshowOptions",
      type: "object",
      objectbinding: true,
      example: `
      AppController:
        slideShowOptions = {
          images: [
            {

            }
          ],

        }
      source.xml
        <slideshow slide-show-options="appCtrl.slideShowOptions"/>
      
      `
    },



  ], "slideshow"),
  allowedChildren: null,
  declarativeComponentTag: "ng-declarative-slideshow",
};
