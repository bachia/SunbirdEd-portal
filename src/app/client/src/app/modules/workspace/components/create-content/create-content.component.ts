import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ResourceService, ConfigService } from '@sunbird/shared';
import { SuiModule } from 'ng2-semantic-ui/dist';
import { SuiModalService, TemplateModalConfig, ModalTemplate } from 'ng2-semantic-ui';
import { FrameworkService, PermissionService } from '@sunbird/core';
import { IInteractEventInput, IImpressionEventInput } from '@sunbird/telemetry';
import { ConceptPickerService, SlUtilsService } from '@sunbird/core';
@Component({
  selector: 'app-create-content',
  templateUrl: './create-content.component.html'
})
export class CreateContentComponent implements OnInit {

  /*
 roles allowed to create textBookRole
 */
  textBookRole: Array<string>;
  /**
   * courseRole  access roles
  */
  courseRole: Array<string>;
  /**
    * lessonRole   access roles
  */
  lessonRole: Array<string>;
  /**
 * collectionRole  access roles
 */
  collectionRole: Array<string>;
  /**
  *  lessonplanRole access roles
  */
  lessonplanRole: Array<string>;
  /**
  *  lessonplanRole access roles
  */
  contentUploadRole: Array<string>;
  /**
   * To call resource service which helps to use language constant
   */
  public resourceService: ResourceService;
  /**
   * Reference for framework service
  */
  public frameworkService: FrameworkService;

  /**
   * reference of permissionService service.
  */
  public permissionService: PermissionService;
  /**
  * reference of config service.
 */
  public configService: ConfigService;
  /**
	 * telemetryImpression
	*/
  telemetryImpression: IImpressionEventInput;
  /**
  * Constructor to create injected service(s) object
  *
  * Default method of DeleteComponent class

  * @param {ResourceService} resourceService Reference of ResourceService
 */
  constructor(configService: ConfigService, resourceService: ResourceService, private conceptPickerService: ConceptPickerService,
    frameworkService: FrameworkService, permissionService: PermissionService, private activatedRoute: ActivatedRoute,
    private slUtils: SlUtilsService) {
    this.resourceService = resourceService;
    this.frameworkService = frameworkService;
    this.permissionService = permissionService;
    this.configService = configService;
  }

  ngOnInit() {
    this.frameworkService.initialize();
    this.conceptPickerService.initialize();
    this.textBookRole = this.configService.rolesConfig.workSpaceRole.textBookRole;
    this.courseRole = this.configService.rolesConfig.workSpaceRole.courseRole;
    this.lessonRole = this.configService.rolesConfig.workSpaceRole.lessonRole;
    this.collectionRole = this.configService.rolesConfig.workSpaceRole.collectionRole;
    this.lessonplanRole = this.configService.rolesConfig.workSpaceRole.lessonplanRole;
    this.contentUploadRole = this.configService.rolesConfig.workSpaceRole.contentUploadRole;
    this.telemetryImpression = {
      context: {
        env: this.activatedRoute.snapshot.data.telemetry.env
      },
      edata: {
        type: this.activatedRoute.snapshot.data.telemetry.type,
        pageid: this.activatedRoute.snapshot.data.telemetry.pageid,
        uri: this.activatedRoute.snapshot.data.telemetry.uri
      }
    };
  }

  uploadScromContente(file) {
    console.log(file[0]);
    // const obj = {
    //   filename:file[0].name,
    //   file: file[0]
    // }
    const formData = new FormData();
    formData.append('contentData', file[0],file[0].name);
    // const obj = {
    //   contentData : file[0]
    // }
    // formData.append('newwww', 'byeeeeeee');
    // console.log(formData.get('contentData'))
    
    // console.log(formData.) 
    // formData.(element => {
      
    // });(val => {
    //   console.log(val)
    // })
    // console.log(...formData);
    // for (const iterator of Object.keys(formData)) {
    //     console.log(iterator)
    //     console.log("hiiiiiii")
    // }
    console.log("byeeeeeee")

    this.slUtils.scromContentCreate("sampleeeeee", formData ).subscribe(success => {
      console.log("successs");
    }, error => {

    })
  }
}
