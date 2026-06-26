import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Res,
  BadRequestException,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { Response } from 'express';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { JobQueueService } from '../job-queue/job-queue.service';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Reports')
@ApiBearerAuth()
@Controller('reports')
export class ReportsController {
  constructor(
    private readonly reportsService: ReportsService,
    private readonly jobQueueService: JobQueueService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('tax/:year')
  async getTaxReport(
    @Param('year') yearParam: string,
    @Query('format') format = 'csv',
    @Query('irs1099') irs1099 = 'false',
    @CurrentUser() user: any,
    @Res() res: Response,
  ) {
    const year = Number(yearParam);
    if (!user || !user.id)
      throw new BadRequestException('authenticated user required');
    if (Number.isNaN(year)) throw new BadRequestException('invalid year');
    const irsFlag = irs1099 === 'true';

    const result = await this.reportsService.buildAndStoreTaxReport(
      user.id,
      year,
      { format, irs1099: irsFlag },
    );

    return res.json({ storedPath: result.path, filename: result.filename });
  }

  @UseGuards(JwtAuthGuard)
  @Post('tax/:year/async')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Queue a tax report for async generation' })
  async queueTaxReport(
    @Param('year') yearParam: string,
    @Query('format') format = 'csv',
    @Query('irs1099') irs1099 = 'false',
    @CurrentUser() user: any,
  ) {
    const year = Number(yearParam);
    if (!user || !user.id)
      throw new BadRequestException('authenticated user required');
    if (Number.isNaN(year)) throw new BadRequestException('invalid year');

    const job = await this.jobQueueService.addReportJob({
      reportType: 'tax',
      userId: user.id,
      params: { year, format, irs1099: irs1099 === 'true' },
    });

    return {
      success: true,
      statusCode: 202,
      message: 'Report generation queued',
      data: { jobId: job.id },
    };
  }
}
