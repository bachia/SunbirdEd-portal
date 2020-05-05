import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { SlKendraService } from '../sl-kendra/sl-kendra.service';
import { Observable } from 'rxjs';
import { ServerResponse } from '@sunbird/shared';
import { slConfig } from '../../../../../slConfig';

@Injectable({
  providedIn: 'root'
})
export class SlUtilsService {

  constructor(private slKendraDataService: SlKendraService) { }

  syncBatchApi(payload): Observable<any> {
    const option = {
      url: 'kendra',
      data: {
        method: "POST",
        url: slConfig.BASE_URL + slConfig.API_URL.SYNC_COURSE,
        body: payload
      },
    };
    return this.slKendraDataService.post(option).pipe(map((response: ServerResponse) => {
      return response;
    }));
  }

  scromContentCreate(contentName, payload): Observable<any> {
    const option = {
      url: 'kendra',
      data: {
        method: "POST",
        url: slConfig.BASE_URL + slConfig.API_URL.SCROM_CONTENT_CREATE + contentName,
        body: payload
      },
    };
    return this.slKendraDataService.post(option).pipe(map((response: ServerResponse) => {
      return response;
    }));
  }
}
