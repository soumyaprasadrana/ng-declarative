import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApplicationService } from './ng-declarative-components.service';

@Component({
    selector: 'ng-declarative-dataset',
    template: ``
})
export class DataLoaderComponent implements OnChanges {
    @Input() name: string | undefined;
    @Input() type: string = 'json';
    @Input() src: string | object[] = '';
    @Input() dataKey: string = '';
    @Input() schema: object | string = '';
    @Input() preLoad: boolean = true;
    @Output() dataLoaded = new EventEmitter<any[]>();
    @Input() autoupgrade: boolean = true;

    private datasetSubject = new BehaviorSubject<any[]>([]);
    private newItem: any = {};
    public dataset$: any;
    public datasetObservable: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

    public origionaldataset: any;
    private isDatasetReady: boolean = false;
    private hasError: boolean = false;
    private errorMessage: string = "";

    constructor(private http: HttpClient,
        private app: ApplicationService) {
        this.datasetSubject.asObservable().subscribe((value) => {
            if (!Array.isArray(value)) {
                if (this.autoupgrade) {
                    try {
                        value = this.convertObjectToList(value);
                    } catch (err) {
                        console.log("Auto upgrade failed unbale toconvert the object into list");
                    }
                }
            }
            this.dataset$ = value;
            this.datasetObservable.next(value);
            this.origionaldataset = value;
            if (value.length != 0)
                this.isDatasetReady = true;
        });
    }
    ngOnChanges(changes: SimpleChanges): void {
        console.log(">>>> DATASET DEBUG NG ON CHANGES >>>>>");
        if (this.type === 'json') {
            this.datasetSubject.next(this.src as object[]);
        } else if (this.type === 'json-file') {
            this.loadDataFromFile(this.src as string).subscribe((data) => {
                this.datasetSubject.next(data);
            });
        } else if (this.type === 'url') {
            this.loadDataFromUrl(this.src as string).subscribe((data: any) => {
                if (this.dataKey)
                    this.datasetSubject.next(data[this.dataKey]);
                else
                    this.datasetSubject.next(data);
            });
        }
    }

    isReady() {
        return this.isDatasetReady;
    }

    public get dataset() {
        return this.datasetObservable;
    }



    ngOnInit() {
        console.log(">>>> DATASET DEBUG NG ONINIT >>>>> ")
        if (this.preLoad) {
            this.load();
        }
    }
    forceReload() {
        this.load();
    }
    load() {
        try {
            this.datasetSubject.subscribe((data) => {
                this.initializeData(data);
            });

            if (this.type === 'json') {
                this.datasetSubject.next(this.src as object[]);
            } else if (this.type === 'json-file') {
                this.loadDataFromFile(this.src as string).subscribe((data) => {
                    this.datasetSubject.next(data);
                });
            } else if (this.type === 'url') {
                this.loadDataFromUrl(this.src as string).subscribe((data: any) => {
                    if (this.dataKey)
                        this.datasetSubject.next(data[this.dataKey]);
                    else
                        this.datasetSubject.next(data);
                });
            }
            this.app.addDataset(this.name, this);
        }
        catch (err: any) {
            this.errorMessage = err;
            this.hasError = true;
            this.isDatasetReady = false;
        }
    }

    // Method to convert object to list
    convertObjectToList(obj: { [key: string]: { name: string } }): any[] {
        return Object.keys(obj).map(key => ({ ...obj[key], '#key': key }));
    }

    getDataset(): Observable<any[]> {
        return this.datasetSubject.asObservable();
    }

    addData(newItem: any) {
        const updatedDataset = this.datasetSubject.getValue().concat([newItem]);
        this.datasetSubject.next(updatedDataset);
    }

    updateData(index: number, updatedItem: any) {
        const updatedDataset = this.datasetSubject.getValue().slice();
        updatedDataset[index] = updatedItem;
        this.datasetSubject.next(updatedDataset);
    }

    deleteData(index: number) {
        const updatedDataset = this.datasetSubject.getValue().slice();
        updatedDataset.splice(index, 1);
        this.datasetSubject.next(updatedDataset);
    }

    private initializeData(data: any) {
        if (this.dataKey) {
            data = data[this.dataKey];
        }

        if (!Array.isArray(data)) {
            data = [];
        }

        if (this.schema) {
            this.newItem = this.createEmptyObject(this.schema);
        } else {
            this.newItem = {};
            for (const key in data[0]) {
                this.newItem[key] = '';
            }
        }

        this.dataLoaded.emit(data);
    }

    private loadDataFromFile(filePath: string): Observable<any[]> {
        return this.http.get(filePath).pipe((res: any) => res);
    }

    private loadDataFromUrl(url: string): Observable<any[]> {
        return this.http.get(url).pipe(
            (response: any) => response
        );
    }
    private createEmptyObject(schema: object | string | any): any {
        if (typeof schema === 'string') {
            return {};
        } else {
            const emptyObject: any = {};
            for (const key in schema) {
                emptyObject[key] = this.createEmptyObject(schema[key]);
            }
            return emptyObject;
        }
    }
}
