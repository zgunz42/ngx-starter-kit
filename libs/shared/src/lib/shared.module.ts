import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@ngx-starter-kit/material';
import { MaterialDateModule } from '@ngx-starter-kit/material';
import { BreadcrumbsModule } from '@ngx-starter-kit/breadcrumbs';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MinValidatorDirective } from './directives/min/min.directive';
import { NgLetDirective } from './directives/ng-let.directive';

import {
  PerfectScrollbarModule,
  PerfectScrollbarConfigInterface,
  PERFECT_SCROLLBAR_CONFIG
} from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: true
};

const DIRECTIVES = [MinValidatorDirective, NgLetDirective];

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule.withConfig({ useColumnBasisZero: false }) //FIXME chat: input
  ],
  declarations: [...DIRECTIVES],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    BreadcrumbsModule,
    MaterialModule,
    MaterialDateModule,
    PerfectScrollbarModule,
    ...DIRECTIVES
  ],
  providers: [{ provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG }]
})
export class SharedModule {}
