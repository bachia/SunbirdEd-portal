import { ResourceService } from '../../services/index';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ICard } from '../../interfaces';
import { IImpressionEventInput, IInteractEventObject } from '@sunbird/telemetry';
@Component({
  selector: 'app-card-creation',
  templateUrl: './card-creation.component.html',
  styleUrls: ['./card-creation.component.scss']
})
export class CardCreationComponent {
  /**
  * content is used to render IContents value on the view
  */
  @Input() data: ICard;
  @Input() customClass: string;
  @Input() enableSelection: boolean;
  @Input() index: number;
  @Input() selectedContents: Array<string>;
  @Output() clickEvent = new EventEmitter<any>();
  @Output() downloadEvent = new EventEmitter<any>();

  isOpen:boolean = true;
  constructor(public resourceService: ResourceService) {
  }

  public onAction(data, action) {
    this.clickEvent.emit({ 'action': action, 'data': data });
  }

  onQrClick(e) {
    e.stopPropagation();
  }

  outsideClick() {
    console.log("outside click")
  }

  downloadContent(qrcode) {
    this.downloadEvent.emit(qrcode)
  }
}
