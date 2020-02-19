import { map } from 'rxjs/operators';
import { ConfigService, ServerResponse } from '@sunbird/shared';
import { LearnerService } from './../learner/learner.service';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { IDialParams, IPublisherParams, IContentLinkParams } from '../../interfaces'
import { UUID } from 'angular2-uuid';
import * as _ from 'lodash';
// import { ContentService, PublicDataService } from '@sunbird/core';
import { PublicDataService } from '../public-data/public-data.service';
import { environment } from '../../../../../environments/environment';
import { ContentService } from '../content/content.service';

/**
 * Service to fetch badges
 */
@Injectable()
export class DialCodeService {

    /**
   * Search content by user id.
   *
   * @param {IDialParams} requestParam api request data
   * @param {IPublisherParams} request api request data
   */

    /**
     * Reference of public data service
     */
    public publicDataService: PublicDataService;

    /**
     * Reference of config service
     */
    public config: ConfigService;
    /**
       * Default method of OrganisationService class
       *
        * @param {ConfigService} config config service reference
        * @param {ContentService} contentService Reference of contentService
    */

    /**
     * reference of ContentService.
     */
    public contentService: ContentService;
    constructor(publicDataService: PublicDataService, config: ConfigService, contentService: ContentService, ) {
        this.publicDataService = publicDataService;
        this.contentService = contentService;
        this.config = config;
    }

    /**
     * Generate QR code
     * @param requestParam 
     * @param request 
     */
    generateDialCode(requestParam: IDialParams): Observable<ServerResponse> {
        const option = {
            url: this.config.urlConFig.URLS.DIAL_CODE.GENERATE_DIAL_CODE,
            param: {},
            data: {
                request: {
                    dialcodes: {
                        count: requestParam.request.dialcodes.count,
                        publisher: environment.publisher
                    }
                }
            }
        };
        return this.publicDataService.post(option).pipe(
            map((data: ServerResponse) => {
                return data;
            }));
    }

    /**
     * Create Publisher
     * @param request 
     */
    createPublisher(request: IPublisherParams): Observable<ServerResponse> {
        const option = {
            url: this.config.urlConFig.URLS.DIAL_CODE.CREATE_PUBLISHER,
            param: {},
            data: {
                request: {
                    publisher: {
                        name: request.request.publisher.name,
                        identifier: request.request.publisher.identifier
                    }
                }
            }
        };
        return this.publicDataService.post(option).pipe(
            map((data: ServerResponse) => {
                return data;
            }));
    }

    /**
     * @param dialCode
     */
    publishQrCode(dialCode): Observable<ServerResponse> {
        const option = {
            url: this.config.urlConFig.URLS.DIAL_CODE.PUBLISH_DIAL_CODE + '/' + dialCode,
            param: {},
            data: {
                request: {}
            }
        };
        return this.publicDataService.post(option).pipe(
            map((data: ServerResponse) => {
                return data;
            }));
    }



    /**
     * @param request 
     * Link qr code to content
     */
    linkQrcodeToContent(request: IContentLinkParams): Observable<ServerResponse> {
        const option = {
            url: this.config.urlConFig.URLS.DIAL_CODE.LINK_TO_CONTENT,
            param: {},
            data: {
                request: {
                    content: {
                        identifier: request.request.content.identifier,
                        description: request.request.content.description,
                        dialcode: request.request.content.dialcode
                    }
                }
            }
        };
        return this.publicDataService.post(option).pipe(
            map((data: ServerResponse) => {
                return data;
            }));
    }

    /**
     * @param contentId 
     * Cotent id to fetch details
     */
    getContent(contentId: string, option: any = { params: {} }): Observable<ServerResponse> {
        const param = { fields: 'lastUpdatedBy,name,identifier' };
        const req = {
            url: `${this.config.urlConFig.URLS.CONTENT.GET}/${contentId}`,
            param: { ...param, ...option.params }
        };
        return this.publicDataService.get(req).pipe(map((response: ServerResponse) => {
            return response;
        }));
    }

    /**
     * This method builds the request body and call the publish API.
     */
    submitPublishChanges(userId, contentId): Observable<ServerResponse>  {
        const requestBody = {
            request: {
                content: {
                    //   publishChecklist: this.reasons,
                    lastPublishedBy: userId
                }
            }
        };
        const option = {
            url: `${this.config.urlConFig.URLS.CONTENT.PUBLISH}/${contentId}`,
            data: requestBody
        };
        return this.contentService.post(option).pipe(map((response: ServerResponse) => {
            return response;
        }));
    }

}
