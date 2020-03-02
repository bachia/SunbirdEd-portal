import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkSpace } from '../../classes/workspace';
import { SearchService, UserService, DialCodeService } from '@sunbird/core';
import {
  ServerResponse, ConfigService, PaginationService,
  IContents, ToasterService, ResourceService, ILoaderMessage, INoResultMessage
} from '@sunbird/shared';
import { WorkSpaceService, EditorService } from '../../services';
import { IPagination } from '@sunbird/announcement';
import * as _ from 'lodash';
import { IInteractEventInput, IImpressionEventInput } from '@sunbird/telemetry';
/**
 * Interface for passing the configuartion for modal
*/

import { SuiModalService, TemplateModalConfig, ModalTemplate } from 'ng2-semantic-ui';
import { map, mergeMap } from 'rxjs/operators';
import { slConfig } from '../../../../../slConfig';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver'
/**
 * The published  component search for all the published component
*/
@Component({
  selector: 'app-published',
  templateUrl: './published.component.html',
  styleUrls: ['./published.component.scss']

})
export class PublishedComponent extends WorkSpace implements OnInit {
  @ViewChild('modalTemplate')
  public modalTemplate: ModalTemplate<{ data: string }, string, string>;
  @ViewChild('downloadModalTemplate')
  public downloadModalTemplate: ModalTemplate<{ data: string }, string, string>;
  /**
  * state for content editior
  */
  state: string;
  /**
    * To navigate to other pages
  */
  route: Router;

  /**
   * To send activatedRoute.snapshot to router navigation
   * service for redirection to draft  component
  */
  private activatedRoute: ActivatedRoute;

  /**
   * Contains unique contentIds id
  */
  contentIds: string;
  /**
   * Contains list of published conten(s) of logged-in user
  */
  publishedContent: Array<IContents> = [];
  /**
     * To show / hide loader
  */
  showLoader = true;

  /**
     * To show / hide Qr loader
  */
  showQrLoader: boolean = false;

  /**
   * loader message
  */
  loaderMessage: ILoaderMessage;

  /**
   * loader message
  */
  qrLoaderMessage: ILoaderMessage;

  /**
   * To show / hide error when no result found
  */
  showError = false;
  /**
    * To show / hide no result message when no result found
  */
  noResult = false;
  /**
   * no result  message
  */
  noResultMessage: INoResultMessage;
  /**
    * For showing pagination on draft list
  */
  private paginationService: PaginationService;

  /**
     * Contains page limit of inbox list
  */
  pageLimit = 9;

  /**
    * Current page number of inbox list
  */
  pageNumber = 1;
  /**
  * totalCount of the list
   */
  totalCount: Number;

  /**
    * Contains returned object of the pagination service
    * which is needed to show the pagination on inbox view
  */
  pager: IPagination;

  /**
  * To show toaster(error, success etc) after any API calls
  */
  private toasterService: ToasterService;

  /**
  * To get url, app configs
  */
  public config: ConfigService;

  /**
   * To generate QR code
   */
  public dialCode: DialCodeService;

  /**
  * To call resource service which helps to use language constant
  */

  public resourceService: ResourceService;
  /**
	 * telemetryImpression
  */

  telemetryImpression: IImpressionEventInput;
  /**
	 * inviewLogs
  */

  inviewLogs = [];
  /**
	 * qr code selection
	*/
  enableCheckbox: boolean;
  /**
     * selected contents for Qr code enable
    */
  contentList: Array<any> = []

  /**
   * QrcodeList
   */
  qrCodeList: Array<string> = [];

  /**
   * QR code detailed list
   */
  contentDetailsList: Array<Object> = [];

  /**
   * qrIndex for looping and attching content
   */
  qrIndex: number = 0;


  linkedQrCode = [];

  maxContentAllowed: number = 3;

  /**
   * To call editor  service
   */
  public editorService: EditorService;

  /**
    * Constructor to create injected service(s) object
    Default method of Draft Component class
    * @param {SearchService} SearchService Reference of SearchService
    * @param {UserService} UserService Reference of UserService
    * @param {Router} route Reference of Router
    * @param {PaginationService} paginationService Reference of PaginationService
    * @param {ActivatedRoute} activatedRoute Reference of ActivatedRoute
    * @param {ConfigService} config Reference of ConfigService
    * @param {DialCodeService} dialCode Reference of DialCodeService
    * @param {EditorService} EditorService
  */

