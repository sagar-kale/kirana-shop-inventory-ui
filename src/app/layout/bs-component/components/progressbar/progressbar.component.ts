import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-progressbar',
    templateUrl: './progressbar.component.html',
    styleUrls: ['./progressbar.component.scss']
})
export class ProgressbarComponent implements OnInit {
    progress: Number = 0;
    constructor() {}

    ngOnInit() {}

    startProgress(): void {
        setTimeout(() => {
            for (let i = 0; i <= 100; i++) {
                this.progress = i;
            }
        }, 100);
    }
}
