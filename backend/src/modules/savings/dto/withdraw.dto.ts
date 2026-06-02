import { IsUUID, IsNumber, Min, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Trim } from '../../../common/decorators/trim.decorator';
import { IsPositiveAmount } from '../../../common/validators/is-positive-amount.validator';

export class WithdrawDto {
  @ApiProperty({ description: 'Subscription ID to withdraw from' })
  @IsUUID()
  subscriptionId: string;

  @ApiProperty({ example: 1000.5, description: 'Amount to withdraw' })
  @IsNumber()
  @IsPositiveAmount()
  @Min(0.01)
  amount: number;

  @ApiPropertyOptional({
    example: 'emergency',
    description: 'Optional reason for withdrawal',
  })
  @IsOptional()
  @IsString()
  @Trim()
  reason?: string;
}
