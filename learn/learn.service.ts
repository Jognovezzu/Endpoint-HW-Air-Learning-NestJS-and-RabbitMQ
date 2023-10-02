import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import {
    ConfirmationReceived,
    IdandBrand,
    LearnDTO,
    SaveDTO,
    TestDTO,
    startLearn,
} from './learn.dto';
import { ApiMessages } from 'common';
import { MqttService } from 'queue/mqtt/mqtt.service';
import { LEARN_QUEUE_FRONTEND } from 'common/constant/rabbit.queue.constant';
import { Public } from 'common/decorator/public-rote.decorator';

@Injectable()
@Public()
export class LearnService {
    constructor(
        private readonly rabbitmqService: AmqpConnection,
        private readonly mqttService: MqttService,
    ) {}

    @RabbitSubscribe({
        exchange: 'amq.topic',
        routingKey: 'AMBIENT.LEARN',
        queue: 'AMBIENT/LEARN',
        queueOptions: { maxLength: 500, durable: true, autoDelete: false },
    })
    startLearning(msg: startLearn): void {
        // BUTTON START LEARN HAS BEEN PRESSED
        // SEND MESSAGE TO FRONT TO START PROCESS
        const notificationStartLearn = {
            setor: msg.setor,
            status_learn: true,
        };
        this.mqttService.publish(
            LEARN_QUEUE_FRONTEND,
            notificationStartLearn,
            1,
        );
    }

    @RabbitSubscribe({
        exchange: 'amq.topic',
        routingKey: 'AMBIENT.LEARN',
        queue: 'AMBIENT/LEARN',
        queueOptions: { maxLength: 500, durable: true, autoDelete: false },
    })
    buttonWasPressed(msg: ConfirmationReceived): void {
        // AN BUTTON HAS BEEN PRESSED
        // SEND MESSAGE TO FRONT TO FREE TEST BUTTON

        const notificationPressedButton = {
            cmd: msg.cmd,
        };

        this.mqttService.publish(
            LEARN_QUEUE_FRONTEND,
            notificationPressedButton,
            1,
        );
    }

    //SEMD TO AMBIENT/CMD -- ID AND BRAND OF EQUIPMENT
    async sendDepAndBrand(data: IdandBrand): Promise<ApiMessages> {
        try {
            data['cmd'] = 'START';
            const message = JSON.stringify(data);
            await this.rabbitmqService.publish(
                'amq.topic',
                'AMBIENT.CMD',
                Buffer.from(message),
                { persistent: true },
            );
            return ApiMessages.QUEUE_SUCCESS;
        } catch (e) {
            return ApiMessages.QUEUE_ERROR;
        }
    }

    async sendLearnCommand(data: LearnDTO): Promise<ApiMessages> {
        //SEND TO AMBIENT/CMD -- ID AND BUTTON OF EQUIPMENT
        try {
            data['modo'] = 'LEARN';
            const message = JSON.stringify(data);
            await this.rabbitmqService.publish(
                'amq.topic',
                'AMBIENT.CMD',
                Buffer.from(message),
                { persistent: true },
            );
            return ApiMessages.QUEUE_SUCCESS;
        } catch (e) {
            return ApiMessages.QUEUE_ERROR;
        }
    }

    async sendTestCommand(data: TestDTO): Promise<ApiMessages> {
        //SEND TO AMBIENT/CMD -- ID AND COMMAND OF EQUIPMENT
        try {
            data['modo'] = 'TEST';
            const message = JSON.stringify(data);
            await this.rabbitmqService.publish(
                'amq.topic',
                'AMBIENT.CMD',
                Buffer.from(message),
                { persistent: true },
            );
            return ApiMessages.QUEUE_SUCCESS;
        } catch (e) {
            return ApiMessages.QUEUE_ERROR;
        }
    }

    async saveCommand(data: SaveDTO): Promise<ApiMessages> {
        //SEND TO AMBIENT/CMD -- ID OF EQUIPMENT
        try {
            data['cmd'] = 'SAVE';
            const message = JSON.stringify(data);
            await this.rabbitmqService.publish(
                'amq.topic',
                'AMBIENT.CMD',
                Buffer.from(message),
                { persistent: true },
            );
            return ApiMessages.QUEUE_SUCCESS;
        } catch (e) {
            return ApiMessages.QUEUE_ERROR;
        }
    }
}