  constructor(public modalService: SuiModalService, public searchService: SearchService,
    public workSpaceService: WorkSpaceService,
    paginationService: PaginationService,
    activatedRoute: ActivatedRoute,
    route: Router, userService: UserService,
    toasterService: ToasterService, resourceService: ResourceService,
    editorService: EditorService,
    config: ConfigService,
    dialCode: DialCodeService,
    private http: HttpClient) {
    super(searchService, workSpaceService, userService);
    this.paginationService = paginationService;
    this.route = route;
    this.activatedRoute = activatedRoute;
    this.toasterService = toasterService;
    this.resourceService = resourceService;
    this.config = config;
    this.dialCode = dialCode;
    this.editorService = editorService;
    this.state = 'published';
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.pageNumber = Number(params.pageNumber);
      this.fetchPublishedContent(this.config.appConfig.WORKSPACE.PAGE_LIMIT, this.pageNumber);
    });
    this.telemetryImpression = {
      context: {
        env: this.activatedRoute.snapshot.data.telemetry.env
      },
      edata: {
        type: this.activatedRoute.snapshot.data.telemetry.type,
        pageid: this.activatedRoute.snapshot.data.telemetry.pageid,
        subtype: this.activatedRoute.snapshot.data.telemetry.subtype,
        uri: this.activatedRoute.snapshot.data.telemetry.uri + '/' + this.activatedRoute.snapshot.params.pageNumber,
        visits: this.inviewLogs
      }
    };
  }
  /**
    * This method sets the make an api call to get all Published content with page No and offset
    */
  fetchPublishedContent(limit: number, pageNumber: number) {
    this.showLoader = true;
    this.pageNumber = pageNumber;
    this.pageLimit = limit;
    const searchParams = {
      filters: {
        status: ['Live'],
        createdBy: this.userService.userid,
        contentType: this.config.appConfig.WORKSPACE.contentType,
        objectType: this.config.appConfig.WORKSPACE.objectType,
      },
      limit: this.pageLimit,
      offset: (this.pageNumber - 1) * (this.pageLimit),
      sort_by: { lastUpdatedOn: this.config.appConfig.WORKSPACE.lastUpdatedOn }
    };
    this.loaderMessage = {
      'loaderMessage': this.resourceService.messages.stmsg.m0021,
    };

    this.qrLoaderMessage = {
      loaderMessage: 'Linking QR Code to Content'
    }
    this.search(searchParams).subscribe(
      (data: ServerResponse) => {
        if (data.result.count && data.result.content.length > 0) {
          this.publishedContent = data.result.content;
          this.totalCount = data.result.count;
          this.pager = this.paginationService.getPager(data.result.count, this.pageNumber, this.pageLimit);
          const constantData = this.config.appConfig.WORKSPACE.Published.constantData;
          const metaData = this.config.appConfig.WORKSPACE.Published.metaData;
          const dynamicFields = this.config.appConfig.WORKSPACE.Published.dynamicFields;
          this.publishedContent = this.workSpaceService.getDataForCard(data.result.content, constantData, dynamicFields, metaData);
          this.showLoader = false;
        } else {
          this.showError = false;
          this.showLoader = false;
          this.noResult = true;
          this.noResultMessage = {
            'messageText': 'messages.stmsg.m0022'
          };
        }
      },
      (err: ServerResponse) => {
        this.showLoader = false;
        this.noResult = false;
        this.showError = true;
        this.toasterService.error(this.resourceService.messages.fmsg.m0013);
      }
    );
  }
  /**
    * This method launch the content editior
  */
  contentClick(param) {
    if (param.action.eventName === 'delete') {
      this.deleteConfirmModal(param.data.metaData.identifier);
    } else {
      this.workSpaceService.navigateToContent(param.data.metaData, this.state);
    }
  }

  public downloadQrCode() {
    const config = new TemplateModalConfig<{ data: string }, string, string>(this.downloadModalTemplate);
    config.isClosable = false;
    config.size = 'small';
    config.transitionDuration = 0;
    config.mustScroll = true;
    this.modalService
      .open(config)
      .onApprove(result => {
        console.log("on approve");
        console.log(this.contentList)
        this.downlaodFile();
      })
  }

  public deleteConfirmModal(contentIds) {
    const config = new TemplateModalConfig<{ data: string }, string, string>(this.modalTemplate);
    config.isClosable = false;
    config.size = 'small';
    config.transitionDuration = 0;
    config.mustScroll = true;
    this.modalService
      .open(config)
      .onApprove(result => {
        this.showLoader = true;
        this.loaderMessage = {
          'loaderMessage': this.resourceService.messages.stmsg.m0034,
        };
        this.delete(contentIds).subscribe(
          (data: ServerResponse) => {
            this.showLoader = false;
            this.publishedContent = this.removeContent(this.publishedContent, contentIds);
            if (this.publishedContent.length === 0) {
              this.fetchPublishedContent(this.config.appConfig.WORKSPACE.PAGE_LIMIT, this.pageNumber);
            }
            this.toasterService.success(this.resourceService.messages.smsg.m0006);
          },
          (err: ServerResponse) => {
            this.showLoader = false;
            this.toasterService.success(this.resourceService.messages.fmsg.m0022);
          }
        );
      })
      .onDeny(result => {
      });
  }

  /**
  * This method helps to navigate to different pages.
  * If page number is less than 1 or page number is greater than total number
  * of pages is less which is not possible, then it returns.
  *
  * @param {number} page Variable to know which page has been clicked
  *
  * @example navigateToPage(1)
  */
  /**
* This method helps to navigate to different pages.
* If page number is less than 1 or page number is greater than total number
* of pages is less which is not possible, then it returns.
*
* @param {number} page Variable to know which page has been clicked
*
* @example navigateToPage(1)
*/
  navigateToPage(page: number): undefined | void {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pageNumber = page;
    this.route.navigate(['workspace/content/published', this.pageNumber]);
  }
  /**
  * get inview  Data
  */
  inview(event) {
    _.forEach(event.inview, (inview, key) => {
      const obj = _.find(this.inviewLogs, (o) => {
        return o.objid === inview.data.metaData.identifier;
      });
      if (obj === undefined) {
        this.inviewLogs.push({
          objid: inview.data.metaData.identifier,
          objtype: inview.data.metaData.contentType,
          index: inview.id
        });
      }
    });
    this.telemetryImpression.edata.visits = this.inviewLogs;
    this.telemetryImpression.edata.subtype = 'pageexit';
    this.telemetryImpression = Object.assign({}, this.telemetryImpression);
  }

  /**
   * This method enables selection to attach qr code
 */

  enableQrCodeSelection() {
    this.enableCheckbox = true;
  }

  /**
   * Create Publisher Api
   */
  generatePublisher() {
    const payload = {
      "request": {
        "publisher": {
          "identifier": "ShikshaLokamLocal",
          "name": "ShikshaLokam Local Instance"
        }
      }
    }
    this.dialCode.createPublisher(payload).subscribe(success => {
      console.log("*******************************************");
      console.log(success);
      console.log("*******************************************")
    }, error => {
      console.log("*******************************************")
      console.log(error);
      console.log("*******************************************")

    })
  }

  /**
   * Generate qr code
   */
  generateQrCode() {
    const payload = {
      "request": {
        "dialcodes": {
          "count": this.contentList.length,
        }
      }
    }

    this.dialCode.generateDialCode(payload).subscribe(success => {
      console.log("*******************************************");
      console.log(success);
      console.log("*******************************************");
      this.qrCodeList = success.result.dialcodes;
      this.attachQrCodeToContent();
      // this.dialCode.publishQrCode(success.result.dialcodes[0]).subscribe(publishSuccess => {
      //   console.log("Publish success");
      //   console.log(publishSuccess)
      // }, publishError => {

      // })
    }, error => {
      console.log("*******************************************")
      console.log(error);
      console.log("*******************************************")
    })


    // let qrCode;
    // this.dialCode.generateDialCode(payload).pipe(map(
    //   generateSuccess => {
    //     qrCode = generateSuccess.result.dialcodes[0];
    //     return qrCode
    // }),
    // mergeMap(qrCode => this.dialCode.publishQrCode(qrCode))).subscribe(success => {
    //   console.log("*******************************************")
    //   console.log(success);
    // })
  }

  /**
 * Generate and attach QR code
 */

  generateAndAttachQrCode() {
    this.showQrLoader = true;
    const paylaod = {
      contentData: this.contentDetailsList
    }
    this.linkedQrCode = [];
    this.dialCode.generateQrCodeAndLinkContent(paylaod).subscribe(success => {
      this.showQrLoader = false;
      this.fetchPublishedContent(this.config.appConfig.WORKSPACE.PAGE_LIMIT, this.pageNumber);
      for (const content of success.result.result) {
        this.linkedQrCode.push(content.code);
      }
      this.disableQrCodeSelection();
      this.downloadQrCode();
    }, error => {
      this.showQrLoader = false;
      this.toasterService.error(error.error.result.message)
    })
  }


  /**
   * Steps to attch qr code to content
   */
  attachQrCodeToContent() {
    if (this.qrIndex < this.contentList.length) {
      const linkContentPayload = {
        request: {
          content: {
            identifier: [this.contentList[this.qrIndex]],
            dialcode: [this.qrCodeList[this.qrIndex]]
          }
        }
      }
      this.dialCode.publishQrCode(this.qrCodeList[this.qrIndex]).pipe(
        map(publishSuccess => {
          return publishSuccess.responseCode
        }),
        mergeMap(response => this.dialCode.linkQrcodeToContent(linkContentPayload).pipe(
          map(linkSuccess => {
          }), mergeMap(response => this.dialCode.getContent(this.contentList[this.qrIndex]).pipe(
            map(contentDetails => {
              return contentDetails.result
            }), mergeMap(contentResp => this.dialCode.submitPublishChanges(contentResp.lastUpdatedBy, this.contentList[this.qrIndex]))
          ))
        ))).subscribe(success => {
          this.qrIndex++;
          this.attachQrCodeToContent()
        }, error => {
          this.qrIndex++;
          this.attachQrCodeToContent();

        })
    } else {
      this.qrIndex = 0;
    }

  }


  /**
   * On Done button click
   */
  contentsSelected() {
    if (this.contentList.length) {
      this.generateAndAttachQrCode();
    } else {
      this.toasterService.error("Please select atleast on content");
    }
  }

  /**
   * content selection
  */
  selectContent(params) {
    if (params.data.metaData.dialcodes && params.data.metaData.dialcodes.length) {
      this.toasterService.error(`QR code is already attached to this content.`);
      return false
    }
    if (this.contentList.length < this.maxContentAllowed) {
      const contentId = params.data.metaData.identifier;
      const obj = {
        lastPublishedBy: params.data.metaData.lastPublishedBy,
        name: params.data.metaData.name,
        identifier: params.data.metaData.identifier
      }
      if (this.contentList.includes(contentId)) {
        let index = this.contentList.indexOf(contentId);
        this.contentList.splice(index, 1);
        this.contentDetailsList.splice(index, 1);
      } else {
        this.contentList.push(contentId);
        this.contentDetailsList.push(obj);
      }
    } else {
      this.toasterService.error(`You can only select ${this.maxContentAllowed} contents at a time`);
    }

  }

  downlaodFile(qrcodes?: any) {
    this.showQrLoader = true;
    this.qrLoaderMessage = {
      loaderMessage: "Fetching QR code ..."
    };
    this.dialCode.getPdfUrls(qrcodes ? qrcodes : this.linkedQrCode).subscribe(success => {
      for (const content of success.result.result) {
        this.http.get(content.url, { responseType: 'blob' }).subscribe(res => {
          const fileName = content.metaInformation.name.replace(/ /g, "_");
          saveAs(res, fileName);
        })
      }
      this.showQrLoader = false;
    }, error => {
      this.toasterService.error(error.error.result.message)
      this.showQrLoader = false;
    })
  }

  disableQrCodeSelection() {
    this.contentList = [];
    this.contentDetailsList = [];
    this.enableCheckbox = false;
  }

  getCurrentContentQr(qrCode) {
    this.dialCode.getPdfUrls(this.linkedQrCode).subscribe(success => {
      for (const content of success.result.result) {
        this.http.get(content.url, { responseType: 'blob' }).subscribe(res => {
          const fileName = content.metaInformation.name.replace(/ /g, "_");
          saveAs(res, fileName);
        })
      }
      this.showQrLoader = false;
    }, error => {
      this.toasterService.error(error.error.result.message)
      this.showQrLoader = false;
    })
  }

  shareActions(details) {
    switch (details.action) {
      case 'download':
        this.downlaodFile(details.data);
        break
      case 'mailShare':
      case 'whatsappShare':
        console.log(details)
        this.createShareMessage(details);
        break
    }

  }

  createShareMessage(details) {
    this.showQrLoader = true;
    this.qrLoaderMessage = {
      loaderMessage: "Fetching QR code ..."
    };
    this.dialCode.getPdfUrls(details.data.metaData.dialcodes).subscribe(success => {
      for (const content of success.result.result) {
        this.http.get(content.url, { responseType: 'blob' }).subscribe(res => {
          this.showQrLoader = false;
          if (details.action === 'whatsappShare') {
            window.open(`https://web.whatsapp.com/send?text=Dear Learner,%0D%0AAttached is the QR code for ${details.data.name}. Click here to continue learning.%0D%0A${encodeURIComponent(content.url)}`, '_blank');
          } else {
            window.open(`mailto:?Subject=QR code for ${details.data.name} link&body=Dear Learner,%0D%0A%0D%0AAttached is the QR code for ${details.data.name}. Click here to continue learning.%0D%0A${encodeURIComponent(content.url)} `);
          }
        })
      }
    }, error => {
      this.toasterService.error(error.error.result.message)
      this.showQrLoader = false;
    })
  }
}
