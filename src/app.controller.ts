import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiExcludeEndpoint, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('root')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Status da API', description: 'Retorna informações básicas sobre o status e versão da API' })
  @ApiResponse({ status: 200, description: 'API online e funcionando' })
  getHello(): object {
    return this.appService.getHello();
  }

  // Rota para servir o HTML do Swagger UI
  @Get('api-docs')
  @ApiExcludeEndpoint() // Esconde este endpoint da própria documentação
  getSwaggerUI(@Res() res): void {
    const html = this.appService.getSwaggerHTML();
    res.type('text/html');
    res.send(html);
  }

  // Rota para servir o JSON da especificação
  @Get('api-docs/json')
  @ApiExcludeEndpoint()
  getSwaggerJson(): object {
    return this.appService.getSwaggerJson();
  }
}