import { RabbitMQModule } from "@golevelup/nestjs-rabbitmq";
import { Module } from "@nestjs/common";
import { LearnService } from "./learn.service";
import { LearnController } from "./learn.controller";
import { MqttModule } from "queue/mqtt/mqtt.module";



@Module({
    imports: [
        RabbitMQModule.forRoot(RabbitMQModule,{
            exchanges: [
                {
                    name: 'exchange1',
                    type: 'topic',
                },
                {
                    name: 'amq.topic',
                    type: 'topic',
                },
            ],
            uri: process.env['AMQP_URL'] as string,
            connectionInitOptions: { wait: false },
            enableControllerDiscovery: true,
            channels: {
                'channel-1': {
                    prefetchCount: 15,
                    default: true,
                },
                'channel-2': {
                    prefetchCount: 2,
                },
            },
        }),
        MqttModule,

    ],
    controllers: [LearnController],
    providers: [LearnService],
})

export class LearnModule{}