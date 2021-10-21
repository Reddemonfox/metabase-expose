import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  constructor(
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  getIframeURL(questionId: string): string {
    const baseURL = this.configService.get<string>('METABASE_SITE_URL');
    const expirationTimeInMinutes = this.configService.get<number>(
      'URL_EXPIRATION_TIME',
    );

    const payload = {
      resource: { question: parseInt(questionId) },
      params: {},
      exp: Math.round(Date.now() / 1000) + expirationTimeInMinutes * 60,
    };
    const token = this.jwtService.sign(payload);

    const iframeUrl =
      baseURL + '/embed/question/' + token + '#bordered=true&titled=true';
    return iframeUrl;
  }
}
