// animations/services/intersection-observer.service.ts
import { Injectable, Optional } from '@angular/core';

export class IntersectionObserverServiceConfig {
    root?: Element | null;
    rootMargin?: string;
    threshold?: number | number[];
}

export type CallbackType = (inViewport?: boolean, element?: Element) => void;

export interface WatchedItem {
    element: Element;
    callback: CallbackType;
}

@Injectable({
    providedIn: 'root'
})
export class IntersectionObserverService {
    options: IntersectionObserverServiceConfig = {
        rootMargin: '0px',
        threshold: 0.1,
    };

    // where Intersection is support
    supported = false;

    watching: Array<WatchedItem> = [];

    observer: IntersectionObserver | null;

    /**
     * Assigns the user config if they wish to
     * override the defaults by using forRoot
     * @param {IntersectionObserverServiceConfig} config
     */
    constructor(@Optional() config: IntersectionObserverServiceConfig) {
        this.supported =
            'IntersectionObserver' in window && 'IntersectionObserverEntry' in window;

        if (config) {
            this.options = { ...this.options, ...config };
        }

        this.observer = this.supported
            ? new IntersectionObserver(this.handleEvent.bind(this), this.options)
            : null;
    }

    /**
     * Handles events made by the observer
     * @param {IntersectionObserverEntry[]} entries
     */
    handleEvent(entries: IntersectionObserverEntry[]): void {
        //console.log("============>>>> DEBUG >>>> handleEvent >>>>>", entries);
        entries.forEach((entry: IntersectionObserverEntry) => {
            const target = this.watching.find((element) => {
                return element.element === entry.target;
            });

            if (entry.isIntersecting) {
                console.log("Is Intersecting true");
                // un observe after intersecting
                this.observer?.unobserve(entry.target);

                // callback
                target?.callback(true, entry.target);

                // remove item in watching list
                this.watching = this.watching.filter(
                    (element) => element.element !== entry.target
                );
            } else {
                console.log("Is Intersecting false");
            }
        });
    }

    /**
     * Adds the target to our array so we can call its
     * call back when it enters the viewport
     * @param {Element} element
     * @param {CallbackType} callback
     */
    addTarget(element: Element, callback: CallbackType): void {
        this.observer?.observe(element);

        this.watching.push({
            element: element,
            callback: callback,
        });
    }

    isSupported() {
        return this.supported;
    }
}
