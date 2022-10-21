import { 
    IsNotEmpty, 
    IsNumber, 
    IsNumberString,
    IsString, 
    IsUrl, 
    Max, 
    MaxLength, 
    Min, 
    Validate 
} from 'class-validator';
import { IsNullOrNumber } from 'src/utils/validators';

export class CreateSeasonDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    seasonNumber: string;

    @Validate(IsNullOrNumber)
    winnerId?: number;

    @IsNotEmpty()
    @IsUrl()
    @MaxLength(1000)
    image_url: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(2009)
    @Max(2099)
    year: number;
}

export class FindOneSeasonParam {
    @IsNumberString()
    id: number;
}

export class SeasonDto {
    @IsNumber()
    @Min(0)
    id: number;

    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    seasonNumber: string;

    @Validate(IsNullOrNumber)
    @Min(0)
    @Max(500)
    winnerId?: number;

    @IsNotEmpty()
    @IsUrl()
    @MaxLength(1000)
    image_url: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(2009)
    @Max(2099)
    year: number;
}