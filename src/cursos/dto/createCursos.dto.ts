import { IsString } from 'class-validator';

export class CreateCursosDTO {
  @IsString()
  nome: string;

  @IsString()
  descricao: string;

  @IsString()
  tipo: string;
}
