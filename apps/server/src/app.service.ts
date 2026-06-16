import { Injectable } from '@nestjs/common';
import { HealthCheckResponse } from '@food-delivery-app/types';

@Injectable()
export class AppService {
  healthCheck(): HealthCheckResponse {
    return { status: 'OK', timestamp: new Date() };
  }
}
