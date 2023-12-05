import { Component, Input, TemplateRef, OnChanges, OnInit, ElementRef } from '@angular/core';
import { ApplicationService } from './ng-declarative-components.service';
import { Base } from './ng-declarative-components-base.component';
import { AnimationService } from './ng-declarative-animation.service';

@Component({
    selector: 'ng-declarative-table',
    template: `
        <div class="table-responsive"  [ngClass]="getcComponentClasses()" [ngStyle]="getComponentStyles()">
        <table class="table {{ tableOptions?.cssClass }}" >
        <thead>
        <tr>
            <ng-container *ngFor="let column of tableOptions?.columns">
            <th [class]="getHeaderClass(column)" (click)="column.sortable && sort(column.field)">
                @if(!componentLoading){
                <div style="text-align:center;">
                {{ column.name }}
                <span *ngIf=" column.sortable && column.field === sortedColumn" [class]="sortIconClass()" style="float: inline-end;"></span>
                </div>
                }@else{
                    <div class="loading">
                        <div class="bar" style="width:50% !important">
                                &nbsp;
                            </div>
                    </div>
                }
            
            </th>
            </ng-container>
        </tr>
        <tr>
            <ng-container *ngFor="let column of tableOptions?.columns">
            <td >
                
                <div *ngIf="column.filterable">
                @if(!componentLoading){
                <input
                    type="text"
                    class="form-control ng-declarative-input p-2 mt-2 me-2"
                    placeholder="Filter"
                    [(ngModel)]="columnFilters[column.field]"
                    (click)="$event.stopPropagation()"
                    (input)="applyFilters()"
                />
                }@else{
                    <div class="loading">
                        <div class="bar">
                                &nbsp;
                            </div>
                    </div>
                }
                </div>
            </td>
            </ng-container>
        </tr>

        </thead>
        <tbody>
            @if(componentLoading){
                @for(item of  generateRange(1, this.pageSize); track item;){
                     <tr>
                         @for(item of  generateRange(1, this.tableOptions?.columns.length); track item;){
                        <td class="loading">
                            <div class="bar">
                                &nbsp;
                            </div>
                        </td>
                         }
                    </tr>
                }
            }
       @else{
      
        <tr *ngFor="let item of pagedData; let rowIndex = index" (click)="rowClick(item, rowIndex)" [class.clicked]="rowIndex === clickedRowIndex">
            <ng-container *ngFor="let column of tableOptions?.columns">
            <td [class]="getCellClass(column)">
            @if(column.isChildDataset){
                <th  *ngFor="let subitem of column.childKeyList">
                    {{subitem.name}}
                </th>
                @for(childitem of item[column.field];track childitem){
                    
                    <tr>
                        <td  *ngFor="let key of column.childKeyList">
                            {{childitem[key.field]}}
                        </td>
                    </tr>
                           
                }
            }@else{
                <p [innerHtml]="getCellValue(item, column)"></p>
            }
                
            </td>
            </ng-container>
        </tr>
       }
        </tbody>
    </table>
        <div *ngIf="tableOptions?.pagination" class="d-flex justify-content-end mt-3">
    <nav>
        <ul class="pagination">
        @if(componentLoading){
            <div class="loading">
                        <div class="bar" style="width: 100vh;">
                                &nbsp;
                            </div>
                    </div>
        }@else{
        <li class="page-item" (click)="goToPage(1)" [class.disabled]="currentPage === 1">
            <a class="page-link" aria-label="First">
            <span aria-hidden="true">&laquo;&laquo;</span>
            </a>
        </li>

        <li class="page-item" (click)="goToPage(currentPage - 1)" [class.disabled]="currentPage === 1">
            <a class="page-link" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
            </a>
        </li>

        <li *ngFor="let page of getPaginationArray()" class="page-item" (click)="goToPage(page)" [class.active]="currentPage === page">
            <a class="page-link">{{ page }}</a>
        </li>

        <li class="page-item" (click)="goToPage(currentPage + 1)" [class.disabled]="currentPage === totalPages">
            <a class="page-link" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
            </a>
        </li>

        <li class="page-item" (click)="goToPage(totalPages)" [class.disabled]="currentPage === totalPages">
            <a class="page-link" aria-label="Last">
            <span aria-hidden="true">&raquo;&raquo;</span>
            </a>
        </li>
        }
        </ul>
    </nav>
    </div>

    `,
    styles: [
        `
        :host{
            display: contents;
        }
        .clicked {
                border-left: 5px solid var(--bs-primary);
    }
    
   
    
    `
    ],
})
export class TableComponent extends Base implements OnChanges, OnInit {
    @Input() datasetName: any | undefined;
    @Input() tableOptions: TableOptions | any;

    public filteredData: any[] = [];
    public pagedData: any[] = [];
    public sortedColumn: string | null = null;
    public sortDirection: number = 1;
    public dataset: any[] = [];
    public currentPage: number = 1;
    public pageSize: number = 10;
    public clickedRowIndex: number | null = null;


