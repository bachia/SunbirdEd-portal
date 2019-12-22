import { ResourceComponent, CollectionPlayerComponent, ContentPlayerComponent } from './components';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FlagContentComponent } from '@sunbird/core';
import { NoteListComponent } from '@sunbird/notes';
import {ViewAllComponent} from '@sunbird/shared-feature';
const telemetryEnv = 'library';
const routes: Routes = [
  {
    path: '', component: ResourceComponent,
    data: {
      breadcrumbs: [{ label: 'Home', url: '/home' }, { label: 'Library', url: '' }],
      telemetry: { env: telemetryEnv, pageid: 'library', type: 'view', subtype: 'paginate' },
      //Sriram -- Commented out channel 100 per the solution suggested for ticket #721
      //softConstraints: {badgeAssertions: 98, board: 99, channel: 100}
      softConstraints: {badgeAssertions: 98, board: 99}
    }
  }, {
    path: 'view-all/:section/:pageNumber', component: ViewAllComponent,
    data: {
      breadcrumbs: [{ label: 'Home', url: '/home' }, { label: 'Library', url: '/resources' }],
      telemetry: {
        env: telemetryEnv, pageid: 'view-all', type: 'view', subtype: 'paginate'
      },
      filterType: 'library',
      //Sriram -- Commented out channel 100 per the solution suggested for ticket #721
      //softConstraints: {badgeAssertions: 98, board: 99, channel: 100},
      softConstraints: {badgeAssertions: 98, board: 99},
      applyMode: true
    }
  },
  {
    path: 'play/collection/:collectionId', component: CollectionPlayerComponent,
    data: {
      breadcrumbs: [{ label: 'Home', url: '/home' }, { label: 'Library', url: '' }],
      telemetry: { env: telemetryEnv, pageid: 'collection-player', type: 'play' }
    },
    children: [
      { path: 'flag', component: FlagContentComponent }
    ]
  }, {
    path: 'play/collection/:collectionId/:collectionStatus', component: CollectionPlayerComponent,
    data: {
      breadcrumbs: [{ label: 'Home', url: '/home' }, { label: 'Library', url: '' }],
      telemetry: { env: telemetryEnv, pageid: 'collection-player-unlisted', type: 'play' }
    }
  }, {
    path: 'play/content/:contentId', component: ContentPlayerComponent,
    data: {
      telemetry: {
        env: telemetryEnv, pageid: 'content-player', type: 'play'
      }, breadcrumbs: [{ label: 'Home', url: '/home' }, { label: 'Library', url: '/resources' }]
    },
    children: [
      { path: 'flag', component: FlagContentComponent }
    ]
  }, {
    path: 'play/content/:contentId/note', component: NoteListComponent, data: {
      telemetry: {
        env: telemetryEnv, pageid: 'content-note-read', type: 'list', object: { type: 'library', ver: '1.0' }
      }
    }
  }, {
    path: 'play/content/:contentId/:contentStatus', component: ContentPlayerComponent,
    data: {
      breadcrumbs: [{ label: 'Home', url: '/home' }, { label: 'Library', url: '' }],
      telemetry: { env: telemetryEnv, pageid: 'content-player-unlisted', type: 'play' }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourceRoutingModule { }
