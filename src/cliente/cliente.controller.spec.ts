import { Test, TestingModule } from '@nestjs/testing';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ClienteController } from './cliente.controller';
import { Result } from '../common/results/result';
import { CriarClienteCommand } from './commands/criar-cliente/criar-cliente.command';
import { ObterClienteCommand } from './queries/obter-cliente/obter-cliente.command';
import { CriarClienteResponse } from './commands/criar-cliente/criar-cliente.response';
import { ObterClienteResponse } from './queries/obter-cliente/obter-cliente.response';
import { UnprocessableEntityException } from '@nestjs/common';

describe('ClienteController', () => {
  let controller: ClienteController;
  let commandBus: CommandBus;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClienteController],
      providers: [
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    controller = module.get<ClienteController>(ClienteController);
    commandBus = module.get<CommandBus>(CommandBus);
    queryBus = module.get<QueryBus>(QueryBus);
  });

  describe('criar', () => {
    it('deve criar um cliente com sucesso', async () => {
      const dto = {
        nome: 'Test User',
        email: 'test@test.com',
        telefone: '11999999999'
      };

      const expectedResponse = new CriarClienteResponse({
        id: 1,
        nome: dto.nome
      });

      jest.spyOn(commandBus, 'execute').mockResolvedValue(Result.ok(expectedResponse));

      const result = await controller.criar(dto);

      expect(result).toEqual(expectedResponse);
      expect(commandBus.execute).toHaveBeenCalledWith(
        expect.any(CriarClienteCommand)
      );
    });

    it('deve lançar exceção quando falhar a criação', async () => {
      const dto = {
        nome: 'Test User',
        email: 'invalid-email',
        telefone: '123'
      };

      jest.spyOn(commandBus, 'execute').mockResolvedValue(
        Result.fail('Email inválido')
      );

      await expect(controller.criar(dto)).rejects.toThrow(UnprocessableEntityException);
    });
  });

  describe('obter', () => {
    it('deve obter um cliente com sucesso', async () => {
      const expectedResponse = new ObterClienteResponse({
        id: 1,
        nome: 'Test User',
        email: 'test@test.com',
        telefone: '11999999999',
        ativo: true,
        dataCadastro: new Date()
      });

      jest.spyOn(queryBus, 'execute').mockResolvedValue(Result.ok(expectedResponse));

      const result = await controller.obter(1);

      expect(result).toEqual(expectedResponse);
      expect(queryBus.execute).toHaveBeenCalledWith(
        expect.any(ObterClienteCommand)
      );
    });

    it('deve lançar exceção quando cliente não for encontrado', async () => {
      jest.spyOn(queryBus, 'execute').mockResolvedValue(
        Result.fail('Cliente não encontrado')
      );

      await expect(controller.obter(1)).rejects.toThrow(UnprocessableEntityException);
    });
  });
});
