import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { HeimHttpService } from './heim-http.service';
import { RoudRobinService } from './roud-robin.service';

@Module({
  imports: [HttpModule],
  providers: [
    HeimHttpService,
    RoudRobinService
  ],
  exports: [
    HeimHttpService,
    RoudRobinService
  ]
})
export class HeimHttpModule { }
