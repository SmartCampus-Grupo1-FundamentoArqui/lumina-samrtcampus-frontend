import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ButtonStateService {
    private activeButtonSubject = new BehaviorSubject<string>('');

    setActiveButton(button: string) {
        this.activeButtonSubject.next(button);
    }

    getActiveButton(): Observable<string> {
        return this.activeButtonSubject.asObservable();
    }
}