    public columnFilters: { [field: string]: string } = {}; // Separate field to store column filters


    constructor(elementRef: ElementRef,
        animationService: AnimationService,
        app: ApplicationService) {
        super(elementRef, animationService, app);
        this.componentLoading = true;
    }

    override ngOnInit() {
        console.log("Table Component STyle DEBUG from base:", this.getComponentStyles())
        try {
            if (this.app.datasets[this.datasetName].isReady()) {
                this.dataset = this.app.datasets[this.datasetName].dataset$;
                this.filteredData = this.dataset; // Initial copy of dataset
                this.pageSize = this.tableOptions?.pageSize || this.pageSize;
                this.applyFilters();
                this.updatePagedData();
                setTimeout(() => this.componentLoading = false, 1000)




            } else {
                this.app.datasets[this.datasetName].dataset.subscribe((value: any) => {
                    this.dataset = value;
                    this.filteredData = this.dataset; // Initial copy of dataset
                    this.pageSize = this.tableOptions?.pageSize || this.pageSize;
                    this.applyFilters();
                    this.updatePagedData();
                    setTimeout(() => this.componentLoading = false, 1000)

                });
            }


        } catch (err) {
            this.app.handleFrameworkError(err);
            this.componentLoading = false;
        }
    }

    generateRange(start: number, end: number): number[] {
        return Array.from({ length: end - start + 1 }, (_, index) => start + index);
    }

    ngOnChanges() {
        this.filteredData = this.dataset; // Initial copy of dataset
        this.applyFilters();
        this.updatePagedData();
    }

    getCellValue(item: any, column: TableColumn): any {
        return column.template ? column.template(item, column, item[column.field]) : item[column.field];
    }

    sort(column: string): void {
        if (!this.tableOptions?.sortable) {
            return;
        }

        if (this.sortedColumn === column) {
            this.sortDirection = -this.sortDirection;
        } else {
            this.sortedColumn = column;
            this.sortDirection = 1;
        }

        this.filteredData.sort((a, b) => {
            const valueA = a[column];
            const valueB = b[column];

            if (valueA > valueB) return this.sortDirection;
            if (valueA < valueB) return -this.sortDirection;
            return 0;
        });

        this.updatePagedData();
    }

    sortIconClass(): string {
        return this.sortDirection === 1 ? 'bi bi-arrow-down' : 'bi bi-arrow-up';
    }

    getHeaderClass(column: TableColumn): string {
        return column.sortable ? 'sortable' : '';
    }

    getCellClass(column: TableColumn): string {
        return column.filterable ? 'filterable' : '';
    }

    applyFilters(): void {
        // Implement your filtering logic here
        // For simplicity, let's assume a basic case-insensitive string search
        this.filteredData = this.dataset.filter((item) =>
            this.tableOptions?.columns.every((column: any) => {
                if (column.filterable) {
                    const value = item[column.field].toString().toLowerCase();
                    const filter = this.columnFilters[column.field]?.toLowerCase(); // Use columnFilters instead of tableOptions.filters
                    return value.includes(filter || '');
                }
                return true;
            })
        );

        this.updatePagedData();
    }


    rowClick(item: any, rowIndex: number): void {
        // Handle row click event
        if (this.tableOptions?.onRowClick) {
            this.tableOptions.onRowClick(item, rowIndex);
        }
        console.log("DEBUG == ", item, rowIndex);
        this.clickedRowIndex = rowIndex;
    }

    updatePagedData(): void {
        if (this.tableOptions?.pagination) {
            const start = (this.currentPage - 1) * this.pageSize;
            this.pagedData = this.filteredData.slice(start, start + this.pageSize);
        } else {
            this.pagedData = this.filteredData;
        }
    }

    goToPage(page: number): void {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
            this.updatePagedData();
        }
    }
    getPaginationArray(): number[] {
        const totalPagesArray: number[] = [];
        const totalPages = this.totalPages;

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                totalPagesArray.push(i);
            }
        } else {
            if (this.currentPage <= 3) {
                totalPagesArray.push(1, 2, 3, 4, 5);
            } else if (this.currentPage >= totalPages - 2) {
                totalPagesArray.push(totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                totalPagesArray.push(this.currentPage - 2, this.currentPage - 1, this.currentPage, this.currentPage + 1, this.currentPage + 2);
            }
        }

        return totalPagesArray;
    }

    get totalPages(): number {
        return Math.ceil(this.filteredData.length / this.pageSize);
    }
}

interface TableColumn {
    id?: string;
    name: string;
    field: string;
    sortable?: boolean;
    filterable?: boolean;
    template?: (item: any, column: any, value: any) => string; // Template function for custom rendering
    isChildDataset?: boolean;
    childKeyList: [{ name: string, field: string }];
}

interface TableOptions {
    sortable?: boolean;
    filterable?: boolean;
    pagination?: boolean;
    pageSize?: number;
    cssClass?: string;
    width?: string,
    height?: string,
    filters?: { [field: string]: string };
    onRowClick?: (item: any, index: number) => void;
    columns: TableColumn[];
}
