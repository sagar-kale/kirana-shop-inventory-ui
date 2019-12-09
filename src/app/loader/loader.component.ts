import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from '../shared/services/shared.service';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
    @Input()
    isLoading: boolean;

    constructor(private sharedService: SharedService) {}

    ngOnInit() {
        // this.sharedService.loading$.subscribe(val => {
        //     this.isLoading = val;
        // });
    }
}
