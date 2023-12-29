import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApplicationService } from './ng-declarative-components.service';

@Component({
    selector: 'ng-declarative-dataobject',
    template: ``
})
export class DataObjectComponent implements OnChanges {
    @Input() name: string | undefined;
    @Input() type: string = 'json';
    @Input() src: string | object = '';
    @Input() dataKey: string = '';
    @Input() schema: object | string = '';
    @Input() preLoad: boolean = true;
    @Output() dataLoaded = new EventEmitter<any>();
    @Input() parseresponse: boolean = false;

    private dataobjectSubject = new BehaviorSubject<any>({});
    public dataobject$: any;
    public dataobjectObservable: ReplaySubject<any> = new ReplaySubject<any>(1);

    public origionaldataobject: any;
    private isDatasetReady: boolean = false;
    private hasError: boolean = false;
    private errorMessage: string = "";

    constructor(private http: HttpClient,
        private app: ApplicationService) {
        this.dataobjectSubject.asObservable().subscribe((value) => {
            if (this.parseresponse && typeof value == "string") {
                try {
                    value = JSON.parse(value);
                } catch (e) {
                    console.log("Parse Exception:", e);
                }
            }
            value = value;
            this.dataobject$ = value;
            this.dataobjectObservable.next(value);
            this.origionaldataobject = value;
            if (value.length != 0)
                this.isDatasetReady = true;
        });
    }
    ngOnChanges(changes: SimpleChanges): void {
        console.log(">>>> DATAOBJECT DEBUG NG ON CHANGES >>>>>");
        if (this.type === 'json') {
            this.dataobjectSubject.next(this.src as object[]);
        } else if (this.type === 'json-file') {
            this.loadDataFromFile(this.src as string).subscribe((data) => {
                this.dataobjectSubject.next(data);
            });
        } else if (this.type === 'url') {
            this.loadDataFromUrl(this.src as string).subscribe((data: any) => {
                if (this.dataKey)
                    this.dataobjectSubject.next(data[this.dataKey]);
                else
                    this.dataobjectSubject.next(data);
            });
        }
    }

    isReady() {
        return this.isDatasetReady;
    }

    public get dataobject() {
        return this.dataobjectObservable;
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
            this.dataobjectSubject.subscribe((data) => {
                this.initializeData(data);
            });

            if (this.type === 'json') {
                this.dataobjectSubject.next(this.src as object);
            } else if (this.type === 'json-file') {
                this.loadDataFromFile(this.src as string).subscribe((data) => {
                    this.dataobjectSubject.next(data);
                });
            } else if (this.type === 'url') {
                this.loadDataFromUrl(this.src as string).subscribe((data: any) => {
                    if (this.dataKey)
                        this.dataobjectSubject.next(data[this.dataKey]);
                    else
                        this.dataobjectSubject.next(data);
                });
            }
            this.app.addDataobject(this.name, this);
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

    getDataset(): Observable<any> {
        return this.dataobjectSubject.asObservable();
    }

    addData(key: any, value: any) {
        const updatedDataset = this.dataobjectSubject.getValue()[key] = value;
        this.dataobjectSubject.next(updatedDataset);
    }

    updateData(key: any, value: any) {
        const updatedDataset = this.dataobjectSubject.getValue();
        updatedDataset[key] = value;
        this.dataobjectSubject.next(updatedDataset);
    }

    deleteData(key: any) {
        const updatedDataset = this.dataobjectSubject.getValue();
        delete updatedDataset[key];
        this.dataobjectSubject.next(updatedDataset);
    }

    private initializeData(data: any) {
        if (this.dataKey) {
            data = data[this.dataKey];
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
