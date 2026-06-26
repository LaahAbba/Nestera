import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

const MAX_DECIMAL_PLACES = 7; // Stellar uses 7 decimal places (stroops)

export function IsPositiveAmount(
  maxDecimals = MAX_DECIMAL_PLACES,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isPositiveAmount',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [maxDecimals],
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'number' || !isFinite(value)) return false;
          if (value <= 0) return false;

          const decimals = args.constraints[0] as number;
          const parts = value.toString().split('.');
          if (parts.length > 1 && parts[1].length > decimals) return false;

          return true;
        },
        defaultMessage(args: ValidationArguments) {
          const decimals = args.constraints[0] as number;
          return `${args.property} must be a positive number with at most ${decimals} decimal places`;
        },
      },
    });
  };
}
