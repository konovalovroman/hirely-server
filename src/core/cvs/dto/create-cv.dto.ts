export class CreateCvDto {
    constructor(public user_id: number, public file: Express.Multer.File) {}
}
