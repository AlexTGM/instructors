import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { instructorsReducer } from './reducers';
import { map } from 'rxjs/operators';

export class Instructor {
    id: number;
    first_name: string;
    last_name: string;
}

@Injectable()
export class InstructorsService {
    constructor(private httpClient: HttpClient) { }

    data: Instructor[] = [{
        id: 1,
        first_name: "Leonardo",
        last_name: "da Vinci"
    }];

    getAll(): Observable<Instructor[]> {
        return this.httpClient.get<any>("http://localhost:3000/instructors");
    }

    delete(id: number) {
        return this.httpClient.delete("http://localhost:3000/instructors/" + id);
    }

    edit(input: Instructor) {
        return this.httpClient.put("http://localhost:3000/instructors/" + input.id, input);
    }

    create(input: Instructor) {
        return this.httpClient.post("http://localhost:3000/instructors/", input);
    }
}
