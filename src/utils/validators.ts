import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'isNullOrNumber', async: false })
export class IsNullOrNumber implements ValidatorConstraintInterface {
    validate(text: string, args: ValidationArguments) {
        return !text || typeof text === 'number';
    }

    defaultMessage(args: ValidationArguments) {
        return 'Input ($value) is not a number or a null field!';
    }
}