import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { SlKendraService } from '../sl-kendra/sl-kendra.service';
import { ServerResponse, ConfigService } from '@sunbird/shared';
import { slConfig } from '../../../../../slConfig';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { of as observableOf, throwError as observableThrowError, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SlUtilsService {

  allOrganizations = {};

  constructor(
    private slKendraDataService: SlKendraService,
    private http: HttpClient, private configService: ConfigService) { }

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
    console.log(payload);
    // const headers = new HttpHeaders();
    // headers.set('Content-Type', null);
    // headers.set('Accept', "multipart/form-data");
    // const option = {
    //   url: 'kendra',
    //   data: {
    //     method: "POST",
    //     url: slConfig.BASE_URL + slConfig.API_URL.SCROM_CONTENT_CREATE + contentName,
    //     body: payload,
    //     // header: headers
    //   },
    // };
    // return this.slKendraDataService.postForm(option).pipe(map((response: ServerResponse) => {
    //   return response;
    // }));
    //  return this.ddataServ.postForm(this.configService.urlConFig.URLS.SHIKSHALOKAM_PREFIX + 'kendra', payload).pipe(map((response: ServerResponse) => {
    //     return response;
    //   }));

    return this.http.post(this.configService.urlConFig.URLS.SHIKSHALOKAM_PREFIX + 'kendra', payload).pipe(
      mergeMap((data: ServerResponse) => {
        if (data.responseCode !== 'OK') {
          return observableThrowError(data);
        }
        return observableOf(data);
      }));


    // return this.http.post('https://qahome.shikshalokam.org/kendra-service/api/v1/bodh/platform/uploadScromContent?name=sampleeeeee', payload)

  }


  getAllOrganizations(): Observable<any> {
    const option = {
      url: 'kendra',
      data: {
        method: "GET",
        url: slConfig.BASE_URL + slConfig.API_URL.GET_ORGANIZATION_LIST,
      },
    };
    return this.slKendraDataService.post(option).pipe(map((response: ServerResponse) => {
      if (response.result.result) {
        for (const org of response.result.result) {
          this.allOrganizations[org.id] = org;
        }
        localStorage.setItem('allOrganization', JSON.stringify(this.allOrganizations));
      }
      return response;
    }));
  }

  filterOrgName(orgDetails, createdFor) {
    debugger
    if (orgDetails && orgDetails.orgName) {
      if (createdFor && createdFor.length > 1) {
        const filteredOrgs = createdFor.filter(org => org != "0124487522476933120")
        const orgName = [];
        for (const org of filteredOrgs) {
          this.allOrganizations[org] ?  orgName.push(this.allOrganizations[org].name) : "";
        }
        orgDetails.orgName = orgName;
      }
    } else {
      orgDetails.orgName = "Ekstep Channel"
    }
    return orgDetails
  }

}
