import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConceptPickerService } from './../../services';
import { UserService } from './../../services';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import * as _ from 'lodash';
import { ContentData, ResourceService } from '@sunbird/shared';

@Component({
  selector: 'app-content-player-metadata',
  templateUrl: './content-player-metadata.component.html',
  styleUrls: ['./content-player-metadata.component.scss']
})
export class ContentPlayerMetadataComponent implements OnInit, OnDestroy {
  readMore = false;
  metadata: any;
  contentFieldData: any;
  fieldData = [];
  conceptNames: any;
  filteredConcepts: any;
  conceptDataSubscription: Subscription;
  showContentCreditsModal: boolean;

  @Input() contentData: ContentData;
  constructor(public resourceService: ResourceService, public conceptPickerService: ConceptPickerService, public userService: UserService) { }

  ngOnInit() {
    this.metadata = { ...this.contentData };
    this.metadata.content_orgs = "";
    this.userService.getUserProfileById(this.metadata.createdBy).subscribe(
      (upData: any) => {
        var orgs_count = upData.result.response.organisations.length;
        console.log("ORGs Count:: "+orgs_count);
        if(orgs_count > 1) {
            this.metadata.content_orgs = "";
            for(var org_index = 0; org_index < orgs_count; org_index++) {
                console.log("rootorgId: " + upData.result.response.rootOrgId + " vs current org id: " + upData.result.response.organisations[org_index].organisationId);
                if(upData.result.response.rootOrgId != upData.result.response.organisations[org_index].organisationId) {
                  if(this.metadata.content_orgs != "") {
                    this.metadata.content_orgs += ", ";
                  }
                  this.metadata.content_orgs += upData.result.response.organisations[org_index].orgName;
                  console.log("adding ORG: " + upData.result.response.organisations[org_index].orgName);
                }
            }
            console.log("CONTENT ORGS INSIDE: " + this.metadata.content_orgs);
        } else if ((orgs_count == 1) && (upData.result.response.rootOrgId != upData.result.response.organisations[0].organisationId)) {
                this.metadata.content_orgs = upData.result.response.organisations[0].orgName;
                console.log("USER HAVING ONLY ONE ORG: " + this.metadata.content_orgs);
        }

        if(this.metadata.content_orgs == "") {
          this.metadata.content_orgs = upData.result.response.rootOrgName;
          console.log("CONTENT ORGS FIRST OUT: " + this.metadata.content_orgs);
        }

    });
    if(this.metadata.content_orgs == "" && this.metadata.orgDetails) {
      this.metadata.content_orgs = this.metadata.orgDetails.orgName;
      console.log("CONTENT ORGS OUTSIDE: " + this.metadata.content_orgs);
    }


    this.validateContent();
    this.getConceptsNames();
  }

  validateContent() {
    this.fieldData = ['language', 'gradeLevel', 'subject', 'flagReasons', 'flaggedBy', 'flags', 'keywords',
      'resourceTypes', 'attributions'];
    _.forEach(this.metadata, (value, key) => {
      if (_.compact(key) && _.includes(this.fieldData, key)) {
        if (_.isString(value)) {
          this.contentFieldData = [value];
          this.metadata[key] = (_.isArray(this.contentFieldData)) ? (_.compact(this.contentFieldData).join(', ')) : '';
        } else {
          this.metadata[key] = (_.isArray(value)) ? (_.compact(value).join(', ')) : '';
        }
      }
    });
  }

  showContentCreditsPopup () {
    this.showContentCreditsModal = true;
  }

  /**
   * Fetches concepts
   * @param {any} concepts
   * @returns {string}
   */
  getConceptsNames() {
    this.conceptDataSubscription = this.conceptPickerService.conceptData$.subscribe(data => {
      if (data && !data.err) {
        const conceptsData = this.conceptPickerService.concepts;
        this.conceptNames = _.map(this.metadata.concepts, 'name');
        if (this.conceptNames && this.metadata.concepts && this.conceptNames.length < this.metadata.concepts.length) {
          this.filteredConcepts = _.filter(conceptsData, (p) => {
            return _.includes(this.metadata.concepts, p.identifier);
          });
          this.conceptNames = _.map(this.filteredConcepts, 'name');
        }
        this.metadata.concepts = this.conceptNames.join(', ');
      } else {
        this.conceptNames = _.map(this.metadata.concepts, 'name');
        this.metadata.concepts = this.conceptNames.join(', ');
      }
    });
  }

  ngOnDestroy() {
    if (this.conceptDataSubscription) {
      this.conceptDataSubscription.unsubscribe();
    }
  }
}



