import { Component, Input, TemplateRef, OnChanges, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ApplicationService } from './ng-declarative-components.service';
import { Base } from './ng-declarative-components-base.component';
import { AnimationService } from './ng-declarative-animation.service';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ng-declarative-slideshow',
    template: `
    <ngb-carousel
    [ngStyle]="getComponentStyles()"
    [ngClass]="getcComponentClasses()"
	#carousel
	[interval]="slideshowOptions.interval ? slideshowOptions.interval : 5000"
	[pauseOnHover]="slideshowOptions.pauseOnHover ? slideshowOptions.pauseOnHover : false"
	[pauseOnFocus]="slideshowOptions.pauseOnFocus ? slideshowOptions.pauseOnFocus : false"
    [showNavigationArrows]="slideshowOptions.showNavigationArrows ? slideshowOptions.showNavigationArrows : false"
    [showNavigationIndicators]="slideshowOptions.showNavigationIndicators ? slideshowOptions.showNavigationIndicators : true"
	(slide)="slideshowOptions.onSlide?slideshowOptions.onSlide($event):nothing()"
>
@if(slideshowOptions?.images){
	@for (img of slideshowOptions?.images; track img; let i = $index) {
		<ng-template ngbSlide>
			<div class="carousel-caption">
                @if(img.captionTemplate){
				    <p [innerHtml]="img?.captionTemplate()" ></p>
                }
                @else if(img.captionHeader || img.caption){
                    @if(img.captionHeader){
                        <p class="header">{{img.captionHeader}}</p>
                    }
                    @if(img.caption){
                        <p> {{img.caption}}
                    }
                }
			</div>
			<div (click)="img.onClick?img.onClick():nothing()">
				<div class="picsum-img-wrapper">
					<img [ngClass]="{'fit-slides':fitSlides}" [id]="img?.id" [src]="img.uri" [alt]="img?.alt" />
				</div>
            </div>
		</ng-template>
	}
}
</ngb-carousel>

    `,
    styles: [
        `
        :host{
            display: contents;
        }
        .fit-slides {
            width : 100%;
            object-fit: cover;
        }

    `
    ],
})
export class SlideshowComponent extends Base implements OnChanges, OnInit {
    @Input() datasetName: any | undefined;
    @Input() slideshowOptions: SlideshowOptions | any;
    @Input() fitSlides: boolean = true;

    public dataset: any[] = [];

    @ViewChild('carousel', { static: true }) carousel: NgbCarousel | undefined;


    constructor(elementRef: ElementRef,
        animationService: AnimationService,
        app: ApplicationService) {
        super(elementRef, animationService, app);
        this.componentLoading = true;
    }

    nothing() {

    }
    override ngOnInit() {
        console.log("Slide Show Component Style DEBUG from base:", this.getComponentStyles())
        try {
            if (this.datasetName) {
                if (this.app.datasets[this.datasetName].isReady()) {
                    this.dataset = this.app.datasets[this.datasetName].dataset$;
                    this.componentLoading = false;
                } else {
                    this.app.datasets[this.datasetName].dataset.subscribe((value: any) => {
                        this.dataset = value;
                        this.componentLoading = false;
                    });
                }
            }

        } catch (err) {
            this.app.handleFrameworkError(err);
            this.componentLoading = false;
        }
    }


    ngOnChanges() {

    }

}

interface Slide {
    id?: string;
    uri: string;
    alt?: string;
    onClick?: (slide: any) => {};
    captionTemplate?: () => string,
    captionHeader?: string;
    caption?: string;
}

interface SlideshowOptions {
    navigationArrows?: boolean;
    navigationIndicators?: boolean;
    interval?: number;
    paused?: boolean;
    unpauseOnArrow?: boolean;
    pauseOnIndicator?: boolean;
    pauseOnHover?: boolean;
    pauseOnFocus?: boolean;
    onSlide?: (event: any) => {};
    images: Slide[];
}
