import { Body, Post } from '@nestjs/common';
import { ApiMessages, ApiRoutesSwagger, ControllerAndSwagger } from 'common';
import { IdandBrand, LearnDTO, SaveDTO, TestDTO } from './learn.dto';
import { LearnService } from './learn.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { SwaggerLearnRoute } from 'common/constant/swagger/route/swagger.learn.routes.constant';

@ApiBearerAuth()
@ControllerAndSwagger('control')
export class LearnController {
    constructor(private readonly learnService: LearnService) {}

    @Post()
    @ApiRoutesSwagger(SwaggerLearnRoute.startLearn)
    /*
     * @param id and brand controller
     * @returns ApiMessages
     * @description
     * This method is responsible for sending a message to the queue with the id of air conditioner to be learned
     *
     * Body:
     *       id: number
     *       brand: string
     */
    async DepartmentAndBrand(@Body() data: IdandBrand): Promise<ApiMessages> {
        return await this.learnService.sendDepAndBrand(data);
    }

    @Post('/learn')
    @ApiRoutesSwagger(SwaggerLearnRoute.learnButton)
    /*
     * @param id and button
     * @returns ApiMessages
     * @description
     * This method is responsible for sending a message to the queue with the id and button of air conditioner to be learned
     *
     * Body:
     *      id: number
     *      button: string
     *
     */
    async learnButton(@Body() data: LearnDTO): Promise<ApiMessages> {
        return await this.learnService.sendLearnCommand(data);
    }

    @Post('/test')
    @ApiRoutesSwagger(SwaggerLearnRoute.testButton)
    /*
     * @param id and command
     * @returns ApiMessages
     * @description
     * This method is responsible for sending a message to the queue with the id  and command of air conditioner to be learned
     *
     * Body:
     *       id: number
     *       cmd: string (ON, OFF, ..., 24, 25)
     */
    async testButton(@Body() data: TestDTO): Promise<ApiMessages> {
        return await this.learnService.sendTestCommand(data);
    }

    @Post('/save')
    @ApiRoutesSwagger(SwaggerLearnRoute.saveButton)
    /*
     * @param id
     * @returns ApiMessages
     * @description
     * This method is responsible for sending a message to the queue with the id of air conditioner to be learned
     *
     * Body:
     *      id: number
     */
    async saveButton(@Body() data: SaveDTO): Promise<ApiMessages> {
        return await this.learnService.saveCommand(data);
    }
}
