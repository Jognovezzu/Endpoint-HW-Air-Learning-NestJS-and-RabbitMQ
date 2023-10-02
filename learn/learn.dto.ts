import { IsNumber, IsString } from 'class-validator';

//RECEIVE AFTER START LEARN
export class IdandBrand {
    @IsNumber()
    id: number;
    @IsString()
    model: string;
}

//RECEIVE AFTER BUTTON LEARN
export class LearnDTO {
    @IsNumber()
    id: number;
    @IsString()
    button: string;
}

//RECEIVE AFTER TEST BUTTON
export class TestDTO {
    @IsNumber()
    id: number;
    @IsString()
    cmd: string;
}

//RECEIVE AFTER SAVE BUTTON
export class SaveDTO {
    @IsNumber()
    id: number;
}

//RECEIVE AFTER PHYSICAL BUTTON PRESS
//RECEIVE ON AMBIENT/LEARN
export class startLearn {
    setor: string;
    status_learn = true;
}

//RECEIVED CONFIRMATION AFTER BUTTON PRESSED
export class ConfirmationReceived {
    cmd: string;
}
