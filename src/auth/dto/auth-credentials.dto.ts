import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(4)
    @MaxLength(80)
    //  this matches used for regular expression
    
    // @Matches(
    //         '/ using regular expression here  /','message'
    // )
    password: string;
}